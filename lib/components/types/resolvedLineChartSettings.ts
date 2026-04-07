import type { ResolvedSharedChartSettings } from './resolvedSharedChartSettings';

export type ResolvedLineChartSettings = ResolvedSharedChartSettings & {
  lineChartBase: ResolvedLineChartBaseSettings;
  lines: ResolvedLinesSettings;
};

export type ResolvedLineChartBaseSettings = {
  props: LineChartBaseProps;
};

export type ResolvedLinesSettings = {
  props: LinesProps;
  hideDots: boolean | undefined;
};

export type LineChartBaseProps = any;

export type LinesProps = {
  isAnimationActive: boolean | undefined;
  connectNulls: boolean | undefined;
};
