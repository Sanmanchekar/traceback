---
description: "View all solution alternatives with detailed ratings and filtering options"
argument-hint: "[--top N] [--min-score X.X] [--filter-by dimension] [--show-details]"
---

# /traceback:solutions - Solution Portfolio Review

Comprehensive view of all generated solution alternatives with detailed ratings, implementation guidance, and filtering capabilities.

## Usage

```
/traceback:solutions                           # Show all solutions (optimized)
/traceback:solutions --top 3                   # Show top 3 solutions only
/traceback:solutions --min-score 7.5           # Filter by minimum score
/traceback:solutions --filter-by performance   # Focus on performance solutions
/traceback:solutions --verbose                 # Full detailed view with explanations
```

## 🎯 Token Optimization (Built-in)

**Automatic optimization reduces token usage by 50%:**
- **Compact tables** instead of verbose descriptions
- **Symbol indicators** (✅ ⚠️ ❌) for quick assessment
- **Abbreviated metrics** with expandable details
- **Smart truncation** preserving key information

Use `--verbose` for comprehensive details.

## Rating System Deep Dive

### Security Dimension (25% weight)
- **OWASP Compliance**: Adherence to security best practices
- **Vulnerability Impact**: Potential security risks introduced or mitigated
- **Authentication/Authorization**: Impact on auth systems
- **Data Protection**: Encryption, privacy, and data handling
- **Supply Chain Security**: Third-party dependencies and risks

### Scalability Dimension (20% weight)  
- **Horizontal Scaling**: Ability to add more instances/nodes
- **Vertical Scaling**: Efficient resource utilization per instance
- **Load Distribution**: Even distribution of work across resources
- **Resource Efficiency**: Memory, CPU, I/O optimization
- **Bottleneck Elimination**: Removing scaling constraints

### Maintainability Dimension (20% weight)
- **Code Complexity**: Cyclomatic complexity, readability
- **Documentation Quality**: Code comments, API docs, README updates
- **Test Coverage**: Unit, integration, and E2E test requirements
- **Debugging Capability**: Logging, monitoring, observability
- **Team Knowledge**: Skills required, learning curve

### Performance Dimension (20% weight)
- **Response Time**: Latency improvements and optimizations
- **Throughput**: Requests/operations per second capacity
- **Resource Usage**: CPU, memory, disk, network efficiency
- **Caching Strategy**: Data caching and invalidation approaches
- **Database Performance**: Query optimization, indexing, connections

### Implementation Cost Dimension (15% weight)
- **Development Time**: Estimated hours/days for implementation
- **Complexity Risk**: Technical challenges and unknowns
- **Testing Requirements**: QA effort and validation complexity
- **Deployment Risk**: Rollout complexity and rollback requirements
- **Opportunity Cost**: Resources diverted from other priorities

## Sample Output (Optimized by Default)

```
💡 Solutions: API timeout issues

┌──┬──────────────────────────┬──────┬─────────────────────────────┐
│# │ Solution                 │Score │ S  P  M  Sc C │ Time │ Risk│
├──┼──────────────────────────┼──────┼─────────────────────────────┤
│1 │ Query Optimization ⭐    │ 8.7  │ 90 98 80 85 82│ 2-3d │ Low │
│2 │ Caching Layer           │ 8.1  │ 82 95 71 93 64│ 4-6d │ Med │
│3 │ Connection Pooling      │ 7.9  │ 85 88 75 92 68│ 5-7d │ Med │
└──┴──────────────────────────┴──────┴─────────────────────────────┘
S=Security P=Performance M=Maintainability Sc=Scalability C=Cost

→ /traceback:recommend (get best)
→ /traceback:implement 1 (execute)
```

### With --verbose Flag

```
💡 SOLUTION ALTERNATIVES FOR: API endpoints timing out under load

┌─────────────────────────────────────────────────────────────────────────┐
│ 1. Optimize Database Queries with Eager Loading            Score: 8.7/10 │
├─────────────────────────────────────────────────────────────────────────┤
│ Security:       ███████████ 9.0/10  (No security impact)                │
│ Scalability:    ████████▒▒▒ 8.5/10  (Better under load)                 │
│ Maintainability: ████████▒▒▒ 8.0/10  (Cleaner query patterns)           │
│ Performance:    ██████████▒ 9.8/10  (Eliminates N+1 queries)            │
│ Cost:           ████████▒▒▒ 8.2/10  (2-3 days implementation)            │
│                                                                           │
│ Implementation Strategy: incremental                                      │
│ Risk Level: low                                                          │
│ Estimated Effort: 18-24 hours                                           │
│ Dependencies: ORM upgrade, query refactoring                            │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ 2. Implement Advanced Caching Layer                        Score: 8.1/10 │
├─────────────────────────────────────────────────────────────────────────┤
│ Security:       ████████▒▒▒ 8.2/10  (Cache invalidation complexity)     │
│ Scalability:    ██████████▒ 9.3/10  (Excellent scale characteristics)   │
│ Maintainability: ███████▒▒▒▒ 7.1/10  (Adds system complexity)           │
│ Performance:    ██████████▒ 9.5/10  (Dramatic speed improvements)       │
│ Cost:           ██████▒▒▒▒▒ 6.4/10  (4-6 days implementation)            │
│                                                                           │
│ Implementation Strategy: phased                                          │
│ Risk Level: medium                                                       │
│ Estimated Effort: 32-48 hours                                           │
│ Dependencies: Redis setup, cache strategy design                        │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ 3. Database Connection Pooling                             Score: 7.9/10 │
├─────────────────────────────────────────────────────────────────────────┤
│ Security:       ████████▒▒▒ 8.5/10  (Secure connection management)      │
│ Scalability:    █████████▒▒ 9.2/10  (Handles more concurrent users)     │
│ Maintainability: ███████▒▒▒▒ 7.5/10  (Additional complexity)             │
│ Performance:    ████████▒▒▒ 8.8/10  (Faster connection reuse)           │
│ Cost:           ██████▒▒▒▒▒ 6.8/10  (5-7 days implementation)            │
│                                                                           │
│ Implementation Strategy: infrastructure                                  │
│ Risk Level: medium                                                       │
│ Estimated Effort: 40-56 hours                                           │
│ Dependencies: Connection pool library, config updates                   │
└─────────────────────────────────────────────────────────────────────────┘

FILTERING & SORTING OPTIONS:
--top N              Show only top N solutions
--min-score X.X      Filter by minimum overall score  
--filter-by security     Focus on security-optimized solutions
--filter-by performance  Focus on performance-optimized solutions
--filter-by scalability  Focus on scalability-optimized solutions
--filter-by maintainability Focus on maintainability-optimized solutions
--filter-by cost         Focus on cost-effective solutions
--show-details       Include implementation steps and technical details

NEXT STEPS:
/traceback:recommend                    Get top recommendation
/traceback:implement solution-1         Implement chosen solution
/traceback:constraint "no downtime"     Add constraints to refine solutions
```

## Filtering Examples

### Performance-Focused Analysis
```
/traceback:solutions --filter-by performance --min-score 8.0
```
Shows only solutions scoring 8.0+ overall with performance as primary concern.

### Quick Implementation Options
```
/traceback:solutions --filter-by cost --top 3
```
Shows top 3 solutions optimized for fast implementation.

### High-Security Solutions
```
/traceback:solutions --filter-by security --min-score 8.5
```
Shows solutions with security score 8.5+ and good overall ratings.

## Understanding Trade-offs

Each solution represents different strategic approaches:

### Quick Wins (High Score, Low Cost)
- Fast to implement
- Immediate impact
- Lower risk
- May not address all underlying issues

### Strategic Investments (High Score, Higher Cost)  
- Comprehensive solutions
- Long-term benefits
- Higher implementation complexity
- Address root architectural issues

### Specialized Solutions (High in One Dimension)
- Optimized for specific concerns
- May sacrifice other dimensions
- Domain-specific expertise required
- Best for targeted problems

## Best Practices

1. **Review All Options**: Don't just pick the highest score
2. **Consider Context**: Team skills, deadlines, system constraints
3. **Balance Short/Long Term**: Mix quick wins with strategic improvements
4. **Factor in Constraints**: Use `/traceback:constraint` to add requirements
5. **Validate Assumptions**: Challenge ratings with team expertise

## Integration with Constraint System

Add constraints to filter solutions automatically:

```
/traceback:constraint "no downtime allowed" --type invariant
/traceback:constraint "complete within 1 week" --type boundary
/traceback:constraint "improve performance by 50%" --type goal

/traceback:solutions  # Now shows only solutions meeting constraints
```

## Related Commands

- `/traceback:analyze` - Perform initial root cause analysis
- `/traceback:recommend` - Get single best recommendation  
- `/traceback:implement` - Execute chosen solution
- `/traceback:constraint` - Add filtering constraints
- `/traceback:status` - Check analysis status and available solutions

## Execution Instructions

When this command is invoked with `$ARGUMENTS`:

1. **Parse Options**: Extract filtering, sorting, and display preferences
2. **Retrieve Solutions**: Load all generated solutions from current analysis
3. **Apply Filters**:
   - Filter by minimum score if specified
   - Filter by dimension focus if specified  
   - Limit to top N if specified
   - Apply any active constraints
4. **Format Display**:
   - Show solutions in descending score order
   - Include visual rating bars and detailed breakdowns
   - Add implementation guidance and risk assessment
   - Show filtering options and next steps
5. **Provide Guidance**: Suggest appropriate follow-up commands based on results

Requires prior execution of `/traceback:analyze` to have solutions available.