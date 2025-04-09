import { AxisDomain } from 'recharts/types/util/types';

export type BaseChartSettings = {
  general?: {
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
  xAxis?: {
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
  yAxis?: {
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
    label?: string;
    labelFontSize?: number;
    tickColor?: string;
    tickSuffix?: string;
    tickFontSize?: number;
    tickFontFamily?: string;
    tickFormatter?: (value: any) => string;
  };
  grid?: {
    /**
     * @default true
     */
    show?: boolean | { horizontal?: boolean; vertical?: boolean };
    strokeDasharray?: string;
    color?: string;
  };
  zoomSlider?: {
    /**
     * @default false
     */
    show?: boolean;
    /**
     * @default false
     */
    showPreviewInSlider?: boolean;
  };
  legend?: {
    /**
     * @default true
     */
    show?: boolean;
    nameFormatter?: (value: any) => string;
  };
  tooltip?: {
    /**
     * @default true
     */
    show?: boolean;
    xValueFormatter?: (value: any) => string;
    yValueFormatter?: (value: any) => string;
    nameFormatter?: (name: string) => string;
  };
};

export enum ValuePositions {
  Above = 'above',
  Center = 'center',
  Below = 'below',
}

export type AxisLabelPosition =
  | 'insideLeft'
  | 'insideRight'
  | 'insideTop'
  | 'insideBottom'
  | 'insideTopLeft'
  | 'insideTopRight'
  | 'insideBottomLeft'
  | 'insideBottomRight'
  | 'left'
  | 'right'
  | 'middle'
  | 'bottom'
  | 'centerBottom'
  | 'centerTop'
  | 'center'
  | 'insideEnd'
  | 'insideStart';

export type BarChartSettings = BaseChartSettings & {
  bars?: {
    minBarSize?: number;
    barSize?: number;
  };
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
  y: number;
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

export type CurveType =
  | 'basis'
  | 'basisClosed'
  | 'basisOpen'
  | 'bumpX'
  | 'bumpY'
  | 'bump'
  | 'linear'
  | 'linearClosed'
  | 'natural'
  | 'monotoneX'
  | 'monotoneY'
  | 'monotone'
  | 'step'
  | 'stepBefore'
  | 'stepAfter';

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

export type LineSeries = {
  name: string;
  color?: string;
  lineWidth?: number;
  curveType?: CurveType;
  data: Array<LineSeriesDataItem>;
  isDashed?: boolean;
  showValues?: boolean;
  dots?: {
    /**
     * A dot's radius.
     * @default 3
     */
    r: number;
  };
  hide?: boolean;
};

export type LineSeriesDataItem = {
  x: number | string;
  y: number | null;
  value?: {
    show?: boolean;
    /**
     * By default, the displayed value is the Y axis value.
     * You can use `customValue` as a way to override that.
     */
    customValue?: number | string;
    /**
     * @default 'black'
     */
    color?: string;
  };
  dot?: {
    r?: number;
    fill?: string;
    stroke?: string;
    position?: ValuePositions;
  };
};

export type ReferenceLine = {
  x?: number | string;
  y?: number;
  label?: string;
  lineWidth?: number;
  lineColor?: string;
  isDashed?: boolean;
};

export type CustomTickFormatterFunc = (value: any, index?: number, maxStringLength?: number) => string;
export type RechartsTickFormatterFunc = (value: any, index: number) => string;

export type XAsNumber = { x: number };
export type XAsString = { x: string };
