export * from "./tokens.js";

export interface ComponentStructure {
  hasStyles: boolean;
  hasTests: boolean;
  hasStories: boolean;
  hasIndex: boolean;
  files: string[];
}

export interface FileInfo {
  name: string;
  type: string;
  path: string;
}

export interface ComponentFiles {
  files: FileInfo[];
}

export interface ComponentQuality {
  name: string;
  completeness: number;
  hasStyles: boolean;
  hasTests: boolean;
  hasStories: boolean;
  hasDesignIssues: boolean;
}

export interface QualityDashboard {
  totalComponents: number;
  averageCompleteness: number;
  componentsWithFullCoverage: number;
  componentsNeedingAttention: string[];
  qualityBreakdown: {
    excellent: number;
    good: number;
    needsImprovement: number;
  };
}

export interface SyncStatus {
  componentName: string;
  isSynced: boolean;
  needsUpdate: boolean;
  differences: string[];
  lastChecked: string;
}

export interface SyncReport {
  totalComponents: number;
  syncedComponents: number;
  needsUpdate: string[];
  syncPercentage: number;
  lastChecked: string;
}

