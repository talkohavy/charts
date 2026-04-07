import type { AxisDomain } from 'recharts/types/util/types';
import type { CustomTickFormatterFunc } from './common';

export type GeneralSettings = {
  /**
   * According to recharts, if you leave this as undefined, it would default to `true` in CSR, and to `false` in SSR.
   * @default undefined
   */
  isAnimationActive?: boolean;
  /**
   * In case of a LineChart, shows values for all lines, above the dots.
   * In case of a BarChart, shows values for all bars, inside the bar.
   * @default false
   */
  showValues?: boolean;
};

export type XAxisSettings = {
  /**
   * @default true
   */
  show?: boolean;
  /**
   * @default true
   */
  showTickLine?: boolean;
  /**
   * @default '#666'
   */
  axisLineColor?: string;
  /**
   * @default true
   */
  showAxisLine?: boolean;
  /**
   * @default ['auto','auto']
   */
  domain?: AxisDomain;
  customTicks?: Array<number>;
  label?: string;
  /**
   * The color of the tick's value.
   * @default '#666'
   */
  tickColor?: string;
  tickSuffix?: string;
  /**
   * The angle of the tick's value.
   * @default 0
   */
  tickAngle?: number;
  tickFontSize?: number;
  tickFontFamily?: string;
  tickFormatter?: CustomTickFormatterFunc;
  // tickSuffix: string;
};

export type YAxisSettings = {
  /**
   * @default true
   */
  show?: boolean;
  /**
   * @default true
   */
  showTickLine?: boolean;
  /**
   * @default true
   */
  showAxisLine?: boolean;
  /**
   * @default '#666'
   */
  axisLineColor?: string;
  /**
   * @default ['auto','auto']
   */
  domain?: AxisDomain;
  customTicks?: Array<number>;
  /**
   * @default 5
   */
  tickCount?: number;
  /**
   * @default 6
   */
  tickSize?: number;
  label?: string;
  labelFontSize?: number;
  tickColor?: string;
  tickSuffix?: string;
  tickFontSize?: number;
  tickFontFamily?: string;
  tickFormatter?: (value: any) => string;
};

export type GridSettings = {
  /**
   * @default true
   */
  show?: boolean | { horizontal?: boolean; vertical?: boolean };
  strokeDasharray?: string;
  color?: string;
};

export type ZoomSliderSettings = {
  /**
   * @default false
   */
  show?: boolean;
  /**
   * @default false
   */
  showPreviewInSlider?: boolean;
};

export type LegendSettings = {
  /**
   * @default true
   */
  show?: boolean;
  nameFormatter?: (value: any) => string;
};

export type TooltipSettings = {
  /**
   * @default true
   */
  show?: boolean;
  xValueFormatter?: (value: any) => string;
  yValueFormatter?: (value: any) => string;
  nameFormatter?: (name: string) => string;
};

export type BaseChartSettings = {
  general?: GeneralSettings;
  xAxis?: XAxisSettings;
  yAxis?: YAxisSettings;
  grid?: GridSettings;
  zoomSlider?: ZoomSliderSettings;
  legend?: LegendSettings;
  tooltip?: TooltipSettings;
};
