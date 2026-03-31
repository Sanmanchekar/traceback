/**
 * Solution Generator - Generates and rates multiple solution alternatives
 */

import {
  Solution,
  SolutionRatings,
  Rating,
  RatingFactor,
  RootCause,
  Issue,
  SolutionApproach,
  Implementation,
  ImplementationStrategy,
  ImpactAnalysis,
  RiskLevel,
  Complexity,
  Tradeoff,
  Requirement,
  Risk,
  EffortEstimate,
  Duration
} from '../types/schema';

export class SolutionGenerator {
  private ratingEngine: RatingEngine;
  private solutionTemplates: SolutionTemplate[];

  constructor() {
    this.ratingEngine = new RatingEngine();
    this.solutionTemplates = this.initializeTemplates();
  }

  /**
   * Generate multiple solution alternatives for identified root causes
   */
  async generate(issue: Issue, rootCauses: RootCause[]): Promise<Solution[]> {
    console.log(`🔧 Generating solutions for ${rootCauses.length} root causes`);
    
    const solutions: Solution[] = [];
    
    // Generate solutions for each root cause
    for (const cause of rootCauses) {
      const causeSolutions = await this.generateForCause(cause, issue);
      solutions.push(...causeSolutions);
    }
    
    // Generate combined solutions for multiple causes
    if (rootCauses.length > 1) {
      const combinedSolution = await this.generateCombinedSolution(rootCauses, issue);
      if (combinedSolution) solutions.push(combinedSolution);
    }
    
    // Rate all solutions
    const ratedSolutions = await this.rateSolutions(solutions, issue);
    
    // Sort by overall rating and mark recommendations
    return this.rankAndRecommend(ratedSolutions);
  }

  /**
   * Generate solutions for a specific root cause
   */
  private async generateForCause(cause: RootCause, issue: Issue): Promise<Solution[]> {
    const solutions: Solution[] = [];
    
    // Find matching templates
    const templates = this.findMatchingTemplates(cause);
    
    for (const template of templates) {
      const solution = this.applySolutionTemplate(template, cause, issue);
      solutions.push(solution);
    }
    
    // Generate custom solution if no templates match
    if (solutions.length === 0) {
      const customSolution = this.generateCustomSolution(cause, issue);
      solutions.push(customSolution);
    }
    
    return solutions;
  }

  /**
   * Apply a solution template to create a concrete solution
   */
  private applySolutionTemplate(
    template: SolutionTemplate,
    cause: RootCause,
    issue: Issue
  ): Solution {
    const id = `sol-${template.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
    
    return {
      id,
      title: template.title.replace('{cause}', cause.description),
      description: template.description.replace('{cause}', cause.description),
      approach: template.approach,
      recommended: false, // Will be set during ranking
      ratings: {
        security: this.createEmptyRating(),
        scalability: this.createEmptyRating(),
        maintainability: this.createEmptyRating(),
        performance: this.createEmptyRating(),
        cost: this.createEmptyRating(),
        overall: 0
      },
      implementation: template.implementation,
      impact: template.baseImpact,
      tradeoffs: template.tradeoffs,
      requirements: template.requirements,
      risks: template.risks
    };
  }

  /**
   * Generate a custom solution when no templates match
   */
  private generateCustomSolution(cause: RootCause, issue: Issue): Solution {
    return {
      id: `sol-custom-${Date.now()}`,
      title: `Address ${cause.description}`,
      description: `Custom solution to resolve: ${cause.description}`,
      approach: this.inferApproach(cause),
      recommended: false,
      ratings: {
        security: this.createEmptyRating(),
        scalability: this.createEmptyRating(),
        maintainability: this.createEmptyRating(),
        performance: this.createEmptyRating(),
        cost: this.createEmptyRating(),
        overall: 0
      },
      implementation: this.createBasicImplementation(),
      impact: this.estimateImpact(cause),
      tradeoffs: [],
      requirements: [],
      risks: []
    };
  }

  /**
   * Generate a combined solution for multiple root causes
   */
  private async generateCombinedSolution(
    causes: RootCause[],
    issue: Issue
  ): Promise<Solution | null> {
    if (causes.length < 2) return null;
    
    const primaryCause = causes[0]; // Highest confidence cause
    
    return {
      id: `sol-combined-${Date.now()}`,
      title: 'Comprehensive System Refactoring',
      description: `Address multiple root causes through systematic refactoring: ${
        causes.map(c => c.description).join(', ')
      }`,
      approach: SolutionApproach.REDESIGN,
      recommended: false,
      ratings: {
        security: this.createEmptyRating(),
        scalability: this.createEmptyRating(),
        maintainability: this.createEmptyRating(),
        performance: this.createEmptyRating(),
        cost: this.createEmptyRating(),
        overall: 0
      },
      implementation: {
        strategy: ImplementationStrategy.INCREMENTAL,
        steps: this.generateCombinedSteps(causes),
        validations: [],
        rollbackPlan: {
          automated: false,
          steps: [],
          dataBackupRequired: true,
          estimatedTime: { value: 2, unit: 'hours' }
        },
        estimatedEffort: {
          optimistic: { value: 2, unit: 'weeks' },
          realistic: { value: 4, unit: 'weeks' },
          pessimistic: { value: 6, unit: 'weeks' }
        }
      },
      impact: {
        scope: 'system_wide' as any,
        affectedComponents: causes.flatMap(c => c.affectedComponents).map(name => ({
          name: name,
          type: 'service' as any,
          changeType: 'modify' as any,
          risk: RiskLevel.MEDIUM,
          description: 'Component affected by combined solution'
        })),
        dependencies: [],
        riskLevel: RiskLevel.HIGH,
        rollbackComplexity: Complexity.COMPLEX,
        testingRequired: [],
        estimatedDuration: { value: 4, unit: 'weeks' }
      },
      tradeoffs: [
        {
          benefit: 'Addresses all root causes comprehensively',
          cost: 'Requires significant time and resources',
          weight: 0.8
        },
        {
          benefit: 'Long-term system improvement',
          cost: 'Higher initial risk',
          weight: 0.7
        }
      ],
      requirements: [
        {
          type: 'technical',
          description: 'Full system test coverage',
          mandatory: true
        },
        {
          type: 'resource',
          description: 'Dedicated team for 4-6 weeks',
          mandatory: true
        }
      ],
      risks: [
        {
          description: 'System-wide changes may introduce new issues',
          probability: 0.3,
          impact: RiskLevel.HIGH,
          mitigation: 'Incremental rollout with extensive testing'
        }
      ]
    };
  }

  /**
   * Rate all solutions across multiple dimensions
   */
  private async rateSolutions(solutions: Solution[], issue: Issue): Promise<Solution[]> {
    for (const solution of solutions) {
      solution.ratings = await this.ratingEngine.rate(solution, issue);
    }
    return solutions;
  }

  /**
   * Rank solutions and mark recommendations
   */
  private rankAndRecommend(solutions: Solution[]): Solution[] {
    // Sort by overall rating
    const sorted = solutions.sort((a, b) => b.ratings.overall - a.ratings.overall);
    
    // Mark top solution as recommended if it meets threshold
    if (sorted.length > 0 && sorted[0].ratings.overall >= 7.5) {
      sorted[0].recommended = true;
    }
    
    return sorted;
  }

  // Helper methods
  
  private findMatchingTemplates(cause: RootCause): SolutionTemplate[] {
    return this.solutionTemplates.filter(template =>
      template.applicableTo.includes(cause.category)
    );
  }

  private inferApproach(cause: RootCause): SolutionApproach {
    const approachMap: Record<string, SolutionApproach> = {
      'code_defect': SolutionApproach.QUICK_FIX,
      'architecture': SolutionApproach.REDESIGN,
      'configuration': SolutionApproach.CONFIGURATION_CHANGE,
      'dependency': SolutionApproach.DEPENDENCY_UPDATE,
      'infrastructure': SolutionApproach.INFRASTRUCTURE_CHANGE
    };
    
    return approachMap[cause.category] || SolutionApproach.REFACTOR;
  }

  private createEmptyRating(): Rating {
    return {
      score: 0,
      reasoning: '',
      factors: []
    };
  }

  private createBasicImplementation(): Implementation {
    return {
      strategy: ImplementationStrategy.INCREMENTAL,
      steps: [],
      validations: [],
      rollbackPlan: {
        automated: false,
        steps: [],
        dataBackupRequired: false,
        estimatedTime: { value: 30, unit: 'minutes' }
      },
      estimatedEffort: {
        optimistic: { value: 1, unit: 'days' },
        realistic: { value: 3, unit: 'days' },
        pessimistic: { value: 5, unit: 'days' }
      }
    };
  }

  private estimateImpact(cause: RootCause): ImpactAnalysis {
    return {
      scope: 'module' as any,
      affectedComponents: cause.affectedComponents.map(comp => ({
        name: comp,
        type: 'service' as any,
        changeType: 'modify' as any,
        risk: RiskLevel.MEDIUM,
        description: 'Component requires modification'
      })),
      dependencies: [],
      riskLevel: RiskLevel.MEDIUM,
      rollbackComplexity: Complexity.MODERATE,
      testingRequired: [],
      estimatedDuration: { value: 3, unit: 'days' }
    };
  }

  private generateCombinedSteps(causes: RootCause[]): any[] {
    return causes.map((cause, index) => ({
      id: `step-${index + 1}`,
      order: index + 1,
      description: `Address ${cause.description}`,
      automated: false,
      validation: {
        type: 'manual_review',
        description: `Verify ${cause.description} is resolved`,
        automated: false,
        expectedOutcome: 'Issue resolved'
      }
    }));
  }

  private initializeTemplates(): SolutionTemplate[] {
    return [
      // Performance templates
      {
        name: 'query-optimization',
        title: 'Optimize Database Queries',
        description: 'Implement query optimization to resolve {cause}',
        approach: SolutionApproach.QUICK_FIX,
        applicableTo: ['code_defect', 'architecture'],
        implementation: {
          strategy: ImplementationStrategy.INCREMENTAL,
          steps: [],
          validations: [],
          rollbackPlan: {
            automated: true,
            steps: [],
            dataBackupRequired: false,
            estimatedTime: { value: 15, unit: 'minutes' }
          },
          estimatedEffort: {
            optimistic: { value: 4, unit: 'hours' },
            realistic: { value: 8, unit: 'hours' },
            pessimistic: { value: 2, unit: 'days' }
          }
        },
        baseImpact: {
          scope: 'service' as any,
          affectedComponents: [],
          dependencies: [],
          riskLevel: RiskLevel.LOW,
          rollbackComplexity: Complexity.SIMPLE,
          testingRequired: [],
          estimatedDuration: { value: 1, unit: 'days' }
        },
        tradeoffs: [
          {
            benefit: 'Immediate performance improvement',
            cost: 'May not address underlying architecture issues',
            weight: 0.6
          }
        ],
        requirements: [],
        risks: []
      },
      // Security templates
      {
        name: 'security-patch',
        title: 'Apply Security Patches',
        description: 'Update dependencies and apply security patches for {cause}',
        approach: SolutionApproach.DEPENDENCY_UPDATE,
        applicableTo: ['dependency', 'security'],
        implementation: {
          strategy: ImplementationStrategy.BIG_BANG,
          steps: [],
          validations: [],
          rollbackPlan: {
            automated: true,
            steps: [],
            dataBackupRequired: true,
            estimatedTime: { value: 30, unit: 'minutes' }
          },
          estimatedEffort: {
            optimistic: { value: 2, unit: 'hours' },
            realistic: { value: 4, unit: 'hours' },
            pessimistic: { value: 1, unit: 'days' }
          }
        },
        baseImpact: {
          scope: 'system_wide' as any,
          affectedComponents: [],
          dependencies: [],
          riskLevel: RiskLevel.MEDIUM,
          rollbackComplexity: Complexity.MODERATE,
          testingRequired: [],
          estimatedDuration: { value: 4, unit: 'hours' }
        },
        tradeoffs: [
          {
            benefit: 'Addresses known vulnerabilities',
            cost: 'May introduce breaking changes',
            weight: 0.8
          }
        ],
        requirements: [
          {
            type: 'technical',
            description: 'Full regression testing',
            mandatory: true
          }
        ],
        risks: [
          {
            description: 'Dependency updates may break existing functionality',
            probability: 0.2,
            impact: RiskLevel.MEDIUM,
            mitigation: 'Comprehensive testing before deployment'
          }
        ]
      },
      // Add more templates...
    ];
  }
}

/**
 * Rating Engine - Rates solutions across multiple dimensions
 */
class RatingEngine {
  private weights = {
    security: 0.25,
    scalability: 0.20,
    maintainability: 0.20,
    performance: 0.20,
    cost: 0.15
  };

  async rate(solution: Solution, issue: Issue): Promise<SolutionRatings> {
    const ratings: SolutionRatings = {
      security: await this.rateSecurity(solution, issue),
      scalability: await this.rateScalability(solution, issue),
      maintainability: await this.rateMaintainability(solution, issue),
      performance: await this.ratePerformance(solution, issue),
      cost: await this.rateCost(solution, issue),
      overall: 0
    };
    
    // Calculate weighted overall score
    ratings.overall = this.calculateOverallScore(ratings);
    
    return ratings;
  }

  private async rateSecurity(solution: Solution, issue: Issue): Promise<Rating> {
    const factors: RatingFactor[] = [];
    let score = 7; // Base score
    
    // Check for security improvements
    if (solution.approach === SolutionApproach.DEPENDENCY_UPDATE) {
      factors.push({
        name: 'Dependency updates',
        impact: 'positive',
        weight: 2,
        description: 'Updates address known vulnerabilities'
      });
      score += 2;
    }
    
    // Check for security risks
    const hasHighRisk = solution.risks.some(r => r.impact === RiskLevel.HIGH);
    if (hasHighRisk) {
      factors.push({
        name: 'High security risk',
        impact: 'negative',
        weight: -2,
        description: 'Solution introduces security risks'
      });
      score -= 2;
    }
    
    // Check for authentication/encryption considerations
    if (solution.description.includes('auth') || solution.description.includes('encrypt')) {
      factors.push({
        name: 'Security controls',
        impact: 'positive',
        weight: 1.5,
        description: 'Includes security controls'
      });
      score += 1.5;
    }
    
    return {
      score: Math.min(10, Math.max(0, score)),
      reasoning: 'Security assessment based on vulnerability analysis and risk factors',
      factors
    };
  }

  private async rateScalability(solution: Solution, issue: Issue): Promise<Rating> {
    const factors: RatingFactor[] = [];
    let score = 6; // Base score
    
    // Architecture improvements
    if (solution.approach === SolutionApproach.REDESIGN) {
      factors.push({
        name: 'Architecture redesign',
        impact: 'positive',
        weight: 3,
        description: 'Improves system scalability'
      });
      score += 3;
    }
    
    // Check impact scope
    if (solution.impact.scope === 'system_wide') {
      factors.push({
        name: 'System-wide impact',
        impact: 'positive',
        weight: 1,
        description: 'Addresses scalability at system level'
      });
      score += 1;
    }
    
    // Infrastructure changes
    if (solution.approach === SolutionApproach.INFRASTRUCTURE_CHANGE) {
      factors.push({
        name: 'Infrastructure optimization',
        impact: 'positive',
        weight: 2,
        description: 'Infrastructure-level scalability improvements'
      });
      score += 2;
    }
    
    return {
      score: Math.min(10, Math.max(0, score)),
      reasoning: 'Scalability rating based on architectural impact and growth potential',
      factors
    };
  }

  private async rateMaintainability(solution: Solution, issue: Issue): Promise<Rating> {
    const factors: RatingFactor[] = [];
    let score = 7; // Base score
    
    // Refactoring improves maintainability
    if (solution.approach === SolutionApproach.REFACTOR) {
      factors.push({
        name: 'Code refactoring',
        impact: 'positive',
        weight: 2,
        description: 'Improves code structure and readability'
      });
      score += 2;
    }
    
    // Complex implementations reduce maintainability
    if (solution.impact.rollbackComplexity === Complexity.COMPLEX ||
        solution.impact.rollbackComplexity === Complexity.VERY_COMPLEX) {
      factors.push({
        name: 'High complexity',
        impact: 'negative',
        weight: -2,
        description: 'Increases maintenance complexity'
      });
      score -= 2;
    }
    
    // Good documentation helps
    if (solution.requirements.some(r => r.description.includes('document'))) {
      factors.push({
        name: 'Documentation requirement',
        impact: 'positive',
        weight: 1,
        description: 'Includes documentation'
      });
      score += 1;
    }
    
    return {
      score: Math.min(10, Math.max(0, score)),
      reasoning: 'Maintainability based on code quality and complexity factors',
      factors
    };
  }

  private async ratePerformance(solution: Solution, issue: Issue): Promise<Rating> {
    const factors: RatingFactor[] = [];
    let score = 6; // Base score
    
    // Performance-focused solutions
    if (issue.category === 'performance' && 
        solution.approach === SolutionApproach.QUICK_FIX) {
      factors.push({
        name: 'Performance optimization',
        impact: 'positive',
        weight: 3,
        description: 'Directly addresses performance issues'
      });
      score += 3;
    }
    
    // Query optimization
    if (solution.title.toLowerCase().includes('optim')) {
      factors.push({
        name: 'Optimization included',
        impact: 'positive',
        weight: 2,
        description: 'Includes optimization techniques'
      });
      score += 2;
    }
    
    // Infrastructure improvements
    if (solution.approach === SolutionApproach.INFRASTRUCTURE_CHANGE) {
      factors.push({
        name: 'Infrastructure upgrade',
        impact: 'positive',
        weight: 1.5,
        description: 'Infrastructure-level performance gains'
      });
      score += 1.5;
    }
    
    return {
      score: Math.min(10, Math.max(0, score)),
      reasoning: 'Performance rating based on optimization potential and resource efficiency',
      factors
    };
  }

  private async rateCost(solution: Solution, issue: Issue): Promise<Rating> {
    const factors: RatingFactor[] = [];
    let score = 8; // Base score (lower cost is better)
    
    // Calculate effort in hours
    const effortHours = this.calculateEffortHours(solution.implementation.estimatedEffort.realistic);
    
    if (effortHours <= 8) {
      factors.push({
        name: 'Low effort',
        impact: 'positive',
        weight: 2,
        description: 'Can be completed in one day'
      });
      score += 2;
    } else if (effortHours > 80) {
      factors.push({
        name: 'High effort',
        impact: 'negative',
        weight: -3,
        description: 'Requires significant time investment'
      });
      score -= 3;
    }
    
    // Resource requirements
    const hasHighResourceReq = solution.requirements.some(
      r => r.type === 'resource' && r.mandatory
    );
    if (hasHighResourceReq) {
      factors.push({
        name: 'Resource intensive',
        impact: 'negative',
        weight: -1.5,
        description: 'Requires additional resources'
      });
      score -= 1.5;
    }
    
    // Risk factor affects cost
    if (solution.risks.some(r => r.probability > 0.5)) {
      factors.push({
        name: 'High risk',
        impact: 'negative',
        weight: -1,
        description: 'Risk mitigation adds to cost'
      });
      score -= 1;
    }
    
    return {
      score: Math.min(10, Math.max(0, score)),
      reasoning: 'Cost efficiency based on effort, resources, and risk factors',
      factors
    };
  }

  private calculateEffortHours(duration: Duration): number {
    const multipliers: Record<string, number> = {
      'minutes': 1/60,
      'hours': 1,
      'days': 8,
      'weeks': 40
    };
    
    return duration.value * multipliers[duration.unit];
  }

  private calculateOverallScore(ratings: SolutionRatings): number {
    const weighted = 
      (ratings.security.score * this.weights.security) +
      (ratings.scalability.score * this.weights.scalability) +
      (ratings.maintainability.score * this.weights.maintainability) +
      (ratings.performance.score * this.weights.performance) +
      (ratings.cost.score * this.weights.cost);
    
    return Math.round(weighted * 100) / 100;
  }
}

interface SolutionTemplate {
  name: string;
  title: string;
  description: string;
  approach: SolutionApproach;
  applicableTo: string[];
  implementation: Implementation;
  baseImpact: ImpactAnalysis;
  tradeoffs: Tradeoff[];
  requirements: Requirement[];
  risks: Risk[];
}

export default SolutionGenerator;