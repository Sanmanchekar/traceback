---
description: "Test coverage gap finder: identify missing test cases from RCA, code changes, or coverage data, generate test skeletons"
argument-hint: "<path|rca-id|pr-diff> [--type unit|integration|edge|all] [--generate] [--framework jest|pytest|go|auto]"
---

# /traceback:testgap - Test Coverage Gap Finder

Given an RCA result, a code change, or a directory path, identifies which test cases are missing. Maps source code to test files, detects untested critical paths, and generates test skeletons (unit, integration, edge cases) in your project's test framework.

## When to Use

| Scenario | Example |
|----------|---------|
| Post-RCA | Find test gaps that allowed the bug to reach production |
| Pre-merge | Ensure a PR has adequate test coverage |
| Pre-migration | Verify test safety net before major changes |
| Sprint planning | Scope test writing work |
| Quality audit | Assess overall test health |

## Usage

```
/traceback:testgap                             # Scan entire repo
/traceback:testgap src/services/               # Specific directory
/traceback:testgap --rca issue-123             # Based on RCA findings
/traceback:testgap --diff HEAD~3               # Based on recent changes
/traceback:testgap --type edge                 # Focus on edge cases
/traceback:testgap --generate                  # Generate test skeletons
/traceback:testgap --framework pytest          # Target specific framework
```

## Gap Detection Strategies

### Source-to-Test Mapping
- **Convention matching**: `src/foo.ts` → `test/foo.test.ts`, `src/foo.py` → `tests/test_foo.py`
- **Missing test files**: Source files with no corresponding test file
- **Partial coverage**: Test files that exist but don't cover all exports/methods
- **Import tracing**: Functions called in hot paths but never tested

### RCA-Driven Gap Analysis (`--rca`)
- **Root cause paths**: Code paths that led to the bug — were they tested?
- **Fix coverage**: Does the fix include regression tests?
- **Propagation paths**: Are dependent modules tested for this failure mode?
- **Error handling**: Were error/exception paths tested?

### Change-Driven Gap Analysis (`--diff`)
- **New code**: Added functions/classes without corresponding tests
- **Modified logic**: Changed branches/conditions without updated tests
- **Deleted tests**: Tests removed without replacement
- **Affected dependencies**: Downstream code affected by changes

### Edge Case Detection (`--type edge`)
- **Boundary values**: Min/max values, empty inputs, null/undefined
- **Error conditions**: Network failures, timeout, invalid data
- **Concurrency**: Race conditions, parallel access, deadlocks
- **State transitions**: Invalid state sequences, partial failures
- **Data variations**: Unicode, large payloads, special characters

## Gap Scoring

Each gap is prioritized:

| Factor | Weight | Description |
|--------|--------|-------------|
| **Criticality** | 35% | Business impact of the untested path |
| **Bug History** | 25% | Past bugs in this area (from git/RCA history) |
| **Complexity** | 20% | Code complexity of untested path |
| **Change Frequency** | 20% | How often this code changes |

## Sample Output

```
🧪 TEST GAP ANALYSIS: my-project/

COVERAGE SUMMARY:
┌──────────────────┬──────────┬──────────┬──────────┐
│ Category         │ Files    │ Coverage │ Gaps     │
├──────────────────┼──────────┼──────────┼──────────┤
│ Unit Tests       │ 42/67    │ 63%      │ 25 files │
│ Integration      │ 8/15     │ 53%      │ 7 suites │
│ Edge Cases       │ --       │ ~30%     │ 18 cases │
│ Error Paths      │ --       │ ~25%     │ 22 paths │
└──────────────────┴──────────┴──────────┴──────────┘

CRITICAL GAPS (by priority):

1. 🚨 src/services/payment.ts — NO TESTS (Priority: 9.4)
   Handles: card processing, refunds, webhooks
   Bug history: 5 incidents in 90 days
   → Generate: 12 unit tests, 4 integration, 8 edge cases

2. 🚨 src/api/auth.py — Partial (42%) (Priority: 8.7)
   Missing: token refresh, session expiry, rate limiting
   Bug history: 3 security issues
   → Generate: 6 unit tests, 3 integration, 5 edge cases

3. ⚠️ src/models/order.py — Partial (58%) (Priority: 7.2)
   Missing: state transitions, concurrent updates, cancellation
   → Generate: 8 unit tests, 2 integration, 4 edge cases

→ /traceback:testgap --generate       # Generate all test skeletons
→ /traceback:regress                   # Regression risk analysis
→ /traceback:debt --focus tests        # Full test debt overview
```

## Test Skeleton Generation (`--generate`)

When `--generate` is used, creates ready-to-fill test files:

```
🧪 GENERATED TEST SKELETONS:

Created 3 test files with 24 test cases:

tests/test_payment.py (12 tests)
├── test_process_card_valid()
├── test_process_card_declined()
├── test_process_card_expired()
├── test_process_card_network_error()
├── test_refund_full()
├── test_refund_partial()
├── test_refund_already_refunded()
├── test_webhook_valid_signature()
├── test_webhook_invalid_signature()
├── test_webhook_replay_attack()
├── test_concurrent_charges()
└── test_idempotency_key_reuse()

tests/test_auth_extended.py (6 tests)
├── test_token_refresh_valid()
├── test_token_refresh_expired()
├── test_session_expiry()
├── test_rate_limit_exceeded()
├── test_concurrent_login()
└── test_brute_force_lockout()

tests/integration/test_order_flow.py (6 tests)
├── test_order_create_to_complete()
├── test_order_cancel_in_progress()
├── test_order_concurrent_update()
├── test_order_partial_failure_rollback()
├── test_order_state_machine_invalid()
└── test_order_cross_service_consistency()

→ Fill in test implementations
→ /traceback:test --type all          # Run all tests after filling
```

## Execution Instructions

When this command is invoked with `$ARGUMENTS`:

1. **Parse Arguments**: Extract target, analysis type, generation flag, framework

2. **Framework Detection**:
   - Detect test framework from config (jest.config, pytest.ini, etc.)
   - Identify test directory structure and naming conventions
   - Determine assertion library and patterns in use

3. **Source-Test Mapping**:
   - Map source files to test files using project conventions
   - Identify files with no test file
   - Parse existing test files for covered functions/methods

4. **Gap Detection**:
   - Compare exported/public APIs against test coverage
   - Identify untested branches, error paths, edge cases
   - If `--rca`: trace root cause paths and check coverage
   - If `--diff`: analyze changed code for new untested paths

5. **Gap Scoring**:
   - Score each gap using the priority matrix
   - Cross-reference with git history for bug correlation
   - Factor in code complexity and change frequency

6. **Skeleton Generation** (if `--generate`):
   - Create test files following project conventions
   - Generate test function stubs with descriptive names
   - Include setup/teardown boilerplate
   - Add TODO comments for implementation guidance

7. **State Persistence**:
   - Save results to `.traceback/testgap-{date}.json`
   - Link to RCA if `--rca` was used

8. **Present Results**:
   - Coverage summary table
   - Critical gaps with priority and fix suggestions
   - Generated file list if `--generate` used
   - Token-optimized output by default
