---
description: "Analyze an issue to identify root causes and generate solution alternatives with comprehensive ratings"
argument-hint: "<issue-description> [--mode quick|standard|comprehensive]"
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

## Usage

```
/traceback:analyze "API endpoints are timing out under load"
/traceback:analyze "Memory usage keeps increasing" --mode comprehensive
/traceback:analyze "Tests failing in CI pipeline" --mode quick
/traceback:analyze "Database slow" --verbose    # Detailed output with full explanations
```

## 🎯 Token Optimization (Built-in)

**All commands use smart optimization by default:**
- **Compressed output**: 40-60% token reduction
- **Smart caching**: Reuses analysis patterns  
- **Abbreviated formats**: Tables over prose
- **Symbol usage**: ✅ ❌ ⚠️ → instead of verbose text

Use `--verbose` flag when you need detailed explanations.

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

## Execution Instructions

When this command is invoked with `$ARGUMENTS`:

1. **Parse Arguments**: Extract issue description and mode flag
2. **Initialize Analysis**: Set up Traceback orchestrator in specified mode
3. **Root Cause Analysis Phase**:
   - Analyze repository context and issue patterns
   - Identify potential root causes with confidence scoring
   - Gather supporting evidence and categorize causes
4. **Solution Generation Phase**:
   - Generate multiple solution alternatives for each root cause
   - Rate each solution across 5 dimensions (security, scalability, maintainability, performance, cost)
   - Calculate overall scores and rank solutions
5. **Present Results**:
   - Display root causes with confidence levels
   - Show top 3 solutions with ratings breakdown
   - Provide next steps and related commands
6. **Prepare for Next Phase**: Store analysis state for subsequent commands

The analysis integrates with the current codebase context and provides actionable intelligence for decision-making.