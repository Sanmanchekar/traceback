---
description: "Check current analysis status, solutions, and implementation progress"
argument-hint: "[--detailed] [--history] [--metrics]"
---

# /traceback:status - Analysis Status & Progress

Comprehensive status dashboard showing current analysis state, available solutions, implementation progress, and system health.

## Usage

```
/traceback:status                    # Quick status overview (optimized)
/traceback:status --history          # Show analysis history and trends
/traceback:status --metrics          # Include performance metrics and benchmarks
/traceback:status --verbose          # Detailed analysis with full information
```

## 🎯 Token Optimization (Built-in)

**Ultra-compressed status saves 60% tokens:**
- **Compact dashboards** with essential info only
- **Symbol indicators** for quick status checks
- **Abbreviated metrics** in tabular format
- **Smart summaries** of current state

Use `--verbose` for comprehensive details.

## Sample Output

```
📊 TRACEBACK STATUS OVERVIEW

┌─────────────────────────────────────────────────────────────────────────┐
│ CURRENT ANALYSIS                                                        │
├─────────────────────────────────────────────────────────────────────────┤
│ Issue: API endpoints are timing out under load                         │
│ Mode: standard                                                          │
│ Started: 2026-03-31 14:23:17                                           │
│ Status: ✅ ANALYSIS COMPLETE                                            │
│ Confidence: 94%                                                         │
│                                                                         │
│ Root Causes Found: 3                                                   │
│   1. Database N+1 query problem (confidence: 92%)                      │
│   2. Missing connection pooling (confidence: 78%)                      │
│   3. Inefficient caching strategy (confidence: 65%)                    │
│                                                                         │
│ Solutions Generated: 5                                                  │
│ Recommended: Optimize Database Queries (score: 8.7/10)                │
│ Implementation Status: Ready for execution                              │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ SOLUTION PORTFOLIO                                                      │
├─────────────────────────────────────────────────────────────────────────┤
│ 1. ✅ Optimize Database Queries            8.7/10  [RECOMMENDED]       │
│ 2. 🔄 Advanced Caching Layer               8.1/10  [ALTERNATIVE]       │
│ 3. 🔄 Database Connection Pooling          7.9/10  [ALTERNATIVE]       │
│ 4. 🔄 API Response Compression             7.2/10  [ALTERNATIVE]       │
│ 5. 🔄 Load Balancer Optimization           6.8/10  [ALTERNATIVE]       │
│                                                                         │
│ Active Constraints: 3                                                   │
│   • No downtime allowed (type: invariant)                              │
│   • Complete within 2 weeks (type: boundary)                           │
│   • Improve performance by 50%+ (type: goal)                           │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ SYSTEM HEALTH                                                           │
├─────────────────────────────────────────────────────────────────────────┤
│ Repository: /Users/sushant/Documents/Agent/traceback                   │
│ Branch: main (clean working directory)                                  │
│ Last Commit: 8621228 - Update installation documentation               │
│                                                                         │
│ Dependencies: ✅ All requirements satisfied                             │
│ Test Suite: ✅ All tests passing (last run: 2 hours ago)               │
│ Performance: ⚠️ API response time: 2.3s (target: <500ms)               │
│ Monitoring: ✅ Active (3 alerts configured)                             │
└─────────────────────────────────────────────────────────────────────────┘

NEXT ACTIONS:
/traceback:recommend                     Get detailed recommendation
/traceback:implement solution-1          Execute recommended solution  
/traceback:solutions --top 3             Review top alternatives
/traceback:constraint "add requirement"  Add additional constraints
```

## Detailed Status Output

Using `--detailed` flag:

```
/traceback:status --detailed

📊 DETAILED TRACEBACK STATUS

┌─────────────────────────────────────────────────────────────────────────┐
│ ANALYSIS DETAILS                                                        │
├─────────────────────────────────────────────────────────────────────────┤
│ Issue: API endpoints are timing out under load                         │
│ Analysis Mode: standard (comprehensive analysis)                        │
│ Started: 2026-03-31 14:23:17                                           │
│ Completed: 2026-03-31 14:25:42                                         │
│ Duration: 2 minutes 25 seconds                                          │
│ Confidence: 94% (high confidence in analysis)                          │
│                                                                         │
│ ROOT CAUSES ANALYSIS:                                                   │
│                                                                         │
│ 1. Database N+1 Query Problem (92% confidence)                         │
│    Category: Technical/Performance                                      │
│    Evidence: • 47 queries per API request (expected: 3-5)              │
│             • select_related/prefetch_related missing                   │
│             • Django ORM generating individual queries                  │
│    Impact: Primary cause of 70%+ performance degradation               │
│                                                                         │
│ 2. Missing Connection Pooling (78% confidence)                         │
│    Category: Infrastructure/Configuration                               │
│    Evidence: • New connection per request observed                      │
│             • Connection establishment overhead: 50-100ms               │
│             • Database connection limits reached under load             │
│    Impact: Secondary cause contributing 20% performance impact         │
│                                                                         │
│ 3. Inefficient Caching Strategy (65% confidence)                       │
│    Category: Architectural/Performance                                  │
│    Evidence: • No caching headers on API responses                      │
│             • Repeated expensive computations observed                  │
│             • Browser/CDN cache miss rate: 85%+                         │
│    Impact: Tertiary cause, affects repeat requests                     │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ SOLUTION ANALYSIS DETAILS                                               │
├─────────────────────────────────────────────────────────────────────────┤
│ 1. Optimize Database Queries with Eager Loading        Score: 8.7/10   │
│    Implementation Strategy: incremental                                 │
│    Risk Level: low                                                      │
│    Estimated Effort: 18-24 hours                                       │
│    Dependencies: ORM upgrade, query refactoring                        │
│    Success Probability: 94%                                            │
│    Performance Impact: 75-85% improvement expected                     │
│                                                                         │
│    Dimensional Breakdown:                                               │
│    • Security: 9.0/10 (no security implications)                       │
│    • Scalability: 8.5/10 (better performance under load)              │
│    • Maintainability: 8.0/10 (cleaner query patterns)                 │
│    • Performance: 9.8/10 (directly addresses N+1 problem)             │
│    • Cost: 8.2/10 (reasonable implementation time)                     │
│                                                                         │
│    Constraint Satisfaction:                                             │
│    ✅ No downtime required (incremental rollout possible)              │
│    ✅ Complete within 2 weeks (estimated 3-4 days)                     │
│    ✅ Improve performance by 50%+ (targeting 75%+)                     │
│                                                                         │
│ 2. Advanced Caching Layer Implementation               Score: 8.1/10   │
│    Implementation Strategy: phased                                      │
│    Risk Level: medium                                                   │
│    Estimated Effort: 32-48 hours                                       │
│    Dependencies: Redis setup, cache strategy design                    │
│    Success Probability: 87%                                            │
│    Performance Impact: 60-80% improvement expected                     │
│    [Additional details...]                                             │
└─────────────────────────────────────────────────────────────────────────┘

[Additional sections for remaining solutions...]
```

## History Mode

Using `--history` flag shows analysis trends:

```
/traceback:status --history

📈 ANALYSIS HISTORY & TRENDS

┌─────────────────────────────────────────────────────────────────────────┐
│ RECENT ANALYSES (Last 30 days)                                         │
├─────────────────────────────────────────────────────────────────────────┤
│ 2026-03-31 14:23  API endpoints timing out           ✅ COMPLETE       │
│ 2026-03-28 09:15  Memory leak in user service        ✅ IMPLEMENTED    │
│ 2026-03-25 16:42  Database deadlock issues           ✅ IMPLEMENTED    │
│ 2026-03-22 11:30  CI pipeline failing tests          ✅ IMPLEMENTED    │
│ 2026-03-19 13:20  Authentication token expiration    ✅ IMPLEMENTED    │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ IMPLEMENTATION SUCCESS METRICS                                         │
├─────────────────────────────────────────────────────────────────────────┤
│ Total Analyses: 15                                                      │
│ Implementations: 12                                                     │
│ Success Rate: 80% (12/15)                                              │
│                                                                         │
│ Average Solution Ratings:                                               │
│   Security: 8.3/10                                                     │
│   Scalability: 7.9/10                                                  │
│   Maintainability: 8.1/10                                              │
│   Performance: 8.7/10                                                  │
│   Cost: 7.5/10                                                         │
│                                                                         │
│ Implementation Time Accuracy:                                           │
│   Within Estimate: 75% (9/12)                                          │
│   Average Variance: +23% (implementations took 23% longer on average)  │
│                                                                         │
│ Top Root Cause Categories:                                              │
│   1. Performance/Database: 40% (6/15)                                  │
│   2. Infrastructure/Config: 27% (4/15)                                 │
│   3. Code Quality/Architecture: 20% (3/15)                             │
│   4. Security/Compliance: 13% (2/15)                                   │
└─────────────────────────────────────────────────────────────────────────┘
```

## Metrics Mode

Using `--metrics` includes performance data:

```
/traceback:status --metrics

📊 PERFORMANCE METRICS & BENCHMARKS

┌─────────────────────────────────────────────────────────────────────────┐
│ CURRENT SYSTEM PERFORMANCE                                              │
├─────────────────────────────────────────────────────────────────────────┤
│ API Response Times (Last 24h):                                         │
│   /api/users/profile    Avg: 2.3s  P95: 4.1s  P99: 8.2s  ❌ HIGH      │
│   /api/orders/list      Avg: 1.8s  P95: 3.2s  P99: 6.1s  ❌ HIGH      │
│   /api/dashboard        Avg: 3.1s  P95: 5.4s  P99: 11.3s ❌ CRITICAL   │
│   /api/reports          Avg: 4.2s  P95: 7.8s  P99: 15.1s ❌ CRITICAL   │
│                                                                         │
│ Database Metrics:                                                       │
│   Query Count per Request: 47 avg (target: <10)       ❌ HIGH          │
│   Connection Pool Usage: 85% (near limit)             ⚠️ WARNING       │
│   Slow Query Count: 156/hour                          ❌ HIGH          │
│   Deadlock Rate: 0.02% (acceptable)                   ✅ OK            │
│                                                                         │
│ System Resources:                                                       │
│   CPU Usage: 45% avg, 78% peak                        ⚠️ WARNING       │
│   Memory Usage: 62% avg, 89% peak                     ⚠️ WARNING       │
│   Disk I/O: 234 IOPS avg (capacity: 1000)            ✅ OK            │
│   Network: 45 Mbps avg (capacity: 1 Gbps)            ✅ OK            │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ PROJECTED IMPROVEMENT (After Recommended Solution)                      │
├─────────────────────────────────────────────────────────────────────────┤
│ API Response Times (Projected):                                         │
│   /api/users/profile    2.3s → 0.4s (83% improvement) ✅ TARGET MET     │
│   /api/orders/list      1.8s → 0.3s (83% improvement) ✅ TARGET MET     │
│   /api/dashboard        3.1s → 0.6s (81% improvement) ✅ TARGET MET     │
│   /api/reports          4.2s → 0.9s (79% improvement) ✅ TARGET MET     │
│                                                                         │
│ Database Impact (Projected):                                            │
│   Query Count: 47 → 8 per request (83% reduction)     ✅ TARGET MET     │
│   Connection Pool: 85% → 45% usage                    ✅ IMPROVED       │
│   Slow Queries: 156/hour → 25/hour (84% reduction)   ✅ TARGET MET     │
│                                                                         │
│ Confidence in Projections: 92% (based on similar implementations)      │
└─────────────────────────────────────────────────────────────────────────┘
```

## Status for No Analysis

When no analysis has been performed:

```
/traceback:status

📊 TRACEBACK STATUS

┌─────────────────────────────────────────────────────────────────────────┐
│ NO ACTIVE ANALYSIS                                                      │
├─────────────────────────────────────────────────────────────────────────┤
│ Status: Ready for new analysis                                          │
│ Repository: /Users/sushant/Documents/Agent/traceback                   │
│ Branch: main (clean working directory)                                  │
│                                                                         │
│ System Health: ✅ All systems operational                               │
│ Dependencies: ✅ All requirements satisfied                             │
│ Test Suite: ✅ All tests passing                                        │
└─────────────────────────────────────────────────────────────────────────┘

GET STARTED:
/traceback:analyze "describe your issue"     Start root cause analysis
/traceback:analyze "slow API" --mode quick   Quick analysis for simple issues

RECENT HISTORY:
Last analysis: 2026-03-28 (Memory leak in user service) ✅ IMPLEMENTED
```

## Integration with Other Commands

The status command provides context for:

### Decision Making
- Shows constraint satisfaction for all solutions
- Displays confidence levels and risk assessments
- Provides implementation time estimates and success probabilities

### Progress Tracking
- Monitors implementation phases and completion
- Tracks success metrics and performance improvements  
- Maintains audit trail of all analyses and implementations

### System Health
- Real-time performance monitoring integration
- Test suite status and regression detection
- Dependency and environment validation

## Best Practices

### Regular Status Checks
- Check status before starting new analyses
- Monitor implementation progress during execution
- Validate success metrics after completion

### Trend Analysis
- Use `--history` to identify recurring issues
- Track implementation success rates over time
- Monitor performance trends and system health

### Metrics Integration
- Use `--metrics` for data-driven decision making
- Establish performance baselines and targets
- Validate projected improvements with actual results

## Related Commands

- `/traceback:analyze` - Start new root cause analysis
- `/traceback:solutions` - Review available solutions
- `/traceback:recommend` - Get implementation recommendation
- `/traceback:implement` - Execute chosen solution
- `/traceback:constraint` - Add or modify constraints

## Execution Instructions

When this command is invoked with `$ARGUMENTS`:

1. **Parse Status Request**: Extract detail level and specific focus areas
2. **Gather Current State**: Load active analysis, solutions, constraints, and implementation status
3. **System Health Check**: Verify repository state, dependencies, tests, and performance metrics
4. **Format Display**:
   - Show current analysis status and available solutions
   - Include constraint satisfaction and recommendation state
   - Display system health and performance indicators
   - Add historical context if requested
5. **Provide Guidance**: Suggest appropriate next actions based on current state

Can be executed at any time without prerequisites to check overall system status.