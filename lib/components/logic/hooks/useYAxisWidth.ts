import { useMemo } from 'react';
import { BarSeries, BaseChartSettings, LineSeries } from '../../types';
import { calculateYAxisWidth } from '../utils';
import { useMaxYValue } from './useMaxYValue';

type UseYAxisWidthProps = {
  data: Array<LineSeries | BarSeries>;
  settingsToMerge?: BaseChartSettings;
};

export function useYAxisWidth(props: UseYAxisWidthProps) {
  const { data, settingsToMerge } = props;

  const { maxYValue } = useMaxYValue({ data });

  const yAxisWidth = useMemo(() => {
    const yAxisWidth = calculateYAxisWidth({
      maxYValue,
      yLabel: settingsToMerge?.yAxis?.label,
      yTickSuffix: settingsToMerge?.yAxis?.tickSuffix,
      fontSize: settingsToMerge?.yAxis?.tickFontSize,
      tickCount: settingsToMerge?.yAxis?.tickCount,
      customTicks: settingsToMerge?.yAxis?.customTicks,
    });

    return yAxisWidth;
  }, [
    data,
    maxYValue,
    settingsToMerge?.yAxis?.label,
    settingsToMerge?.yAxis?.tickSuffix,
    settingsToMerge?.yAxis?.tickFontSize,
    settingsToMerge?.yAxis?.tickCount,
    settingsToMerge?.yAxis?.customTicks,
  ]);

  return { yAxisWidth };
}
