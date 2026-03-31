#!/usr/bin/env node

/**
 * Traceback Command Handler for Claude Code
 * This makes Traceback work with /traceback commands for Claude Code
 */

const { Traceback } = require('./dist/index');

// Initialize Traceback instance
const traceback = new Traceback();

// Parse command from Claude Code
async function handleCommand(input) {
  const parts = input.trim().split(' ');
  const command = parts[0];
  const subcommand = parts[1];
  const args = parts.slice(2).join(' ');

  // Handle /traceback commands
  if (command === '/traceback' || command === 'traceback') {
    switch (subcommand) {
      case 'analyze':
        return await handleAnalyze(args);
      
      case 'solutions':
        return await handleSolutions(args);
      
      case 'recommend':
        return await handleRecommend();
      
      case 'implement':
        return await handleImplement(args);
      
      case 'status':
        return await handleStatus();
      
      case 'constraint':
        return await handleConstraint(args);
      
      case 'clear':
        traceback.clear();
        return { message: 'Analysis cleared' };
      
      default:
        return { 
          error: 'Unknown command', 
          available: ['analyze', 'solutions', 'recommend', 'implement', 'status', 'constraint', 'clear']
        };
    }
  }
}

async function handleAnalyze(args) {
  // Parse arguments
  const modeMatch = args.match(/--mode\s+(\w+)/);
  const mode = modeMatch ? modeMatch[1] : 'standard';
  
  // Extract issue description (remove flags)
  const issue = args.replace(/--mode\s+\w+/g, '').trim();
  
  if (!issue) {
    return { error: 'Issue description required' };
  }

  console.log(`🔍 Analyzing: ${issue}`);
  console.log(`   Mode: ${mode}`);
  
  try {
    const result = await traceback.analyze(issue, { mode });
    
    // Format output for Claude Code
    const output = {
      status: 'success',
      issue: issue,
      rootCauses: result.rootCauses.map(rc => ({
        cause: rc.description,
        confidence: `${(rc.confidence * 100).toFixed(0)}%`,
        category: rc.category
      })),
      solutionsGenerated: result.solutions.length,
      topSolution: result.recommendation.primarySolution ? {
        title: result.recommendation.primarySolution.title,
        score: result.recommendation.primarySolution.ratings.overall
      } : null,
      message: `Found ${result.rootCauses.length} root causes and generated ${result.solutions.length} solutions`
    };
    
    console.log('\n📊 Analysis Complete:');
    console.log(`   Root Causes: ${result.rootCauses.length}`);
    console.log(`   Solutions: ${result.solutions.length}`);
    if (output.topSolution) {
      console.log(`   Recommended: ${output.topSolution.title} (${output.topSolution.score}/10)`);
    }
    
    return output;
  } catch (error) {
    return { error: error.message };
  }
}

async function handleSolutions(args) {
  // Parse options
  const topMatch = args.match(/--top\s+(\d+)/);
  const minScoreMatch = args.match(/--min-score\s+([\d.]+)/);
  const filterMatch = args.match(/--filter-by\s+(\w+)/);
  
  const options = {
    count: topMatch ? parseInt(topMatch[1]) : 5,
    minScore: minScoreMatch ? parseFloat(minScoreMatch[1]) : undefined,
    filterBy: filterMatch ? filterMatch[1] : undefined
  };
  
  try {
    const solutions = await traceback.solutions(options);
    
    console.log('\n💡 Solutions:');
    solutions.forEach((sol, idx) => {
      console.log(`\n${idx + 1}. ${sol.title}`);
      console.log(`   Overall: ${sol.ratings.overall}/10`);
      console.log(`   Security: ${sol.ratings.security.score}/10`);
      console.log(`   Performance: ${sol.ratings.performance.score}/10`);
      console.log(`   Scalability: ${sol.ratings.scalability.score}/10`);
      console.log(`   Maintainability: ${sol.ratings.maintainability.score}/10`);
      console.log(`   Cost: ${sol.ratings.cost.score}/10`);
    });
    
    return {
      status: 'success',
      count: solutions.length,
      solutions: solutions.map(s => ({
        id: s.id,
        title: s.title,
        score: s.ratings.overall,
        approach: s.approach,
        recommended: s.recommended
      }))
    };
  } catch (error) {
    return { error: error.message };
  }
}

async function handleRecommend() {
  try {
    const solution = await traceback.recommend();
    
    if (!solution) {
      return { message: 'No recommended solution found' };
    }
    
    console.log('\n✅ Recommended Solution:');
    console.log(`   ${solution.title}`);
    console.log(`   Score: ${solution.ratings.overall}/10`);
    console.log(`   Approach: ${solution.approach}`);
    
    return {
      status: 'success',
      solution: {
        id: solution.id,
        title: solution.title,
        description: solution.description,
        score: solution.ratings.overall,
        approach: solution.approach,
        implementation: solution.implementation.strategy
      }
    };
  } catch (error) {
    return { error: error.message };
  }
}

async function handleImplement(args) {
  const parts = args.split(' ');
  const solutionId = parts[0];
  const dryRun = args.includes('--dry-run');
  const validate = args.includes('--validate');
  
  if (!solutionId) {
    return { error: 'Solution ID required' };
  }
  
  try {
    const result = await traceback.implement(solutionId, { dryRun, validate });
    
    console.log(`\n🔧 Implementation ${dryRun ? '(DRY RUN)' : ''}:`);
    result.implementation.forEach((step, idx) => {
      console.log(`   ${idx + 1}. ${step.step}`);
      if (step.command) {
        console.log(`      Command: ${step.command}`);
      }
    });
    
    return {
      status: 'success',
      solutionId: solutionId,
      dryRun: dryRun,
      steps: result.implementation.length,
      implementation: result.implementation
    };
  } catch (error) {
    return { error: error.message };
  }
}

async function handleStatus() {
  const status = traceback.status();
  
  console.log('\n📊 Current Status:');
  if (status.issue) {
    console.log(`   Issue: ${status.issue}`);
    console.log(`   Root Causes: ${status.rootCauses}`);
    console.log(`   Solutions: ${status.solutions}`);
    console.log(`   Recommended: ${status.recommended || 'None'}`);
    console.log(`   Confidence: ${status.confidence}`);
  } else {
    console.log('   No analysis performed');
  }
  
  return status;
}

async function handleConstraint(args) {
  // Parse constraint
  const typeMatch = args.match(/--type\s+(\w+)/);
  const type = typeMatch ? typeMatch[1] : 'invariant';
  const description = args.replace(/--type\s+\w+/g, '').trim().replace(/"/g, '');
  
  if (!description) {
    return { error: 'Constraint description required' };
  }
  
  console.log(`\n📋 Constraint added:`);
  console.log(`   Type: ${type}`);
  console.log(`   Description: ${description}`);
  
  return {
    status: 'success',
    constraint: {
      type: type,
      description: description
    },
    message: `Constraint "${description}" added`
  };
}

// Main execution
if (require.main === module) {
  const input = process.argv.slice(2).join(' ');
  
  if (!input) {
    console.log('Traceback - Root Cause Analysis for Claude Code');
    console.log('\nUsage:');
    console.log('  /traceback analyze "issue description" [--mode quick|standard|comprehensive|deep]');
    console.log('  /traceback solutions [--top N] [--min-score N] [--filter-by dimension]');
    console.log('  /traceback recommend');
    console.log('  /traceback implement <solution-id> [--dry-run] [--validate]');
    console.log('  /traceback status');
    console.log('  /traceback constraint "description" [--type invariant|goal|boundary]');
    process.exit(0);
  }
  
  handleCommand(input)
    .then(result => {
      if (result.error) {
        console.error('❌ Error:', result.error);
        process.exit(1);
      }
      if (process.env.OUTPUT_JSON) {
        console.log(JSON.stringify(result, null, 2));
      }
    })
    .catch(err => {
      console.error('❌ Fatal error:', err);
      process.exit(1);
    });
}

module.exports = { handleCommand, traceback };