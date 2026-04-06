---
description: "Effort estimator: break solutions into tasks with T-shirt size estimates, risk flags, and dependency sequencing"
argument-hint: "<solution-id|task-description> [--granularity coarse|detailed] [--format table|timeline|jira] [--include risks|deps|skills]"
---

# /traceback:estimate - Effort Estimator

Given a solution from `/traceback:recommend` or a task description, breaks it into subtasks with T-shirt size estimates, risk flags, dependency sequencing, and skill requirements. Designed for sprint planning and PM consumption.

## When to Use

| Scenario | Example |
|----------|---------|
| Sprint planning | Size tickets before committing to a sprint |
| Stakeholder estimation | "How long will this fix take?" |
| Resource planning | Identify skills needed for implementation |
| Risk communication | Flag risky tasks before committing |
| Roadmap planning | Rough-size future work items |

## Usage

```
/traceback:estimate solution-1                 # Estimate from RCA solution
/traceback:estimate "Implement payment retry"  # Estimate from description
/traceback:estimate --granularity detailed     # Fine-grained breakdown
/traceback:estimate --format timeline          # Gantt-style timeline
/traceback:estimate --format jira              # Ready for Jira import
/traceback:estimate --include risks,deps,skills # Extra detail sections
```

## T-Shirt Sizing

| Size | Hours | Days | Typical Scope |
|------|-------|------|---------------|
| **XS** | 1-2h | <0.5d | Config change, env var, flag toggle |
| **S** | 2-4h | 0.5-1d | Single file fix, simple refactor |
| **M** | 4-12h | 1-2d | Multi-file change, new endpoint |
| **L** | 12-24h | 2-4d | Feature, significant refactor |
| **XL** | 24-40h | 4-7d | Major feature, architecture change |
| **XXL** | 40h+ | 1-2w | Epic, system redesign |

## Sample Output

```
📐 EFFORT ESTIMATE: Query Optimization (solution-1)

SUMMARY:
  Total: L (18-26 hours / 3-5 days)
  Risk: LOW
  Skills: Backend, Database, DevOps
  Parallelizable: 40% (some tasks can overlap)

TASK BREAKDOWN:
┌────┬──────────────────────────────┬──────┬──────┬──────┬────────┐
│ #  │ Task                         │ Size │ Risk │ Deps │ Skills │
├────┼──────────────────────────────┼──────┼──────┼──────┼────────┤
│ 1  │ Audit current query patterns │ S    │ Low  │ --   │ BE     │
│ 2  │ Design eager loading strategy│ S    │ Low  │ #1   │ BE,DB  │
│ 3  │ Implement select_related     │ M    │ Low  │ #2   │ BE     │
│ 4  │ Implement prefetch_related   │ M    │ Low  │ #2   │ BE     │
│ 5  │ Add query monitoring         │ S    │ Low  │ #3,4 │ BE,DO  │
│ 6  │ Write/update tests           │ M    │ Low  │ #3,4 │ BE     │
│ 7  │ Performance testing          │ S    │ Med  │ #6   │ QA     │
│ 8  │ Staging deploy & validate    │ S    │ Low  │ #7   │ DO     │
│ 9  │ Production rollout           │ S    │ Med  │ #8   │ DO     │
│ 10 │ Monitor & documentation      │ XS   │ Low  │ #9   │ BE     │
└────┴──────────────────────────────┴──────┴──────┴──────┴────────┘

DEPENDENCY GRAPH:
  #1 → #2 → #3 ─┐
                  ├→ #5 → #6 → #7 → #8 → #9 → #10
            #4 ─┘

CRITICAL PATH: #1 → #2 → #3 → #5 → #6 → #7 → #8 → #9 → #10
  Shortest: 18h (all tasks at minimum estimate)
  Longest: 26h (all tasks at maximum estimate)
  Likely: 22h (weighted average)

PARALLELIZATION OPPORTUNITY:
  Tasks #3 and #4 can run in parallel (save ~4h)
  With 2 devs: total reduces to ~16h (3 days)

RISK FLAGS:
  ⚠️ #7 Performance testing: Results may require revisiting #3/#4
  ⚠️ #9 Production rollout: Needs monitoring during business hours

SKILL REQUIREMENTS:
  Backend (BE): 70% of work — query optimization, ORM patterns
  Database (DB): 15% — index design, query plan analysis
  DevOps (DO): 10% — deploy pipeline, monitoring setup
  QA: 5% — performance test execution

→ /traceback:implement solution-1     # Start implementation
→ /traceback:testgap                  # Verify test plan is complete
→ /traceback:impact solution-1        # PM-friendly impact report
```

## Timeline View (`--format timeline`)

```
TIMELINE: Query Optimization (3-5 days)

Day 1  ████████ Audit queries (#1) + Design strategy (#2)
Day 2  ████████ Implement select_related (#3) || prefetch_related (#4)
Day 3  ████████ Query monitoring (#5) + Write tests (#6)
Day 4  ████████ Performance testing (#7) + Staging deploy (#8)
Day 5  ████████ Production rollout (#9) + Monitor (#10)

██ = work block    || = parallel tasks
```

## Jira Format (`--format jira`)

Outputs tasks as Jira-importable format:

```
Summary: [Query Opt] Audit current query patterns
Type: Task
Estimate: 3h (S)
Labels: query-optimization, phase-1
Blocks: PROJ-002

Summary: [Query Opt] Design eager loading strategy
Type: Task
Estimate: 3h (S)
Labels: query-optimization, phase-1
Blocked By: PROJ-001
...
```

## Execution Instructions

When this command is invoked with `$ARGUMENTS`:

1. **Parse Arguments**: Extract solution ID or description, granularity, format, includes

2. **Context Loading**:
   - If solution ID: load solution details from `.traceback/` state
   - If description: analyze against codebase for scope assessment
   - Identify affected files, modules, and dependencies

3. **Task Decomposition**:
   - Break solution into atomic tasks
   - Identify natural phase boundaries
   - Determine task dependencies and ordering
   - Assess parallelization opportunities

4. **Estimation**:
   - T-shirt size each task based on scope and complexity
   - Convert to hour ranges for timeline calculation
   - Calculate critical path duration
   - Factor in risk buffers for flagged tasks

5. **Risk Assessment**:
   - Flag tasks with uncertainty or external dependencies
   - Identify tasks that may require rework
   - Note skills or expertise requirements

6. **Dependency Mapping**:
   - Build dependency graph between tasks
   - Identify critical path
   - Calculate parallelization savings
   - Determine minimum calendar time with N developers

7. **Report Generation**:
   - Format output per `--format` preference
   - Include requested sections (risks, deps, skills)
   - Generate dependency graph visualization

8. **State Persistence**:
   - Save estimate to `.traceback/estimate-{id}-{date}.json`
   - Link to source solution if applicable

9. **Present Results**:
   - Summary with total size and risk level
   - Task breakdown table
   - Dependency graph
   - Critical path and parallelization notes
   - Token-optimized output by default
