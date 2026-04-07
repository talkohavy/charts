import type { BaseChartSettings } from './baseChartSettings';

export type LineChartSettings = BaseChartSettings & {
  lines?: {
    /**
     * Whether to connect a graph line across null points.
     * @default false
     */
    connectNulls?: boolean;
    /**
     * @default false
     */
    hideDots?: boolean;
  };
};
