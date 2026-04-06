<div align="center">

![Traceback Banner](https://img.shields.io/badge/🔍_Traceback-AI_Root_Cause_Analysis-blue?style=for-the-badge)
  
# Traceback

### AI-Powered Root Cause Analysis & Multi-Persona Engineering Platform

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/Sanmanchekar/traceback/releases)
[![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)](https://nodejs.org)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-Compatible-purple.svg)](https://claude.ai/code)
[![GitHub Stars](https://img.shields.io/github/stars/Sanmanchekar/traceback?style=social)](https://github.com/Sanmanchekar/traceback/stargazers)

**20 commands across 3 personas — Devs, QA, and PMs — powered by a unified analysis engine.**

[Quick Start](#-quick-start) |
[RCA Workflow](#-rca-workflow-core) |
[Dev Commands](#-dev-commands) |
[QA Commands](#-qa-commands) |
[PM Commands](#-pm-commands) |
[Architecture](#-architecture)

</div>

---

## Overview

Traceback started as an RCA (Root Cause Analysis) engine and has expanded into a multi-persona engineering platform. The same analysis core — pattern matching, rating engine, dependency graphing, and state persistence — now powers workflows for developers, QA engineers, and product managers.

| Persona | Commands | Focus |
|---------|----------|-------|
| **Dev** | analyze, workflow, solutions, recommend, implement, test, debt, perf, migrate, hotspot | Code-level investigation, optimization, and remediation |
| **QA** | testgap, regress, reproduce | Test coverage, regression risk, bug reproduction |
| **PM** | impact, postmortem, health, estimate | Stakeholder reports, incident docs, service health |
| **Shared** | status, constraint, rollback | Cross-persona state management |

---

## Quick Start

### Install

```bash
curl -sSL https://raw.githubusercontent.com/Sanmanchekar/traceback/main/install.sh | bash
```

### Update / Uninstall

```bash
# Update
curl -sSL https://raw.githubusercontent.com/Sanmanchekar/traceback/main/install.sh | bash

# Uninstall
curl -sSL https://raw.githubusercontent.com/Sanmanchekar/traceback/main/uninstall.sh | bash
```

### Usage Options

**Claude Code (slash commands):**
```bash
/traceback:analyze "API endpoints timing out"
/traceback:workflow "Database connection timeout"
/traceback:debt
/traceback:health --period 30d
```

**CLI Binary (native terminal):**
```bash
traceback analyze "Performance degradation in API endpoints"
traceback workflow "Database connection timeout"
traceback solutions
traceback recommend --alternatives 3
```

---

## Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                         TRACEBACK PLATFORM                       │
├──────────────┬───────────────────────┬───────────────────────────┤
│ Input Layer  │   Processing Core     │   Output Layer            │
├──────────────┼───────────────────────┼───────────────────────────┤
│ Issue text   │ RCA Engine            │ Solution reports          │
│ Log files    │  ├ Pattern matcher    │ Impact analysis           │
│ APM traces   │  ├ Code analyzer      │ Postmortem docs           │
│ Git diffs    │  ├ Issue correlator   │ Health scorecards         │
│ PR refs      │  └ Constraint valid.  │ Test plans                │
│ Bug reports  │ Solution Generator    │ Migration plans           │
│ Jira/Slack   │  ├ Template engine    │ Effort estimates          │
│ Repo paths   │  ├ Rating engine      │ Regression checklists     │
│              │  └ Combined solver    │ Debt inventories          │
│              │ State Persistence     │ Reproduction steps        │
│              │  ├ JSON state files   │ Performance profiles      │
│              │  └ Markdown docs      │ Dashboard JSON            │
├──────────────┼───────────────────────┼───────────────────────────┤
│              │   Rating Dimensions   │                           │
│              │ Security ···· 25%     │                           │
│              │ Scalability · 20%     │                           │
│              │ Maintain. ·· 20%      │                           │
│              │ Performance · 20%     │                           │
│              │ Cost ········ 15%     │                           │
└──────────────┴───────────────────────┴───────────────────────────┘
```

### Processing Pipeline

```
Input → Issue Parsing → RCA Engine → Solution Generation → Rating → Ranking → Output
                          │                │                  │
                    Pattern Match    Template Engine    5-Dimension Score
                    Code Analysis    Custom Generator   Constraint Filter
                    Correlation      Combined Solver    Recommendation
```

### State Persistence

All commands write state to `.traceback/` directory:
- **JSON state files**: Machine-readable, tracks phases, solutions, attempts
- **Markdown docs**: Human-readable documentation of analysis
- **Phase progression**: `INITIALIZED → ANALYZED → SOLUTIONS_GENERATED → IMPLEMENTED → TESTED → VERIFIED`
- **Cross-session**: Resume any analysis from where you left off

---

## RCA Workflow (Core)

The original and primary workflow. Handles end-to-end root cause analysis, solution generation, implementation, and testing.

### Commands

| Command | Purpose | Key Flags |
|---------|---------|-----------|
| `/traceback:analyze` | Root cause analysis with confidence scoring | `--mode quick\|standard\|comprehensive`, `--workflow`, `--implement` |
| `/traceback:workflow` | Full analyze → implement → test in one command | `--mode`, `--solution-id`, `--dry-run`, `--verbose` |
| `/traceback:solutions` | View all solution alternatives with ratings | `--top N`, `--filter`, `--sort` |
| `/traceback:recommend` | Smart recommendation with roadmap | `--explain`, `--alternatives N`, `--confirm` |
| `/traceback:implement` | Guided implementation with rollback | `--dry-run`, `--validate`, `--interactive` |
| `/traceback:test` | Comprehensive testing and validation | `--type unit\|integration\|e2e\|performance\|all`, `--benchmark` |
| `/traceback:status` | Analysis progress dashboard | `--metrics` |
| `/traceback:constraint` | Add/modify constraints to filter solutions | `--type invariant\|goal\|boundary` |
| `/traceback:rollback` | Revert failed attempts, try alternatives | `--select recommended` |

### Typical Flow

```
# Quick: one command does everything
/traceback:workflow "API endpoints timing out"

# Detailed: step-by-step control
/traceback:analyze "API endpoints timing out" --mode comprehensive
/traceback:solutions --top 5
/traceback:recommend --explain --alternatives 2
/traceback:implement solution-1 --validate
/traceback:test solution-1 --benchmark --regression
```

### Analysis Modes

| Mode | Time | Depth | Root Causes | Solutions |
|------|------|-------|-------------|-----------|
| **Quick** | 1-2 min | Surface | 1-2 | 2-3 |
| **Standard** | 3-5 min | Comprehensive | 2-4 | 3-5 |
| **Comprehensive** | 5-10 min | Deep system | 3-6 | 5-7 |

### Rating System

Every solution is rated across 5 dimensions:

| Dimension | Weight | Factors |
|-----------|--------|---------|
| Security | 25% | OWASP compliance, vulnerability scan, auth/encryption |
| Scalability | 20% | Load handling, horizontal scaling, resource efficiency |
| Maintainability | 20% | Code complexity, documentation, test coverage |
| Performance | 20% | Response time, throughput, resource usage |
| Implementation Cost | 15% | Dev time, complexity, risk level |

### Sample RCA Output

```
🔍 API endpoints timing out under load

ROOT CAUSES:
• N+1 queries (92%) → DB optimization needed
• No connection pooling (78%) → Connection overhead
• Poor caching (65%) → Repeated computations

SOLUTIONS:
┌─────────────────────────────┬──────┬─────────────────────┐
│ Solution                    │ Score│ Key Metrics         │
├─────────────────────────────┼──────┼─────────────────────┤
│ 1. Query Optimization ⭐    │ 8.7  │ 2-3d • Perf: 9.8   │
│ 2. Connection Pooling       │ 7.9  │ 5-7d • Scale: 9.2  │
│ 3. Caching Layer           │ 7.2  │ 3-4d • Perf: 8.5   │
└─────────────────────────────┴──────┴─────────────────────┘
```

### Safety Features

- **Rollback points**: Git commit saved before every implementation
- **Dry-run mode**: Preview all changes without executing
- **Interactive mode**: Step-by-step confirmation
- **Attempt history**: Every implementation tracked in `.traceback/`
- **Auto-cleanup**: Test files removed on success, preserved on failure

---

## Dev Commands

Beyond RCA, these commands help developers proactively maintain code health.

### `/traceback:debt` — Technical Debt Scanner

Scans for code smells, outdated deps, missing tests, hardcoded secrets — ranked by blast radius.

```bash
/traceback:debt                        # Full repo scan
/traceback:debt --focus deps           # Outdated dependencies only
/traceback:debt --focus secrets        # Hardcoded secrets scan
/traceback:debt --threshold high       # Critical items only
```

**Scan dimensions**: Code smells | Outdated dependencies | Missing tests | Hardcoded secrets

**Scoring**: Blast Radius (30%) + Exploit Likelihood (25%) + Fix Complexity (20%) + Velocity Impact (15%) + Recency (10%)

```
🏗️ TECHNICAL DEBT SCAN: my-project/

┌──────────────┬───────┬──────────┬──────────┐
│ Category     │ Count │ Critical │ Score    │
├──────────────┼───────┼──────────┼──────────┤
│ Code Smells  │ 14    │ 3        │ 6.8/10   │
│ Dependencies │ 8     │ 2        │ 7.4/10   │
│ Test Gaps    │ 11    │ 4        │ 7.1/10   │
│ Secrets      │ 2     │ 2        │ 9.2/10   │
└──────────────┴───────┴──────────┴──────────┘
```

---

### `/traceback:perf` — Performance Profiler

Detects N+1 queries, missing indexes, caching opportunities from code analysis, logs, or APM traces.

```bash
/traceback:perf                        # Analyze codebase
/traceback:perf --focus queries        # Database query analysis
/traceback:perf --input logs slow.log  # Analyze log file
/traceback:perf --baseline prev.json   # Compare against baseline
```

**Focus areas**: Queries | API | Memory | Bundle

**Scoring**: Impact (30%) + Frequency (25%) + Fix Effort (20%) + User Impact (15%) + Scalability (10%)

```
⚡ PERFORMANCE PROFILE: my-api/

┌──────────────────┬───────┬────────────┬───────────┐
│ Category         │ Count │ Critical   │ Est. Gain │
├──────────────────┼───────┼────────────┼───────────┤
│ N+1 Queries      │ 6     │ 3          │ -70% DB   │
│ Missing Indexes  │ 4     │ 2          │ -50ms P95 │
│ Cache Opps       │ 5     │ 1          │ -40% load │
└──────────────────┴───────┴────────────┴───────────┘
```

---

### `/traceback:migrate` — Migration Risk Analyzer

Scans deps, flags breaking changes, generates phased migration plan with rollback steps.

```bash
/traceback:migrate "Python 3.8" "Python 3.12"
/traceback:migrate "Node 16" "Node 22" --scope deps
/traceback:migrate "Django 3.2" "Django 5.0" --generate-plan
```

**Scope**: Runtime changes | Dependency compatibility | API breaking changes

**Scoring**: Breaking Impact (30%) + Fix Complexity (25%) + Rollback Risk (20%) + Test Coverage (15%) + Dependency Chain (10%)

```
🔄 MIGRATION ANALYSIS: Python 3.8 → 3.12

┌──────────────────┬───────┬──────────┬──────────────┐
│ Category         │ Items │ Risk     │ Auto-fixable │
├──────────────────┼───────┼──────────┼──────────────┤
│ Runtime Changes  │ 5     │ Medium   │ 3/5 (60%)    │
│ Dependency Compat│ 12    │ High     │ 8/12 (67%)   │
│ API Changes      │ 8     │ Medium   │ 6/8 (75%)    │
└──────────────────┴───────┴──────────┴──────────────┘
```

---

### `/traceback:hotspot` — Code Hotspot Analysis

Git-blame based analysis: files that change most + have the most bugs = refactoring targets.

```bash
/traceback:hotspot                     # Full repo
/traceback:hotspot --period 90d        # Last 90 days
/traceback:hotspot --correlate bugs    # Bug-fix correlation
/traceback:hotspot --min-commits 10    # High-churn files only
```

**Factors**: Churn (30%) + Bug Density (25%) + Complexity (20%) + Author Count (15%) + Coupling (10%)

```
🔥 HOTSPOT ANALYSIS: my-project/ (last 90 days)

┌────┬───────────────────────────┬───────┬───────┬──────┬───────┐
│ #  │ File                      │ Score │ Churn │ Bugs │ Cmplx │
├────┼───────────────────────────┼───────┼───────┼──────┼───────┤
│ 1  │ src/api/users.py          │ 9.2   │ 47    │ 62%  │ 42    │
│ 2  │ src/services/payment.ts   │ 8.7   │ 38    │ 55%  │ 38    │
│ 3  │ src/models/order.py       │ 8.1   │ 34    │ 41%  │ 31    │
└────┴───────────────────────────┴───────┴───────┴──────┴───────┘
```

---

## QA Commands

Test coverage, regression risk, and bug reproduction workflows.

### `/traceback:testgap` — Test Coverage Gap Finder

Identifies missing test cases from RCA results, code changes, or directory scanning. Generates test skeletons.

```bash
/traceback:testgap                     # Scan entire repo
/traceback:testgap src/services/       # Specific directory
/traceback:testgap --rca issue-123     # Based on RCA findings
/traceback:testgap --diff HEAD~3       # Based on recent changes
/traceback:testgap --generate          # Generate test skeletons
```

**Detection**: Source-to-test mapping | RCA-driven gaps | Change-driven gaps | Edge case detection

**Scoring**: Criticality (35%) + Bug History (25%) + Complexity (20%) + Change Frequency (20%)

```
🧪 TEST GAP ANALYSIS: my-project/

┌──────────────────┬──────────┬──────────┬──────────┐
│ Category         │ Files    │ Coverage │ Gaps     │
├──────────────────┼──────────┼──────────┼──────────┤
│ Unit Tests       │ 42/67    │ 63%      │ 25 files │
│ Integration      │ 8/15     │ 53%      │ 7 suites │
│ Edge Cases       │ --       │ ~30%     │ 18 cases │
└──────────────────┴──────────┴──────────┴──────────┘
```

---

### `/traceback:regress` — Regression Risk Mapper

Traces the dependency graph for a PR or changeset, flags what could break, outputs targeted regression test plan.

```bash
/traceback:regress                     # Uncommitted changes
/traceback:regress --pr 142            # Specific PR
/traceback:regress --diff HEAD~5       # Last 5 commits
/traceback:regress --output checklist  # QA-ready checklist
```

**Analysis layers**: Direct impact | Transitive dependencies | Historical fragility

**Scoring**: Impact Severity (30%) + Change Proximity (25%) + Historical Fragility (20%) + Test Coverage (15%) + Rollback Difficulty (10%)

```
🛡️ REGRESSION RISK MAP: PR #142

┌──────────────────────────┬──────┬──────────┬──────────┐
│ Affected Area            │ Risk │ Type     │ Action   │
├──────────────────────────┼──────┼──────────┼──────────┤
│ Payment processing       │ 8.5  │ Direct   │ TEST     │
│ Order completion flow    │ 7.2  │ Direct   │ VERIFY   │
│ Webhook delivery         │ 6.8  │ Direct   │ TEST     │
│ Invoice generation       │ 5.4  │ Transit. │ MONITOR  │
└──────────────────────────┴──────┴──────────┴──────────┘
```

---

### `/traceback:reproduce` — Bug Reproduction Assistant

Parses bug reports (Jira, Slack, GitHub, plain text), generates reproduction steps, identifies affected code paths, suggests test fixtures.

```bash
/traceback:reproduce "Users can't complete checkout on mobile"
/traceback:reproduce --source github "#issue-456"
/traceback:reproduce --source jira "PROJ-1234"
/traceback:reproduce --generate-fixture
```

**Capabilities**: Report parsing | Code path identification | Reproduction strategy | Test fixture generation

```
🔍 BUG REPRODUCTION: "Users can't complete checkout on mobile"

LIKELY CODE PATHS:
1. src/components/Checkout/SubmitButton.tsx:89
   → onClick handler may not fire on touch events

REPRODUCTION STEPS:
1. Device: iOS Safari (or DevTools mobile emulation)
2. Network: Throttle to "Slow 3G"
3. Navigate to /checkout, fill form, tap submit
4. ACTUAL: Button appears disabled, no response
```

---

## PM Commands

Stakeholder-friendly reports, incident documentation, and service health visibility.

### `/traceback:impact` — Change Impact Report

Translates technical changes into PM-friendly reports: affected users, feature risk, downtime estimate, rollback time.

```bash
/traceback:impact "Add payment retry logic"
/traceback:impact --pr 142
/traceback:impact --format slack           # Slack-ready output
/traceback:impact --audience exec          # Executive summary
```

**Output formats**: Markdown | Slack | Jira

**Audience levels**: PM (default) | Stakeholder | Executive

```
📊 IMPACT REPORT: PR #142 — Payment Retry Logic

┌──────────────────┬──────────────────────────────────────┐
│ Who              │ All users making payments (~12K/day) │
│ What they'll see │ Fewer "payment failed" errors        │
│ Downtime         │ None (zero-downtime deploy)          │
│ Rollback time    │ <1 minute (feature flag)             │
│ Risk to users    │ LOW                                  │
└──────────────────┴──────────────────────────────────────┘
```

---

### `/traceback:postmortem` — Incident Postmortem Generator

Auto-generates structured postmortems from RCA: timeline, contributing factors, action items with owners.

```bash
/traceback:postmortem "Payment processing outage 2026-04-05"
/traceback:postmortem --rca issue-123
/traceback:postmortem --template blameless
/traceback:postmortem --template five-whys
/traceback:postmortem --format confluence
```

**Templates**: Standard | Blameless | Five-Whys

**Sections**: Executive summary | Timeline | Root cause | Contributing factors | Impact | Action items | Lessons learned

```
📋 INCIDENT POSTMORTEM

Title: Payment Processing Outage
Duration: 84 minutes | Severity: SEV-1
Impact: ~2,400 failed txns, ~$180K revenue

ACTION ITEMS:
┌────┬─────────────────────────────────┬──────────┬──────────┐
│ #  │ Action                          │ Owner    │ Due      │
├────┼─────────────────────────────────┼──────────┼──────────┤
│ 1  │ Add indexes to all FK columns   │ DB Team  │ Apr 8    │
│ 2  │ Implement slow query alerting   │ SRE      │ Apr 12   │
│ 3  │ Load test with production data  │ QA       │ Apr 15   │
└────┴─────────────────────────────────┴──────────┴──────────┘
```

---

### `/traceback:health` — Service Health Scorecard

Aggregates RCAs, incidents, MTTR, debt score, coverage, and performance into a dashboard-ready report.

```bash
/traceback:health                      # Overall project health
/traceback:health --period 30d         # Last 30 days
/traceback:health --compare previous   # Compare to prior period
/traceback:health --format dashboard   # JSON for dashboards
```

**Dimensions**: Reliability (incidents, MTTR, uptime) | Code Quality (debt, coverage, complexity) | Performance (latency, throughput) | Velocity (deploy frequency, lead time)

```
📊 SERVICE HEALTH SCORECARD: my-project (30 days)

OVERALL HEALTH: 72/100 ⚠️ (was 68/100, ↑4)

┌─────────────────┬───────┬───────┬────────┐
│ Dimension       │ Score │ Trend │ Grade  │
├─────────────────┼───────┼───────┼────────┤
│ Reliability     │ 78    │ ↑5    │ B+     │
│ Code Quality    │ 62    │ ↓3    │ C      │
│ Performance     │ 81    │ ↑8    │ A-     │
│ Velocity        │ 67    │ ↑2    │ C+     │
└─────────────────┴───────┴───────┴────────┘
```

---

### `/traceback:estimate` — Effort Estimator

Breaks solutions into tasks with T-shirt sizes, risk flags, dependency sequencing, and skill requirements.

```bash
/traceback:estimate solution-1                 # From RCA solution
/traceback:estimate "Implement payment retry"  # From description
/traceback:estimate --format timeline          # Gantt-style view
/traceback:estimate --format jira              # Jira-importable
```

**T-shirt sizes**: XS (1-2h) | S (2-4h) | M (4-12h) | L (12-24h) | XL (24-40h) | XXL (40h+)

```
📐 EFFORT ESTIMATE: Query Optimization (solution-1)

Total: L (18-26 hours / 3-5 days) | Risk: LOW

┌────┬──────────────────────────────┬──────┬──────┬──────┐
│ #  │ Task                         │ Size │ Risk │ Deps │
├────┼──────────────────────────────┼──────┼──────┼──────┤
│ 1  │ Audit current query patterns │ S    │ Low  │ --   │
│ 2  │ Design eager loading strategy│ S    │ Low  │ #1   │
│ 3  │ Implement select_related     │ M    │ Low  │ #2   │
│ 4  │ Implement prefetch_related   │ M    │ Low  │ #2   │
│ 5  │ Write/update tests           │ M    │ Low  │ #3,4 │
│ 6  │ Performance testing          │ S    │ Med  │ #5   │
│ 7  │ Production rollout           │ S    │ Med  │ #6   │
└────┴──────────────────────────────┴──────┴──────┴──────┘
```

---

## Command Cross-Reference

Commands naturally chain together across personas:

```
# Dev finds debt → PM gets estimate → QA finds test gaps
/traceback:debt --focus smells
/traceback:estimate "refactor UserService"
/traceback:testgap src/services/user.ts

# RCA → Postmortem → Health check
/traceback:analyze "payment outage" --mode comprehensive
/traceback:postmortem --rca issue-123
/traceback:health --period 30d

# Pre-merge workflow
/traceback:regress --pr 142
/traceback:impact --pr 142
/traceback:testgap --diff HEAD~1

# Performance investigation
/traceback:perf --focus queries
/traceback:hotspot --correlate bugs
/traceback:analyze "N+1 query in users endpoint"
/traceback:implement solution-1
/traceback:test --benchmark
```

---

## Token Optimization

All commands use compressed output by default (40-60% token reduction):
- Symbol-based status (`✅ ❌ ⚠️ →`)
- Table layouts over prose
- Abbreviated metrics
- Smart caching across phases

Use `--verbose` on any command for full detailed output.

---

## Configuration

```yaml
# traceback-config.yaml
orchestrator:
  mode: comprehensive     # quick | standard | comprehensive

analysis:
  depth: deep             # shallow | medium | deep
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

---

## Development

```bash
git clone https://github.com/Sanmanchekar/traceback.git
npm install
npm run build
npm test
```

---

## License

MIT License - see [LICENSE](LICENSE) for details.

## Contributing

Contributions welcome! Please read CONTRIBUTING.md for guidelines.
