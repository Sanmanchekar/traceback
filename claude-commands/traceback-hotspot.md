---
description: "Git-blame based hotspot analysis: find files that change most frequently with the most bugs, prioritize refactoring targets"
argument-hint: "[path] [--period 30d|90d|1y] [--min-commits N] [--correlate bugs|complexity|churn]"
---

# /traceback:hotspot - Code Hotspot Analysis

Git-blame and history-based analysis that identifies which files change most frequently, correlate with the most bugs, and carry the highest complexity — producing a prioritized list of refactoring targets.

## When to Use

| Scenario | Example |
|----------|---------|
| Refactoring planning | Know where cleanup yields highest ROI |
| Onboarding | Show new devs which files need extra care |
| Architecture review | Identify modules that need redesign |
| Sprint planning | Prioritize tech debt by evidence |
| Post-incident | Find systemically fragile code |

## Usage

```
/traceback:hotspot                             # Full repo analysis
/traceback:hotspot src/                        # Specific directory
/traceback:hotspot --period 90d               # Last 90 days
/traceback:hotspot --period 1y                # Last year
/traceback:hotspot --min-commits 10           # Only files with 10+ changes
/traceback:hotspot --correlate bugs           # Correlate with bug-fix commits
/traceback:hotspot --correlate complexity     # Overlay complexity metrics
/traceback:hotspot --correlate churn          # Pure churn analysis
```

## Analysis Dimensions

### Change Frequency (Churn)
- **Commit count**: How often the file is modified
- **Unique authors**: How many different people change this file
- **Change velocity**: Rate of change over time (accelerating or stable)
- **Change size**: Average lines changed per commit

### Bug Correlation
- **Bug-fix ratio**: Percentage of commits that are bug fixes (via commit message patterns: "fix", "bug", "patch", "hotfix", "revert")
- **Regression frequency**: How often changes to this file cause issues elsewhere
- **Incident linkage**: Commits linked to incidents or high-severity issues
- **Revert rate**: How often changes to this file get reverted

### Complexity Overlay
- **Cyclomatic complexity**: Control flow complexity score
- **Cognitive complexity**: Human readability difficulty score
- **Lines of code**: File size (larger = harder to reason about)
- **Coupling score**: Number of imports/dependents

## Hotspot Score

Each file is scored as a composite:

| Factor | Weight | Description |
|--------|--------|-------------|
| **Churn** | 30% | Change frequency normalized to repo average |
| **Bug Density** | 25% | Bug-fix commits / total commits for this file |
| **Complexity** | 20% | Cyclomatic/cognitive complexity score |
| **Author Count** | 15% | Many authors = coordination overhead |
| **Coupling** | 10% | Import/dependency fan-in and fan-out |

**Hotspot Score**: 0-10, where 10 = highest priority for refactoring.

## Sample Output

```
🔥 HOTSPOT ANALYSIS: my-project/ (last 90 days)

TOP HOTSPOTS:
┌────┬───────────────────────────┬───────┬───────┬──────┬───────┬───────┐
│ #  │ File                      │ Score │ Churn │ Bugs │ Cmplx │ Auth  │
├────┼───────────────────────────┼───────┼───────┼──────┼───────┼───────┤
│ 1  │ src/api/users.py          │ 9.2   │ 47    │ 62%  │ 42    │ 8     │
│ 2  │ src/services/payment.ts   │ 8.7   │ 38    │ 55%  │ 38    │ 6     │
│ 3  │ src/models/order.py       │ 8.1   │ 34    │ 41%  │ 31    │ 7     │
│ 4  │ src/middleware/auth.js    │ 7.6   │ 29    │ 48%  │ 25    │ 5     │
│ 5  │ src/utils/validators.ts   │ 7.2   │ 42    │ 28%  │ 18    │ 9     │
└────┴───────────────────────────┴───────┴───────┴──────┴───────┴───────┘

INSIGHTS:

🔥 src/api/users.py — GOD MODULE
   47 commits, 62% bug-fixes, 8 authors, complexity: 42
   → Split into UserAuth, UserProfile, UserPermissions
   → Estimated effort: 3-5 days, blast radius: HIGH

🔥 src/services/payment.ts — FRAGILE CORE
   38 commits, 55% bug-fixes, lacks test coverage
   → Add integration tests first, then extract PaymentValidator
   → Estimated effort: 2-3 days, blast radius: CRITICAL

📊 TRENDS (90-day window):
   Hotspot count: 12 → 15 (↑25%, debt is growing)
   Avg bug density: 38% → 44% (↑6%, quality declining)
   Top file churn: stable (no improvement)

→ /traceback:debt                     # Full tech debt scan
→ /traceback:analyze "refactor users" # Deep RCA on hotspot
→ /traceback:testgap src/api/users.py # Find test gaps first
```

## Visualization

### Heatmap View (with `--verbose`)
```
Repository Heatmap (commits × complexity):

  High │  ████ users.py
  Cmplx│  ███ payment.ts    ██ order.py
       │  ██ auth.js        █ validators.ts
       │  █ config.ts
  Low  │  · · · · · · · · · · · · · · · · ·
       └──────────────────────────────────────
         Low Churn                  High Churn

Legend: █ = bug-fix density (darker = more bugs)
```

## Execution Instructions

When this command is invoked with `$ARGUMENTS`:

1. **Parse Arguments**: Extract path, time period, minimum commits, correlation mode

2. **Git History Extraction**:
   - Run `git log --numstat` for the specified period
   - Extract per-file commit counts, authors, and change sizes
   - Identify bug-fix commits via message pattern matching
   - Track reverts and their targets

3. **Complexity Analysis**:
   - Calculate cyclomatic complexity for each hotspot candidate
   - Measure file size, nesting depth, function count
   - Map import/export dependencies for coupling score

4. **Correlation Analysis**:
   - Cross-reference churn data with bug-fix patterns
   - Overlay complexity metrics on high-churn files
   - Identify files where churn + bugs + complexity all intersect

5. **Hotspot Scoring**:
   - Normalize each factor against repo averages
   - Apply weighted scoring formula
   - Rank files by composite hotspot score

6. **Trend Analysis**:
   - Compare current period against previous period
   - Identify accelerating vs stable vs improving hotspots
   - Flag new hotspots that emerged recently

7. **State Persistence**:
   - Save results to `.traceback/hotspot-{date}.json`
   - Enable trend tracking across scans

8. **Present Results**:
   - Top hotspots table with all metrics
   - Actionable insights with refactoring suggestions
   - Trend data showing direction of change
   - Token-optimized output by default
