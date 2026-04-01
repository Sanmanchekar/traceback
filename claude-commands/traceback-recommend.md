---
description: "Get the top-rated solution recommendation with implementation roadmap"
argument-hint: "[--explain] [--alternatives N] [--confirm]"
---

# /traceback:recommend - Smart Solution Recommendation

Intelligent recommendation engine that selects the optimal solution based on comprehensive analysis, current context, and constraint satisfaction.

## Usage

```
/traceback:recommend                    # Get top recommendation (optimized)
/traceback:recommend --alternatives 2   # Show top recommendation + 2 alternatives
/traceback:recommend --confirm          # Interactive confirmation before proceeding
/traceback:recommend --verbose          # Full detailed reasoning and analysis
```

## 🎯 Token Optimization (Built-in)

**Smart compression saves 45% tokens by default:**
- **Concise recommendations** with key points only
- **Compact roadmaps** using structured formats
- **Symbol-based assessments** (✅ ⚠️ ❌)
- **Essential metrics** with optional expansion

Use `--verbose` for complete reasoning and detailed explanations.

## Recommendation Algorithm

The recommendation engine considers multiple factors beyond just overall score:

### Primary Factors (60% influence)
- **Overall Score**: Weighted rating across all dimensions
- **Constraint Satisfaction**: Adherence to defined constraints
- **Risk Assessment**: Implementation and operational risks
- **Confidence Level**: How certain we are about the solution effectiveness

### Context Factors (25% influence)  
- **Team Capabilities**: Available skills and expertise
- **Time Constraints**: Available development timeline
- **System State**: Current technical debt and architectural health
- **Resource Availability**: Budget, infrastructure, tooling constraints

### Strategic Factors (15% influence)
- **Long-term Impact**: Future scalability and maintainability
- **Learning Value**: Skills development and knowledge building
- **Portfolio Balance**: Mix of quick wins vs strategic investments
- **Risk Distribution**: Avoiding concentration of implementation risks

## Sample Output (Optimized by Default)

```
✅ Query Optimization (8.7/10) - 94% confidence

WHY: Addresses N+1 directly • Low risk • Team expertise ✅

ROADMAP:
1. Audit queries (4-6h) → identify N+1 locations
2. Implement eager loading (8-12h) → update ORM patterns  
3. Validate & deploy (6-8h) → test + gradual rollout

SUCCESS METRICS: API <500ms • Queries <10/req • 0 N+1

→ /traceback:implement 1
→ /traceback:test (validate)
```

### With --verbose Flag

```
✅ RECOMMENDED SOLUTION

┌─────────────────────────────────────────────────────────────────────────┐
│ Optimize Database Queries with Eager Loading                           │
│ Overall Score: 8.7/10                    Confidence: 94%              │
├─────────────────────────────────────────────────────────────────────────┤
│ Why This Solution?                                                      │
│ • Highest performance impact (9.8/10) for the identified N+1 problem  │
│ • Low implementation risk with proven patterns                         │
│ • Satisfies all 3 defined constraints                                  │
│ • Team has strong ORM expertise (Django/SQLAlchemy)                   │
│ • Can be implemented incrementally without downtime                     │
│                                                                         │
│ Implementation Roadmap:                                                │
│ Phase 1: Audit & Plan (4-6 hours)                                     │
│   • Identify all N+1 query locations                                  │
│   • Design eager loading strategy                                      │
│   • Create test plan for validation                                    │
│                                                                         │
│ Phase 2: Core Changes (8-12 hours)                                    │
│   • Implement select_related/prefetch_related                         │
│   • Update ORM queries in hot paths                                    │
│   • Add query monitoring and alerts                                    │
│                                                                         │
│ Phase 3: Validation & Rollout (6-8 hours)                            │
│   • Performance testing and benchmarking                              │
│   • Gradual rollout with monitoring                                    │
│   • Documentation and team knowledge sharing                           │
│                                                                         │
│ Success Metrics:                                                       │
│ • API response time < 500ms (currently 2.3s)                          │
│ • Database query count reduced by 70%+                                │
│ • Zero N+1 queries in monitoring dashboard                            │
│ • No performance regression in other areas                             │
└─────────────────────────────────────────────────────────────────────────┘

RISK ASSESSMENT: LOW
• Well-understood problem and solution
• Incremental implementation possible  
• Easy rollback if issues arise
• Team has relevant experience

CONSTRAINT SATISFACTION: ✅ ALL MET
✅ No downtime required (incremental rollout)
✅ Complete within 2 weeks (estimated 1 week)
✅ Improve performance by 50%+ (targeting 75%+)

READY TO IMPLEMENT?
/traceback:implement solution-1     Execute with guided steps
/traceback:implement --dry-run      Preview implementation plan
/traceback:solutions --top 3        Review alternatives first
```

## With Detailed Explanation

Using `--explain` flag provides deeper reasoning:

```
/traceback:recommend --explain

✅ RECOMMENDED SOLUTION: Optimize Database Queries with Eager Loading

RECOMMENDATION REASONING:

🎯 Score Analysis (8.7/10 overall):
   This solution scored highest due to exceptional performance impact
   (9.8/10) directly addressing the root cause while maintaining
   excellent security (9.0/10) and good maintainability (8.0/10).

🧠 Context Matching:
   • Team Expertise: High Django/ORM proficiency (confidence boost: +0.3)
   • Timeline Fit: 18-24h estimate fits 2-week constraint perfectly
   • Risk Profile: Low risk aligns with production system constraints
   • Infrastructure: No additional infrastructure required

⚖️ Alternative Comparison:
   vs. Caching Solution (8.1/10):
   ✅ Lower complexity, faster to implement
   ✅ Addresses root cause directly vs. masking symptoms  
   ✅ No additional infrastructure dependencies
   ❌ Lower scalability ceiling (but adequate for current needs)

   vs. Connection Pooling (7.9/10):  
   ✅ Higher performance impact for this specific issue
   ✅ Better maintainability and debugging
   ✅ Faster implementation timeline
   ❌ Connection pooling still recommended for future phase

🎲 Risk Factors Considered:
   • Implementation Risk: Low (familiar patterns)
   • Operational Risk: Low (gradual rollout possible)
   • Technical Debt Risk: Medium (but manageable)
   • Performance Risk: Very Low (isolated, measurable changes)

📊 Constraint Satisfaction Score: 100%
   All 3 defined constraints fully satisfied with margin for error.
```

## With Alternatives

Using `--alternatives N` shows the recommendation plus top alternatives:

```
/traceback:recommend --alternatives 2

✅ PRIMARY RECOMMENDATION: Optimize Database Queries (8.7/10)
[Full recommendation details...]

🔄 STRONG ALTERNATIVES:

2nd Choice: Advanced Caching Layer (8.1/10)
   • Best if: Scalability is primary long-term concern
   • Trade-off: Higher complexity for better scale ceiling
   • Timeline: 4-6 days vs. 2-3 days for primary choice

3rd Choice: Database Connection Pooling (7.9/10)  
   • Best if: Multiple connection-related issues exist
   • Trade-off: Infrastructure changes required
   • Timeline: 5-7 days with deployment complexity
```

## Interactive Confirmation

Using `--confirm` provides interactive decision support:

```
/traceback:recommend --confirm

✅ RECOMMENDED: Optimize Database Queries with Eager Loading (8.7/10)

DECISION CHECKPOINT:
Based on your analysis of "API endpoints timing out under load"

Key Benefits:
• 75%+ performance improvement expected
• Low risk, incremental implementation
• No infrastructure changes required  
• Team has strong relevant expertise

Key Trade-offs:
• Doesn't address future scalability ceiling
• Technical debt in query patterns needs ongoing attention
• Alternative caching solution has higher long-term potential

❓ Decision Options:
[1] Proceed with recommended solution
[2] See detailed comparison with alternatives  
[3] Add more constraints to refine recommendation
[4] Return to solution portfolio review

Choice: [1]

✅ Proceeding with recommended solution.
Ready for implementation? Use: /traceback:implement solution-1
```

## Best Practices

### When to Trust the Recommendation
- ✅ High confidence score (>90%)
- ✅ Clear constraint satisfaction
- ✅ Low implementation risk
- ✅ Aligns with team capabilities

### When to Review Alternatives
- ⚠️ Medium confidence score (70-90%)
- ⚠️ Complex trade-offs between solutions  
- ⚠️ Strategic vs. tactical decision points
- ⚠️ Multiple solutions with similar scores

### When to Add More Constraints
- 🔄 No clear winner among solutions
- 🔄 Recommendation doesn't feel right
- 🔄 Missing important context or requirements
- 🔄 Need to balance competing priorities

## Integration with Workflow

### Typical Flow
```
1. /traceback:analyze "issue description"
2. /traceback:recommend --explain
3. /traceback:implement solution-1
```

### Complex Decision Flow  
```
1. /traceback:analyze "complex issue" --mode comprehensive
2. /traceback:solutions --top 5
3. /traceback:constraint "additional requirements"
4. /traceback:recommend --alternatives 2 --confirm
5. /traceback:implement [chosen-solution]
```

## Related Commands

- `/traceback:analyze` - Perform root cause analysis (prerequisite)
- `/traceback:solutions` - Review all solution alternatives
- `/traceback:implement` - Execute the recommended solution
- `/traceback:constraint` - Add constraints to refine recommendations
- `/traceback:status` - Check current analysis and recommendation state

## Execution Instructions

When this command is invoked with `$ARGUMENTS`:

1. **Parse Options**: Extract explanation level, alternative count, confirmation mode
2. **Load Context**: Retrieve analysis results, constraints, and solution ratings
3. **Run Recommendation Algorithm**:
   - Calculate context-adjusted scores for each solution
   - Apply constraint filters and satisfaction scoring
   - Factor in team capabilities and system constraints
   - Determine confidence levels and risk assessments
4. **Format Recommendation**:
   - Present top solution with clear rationale
   - Include implementation roadmap and success metrics
   - Show constraint satisfaction and risk assessment
   - Add alternatives if requested
5. **Interactive Elements**: Handle confirmation workflow if requested
6. **Next Steps**: Provide clear calls to action for implementation

Requires prior execution of `/traceback:analyze` and generates state for `/traceback:implement`.