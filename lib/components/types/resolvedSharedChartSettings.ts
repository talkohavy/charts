import type { GeneralSettings } from './baseChartSettings';
import type { CustomTickFormatterFunc, RechartsTickFormatterFunc } from './common';
import type { HorizontalAlignmentType, VerticalAlignmentType } from 'recharts/types/component/DefaultLegendContent';
import type { LabelPosition } from 'recharts/types/component/Label';
import type { AxisDomain, AxisInterval, CartesianLayout, ScaleType } from 'recharts/types/util/types';

type TypeValues = 'category' | 'number' | undefined;

export type ResolvedSharedChartSettings = {
  general: GeneralSettings;
  grid: ResolvedGridSettings;
  legend: ResolvedLegendSettings;
  tooltip: ResolvedTooltipSettings;
  zoomSlider: ResolvedZoomSliderSettings;
  referenceLines: ResolvedReferenceLinesSettings;
  xAxis: ResolvedXAxisSettings;
  yAxis: ResolvedYAxisSettings;
};

export type ResolvedGridSettings = {
  show: boolean;
  props: GridProps;
};

export type ResolvedLegendSettings = {
  show: boolean;
  props: LegendProps;
};

export type ResolvedTooltipSettings = {
  show: boolean;
  props: TooltipProps;
};

export type ResolvedZoomSliderSettings = {
  show: boolean;
  showPreviewInSlider: boolean;
  props: ZoomSliderProps;
};

export type ResolvedReferenceLinesSettings = {
  props: ReferenceLinesProps;
};

export type ResolvedXAxisSettings = {
  verticalProps: XAxisVerticalProps;
  horizontalProps: XAxisHorizontalProps;
  props: XAxisProps;
};

export type ResolvedYAxisSettings = {
  props: YAxisProps;
  verticalProps: any;
  horizontalProps: any;
};

export type GridProps = {
  stroke: string | undefined;
  strokeWidth: number;
  horizontal: boolean;
  vertical: boolean;
  strokeDasharray: string;
  syncWithTicks: boolean;
};

export type LegendProps = {
  layout: CartesianLayout;
  verticalAlign: VerticalAlignmentType;
  align: HorizontalAlignmentType;
  iconSize: number;
  formatter: (value: any) => string | undefined;
  height: number | undefined;
};

export type TooltipProps = {
  ySuffix: string;
  xValueFormatter: CustomTickFormatterFunc;
  nameFormatter: CustomTickFormatterFunc;
};

export type ZoomSliderProps = {
  height: number;
};

export type ReferenceLinesProps = any;

export type XAxisProps = {
  hide: boolean;
  label: {
    value: string;
    angle: number;
    position: LabelPosition;
    dy: number;
    dx: number;
    fill: string | undefined;
  };
  color: string | undefined;
  fontSize: number | undefined;
  fontFamily: string | undefined;
  ticks: number[] | undefined;
  tickLine: boolean;
  tickFormatter: RechartsTickFormatterFunc;
  axisLine: boolean;
  stroke: string | undefined;
  domain: AxisDomain;
  allowDataOverflow: boolean;
  angle: number;
  height: number | undefined;
  textAnchor: any;
  padding: { right?: number; left?: number; top?: number; bottom?: number };
  interval: AxisInterval;
};

export type XAxisVerticalProps = {
  dataKey: string;
  padding: 'gap' | 'no-gap';
  type: TypeValues;
  scale: ScaleType;
};

export type XAxisHorizontalProps = {
  type: TypeValues;
  tickFormatter: RechartsTickFormatterFunc;
};

export type YAxisProps = {
  hide: boolean;
  label: {
    value: any;
    angle: number;
    position: LabelPosition;
    fontSize: number | undefined;
    fill: string;
    style: any;
  };
  stroke: string;
  fontSize: number | undefined;
  fontFamily: string | undefined;
  tick: {
    fill: string;
  };
  tickSize: number;
  ticks: number[] | undefined;
  axisLine: boolean;
  tickLine: boolean;
  unit: string;
  domain: AxisDomain | undefined;
  width: number;
  tickFormatter: CustomTickFormatterFunc;
  padding: { top?: number; right?: number; bottom?: number; left?: number };
  includeHidden: boolean;
};
