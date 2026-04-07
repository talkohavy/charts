import type { ResolvedSharedChartSettings } from './resolvedSharedChartSettings';
import type { StackOffsetType } from 'recharts/types/util/types';

export type ResolvedBarChartSettings = ResolvedSharedChartSettings & {
  barChartBase: ResolvedBarChartBaseSettings;
  bars: ResolvedBarsSettings;
};

export type ResolvedBarChartBaseSettings = {
  props: BarChartBaseProps;
};

export type ResolvedBarsSettings = {
  props: BarsProps;
};

export type BarChartBaseProps = {
  margin: {
    left: number;
    bottom: number;
    right: number;
  };
  stackOffset: StackOffsetType;
};

export type BarsProps = {
  barSize: number | undefined;
};
