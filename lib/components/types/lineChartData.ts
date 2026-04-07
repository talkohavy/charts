import type { ValuePositionValues } from './common';

export type LineSeries = {
  name: string;
  data: Array<LineSeriesDataItem>;
  color?: string;
  lineWidth?: number;
  curveType?: CurveType;
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
    position?: ValuePositionValues;
  };
};

type CurveType =
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
