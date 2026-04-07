import { useMemo } from 'react';
import { AxisTypes, ChartLayouts } from '../../logic/constants';
import { useBrushLogic } from '../../logic/hooks/useBrushLogic';
import { useLegendLogic } from '../../logic/hooks/useLegendLogic';
import { useTransformedDataForRecharts } from '../../logic/hooks/useTransformedDataForRecharts';
import { useXAxisHeight } from '../../logic/hooks/useXAxisHeight';
import { useYAxisWidth } from '../../logic/hooks/useYAxisWidth';
import { getLineChartMergedChartSettings } from '../../logic/utils/getMergedChartSettings';
import { runValidationsOnAllSeries } from '../../logic/utils/runValidationsOnAllSeries';
import type { LineChartProps } from '../../types';

export function useLineChartLogic(props: LineChartProps) {
  const { type: xAxisType = AxisTypes.Category, data, settings: settingsToMerge } = props;

  useMemo(() => runValidationsOnAllSeries(data), [data]);

  const { transformedDataForRecharts } = useTransformedDataForRecharts({ data });

  const { xAxisHeight } = useXAxisHeight({ settingsToMerge, transformedDataForRecharts });

  const { yAxisWidth } = useYAxisWidth({
    data,
    settingsToMerge,
    layout: ChartLayouts.Horizontal, // <--- My LineChart is always horizontal (BarChart however could be both)
  });

  const chartSettings = useMemo(
    () =>
      getLineChartMergedChartSettings({
        settings: settingsToMerge,
        chartType: 'LineChart',
        xAxisType,
        xAxisHeight,
        yAxisWidth,
      }),
    [settingsToMerge, xAxisType, xAxisHeight, yAxisWidth],
  );

  const {
    isLegendHovered,
    isSeriesHovered: isLineHovered,
    onLegendMouseEnter,
    onLegendMouseLeave,
    onLegendClick,
    visibleSeries: visibleLines,
  } = useLegendLogic({ data });

  const { startIndex, endIndex, onBrushChange } = useBrushLogic({ data });

  return {
    xAxisType,
    transformedDataForRecharts,
    chartSettings,
    startIndex,
    endIndex,
    isLineHovered,
    isLegendHovered,
    visibleLines,
    onLegendMouseEnter,
    onLegendMouseLeave,
    onLegendClick,
    onBrushChange,
  };
}
