import type { HorizontalAlignmentType, VerticalAlignmentType } from 'recharts/types/component/DefaultLegendContent';
import type { AxisDomain, AxisInterval, LayoutType, ScaleType } from 'recharts/types/util/types';
import type { GeneralSettings } from './baseChartSettings';
import type { CustomTickFormatterFunc, RechartsTickFormatterFunc } from './common';

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
  props: any;
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
  layout: LayoutType;
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
    position: string;
    dy: number;
    dx: number;
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
