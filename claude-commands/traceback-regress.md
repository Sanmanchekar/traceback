---
description: "Regression risk mapper: trace dependency graph for a PR or changeset, flag what could break, output targeted regression test plan"
argument-hint: "<pr-number|diff|path> [--depth shallow|deep] [--output plan|checklist|json] [--include-transitive]"
---

# /traceback:regress - Regression Risk Mapper

For a given PR, commit range, or set of file changes, traces the dependency graph and flags what could break. Outputs a targeted regression test plan that covers direct impacts, transitive dependencies, and historically fragile paths.

## When to Use

| Scenario | Example |
|----------|---------|
| Pre-merge review | Assess risk before merging a PR |
| Release planning | Know what to regression test before deploy |
| Post-refactor | Verify refactoring didn't break dependents |
| Hotfix validation | Ensure emergency fix doesn't cause cascading issues |
| Change review | Understand blast radius of proposed changes |

## Usage

```
/traceback:regress                             # Analyze uncommitted changes
/traceback:regress --pr 142                    # Analyze specific PR
/traceback:regress --diff HEAD~5               # Last 5 commits
/traceback:regress src/services/payment.ts     # Specific file changes
/traceback:regress --depth deep                # Include transitive deps
/traceback:regress --output checklist          # QA-ready checklist
/traceback:regress --output plan               # Detailed test plan
```

## Analysis Layers

### Direct Impact (Always analyzed)
- **Modified files**: What functions/classes changed
- **Direct importers**: Files that import the changed modules
- **API consumers**: Endpoints/handlers that call changed code
- **Test coverage**: Existing tests for changed paths

### Transitive Impact (`--depth deep` or `--include-transitive`)
- **Second-order deps**: Modules that import the direct importers
- **Shared state**: Global state, databases, caches affected
- **Event chains**: Event emitters/subscribers triggered by changes
- **Configuration**: Config changes that affect multiple modules

### Historical Fragility
- **Past regressions**: Files that historically break when neighbors change
- **Bug-fix clusters**: Areas with high bug density (from `/traceback:hotspot`)
- **Revert patterns**: Changes to this area that were previously reverted
- **Incident correlation**: Past incidents triggered by similar changes

## Risk Scoring

Each regression risk is scored:

| Factor | Weight | Description |
|--------|--------|-------------|
| **Impact Severity** | 30% | User-facing vs internal, data integrity risk |
| **Change Proximity** | 25% | Direct dependency vs transitive |
| **Historical Fragility** | 20% | Past regression rate for this path |
| **Test Coverage** | 15% | Existing test protection for this path |
| **Rollback Difficulty** | 10% | How hard to revert if regression found |

## Sample Output

```
🛡️ REGRESSION RISK MAP: PR #142 (Add payment retry logic)

CHANGE SUMMARY:
  Modified: 3 files, +127 -34 lines
  Direct dependents: 8 modules
  Transitive reach: 23 modules

RISK MAP:
┌──────────────────────────┬──────┬──────────┬──────────┬──────────┐
│ Affected Area            │ Risk │ Type     │ Tests    │ Action   │
├──────────────────────────┼──────┼──────────┼──────────┼──────────┤
│ Payment processing       │ 8.5  │ Direct   │ Partial  │ TEST     │
│ Order completion flow    │ 7.2  │ Direct   │ Covered  │ VERIFY   │
│ Webhook delivery         │ 6.8  │ Direct   │ None     │ TEST     │
│ Invoice generation       │ 5.4  │ Transit. │ Covered  │ MONITOR  │
│ Email notifications      │ 4.1  │ Transit. │ Partial  │ SMOKE    │
│ Analytics events         │ 3.2  │ Transit. │ None     │ LOW      │
└──────────────────────────┴──────┴──────────┴──────────┴──────────┘

REGRESSION TEST PLAN:

MUST TEST (Risk > 7.0):
□ Payment retry with valid card → confirm retry succeeds
□ Payment retry with expired card → confirm proper failure
□ Payment retry timeout → confirm idempotency preserved
□ Order completion after retry → confirm state consistency
□ Concurrent retry attempts → confirm no double-charge

SHOULD TEST (Risk 5.0-7.0):
□ Webhook retry delivery → confirm webhook fires on retry
□ Invoice generated after retry → confirm correct amounts

SMOKE TEST (Risk 3.0-5.0):
□ Email sent after retry success → confirm notification
□ Analytics event logged → confirm event structure

HISTORICAL WARNING:
⚠️ src/services/payment.ts has 55% bug-fix rate (from hotspot data)
⚠️ Last 3 changes to payment logic caused 2 regressions

→ /traceback:testgap --diff HEAD~1   # Find test gaps in this change
→ /traceback:test --regression        # Run regression suite
→ /traceback:hotspot src/services/    # Full hotspot analysis
```

## Output Formats

### Checklist (`--output checklist`)
QA-ready markdown checklist for manual testing:
```
## Regression Checklist: PR #142

### Critical Path (Must Pass)
- [ ] Payment retry succeeds with valid card
- [ ] Payment retry fails gracefully with expired card
- [ ] No double-charge on concurrent retries
- [ ] Order state correct after retry

### Extended (Should Pass)
- [ ] Webhook fires after successful retry
- [ ] Invoice amounts correct
- [ ] Email notification sent

### Smoke (Quick Verify)
- [ ] Analytics events logged
- [ ] Admin dashboard shows retry history
```

### JSON (`--output json`)
Machine-readable for CI integration:
```json
{
  "pr": 142,
  "risk_score": 7.2,
  "affected_modules": 23,
  "test_plan": {
    "must_test": [...],
    "should_test": [...],
    "smoke_test": [...]
  }
}
```

## Execution Instructions

When this command is invoked with `$ARGUMENTS`:

1. **Parse Arguments**: Extract change source (PR, diff, path), depth, output format

2. **Change Detection**:
   - If PR: fetch diff via `gh pr diff` or git
   - If diff range: `git diff` for the commit range
   - If path: `git diff HEAD` for uncommitted changes to that path
   - Parse changed files, functions, and line ranges

3. **Dependency Graph Construction**:
   - Build import/require graph from changed files outward
   - Map direct dependents (files that import changed modules)
   - If deep: trace transitive dependents (2nd, 3rd order)
   - Identify shared state (DB tables, caches, queues)

4. **Risk Analysis**:
   - Score each affected area using the risk matrix
   - Cross-reference with hotspot data if available
   - Check existing test coverage for each affected path
   - Factor in historical regression patterns

5. **Test Plan Generation**:
   - Group affected areas by risk level
   - Generate specific test scenarios for each risk
   - Prioritize by impact and coverage gaps
   - Format according to `--output` preference

6. **State Persistence**:
   - Save analysis to `.traceback/regress-{ref}-{date}.json`
   - Link to PR/commit for future reference

7. **Present Results**:
   - Change summary and dependency reach
   - Risk map table with action recommendations
   - Tiered test plan (must/should/smoke)
   - Historical warnings from hotspot data
   - Token-optimized output by default
