---
description: "Execute a chosen solution with guided implementation steps and validation"
argument-hint: "<solution-id> [--dry-run] [--validate] [--interactive] [--rollback-plan]"
---

# /traceback:implement - Guided Solution Implementation

Intelligent implementation engine that executes chosen solutions with step-by-step guidance, validation checkpoints, and rollback capabilities.

## Usage

```
/traceback:implement solution-1                    # Execute recommended solution
/traceback:implement solution-2 --dry-run          # Preview implementation steps
/traceback:implement solution-1 --validate         # Include validation tests
/traceback:implement solution-1 --interactive      # Step-by-step confirmation
/traceback:implement solution-1 --rollback-plan    # Generate rollback procedures
```

## Implementation Modes

### Standard Mode (default)
- Execute all implementation steps automatically
- Progress reporting and checkpoint validation
- Basic error handling and recovery
- Success metrics measurement

### Dry Run Mode (`--dry-run`)
- Preview all implementation steps without executing
- Show file changes, commands, and configuration updates  
- Estimate time and resource requirements
- Identify potential issues before execution

### Validation Mode (`--validate`)
- Include comprehensive validation and testing steps
- Performance benchmarking before/after changes
- Automated regression testing
- Monitoring setup and health checks

### Interactive Mode (`--interactive`)
- Step-by-step confirmation for each major change
- Ability to modify or skip individual steps
- Real-time decision points and customization
- Manual validation opportunities

## Sample Implementation Flow

```
🔧 IMPLEMENTING: Optimize Database Queries with Eager Loading
    Solution ID: solution-1
    Estimated Time: 18-24 hours
    Risk Level: Low

┌─────────────────────────────────────────────────────────────────────────┐
│ PHASE 1: AUDIT & PLANNING (4-6 hours)                                    │
├─────────────────────────────────────────────────────────────────────────┤
│ Step 1.1: Analyze Current Query Patterns                                 │
│   ✅ Scanning codebase for ORM queries...                                │
│   ✅ Found 23 potential N+1 query locations                              │
│   ✅ Generated query analysis report: /tmp/query-audit-2026-03-31.json   │
│                                                                           │
│ Step 1.2: Identify High-Impact Targets                                   │
│   ✅ Profiling API endpoints under load...                               │
│   ✅ Top 5 endpoints identified (89% of query load)                      │
│   ✅ Priority implementation order determined                             │
│                                                                           │
│ Step 1.3: Design Eager Loading Strategy                                  │
│   ✅ Created eager loading patterns for User->Profile->Permissions       │
│   ✅ Designed prefetch strategy for Order->Items->Product                │
│   ✅ Validated approach with team lead                                    │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ PHASE 2: CORE IMPLEMENTATION (8-12 hours)                                │
├─────────────────────────────────────────────────────────────────────────┤
│ Step 2.1: Update User Profile Queries                                    │
│   🔄 Modifying views/user.py...                                          │
│   ✅ Added select_related('profile') to UserViewSet                      │
│   ✅ Updated prefetch_related for permissions                            │
│   ✅ Added query monitoring decorator                                     │
│                                                                           │
│ Step 2.2: Optimize Order Management Queries                              │
│   🔄 Modifying models/order.py...                                        │
│   ✅ Implemented prefetch_related('items__product')                      │
│   ✅ Added custom queryset methods                                        │
│   ✅ Updated admin interface for efficiency                               │
│                                                                           │
│ Step 2.3: Add Query Performance Monitoring                               │
│   ✅ Installed django-debug-toolbar for development                      │
│   ✅ Added query count monitoring to API responses                       │
│   ✅ Created performance regression tests                                 │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ PHASE 3: VALIDATION & ROLLOUT (6-8 hours)                               │
├─────────────────────────────────────────────────────────────────────────┤
│ Step 3.1: Performance Testing                                            │
│   ✅ Running load tests on staging environment...                        │
│   ✅ API response time: 2.3s → 0.4s (83% improvement)                   │
│   ✅ Database queries: 47 → 8 queries per request (83% reduction)       │
│   ✅ No performance regression in other endpoints                         │
│                                                                           │
│ Step 3.2: Production Rollout                                             │
│   ✅ Created deployment plan with rollback procedures                     │
│   🔄 Deploying to production with blue-green strategy...                 │
│   ✅ Health checks passing                                                │
│   ✅ Performance monitoring active                                        │
│                                                                           │
│ Step 3.3: Validation & Documentation                                     │
│   ✅ Success metrics achieved                                             │
│   ✅ Team documentation updated                                           │
│   ✅ Performance baseline established                                     │
│   ✅ Monitoring alerts configured                                         │
└─────────────────────────────────────────────────────────────────────────┘

🎯 IMPLEMENTATION COMPLETE!

SUCCESS METRICS ACHIEVED:
✅ API response time: 2.3s → 0.4s (83% improvement) 
✅ Database queries reduced: 47 → 8 per request (83% reduction)
✅ Zero N+1 queries detected in monitoring
✅ No performance regression in other areas
✅ All tests passing with improved performance

PERFORMANCE COMPARISON:
┌─────────────────────┬──────────┬──────────┬─────────────┐
│ Endpoint            │ Before   │ After    │ Improvement │
├─────────────────────┼──────────┼──────────┼─────────────┤
│ /api/users/profile  │ 2.3s     │ 0.4s     │ 83%        │
│ /api/orders/list    │ 1.8s     │ 0.3s     │ 84%        │
│ /api/dashboard      │ 3.1s     │ 0.6s     │ 81%        │
│ /api/reports        │ 4.2s     │ 0.9s     │ 79%        │
└─────────────────────┴──────────┴──────────┴─────────────┘

WHAT'S NEXT:
• Monitor performance metrics for 48-72 hours
• Consider implementing solution-2 (caching) for additional scale
• Document lessons learned for future query optimization
• Schedule follow-up analysis in 2 weeks
```

## Dry Run Example

```
/traceback:implement solution-1 --dry-run

🔍 DRY RUN: Optimize Database Queries with Eager Loading

IMPLEMENTATION PREVIEW:
┌─────────────────────────────────────────────────────────────────────────┐
│ FILES TO BE MODIFIED: 8 files                                            │
├─────────────────────────────────────────────────────────────────────────┤
│ views/user.py                                                            │
│   + Add select_related('profile') to UserViewSet.get_queryset()          │
│   + Add prefetch_related('groups__permissions') for permission loading   │
│   ~ Modify get_serializer_context() for query optimization              │
│                                                                          │
│ models/order.py                                                          │
│   + Add OrderManager.with_items() custom queryset method                │
│   + Implement prefetch_related('items__product__category')              │
│   ~ Update Meta.default_related_name for consistency                     │
│                                                                          │
│ api/serializers.py                                                       │
│   + Add SerializerMethodField for optimized nested data                 │
│   ~ Modify to_representation() for efficient serialization              │
└─────────────────────────────────────────────────────────────────────────┘

COMMANDS TO BE EXECUTED: 12 commands
├─────────────────────────────────────────────────────────────────────────┤
│ python manage.py shell -c "from django.db import connection; ..."        │
│ python manage.py test tests.performance --keepdb                        │
│ python manage.py loadtests --endpoint=/api/users --requests=100          │
│ pip install django-debug-toolbar==4.2.0                                 │
│ python manage.py migrate                                                 │
│ python manage.py collectstatic --noinput                                │
└─────────────────────────────────────────────────────────────────────────┘

ESTIMATED IMPACT:
• Performance: 75-85% improvement in API response times
• Database Load: 70-80% reduction in query count
• Memory Usage: 15-25% reduction per request
• Development Time: 18-24 hours total

POTENTIAL RISKS:
• Low Risk: Query pattern changes may affect existing assumptions
• Low Risk: Prefetch queries could increase memory usage temporarily
• Medium Risk: Migration required for default_related_name changes

ROLLBACK PLAN:
• Git rollback available for all code changes
• Database migration rollback: python manage.py migrate app_name 0042
• Deployment rollback: Previous version available in 30 seconds

READY TO EXECUTE? 
/traceback:implement solution-1     # Execute the implementation
```

## Interactive Mode Example

```
/traceback:implement solution-1 --interactive

🔧 INTERACTIVE IMPLEMENTATION: Optimize Database Queries

Step 1.1: Analyze Current Query Patterns
This will scan your codebase for potential N+1 queries and generate a report.
Estimated time: 15-20 minutes

Execute this step? [Y/n/s(skip)/m(modify)]: Y

✅ Found 23 potential N+1 query locations
📄 Report generated: /tmp/query-audit-2026-03-31.json

Would you like to review the report before proceeding? [Y/n]: Y
[Opens report in editor...]

Step 1.2: Identify High-Impact Targets
This will profile your API endpoints to identify the highest impact queries.
This requires running load tests against your staging environment.

Execute this step? [Y/n/s/m]: Y
Which environment? [staging/local/other]: staging

✅ Load testing complete. Top 5 endpoints identified.

Step 2.1: Update User Profile Queries  
Ready to modify views/user.py with eager loading optimizations.
Changes preview:
- Line 45: Add select_related('profile')
- Line 67: Add prefetch_related('groups__permissions')

Apply these changes? [Y/n/s/m]: Y
✅ Changes applied successfully

Continue with remaining steps? [Y/n/a(auto)/p(pause)]: a

[Continues automatically through remaining steps...]
```

## Validation Mode Features

When using `--validate`:

### Pre-Implementation Validation
- Current performance baseline measurement
- Existing test suite execution  
- Configuration and environment checks
- Dependency compatibility verification

### During Implementation
- Incremental testing at each phase
- Performance regression detection
- Automated rollback triggers if metrics degrade
- Real-time monitoring of system health

### Post-Implementation Validation  
- Comprehensive performance benchmarking
- Full test suite execution with new code
- Load testing to validate improvements
- Monitoring setup and alerting configuration

## Rollback Capabilities

Every implementation includes automatic rollback planning:

### Code Rollback
- Git-based version control with tagged releases
- Automated backup of modified files
- Step-by-step rollback procedures
- Dependency rollback coordination

### Database Rollback
- Migration rollback scripts
- Data backup and restore procedures  
- Schema change impact analysis
- Foreign key constraint handling

### Infrastructure Rollback
- Configuration file restoration
- Service restart procedures
- Load balancer and routing updates
- Monitoring and alerting reconfiguration

## Best Practices

### Before Implementation
1. **Review the Plan**: Always run `--dry-run` first
2. **Backup Everything**: Ensure backups of code, database, config
3. **Test Environment**: Validate on staging/test environment first
4. **Team Communication**: Inform team of implementation timeline

### During Implementation
1. **Monitor Progress**: Watch for errors and performance metrics
2. **Validate Incrementally**: Check each phase before proceeding  
3. **Stay Available**: Be ready to pause or rollback if needed
4. **Document Issues**: Log any unexpected behavior or deviations

### After Implementation
1. **Measure Success**: Verify all success metrics are achieved
2. **Monitor Stability**: Watch system behavior for 24-48 hours
3. **Update Documentation**: Record changes and lessons learned
4. **Plan Next Steps**: Consider follow-up optimizations or improvements

## Error Handling

The implementation engine includes robust error handling:

### Automatic Recovery
- Retry failed commands with exponential backoff
- Skip non-critical steps if they fail
- Automatic rollback on critical failures
- Health check monitoring throughout process

### Manual Intervention Points
- Pause implementation on warnings or errors
- Allow manual fixes before continuing
- Override automatic decisions when needed
- Custom rollback procedures for specific scenarios

## Related Commands

- `/traceback:analyze` - Initial root cause analysis (prerequisite)
- `/traceback:recommend` - Get implementation recommendation  
- `/traceback:solutions` - Review all available solutions
- `/traceback:status` - Check implementation progress and results
- `/traceback:rollback` - Execute rollback procedures if needed

## Execution Instructions

When this command is invoked with `$ARGUMENTS`:

1. **Parse Implementation Request**: Extract solution ID and execution options
2. **Load Solution Details**: Retrieve chosen solution with implementation strategy
3. **Prepare Execution Environment**:
   - Validate prerequisites and dependencies
   - Create backups and rollback plans  
   - Set up monitoring and validation
4. **Execute Implementation Phases**:
   - Follow solution-specific implementation roadmap
   - Apply dry-run, interactive, or validation modes as specified
   - Monitor progress and handle errors gracefully
5. **Validate Results**:
   - Measure success metrics and performance improvements
   - Run regression tests and health checks
   - Document changes and lessons learned
6. **Provide Next Steps**: Suggest follow-up actions and monitoring procedures

Requires prior execution of `/traceback:analyze` and solution selection.