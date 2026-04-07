import type { ReferenceLine } from './referenceLine';
import type { DataKey } from 'recharts/types/util/types';

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
  style?: React.CSSProperties;
};

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

export type CustomTickFormatterFunc = (value: any, index?: number, maxStringLength?: number) => string;
export type RechartsTickFormatterFunc = (value: any, index: number) => string;

export type XAsNumber = { x: number };
export type XAsString = { x: string };

export type Payload = {
  dataKey?: DataKey<any>;
};
