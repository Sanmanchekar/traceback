---
description: "Complete end-to-end workflow: analyze → solutions → implement → test in one optimized command"
argument-hint: "<issue-description> [--mode quick|standard|comprehensive] [--solution-id] [--verbose]"
---

# /traceback:workflow - Complete Issue Resolution Workflow

**🚀 Ultimate productivity command**: Full analyze → solutions → implement → test cycle in one streamlined execution with 60% token reduction.

## When to Use Workflow Command

| Scenario | Traditional Steps | Workflow Command |
|----------|-------------------|------------------|
| **Production Issues** | 4 separate commands, 15-20 minutes | 1 command, 5-8 minutes |
| **Bug Fixes** | Analyze → Solutions → Implement → Test | Single integrated execution |
| **Performance Issues** | Multiple command switches | Continuous workflow |
| **Quick Fixes** | Context switching overhead | Seamless execution |

## Usage Patterns

### 🎯 Standard Workflow (Recommended)
```
/traceback:workflow "ContentNotRenderedError in Django metrics.py"
/traceback:workflow "API endpoints timing out under load"  
/traceback:workflow "Memory leaks in Node.js application"
```

### ⚡ Quick Resolution
```
/traceback:workflow "Database connection failing" --mode quick
/traceback:workflow "CI/CD pipeline broken" --solution-id 1
```

### 🔍 Comprehensive Analysis
```
/traceback:workflow "Complex authentication failures" --mode comprehensive
/traceback:workflow "System architecture issues" --verbose
```

## 🎯 Token Optimization (Built-in)

**Maximum Efficiency**: 60% token reduction through integrated execution
- **Compressed output**: Symbol-based status reporting
- **Smart caching**: Reuse analysis across phases  
- **Integrated reporting**: Combined results, no duplicate context
- **Stream processing**: Real-time updates during execution

**Workflow Tokens:**
- Standard workflow: ~8K tokens (vs 20K for separate commands)
- Quick mode: ~4K tokens  
- Comprehensive: ~15K tokens

## What You Get (Complete Cycle)

### 📊 Phase 1: Analysis (2-3 minutes)
```
🔍 Issue: "ContentNotRenderedError in Django"

ROOT CAUSES:
• Metrics accessing unrendered response (95%) → Code fix needed
• Missing response validation (78%) → Defensive programming  
• DRF/Django response mismatch (65%) → Architecture issue

🎯 Best Solution: Safe content access with response rendering
```

### 🛠️ Phase 2: Implementation (1-2 minutes)
```
⚡ IMPLEMENTING: Safe Content Access Fix
✅ Added response.is_rendered check
✅ Enhanced error handling  
✅ Zero breaking changes
```

### 🧪 Phase 3: Testing (1-2 minutes)
```
🧪 TESTING: Safe Content Access Implementation

UNIT TESTS:           5/5 ✅
INTEGRATION TESTS:    3/3 ✅  
REGRESSION TESTS:     2/2 ✅
PERFORMANCE IMPACT:   <1ms ✅

✅ WORKFLOW COMPLETE: Ready for deployment
```

## Workflow Execution Phases

### Phase 1: Smart Analysis
- **Auto-detect**: Framework patterns, error types, context
- **Root Cause**: Multi-factor analysis with confidence scoring
- **Solutions**: 3-5 rated alternatives with implementation complexity

### Phase 2: Intelligent Implementation  
- **Top Solution**: Auto-select highest-rated solution (or user-specified)
- **Safe Execution**: Validation checks, backup strategies
- **Progress Tracking**: Real-time implementation status

### Phase 3: Comprehensive Testing
- **Auto-Testing**: Unit, integration, regression tests
- **Performance**: Impact measurement and benchmarking
- **Validation**: End-to-end functionality verification

### Phase 4: Deployment Readiness
- **Status Report**: Complete implementation summary
- **Next Steps**: Deployment instructions and monitoring
- **Documentation**: Change log and rollback procedures

## Advanced Options

### Solution Control
```
/traceback:workflow "issue" --solution-id 2    # Implement specific solution
/traceback:workflow "issue" --skip-test        # Skip testing phase
/traceback:workflow "issue" --dry-run          # Preview without changes
```

### Output Control
```
/traceback:workflow "issue" --verbose          # Full detailed output
/traceback:workflow "issue" --silent           # Minimal progress reporting
/traceback:workflow "issue" --json             # Machine-readable output
```

### Quality Control
```
/traceback:workflow "issue" --validate         # Extra validation steps
/traceback:workflow "issue" --safe-mode        # Conservative implementation
/traceback:workflow "issue" --review           # Pause for review between phases
```

## 🚀 Performance Comparison

| Metric | Traditional Commands | Workflow Command |
|--------|---------------------|------------------|
| **Commands** | 4 separate | 1 integrated |
| **Time** | 15-20 minutes | 5-8 minutes |
| **Tokens** | ~20K tokens | ~8K tokens (60% less) |
| **Context Switches** | 3-4 switches | 0 switches |
| **Copy/Paste** | Multiple | None required |

## Error Handling & Recovery

**Built-in Resilience:**
- **Phase Isolation**: Failure in one phase doesn't break others
- **Smart Rollback**: Automatic rollback on critical failures  
- **Continue Options**: Resume from any phase after fixes
- **Detailed Logs**: Full execution trace for debugging

**Recovery Commands:**
```
/traceback:status                    # Check current workflow state
/traceback:workflow --resume         # Resume from last successful phase  
/traceback:workflow --rollback       # Undo changes from failed workflow
```

## Best Practices

### 1. Issue Description Quality
- ✅ **Good**: "ContentNotRenderedError in /app/gqlanding_backend/metrics.py:239 when accessing response.content"
- ❌ **Poor**: "Django error"

### 2. Mode Selection
- **Quick**: Simple bugs, urgent fixes, clear issues
- **Standard**: Most development issues, balanced approach
- **Comprehensive**: Complex systems, critical production issues

### 3. Solution Override
- Let workflow auto-select unless you have specific requirements
- Use `--solution-id` only when you need a particular approach
- Review analysis first with `/traceback:analyze` for complex issues

## Integration Examples

### Django Issues
```
/traceback:workflow "ContentNotRenderedError in metrics decorator"
/traceback:workflow "Database N+1 query performance" --mode comprehensive
```

### Node.js Issues
```
/traceback:workflow "Memory leak in Express application" 
/traceback:workflow "WebSocket connection drops" --solution-id 2
```

### React/Frontend Issues
```
/traceback:workflow "Component re-rendering performance"
/traceback:workflow "Build bundle size optimization" --mode quick
```

## Related Commands

- `/traceback:analyze` - Analysis only (for exploration before workflow)
- `/traceback:implement` - Implementation only (if you have solution)
- `/traceback:test` - Testing only (validate existing implementations)
- `/traceback:status` - Check workflow progress and state

## Execution Instructions

When this command is invoked with `$ARGUMENTS`:

1. **Initialize Workflow**: Parse arguments, set up orchestrator with token optimization
2. **Phase 1 - Analysis**:
   - Enhanced error context extraction and framework detection
   - Root cause analysis with confidence scoring
   - Solution generation and rating (compressed output)
3. **Phase 2 - Implementation**:
   - Auto-select top solution (or user-specified --solution-id)
   - Execute implementation with progress tracking
   - Validate changes and check for regressions
4. **Phase 3 - Testing**:
   - Run appropriate test suites (unit, integration, regression)
   - Performance impact measurement
   - End-to-end functionality validation  
5. **Phase 4 - Completion**:
   - Generate workflow summary with deployment readiness
   - Provide rollback instructions and monitoring recommendations
   - Store workflow state for future reference

**Token Optimization Strategy:**
- Compress phase outputs using symbols and tables
- Cache and reuse analysis context across phases
- Stream real-time updates instead of full phase reports
- Provide detailed output only on --verbose flag

The workflow provides complete issue resolution in a single optimized execution cycle.