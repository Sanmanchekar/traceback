---
description: "Scan repository for technical debt: code smells, outdated deps, missing tests, hardcoded secrets, ranked by blast radius"
argument-hint: "<path|repo> [--focus smells|deps|tests|secrets|all] [--threshold high|medium|low] [--output markdown|json]"
---

# /traceback:debt - Technical Debt Scanner

Reuses Traceback's multi-dimensional rating engine to scan repositories for code smells, outdated dependencies, missing tests, hardcoded secrets, and other debt indicators — ranked by blast radius and remediation priority.

## When to Use

| Scenario | Example |
|----------|---------|
| Sprint planning | Identify highest-impact debt to pay down |
| Pre-refactor audit | Scope cleanup work before a rewrite |
| New team onboarding | Understand where the landmines are |
| Release readiness | Ensure no critical debt ships |
| Continuous hygiene | Periodic repo health checks |

## Usage

```
/traceback:debt                                # Full scan, current repo
/traceback:debt src/                           # Scan specific directory
/traceback:debt --focus deps                   # Outdated dependencies only
/traceback:debt --focus secrets                # Hardcoded secrets scan
/traceback:debt --focus tests                  # Missing test coverage
/traceback:debt --focus smells                 # Code smell detection
/traceback:debt --threshold high               # Only critical/high items
/traceback:debt --output json                  # Machine-readable output
```

## Scan Dimensions

### Code Smells (`--focus smells`)
- **Complexity hotspots**: Cyclomatic complexity > 15, deep nesting > 4 levels
- **Duplication**: Copy-paste patterns, near-duplicate functions
- **Dead code**: Unreachable branches, unused exports, orphan files
- **God objects**: Classes/modules with too many responsibilities
- **Long methods**: Functions > 50 lines, parameter lists > 5 args
- **Naming violations**: Inconsistent conventions, ambiguous identifiers

### Outdated Dependencies (`--focus deps`)
- **Security vulnerabilities**: Known CVEs in dependency tree
- **Major version lag**: Dependencies > 2 major versions behind
- **Deprecated packages**: Using packages marked as deprecated
- **Unmaintained deps**: No commits/releases in 12+ months
- **License risks**: Incompatible or changed licenses
- **Phantom deps**: Used but not declared in manifest

### Missing Tests (`--focus tests`)
- **Uncovered critical paths**: Business logic without test coverage
- **Missing edge cases**: Error paths, boundary conditions untested
- **Integration gaps**: Module boundaries without integration tests
- **Regression blind spots**: Previously-fixed bugs without regression tests
- **Test quality**: Tests that don't assert meaningful behavior

### Hardcoded Secrets (`--focus secrets`)
- **API keys/tokens**: Hardcoded credentials in source
- **Connection strings**: Database URLs with embedded passwords
- **Private keys**: Certificates, SSH keys in repo
- **Environment leaks**: `.env` files committed, config with secrets
- **Patterns**: Base64-encoded secrets, hex tokens, JWT strings

## Blast Radius Rating

Each debt item is scored using Traceback's rating engine adapted for debt:

| Dimension | Weight | What It Measures |
|-----------|--------|------------------|
| **Blast Radius** | 30% | How many components/users are affected if this debt causes failure |
| **Exploit Likelihood** | 25% | Probability this debt leads to an incident |
| **Fix Complexity** | 20% | Effort required to remediate (inverse: easy fix = higher priority) |
| **Velocity Impact** | 15% | How much this debt slows down development |
| **Recency** | 10% | How recently the debt was introduced or worsened |

**Overall Score**: 0-10 scale, sorted by descending priority.

## Sample Output

```
🏗️ TECHNICAL DEBT SCAN: my-project/

SUMMARY:
┌──────────────┬───────┬──────────┬──────────┐
│ Category     │ Count │ Critical │ Score    │
├──────────────┼───────┼──────────┼──────────┤
│ Code Smells  │ 14    │ 3        │ 6.8/10   │
│ Dependencies │ 8     │ 2        │ 7.4/10   │
│ Test Gaps    │ 11    │ 4        │ 7.1/10   │
│ Secrets      │ 2     │ 2        │ 9.2/10   │
│ TOTAL        │ 35    │ 11       │ 7.3/10   │
└──────────────┴───────┴──────────┴──────────┘

TOP PRIORITY ITEMS (by blast radius):

1. 🚨 Hardcoded AWS key in config/deploy.js:42
   Blast: 9.8 • Likelihood: 9.5 • Fix: trivial
   → Move to env var, rotate key immediately

2. 🚨 express@4.17.1 → CVE-2024-XXXX (RCE)
   Blast: 9.2 • Likelihood: 8.0 • Fix: minor version bump
   → npm update express

3. ⚠️ UserService (847 lines, complexity: 42)
   Blast: 7.5 • Velocity: 8.2 • Fix: moderate
   → Extract into UserAuth, UserProfile, UserNotification

4. ⚠️ No tests for payment processing (src/payments/)
   Blast: 8.9 • Likelihood: 6.5 • Fix: 2-3 days
   → Critical business logic completely untested

→ /traceback:debt --verbose           # Full details
→ /traceback:analyze "debt item"      # Deep-dive into specific item
→ /traceback:estimate "fix debt #1"   # Effort estimate for fix
```

## Integration with Traceback Workflows

- **Feed into RCA**: High-blast-radius debt items can be analyzed with `/traceback:analyze`
- **Estimate fixes**: Use `/traceback:estimate` to size remediation work
- **Track progress**: Re-run scans to measure debt reduction over time
- **Constraint-aware**: Respects project constraints from `/traceback:constraint`

## Execution Instructions

When this command is invoked with `$ARGUMENTS`:

1. **Parse Arguments**: Extract target path, focus area, threshold, output format

2. **Repository Discovery**:
   - Detect project type (package.json, pyproject.toml, go.mod, Cargo.toml, etc.)
   - Identify source directories, test directories, config files
   - Map dependency manifests and lock files

3. **Multi-Dimension Scan**:
   - **Smells**: Analyze complexity metrics, duplication patterns, dead code, naming
   - **Deps**: Parse manifests, check versions against registries, scan for CVEs
   - **Tests**: Map source files to test files, calculate coverage gaps, identify critical untested paths
   - **Secrets**: Pattern-match for credentials, keys, tokens, connection strings

4. **Blast Radius Scoring**:
   - For each finding, calculate blast radius using dependency graph and import chains
   - Score exploit likelihood based on exposure (public API, internal, isolated)
   - Assess fix complexity from code analysis
   - Rate velocity impact from git history (files that change frequently with debt = higher impact)
   - Factor recency from git blame data

5. **Rank and Filter**:
   - Apply threshold filter (high/medium/low)
   - Sort by overall score descending
   - Group by category for summary view

6. **State Persistence**:
   - Save scan results to `.traceback/debt-scan-{date}.json`
   - Track historical scans for trend analysis
   - Generate diff against previous scan if available

7. **Present Results**:
   - Summary table with category breakdown
   - Top priority items with actionable fix suggestions
   - Navigation to deeper analysis commands
   - Token-optimized output by default, `--verbose` for full details
