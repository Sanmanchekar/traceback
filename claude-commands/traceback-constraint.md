---
description: "Add or modify constraints to filter and refine solution recommendations"
argument-hint: "\"<constraint-description>\" --type <invariant|goal|boundary> [--remove] [--list]"
---

# /traceback:constraint - Solution Constraint Management

Intelligent constraint system that filters solutions based on requirements, limitations, and goals. Constraints automatically refine recommendations and eliminate incompatible solutions.

## Usage

```
/traceback:constraint "no downtime allowed" --type invariant
/traceback:constraint "complete within 1 week" --type boundary  
/traceback:constraint "improve performance by 50%" --type goal
/traceback:constraint --list                                    # Show all constraints
/traceback:constraint "no downtime" --remove                    # Remove constraint
```

## Constraint Types

### Invariant Constraints (`--type invariant`)
**Must be true at all times** - Non-negotiable requirements that solutions must satisfy

```bash
/traceback:constraint "no breaking changes to public API" --type invariant
/traceback:constraint "maintain backwards compatibility" --type invariant  
/traceback:constraint "zero downtime deployment required" --type invariant
/traceback:constraint "no additional infrastructure costs" --type invariant
/traceback:constraint "must pass all existing tests" --type invariant
```

**Use Cases:**
- Compliance requirements (GDPR, SOX, PCI-DSS)
- Business continuity requirements  
- Technical compatibility requirements
- Security and safety requirements

### Goal Constraints (`--type goal`)
**Target outcomes to achieve** - Desired improvements that solutions should deliver

```bash
/traceback:constraint "improve API response time by 75%" --type goal
/traceback:constraint "reduce memory usage by 40%" --type goal
/traceback:constraint "increase test coverage to 90%" --type goal
/traceback:constraint "achieve sub-second page loads" --type goal
/traceback:constraint "support 10x current user load" --type goal
```

**Use Cases:**
- Performance targets
- Scalability objectives
- Quality improvements  
- User experience goals

### Boundary Constraints (`--type boundary`)
**Limits and thresholds** - Resource, time, and scope limitations

```bash
/traceback:constraint "complete within 2 weeks" --type boundary
/traceback:constraint "budget limit: $50,000" --type boundary
/traceback:constraint "maximum 3 team members" --type boundary
/traceback:constraint "no changes to database schema" --type boundary
/traceback:constraint "implementation complexity: medium max" --type boundary
```

**Use Cases:**
- Timeline limitations
- Budget constraints
- Resource availability
- Scope restrictions

## Sample Workflow with Constraints

```
# Start with unconstrained analysis
/traceback:analyze "API performance issues"

# Review initial solutions
/traceback:solutions
   1. Database optimization (8.7/10) - 2 weeks, downtime required
   2. Caching layer (8.1/10) - 1 week, no downtime  
   3. Connection pooling (7.9/10) - 3 days, infrastructure changes

# Add business constraints
/traceback:constraint "zero downtime required" --type invariant
/traceback:constraint "complete within 1 week" --type boundary
/traceback:constraint "improve performance by 60%" --type goal

# Review filtered solutions
/traceback:solutions
   1. Caching layer (8.1/10) ✅ Meets all constraints
   2. Connection pooling (7.9/10) ❌ Fails timeline constraint

# Get constrained recommendation
/traceback:recommend
   ✅ Recommended: Caching layer implementation
   Constraint satisfaction: 100% (3/3 constraints met)
```

## Constraint Impact on Solutions

When constraints are active, solutions are automatically:

### Filtered
Solutions that violate invariant constraints are removed from consideration

### Re-scored
Solution scores adjust based on goal and boundary constraint satisfaction

### Re-ranked
Solutions meeting more constraints rank higher in recommendations

## Sample Output

```
/traceback:constraint "no downtime allowed" --type invariant

✅ CONSTRAINT ADDED: No downtime allowed
   Type: invariant (must be satisfied)
   Impact: Solutions requiring downtime will be filtered out
   
📊 CONSTRAINT IMPACT ANALYSIS:

REMAINING SOLUTIONS (2/5 solutions still viable):
✅ Advanced Caching Layer (8.1/10)
   Constraint satisfaction: Supports zero-downtime rollout
   
✅ API Response Compression (7.2/10) 
   Constraint satisfaction: Can be enabled without downtime

❌ FILTERED OUT SOLUTIONS (3 solutions eliminated):
❌ Database Schema Optimization (8.7/10)
   Reason: Requires brief downtime for migration
   
❌ Load Balancer Reconfiguration (7.5/10)
   Reason: Requires service restart with 30s downtime
   
❌ Database Connection Pooling (7.9/10)
   Reason: Requires application restart

RECOMMENDATION UPDATED:
New recommended solution: Advanced Caching Layer (8.1/10)
Previous recommendation (Database Schema Optimization) filtered out

NEXT STEPS:
/traceback:recommend       View updated recommendation with constraints
/traceback:solutions       Review remaining viable solutions
/traceback:implement       Execute constrained recommendation
```

## Constraint Management

### List All Constraints
```
/traceback:constraint --list

📋 ACTIVE CONSTRAINTS

INVARIANTS (Must be true):
1. "No downtime allowed"
   Added: 2026-03-31 14:30:15
   Impact: 3 solutions filtered out
   
2. "Maintain backwards compatibility"  
   Added: 2026-03-31 14:25:42
   Impact: 1 solution filtered out

GOALS (Target outcomes):
1. "Improve performance by 60%"
   Added: 2026-03-31 14:28:33
   Impact: Solutions weighted for performance
   
2. "Reduce infrastructure costs"
   Added: 2026-03-31 14:27:18
   Impact: Cost dimension weight increased 25%

BOUNDARIES (Limits):  
1. "Complete within 1 week"
   Added: 2026-03-31 14:31:07
   Impact: 2 solutions exceed timeline
   
2. "Maximum 2 team members"
   Added: 2026-03-31 14:29:55
   Impact: Complex solutions deprioritized

CONSTRAINT SATISFACTION SUMMARY:
Solutions meeting all constraints: 2/7
Recommended solution constraint satisfaction: 100%
```

### Remove Constraints
```
/traceback:constraint "no downtime allowed" --remove

✅ CONSTRAINT REMOVED: No downtime allowed

📊 IMPACT OF REMOVAL:
RESTORED SOLUTIONS (3 solutions now viable):
✅ Database Schema Optimization (8.7/10) - Now top recommendation
✅ Load Balancer Reconfiguration (7.5/10)  
✅ Database Connection Pooling (7.9/10)

RECOMMENDATION UPDATED:
New recommended solution: Database Schema Optimization (8.7/10)
Constraint satisfaction: 2/2 remaining constraints met
```

## Advanced Constraint Features

### Constraint Priorities
When constraints conflict, they follow priority order:
1. **Invariants** - Always enforced, cannot be violated
2. **Boundaries** - Hard limits, solutions exceeding boundaries filtered
3. **Goals** - Soft targets, used for scoring and ranking

### Constraint Validation
Each constraint is validated against available solutions:
- **Feasible**: At least one solution satisfies the constraint
- **Conflicting**: Constraint conflicts with other constraints  
- **Impossible**: No solutions can satisfy this constraint

### Smart Constraint Suggestions
Based on analysis results, Traceback suggests relevant constraints:

```
💡 SUGGESTED CONSTRAINTS (based on analysis):

Security-focused:
   "Maintain current security posture" --type invariant
   "No new external dependencies" --type boundary
   
Performance-focused:  
   "Achieve <500ms API response time" --type goal
   "Reduce database query count by 80%" --type goal
   
Resource-focused:
   "No additional server capacity required" --type boundary  
   "Implementation time <40 hours" --type boundary
```

## Integration with Analysis Workflow

### Early Constraint Setting
```
# Set constraints before analysis
/traceback:constraint "PCI compliance required" --type invariant
/traceback:constraint "complete before Q2" --type boundary
/traceback:analyze "payment processing vulnerabilities"
# Analysis incorporates constraints from the start
```

### Iterative Constraint Refinement
```
# Start broad, then refine
/traceback:analyze "system scalability issues"
/traceback:solutions
# Review options, then add constraints based on business needs
/traceback:constraint "budget under $25K" --type boundary
/traceback:constraint "support 5x user growth" --type goal
/traceback:recommend
```

### Constraint-Driven Implementation
```
# Use constraints to guide implementation choices
/traceback:constraint "rollback in <5 minutes if issues" --type invariant
/traceback:implement solution-2
# Implementation incorporates rollback requirements
```

## Best Practices

### 1. Start Broad, Then Constrain
- Begin analysis without constraints to see all options
- Add constraints iteratively based on business context
- Don't over-constrain initially - you might eliminate good solutions

### 2. Balance Constraint Types
- **1-3 Invariants**: Core non-negotiables
- **1-2 Boundaries**: Key limitations  
- **2-4 Goals**: Desired outcomes

### 3. Validate Constraint Feasibility
- Ensure at least one solution remains viable after constraints
- Check for conflicting constraints that make solutions impossible
- Use constraint suggestions to identify relevant limitations

### 4. Document Constraint Rationale
- Include business context in constraint descriptions
- Reference compliance requirements or business decisions
- Update constraints when requirements change

## Schema Compatibility

Traceback constraints follow structured specifications:

```yaml
# Constraint representation
constraints:
  invariant:
    - id: I1
      type: invariant  
      statement: "No downtime allowed"
      rationale: "24/7 business requirements"
      
  goal:
    - id: G1
      type: goal
      statement: "Improve performance by 60%"
      success_criteria: "API response time <500ms"
      
  boundary:
    - id: B1  
      type: boundary
      statement: "Complete within 1 week"
      limit_value: "7 days"
      limit_type: "time"
```

## Related Commands

- `/traceback:analyze` - Incorporates active constraints in analysis
- `/traceback:solutions` - Filters solutions based on constraints
- `/traceback:recommend` - Provides constraint-aware recommendations
- `/traceback:implement` - Executes solutions meeting all constraints
- `/traceback:status` - Shows active constraints and their impact

## Execution Instructions

When this command is invoked with `$ARGUMENTS`:

1. **Parse Constraint Input**: Extract description, type, and operation (add/remove/list)
2. **Constraint Management**:
   - **Add**: Validate constraint feasibility and add to active set
   - **Remove**: Remove specified constraint and recalculate impacts
   - **List**: Display all active constraints with impact analysis
3. **Impact Analysis**:
   - Filter solutions that violate invariant constraints
   - Re-score solutions based on goal and boundary satisfaction
   - Update recommendation based on new constraint set
4. **Validation**: Check for constraint conflicts and infeasible combinations
5. **Update System State**: Apply constraints to current analysis and future operations
6. **Provide Feedback**: Show constraint impact and updated recommendations

Can be used before or after analysis to set requirements and refine solutions.