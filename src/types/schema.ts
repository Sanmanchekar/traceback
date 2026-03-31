/**
 * Traceback Schema - Manifold-inspired types for constraint-based problem solving
 */

// ============= Core Domain Types =============

export interface Issue {
  id: string;
  title: string;
  description: string;
  repository: RepositoryContext;
  timestamp: Date;
  severity: Severity;
  category: IssueCategory;
  symptoms: Symptom[];
  constraints: Constraint[];
  metadata: Record<string, any>;
}

export interface RepositoryContext {
  path: string;
  language: ProgrammingLanguage;
  framework?: string;
  dependencies: Dependency[];
  architecture: ArchitecturePattern;
  metrics: RepositoryMetrics;
}

// ============= RCA Types =============

export interface RootCause {
  id: string;
  description: string;
  confidence: number; // 0-1
  category: CauseCategory;
  evidence: Evidence[];
  affectedComponents: string[];
  propagationPath: string[];
}

export interface Evidence {
  type: EvidenceType;
  source: string;
  data: any;
  confidence: number;
  timestamp: Date;
}

// ============= Solution Types =============

export interface Solution {
  id: string;
  title: string;
  description: string;
  approach: SolutionApproach;
  recommended: boolean;
  ratings: SolutionRatings;
  implementation: Implementation;
  impact: ImpactAnalysis;
  tradeoffs: Tradeoff[];
  requirements: Requirement[];
  risks: Risk[];
}

export interface SolutionRatings {
  security: Rating;
  scalability: Rating;
  maintainability: Rating;
  performance: Rating;
  cost: Rating;
  overall: number;
}

export interface Rating {
  score: number; // 0-10
  reasoning: string;
  factors: RatingFactor[];
}

export interface RatingFactor {
  name: string;
  impact: 'positive' | 'negative' | 'neutral';
  weight: number;
  description: string;
}

// ============= Constraint Types (Manifold-inspired) =============

export interface Constraint {
  id: string;
  type: ConstraintType;
  description: string;
  priority: Priority;
  validator: (solution: Solution) => ValidationResult;
}

export type ConstraintType = 
  | 'invariant'     // Must always be true
  | 'goal'          // Desired outcome
  | 'boundary'      // Limits and boundaries
  | 'resource'      // Resource constraints
  | 'compliance';   // Regulatory/policy

export interface ValidationResult {
  valid: boolean;
  message?: string;
  violations?: string[];
}

// ============= Impact Analysis Types =============

export interface ImpactAnalysis {
  scope: ImpactScope;
  affectedComponents: ComponentImpact[];
  dependencies: DependencyImpact[];
  riskLevel: RiskLevel;
  rollbackComplexity: Complexity;
  testingRequired: TestingRequirement[];
  estimatedDuration: Duration;
}

export interface ComponentImpact {
  name: string;
  type: ComponentType;
  changeType: ChangeType;
  risk: RiskLevel;
  description: string;
}

export interface DependencyImpact {
  name: string;
  currentVersion?: string;
  requiredVersion?: string;
  breaking: boolean;
  migrationPath?: string;
}

// ============= Implementation Types =============

export interface Implementation {
  strategy: ImplementationStrategy;
  steps: ImplementationStep[];
  validations: Validation[];
  rollbackPlan: RollbackPlan;
  estimatedEffort: EffortEstimate;
}

export interface ImplementationStep {
  id: string;
  order: number;
  description: string;
  automated: boolean;
  command?: string;
  validation: Validation;
  rollbackStep?: ImplementationStep;
}

export interface Validation {
  type: ValidationType;
  description: string;
  automated: boolean;
  command?: string;
  expectedOutcome: string;
}

export interface RollbackPlan {
  automated: boolean;
  steps: ImplementationStep[];
  dataBackupRequired: boolean;
  estimatedTime: Duration;
}

// ============= Orchestration Types =============

export interface OrchestrationConfig {
  mode: OrchestrationMode;
  parallelism: number;
  timeoutMs: number;
  retryPolicy: RetryPolicy;
  caching: CacheConfig;
}

export interface OrchestrationResult {
  issue: Issue;
  rootCauses: RootCause[];
  solutions: Solution[];
  recommendation: Recommendation;
  executionTime: number;
  confidence: number;
}

export interface Recommendation {
  primarySolution: Solution;
  alternatives: Solution[];
  reasoning: string;
  consensusScore: number;
}

// ============= Enums =============

export enum Severity {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
  INFO = 'info'
}

export enum IssueCategory {
  PERFORMANCE = 'performance',
  SECURITY = 'security',
  FUNCTIONALITY = 'functionality',
  RELIABILITY = 'reliability',
  MAINTAINABILITY = 'maintainability',
  COMPATIBILITY = 'compatibility'
}

export enum CauseCategory {
  CODE_DEFECT = 'code_defect',
  CONFIGURATION = 'configuration',
  ARCHITECTURE = 'architecture',
  DEPENDENCY = 'dependency',
  INFRASTRUCTURE = 'infrastructure',
  DATA = 'data',
  EXTERNAL = 'external'
}

export enum SolutionApproach {
  QUICK_FIX = 'quick_fix',
  REFACTOR = 'refactor',
  REDESIGN = 'redesign',
  CONFIGURATION_CHANGE = 'configuration_change',
  DEPENDENCY_UPDATE = 'dependency_update',
  INFRASTRUCTURE_CHANGE = 'infrastructure_change'
}

export enum RiskLevel {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
  MINIMAL = 'minimal'
}

export enum Complexity {
  TRIVIAL = 'trivial',
  SIMPLE = 'simple',
  MODERATE = 'moderate',
  COMPLEX = 'complex',
  VERY_COMPLEX = 'very_complex'
}

export enum ComponentType {
  SERVICE = 'service',
  DATABASE = 'database',
  API = 'api',
  UI = 'ui',
  LIBRARY = 'library',
  CONFIGURATION = 'configuration',
  INFRASTRUCTURE = 'infrastructure'
}

export enum ChangeType {
  ADD = 'add',
  MODIFY = 'modify',
  DELETE = 'delete',
  REPLACE = 'replace',
  CONFIGURE = 'configure'
}

export enum ValidationType {
  UNIT_TEST = 'unit_test',
  INTEGRATION_TEST = 'integration_test',
  E2E_TEST = 'e2e_test',
  PERFORMANCE_TEST = 'performance_test',
  SECURITY_SCAN = 'security_scan',
  MANUAL_REVIEW = 'manual_review'
}

export enum OrchestrationMode {
  QUICK = 'quick',
  STANDARD = 'standard',
  COMPREHENSIVE = 'comprehensive',
  DEEP = 'deep'
}

export enum ProgrammingLanguage {
  JAVASCRIPT = 'javascript',
  TYPESCRIPT = 'typescript',
  PYTHON = 'python',
  JAVA = 'java',
  GO = 'go',
  RUST = 'rust',
  CPP = 'cpp',
  CSHARP = 'csharp',
  RUBY = 'ruby',
  PHP = 'php'
}

export enum ArchitecturePattern {
  MONOLITHIC = 'monolithic',
  MICROSERVICES = 'microservices',
  SERVERLESS = 'serverless',
  EVENT_DRIVEN = 'event_driven',
  LAYERED = 'layered',
  HEXAGONAL = 'hexagonal'
}

export enum Priority {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
}

export enum EvidenceType {
  LOG_ANALYSIS = 'log_analysis',
  CODE_ANALYSIS = 'code_analysis',
  PERFORMANCE_PROFILE = 'performance_profile',
  ERROR_TRACE = 'error_trace',
  METRIC = 'metric',
  TEST_RESULT = 'test_result',
  USER_REPORT = 'user_report'
}

export enum ImpactScope {
  ISOLATED = 'isolated',
  MODULE = 'module',
  SERVICE = 'service',
  SUBSYSTEM = 'subsystem',
  SYSTEM_WIDE = 'system_wide'
}

export enum ImplementationStrategy {
  INCREMENTAL = 'incremental',
  BIG_BANG = 'big_bang',
  BLUE_GREEN = 'blue_green',
  CANARY = 'canary',
  FEATURE_FLAG = 'feature_flag'
}

// ============= Helper Types =============

export interface Symptom {
  description: string;
  frequency: string;
  firstOccurrence: Date;
  metrics?: Record<string, number>;
}

export interface Dependency {
  name: string;
  version: string;
  type: 'runtime' | 'dev' | 'peer';
}

export interface RepositoryMetrics {
  linesOfCode: number;
  complexity: number;
  testCoverage: number;
  technicalDebt: number;
}

export interface Requirement {
  type: 'technical' | 'resource' | 'time';
  description: string;
  mandatory: boolean;
}

export interface Risk {
  description: string;
  probability: number;
  impact: RiskLevel;
  mitigation: string;
}

export interface Tradeoff {
  benefit: string;
  cost: string;
  weight: number;
}

export interface EffortEstimate {
  optimistic: Duration;
  realistic: Duration;
  pessimistic: Duration;
}

export interface Duration {
  value: number;
  unit: 'minutes' | 'hours' | 'days' | 'weeks';
}

export interface TestingRequirement {
  type: ValidationType;
  scope: string;
  automated: boolean;
  critical: boolean;
}

export interface RetryPolicy {
  maxAttempts: number;
  backoffMs: number;
  exponential: boolean;
}

export interface CacheConfig {
  enabled: boolean;
  ttlMs: number;
  maxSize: number;
}