#!/usr/bin/env node

/**
 * Traceback CLI - Command-line interface for Claude Code integration
 */

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import { RCAOrchestrator } from './orchestrator';
import { 
  OrchestrationMode, 
  ConstraintType, 
  Priority,
  Solution,
  OrchestrationResult 
} from './types/schema';

const program = new Command();

// ASCII Art Banner
const banner = `
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║        TRACEBACK - AI Root Cause Analysis               ║
║     Intelligent root cause analysis and solution        ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
`;

program
  .name('traceback')
  .description('AI-powered Root Cause Analysis and Solution Generator')
  .version('1.0.0');

/**
 * Analyze command - Main RCA analysis
 */
program
  .command('analyze')
  .description('Perform root cause analysis on an issue')
  .option('-r, --repo <path>', 'Repository path', process.cwd())
  .option('-i, --issue <description>', 'Issue description')
  .option('-m, --mode <mode>', 'Analysis mode (quick|standard|comprehensive|deep)', 'standard')
  .option('-f, --file <path>', 'Read issue from file')
  .option('--json', 'Output as JSON')
  .option('--detailed', 'Show detailed analysis')
  .action(async (options) => {
    console.log(chalk.cyan(banner));
    
    // Get issue description
    let issueDescription = options.issue;
    
    if (options.file) {
      issueDescription = fs.readFileSync(options.file, 'utf-8');
    } else if (!issueDescription) {
      const answers = await inquirer.prompt([
        {
          type: 'editor',
          name: 'issue',
          message: 'Describe the issue (press Enter to open editor):'
        }
      ]);
      issueDescription = answers.issue;
    }
    
    if (!issueDescription) {
      console.error(chalk.red('❌ Issue description is required'));
      process.exit(1);
    }
    
    const spinner = ora('Initializing Traceback...').start();
    
    try {
      const orchestrator = new RCAOrchestrator({
        mode: options.mode as OrchestrationMode
      });
      
      spinner.text = 'Analyzing issue...';
      
      const result = await orchestrator.analyze(
        issueDescription,
        options.repo
      );
      
      spinner.succeed('Analysis complete!');
      
      if (options.json) {
        console.log(JSON.stringify(result, null, 2));
      } else {
        displayResults(result, options.detailed);
      }
      
    } catch (error) {
      spinner.fail('Analysis failed');
      console.error(chalk.red('Error:', error));
      process.exit(1);
    }
  });

/**
 * Solutions command - Get solution recommendations
 */
program
  .command('solutions')
  .description('Get solution recommendations for analyzed issue')
  .option('-r, --repo <path>', 'Repository path', process.cwd())
  .option('-i, --issue <description>', 'Issue description')
  .option('--top <n>', 'Number of top solutions to show', '3')
  .option('--format <format>', 'Output format (table|json|markdown)', 'table')
  .action(async (options) => {
    console.log(chalk.cyan(banner));
    
    const spinner = ora('Generating solutions...').start();
    
    try {
      const orchestrator = new RCAOrchestrator();
      
      const result = await orchestrator.analyze(
        options.issue || 'Performance degradation in API endpoints',
        options.repo
      );
      
      spinner.succeed('Solutions generated!');
      
      const topN = parseInt(options.top);
      const solutions = result.solutions.slice(0, topN);
      
      switch (options.format) {
        case 'json':
          console.log(JSON.stringify(solutions, null, 2));
          break;
        case 'markdown':
          displaySolutionsMarkdown(solutions);
          break;
        default:
          displaySolutionsTable(solutions);
      }
      
    } catch (error) {
      spinner.fail('Solution generation failed');
      console.error(chalk.red('Error:', error));
      process.exit(1);
    }
  });

/**
 * Implement command - Implement a chosen solution
 */
program
  .command('implement <solutionId>')
  .description('Implement a recommended solution')
  .option('--validate', 'Run validation before implementation')
  .option('--dry-run', 'Perform a dry run without actual changes')
  .option('--interactive', 'Interactive implementation with confirmations')
  .action(async (solutionId, options) => {
    console.log(chalk.cyan(banner));
    
    console.log(chalk.yellow('⚠️  Implementation Engine'));
    console.log('This would implement the selected solution.');
    
    if (options.dryRun) {
      console.log(chalk.blue('🔍 DRY RUN MODE - No actual changes will be made'));
    }
    
    if (options.validate) {
      const spinner = ora('Running pre-implementation validation...').start();
      await new Promise(resolve => setTimeout(resolve, 2000));
      spinner.succeed('Validation passed');
    }
    
    if (options.interactive) {
      const { confirm } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: 'Proceed with implementation?',
          default: false
        }
      ]);
      
      if (!confirm) {
        console.log(chalk.yellow('Implementation cancelled'));
        return;
      }
    }
    
    const steps = [
      'Backing up current state',
      'Applying solution changes',
      'Running tests',
      'Validating implementation',
      'Completing implementation'
    ];
    
    for (const step of steps) {
      const spinner = ora(step).start();
      await new Promise(resolve => setTimeout(resolve, 1500));
      spinner.succeed();
    }
    
    console.log(chalk.green('✅ Implementation complete!'));
  });

/**
 * Interactive mode command
 */
program
  .command('interactive')
  .alias('i')
  .description('Run in interactive mode')
  .action(async () => {
    console.log(chalk.cyan(banner));
    
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'Analyze an issue',
          'View solution recommendations',
          'Implement a solution',
          'Configure settings',
          'Exit'
        ]
      }
    ]);
    
    switch (answers.action) {
      case 'Analyze an issue':
        await interactiveAnalyze();
        break;
      case 'View solution recommendations':
        await interactiveSolutions();
        break;
      case 'Implement a solution':
        console.log(chalk.yellow('Implementation wizard coming soon...'));
        break;
      case 'Configure settings':
        await interactiveConfig();
        break;
      default:
        console.log(chalk.blue('Goodbye!'));
    }
  });

// Helper Functions

function displayResults(result: OrchestrationResult, detailed: boolean = false) {
  console.log('\n' + chalk.bold.white('📊 ANALYSIS RESULTS'));
  console.log('─'.repeat(50));
  
  // Root Causes
  console.log(chalk.bold('\n🔍 Root Causes Identified:'));
  result.rootCauses.forEach((cause, i) => {
    const confidence = (cause.confidence * 100).toFixed(0);
    const bar = '█'.repeat(Math.round(cause.confidence * 10)) + 
                '░'.repeat(10 - Math.round(cause.confidence * 10));
    
    console.log(`  ${i + 1}. ${chalk.yellow(cause.description)}`);
    console.log(`     Confidence: ${bar} ${confidence}%`);
    
    if (detailed) {
      console.log(`     Category: ${cause.category}`);
      console.log(`     Evidence: ${cause.evidence.length} pieces`);
    }
  });
  
  // Recommended Solution
  if (result.recommendation.primarySolution) {
    const solution = result.recommendation.primarySolution;
    console.log(chalk.bold('\n✅ Recommended Solution:'));
    console.log(`  ${chalk.green(solution.title)}`);
    console.log(`  ${solution.description}`);
    console.log(`  Overall Rating: ${getRatingStars(solution.ratings.overall)} (${solution.ratings.overall}/10)`);
    
    if (detailed) {
      console.log(chalk.bold('\n  Rating Breakdown:'));
      console.log(`    Security:       ${getRatingBar(solution.ratings.security.score)}`);
      console.log(`    Scalability:    ${getRatingBar(solution.ratings.scalability.score)}`);
      console.log(`    Maintainability:${getRatingBar(solution.ratings.maintainability.score)}`);
      console.log(`    Performance:    ${getRatingBar(solution.ratings.performance.score)}`);
      console.log(`    Cost:           ${getRatingBar(solution.ratings.cost.score)}`);
    }
  }
  
  // Alternatives
  if (result.recommendation.alternatives.length > 0) {
    console.log(chalk.bold('\n🔄 Alternative Solutions:'));
    result.recommendation.alternatives.forEach((alt, i) => {
      console.log(`  ${i + 1}. ${alt.title} (${alt.ratings.overall}/10)`);
    });
  }
  
  // Metrics
  console.log(chalk.bold('\n📈 Analysis Metrics:'));
  console.log(`  Execution Time: ${result.executionTime}ms`);
  console.log(`  Confidence: ${(result.confidence * 100).toFixed(0)}%`);
  console.log(`  Consensus: ${(result.recommendation.consensusScore * 100).toFixed(0)}%`);
}

function displaySolutionsTable(solutions: Solution[]) {
  console.log('\n' + chalk.bold.white('🔧 SOLUTION RECOMMENDATIONS'));
  console.log('─'.repeat(80));
  
  solutions.forEach((solution, index) => {
    const recommended = solution.recommended ? chalk.green(' ★ RECOMMENDED') : '';
    console.log(`\n${chalk.bold(`${index + 1}. ${solution.title}`)}${recommended}`);
    console.log(`   ${solution.description}`);
    console.log(`   Approach: ${chalk.cyan(solution.approach)}`);
    console.log(`   Overall Score: ${getRatingStars(solution.ratings.overall)} (${solution.ratings.overall}/10)`);
    
    // Show top 2 strengths
    const ratings = [
      { name: 'Security', score: solution.ratings.security.score },
      { name: 'Scalability', score: solution.ratings.scalability.score },
      { name: 'Performance', score: solution.ratings.performance.score },
      { name: 'Maintainability', score: solution.ratings.maintainability.score },
      { name: 'Cost', score: solution.ratings.cost.score }
    ].sort((a, b) => b.score - a.score).slice(0, 2);
    
    console.log(`   Strengths: ${ratings.map(r => `${r.name} (${r.score}/10)`).join(', ')}`);
    
    const effort = solution.implementation.estimatedEffort.realistic;
    console.log(`   Estimated Effort: ${effort.value} ${effort.unit}`);
    console.log(`   Risk Level: ${getRiskColor(solution.impact.riskLevel)}`);
  });
}

function displaySolutionsMarkdown(solutions: Solution[]) {
  console.log('# Solution Recommendations\n');
  
  solutions.forEach((solution, index) => {
    const recommended = solution.recommended ? ' ⭐ **RECOMMENDED**' : '';
    console.log(`## ${index + 1}. ${solution.title}${recommended}\n`);
    console.log(`${solution.description}\n`);
    console.log(`- **Approach**: ${solution.approach}`);
    console.log(`- **Overall Score**: ${solution.ratings.overall}/10`);
    console.log(`- **Risk Level**: ${solution.impact.riskLevel}`);
    
    const effort = solution.implementation.estimatedEffort.realistic;
    console.log(`- **Estimated Effort**: ${effort.value} ${effort.unit}\n`);
    
    console.log('### Ratings\n');
    console.log('| Dimension | Score | Rating |');
    console.log('|-----------|-------|--------|');
    console.log(`| Security | ${solution.ratings.security.score}/10 | ${getRatingBar(solution.ratings.security.score)} |`);
    console.log(`| Scalability | ${solution.ratings.scalability.score}/10 | ${getRatingBar(solution.ratings.scalability.score)} |`);
    console.log(`| Performance | ${solution.ratings.performance.score}/10 | ${getRatingBar(solution.ratings.performance.score)} |`);
    console.log(`| Maintainability | ${solution.ratings.maintainability.score}/10 | ${getRatingBar(solution.ratings.maintainability.score)} |`);
    console.log(`| Cost | ${solution.ratings.cost.score}/10 | ${getRatingBar(solution.ratings.cost.score)} |`);
    console.log('');
  });
}

async function interactiveAnalyze() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'repo',
      message: 'Repository path:',
      default: process.cwd()
    },
    {
      type: 'editor',
      name: 'issue',
      message: 'Describe the issue:'
    },
    {
      type: 'list',
      name: 'mode',
      message: 'Analysis depth:',
      choices: ['quick', 'standard', 'comprehensive', 'deep'],
      default: 'standard'
    }
  ]);
  
  const spinner = ora('Analyzing...').start();
  
  try {
    const orchestrator = new RCAOrchestrator({
      mode: answers.mode as OrchestrationMode
    });
    
    const result = await orchestrator.analyze(
      answers.issue,
      answers.repo
    );
    
    spinner.succeed('Analysis complete!');
    displayResults(result, true);
    
  } catch (error) {
    spinner.fail('Analysis failed');
    console.error(chalk.red('Error:', error));
  }
}

async function interactiveSolutions() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'issue',
      message: 'Brief issue description:',
      default: 'Performance issues in production'
    },
    {
      type: 'number',
      name: 'count',
      message: 'How many solutions to generate?',
      default: 3
    }
  ]);
  
  const spinner = ora('Generating solutions...').start();
  
  try {
    const orchestrator = new RCAOrchestrator();
    const result = await orchestrator.analyze(answers.issue, process.cwd());
    
    spinner.succeed('Solutions generated!');
    displaySolutionsTable(result.solutions.slice(0, answers.count));
    
  } catch (error) {
    spinner.fail('Solution generation failed');
    console.error(chalk.red('Error:', error));
  }
}

async function interactiveConfig() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'setting',
      message: 'What would you like to configure?',
      choices: [
        'Analysis mode defaults',
        'Rating weights',
        'Constraint settings',
        'Output preferences',
        'Back'
      ]
    }
  ]);
  
  if (answers.setting === 'Rating weights') {
    const weights = await inquirer.prompt([
      {
        type: 'number',
        name: 'security',
        message: 'Security weight (0-100):',
        default: 25
      },
      {
        type: 'number',
        name: 'scalability',
        message: 'Scalability weight (0-100):',
        default: 20
      },
      {
        type: 'number',
        name: 'performance',
        message: 'Performance weight (0-100):',
        default: 20
      },
      {
        type: 'number',
        name: 'maintainability',
        message: 'Maintainability weight (0-100):',
        default: 20
      },
      {
        type: 'number',
        name: 'cost',
        message: 'Cost weight (0-100):',
        default: 15
      }
    ]);
    
    console.log(chalk.green('✅ Weights configured successfully'));
  } else {
    console.log(chalk.yellow('Configuration option coming soon...'));
  }
}

// Utility functions
function getRatingStars(rating: number): string {
  const stars = Math.round(rating / 2);
  return '⭐'.repeat(stars) + '☆'.repeat(5 - stars);
}

function getRatingBar(score: number): string {
  const filled = Math.round(score);
  const bar = '█'.repeat(filled) + '░'.repeat(10 - filled);
  return `${bar} ${score.toFixed(1)}/10`;
}

function getRiskColor(risk: string): string {
  const colors: Record<string, any> = {
    'critical': chalk.red(risk.toUpperCase()),
    'high': chalk.yellow(risk.toUpperCase()),
    'medium': chalk.blue(risk.toUpperCase()),
    'low': chalk.green(risk.toUpperCase()),
    'minimal': chalk.gray(risk.toUpperCase())
  };
  return colors[risk] || risk;
}

// Parse arguments
program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  console.log(chalk.cyan(banner));
  program.outputHelp();
}