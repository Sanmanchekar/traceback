---
description: "Analyze an issue to identify root causes and generate solution alternatives with comprehensive ratings"
argument-hint: "<issue-description> [--mode quick|standard|comprehensive] [--implement] [--test] [--workflow]"
---

# /traceback:analyze - AI-Powered Root Cause Analysis

Intelligent analysis engine that identifies root causes and generates multiple solution alternatives with detailed ratings across security, scalability, maintainability, performance, and cost dimensions.

## When to Use Traceback Analysis

| Scenario | Best For | Example |
|----------|----------|---------|
| Performance Issues | API slowdowns, memory leaks, bottlenecks | "API endpoints timing out under load" |
| System Failures | Crashes, errors, service disruptions | "Database connections failing intermittently" |
| Code Quality Issues | Technical debt, maintainability problems | "Code becoming hard to maintain and extend" |
| Security Concerns | Vulnerabilities, compliance issues | "Authentication system has security gaps" |
| Deployment Problems | CI/CD failures, deployment errors | "Deployment pipeline failing on staging" |

## Analysis Modes

### Quick Mode (`--mode quick`)
- **Time**: 1-2 minutes
- **Depth**: Surface-level analysis
- **Best For**: Simple issues, urgent fixes
- **Root Causes**: 1-2 primary causes
- **Solutions**: 2-3 alternatives

### Standard Mode (default)
- **Time**: 3-5 minutes
- **Depth**: Comprehensive analysis
- **Best For**: Most issues, balanced approach
- **Root Causes**: 2-4 causes with confidence scoring
- **Solutions**: 3-5 rated alternatives

### Comprehensive Mode (`--mode comprehensive`)
- **Time**: 5-10 minutes
- **Depth**: Deep system analysis
- **Best For**: Complex, critical issues
- **Root Causes**: 3-6 causes with evidence
- **Solutions**: 5-7 alternatives with detailed impact analysis

## Usage Patterns

### 🚀 Streamlined Workflow (Recommended)
```
# Complete end-to-end workflow in one command
/traceback:analyze "API endpoints timing out" --workflow
/traceback:analyze "ContentNotRenderedError in Django" --implement --test

# Custom combinations
/traceback:analyze "Memory leaks in production" --mode comprehensive --implement
```

### 📋 Traditional Step-by-Step Workflow  
```
/traceback:analyze "your issue description"
/traceback:solutions
/traceback:recommend  
/traceback:implement solution-1
/traceback:test solution-1
```

### ⚡ Quick Analysis Options
```
/traceback:analyze "Database slow" --mode quick
/traceback:analyze "CI failing" --verbose    # Detailed explanations
```

## 🎯 Token Optimization (Built-in)

**All commands use smart optimization by default:**
- **Compressed output**: 40-60% token reduction
- **Smart caching**: Reuses analysis patterns  
- **Abbreviated formats**: Tables over prose
- **Symbol usage**: ✅ ❌ ⚠️ → instead of verbose text

**Flag Options for Efficiency:**
- `--workflow` - Complete analyze → solutions → implement → test cycle
- `--implement` - Auto-implement top-rated solution after analysis  
- `--test` - Include testing validation in workflow
- `--verbose` - Detailed explanations (higher token usage)

**Workflow Tokens:**
- Streamlined (`--workflow`): ~60% token reduction vs step-by-step
- Traditional (separate commands): Full token usage with detailed context

## What You Get

### Root Cause Analysis
- **Identified Causes**: Ranked by confidence level
- **Evidence**: Supporting data and patterns
- **Categories**: Technical, architectural, operational, or process issues
- **Impact Assessment**: How each cause affects the system

### Solution Alternatives
- **Multiple Options**: 3-7 different approaches
- **Comprehensive Ratings**: 5-dimension scoring system
- **Implementation Complexity**: Effort estimation
- **Risk Assessment**: Potential issues and mitigation strategies

### Rating Dimensions
| Dimension | Weight | What It Measures |
|-----------|--------|------------------|
| **Security** | 25% | OWASP compliance, vulnerability impact, auth/encryption |
| **Scalability** | 20% | Load handling, horizontal scaling, resource efficiency |
| **Maintainability** | 20% | Code complexity, documentation, test coverage |
| **Performance** | 20% | Response time, throughput, resource usage |
| **Implementation Cost** | 15% | Dev time, complexity, risk level |

## Sample Output (Optimized by Default)

```
🔍 API endpoints timing out under load

ROOT CAUSES:
• N+1 queries (92%) → DB optimization needed
• No connection pooling (78%) → Connection overhead
• Poor caching (65%) → Repeated computations

SOLUTIONS:
┌─────────────────────────────┬──────┬─────────────────────┐
│ Solution                    │ Score│ Key Metrics         │
├─────────────────────────────┼──────┼─────────────────────┤
│ 1. Query Optimization ⭐    │ 8.7  │ 2-3d • Perf: 9.8   │
│ 2. Connection Pooling       │ 7.9  │ 5-7d • Scale: 9.2  │
│ 3. Caching Layer           │ 7.2  │ 3-4d • Perf: 8.5   │
└─────────────────────────────┴──────┴─────────────────────┘

→ /traceback:solutions (all)
→ /traceback:recommend (best)
→ /traceback:implement solution-1
```

### With --verbose Flag

```
🔍 COMPREHENSIVE ANALYSIS COMPLETE: API endpoints are timing out under load

ROOT CAUSES IDENTIFIED WITH EVIDENCE:
1. Database N+1 Query Problem (92% confidence)
   Evidence: Query logs show 47 individual SELECT statements per API request
   Impact: Primary cause of 70%+ performance degradation
   Category: Technical/Performance issue
   
2. Missing Connection Pooling (78% confidence)
   Evidence: New database connection created for each request
   Impact: Adds 50-100ms overhead per request
   Category: Infrastructure/Configuration issue

[Full detailed output continues...]
```

## Integration with Development Workflow

### 1. Issue Discovery
```
You: "Users are complaining about slow checkout process"
/traceback:analyze "Checkout process is slow for users"
```

### 2. Review Solutions
```
/traceback:solutions --top 3
/traceback:recommend
```

### 3. Implementation
```
Claude: Based on the analysis, I recommend implementing solution #1.
Let me implement the database query optimization...
```

## Best Practices

1. **Be Specific**: Detailed issue descriptions lead to better analysis
   - ✅ "API /users endpoint returns 500 errors under 100+ concurrent requests"
   - ❌ "API is broken"

2. **Choose Right Mode**: Match analysis depth to issue complexity
   - Quick: Bug fixes, simple issues
   - Standard: Most development issues
   - Comprehensive: Architecture problems, critical systems

3. **Include Context**: Mention recent changes, environment, timing
   - "Since deploying v2.1, users report login timeouts on mobile"

4. **Follow Through**: Use the full workflow for best results
   - Analyze → Review Solutions → Get Recommendation → Implement

## Related Commands

- `/traceback:solutions` - View all solution alternatives with detailed ratings
- `/traceback:recommend` - Get the top-rated solution recommendation  
- `/traceback:implement` - Execute a chosen solution with guided steps
- `/traceback:status` - Check current analysis and solution status
- `/traceback:constraint` - Add constraints to filter solutions

## 🔧 Workflow Command Flags

### `--workflow` (Complete End-to-End)
- **Phases**: Analyze → Solutions → Recommend → Implement → Test
- **Token Efficiency**: ~60% reduction through integrated execution
- **Best For**: Production issues needing immediate resolution
- **Output**: Compressed results with implementation status

### `--implement` (Analysis + Implementation)
- **Phases**: Analyze → Solutions → Implement top solution
- **Token Efficiency**: ~40% reduction vs separate commands
- **Best For**: Clear issues with obvious solutions
- **Output**: Analysis summary + implementation details

### `--test` (Include Testing)
- **Phases**: Add testing validation to any workflow
- **Token Efficiency**: Integrated test reporting
- **Best For**: Changes requiring validation
- **Output**: Test results with pass/fail status

## 🛡️ Enhanced Error Context Handling

**Error Masking Prevention:**
- **Stack Trace Analysis**: Extracts full error context from logs
- **Framework Detection**: Auto-detects Django, Flask, Node.js patterns  
- **Root Cause Isolation**: Separates symptoms from underlying issues
- **Production Context**: Handles deployment-specific error patterns

**Supported Error Patterns:**
```
ContentNotRenderedError → Django response handling
DatabaseError → Connection/query issues  
TimeoutError → Performance bottlenecks
AuthenticationError → Security misconfigurations
```

## 📁 State Tracking & Context Persistence

**Traceback creates persistent state files** in `.traceback/` directory:
- **JSON state file**: `issue-id.json` - Tracks phases, root causes, solutions, convergence
- **Markdown doc**: `issue-id.md` - Human-readable documentation  
- **Context preservation**: Automatic state saving for session recovery

**Phase Progression**:
```
INITIALIZED → ANALYZED → SOLUTIONS_GENERATED → IMPLEMENTED → TESTED → VERIFIED
```

**To resume from previous session**: Check `.traceback/issue-id.json` for complete context

## Execution Instructions

When this command is invoked with `$ARGUMENTS`:

1. **Initialize State Tracking**:
   - Create `.traceback/` directory if not exists
   - Generate unique issue ID from description
   - Create JSON state file and markdown documentation
   - Set phase to `INITIALIZED`

2. **Parse Arguments**: Extract issue description, mode, and workflow flags

3. **Enhanced Error Context**:
   - Parse stack traces and error logs
   - Detect framework patterns and common error types
   - Extract production deployment context
   - Save context to JSON state file

4. **Root Cause Analysis Phase**:
   - Analyze repository context and issue patterns
   - Identify potential root causes with confidence scoring
   - Save root causes to JSON state (constraints tracking)
   - Update phase to `ANALYZED`

5. **Solution Generation Phase**:
   - Generate multiple solution alternatives for each root cause
   - Rate solutions across 5 dimensions with framework-specific weights
   - Save solutions to JSON state with ratings
   - Update phase to `SOLUTIONS_GENERATED`

6. **Workflow Execution** (based on flags):
   - `--workflow`: Execute full cycle with state updates at each phase
   - `--implement`: Update phase to `IMPLEMENTED` after execution
   - `--test`: Update phase to `TESTED` then `VERIFIED`
   - All progress saved to `.traceback/issue-id.json`

7. **State Persistence**:
   - Save all progress to JSON file
   - Update markdown documentation
   - Track iterations and convergence
   - Enable context recovery from JSON

8. **Present Optimized Results**:
   - Token-efficient output with symbols and tables
   - Display current phase and progress
   - Show `.traceback/issue-id.json` path for context recovery
   - Traditional step-by-step commands for detailed exploration

The analysis integrates with codebase context, maintains persistent state in `.traceback/`, and provides actionable intelligence with optimized token usage. Check `.traceback/issue-id.json` to resume or review progress.