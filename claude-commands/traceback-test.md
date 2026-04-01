---
description: "Test implemented solutions with comprehensive validation, performance benchmarking, and regression detection"
argument-hint: "[solution-id] [--type unit|integration|e2e|performance|all] [--benchmark] [--regression] [--fix-failures]"
---

# /traceback:test - Solution Testing & Validation

Comprehensive testing framework that validates implemented solutions, runs performance benchmarks, detects regressions, and ensures solution effectiveness with measurable results.

## Usage

```
/traceback:test                              # Test most recent implementation
/traceback:test solution-1                   # Test specific solution
/traceback:test --type performance           # Performance testing only
/traceback:test --benchmark                  # Include performance benchmarks
/traceback:test --regression                 # Check for regressions
/traceback:test --fix-failures               # Auto-fix simple test failures
```

## Testing Types

### Unit Testing (`--type unit`)
- **Scope**: Individual functions and components
- **Speed**: Fast (< 30 seconds)
- **Coverage**: Code logic, edge cases, error handling
- **Tools**: Jest, Mocha, pytest, go test, etc.

### Integration Testing (`--type integration`)
- **Scope**: Module interactions and API endpoints
- **Speed**: Medium (1-3 minutes)
- **Coverage**: Database connections, service integrations, data flow
- **Tools**: Supertest, TestContainers, integration test suites

### End-to-End Testing (`--type e2e`)
- **Scope**: Complete user workflows and system behavior
- **Speed**: Slow (3-10 minutes)
- **Coverage**: User journeys, cross-browser, real environments
- **Tools**: Playwright, Cypress, Selenium

### Performance Testing (`--type performance`)
- **Scope**: Response times, throughput, resource usage
- **Speed**: Medium (2-5 minutes)
- **Coverage**: Load testing, stress testing, benchmark comparisons
- **Tools**: Artillery, k6, Apache Bench, custom benchmarks

### All Testing (`--type all`)
- **Scope**: Complete test suite execution
- **Speed**: Variable (5-20 minutes)
- **Coverage**: All test types in sequence with full reporting

## Sample Output

```
🧪 TESTING: Query Optimization Implementation (solution-1)

┌─────────────────────────────────────────────────────────────────────────┐
│ TEST EXECUTION SUMMARY                                                  │
├─────────────────────────────────────────────────────────────────────────┤
│ Solution: Optimize Database Queries with Eager Loading                 │
│ Implementation: Completed 2 hours ago                                  │
│ Test Suite: Comprehensive (unit + integration + performance)           │
│ Total Duration: 3m 42s                                                 │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ UNIT TESTS                                                 ✅ PASSED    │
├─────────────────────────────────────────────────────────────────────────┤
│ User Profile Queries                                     12/12 ✅       │
│   • select_related functionality                              ✅        │
│   • prefetch_related with permissions                         ✅        │
│   • query count validation                                    ✅        │
│   • error handling for missing relations                      ✅        │
│                                                                         │
│ Order Management Queries                                  8/8 ✅        │
│   • prefetch_related with items and products                  ✅        │
│   • custom queryset methods                                   ✅        │
│   • admin interface efficiency                                ✅        │
│                                                                         │
│ Coverage: 94.2% (target: >85%)                              ✅         │
│ Duration: 24 seconds                                                    │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ INTEGRATION TESTS                                          ✅ PASSED    │
├─────────────────────────────────────────────────────────────────────────┤
│ API Endpoint Tests                                        6/6 ✅        │
│   • /api/users/profile response structure                     ✅        │
│   • /api/orders/list data integrity                           ✅        │
│   • /api/dashboard aggregation accuracy                       ✅        │
│   • Authentication and permissions                            ✅        │
│                                                                         │
│ Database Integration                                      4/4 ✅        │
│   • Query execution plans validated                           ✅        │
│   • Connection pooling efficiency                             ✅        │
│   • Transaction integrity                                     ✅        │
│   • Data consistency checks                                   ✅        │
│                                                                         │
│ Duration: 1m 18s                                                        │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ PERFORMANCE BENCHMARKS                                     ✅ IMPROVED  │
├─────────────────────────────────────────────────────────────────────────┤
│ API Response Times (Before → After → Target):                          │
│   /api/users/profile    2.3s → 0.4s → <0.5s     ✅ 83% improvement     │
│   /api/orders/list      1.8s → 0.3s → <0.5s     ✅ 84% improvement     │
│   /api/dashboard        3.1s → 0.6s → <0.8s     ✅ 81% improvement     │
│   /api/reports          4.2s → 0.9s → <1.0s     ✅ 79% improvement     │
│                                                                         │
│ Database Metrics (Before → After → Target):                            │
│   Queries per request   47 → 8 → <10            ✅ 83% reduction       │
│   N+1 queries           23 → 0 → 0              ✅ 100% elimination    │
│   Connection usage      85% → 45% → <70%        ✅ 47% improvement     │
│   Query execution time  145ms → 28ms → <50ms    ✅ 81% improvement     │
│                                                                         │
│ Load Testing Results:                                                   │
│   100 concurrent users: Avg 0.4s (previously 2.8s)       ✅           │
│   500 concurrent users: Avg 0.7s (previously timeout)    ✅           │
│   No 500 errors under load (previously 15% error rate)   ✅           │
│                                                                         │
│ Duration: 2m 8s                                                         │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ REGRESSION ANALYSIS                                        ✅ NO ISSUES │
├─────────────────────────────────────────────────────────────────────────┤
│ Functionality Regression Tests:                                        │
│   • All existing features working                         ✅           │
│   • No performance degradation in unrelated endpoints     ✅           │
│   • Memory usage within normal bounds                     ✅           │
│   • No new errors in application logs                     ✅           │
│                                                                         │
│ Security Regression Tests:                                              │
│   • Authentication still working correctly                ✅           │
│   • Authorization permissions intact                      ✅           │
│   • No new security vulnerabilities introduced            ✅           │
│   • Data access controls functioning                      ✅           │
└─────────────────────────────────────────────────────────────────────────┘

🎯 OVERALL TEST RESULT: ✅ ALL TESTS PASSED

SUCCESS CRITERIA VALIDATION:
✅ API response time <500ms (achieved: 400ms avg)
✅ Database queries <10 per request (achieved: 8 avg)  
✅ Zero N+1 queries (achieved: 0 detected)
✅ No performance regression (all metrics improved)
✅ 100% test coverage for modified code
✅ No security vulnerabilities introduced

RECOMMENDATIONS:
• Solution is ready for production deployment
• Performance gains exceed target expectations (83% improvement vs 50% target)
• Consider rolling out to additional endpoints using same patterns
• Schedule performance monitoring to track long-term stability

NEXT STEPS:
/traceback:status                    View implementation status with test results
/traceback:implement --rollout       Deploy to production with monitoring
/traceback:analyze "next issue"      Analyze additional performance opportunities
```

## Benchmarking Features

### Automated Benchmarking (`--benchmark`)
```
/traceback:test solution-1 --benchmark

🏁 PERFORMANCE BENCHMARKS

Before Implementation:
┌─────────────────────┬──────────┬──────────┬─────────────┐
│ Metric              │ Value    │ P95      │ Target      │
├─────────────────────┼──────────┼──────────┼─────────────┤
│ API Response Time   │ 2.3s     │ 4.1s     │ <500ms      │
│ DB Queries/Request  │ 47       │ 52       │ <10         │
│ Memory Usage        │ 450MB    │ 650MB    │ <400MB      │
│ CPU Usage           │ 65%      │ 90%      │ <50%        │
└─────────────────────┴──────────┴──────────┴─────────────┘

After Implementation:
┌─────────────────────┬──────────┬──────────┬─────────────┐
│ Metric              │ Value    │ P95      │ Target      │
├─────────────────────┼──────────┼──────────┼─────────────┤
│ API Response Time   │ 0.4s ✅  │ 0.6s ✅  │ <500ms ✅   │
│ DB Queries/Request  │ 8 ✅     │ 12 ✅    │ <10 ✅      │
│ Memory Usage        │ 320MB ✅ │ 380MB ✅ │ <400MB ✅   │
│ CPU Usage           │ 35% ✅   │ 55% ✅   │ <50% ⚠️     │
└─────────────────────┴──────────┴──────────┴─────────────┘

Performance Improvement: 83% faster, 85% fewer queries
```

## Regression Detection (`--regression`)

Automatically detects regressions in:

### Functional Regressions
- API response structure changes
- Feature availability and correctness
- Error handling behavior
- Business logic accuracy

### Performance Regressions  
- Response time increases >10%
- Memory usage increases >20%
- CPU usage increases >15%
- Database query count increases

### Security Regressions
- Authentication bypass attempts
- Authorization privilege escalation
- Data access control violations
- New vulnerability introductions

## Auto-Fix Capabilities (`--fix-failures`)

When `--fix-failures` is enabled, common issues are automatically resolved:

### Code Issues
- Import statement corrections
- Syntax error fixes
- Type annotation updates
- Dependency resolution

### Configuration Issues
- Database connection settings
- Environment variable updates
- Test configuration adjustments
- Path resolution fixes

### Performance Issues
- Query optimization hints
- Cache invalidation fixes
- Index recommendation application
- Connection pool adjustments

## Test Strategies by Solution Type

### Database Optimization
- Query execution plan validation
- Index usage verification  
- Connection pooling efficiency
- Transaction isolation testing
- Data integrity checks

### Caching Implementation
- Cache hit/miss ratio testing
- Cache invalidation correctness
- Memory usage monitoring
- Cache consistency verification
- Performance under load

### API Optimization
- Response time benchmarking
- Payload size validation
- Error handling verification
- Rate limiting testing
- Authentication/authorization checks

### Infrastructure Changes
- Service availability testing
- Load balancer functionality
- SSL/TLS configuration
- Monitoring and alerting
- Backup and recovery procedures

## Integration with Development Workflow

### Pre-Deployment Testing
```
# After implementing solution
/traceback:implement solution-1

# Run comprehensive tests
/traceback:test solution-1 --type all --benchmark --regression

# Deploy if all tests pass
/traceback:implement --deploy
```

### Continuous Testing
```
# Schedule regular testing
/traceback:test --regression --benchmark

# Monitor for performance degradation
/traceback:status --metrics
```

### Team Collaboration
```
# Share test results with team
/traceback:test solution-1 --type all > test-results.md

# Validate solution effectiveness
/traceback:test --benchmark --compare baseline
```

## Best Practices

### Test Coverage
1. **Unit Tests**: >85% coverage for modified code
2. **Integration Tests**: All API endpoints and key workflows
3. **Performance Tests**: Critical user journeys and load scenarios
4. **Regression Tests**: Existing functionality verification

### Performance Validation
1. **Benchmark Before Implementation**: Establish baseline metrics
2. **Set Clear Targets**: Define success criteria upfront
3. **Test Under Load**: Validate performance with realistic traffic
4. **Monitor Long-term**: Track performance stability over time

### Error Handling
1. **Test Failure Scenarios**: Verify graceful error handling
2. **Validate Rollback**: Ensure easy rollback if issues arise
3. **Monitor Edge Cases**: Test boundary conditions and limits
4. **Security Testing**: Verify no new vulnerabilities introduced

## Related Commands

- `/traceback:analyze` - Initial root cause analysis (prerequisite)
- `/traceback:implement` - Execute solution implementation  
- `/traceback:status` - Check implementation and test status
- `/traceback:recommend` - Get testing recommendations for solutions
- `/traceback:rollback` - Rollback if tests fail critically

## Execution Instructions

When this command is invoked with `$ARGUMENTS`:

1. **Parse Test Request**: Extract solution ID, test types, and options
2. **Load Implementation Details**: Retrieve solution and implementation history
3. **Prepare Test Environment**:
   - Set up test databases and environments
   - Configure benchmarking tools and metrics collection
   - Prepare regression baseline data
4. **Execute Test Suite**:
   - Run tests in appropriate sequence (unit → integration → e2e → performance)
   - Collect metrics and performance data
   - Compare against baselines and targets
5. **Analyze Results**:
   - Evaluate test outcomes against success criteria
   - Detect regressions and performance changes
   - Generate recommendations and next steps
6. **Generate Report**: Provide comprehensive test results with actionable insights

Requires prior execution of `/traceback:implement` to have solutions available for testing.