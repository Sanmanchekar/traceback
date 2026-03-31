/**
 * RCA Analysis Engine - Core engine for root cause analysis
 */

import {
  Issue,
  RootCause,
  Evidence,
  EvidenceType,
  CauseCategory,
  RepositoryContext,
  Constraint,
  ValidationResult
} from '../types/schema';

export class RCAEngine {
  private patterns: PatternMatcher;
  private analyzer: CodeAnalyzer;
  private correlator: IssueCorrelator;

  constructor() {
    this.patterns = new PatternMatcher();
    this.analyzer = new CodeAnalyzer();
    this.correlator = new IssueCorrelator();
  }

  /**
   * Perform comprehensive root cause analysis
   */
  async analyze(issue: Issue): Promise<RootCause[]> {
    console.log(`🔍 Starting RCA for: ${issue.title}`);
    
    const rootCauses: RootCause[] = [];
    
    // Phase 1: Pattern-based analysis
    const patternCauses = await this.patterns.findPatterns(issue);
    rootCauses.push(...patternCauses);
    
    // Phase 2: Code analysis
    const codeCauses = await this.analyzer.analyzeCode(issue.repository);
    rootCauses.push(...codeCauses);
    
    // Phase 3: Historical correlation
    const correlatedCauses = await this.correlator.correlate(issue);
    rootCauses.push(...correlatedCauses);
    
    // Phase 4: Constraint validation
    const constraintViolations = this.validateConstraints(issue, rootCauses);
    rootCauses.push(...constraintViolations);
    
    // Phase 5: Ranking and deduplication
    return this.rankAndDeduplicate(rootCauses);
  }

  /**
   * Validate constraints and identify violations
   */
  private validateConstraints(issue: Issue, causes: RootCause[]): RootCause[] {
    const violations: RootCause[] = [];
    
    for (const constraint of issue.constraints) {
      const validation = this.checkConstraint(constraint, issue);
      if (!validation.valid) {
        violations.push({
          id: `constraint-${constraint.id}`,
          description: `Constraint violation: ${constraint.description}`,
          confidence: 0.95,
          category: CauseCategory.CONFIGURATION,
          evidence: [{
            type: EvidenceType.CODE_ANALYSIS,
            source: 'constraint-validator',
            data: validation.violations,
            confidence: 0.95,
            timestamp: new Date()
          }],
          affectedComponents: [],
          propagationPath: []
        });
      }
    }
    
    return violations;
  }

  private checkConstraint(constraint: Constraint, issue: Issue): ValidationResult {
    // Simplified constraint checking - would be more complex in real implementation
    return {
      valid: Math.random() > 0.3, // Placeholder
      message: 'Constraint check result',
      violations: []
    };
  }

  /**
   * Rank causes by confidence and remove duplicates
   */
  private rankAndDeduplicate(causes: RootCause[]): RootCause[] {
    // Remove duplicates based on similarity
    const unique = this.removeDuplicates(causes);
    
    // Sort by confidence
    return unique.sort((a, b) => b.confidence - a.confidence);
  }

  private removeDuplicates(causes: RootCause[]): RootCause[] {
    const seen = new Set<string>();
    return causes.filter(cause => {
      const key = this.getCauseKey(cause);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  private getCauseKey(cause: RootCause): string {
    return `${cause.category}-${cause.description.toLowerCase().replace(/\s+/g, '-')}`;
  }
}

/**
 * Pattern Matcher - Identifies known issue patterns
 */
class PatternMatcher {
  private patterns = [
    {
      name: 'N+1 Query',
      indicators: ['slow query', 'database', 'loop', 'performance'],
      category: CauseCategory.CODE_DEFECT,
      confidence: 0.85
    },
    {
      name: 'Memory Leak',
      indicators: ['memory', 'heap', 'garbage collection', 'oom'],
      category: CauseCategory.CODE_DEFECT,
      confidence: 0.80
    },
    {
      name: 'Race Condition',
      indicators: ['concurrent', 'async', 'timing', 'intermittent'],
      category: CauseCategory.CODE_DEFECT,
      confidence: 0.75
    },
    {
      name: 'Configuration Error',
      indicators: ['config', 'environment', 'setting', 'parameter'],
      category: CauseCategory.CONFIGURATION,
      confidence: 0.90
    },
    {
      name: 'Dependency Conflict',
      indicators: ['version', 'dependency', 'package', 'incompatible'],
      category: CauseCategory.DEPENDENCY,
      confidence: 0.85
    },
    {
      name: 'API Rate Limiting',
      indicators: ['rate limit', 'throttle', '429', 'too many requests'],
      category: CauseCategory.EXTERNAL,
      confidence: 0.95
    },
    {
      name: 'Database Connection Pool',
      indicators: ['connection', 'pool', 'exhausted', 'timeout'],
      category: CauseCategory.INFRASTRUCTURE,
      confidence: 0.88
    },
    {
      name: 'Circular Dependency',
      indicators: ['circular', 'cyclic', 'dependency cycle', 'recursive'],
      category: CauseCategory.ARCHITECTURE,
      confidence: 0.82
    }
  ];

  async findPatterns(issue: Issue): Promise<RootCause[]> {
    const causes: RootCause[] = [];
    const issueText = `${issue.title} ${issue.description}`.toLowerCase();
    const symptomText = issue.symptoms.map(s => s.description).join(' ').toLowerCase();
    const fullText = `${issueText} ${symptomText}`;
    
    for (const pattern of this.patterns) {
      const matches = pattern.indicators.filter(indicator => 
        fullText.includes(indicator)
      );
      
      if (matches.length > 0) {
        const confidence = pattern.confidence * (matches.length / pattern.indicators.length);
        
        causes.push({
          id: `pattern-${pattern.name.toLowerCase().replace(/\s+/g, '-')}`,
          description: `Detected ${pattern.name} pattern`,
          confidence,
          category: pattern.category,
          evidence: [{
            type: EvidenceType.LOG_ANALYSIS,
            source: 'pattern-matcher',
            data: { pattern: pattern.name, matches },
            confidence,
            timestamp: new Date()
          }],
          affectedComponents: this.identifyAffectedComponents(pattern.name),
          propagationPath: this.tracePropagationPath(pattern.name)
        });
      }
    }
    
    return causes;
  }

  private identifyAffectedComponents(patternName: string): string[] {
    // Simplified - would analyze actual codebase
    const componentMap: Record<string, string[]> = {
      'N+1 Query': ['Database', 'ORM', 'API'],
      'Memory Leak': ['Application', 'Runtime'],
      'Race Condition': ['Async Module', 'State Manager'],
      'Configuration Error': ['Config Service', 'Environment'],
      'Dependency Conflict': ['Package Manager', 'Build System'],
      'API Rate Limiting': ['External API', 'HTTP Client'],
      'Database Connection Pool': ['Database', 'Connection Manager'],
      'Circular Dependency': ['Module System', 'Import Graph']
    };
    
    return componentMap[patternName] || [];
  }

  private tracePropagationPath(patternName: string): string[] {
    // Simplified propagation path
    const pathMap: Record<string, string[]> = {
      'N+1 Query': ['ORM Query', 'Database', 'API Response', 'Client'],
      'Memory Leak': ['Object Creation', 'Memory Heap', 'GC Pressure', 'OOM'],
      'Race Condition': ['Concurrent Access', 'Shared State', 'Inconsistency'],
      'Configuration Error': ['Config Load', 'Service Init', 'Runtime Error'],
      'Dependency Conflict': ['Package Resolution', 'Build Failure', 'Runtime Error'],
      'API Rate Limiting': ['API Call', 'Rate Check', 'Rejection', 'Error'],
      'Database Connection Pool': ['Connection Request', 'Pool Check', 'Timeout'],
      'Circular Dependency': ['Module A', 'Module B', 'Module A', 'Stack Overflow']
    };
    
    return pathMap[patternName] || [];
  }
}

/**
 * Code Analyzer - Analyzes repository code for issues
 */
class CodeAnalyzer {
  async analyzeCode(repo: RepositoryContext): Promise<RootCause[]> {
    const causes: RootCause[] = [];
    
    // Analyze complexity
    if (repo.metrics.complexity > 20) {
      causes.push({
        id: 'high-complexity',
        description: 'High cyclomatic complexity detected',
        confidence: 0.7,
        category: CauseCategory.CODE_DEFECT,
        evidence: [{
          type: EvidenceType.CODE_ANALYSIS,
          source: 'complexity-analyzer',
          data: { complexity: repo.metrics.complexity },
          confidence: 0.7,
          timestamp: new Date()
        }],
        affectedComponents: ['Core Logic'],
        propagationPath: ['Complex Code', 'Maintenance Issues', 'Bugs']
      });
    }
    
    // Analyze test coverage
    if (repo.metrics.testCoverage < 60) {
      causes.push({
        id: 'low-test-coverage',
        description: 'Insufficient test coverage',
        confidence: 0.6,
        category: CauseCategory.CODE_DEFECT,
        evidence: [{
          type: EvidenceType.TEST_RESULT,
          source: 'coverage-analyzer',
          data: { coverage: repo.metrics.testCoverage },
          confidence: 0.6,
          timestamp: new Date()
        }],
        affectedComponents: ['Test Suite'],
        propagationPath: ['Untested Code', 'Hidden Bugs', 'Production Issues']
      });
    }
    
    // Analyze technical debt
    if (repo.metrics.technicalDebt > 100) {
      causes.push({
        id: 'high-technical-debt',
        description: 'High technical debt accumulation',
        confidence: 0.65,
        category: CauseCategory.ARCHITECTURE,
        evidence: [{
          type: EvidenceType.CODE_ANALYSIS,
          source: 'debt-analyzer',
          data: { debtHours: repo.metrics.technicalDebt },
          confidence: 0.65,
          timestamp: new Date()
        }],
        affectedComponents: ['Entire Codebase'],
        propagationPath: ['Tech Debt', 'Maintenance Overhead', 'Slower Development']
      });
    }
    
    // Check for outdated dependencies
    const outdated = this.checkOutdatedDependencies(repo.dependencies);
    if (outdated.length > 0) {
      causes.push({
        id: 'outdated-dependencies',
        description: 'Outdated dependencies with known vulnerabilities',
        confidence: 0.9,
        category: CauseCategory.DEPENDENCY,
        evidence: [{
          type: EvidenceType.CODE_ANALYSIS,
          source: 'dependency-checker',
          data: { outdated },
          confidence: 0.9,
          timestamp: new Date()
        }],
        affectedComponents: ['Package Management'],
        propagationPath: ['Outdated Packages', 'Security Vulnerabilities', 'Exploits']
      });
    }
    
    return causes;
  }

  private checkOutdatedDependencies(dependencies: any[]): any[] {
    // Simplified check - would use actual package registry
    return dependencies.filter(dep => {
      // Mock check for outdated packages
      const majorVersion = parseInt(dep.version.split('.')[0]);
      return majorVersion < 2; // Assuming version 2+ is current
    });
  }
}

/**
 * Issue Correlator - Correlates with historical issues
 */
class IssueCorrelator {
  private historicalIssues: any[] = [
    {
      pattern: 'database timeout',
      rootCause: 'Connection pool exhaustion',
      frequency: 5,
      category: CauseCategory.INFRASTRUCTURE
    },
    {
      pattern: 'api slow response',
      rootCause: 'N+1 query problem',
      frequency: 8,
      category: CauseCategory.CODE_DEFECT
    },
    {
      pattern: 'memory error',
      rootCause: 'Memory leak in event handlers',
      frequency: 3,
      category: CauseCategory.CODE_DEFECT
    },
    {
      pattern: 'authentication failure',
      rootCause: 'Token expiration not handled',
      frequency: 6,
      category: CauseCategory.CONFIGURATION
    }
  ];

  async correlate(issue: Issue): Promise<RootCause[]> {
    const causes: RootCause[] = [];
    const issueText = `${issue.title} ${issue.description}`.toLowerCase();
    
    for (const historical of this.historicalIssues) {
      if (issueText.includes(historical.pattern)) {
        const confidence = 0.5 + (historical.frequency * 0.05); // Higher frequency = higher confidence
        
        causes.push({
          id: `historical-${historical.pattern.replace(/\s+/g, '-')}`,
          description: `Historical correlation: ${historical.rootCause}`,
          confidence: Math.min(confidence, 0.9),
          category: historical.category,
          evidence: [{
            type: EvidenceType.LOG_ANALYSIS,
            source: 'historical-correlation',
            data: { 
              pattern: historical.pattern,
              occurrences: historical.frequency
            },
            confidence: Math.min(confidence, 0.9),
            timestamp: new Date()
          }],
          affectedComponents: [],
          propagationPath: []
        });
      }
    }
    
    return causes;
  }
}

export default RCAEngine;