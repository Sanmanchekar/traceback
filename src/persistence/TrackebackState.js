/**
 * TrackebackState.js - Constraint-based state tracking with JSON persistence
 * Implements JSON state + markdown documentation for progress tracking
 */

const fs = require('fs').promises;
const path = require('path');
const os = require('os');

class TrackebackState {
    constructor(issueId, issueDescription) {
        this.issueId = issueId;
        this.issueDescription = issueDescription;
        
        // Directory structure for state tracking
        this.tracebackDir = path.join(process.cwd(), '.traceback');
        this.jsonFile = path.join(this.tracebackDir, `${issueId}.json`);
        this.markdownFile = path.join(this.tracebackDir, `${issueId}.md`);
        
        // Initialize JSON state structure
        this.state = {
            "$schema": "https://raw.githubusercontent.com/Sanmanchekar/traceback/main/schema/traceback-state.schema.json",
            "schema_version": 1,
            "issue": issueId,
            "description": issueDescription,
            "phase": "INITIALIZED", // INITIALIZED -> ANALYZED -> SOLUTIONS_GENERATED -> IMPLEMENTED -> TESTED -> VERIFIED
            "created": new Date().toISOString(),
            "updated": new Date().toISOString(),
            
            // Root causes tracking
            "root_causes": {
                "technical": [],
                "architectural": [],
                "operational": [],
                "process": [],
                "external": []
            },
            
            // Solutions tracking - ALL solutions stay here
            "solutions": [],
            
            // Solution attempts history - track every attempt
            "solution_attempts": [],
            
            // Current solution state
            "current_solution": {
                "id": null,
                "status": "none", // none, implementing, testing, active, rolled_back
                "started_at": null,
                "rollback_point": null // git commit hash or state snapshot
            },
            
            // Implementation anchors and requirements
            "anchors": {
                "implementation_requirements": [],
                "validation_criteria": [],
                "rollback_plan": []
            },
            
            // Iterations tracking
            "iterations": [],
            
            // Convergence tracking
            "convergence": {
                "status": "NOT_STARTED", // NOT_STARTED -> IN_PROGRESS -> CONVERGED
                "confidence": 0,
                "evidence": []
            },
            
            // Solution dependency graph
            "solution_graph": {
                "version": 1,
                "nodes": {},
                "edges": {
                    "dependencies": [],
                    "conflicts": [],
                    "satisfies": []
                }
            }
        };
    }
    
    /**
     * Initialize directory structure
     */
    async initialize() {
        await fs.mkdir(this.tracebackDir, { recursive: true });
        await this.save();
        await this.createMarkdown();
        return this;
    }
    
    /**
     * Save JSON state to file
     */
    async save() {
        this.state.updated = new Date().toISOString();
        await fs.writeFile(this.jsonFile, JSON.stringify(this.state, null, 2));
    }
    
    /**
     * Load existing state
     */
    static async load(issueId) {
        const tracebackDir = path.join(process.cwd(), '.traceback');
        const jsonFile = path.join(tracebackDir, `${issueId}.json`);
        
        try {
            const data = await fs.readFile(jsonFile, 'utf8');
            const state = new TrackebackState(issueId, '');
            state.state = JSON.parse(data);
            return state;
        } catch (error) {
            if (error.code === 'ENOENT') {
                return null;
            }
            throw error;
        }
    }
    
    /**
     * Create markdown documentation
     */
    async createMarkdown() {
        const markdown = `# ${this.issueId}

## Issue Description

${this.issueDescription}

---

## Root Causes

### Technical
<!-- Root causes identified: #### T1: Title -->

### Architectural
<!-- Root causes identified: #### A1: Title -->

### Operational
<!-- Root causes identified: #### O1: Title -->

### Process
<!-- Root causes identified: #### P1: Title -->

### External
<!-- Root causes identified: #### E1: Title -->

---

## Solutions

<!-- Solutions generated: ### S1: Title -->

---

## Implementation Requirements

<!-- Implementation requirements: ### IR-1: Title -->

---

## Validation Criteria

<!-- Validation criteria: ### VC-1: Title -->

---

## Iterations

<!-- Iteration history -->

---

## Status

- **Phase**: ${this.state.phase}
- **Convergence**: ${this.state.convergence.status}
- **Updated**: ${this.state.updated}
`;
        
        await fs.writeFile(this.markdownFile, markdown);
    }
    
    /**
     * Update phase with validation
     */
    async updatePhase(newPhase) {
        const validPhases = ['INITIALIZED', 'ANALYZED', 'SOLUTIONS_GENERATED', 'IMPLEMENTED', 'TESTED', 'VERIFIED'];
        const currentIndex = validPhases.indexOf(this.state.phase);
        const newIndex = validPhases.indexOf(newPhase);
        
        if (newIndex < 0) {
            throw new Error(`Invalid phase: ${newPhase}`);
        }
        
        if (newIndex < currentIndex) {
            // Going backwards - this is allowed but tracked
            this.addIteration({
                type: 'phase_rollback',
                from: this.state.phase,
                to: newPhase,
                reason: 'Manual rollback or issue discovered'
            });
        }
        
        this.state.phase = newPhase;
        await this.save();
    }
    
    /**
     * Add root cause with evidence
     */
    async addRootCause(category, id, description, confidence, evidence = []) {
        const rootCause = {
            id,
            description,
            confidence,
            evidence,
            identified_at: new Date().toISOString()
        };
        
        if (!this.state.root_causes[category]) {
            this.state.root_causes[category] = [];
        }
        
        this.state.root_causes[category].push(rootCause);
        await this.save();
    }
    
    /**
     * Add solution with ratings and recommendations
     */
    async addSolution(id, title, description, ratings, implementation_complexity, metadata = {}) {
        // Calculate overall score
        const overallScore = this.calculateOverallScore(ratings);
        
        const solution = {
            id,
            title,
            description,
            ratings, // {security, scalability, maintainability, performance, cost}
            overall_score: overallScore,
            implementation_complexity,
            recommended: false, // Will be set based on ranking
            attempt_count: 0,
            last_attempt: null,
            success_history: [], // Track which attempts succeeded
            failure_reasons: [], // Track why attempts failed
            metadata,
            created_at: new Date().toISOString()
        };
        
        this.state.solutions.push(solution);
        
        // Mark top solution as recommended
        this.updateRecommendations();
        
        await this.save();
        return solution;
    }
    
    /**
     * Calculate overall score from ratings
     */
    calculateOverallScore(ratings) {
        const weights = {
            security: 0.25,
            scalability: 0.20,
            maintainability: 0.20,
            performance: 0.20,
            cost: 0.15
        };
        
        let score = 0;
        for (const [dimension, weight] of Object.entries(weights)) {
            score += (ratings[dimension] || 0) * weight;
        }
        return Math.round(score * 10) / 10;
    }
    
    /**
     * Update recommendation flags based on scores
     */
    updateRecommendations() {
        // Clear all recommendations
        this.state.solutions.forEach(s => s.recommended = false);
        
        // Sort by overall score and mark top as recommended
        const sorted = [...this.state.solutions].sort((a, b) => b.overall_score - a.overall_score);
        if (sorted.length > 0 && sorted[0].attempt_count === 0) {
            sorted[0].recommended = true;
        } else {
            // If top solution was already tried, recommend next untried one
            const untried = sorted.find(s => s.attempt_count === 0);
            if (untried) untried.recommended = true;
        }
    }
    
    /**
     * Start solution attempt with rollback point
     */
    async startSolutionAttempt(solutionId, rollbackPoint = null) {
        const solution = this.state.solutions.find(s => s.id === solutionId);
        if (!solution) {
            throw new Error(`Solution ${solutionId} not found`);
        }
        
        // Create attempt record
        const attempt = {
            attempt_id: `${solutionId}-attempt-${solution.attempt_count + 1}`,
            solution_id: solutionId,
            solution_title: solution.title,
            attempt_number: solution.attempt_count + 1,
            started_at: new Date().toISOString(),
            completed_at: null,
            status: 'in_progress', // in_progress, succeeded, failed, rolled_back
            rollback_point: rollbackPoint, // git commit hash or state snapshot
            changes_made: [],
            test_results: null,
            performance_impact: null,
            failure_reason: null,
            success_metrics: null,
            logs: []
        };
        
        // Update current solution state
        this.state.current_solution = {
            id: solutionId,
            status: 'implementing',
            started_at: attempt.started_at,
            rollback_point: rollbackPoint
        };
        
        // Add to attempts history
        this.state.solution_attempts.push(attempt);
        
        // Update solution attempt count
        solution.attempt_count++;
        solution.last_attempt = attempt.attempt_id;
        
        await this.save();
        return attempt;
    }
    
    /**
     * Log progress for current attempt
     */
    async logAttemptProgress(message, type = 'info', metadata = {}) {
        const currentAttempt = this.getCurrentAttempt();
        if (!currentAttempt) {
            throw new Error('No active solution attempt');
        }
        
        const logEntry = {
            timestamp: new Date().toISOString(),
            type, // info, warning, error, success
            message,
            metadata
        };
        
        currentAttempt.logs.push(logEntry);
        
        // Track changes made
        if (type === 'change') {
            currentAttempt.changes_made.push({
                description: message,
                ...metadata
            });
        }
        
        await this.save();
    }
    
    /**
     * Complete solution attempt with results and cleanup
     */
    async completeSolutionAttempt(success, results = {}) {
        const currentAttempt = this.getCurrentAttempt();
        if (!currentAttempt) {
            throw new Error('No active solution attempt');
        }
        
        const solution = this.state.solutions.find(s => s.id === currentAttempt.solution_id);
        
        // Store detailed test results before cleanup
        if (results.test_details) {
            currentAttempt.test_details = {
                files_generated: results.test_details.files || [],
                test_output: results.test_details.output || '',
                coverage_report: results.test_details.coverage || {},
                performance_benchmarks: results.test_details.benchmarks || {},
                artifacts: results.test_details.artifacts || [],
                preserved_at: new Date().toISOString()
            };
        }
        
        currentAttempt.completed_at = new Date().toISOString();
        currentAttempt.status = success ? 'succeeded' : 'failed';
        
        if (success) {
            currentAttempt.success_metrics = results.metrics || {};
            currentAttempt.test_results = results.test_results || {};
            currentAttempt.performance_impact = results.performance_impact || {};
            
            solution.success_history.push({
                attempt_id: currentAttempt.attempt_id,
                timestamp: currentAttempt.completed_at,
                metrics: currentAttempt.success_metrics
            });
            
            // Update phase
            await this.updatePhase('VERIFIED');
            this.state.current_solution.status = 'active';
            
            // Cleanup test files after successful validation
            if (results.cleanup_files) {
                await this.cleanupTestArtifacts(results.cleanup_files);
            }
            
        } else {
            currentAttempt.failure_reason = results.reason || 'Unknown failure';
            
            solution.failure_reasons.push({
                attempt_id: currentAttempt.attempt_id,
                timestamp: currentAttempt.completed_at,
                reason: currentAttempt.failure_reason,
                can_retry: results.can_retry !== false
            });
            
            this.state.current_solution.status = 'failed';
            
            // Keep test files on failure for debugging
            if (results.test_details && results.test_details.files) {
                currentAttempt.test_files_preserved = true;
                currentAttempt.test_files_note = 'Test files preserved for debugging';
            }
        }
        
        // Update recommendations for next attempt
        this.updateRecommendations();
        
        await this.save();
        return currentAttempt;
    }
    
    /**
     * Cleanup test artifacts after successful validation
     */
    async cleanupTestArtifacts(filesToClean) {
        const fs = require('fs').promises;
        const cleanupLog = {
            timestamp: new Date().toISOString(),
            files_removed: [],
            files_failed: [],
            directories_removed: []
        };
        
        for (const filePath of filesToClean) {
            try {
                const stats = await fs.stat(filePath).catch(() => null);
                if (!stats) continue;
                
                if (stats.isDirectory()) {
                    // Remove test directory recursively
                    await fs.rm(filePath, { recursive: true, force: true });
                    cleanupLog.directories_removed.push(filePath);
                } else {
                    // Remove individual test file
                    await fs.unlink(filePath);
                    cleanupLog.files_removed.push(filePath);
                }
            } catch (error) {
                cleanupLog.files_failed.push({
                    path: filePath,
                    error: error.message
                });
            }
        }
        
        // Add cleanup log to current attempt
        const currentAttempt = this.getCurrentAttempt();
        if (currentAttempt) {
            currentAttempt.cleanup_log = cleanupLog;
        }
        
        await this.save();
        return cleanupLog;
    }
    
    /**
     * Rollback current solution attempt
     */
    async rollbackSolution(reason = 'User requested rollback') {
        const currentAttempt = this.getCurrentAttempt();
        if (!currentAttempt) {
            throw new Error('No active solution attempt to rollback');
        }
        
        currentAttempt.status = 'rolled_back';
        currentAttempt.completed_at = new Date().toISOString();
        currentAttempt.failure_reason = reason;
        
        const rollbackLog = {
            attempt_id: currentAttempt.attempt_id,
            rollback_point: currentAttempt.rollback_point,
            reason,
            timestamp: new Date().toISOString()
        };
        
        this.state.current_solution = {
            id: null,
            status: 'none',
            started_at: null,
            rollback_point: null
        };
        
        // Add rollback to iteration history
        await this.addIteration({
            type: 'solution_rollback',
            attempt_id: currentAttempt.attempt_id,
            reason
        });
        
        await this.save();
        return rollbackLog;
    }
    
    /**
     * Get current active attempt
     */
    getCurrentAttempt() {
        if (!this.state.current_solution.id) {
            return null;
        }
        
        return this.state.solution_attempts.find(
            a => a.solution_id === this.state.current_solution.id && 
                 a.status === 'in_progress'
        );
    }
    
    /**
     * Get solution attempt history
     */
    getSolutionHistory(solutionId = null) {
        if (solutionId) {
            return this.state.solution_attempts.filter(a => a.solution_id === solutionId);
        }
        return this.state.solution_attempts;
    }
    
    /**
     * Get recommended solution
     */
    getRecommendedSolution() {
        return this.state.solutions.find(s => s.recommended) || 
               this.state.solutions.sort((a, b) => b.overall_score - a.overall_score)[0];
    }
    
    /**
     * Add iteration (track progress)
     */
    async addIteration(data) {
        const iteration = {
            ...data,
            timestamp: new Date().toISOString(),
            phase: this.state.phase
        };
        
        this.state.iterations.push(iteration);
        await this.save();
    }
    
    /**
     * Update convergence status
     */
    async updateConvergence(status, confidence = null, evidence = []) {
        this.state.convergence.status = status;
        if (confidence !== null) {
            this.state.convergence.confidence = confidence;
        }
        if (evidence.length > 0) {
            this.state.convergence.evidence.push(...evidence);
        }
        
        await this.save();
    }
    
    /**
     * Get current status (for display)
     */
    getStatus() {
        const totalRootCauses = Object.values(this.state.root_causes)
            .reduce((sum, category) => sum + category.length, 0);
        const totalSolutions = this.state.solutions.length;
        const implementedSolutions = this.state.solutions
            .filter(s => s.status === 'implemented' || s.status === 'validated').length;
        
        return {
            issue: this.issueId,
            phase: this.state.phase,
            rootCauses: totalRootCauses,
            solutions: `${implementedSolutions}/${totalSolutions}`,
            convergence: this.state.convergence.status,
            confidence: `${this.state.convergence.confidence}%`,
            iterations: this.state.iterations.length,
            lastUpdated: this.state.updated
        };
    }
    
    /**
     * Check if ready for next phase
     */
    isReadyForNextPhase() {
        switch (this.state.phase) {
            case 'INITIALIZED':
                return true; // Always ready to analyze
            
            case 'ANALYZED':
                // Need at least one root cause
                const hasRootCauses = Object.values(this.state.root_causes)
                    .some(category => category.length > 0);
                return hasRootCauses;
            
            case 'SOLUTIONS_GENERATED':
                // Need at least one selected solution
                return this.state.solutions.some(s => s.status === 'selected');
            
            case 'IMPLEMENTED':
                // Need implementation requirements and validation criteria
                return this.state.anchors.implementation_requirements.length > 0 &&
                       this.state.anchors.validation_criteria.length > 0;
            
            case 'TESTED':
                // Need convergence evidence
                return this.state.convergence.evidence.length > 0;
            
            case 'VERIFIED':
                return false; // Final phase
            
            default:
                return false;
        }
    }
    
    /**
     * List all tracked issues
     */
    static async listIssues() {
        const tracebackDir = path.join(process.cwd(), '.traceback');
        
        try {
            const files = await fs.readdir(tracebackDir);
            const jsonFiles = files.filter(f => f.endsWith('.json'));
            
            const issues = await Promise.all(
                jsonFiles.map(async (file) => {
                    const issueId = path.basename(file, '.json');
                    const state = await TrackebackState.load(issueId);
                    return state ? state.getStatus() : null;
                })
            );
            
            return issues.filter(i => i !== null);
        } catch (error) {
            if (error.code === 'ENOENT') {
                return [];
            }
            throw error;
        }
    }
}

module.exports = TrackebackState;