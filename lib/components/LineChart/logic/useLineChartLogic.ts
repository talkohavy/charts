import { useMemo } from 'react';
import { getLineChartMergedChartSettings, runValidationsOnAllSeries } from '../../logic/utils';
import useTransformedDataForRecharts from '../../logic/hooks/useTransformedDataForRecharts';
import useYAxisWidth from '../../logic/hooks/useYAxisWidth';
import useXAxisHeight from '../../logic/hooks/useXAxisHeight';
import useWidthOfLongestXTickLabel from '../../logic/hooks/useWidthOfLongestXTickLabel';
import { LineChartProps } from '../LineChart';
import useMaxYValue from '../../logic/hooks/useMaxYValue';
import { useLegendLogic } from '../../logic/hooks/useLegendLogic';
import { useBrushLogic } from '../../logic/hooks/useBrushLogic';

export function useLineChartLogic(props: LineChartProps) {
  const { type: xAxisType = 'category', data, settings: settingsToMerge } = props;

  useMemo(() => runValidationsOnAllSeries(data), [data]);

  const positiveXTickRotateAngle = Math.abs(settingsToMerge?.xAxis?.tickAngle ?? 0);

  const { transformedDataForRecharts } = useTransformedDataForRecharts({ data });
  const { maxYValue } = useMaxYValue({ data });
  const { widthOfLongestXTickLabel } = useWidthOfLongestXTickLabel({
    settingsToMerge,
    transformedDataForRecharts,
    xAxisType,
  });
  const { xAxisHeight } = useXAxisHeight({ settingsToMerge, positiveXTickRotateAngle, widthOfLongestXTickLabel });
  const { yAxisWidth } = useYAxisWidth({ data, settingsToMerge, maxYValue });
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
