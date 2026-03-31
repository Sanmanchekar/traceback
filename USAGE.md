# 🚀 Using Traceback in Claude Code

## How to Use Traceback Commands Directly

### Installation

Install Traceback directly from GitHub:

```bash
curl -sSL https://raw.githubusercontent.com/Sanmanchekar/traceback/main/install.sh | bash
```

### Direct Command Usage in Claude Code

Now you can use Traceback commands directly in Claude Code:

## Step-by-Step Workflow

### 1. Analyze an Issue
```bash
/traceback:analyze "Your issue description here"
```

Example:
```bash
/traceback:analyze "API endpoints are slow and timing out"
```

Output:
- Lists root causes with confidence scores
- Shows number of solutions generated
- Displays recommended solution

### 2. View Solutions
```bash
/traceback:solutions
```

This shows all generated solutions with:
- Title and description
- Overall score (0-10)
- Approach type
- ⭐ marks the recommended solution

### 3. Get Recommendation
```bash
/traceback:recommend
```

Shows the top recommended solution with:
- Detailed description
- Overall score
- Implementation strategy

### 4. Implement a Solution
```bash
/traceback:implement solution-1
```

Shows implementation steps for the chosen solution.

### 5. Check Status
```bash
/traceback:status
```

Shows current analysis status and results.

## Complete Example Workflow

Here's how you would use it in Claude Code:

```
You: /traceback:analyze "Database queries are taking too long causing API timeouts"

Claude: [Runs analysis]
Found 3 root causes:
1. N+1 query problem (85% confidence)
2. Missing database indexes (72% confidence)  
3. Connection pool exhaustion (45% confidence)

Generated 5 solutions
⭐ Recommended: Implement query optimization with eager loading
   Score: 9.2/10

You: /traceback:solutions

Claude: [Shows all solutions with ratings]
1. Implement query optimization with eager loading ⭐
   Overall Score: 9.2/10
   Approach: quick_fix

2. Add database indexes
   Overall Score: 8.5/10
   Approach: configuration_change

3. Refactor data access layer
   Overall Score: 7.8/10
   Approach: refactor

You: /traceback:implement solution-1

Claude: [Shows implementation plan]
🔧 Implementation Plan for: Implement query optimization with eager loading
   1. Identify N+1 query locations
   2. Implement eager loading
   3. Test query performance
   4. Validate API response times
```

## Command Reference

| Command | Description | Example |
|---------|-------------|---------|
| `/traceback:analyze "issue"` | Analyze an issue | `/traceback:analyze "slow API"` |
| `/traceback:solutions` | List all solutions | `/traceback:solutions` |
| `/traceback:recommend` | Get top recommendation | `/traceback:recommend` |
| `/traceback:implement <id>` | Show implementation steps | `/traceback:implement solution-1` |
| `/traceback:status` | Check current status | `/traceback:status` |

## Advanced Options

### Analysis Modes
```bash
/traceback:analyze "issue" --mode quick     # Fast analysis
/traceback:analyze "issue" --mode standard  # Default
/traceback:analyze "issue" --mode deep      # Comprehensive analysis
```

### Solution Filtering
```bash
/traceback:solutions --top 3                # Show top 3 solutions
/traceback:solutions --min-score 8.0        # Only high-scoring solutions
/traceback:solutions --filter-by security   # Sort by security score
```

## Integration with Claude Code Workflow

1. **Describe your problem**: Type the issue naturally
2. **Run analysis**: `/traceback:analyze "your issue"`
3. **Review solutions**: `/traceback:solutions`
4. **Choose implementation**: `/traceback:implement solution-X`
5. **Claude helps code**: Claude can then write the actual implementation

## Key Features

- **Instant Analysis**: Get root causes immediately
- **Rated Solutions**: Each solution scored across 5 dimensions
- **Evidence-Based**: All recommendations backed by analysis
- **Implementation Guidance**: Step-by-step implementation plans

## Command Features

| Feature | Description |
|---------|-------------|
| Command Style | `/traceback:<cmd>` format with clear namespacing |
| Focus | Specialized root cause analysis and solution generation |
| Solution Rating | Automated across 5 dimensions (security, performance, etc.) |
| Implementation | Guided step-by-step instructions with validation |
| Constraints | Full constraint-based filtering and recommendation refinement |

## Tips

1. **Be specific** in your issue descriptions for better analysis
2. **Review all solutions** before choosing - sometimes #2 or #3 is better for your context
3. **Use deep mode** for complex issues: `/traceback analyze "issue" --mode deep`
4. **Check ratings** - A solution with 9/10 security but 5/10 performance might not be ideal

## Troubleshooting

If commands aren't working:

1. **Ensure installation**: Re-run the installation command from GitHub
2. **Check Claude commands**: Verify files exist in `~/.claude/commands/traceback-*.md`
3. **Verify build**: Traceback engine should be installed in `~/.traceback/`
4. **Test installation**: Check that installation completed successfully

## Next Steps

1. Install Traceback using `curl -sSL https://raw.githubusercontent.com/Sanmanchekar/traceback/main/install.sh | bash`
2. Try your first analysis: `/traceback:analyze "your issue"`
3. Review and implement solutions
4. Let Claude help with the actual code implementation

That's it! You can now use Traceback commands directly in Claude Code for intelligent root cause analysis.