---
description: "Migration risk analyzer: scan deps, flag breaking changes, generate migration plan with rollback steps"
argument-hint: "<from-version> <to-version> [--scope runtime|deps|api|all] [--dry-run] [--generate-plan]"
---

# /traceback:migrate - Migration Risk Analyzer

Analyzes migration risk before major version upgrades (Python 3.8->3.12, Node 16->22, React 17->19, etc.). Scans dependencies, flags breaking changes, identifies deprecated API usage, and generates a phased migration plan with rollback steps.

## When to Use

| Scenario | Example |
|----------|---------|
| Runtime upgrade | Python 3.8 → 3.12, Node 16 → 22 |
| Framework migration | React 17 → 19, Django 3.2 → 5.0 |
| Database migration | PostgreSQL 13 → 16, MongoDB 5 → 7 |
| Infrastructure change | Docker Compose → Kubernetes |
| Library major bump | express@4 → express@5 |
| Breaking API changes | REST → GraphQL, monolith → microservices |

## Usage

```
/traceback:migrate "Python 3.8" "Python 3.12"
/traceback:migrate "Node 16" "Node 22" --scope deps
/traceback:migrate "React 17" "React 19" --dry-run
/traceback:migrate "Django 3.2" "Django 5.0" --generate-plan
/traceback:migrate "express@4" "express@5" --scope api
```

## Analysis Scope

### Runtime Changes (`--scope runtime`)
- **Removed features**: APIs, syntax, built-ins removed in target version
- **Behavior changes**: Semantics that changed between versions
- **New defaults**: Configuration defaults that changed
- **Deprecation timeline**: Features deprecated but still working
- **Performance characteristics**: Runtime performance changes

### Dependency Compatibility (`--scope deps`)
- **Incompatible deps**: Packages that don't support target version
- **Transitive conflicts**: Indirect dependencies with version constraints
- **Replacement needed**: Packages abandoned, need alternatives
- **Version matrix**: Compatible version ranges for each dependency
- **Lock file impact**: Expected changes to lock file

### API Breaking Changes (`--scope api`)
- **Removed APIs**: Functions, classes, methods removed
- **Signature changes**: Changed parameters, return types
- **Import path changes**: Moved modules and packages
- **Protocol changes**: Wire format, serialization changes
- **Type system changes**: Stricter typing, new type requirements

## Risk Scoring

Each migration item is scored:

| Dimension | Weight | What It Measures |
|-----------|--------|------------------|
| **Breaking Impact** | 30% | How many files/features affected |
| **Fix Complexity** | 25% | Manual effort vs automated codemod |
| **Rollback Risk** | 20% | Difficulty of reverting the change |
| **Test Coverage** | 15% | Existing tests for affected areas |
| **Dependency Chain** | 10% | Cascading effects through dep tree |

**Risk Levels**: Critical (8-10), High (6-8), Medium (4-6), Low (0-4)

## Sample Output

```
🔄 MIGRATION ANALYSIS: Python 3.8 → 3.12

RISK SUMMARY:
┌──────────────────┬───────┬──────────┬──────────────┐
│ Category         │ Items │ Risk     │ Auto-fixable │
├──────────────────┼───────┼──────────┼──────────────┤
│ Runtime Changes  │ 5     │ Medium   │ 3/5 (60%)    │
│ Dependency Compat│ 12    │ High     │ 8/12 (67%)   │
│ API Changes      │ 8     │ Medium   │ 6/8 (75%)    │
│ TOTAL            │ 25    │ HIGH     │ 17/25 (68%)  │
└──────────────────┴───────┴──────────┴──────────────┘

CRITICAL ITEMS:

1. 🚨 cryptography==3.4.8 → incompatible with Python 3.12
   Risk: 9.1 • Affects: auth, TLS, token signing
   → Upgrade to cryptography>=41.0.0 (breaking API changes in Fernet)

2. 🚨 collections.MutableMapping removed (used in 4 files)
   Risk: 7.8 • Auto-fix available
   → Replace with collections.abc.MutableMapping

3. ⚠️ asyncio.get_event_loop() behavior changed
   Risk: 6.5 • Affects: 7 async modules
   → Replace with asyncio.get_running_loop() or explicit loop creation

MIGRATION PLAN (4 phases):
Phase 1: Prep (1-2 days) → Update CI, create branch, baseline tests
Phase 2: Deps (2-3 days) → Upgrade compatible deps, replace incompatible
Phase 3: Code (3-5 days) → Apply codemods, manual fixes, type updates
Phase 4: Validate (2-3 days) → Full test suite, staging deploy, monitoring

ROLLBACK PLAN:
• Git branch-based: merge revert in <5 minutes
• Deps: lock file pinned to pre-migration versions
• CI: parallel pipeline on old runtime during validation

→ /traceback:migrate --generate-plan  # Detailed step-by-step plan
→ /traceback:estimate "migration"     # Effort estimation
→ /traceback:testgap                  # Find test gaps before migrating
```

## Plan Generation (`--generate-plan`)

Produces a detailed, actionable migration plan:

```
MIGRATION PLAN: Python 3.8 → 3.12

PHASE 1: PREPARATION (Day 1-2)
├── Create migration branch from main
├── Set up dual-version CI pipeline (3.8 + 3.12)
├── Run full test suite baseline (save results)
├── Document current dependency versions
└── Communicate timeline to team

PHASE 2: DEPENDENCY UPDATES (Day 3-5)
├── Update pyproject.toml python-requires
├── Upgrade compatible packages (batch 1: 8 packages)
├── Replace incompatible packages:
│   ├── cryptography 3.4.8 → 41.0.0 (API changes)
│   └── importlib-metadata → stdlib (Python 3.12 native)
├── Resolve transitive dependency conflicts
└── Verify dependency tree clean

PHASE 3: CODE CHANGES (Day 6-10)
├── Auto-fix (codemod): 17 issues
│   ├── collections.abc imports (4 files)
│   ├── typing backport removals (6 files)
│   └── deprecated stdlib usage (7 files)
├── Manual fixes: 8 issues
│   ├── asyncio loop handling (7 files)
│   └── Fernet API migration (1 file)
└── Type annotation updates

PHASE 4: VALIDATION (Day 11-13)
├── Full test suite on Python 3.12
├── Performance benchmark comparison
├── Staging environment deployment
├── 48-hour monitoring period
└── Remove Python 3.8 from CI

ROLLBACK TRIGGERS:
• Test failure rate > 5%
• Performance regression > 15%
• Critical security vulnerability discovered
• Blocking dependency incompatibility found
```

## Execution Instructions

When this command is invoked with `$ARGUMENTS`:

1. **Parse Arguments**: Extract source version, target version, scope, options

2. **Project Analysis**:
   - Detect current runtime/framework version from config files
   - Parse dependency manifests (package.json, pyproject.toml, Gemfile, etc.)
   - Identify all source files that may be affected

3. **Breaking Change Detection**:
   - Cross-reference project code against known breaking changes for the version range
   - Scan imports and API usage for deprecated/removed features
   - Check dependency compatibility matrices

4. **Dependency Graph Analysis**:
   - Build full dependency tree (direct + transitive)
   - Check each dependency's compatibility with target version
   - Identify replacement packages where needed
   - Calculate upgrade paths with minimal breaking changes

5. **Risk Scoring**:
   - Score each finding using the rating matrix
   - Assess auto-fix potential (codemod availability)
   - Calculate aggregate risk level

6. **Plan Generation** (if `--generate-plan`):
   - Group changes into phases by dependency order
   - Estimate time per phase
   - Generate rollback procedures for each phase
   - Create validation checkpoints

7. **State Persistence**:
   - Save analysis to `.traceback/migration-{from}-{to}-{date}.json`
   - Track migration progress if plan is executed

8. **Present Results**:
   - Risk summary table with category breakdown
   - Critical items with specific fix instructions
   - Migration plan overview with phase timeline
   - Rollback strategy
   - Token-optimized output by default
