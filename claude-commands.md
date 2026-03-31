# Traceback Commands for Claude Code

Just like Manifold, Traceback can be used directly in Claude Code with these commands:

## Available Commands

### `/traceback analyze`
Analyze an issue to find root causes and generate solutions.

```
/traceback analyze "API endpoints are timing out under load"
/traceback analyze "Memory leak in production" --mode deep
/traceback analyze "Database deadlocks" --mode quick
```

### `/traceback solutions`
Get solution recommendations with ratings.

```
/traceback solutions
/traceback solutions --top 3
/traceback solutions --min-score 8.0
/traceback solutions --filter-by security
```

### `/traceback recommend`
Get the top recommended solution.

```
/traceback recommend
```

### `/traceback implement`
Implement a chosen solution (with dry-run option).

```
/traceback implement solution-1 --dry-run
/traceback implement solution-1 --validate
```

### `/traceback status`
Check current analysis status.

```
/traceback status
```

### `/traceback constraint`
Add constraints to filter solutions (like Manifold).

```
/traceback constraint "no downtime" --type invariant
/traceback constraint "complete within 1 week" --type boundary
/traceback constraint "improve performance by 50%" --type goal
```

## Usage Examples

### Example 1: Full Analysis Workflow
```
# 1. Analyze the issue
/traceback analyze "Users experiencing 500 errors on checkout"

# 2. View solutions
/traceback solutions --top 5

# 3. Get the recommended solution
/traceback recommend

# 4. Test implementation
/traceback implement solution-1 --dry-run

# 5. Actual implementation
/traceback implement solution-1
```

### Example 2: Constrained Analysis (Like Manifold)
```
# Add constraints first
/traceback constraint "zero downtime required" --type invariant
/traceback constraint "must complete in 3 days" --type boundary
/traceback constraint "maintain backwards compatibility" --type invariant

# Then analyze
/traceback analyze "Need to upgrade authentication system"

# Solutions will be filtered by constraints
/traceback solutions
```

### Example 3: Quick Performance Analysis
```
/traceback analyze "Slow database queries" --mode quick
/traceback solutions --filter-by performance --top 3
```

## Integration with Claude Code Workflow

When using Traceback in Claude Code, you can:

1. **Describe your problem naturally**:
   - "The API is slow" → Claude uses `/traceback analyze "API performance issues"`

2. **Claude automatically runs Traceback**:
   - Claude sees an issue → Runs `/traceback analyze`
   - Gets solutions → Reviews with `/traceback solutions`
   - Implements the best one → `/traceback implement`

3. **Collaborative Problem Solving**:
   - You describe the issue
   - Claude uses Traceback to find root causes
   - Together you review solutions
   - Claude implements with your approval

## How It Works (Similar to Manifold)

1. **Constraint-Based Reasoning**: Define what solutions must satisfy
2. **Multi-Phase Analysis**: 
   - Phase 1: Root Cause Analysis
   - Phase 2: Solution Generation
   - Phase 3: Rating & Ranking
   - Phase 4: Implementation Planning

3. **Evidence-Based**: All recommendations backed by analysis
4. **Progressive Refinement**: Iteratively improve solutions

## Configuration

Create a `.traceback.yaml` in your project:

```yaml
mode: standard
constraints:
  - type: invariant
    description: "No breaking changes"
  - type: boundary
    description: "Complete within sprint"
  - type: goal
    description: "Improve performance by 30%"
    
ratings:
  weights:
    security: 0.30
    performance: 0.25
    scalability: 0.20
    maintainability: 0.15
    cost: 0.10
```

## Comparison with Manifold

| Feature | Manifold | Traceback |
|---------|----------|-----------|
| Constraint-based | ✅ | ✅ |
| Multi-agent | ✅ | ✅ (via RCA Engine) |
| Solution rating | Manual | Automated (5 dimensions) |
| Root cause analysis | General | Specialized for RCA |
| Implementation | Manual | Guided with steps |
| Evidence tracking | ✅ | ✅ |

## Getting Started in Claude Code

1. Tell Claude: "I want to use Traceback to analyze an issue"
2. Claude will use `/traceback analyze` command
3. Review solutions together
4. Implement with Claude's help

That's it! Traceback works just like Manifold but specialized for root cause analysis and solution generation.