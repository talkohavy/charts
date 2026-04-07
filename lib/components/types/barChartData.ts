import type { ReferenceLine } from './referenceLine';

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

/**
 * @description
 * The below props are shared props between a LineChart & a BarChart.
 * They do not fit for PieChart.
 */
export type BaseChartProps = {
  /**
   * Use 'category' when your xAxis is made of *words*. i.e. ['Cars', 'Ships', 'Planes', 'Other'].
   *
   * Use 'number' when your xAxis is made of *numbers*, which can contain gaps. i.e. [1,2,3,6]. In this example, recharts will take care of properly spacing 3 and 6, while if using 'category' the space between them would be 1.
   *
   * Use 'datetime' when your xAxis is time-based. xAxis values MUST BE of unix timestamp.
   *
   *
   * **IMPORTANT!!!*
   *
   * When choosing chart type of `datetime`, each data series must be sorted!
   * For other types (category & number), recharts sorts the data internally.
   *
   * @default 'category'
   */
  type?: 'category' | 'number' | 'datetime';
  referenceLines?: Array<ReferenceLine>;
  /**
   * IMPORTANT! This `className` cannot contain paddings of any kind!
   * recharts has a bug where if you have padding, the cursor will offset when trying to hover over data points.
   */
  className?: string;
};
