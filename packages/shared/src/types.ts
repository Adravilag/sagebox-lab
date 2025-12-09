/**
 * Shared types
 */

export interface LabTool {
  name: string;
  description: string;
  port: number;
}

export interface IconDefinition {
  name: string;
  svg: string;
  tags?: string[];
  category?: string;
}

export interface TokenDefinition {
  name: string;
  value: string;
  type: 'color' | 'spacing' | 'typography' | 'other';
  description?: string;
}

export interface EventDefinition {
  name: string;
  detail?: Record<string, unknown>;
  description?: string;
}
