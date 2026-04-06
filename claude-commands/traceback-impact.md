---
description: "Change impact report for PMs: translate technical changes into user impact, affected features, estimated downtime, rollback time"
argument-hint: "<change-description|pr|diff> [--audience pm|stakeholder|exec] [--format markdown|slack|jira] [--include rollback|timeline|users]"
---

# /traceback:impact - Change Impact Report

Takes a technical change (PR, commit, proposed modification) and translates it into a PM-friendly report: which users are affected, what features are at risk, estimated downtime, rollback time, and deployment considerations. Output formatted for Markdown, Slack, or Jira.

## When to Use

| Scenario | Example |
|----------|---------|
| Pre-deploy briefing | PM needs to know what's shipping |
| Stakeholder update | Executive summary of technical changes |
| Release notes draft | User-facing change summary |
| Risk communication | Flag risky changes to product team |
| Incident communication | Translate outage cause for non-technical audience |

## Usage

```
/traceback:impact "Add payment retry logic"
/traceback:impact --pr 142
/traceback:impact --diff v3.1..v3.2
/traceback:impact --audience exec              # Executive summary
/traceback:impact --format slack               # Slack-ready blocks
/traceback:impact --format jira                # Jira comment format
/traceback:impact --include rollback,timeline  # Extra sections
```

## Report Sections

### User Impact Assessment
- **Affected users**: Which user segments experience change
- **Behavior changes**: What users will see/experience differently
- **Downtime estimate**: Expected service interruption (if any)
- **Feature flags**: Whether change can be toggled without deploy

### Risk Summary
- **Risk level**: Low / Medium / High / Critical
- **Blast radius**: Number of features/users potentially affected
- **Rollback time**: How fast we can revert if issues arise
- **Rollback method**: Deploy revert, feature flag, database rollback

### Timeline
- **Deploy window**: Recommended deployment time
- **Monitoring period**: How long to watch before declaring success
- **Full rollout**: Timeline for gradual rollout if applicable

## Sample Output

```
📊 IMPACT REPORT: PR #142 — Payment Retry Logic

FOR: Product Team | Generated: 2026-04-06

WHAT'S CHANGING:
When a payment fails due to a temporary network issue, the system
will now automatically retry up to 3 times before showing an error.
Previously, any payment failure immediately showed an error message.

USER IMPACT:
┌──────────────────┬──────────────────────────────────────┐
│ Who              │ All users making payments (~12K/day) │
│ What they'll see │ Fewer "payment failed" errors        │
│ Behavior change  │ 2-5s longer wait on network issues   │
│ Downtime         │ None (zero-downtime deploy)          │
│ Risk to users    │ LOW — retry is additive, no removal  │
└──────────────────┴──────────────────────────────────────┘

FEATURES AT RISK:
┌─────────────────────┬──────┬────────────────────────────┐
│ Feature             │ Risk │ Detail                     │
├─────────────────────┼──────┼────────────────────────────┤
│ Checkout flow       │ Low  │ Retry adds reliability     │
│ Subscription renew  │ Low  │ Same retry logic applies   │
│ Refund processing   │ None │ Not affected by this PR    │
│ Payment webhooks    │ Med  │ Retry may trigger dup hooks│
└─────────────────────┴──────┴────────────────────────────┘

ROLLBACK PLAN:
• Method: Feature flag (instant kill switch)
• Time to rollback: <1 minute (flag toggle)
• Data impact: None (retries are stateless)
• Who can rollback: Any engineer or on-call

DEPLOY RECOMMENDATION:
• Window: Business hours (for monitoring)
• Strategy: Gradual rollout (10% → 50% → 100%)
• Monitoring: 2-hour watch at each stage
• Success metric: Payment failure rate drops from 3.2% to <1%

STAKEHOLDER SUMMARY (1 sentence):
Payment reliability improvement that reduces customer-facing payment
errors by ~60% with zero downtime and instant rollback capability.
```

## Output Formats

### Slack (`--format slack`)
Formatted with Slack block kit structure for direct posting.

### Jira (`--format jira`)
Formatted for Jira comment/description with proper markup.

### Markdown (`--format markdown`, default)
Standard markdown for docs, wikis, or PR descriptions.

## Audience Levels

### PM (`--audience pm`, default)
Full technical context translated to product language.

### Stakeholder (`--audience stakeholder`)
Business impact focus, minimal technical details.

### Executive (`--audience exec`)
One-paragraph summary with risk level and key metric.

## Execution Instructions

When this command is invoked with `$ARGUMENTS`:

1. **Parse Arguments**: Extract change reference, audience, format, included sections

2. **Change Analysis**:
   - If PR: fetch diff and description via git/GitHub
   - If diff range: `git diff` and `git log` for commits
   - If description: analyze against codebase for affected areas
   - Identify all modified files, functions, and behavior changes

3. **User Impact Mapping**:
   - Map code changes to user-facing features
   - Identify affected user segments from route/permission analysis
   - Assess behavior changes (additive, modified, removed)
   - Estimate downtime from deployment strategy

4. **Risk Assessment**:
   - Calculate blast radius (features and users affected)
   - Assess rollback complexity and time
   - Factor in test coverage and historical fragility
   - Determine overall risk level

5. **Report Generation**:
   - Translate technical changes to audience-appropriate language
   - Structure report by sections requested
   - Apply output format (markdown, slack, jira)
   - Generate stakeholder summary

6. **State Persistence**:
   - Save report to `.traceback/impact-{ref}-{date}.json`

7. **Present Results**:
   - User impact table
   - Feature risk matrix
   - Rollback plan
   - Deploy recommendation
   - One-sentence stakeholder summary
