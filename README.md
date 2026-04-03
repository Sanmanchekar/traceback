<div align="center">

![Traceback Banner](https://img.shields.io/badge/🔍_Traceback-AI_Root_Cause_Analysis-blue?style=for-the-badge)
  
# 🔍 Traceback

### AI-Powered Root Cause Analysis & Solution Framework

**🚀 60% Token Savings • 🔄 Smart Rollback • 📊 Complete Solution History**

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/Sanmanchekar/traceback/releases)
[![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)](https://nodejs.org)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-Compatible-purple.svg)](https://claude.ai/code)
[![GitHub Stars](https://img.shields.io/github/stars/Sanmanchekar/traceback?style=social)](https://github.com/Sanmanchekar/traceback/stargazers)

**Intelligent orchestration for automated RCA, solution generation, rollback capability, and implementation with comprehensive rating systems.**

[Installation](#-quick-start) • 
[Features](#-features) • 
[Usage](#-integration-with-development-workflow) • 
[Documentation](#-configuration) • 
[Contributing](#-contributing)

</div>

---

## 🎯 Overview

Traceback is an AI-driven framework that:
- Analyzes repository issues through multi-dimensional root cause analysis
- Generates multiple solution alternatives with detailed ratings
- Evaluates solutions across security, scalability, maintainability, and performance dimensions
- Provides impact analysis for each proposed solution
- Implements chosen solutions with safeguards and validation
- Tests implementations with comprehensive validation
- Built-in token optimization (40-60% reduction) for efficient AI usage
- Integrates seamlessly with Claude Code and similar AI agents

<div align="center">

### 📊 Key Highlights

| Feature | Description |
|---------|------------|
| **🔄 Rollback System** | Revert failed solutions and try alternatives |
| **📁 State Persistence** | JSON-based progress tracking across sessions |
| **🧹 Auto Cleanup** | Smart test file management after validation |
| **⚡ Token Optimization** | 40-60% reduction in AI token usage |
| **🎯 Smart Recommendations** | Intent-based solution selection |
| **📈 Complete History** | Every attempt logged with full context |

</div>

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                       Traceback                          │
├───────────────┬────────────────────┬────────────────────┤
│  Input Layer  │  Processing Core   │   Output Layer     │
├───────────────┼────────────────────┼────────────────────┤
│ • Issue Input │ • RCA Engine       │ • Solution Reports │
│ • Repo Context│ • Solution Gen     │ • Impact Analysis  │
│ • Constraints │ • Rating System    │ • Implementation   │
│ • Requirements│ • Impact Analyzer  │ • Verification     │
└───────────────┴────────────────────┴────────────────────┘
```

## 📦 Key Components

### 1. **RCA Analysis Engine**
- Pattern recognition for common issue types
- Dependency graph analysis
- Historical issue correlation
- Multi-factor root cause identification

### 2. **Solution Generator**
- Multiple solution pathways
- Trade-off analysis
- Resource requirement estimation
- Implementation complexity assessment

### 3. **Rating System**
Multi-dimensional evaluation:
- **Security**: Vulnerability assessment, compliance checks
- **Scalability**: Performance under load, growth potential
- **Maintainability**: Code complexity, documentation needs
- **Performance**: Speed, resource usage, optimization potential
- **Cost**: Implementation time, resource requirements

### 4. **Impact Analyzer**
- Dependency impact mapping
- Risk assessment matrix
- Rollback strategy generation
- Testing requirements identification

### 5. **Implementation Engine**
- Automated code generation
- Validation checkpoints
- Rollback capabilities
- Progress tracking

## 🚀 Quick Start

### Install Traceback

```bash
# One-line installation from GitHub
curl -sSL https://raw.githubusercontent.com/Sanmanchekar/traceback/main/install.sh | bash
```

### Update Existing Installation

```bash
# Re-run install command (auto-detects and updates)
curl -sSL https://raw.githubusercontent.com/Sanmanchekar/traceback/main/install.sh | bash
```

### Uninstall

```bash
# Complete removal
curl -sSL https://raw.githubusercontent.com/Sanmanchekar/traceback/main/uninstall.sh | bash
```

## 💻 Usage Options

### CLI Binary (Native, <100ms)

```bash
# Analyze an issue
traceback analyze "Performance degradation in API endpoints"

# Complete workflow
traceback workflow "Database connection timeout"

# View solutions
traceback solutions

# Get recommendation
traceback recommend --alternatives 3

# Implement solution
traceback implement solution-1 --interactive

# Test implementation
traceback test solution-1

# Check help
traceback --help
```

### Claude Code (Slash Commands)

```bash
# Analyze an issue
/traceback:analyze "Performance degradation in API endpoints"

# Complete workflow (streamlined)
/traceback:workflow "Database connection timeout"

# View solutions
/traceback:solutions

# Get recommendation
/traceback:recommend

# Implement solution
/traceback:implement solution-1

# Test implementation
/traceback:test solution-1
```

**🎯 Built-in Token Optimization**: All commands use compressed output by default (40-60% token savings). Use `--verbose` flag when you need detailed explanations.

## 💡 Features

### Core Concepts

1. **Constraint-Based Reasoning**: Define hard constraints that solutions must satisfy
2. **Progressive Refinement**: Iterative solution improvement
3. **Multi-Agent Collaboration**: Specialized agents for different analysis aspects
4. **Evidence-Based Verification**: All solutions backed by verifiable evidence

### Advanced Capabilities

- **Parallel Solution Exploration**: Evaluate multiple approaches simultaneously
- **Intelligent Caching**: Learn from previous RCAs
- **Adaptive Scoring**: Weights adjust based on project context
- **Integration Points**: Claude Code, GitHub Actions, CI/CD pipelines

## 📊 Solution Rating Matrix

| Dimension | Weight | Factors |
|-----------|--------|---------|
| Security | 25% | OWASP compliance, vulnerability scan, auth/encryption |
| Scalability | 20% | Load handling, horizontal scaling, resource efficiency |
| Maintainability | 20% | Code complexity, documentation, test coverage |
| Performance | 20% | Response time, throughput, resource usage |
| Implementation Cost | 15% | Dev time, complexity, risk level |

## 🔧 Configuration

```yaml
# traceback-config.yaml
orchestrator:
  mode: comprehensive  # quick | standard | comprehensive
  
analysis:
  depth: deep         # shallow | medium | deep
  historical_context: true
  pattern_matching: true
  
solutions:
  max_alternatives: 5
  min_confidence: 0.7
  
rating:
  weights:
    security: 0.25
    scalability: 0.20
    maintainability: 0.20
    performance: 0.20
    cost: 0.15
    
implementation:
  validation_required: true
  dry_run_default: true
  rollback_enabled: true
```

## 🤖 Integration Options

### Claude Code Integration

Slash commands for AI-assisted development:

```bash
# In Claude Code
/traceback:analyze "Database connection timeout"
/traceback:recommend --alternatives 3
/traceback:implement solution-1 --interactive
```

### CLI Binary

Native command-line tool for direct terminal use:

```bash
# In terminal
traceback analyze "Database connection timeout"
traceback recommend --alternatives 3
traceback implement solution-1 --interactive
```

## 📈 Example Output

```json
{
  "issue": "API endpoint timeout under load",
  "root_causes": [
    {
      "cause": "N+1 query problem in ORM",
      "confidence": 0.92,
      "evidence": ["Query logs", "Performance profiling"]
    }
  ],
  "solutions": [
    {
      "id": 1,
      "title": "Implement eager loading with query optimization",
      "recommended": true,
      "ratings": {
        "security": 9.5,
        "scalability": 9.0,
        "maintainability": 8.5,
        "performance": 9.8,
        "cost": 7.0,
        "overall": 8.76
      },
      "impact": {
        "affected_components": ["UserService", "OrderRepository"],
        "risk_level": "low",
        "rollback_complexity": "simple"
      }
    }
  ]
}
```

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/Sanmanchekar/traceback.git

# Install dependencies
npm install

# Run tests
npm test

# Build
npm run build
```

## 📝 License

MIT License

Copyright (c) 2026 Sanmanchekar

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📚 Complete Command Reference

### Core Workflow Commands
- `/traceback:analyze` - Analyze issue and identify root causes
- `/traceback:solutions` - View all solution alternatives with ratings  
- `/traceback:recommend` - Get top-rated solution recommendation
- `/traceback:implement` - Execute chosen solution with rollback point
- `/traceback:test` - Validate implementation with comprehensive tests

### Advanced Commands
- `/traceback:status` - Check current analysis and progress
- `/traceback:constraint` - Add constraints to filter solutions
- `/traceback:rollback` - Revert failed attempts, try alternatives
- `/traceback:workflow` - Complete analyze→implement→test in one command

## 🤝 Contributing

Contributions welcome! Please read CONTRIBUTING.md for guidelines.

## 🔗 Related Projects

- [Claude Code](https://claude.ai/code) - AI coding assistant integration
- [Agent Framework](https://github.com/microsoft/agent-framework) - Multi-agent patterns