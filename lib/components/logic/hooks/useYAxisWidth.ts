import { useMemo } from 'react';
import type { BarSeries, BaseChartSettings, LineSeries } from '../../types';
import { DEFAULT_Y_TICK_COUNT, TICK_DASH_WIDTH } from '../constants';
import { calculateLongestNiceTickWidth } from '../utils/calculateLongestNiceTickWidth';
import { getTickValues } from '../utils/calculateYAxisWidth';
import { useMaxYValue } from './useMaxYValue';
import { useWidthOfLongestTickLabel } from './useWidthOfLongestTickLabel';

type UseYAxisWidthProps = {
  seriesNames: string[];
  data: Array<LineSeries | BarSeries>;
  settingsToMerge?: BaseChartSettings;
  layout: 'horizontal' | 'vertical';
  xAxisType: 'category' | 'number' | 'datetime';
  transformedDataForRecharts: Array<{ x: number | string }>;
};

export function useYAxisWidth(props: UseYAxisWidthProps) {
  const { seriesNames, data, transformedDataForRecharts, xAxisType, settingsToMerge, layout } = props;

  const { maxYValue } = useMaxYValue({ data });

  const { widthOfLongestTickLabel } = useWidthOfLongestTickLabel({
    keys: seriesNames,
    settingsToMerge,
    transformedDataForRecharts,
    axisType: xAxisType,
  });

  const yAxisWidth = useMemo(() => {
    const yTickSuffix = settingsToMerge?.yAxis?.tickSuffix;
    const yLabel = settingsToMerge?.yAxis?.label;
    const fontSize = settingsToMerge?.yAxis?.tickFontSize;
    const fontFamily = settingsToMerge?.yAxis?.tickFontFamily;
    const tickCount = settingsToMerge?.yAxis?.tickCount ?? DEFAULT_Y_TICK_COUNT;
    const customTicks = settingsToMerge?.yAxis?.customTicks;

    let longestTickLength = 0;

    if (layout === 'vertical') {
      const yTickValues = customTicks ?? getTickValues({ maxYValue, tickCount });

      longestTickLength = calculateLongestNiceTickWidth({
        niceTicks: yTickValues,
        suffix: yTickSuffix,
        fontSize,
        fontFamily,
      });
    } else {
      longestTickLength = widthOfLongestTickLabel;
    }

    const yAxisWidth = longestTickLength + TICK_DASH_WIDTH + (yLabel ? 10 : 5);

    return yAxisWidth;
  }, [
    data,
    maxYValue,
    settingsToMerge?.yAxis?.label,
    settingsToMerge?.yAxis?.tickSuffix,
    settingsToMerge?.yAxis?.tickFontSize,
    settingsToMerge?.yAxis?.tickFontFamily,
    settingsToMerge?.yAxis?.tickCount,
    settingsToMerge?.yAxis?.customTicks,
    layout,
    widthOfLongestTickLabel,
  ]);

  return { yAxisWidth };
}
