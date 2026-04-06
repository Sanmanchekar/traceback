---
description: "Auto-generate incident postmortem from RCA: timeline, contributing factors, action items, owner assignments"
argument-hint: "<rca-id|incident-description> [--template standard|blameless|five-whys] [--format markdown|confluence|notion] [--include metrics|timeline|actions]"
---

# /traceback:postmortem - Incident Postmortem Generator

Auto-generates structured incident postmortem documents from RCA results. Produces timeline, contributing factors, action items with owner assignments, and lessons learned — formatted for stakeholder consumption.

## When to Use

| Scenario | Example |
|----------|---------|
| Post-incident review | Generate postmortem after resolving an outage |
| Recurring issues | Document pattern of repeated failures |
| Stakeholder reporting | Present incident analysis to leadership |
| Team retrospective | Structured material for incident review meeting |
| Compliance | Incident documentation for audit trail |

## Usage

```
/traceback:postmortem "Payment processing outage 2026-04-05"
/traceback:postmortem --rca issue-123              # From existing RCA
/traceback:postmortem --template blameless          # Blameless format
/traceback:postmortem --template five-whys          # 5-Whys analysis
/traceback:postmortem --format confluence           # Confluence markup
/traceback:postmortem --include metrics,timeline    # Extra sections
```

## Postmortem Templates

### Standard Template (default)
Full postmortem with all sections: summary, timeline, root cause, contributing factors, impact, action items, lessons learned.

### Blameless Template (`--template blameless`)
Focuses on systems and processes, not individuals. Emphasizes contributing factors, system design, and process improvements.

### Five-Whys Template (`--template five-whys`)
Structured around iterative "why?" questioning to drill to the deepest root cause.

## Sample Output

```
📋 INCIDENT POSTMORTEM
━━━━━━━━━━━━━━━━━━━━

Title: Payment Processing Outage
Date: 2026-04-05 14:23 - 15:47 UTC (84 minutes)
Severity: SEV-1
Author: Generated from Traceback RCA

EXECUTIVE SUMMARY:
Payment processing was unavailable for 84 minutes due to a database
connection pool exhaustion caused by a missing index on the orders
table. ~2,400 transactions failed, estimated revenue impact: $180K.
Resolution: Emergency index creation + connection pool increase.

TIMELINE:
┌──────────┬─────────────────────────────────────────────────┐
│ Time     │ Event                                           │
├──────────┼─────────────────────────────────────────────────┤
│ 14:23    │ 🔴 Alert: Payment error rate > 5%              │
│ 14:25    │ On-call acknowledges, begins investigation      │
│ 14:32    │ Identified: DB connections at 100% capacity     │
│ 14:38    │ Root cause: Full table scan on orders (2.1M)   │
│ 14:45    │ Mitigation: Increased pool size (50 → 100)     │
│ 14:48    │ Partial recovery (error rate drops to 8%)       │
│ 15:10    │ Fix deployed: CREATE INDEX on orders.customer_id│
│ 15:25    │ Full recovery confirmed                         │
│ 15:47    │ 🟢 Monitoring stable, incident closed          │
└──────────┴─────────────────────────────────────────────────┘

ROOT CAUSE:
Missing database index on orders.customer_id column. As order volume
grew past 2M rows, queries degraded from <50ms to >5s, exhausting
the connection pool and blocking new payment transactions.

CONTRIBUTING FACTORS:
1. No index on high-cardinality foreign key (orders.customer_id)
2. Connection pool sized for fast queries (50), insufficient for
   slow queries under load
3. No query performance monitoring/alerting on slow queries
4. Load testing didn't cover current data volume (tested at 500K rows)

IMPACT:
┌──────────────────┬────────────────────────────────┐
│ Metric           │ Value                          │
├──────────────────┼────────────────────────────────┤
│ Duration         │ 84 minutes                     │
│ Users affected   │ ~2,400 (attempted payment)     │
│ Failed txns      │ 2,387                          │
│ Revenue impact   │ ~$180,000 (est.)               │
│ SLA impact       │ 99.9% → 99.84% (monthly)      │
│ Support tickets  │ 156 created                    │
└──────────────────┴────────────────────────────────┘

ACTION ITEMS:
┌────┬─────────────────────────────────┬──────────┬──────────┬─────────┐
│ #  │ Action                          │ Owner    │ Priority │ Due     │
├────┼─────────────────────────────────┼──────────┼──────────┼─────────┤
│ 1  │ Add indexes to all FK columns   │ DB Team  │ P0       │ Apr 8   │
│ 2  │ Implement slow query alerting   │ SRE      │ P1       │ Apr 12  │
│ 3  │ Load test with production data  │ QA       │ P1       │ Apr 15  │
│ 4  │ Connection pool auto-scaling    │ Platform │ P2       │ Apr 22  │
│ 5  │ Payment queue for degraded mode │ Payments │ P2       │ May 1   │
└────┴─────────────────────────────────┴──────────┴──────────┴─────────┘

LESSONS LEARNED:
• Database indexes must be reviewed as part of schema change process
• Load testing must use production-scale data volumes
• Connection pools need headroom for query degradation scenarios
• Payment path needs graceful degradation (queue, not fail)

WHAT WENT WELL:
• Alert fired within 2 minutes of threshold breach
• On-call responded quickly and identified root cause in <15 minutes
• Mitigation (pool increase) bought time for proper fix
• Communication to stakeholders was timely and clear

WHAT COULD IMPROVE:
• No slow query monitoring existed before this incident
• Load tests used synthetic data at 25% of production volume
• No runbook for "connection pool exhaustion" scenario
• Payment system has no graceful degradation mode
```

## Execution Instructions

When this command is invoked with `$ARGUMENTS`:

1. **Parse Arguments**: Extract RCA reference or incident description, template, format

2. **Context Gathering**:
   - If `--rca`: load existing RCA from `.traceback/` state files
   - If description: run lightweight RCA to establish root cause
   - Gather timeline data from git log, deploy history, alert history
   - Collect impact metrics if available

3. **Timeline Construction**:
   - Map events chronologically from detection to resolution
   - Identify key decision points and escalations
   - Calculate duration and time-to-detect/resolve

4. **Root Cause Synthesis**:
   - Distill RCA findings into clear, non-technical explanation
   - Identify contributing factors beyond primary cause
   - Apply template structure (standard, blameless, five-whys)

5. **Impact Assessment**:
   - Calculate user/revenue/SLA impact
   - Quantify operational metrics (tickets, pages, etc.)
   - Estimate downstream effects

6. **Action Item Generation**:
   - Derive action items from root cause and contributing factors
   - Assign priorities based on impact and recurrence risk
   - Suggest owners based on affected domain
   - Set due dates based on priority

7. **Document Generation**:
   - Apply selected template structure
   - Format for target platform (markdown, confluence, notion)
   - Include all requested sections

8. **State Persistence**:
   - Save postmortem to `.traceback/postmortem-{id}-{date}.json`
   - Link to source RCA

9. **Present Results**:
   - Complete postmortem document
   - Ready for distribution to stakeholders
