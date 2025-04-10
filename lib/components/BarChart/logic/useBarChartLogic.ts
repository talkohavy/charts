import { useMemo } from 'react';
import { useBrushLogic } from '../../logic/hooks/useBrushLogic';
import { useLegendLogic } from '../../logic/hooks/useLegendLogic';
import { useTransformedDataForRecharts } from '../../logic/hooks/useTransformedDataForRecharts';
import { useXAxisHeight } from '../../logic/hooks/useXAxisHeight';
import { useYAxisWidth } from '../../logic/hooks/useYAxisWidth';
import { getBarChartMergedChartSettings } from '../../logic/utils/getMergedChartSettings';
import { runValidationsOnAllSeries } from '../../logic/utils/runValidationsOnAllSeries';
import { BarChartProps } from '../BarChart';

export function useBarChartLogic(props: BarChartProps) {
  const { type: xAxisType = 'category', data, settings: settingsToMerge, layout = 'horizontal' } = props;

  useMemo(() => runValidationsOnAllSeries(data), [data]);

  const { transformedDataForRecharts } = useTransformedDataForRecharts({ data });
  const { xAxisHeight } = useXAxisHeight({ settingsToMerge, transformedDataForRecharts, xAxisType });
  const { yAxisWidth } = useYAxisWidth({ data, settingsToMerge, layout, transformedDataForRecharts, xAxisType });
  const chartSettings = useMemo(
    () =>
      getBarChartMergedChartSettings({
        settings: settingsToMerge,
        chartType: 'BarChart',
        xAxisType,
        xAxisHeight,
        yAxisWidth,
      }),
    [settingsToMerge, xAxisType, xAxisHeight, yAxisWidth],
  );

  const {
    isLegendHovered,
    isSeriesHovered: isBarTypeHovered,
    onLegendMouseEnter,
    onLegendMouseLeave,
    onLegendClick,
    visibleSeries: visibleBars,
  } = useLegendLogic({ data });

  const { startIndex, endIndex, onBrushChange } = useBrushLogic({ data });

  return {
    transformedDataForRecharts,
    chartSettings,
    visibleBars,
    startIndex,
    endIndex,
    isLegendHovered,
    isBarTypeHovered,
    onLegendMouseEnter,
    onLegendMouseLeave,
    onLegendClick,
    onBrushChange,
  };
}
