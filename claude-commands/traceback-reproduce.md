---
description: "Bug reproduction assistant: parse bug reports, generate reproduction steps, identify affected code paths, suggest test fixtures"
argument-hint: "<bug-report|url|description> [--source jira|slack|github|text] [--generate-fixture] [--trace]"
---

# /traceback:reproduce - Bug Reproduction Assistant

Given a bug report (from Jira, Slack, GitHub issues, or plain text), parses the report to extract key information, generates step-by-step reproduction instructions, identifies likely affected code paths, and suggests minimal test fixtures for reliable reproduction.

## When to Use

| Scenario | Example |
|----------|---------|
| Vague bug report | "Something's broken in checkout" |
| Customer escalation | Support ticket with incomplete info |
| Intermittent bugs | Flaky behavior that's hard to pin down |
| Cross-team handoff | QA found it, dev needs to reproduce |
| Regression report | "This used to work in v2.3" |

## Usage

```
/traceback:reproduce "Users can't complete checkout on mobile"
/traceback:reproduce --source github "#issue-456"
/traceback:reproduce --source jira "PROJ-1234"
/traceback:reproduce --source slack "thread-url"
/traceback:reproduce "Payment fails intermittently" --trace
/traceback:reproduce "Login broken after deploy" --generate-fixture
```

## Report Parsing

### Information Extraction
From any bug report format, extracts:
- **What**: Actual behavior vs expected behavior
- **Where**: Affected pages, endpoints, components
- **When**: Timing, frequency, conditions
- **Who**: Affected users, roles, environments
- **How**: Steps taken, inputs provided
- **Context**: Browser, device, version, deployment

### Source Adapters

**GitHub Issues** (`--source github`):
Parses issue body, labels, linked PRs, comments for additional context.

**Jira Tickets** (`--source jira`):
Extracts description, reproduction steps, environment fields, attachments.

**Slack Threads** (`--source slack`):
Parses thread messages, screenshots references, stack traces, timestamps.

**Plain Text** (default):
Natural language parsing of bug description.

## Analysis Pipeline

### 1. Report Enrichment
- Parse error messages and stack traces
- Extract environment details (OS, browser, version)
- Identify temporal patterns (time of day, load conditions)
- Detect affected user segments

### 2. Code Path Identification
- Map symptoms to likely code paths
- Trace from endpoint/component to underlying services
- Identify recent changes to affected paths (git log)
- Cross-reference with known issue patterns from RCA engine

### 3. Reproduction Strategy
- Generate minimal reproduction steps
- Identify required preconditions (data state, auth, config)
- Suggest environment setup (local, staging, production-like)
- Flag intermittent factors (timing, concurrency, data-dependent)

### 4. Test Fixture Suggestion
- Minimal data setup for reliable reproduction
- Mock/stub recommendations for external dependencies
- Environment variables and configuration needed
- Seed data scripts or factory definitions

## Sample Output

```
🔍 BUG REPRODUCTION: "Users can't complete checkout on mobile"

PARSED REPORT:
┌──────────────┬─────────────────────────────────────────┐
│ What         │ Checkout submit button unresponsive      │
│ Where        │ /checkout page, mobile viewport          │
│ When         │ Since deploy v3.2.1 (2 days ago)        │
│ Who          │ Mobile users (iOS Safari, Chrome Android)│
│ Frequency    │ ~40% of mobile checkout attempts         │
└──────────────┴─────────────────────────────────────────┘

LIKELY CODE PATHS:
1. src/components/Checkout/SubmitButton.tsx:89
   → onClick handler may not fire on touch events
   Changed in: commit abc123 (v3.2.1)

2. src/hooks/usePayment.ts:45
   → Async validation blocking submission
   Changed in: commit def456 (v3.2.1)

3. src/api/checkout.ts:112
   → Timeout on mobile networks (3G/4G)
   No recent changes (rule out)

REPRODUCTION STEPS:
1. SETUP:
   • Device: iOS Safari or Chrome Android (or DevTools mobile emulation)
   • Network: Throttle to "Slow 3G" in DevTools
   • Auth: Login as test user (any role)
   • Data: Add 2+ items to cart (total > $50)

2. REPRODUCE:
   a. Navigate to /checkout
   b. Fill shipping form (any valid address)
   c. Select "Credit Card" payment method
   d. Enter test card: 4242 4242 4242 4242
   e. Tap "Complete Purchase" button
   f. EXPECTED: Order confirmation page
   g. ACTUAL: Button appears disabled, no response

3. VARIATIONS:
   • Works on desktop (all browsers) ✅
   • Fails on mobile Safari ~40% of time ❌
   • Fails on Chrome Android ~35% of time ❌
   • Fails more often on slow networks ❌

SUSPECTED ROOT CAUSE:
Touch event handler in SubmitButton.tsx uses onClick instead of
onTouchEnd, causing event swallowing on mobile. Compounded by
async validation in usePayment.ts that blocks on slow networks.

→ /traceback:analyze "mobile checkout failure"  # Full RCA
→ /traceback:testgap src/components/Checkout/   # Test gaps
→ /traceback:regress --diff v3.2.0..v3.2.1      # What changed
```

## Fixture Generation (`--generate-fixture`)

```
🧪 TEST FIXTURES GENERATED:

tests/fixtures/checkout-mobile-bug.ts:
  • Mock user with cart (2 items, total $75)
  • Mock payment provider (delayed response: 3s)
  • Viewport: 375x812 (iPhone 14)
  • Network: simulated 3G throttle

tests/e2e/checkout-mobile.spec.ts:
  • test_checkout_mobile_touch_event()
  • test_checkout_mobile_slow_network()
  • test_checkout_mobile_double_tap()
  • test_checkout_mobile_form_validation()

Setup command:
  npm run test:fixtures -- --file checkout-mobile-bug
```

## Execution Instructions

When this command is invoked with `$ARGUMENTS`:

1. **Parse Arguments**: Extract bug report content, source type, options

2. **Report Parsing**:
   - Extract structured data (what, where, when, who, how)
   - Parse error messages, stack traces, log snippets
   - Identify environment and version information
   - Detect severity and frequency indicators

3. **Code Path Identification**:
   - Map affected pages/endpoints to source files
   - Trace handler chain from route to service to data layer
   - Check `git log` for recent changes to affected paths
   - Cross-reference with RCA pattern database

4. **Reproduction Strategy**:
   - Determine minimal preconditions
   - Generate step-by-step reproduction instructions
   - Identify key variables that affect reproducibility
   - Suggest environment configuration

5. **Fixture Generation** (if `--generate-fixture`):
   - Create minimal data setup matching report conditions
   - Generate test file with reproduction scenarios
   - Include mock/stub configuration
   - Add environment setup instructions

6. **Code Path Tracing** (if `--trace`):
   - Deep trace from entry point through all layers
   - Map data flow and state transitions
   - Identify where behavior diverges from expected

7. **State Persistence**:
   - Save analysis to `.traceback/reproduce-{id}-{date}.json`
   - Link to source ticket/issue if applicable

8. **Present Results**:
   - Parsed report summary table
   - Likely code paths with file:line references
   - Step-by-step reproduction instructions
   - Suspected root cause with confidence
   - Next step commands for deeper analysis
   - Token-optimized output by default
