/**
 * Main RCA Orchestrator - Coordinates all components
 */

import {
  Issue,
  OrchestrationConfig,
  OrchestrationResult,
  OrchestrationMode,
  Recommendation,
  Solution,
  RootCause,
  Constraint,
  ConstraintType,
  Priority,
  Severity,
  IssueCategory
} from './types/schema';

import RCAEngine from './engines/rca-engine';
import SolutionGenerator from './engines/solution-generator';

export class RCAOrchestrator {
  private rcaEngine: RCAEngine;
  private solutionGenerator: SolutionGenerator;
  private config: OrchestrationConfig;

  constructor(config?: Partial<OrchestrationConfig>) {
    this.config = {
      mode: config?.mode || OrchestrationMode.STANDARD,
      parallelism: config?.parallelism || 3,
      timeoutMs: config?.timeoutMs || 60000,
      retryPolicy: config?.retryPolicy || {
        maxAttempts: 3,
        backoffMs: 1000,
        exponential: true
      },
      caching: config?.caching || {
        enabled: true,
        ttlMs: 3600000, // 1 hour
        maxSize: 100
      }
    };

    this.rcaEngine = new RCAEngine();
    this.solutionGenerator = new SolutionGenerator();
  }

  /**
   * Main orchestration method - analyzes issue and provides solutions
   */
  async analyze(
    issueDescription: string,
    repositoryPath: string,
    constraints?: Constraint[]
  ): Promise<OrchestrationResult> {
    const startTime = Date.now();
    
    console.log('🚀 Starting RCA Orchestration');
    console.log(`📋 Issue: ${issueDescription}`);
    console.log(`📁 Repository: ${repositoryPath}`);
    console.log(`⚙️  Mode: ${this.config.mode}`);
    
    // Step 1: Parse and enrich issue
    const issue = await this.parseIssue(issueDescription, repositoryPath, constraints);
    
    // Step 2: Perform root cause analysis
    console.log('\n🔍 Phase 1: Root Cause Analysis');
    const rootCauses = await this.performRCA(issue);
    
    if (rootCauses.length === 0) {
      console.log('⚠️  No root causes identified');
      return this.createEmptyResult(issue, startTime);
    }
    
    console.log(`✅ Identified ${rootCauses.length} root causes:`);
    rootCauses.forEach(cause => {
      console.log(`  - ${cause.description} (confidence: ${(cause.confidence * 100).toFixed(1)}%)`);
    });
    
    // Step 3: Generate solutions
    console.log('\n🔧 Phase 2: Solution Generation');
    const solutions = await this.generateSolutions(issue, rootCauses);
    
    console.log(`✅ Generated ${solutions.length} solutions`);
    
    // Step 4: Create recommendation
    console.log('\n🎯 Phase 3: Solution Recommendation');
    const recommendation = this.createRecommendation(solutions);
    
    // Step 5: Calculate confidence
    const confidence = this.calculateConfidence(rootCauses, solutions);
    
    const executionTime = Date.now() - startTime;
    
    // Print results summary
    this.printSummary(recommendation, solutions, executionTime);
    
    return {
      issue,
      rootCauses,
      solutions,
      recommendation,
      executionTime,
      confidence
    };
  }

  /**
   * Parse issue description into structured format
   */
  private async parseIssue(
    description: string,
    repositoryPath: string,
    constraints?: Constraint[]
  ): Promise<Issue> {
    // In a real implementation, this would analyze the repository
    // For now, we'll create a mock issue structure
    
    const category = this.detectIssueCategory(description);
    const severity = this.detectSeverity(description);
    
    return {
      id: `issue-${Date.now()}`,
      title: this.extractTitle(description),
      description,
      repository: {
        path: repositoryPath,
        language: 'typescript' as any, // Would detect from repo
        framework: 'node',
        dependencies: [], // Would parse package.json
        architecture: 'microservices' as any,
        metrics: {
          linesOfCode: 10000, // Would calculate
          complexity: 15,
          testCoverage: 75,
          technicalDebt: 120
        }
      },
      timestamp: new Date(),
      severity,
      category,
      symptoms: this.extractSymptoms(description),
      constraints: constraints || this.getDefaultConstraints(),
      metadata: {}
    };
  }

  /**
   * Perform root cause analysis based on mode
   */
  private async performRCA(issue: Issue): Promise<RootCause[]> {
    switch (this.config.mode) {
      case OrchestrationMode.QUICK:
        // Quick analysis - basic pattern matching only
        return this.rcaEngine.analyze({
          ...issue,
          constraints: [] // Skip constraint checking for speed
        });
        
      case OrchestrationMode.COMPREHENSIVE:
      case OrchestrationMode.DEEP:
        // Full analysis with extended checks
        const causes = await this.rcaEngine.analyze(issue);
        
        if (this.config.mode === OrchestrationMode.DEEP) {
          // Additional deep analysis could go here
          // For example: static code analysis, dependency scanning, etc.
        }
        
        return causes;
        
      default: // STANDARD
        return this.rcaEngine.analyze(issue);
    }
  }

  /**
   * Generate solutions with mode-appropriate depth
   */
  private async generateSolutions(
    issue: Issue,
    rootCauses: RootCause[]
  ): Promise<Solution[]> {
    const solutions = await this.solutionGenerator.generate(issue, rootCauses);
    
    // Apply constraints to filter solutions
    return this.applyConstraints(solutions, issue.constraints);
  }

  /**
   * Apply constraints to filter valid solutions
   */
  private applyConstraints(solutions: Solution[], constraints: Constraint[]): Solution[] {
    return solutions.filter(solution => {
      for (const constraint of constraints) {
        const result = constraint.validator(solution);
        if (!result.valid && constraint.priority === Priority.CRITICAL) {
          return false; // Critical constraint violation - exclude solution
        }
      }
      return true;
    });
  }

  /**
   * Create recommendation from solutions
   */
  private createRecommendation(solutions: Solution[]): Recommendation {
    if (solutions.length === 0) {
      return {
        primarySolution: null as any,
        alternatives: [],
        reasoning: 'No valid solutions found',
        consensusScore: 0
      };
    }
    
    // Find recommended solution or top-rated
    const primary = solutions.find(s => s.recommended) || solutions[0];
    const alternatives = solutions.filter(s => s.id !== primary.id).slice(0, 2);
    
    const reasoning = this.generateReasoningExplanation(primary, alternatives);
    const consensusScore = this.calculateConsensusScore(solutions);
    
    return {
      primarySolution: primary,
      alternatives,
      reasoning,
      consensusScore
    };
  }

  /**
   * Generate reasoning explanation for recommendation
   */
  private generateReasoningExplanation(
    primary: Solution,
    alternatives: Solution[]
  ): string {
    const reasons: string[] = [];
    
    // Add primary solution reasoning
    reasons.push(`Recommended solution: "${primary.title}"`);
    reasons.push(`Overall rating: ${primary.ratings.overall.toFixed(1)}/10`);
    
    // Highlight top scoring dimensions
    const dimensions = [
      { name: 'Security', score: primary.ratings.security.score },
      { name: 'Scalability', score: primary.ratings.scalability.score },
      { name: 'Performance', score: primary.ratings.performance.score },
      { name: 'Maintainability', score: primary.ratings.maintainability.score },
      { name: 'Cost Efficiency', score: primary.ratings.cost.score }
    ].sort((a, b) => b.score - a.score);
    
    const topDimensions = dimensions.slice(0, 2);
    reasons.push(
      `Excels in: ${topDimensions.map(d => `${d.name} (${d.score.toFixed(1)}/10)`).join(', ')}`
    );
    
    // Add comparison with alternatives if any
    if (alternatives.length > 0) {
      const scoreDiff = primary.ratings.overall - alternatives[0].ratings.overall;
      if (scoreDiff > 0) {
        reasons.push(
          `Scores ${scoreDiff.toFixed(1)} points higher than next best alternative`
        );
      }
    }
    
    // Add risk assessment
    const risks = primary.risks.filter(r => r.probability > 0.3);
    if (risks.length > 0) {
      reasons.push(`Key risks: ${risks.map(r => r.description).join(', ')}`);
    } else {
      reasons.push('Low risk profile with proven approach');
    }
    
    return reasons.join('. ');
  }

  /**
   * Calculate consensus score across solutions
   */
  private calculateConsensusScore(solutions: Solution[]): number {
    if (solutions.length === 0) return 0;
    if (solutions.length === 1) return 1;
    
    // Calculate variance in overall scores
    const scores = solutions.map(s => s.ratings.overall);
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    const variance = scores.reduce((sum, score) => sum + Math.pow(score - avg, 2), 0) / scores.length;
    
    // Lower variance = higher consensus
    // Normalize to 0-1 scale
    const consensus = Math.max(0, 1 - (variance / 10));
    
    return Math.round(consensus * 100) / 100;
  }

  /**
   * Calculate overall confidence in analysis
   */
  private calculateConfidence(rootCauses: RootCause[], solutions: Solution[]): number {
    // Average confidence of top root causes
    const topCauses = rootCauses.slice(0, 3);
    const causeConfidence = topCauses.reduce((sum, c) => sum + c.confidence, 0) / topCauses.length;
    
    // Solution quality factor
    const hasHighQualitySolution = solutions.some(s => s.ratings.overall >= 8);
    const solutionFactor = hasHighQualitySolution ? 1 : 0.8;
    
    // Multiple corroborating causes increase confidence
    const corroborationFactor = Math.min(1, 0.7 + (rootCauses.length * 0.1));
    
    const overall = causeConfidence * solutionFactor * corroborationFactor;
    
    return Math.round(overall * 100) / 100;
  }

  /**
   * Print results summary to console
   */
  private printSummary(
    recommendation: Recommendation,
    solutions: Solution[],
    executionTime: number
  ): void {
    console.log('\n' + '='.repeat(60));
    console.log('📊 ANALYSIS COMPLETE');
    console.log('='.repeat(60));
    
    if (recommendation.primarySolution) {
      console.log('\n✅ RECOMMENDED SOLUTION:');
      console.log(`   ${recommendation.primarySolution.title}`);
      console.log(`   Overall Score: ${recommendation.primarySolution.ratings.overall}/10`);
      console.log(`   Implementation: ${recommendation.primarySolution.implementation.strategy}`);
      
      const effort = recommendation.primarySolution.implementation.estimatedEffort.realistic;
      console.log(`   Estimated Effort: ${effort.value} ${effort.unit}`);
      console.log(`   Risk Level: ${recommendation.primarySolution.impact.riskLevel}`);
    }
    
    if (recommendation.alternatives.length > 0) {
      console.log('\n🔄 ALTERNATIVE SOLUTIONS:');
      recommendation.alternatives.forEach((alt, i) => {
        console.log(`   ${i + 1}. ${alt.title} (Score: ${alt.ratings.overall}/10)`);
      });
    }
    
    console.log('\n📈 SOLUTION RATINGS BREAKDOWN:');
    if (recommendation.primarySolution) {
      const ratings = recommendation.primarySolution.ratings;
      console.log(`   Security:       ${'█'.repeat(Math.round(ratings.security.score))}${'░'.repeat(10 - Math.round(ratings.security.score))} ${ratings.security.score.toFixed(1)}/10`);
      console.log(`   Scalability:    ${'█'.repeat(Math.round(ratings.scalability.score))}${'░'.repeat(10 - Math.round(ratings.scalability.score))} ${ratings.scalability.score.toFixed(1)}/10`);
      console.log(`   Maintainability:${'█'.repeat(Math.round(ratings.maintainability.score))}${'░'.repeat(10 - Math.round(ratings.maintainability.score))} ${ratings.maintainability.score.toFixed(1)}/10`);
      console.log(`   Performance:    ${'█'.repeat(Math.round(ratings.performance.score))}${'░'.repeat(10 - Math.round(ratings.performance.score))} ${ratings.performance.score.toFixed(1)}/10`);
      console.log(`   Cost:           ${'█'.repeat(Math.round(ratings.cost.score))}${'░'.repeat(10 - Math.round(ratings.cost.score))} ${ratings.cost.score.toFixed(1)}/10`);
    }
    
    console.log(`\n⏱️  Execution Time: ${executionTime}ms`);
    console.log(`🎯 Consensus Score: ${(recommendation.consensusScore * 100).toFixed(0)}%`);
    console.log('='.repeat(60));
  }

  // Helper methods

  private detectIssueCategory(description: string): IssueCategory {
    const lower = description.toLowerCase();
    
    if (lower.includes('performance') || lower.includes('slow') || lower.includes('timeout')) {
      return IssueCategory.PERFORMANCE;
    }
    if (lower.includes('security') || lower.includes('vulnerability') || lower.includes('auth')) {
      return IssueCategory.SECURITY;
    }
    if (lower.includes('crash') || lower.includes('error') || lower.includes('fail')) {
      return IssueCategory.RELIABILITY;
    }
    if (lower.includes('maintain') || lower.includes('refactor') || lower.includes('technical debt')) {
      return IssueCategory.MAINTAINABILITY;
    }
    
    return IssueCategory.FUNCTIONALITY;
  }

  private detectSeverity(description: string): Severity {
    const lower = description.toLowerCase();
    
    if (lower.includes('critical') || lower.includes('urgent') || lower.includes('production')) {
      return Severity.CRITICAL;
    }
    if (lower.includes('high') || lower.includes('important')) {
      return Severity.HIGH;
    }
    if (lower.includes('low') || lower.includes('minor')) {
      return Severity.LOW;
    }
    
    return Severity.MEDIUM;
  }

  private extractTitle(description: string): string {
    // Take first line or first 100 chars
    const firstLine = description.split('\n')[0];
    if (firstLine.length <= 100) return firstLine;
    return firstLine.substring(0, 97) + '...';
  }

  private extractSymptoms(description: string): any[] {
    // In real implementation, would parse symptoms from description
    return [
      {
        description: 'API response times exceeding 5 seconds',
        frequency: 'Every request under load',
        firstOccurrence: new Date(Date.now() - 86400000), // 1 day ago
        metrics: {
          responseTime: 5000,
          errorRate: 0.15
        }
      }
    ];
  }

  private getDefaultConstraints(): Constraint[] {
    return [
      {
        id: 'no-downtime',
        type: ConstraintType.INVARIANT,
        description: 'Solution must not cause system downtime',
        priority: Priority.HIGH,
        validator: (solution) => ({
          valid: solution.implementation.strategy !== 'big_bang' as any ||
                 solution.implementation.rollbackPlan.automated,
          message: 'Solution must support zero-downtime deployment'
        })
      },
      {
        id: 'budget-limit',
        type: ConstraintType.RESOURCE,
        description: 'Solution must be implementable within 2 weeks',
        priority: Priority.MEDIUM,
        validator: (solution) => {
          const effort = solution.implementation.estimatedEffort.realistic;
          const weeks = effort.unit === 'weeks' ? effort.value : 
                       effort.unit === 'days' ? effort.value / 5 : 0;
          return {
            valid: weeks <= 2,
            message: 'Exceeds 2-week budget constraint'
          };
        }
      }
    ];
  }

  private createEmptyResult(issue: Issue, startTime: number): OrchestrationResult {
    return {
      issue,
      rootCauses: [],
      solutions: [],
      recommendation: {
        primarySolution: null as any,
        alternatives: [],
        reasoning: 'No root causes identified',
        consensusScore: 0
      },
      executionTime: Date.now() - startTime,
      confidence: 0
    };
  }
}

export default RCAOrchestrator;