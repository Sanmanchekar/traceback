---
description: "Performance profiler: detect N+1 queries, missing indexes, caching opportunities from logs, traces, or code analysis"
argument-hint: "<target|logs|path> [--focus queries|api|memory|bundle] [--input logs|traces|code] [--baseline <file>]"
---

# /traceback:perf - Performance Profiler

Extends Traceback's RCA engine for proactive performance analysis. Feed it slow query logs, APM traces, endpoint latency data, or let it analyze code directly to detect N+1 queries, missing indexes, caching opportunities, memory leaks, and bundle bloat.

## When to Use

| Scenario | Example |
|----------|---------|
| Slow API responses | Profile endpoints to find bottlenecks |
| Database performance | Detect N+1 queries, missing indexes |
| Memory growth | Identify leak patterns and retention issues |
| Bundle optimization | Find code splitting and tree-shaking opportunities |
| Pre-launch audit | Validate performance before release |
| Post-incident | Analyze APM data after a performance degradation |

## Usage

```
/traceback:perf                                # Analyze current codebase
/traceback:perf src/api/                       # Profile specific directory
/traceback:perf --focus queries                # Database query analysis
/traceback:perf --focus api                    # API endpoint profiling
/traceback:perf --focus memory                 # Memory usage patterns
/traceback:perf --focus bundle                 # Frontend bundle analysis
/traceback:perf --input logs slow-query.log    # Analyze log file
/traceback:perf --baseline perf-baseline.json  # Compare against baseline
```

## Analysis Modes

### Query Analysis (`--focus queries`)
- **N+1 Detection**: ORM patterns that generate excessive queries
- **Missing Indexes**: Columns used in WHERE/JOIN without indexes
- **Full Table Scans**: Queries without proper filtering
- **Inefficient Joins**: Cartesian products, unnecessary joins
- **Query Caching**: Repeated identical queries that should be cached
- **Connection Management**: Pool exhaustion, connection leaks

### API Profiling (`--focus api`)
- **Endpoint Latency**: P50/P95/P99 response time mapping
- **Serialization Overhead**: Expensive serialization in hot paths
- **Middleware Bottlenecks**: Slow middleware in request pipeline
- **Payload Bloat**: Over-fetching, unnecessary fields in responses
- **Rate Limiting**: Missing or misconfigured rate limits
- **Async Opportunities**: Synchronous operations that should be async

### Memory Analysis (`--focus memory`)
- **Leak Patterns**: Growing allocations, unclosed resources
- **Large Object Retention**: Objects held longer than necessary
- **Cache Unbounded**: Caches without eviction policies or size limits
- **Circular References**: Reference cycles preventing garbage collection
- **Buffer Management**: Inefficient buffer allocation patterns

### Bundle Analysis (`--focus bundle`)
- **Tree-Shaking Gaps**: Imported but unused exports
- **Duplicate Dependencies**: Same library bundled multiple times
- **Large Imports**: Heavy libraries for small utility usage
- **Code Splitting**: Opportunities for lazy loading
- **Asset Optimization**: Unoptimized images, fonts, media

## Performance Scoring

Each finding is rated using Traceback's rating engine:

| Dimension | Weight | What It Measures |
|-----------|--------|------------------|
| **Impact** | 30% | Latency/throughput improvement potential |
| **Frequency** | 25% | How often the hot path is executed |
| **Fix Effort** | 20% | Complexity of the optimization (inverse) |
| **User Impact** | 15% | Effect on real user experience |
| **Scalability** | 10% | How the issue compounds under load |

## Sample Output

```
⚡ PERFORMANCE PROFILE: my-api/

SUMMARY:
┌──────────────────┬───────┬────────────┬───────────┐
│ Category         │ Count │ Critical   │ Est. Gain │
├──────────────────┼───────┼────────────┼───────────┤
│ N+1 Queries      │ 6     │ 3          │ -70% DB   │
│ Missing Indexes  │ 4     │ 2          │ -50ms P95 │
│ Cache Opps       │ 5     │ 1          │ -40% load │
│ Async Opps       │ 3     │ 1          │ -200ms    │
│ TOTAL            │ 18    │ 7          │ ~65% gain │
└──────────────────┴───────┴────────────┴───────────┘

TOP FINDINGS:

1. 🚨 N+1: UserSerializer → Profile → Permissions (src/api/users.py:89)
   47 queries/request • Impact: 9.2 • Frequency: 12K req/hr
   → Add select_related('profile') + prefetch_related('permissions')

2. 🚨 Missing Index: orders.customer_id (used in 3 endpoints)
   Full scan on 2.1M rows • Impact: 8.8 • P95: +340ms
   → CREATE INDEX idx_orders_customer ON orders(customer_id)

3. ⚠️ Cache: GET /api/config (identical 800 req/min, 0% cache hit)
   Impact: 7.5 • Fix: trivial
   → Add 5-min cache with ETag validation

→ /traceback:perf --verbose           # Full analysis
→ /traceback:implement "fix perf #1"  # Implement top fix
→ /traceback:test --benchmark         # Validate improvements
```

## Input Adapters

### Log File Analysis (`--input logs`)
```
/traceback:perf --input logs slow-query.log
/traceback:perf --input logs access.log --focus api
```
Parses: MySQL slow query logs, PostgreSQL pg_stat_statements, nginx access logs, application logs with timing data.

### APM Trace Analysis (`--input traces`)
```
/traceback:perf --input traces datadog-export.json
/traceback:perf --input traces jaeger-traces.json
```
Parses: Datadog, Jaeger, Zipkin, OpenTelemetry trace exports.

### Code Analysis (default)
```
/traceback:perf src/
```
Static analysis of ORM patterns, async usage, caching patterns, serialization, and dependency loading.

## Baseline Comparison

```
# Save current profile as baseline
/traceback:perf --save-baseline

# Compare against baseline after changes
/traceback:perf --baseline perf-baseline.json

# Output shows delta:
#   Query count: 47 → 8 (↓83%)
#   P95 latency: 2.3s → 0.4s (↓83%)
```

## Execution Instructions

When this command is invoked with `$ARGUMENTS`:

1. **Parse Arguments**: Extract target, focus area, input type, baseline

2. **Input Detection**:
   - If log/trace file provided: parse and extract performance data
   - If path provided: static code analysis mode
   - If no args: scan entire repository

3. **Framework Detection**:
   - Identify ORM (Django ORM, SQLAlchemy, Prisma, TypeORM, etc.)
   - Detect web framework (Express, Django, FastAPI, Rails, etc.)
   - Identify frontend bundler (webpack, vite, esbuild, etc.)

4. **Multi-Focus Analysis**:
   - **Queries**: Trace ORM call sites, model relationships, query patterns
   - **API**: Map endpoint handlers, middleware chain, serialization
   - **Memory**: Identify allocation patterns, resource lifecycle, cache policies
   - **Bundle**: Analyze imports, dependency tree, chunk sizes

5. **Performance Scoring**:
   - Score each finding using the rating matrix
   - Estimate improvement potential with confidence intervals
   - Calculate aggregate gain potential

6. **Baseline Delta** (if baseline provided):
   - Compare current findings against baseline
   - Highlight new issues, resolved issues, and regressions
   - Calculate trend direction

7. **State Persistence**:
   - Save results to `.traceback/perf-profile-{date}.json`
   - Track historical profiles for trend analysis

8. **Present Results**:
   - Summary table with category breakdown and estimated gains
   - Top findings with specific fix suggestions and file locations
   - Navigation to implementation and testing commands
   - Token-optimized output by default
