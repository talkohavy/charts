import { useMemo } from 'react';
import { ChartLayouts, type ChartLayoutValues, DEFAULT_Y_TICK_COUNT, TICK_DASH_WIDTH } from '../constants';
import { calculateLongestNiceTickWidth } from '../utils/calculateLongestNiceTickWidth';
import { getTickValues } from '../utils/calculateYAxisWidth';
import { useMaxYValue } from './useMaxYValue';
import type { BarSeries, BaseChartSettings, LineSeries } from '../../types';

type UseYAxisWidthProps = {
  data: Array<LineSeries | BarSeries>;
  settingsToMerge?: BaseChartSettings;
  layout: ChartLayoutValues;
};

export function useYAxisWidth(props: UseYAxisWidthProps) {
  const { data, settingsToMerge, layout } = props;

  const { maxYValue } = useMaxYValue({ data });

  const yAxisWidth = useMemo(() => {
    const yTickSuffix = settingsToMerge?.yAxis?.tickSuffix;
    const yLabel = settingsToMerge?.yAxis?.label;
    const fontSize = settingsToMerge?.yAxis?.tickFontSize;
    const fontFamily = settingsToMerge?.yAxis?.tickFontFamily;
    const tickCount = settingsToMerge?.yAxis?.tickCount ?? DEFAULT_Y_TICK_COUNT;
    const customTicks = settingsToMerge?.yAxis?.customTicks;

    let longestTickLength = 0;

    if (layout === ChartLayouts.Horizontal) {
      const yTickValues = customTicks ?? getTickValues({ maxYValue, tickCount });

      longestTickLength = calculateLongestNiceTickWidth({
        niceTicks: yTickValues,
        suffix: yTickSuffix,
        fontSize,
        fontFamily,
      });
    } else {
      longestTickLength = 200; // TODO: calculate the width of the longest tick label when axes are reversed
    }

    const yAxisWidth = longestTickLength + TICK_DASH_WIDTH + (yLabel ? 10 : 5);

    return yAxisWidth;
  }, [
    maxYValue,
    settingsToMerge?.yAxis?.label,
    settingsToMerge?.yAxis?.tickSuffix,
    settingsToMerge?.yAxis?.tickFontSize,
    settingsToMerge?.yAxis?.tickFontFamily,
    settingsToMerge?.yAxis?.tickCount,
    settingsToMerge?.yAxis?.customTicks,
    layout,
  ]);

  return { yAxisWidth };
}
