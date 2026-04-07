import type { BarChartSettings } from './barChartSettings';
import type { BaseChartProps } from './common';

export type BarChartProps = BaseChartProps & {
  settings?: BarChartSettings;
  data: Array<BarSeries>;
  onClickBar?: (props: BarClickEventProps & { name: string; barTypeIndex: number }) => void;
  /**
   * Every Bar within the BarChart has an ID which is a string comprised of '[bar name]-[x value]'.
   * @example
   * const data = [{ name: 'hello', data: [{x: 'Israel', y: 140}, x: 'France', y: 120]}];
   * // The barIds are: 'hello-Israel' & 'hello-France'
   */
  activeBarId?: string;
  /**
   * @default 'vertical'
   */
  layout?: 'horizontal' | 'vertical';
};

export type BarSeries = {
  /**
   * _name_ must be unique! Do not leave as an empty string.
   */
  name: string;
  data: Array<BarSeriesDataItem>;
  color?: string;
  barBorderColor?: string;
  /**
   * a suffix that will be added to the tooltip.
   */
  unit?: string;
  /**
   * Give 2 bars (or more) the same stackId to have them stacked together, one on top of the other, in the same bar.
   */
  stackId?: string;
};

export type BarSeriesDataItem = {
  x: number | string;
  y: number | null;
  color?: string;
};

export type BarClickEventProps = {
  payload: { x: string | number };
  value: number;
  fill: string;
  x: number;
  y: number;
  width: number;
  height: number;
  background: { x: number; y: number; width: number; height: number };
  tooltipPayload: Array<any>;
  tooltipPosition: { x: number; y: number };
};
