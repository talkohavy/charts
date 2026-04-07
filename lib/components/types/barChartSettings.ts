import type { BaseChartSettings } from './baseChartSettings';

export type BarChartSettings = BaseChartSettings & {
  bars?: {
    minBarSize?: number;
    barSize?: number;
  };
};
