---
description: "Rollback current solution attempt and restore to previous state"
argument-hint: "[--reason <description>] [--select <solution-id>] [--status]"
---

# /traceback:rollback - Solution Rollback & Recovery

**Clean rollback system** for reverting failed solution attempts and trying alternatives with complete history tracking.

## When to Use Rollback

| Scenario | Action | Result |
|----------|--------|--------|
| **Solution Failed Tests** | `/traceback:rollback` | Revert changes, keep history |
| **Performance Degraded** | `/traceback:rollback --reason "performance issues"` | Document failure, restore state |
| **Wrong Approach** | `/traceback:rollback --select solution-2` | Switch to different solution |
| **Explore Alternatives** | `/traceback:rollback --status` | View attempt history |

## Usage Patterns

### 🔄 Basic Rollback
```
/traceback:rollback                           # Rollback current attempt
/traceback:rollback --reason "Tests failing"  # Document why rolling back
```

### 🎯 Select Alternative Solution  
```
/traceback:rollback --select solution-2       # Rollback and try solution 2
/traceback:rollback --select recommended      # Try next recommended solution
```

### 📊 View History
```
/traceback:rollback --status                  # Show all attempts and results
/traceback:rollback --history solution-1      # Show specific solution history
```

## 🎯 Intent-Based Solution Selection

**Smart Recommendations**:
- **⭐ Recommended**: Highest-rated untried solution
- **🔄 Retry Eligible**: Failed solutions that can be retried
- **❌ Not Recommended**: Solutions that failed multiple times
- **✅ Successful**: Solutions that worked (for reference)

## What Happens During Rollback

### 1. State Restoration
- Reverts to rollback point (git commit or snapshot)
- Undoes all changes made during attempt
- Preserves attempt history in JSON

### 2. History Logging
```json
{
  "attempt_id": "solution-1-attempt-1",
  "status": "rolled_back",
  "failure_reason": "Performance regression",
  "changes_made": ["Modified API endpoints", "Added caching"],
  "test_results": {"unit": "passed", "integration": "failed"},
  "performance_impact": {"latency": "+50ms", "memory": "+20MB"}
}
```

### 3. Next Solution Selection
- Updates recommendations based on failures
- Suggests untried solutions first
- Considers failure patterns

## Solution Attempt Tracking

### Complete History Preserved
```json
"solution_attempts": [
  {
    "solution_id": "solution-1",
    "attempt_number": 1,
    "status": "failed",
    "failure_reason": "N+1 queries not resolved",
    "rollback_point": "git:abc123",
    "changes_made": [...],
    "logs": [...]
  },
  {
    "solution_id": "solution-2",
    "attempt_number": 1,
    "status": "succeeded",
    "success_metrics": {
      "performance_gain": "60%",
      "tests_passed": "100%"
    }
  }
]
```

### Solution Status Tracking
```json
"solutions": [
  {
    "id": "solution-1",
    "recommended": false,
    "attempt_count": 2,
    "success_history": [],
    "failure_reasons": [
      {"reason": "Performance regression", "can_retry": true},
      {"reason": "Breaking changes", "can_retry": false}
    ]
  }
]
```

## Rollback Strategies

### Clean Rollback (Default)
```
git reset --hard <rollback_point>
# OR
git revert <commits>
```

### Soft Rollback (Preserve Changes)
```
git stash
git reset <rollback_point>
# Changes available in stash for analysis
```

### Selective Rollback
```
# Keep some changes, revert others
git checkout <rollback_point> -- specific/files
```

## Decision Support

### Viewing Recommendations
```
🎯 SOLUTION RECOMMENDATIONS

┌─────────────────────────────┬──────┬────────┬─────────────────┐
│ Solution                    │ Score│ Status │ Recommendation  │
├─────────────────────────────┼──────┼────────┼─────────────────┤
│ 2. Connection Pooling ⭐    │ 8.7  │ Untried│ RECOMMENDED     │
│ 3. Caching Layer           │ 7.9  │ Untried│ Alternative     │
│ 1. Query Optimization ↻    │ 9.2  │ Failed │ Can Retry       │
│ 4. Async Processing        │ 6.5  │ Untried│ Lower Priority  │
└─────────────────────────────┴──────┴────────┴─────────────────┘

→ Use: /traceback:rollback --select solution-2
```

### Failure Analysis
```
❌ FAILED ATTEMPTS SUMMARY

Solution 1 (2 attempts):
• Attempt 1: Performance regression (+50ms latency)
• Attempt 2: Breaking API changes

Solution 3 (1 attempt):
• Attempt 1: Cache invalidation issues

→ Recommend: Try solution 2 (Connection Pooling)
```

## Best Practices

### 1. Always Create Rollback Points
```bash
# Before implementing
git commit -am "Checkpoint before solution attempt"
ROLLBACK_POINT=$(git rev-parse HEAD)
```

### 2. Document Failure Reasons
```
/traceback:rollback --reason "Increased memory usage by 200MB, exceeds limits"
```

### 3. Review History Before Selecting
```
/traceback:rollback --status          # See what's been tried
/traceback:solutions                  # View all options
/traceback:rollback --select best     # Pick recommended
```

## Integration with Workflow

### Complete Experimentation Flow
```bash
# 1. Start with recommended solution
/traceback:implement solution-1

# 2. If it fails
/traceback:rollback --reason "Performance issues"

# 3. Try alternative
/traceback:implement solution-2

# 4. If successful
/traceback:test solution-2

# 5. Review complete history
/traceback:rollback --status
```

## Execution Instructions

When this command is invoked with `$ARGUMENTS`:

1. **Parse Arguments**: Extract reason, selection, or status request

2. **Current State Check**:
   - Verify active solution attempt exists
   - Get rollback point from state

3. **Rollback Execution**:
   - Execute git rollback to restore code
   - Update attempt status to 'rolled_back'
   - Log failure reason and details
   - Clear current solution state

4. **History Update**:
   - Add to solution_attempts array
   - Update solution failure_reasons
   - Increment attempt_count
   - Preserve all logs and metrics

5. **Next Solution Selection** (if --select):
   - Find requested solution or recommended
   - Create new rollback point
   - Start new solution attempt
   - Update phase to IMPLEMENTING

6. **Status Display** (if --status):
   - Show all solution attempts
   - Display success/failure reasons
   - Show recommendations
   - Calculate success rates

7. **State Persistence**:
   - Save complete history to JSON
   - Update recommendations
   - Preserve context for recovery

The rollback system ensures clean experimentation with multiple solutions while maintaining complete history for decision-making.