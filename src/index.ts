/**
 * Traceback - Main entry point for Claude Code integration
 * Command structure for Claude Code integration
 */

import { RCAOrchestrator } from './orchestrator';
import { 
  OrchestrationMode, 
  OrchestrationResult,
  Solution,
  Constraint,
  ConstraintType,
  Priority 
} from './types/schema';

export class Traceback {
  private orchestrator: RCAOrchestrator;
  private currentResult: OrchestrationResult | null = null;

  constructor(config?: any) {
    this.orchestrator = new RCAOrchestrator(config);
  }

  /**
   * Main analyze command for root cause analysis
   */
  async analyze(issue: string, options?: {
    repo?: string;
    mode?: 'quick' | 'standard' | 'comprehensive' | 'deep';
    constraints?: any[];
  }): Promise<OrchestrationResult> {
    const mode = this.mapMode(options?.mode || 'standard');
    const result = await this.orchestrator.analyze(
      issue,
      options?.repo || process.cwd(),
      options?.constraints
    );
    
    this.currentResult = result;
    return result;
  }

  /**
   * Get solutions with comprehensive ratings and filtering
   */
  async solutions(options?: {
    count?: number;
    minScore?: number;
    filterBy?: 'security' | 'performance' | 'scalability' | 'cost';
  }): Promise<Solution[]> {
    if (!this.currentResult) {
      throw new Error('No analysis performed. Run analyze first.');
    }

    let solutions = [...this.currentResult.solutions];

    // Filter by minimum score
    if (options?.minScore !== undefined) {
      const minScore = options.minScore;
      solutions = solutions.filter(s => s.ratings.overall >= minScore);
    }

    // Sort by specific dimension
    if (options?.filterBy) {
      solutions.sort((a, b) => {
        if (options.filterBy === 'cost') {
          return b.ratings.cost.score - a.ratings.cost.score;
        } else if (options.filterBy === 'security') {
          return b.ratings.security.score - a.ratings.security.score;
        } else if (options.filterBy === 'performance') {
          return b.ratings.performance.score - a.ratings.performance.score;
        } else if (options.filterBy === 'scalability') {
          return b.ratings.scalability.score - a.ratings.scalability.score;
        }
        return 0;
      });
    }

    // Limit count
    if (options?.count) {
      solutions = solutions.slice(0, options.count);
    }

    return solutions;
  }

  /**
   * Get recommended solution
   */
  async recommend(): Promise<Solution | null> {
    if (!this.currentResult) {
      throw new Error('No analysis performed. Run analyze first.');
    }
    return this.currentResult.recommendation.primarySolution;
  }

  /**
   * Implement a solution (dry run or actual)
   */
  async implement(solutionId: string, options?: {
    dryRun?: boolean;
    validate?: boolean;
  }): Promise<any> {
    if (!this.currentResult) {
      throw new Error('No analysis performed. Run analyze first.');
    }

    const solution = this.currentResult.solutions.find(s => s.id === solutionId);
    if (!solution) {
      throw new Error(`Solution ${solutionId} not found`);
    }

    const steps = solution.implementation.steps;
    const results = [];

    for (const step of steps) {
      if (options?.dryRun) {
        results.push({
          step: step.description,
          status: 'dry-run',
          wouldExecute: step.command || 'manual step'
        });
      } else {
        // Actual implementation would go here
        results.push({
          step: step.description,
          status: 'pending',
          command: step.command
        });
      }
    }

    return {
      solution,
      implementation: results,
      dryRun: options?.dryRun || false
    };
  }

  /**
   * Create constraints for solution filtering and refinement
   */
  createConstraint(
    type: 'invariant' | 'goal' | 'boundary',
    description: string,
    validator: (solution: Solution) => boolean
  ): Constraint {
    return {
      id: `constraint-${Date.now()}`,
      type: type as ConstraintType,
      description,
      priority: Priority.HIGH,
      validator: (solution) => ({
        valid: validator(solution),
        message: description
      })
    };
  }

  /**
   * Get current status
   */
  status(): any {
    if (!this.currentResult) {
      return { status: 'No analysis performed' };
    }

    return {
      issue: this.currentResult.issue.title,
      rootCauses: this.currentResult.rootCauses.length,
      solutions: this.currentResult.solutions.length,
      recommended: this.currentResult.recommendation.primarySolution?.title,
      confidence: (this.currentResult.confidence * 100).toFixed(0) + '%'
    };
  }

  /**
   * Clear current analysis
   */
  clear(): void {
    this.currentResult = null;
  }

  private mapMode(mode: string): OrchestrationMode {
    const modeMap: Record<string, OrchestrationMode> = {
      'quick': OrchestrationMode.QUICK,
      'standard': OrchestrationMode.STANDARD,
      'comprehensive': OrchestrationMode.COMPREHENSIVE,
      'deep': OrchestrationMode.DEEP
    };
    return modeMap[mode] || OrchestrationMode.STANDARD;
  }
}

// Export for use in Claude Code
export default Traceback;
export * from './types/schema';
export { RCAOrchestrator } from './orchestrator';