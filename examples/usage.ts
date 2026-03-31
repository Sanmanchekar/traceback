/**
 * RCA Orchestrator - Example Usage
 * 
 * This file demonstrates how to use the RCA Orchestrator
 * programmatically in your applications or Claude Code.
 */

import { RCAOrchestrator } from '../src/orchestrator';
import { 
  OrchestrationMode,
  Constraint,
  ConstraintType,
  Priority 
} from '../src/types/schema';

// Example 1: Basic Usage
async function basicExample() {
  console.log('=== Example 1: Basic RCA Analysis ===\n');
  
  const orchestrator = new RCAOrchestrator({
    mode: OrchestrationMode.STANDARD
  });
  
  const issue = `
    Our API endpoints are experiencing severe performance degradation.
    Response times have increased from 200ms to over 5 seconds under load.
    The database seems to be the bottleneck, with queries taking much longer than expected.
    This started after the last deployment which added new features to the user dashboard.
  `;
  
  const result = await orchestrator.analyze(
    issue,
    '/path/to/your/repo'
  );
  
  console.log('Root Causes Found:', result.rootCauses.length);
  console.log('Solutions Generated:', result.solutions.length);
  
  if (result.recommendation.primarySolution) {
    console.log('\nRecommended Solution:');
    console.log('  Title:', result.recommendation.primarySolution.title);
    console.log('  Score:', result.recommendation.primarySolution.ratings.overall + '/10');
  }
}

// Example 2: Advanced Usage with Constraints
async function advancedExample() {
  console.log('\n=== Example 2: Advanced Analysis with Constraints ===\n');
  
  const orchestrator = new RCAOrchestrator({
    mode: OrchestrationMode.COMPREHENSIVE,
    parallelism: 5,
    caching: {
      enabled: true,
      ttlMs: 7200000, // 2 hours
      maxSize: 200
    }
  });
  
  // Define custom constraints
  const constraints: Constraint[] = [
    {
      id: 'zero-downtime',
      type: ConstraintType.INVARIANT,
      description: 'Must not cause any downtime',
      priority: Priority.CRITICAL,
      validator: (solution) => ({
        valid: solution.implementation.strategy !== 'big_bang' as any,
        message: 'Solution must support zero-downtime deployment'
      })
    },
    {
      id: 'budget-limit',
      type: ConstraintType.RESOURCE,
      description: 'Must be completed within 1 week',
      priority: Priority.HIGH,
      validator: (solution) => {
        const effort = solution.implementation.estimatedEffort.realistic;
        const days = effort.unit === 'days' ? effort.value :
                    effort.unit === 'weeks' ? effort.value * 5 : 0;
        return {
          valid: days <= 5,
          message: 'Exceeds 1-week budget'
        };
      }
    },
    {
      id: 'security-compliance',
      type: ConstraintType.COMPLIANCE,
      description: 'Must meet security standards',
      priority: Priority.HIGH,
      validator: (solution) => ({
        valid: solution.ratings.security.score >= 8,
        message: 'Security rating must be 8/10 or higher'
      })
    }
  ];
  
  const issue = `
    Security vulnerability detected in authentication system.
    JWT tokens are not properly validated, allowing potential token forgery.
    The system is also vulnerable to timing attacks during password comparison.
    Additionally, there's no rate limiting on login attempts.
  `;
  
  const result = await orchestrator.analyze(
    issue,
    '/path/to/your/repo',
    constraints
  );
  
  // Display filtered solutions (only those meeting constraints)
  console.log('Solutions meeting all constraints:');
  result.solutions.forEach(solution => {
    console.log(`  - ${solution.title} (Score: ${solution.ratings.overall}/10)`);
  });
}

// Example 3: Integration with Claude Code
async function claudeCodeIntegration() {
  console.log('\n=== Example 3: Claude Code Integration ===\n');
  
  /**
   * This example shows how RCA Orchestrator can be integrated
   * with Claude Code for seamless AI-powered problem solving
   */
  
  // Simulating Claude Code command
  const claudeCommand = '/rca analyze --issue "Memory leak in production causing OOM errors"';
  
  console.log('Claude Code Command:', claudeCommand);
  
  const orchestrator = new RCAOrchestrator({
    mode: OrchestrationMode.QUICK // Fast analysis for interactive use
  });
  
  const result = await orchestrator.analyze(
    'Memory leak in production causing OOM errors every 6 hours',
    process.cwd()
  );
  
  // Format for Claude Code output
  const claudeOutput = {
    status: 'success',
    rootCause: result.rootCauses[0]?.description || 'Unknown',
    solution: {
      title: result.recommendation.primarySolution?.title,
      implementation: result.recommendation.primarySolution?.implementation.strategy,
      effort: result.recommendation.primarySolution?.implementation.estimatedEffort.realistic,
      risk: result.recommendation.primarySolution?.impact.riskLevel
    },
    confidence: (result.confidence * 100).toFixed(0) + '%'
  };
  
  console.log('Claude Code Response:', JSON.stringify(claudeOutput, null, 2));
}

// Example 4: Solution Implementation
async function implementationExample() {
  console.log('\n=== Example 4: Solution Implementation ===\n');
  
  const orchestrator = new RCAOrchestrator();
  
  const issue = 'Database connection pool exhaustion causing timeouts';
  
  const result = await orchestrator.analyze(issue, '/path/to/repo');
  
  if (result.recommendation.primarySolution) {
    const solution = result.recommendation.primarySolution;
    
    console.log('Implementing:', solution.title);
    console.log('\nImplementation Steps:');
    
    solution.implementation.steps.forEach(step => {
      console.log(`  ${step.order}. ${step.description}`);
      if (step.automated) {
        console.log(`     Command: ${step.command || 'Automated'}`);
      } else {
        console.log('     Manual step required');
      }
    });
    
    console.log('\nRollback Plan:');
    console.log('  Automated:', solution.implementation.rollbackPlan.automated);
    console.log('  Data Backup Required:', solution.implementation.rollbackPlan.dataBackupRequired);
    console.log('  Estimated Rollback Time:', 
      `${solution.implementation.rollbackPlan.estimatedTime.value} ${solution.implementation.rollbackPlan.estimatedTime.unit}`
    );
  }
}

// Example 5: Multi-Issue Analysis
async function multiIssueExample() {
  console.log('\n=== Example 5: Multi-Issue Pattern Analysis ===\n');
  
  const orchestrator = new RCAOrchestrator({
    mode: OrchestrationMode.DEEP
  });
  
  const issues = [
    'API timeout errors during peak hours',
    'Database deadlocks in transaction processing',
    'Memory usage steadily increasing over time',
    'Slow page loads on dashboard'
  ];
  
  console.log('Analyzing multiple issues to find patterns...\n');
  
  const analyses = await Promise.all(
    issues.map(issue => orchestrator.analyze(issue, '/path/to/repo'))
  );
  
  // Find common root causes
  const allCauses = analyses.flatMap(a => a.rootCauses);
  const causeFrequency = new Map<string, number>();
  
  allCauses.forEach(cause => {
    const key = cause.category;
    causeFrequency.set(key, (causeFrequency.get(key) || 0) + 1);
  });
  
  console.log('Common Root Cause Categories:');
  Array.from(causeFrequency.entries())
    .sort((a, b) => b[1] - a[1])
    .forEach(([category, count]) => {
      console.log(`  ${category}: ${count} occurrences`);
    });
  
  // Find systemic solutions
  const allSolutions = analyses.flatMap(a => a.solutions);
  const systemicSolutions = allSolutions.filter(s => 
    s.impact.scope === 'system_wide' && s.ratings.overall >= 8
  );
  
  console.log('\nSystemic Solutions (addressing multiple issues):');
  systemicSolutions.slice(0, 3).forEach(solution => {
    console.log(`  - ${solution.title} (Score: ${solution.ratings.overall}/10)`);
  });
}

// Example 6: Custom Rating Weights
async function customRatingExample() {
  console.log('\n=== Example 6: Custom Rating Priorities ===\n');
  
  const orchestrator = new RCAOrchestrator();
  
  // For a security-critical application, we might want to prioritize security
  // This would typically be configured in the RatingEngine
  
  const securityIssue = `
    Critical security vulnerability: SQL injection possible in user search.
    User input is not properly sanitized before database queries.
  `;
  
  const result = await orchestrator.analyze(securityIssue, '/path/to/repo');
  
  // Display solutions sorted by security rating
  const securitySorted = [...result.solutions].sort(
    (a, b) => b.ratings.security.score - a.ratings.security.score
  );
  
  console.log('Solutions ranked by SECURITY score:');
  securitySorted.slice(0, 3).forEach((solution, i) => {
    console.log(`  ${i + 1}. ${solution.title}`);
    console.log(`     Security: ${solution.ratings.security.score}/10`);
    console.log(`     Overall: ${solution.ratings.overall}/10`);
  });
}

// Run examples
async function runExamples() {
  try {
    await basicExample();
    await advancedExample();
    await claudeCodeIntegration();
    await implementationExample();
    await multiIssueExample();
    await customRatingExample();
  } catch (error) {
    console.error('Error running examples:', error);
  }
}

// Run if executed directly
if (require.main === module) {
  runExamples();
}

export {
  basicExample,
  advancedExample,
  claudeCodeIntegration,
  implementationExample,
  multiIssueExample,
  customRatingExample
};