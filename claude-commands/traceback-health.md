---
description: "Service health scorecard: aggregate RCAs, incident frequency, MTTR, debt score into a dashboard-ready report per service"
argument-hint: "[service|path] [--period 7d|30d|90d] [--compare previous] [--format json|markdown|dashboard]"
---

# /traceback:health - Service Health Scorecard

Aggregates recent RCAs, incident frequency, mean time to resolve (MTTR), technical debt score, test coverage, and performance metrics into a dashboard-ready scorecard. Gives PMs visibility into service health without asking devs.

## When to Use

| Scenario | Example |
|----------|---------|
| Sprint review | Present service health trends to team |
| Stakeholder reporting | Monthly health report for leadership |
| Prioritization | Data-driven decisions on where to invest |
| Team allocation | Evidence for headcount/resource requests |
| Risk assessment | Pre-launch readiness check |

## Usage

```
/traceback:health                              # Overall project health
/traceback:health src/services/payments/       # Specific service
/traceback:health --period 30d                 # Last 30 days
/traceback:health --period 90d --compare previous  # Compare to prior period
/traceback:health --format json                # Machine-readable
/traceback:health --format dashboard           # Dashboard-ready metrics
```

## Scorecard Dimensions

### Reliability Score (0-100)
- **Incident frequency**: Number of incidents in period
- **MTTR**: Mean time to resolve
- **MTBF**: Mean time between failures
- **Error rate**: Percentage of failed requests/operations
- **Uptime**: Calculated availability percentage

### Code Quality Score (0-100)
- **Tech debt**: From `/traceback:debt` scan results
- **Test coverage**: Percentage of code with tests
- **Complexity**: Average cyclomatic/cognitive complexity
- **Hotspot density**: From `/traceback:hotspot` analysis
- **Code smells**: Issues per 1K lines of code

### Performance Score (0-100)
- **Response time**: P50/P95/P99 latency
- **Throughput**: Requests per second capacity
- **Resource efficiency**: CPU/memory utilization
- **Scalability**: Performance under load

### Velocity Score (0-100)
- **Deploy frequency**: How often the service ships
- **Lead time**: Commit to production time
- **Change failure rate**: Percentage of deploys causing incidents
- **Recovery time**: Time to restore after failed deploy

## Sample Output

```
📊 SERVICE HEALTH SCORECARD: my-project
   Period: Last 30 days (2026-03-07 to 2026-04-06)

OVERALL HEALTH: 72/100 ⚠️ (was 68/100, ↑4)

┌─────────────────┬───────┬───────┬────────┬──────────────────┐
│ Dimension       │ Score │ Trend │ Grade  │ Key Metric       │
├─────────────────┼───────┼───────┼────────┼──────────────────┤
│ Reliability     │ 78    │ ↑5    │ B+     │ MTTR: 47min      │
│ Code Quality    │ 62    │ ↓3    │ C      │ Coverage: 58%    │
│ Performance     │ 81    │ ↑8    │ A-     │ P95: 420ms       │
│ Velocity        │ 67    │ ↑2    │ C+     │ 12 deploys/month │
└─────────────────┴───────┴───────┴────────┴──────────────────┘

RELIABILITY DETAILS:
  Incidents: 3 (↓2 from previous period)
  MTTR: 47 min avg (↓15 min improvement)
  MTBF: 10 days avg
  Error rate: 0.12%
  Uptime: 99.94%

CODE QUALITY DETAILS:
  Tech debt items: 35 (↑8 new items)
  Test coverage: 58% (↓2% from previous)
  Hotspots: 5 critical files
  Avg complexity: 12.3 (target: <10)

PERFORMANCE DETAILS:
  P50: 180ms (↓20ms improvement)
  P95: 420ms (↓80ms improvement)
  P99: 890ms (↓210ms improvement)
  Throughput: 1.2K req/s

VELOCITY DETAILS:
  Deploys: 12 (↑2 from previous)
  Lead time: 2.3 days avg
  Change failure: 8.3% (1 of 12)
  Recovery time: 12 min avg

TOP CONCERNS:
1. ⚠️ Test coverage declining (58% → 56% trend)
2. ⚠️ Tech debt growing (+8 items/month)
3. ⚠️ 5 critical hotspot files need attention

RECOMMENDATIONS:
• Allocate 20% sprint capacity to test coverage
• Address top 3 hotspot files (see /traceback:hotspot)
• Set up slow query alerting (3 incidents were DB-related)

→ /traceback:health --compare previous     # Period comparison
→ /traceback:debt                           # Full debt breakdown
→ /traceback:hotspot                        # Hotspot details
```

## Period Comparison (`--compare previous`)

```
📊 HEALTH COMPARISON: Last 30d vs Previous 30d

┌─────────────────┬──────────┬──────────┬────────┐
│ Metric          │ Current  │ Previous │ Change │
├─────────────────┼──────────┼──────────┼────────┤
│ Overall Score   │ 72       │ 68       │ ↑4  ✅ │
│ Incidents       │ 3        │ 5        │ ↓2  ✅ │
│ MTTR            │ 47 min   │ 62 min   │ ↓15 ✅ │
│ Test Coverage   │ 58%      │ 60%      │ ↓2% ⚠️ │
│ Tech Debt Items │ 35       │ 27       │ ↑8  ❌ │
│ Deploys         │ 12       │ 10       │ ↑2  ✅ │
│ P95 Latency     │ 420ms    │ 500ms    │ ↓80 ✅ │
└─────────────────┴──────────┴──────────┴────────┘

TREND: Improving reliability and performance, but quality debt
is accumulating. Recommend dedicating next sprint to coverage.
```

## Dashboard Format (`--format dashboard`)

Outputs JSON structure optimized for dashboard tools (Grafana, Datadog, custom dashboards):

```json
{
  "service": "my-project",
  "period": "30d",
  "scores": {
    "overall": 72,
    "reliability": 78,
    "quality": 62,
    "performance": 81,
    "velocity": 67
  },
  "metrics": { ... },
  "trends": { ... },
  "alerts": [ ... ]
}
```

## Execution Instructions

When this command is invoked with `$ARGUMENTS`:

1. **Parse Arguments**: Extract service/path, period, comparison flag, format

2. **Data Aggregation**:
   - Scan `.traceback/` for RCA results in the period
   - Run `/traceback:debt` scan for current debt metrics
   - Run `/traceback:hotspot` for churn/bug correlation
   - Parse git log for velocity metrics (deploy frequency, lead time)
   - Collect test coverage from project test runner

3. **Score Calculation**:
   - **Reliability**: Weighted formula from incident count, MTTR, MTBF, error rate
   - **Code Quality**: Weighted formula from debt, coverage, complexity, hotspots
   - **Performance**: Weighted formula from latency percentiles, throughput, resource usage
   - **Velocity**: Weighted formula from deploy frequency, lead time, failure rate
   - **Overall**: Balanced average of all dimensions

4. **Period Comparison** (if `--compare`):
   - Load previous period data from `.traceback/` history
   - Calculate deltas and trend direction for each metric
   - Identify improving vs declining areas

5. **Report Generation**:
   - Apply format (markdown, json, dashboard)
   - Include top concerns and recommendations
   - Generate trend arrows and grade letters

6. **State Persistence**:
   - Save scorecard to `.traceback/health-{date}.json`
   - Enable historical trend tracking

7. **Present Results**:
   - Overall health score with trend
   - Dimension breakdown table
   - Top concerns and recommendations
   - Token-optimized output by default
