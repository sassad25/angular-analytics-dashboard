export interface Metric {
  id: string;
  name: string;
  value: number;
  unit: string;
  trend: number; // percentage change vs previous period
}

export interface MetricSummary {
  total: number;
  improving: number;
  declining: number;
}
