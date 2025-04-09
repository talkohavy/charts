import { useMemo } from 'react';
import { useBrushLogic } from '../../logic/hooks/useBrushLogic';
import { useLegendLogic } from '../../logic/hooks/useLegendLogic';
import useTransformedDataForRecharts from '../../logic/hooks/useTransformedDataForRecharts';
import useXAxisHeight from '../../logic/hooks/useXAxisHeight';
import useYAxisWidth from '../../logic/hooks/useYAxisWidth';
import { getLineChartMergedChartSettings, runValidationsOnAllSeries } from '../../logic/utils';
import { LineChartProps } from '../LineChart';

export function useLineChartLogic(props: LineChartProps) {
  const { type: xAxisType = 'category', data, settings: settingsToMerge } = props;

  useMemo(() => runValidationsOnAllSeries(data), [data]);

  const { transformedDataForRecharts } = useTransformedDataForRecharts({ data });

  const { xAxisHeight } = useXAxisHeight({ settingsToMerge, transformedDataForRecharts, xAxisType });
  const { yAxisWidth } = useYAxisWidth({ data, settingsToMerge });
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
