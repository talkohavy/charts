import { useMemo } from 'react';
import useMaxYValue from '../../logic/hooks/useMaxYValue';
import useTransformedDataForRecharts from '../../logic/hooks/useTransformedDataForRecharts';
import useWidthOfLongestXTickLabel from '../../logic/hooks/useWidthOfLongestXTickLabel';
import useXAxisHeight from '../../logic/hooks/useXAxisHeight';
import useYAxisWidth from '../../logic/hooks/useYAxisWidth';
import { getBarChartMergedChartSettings, runValidationsOnAllSeries } from '../../logic/utils';
import { BarChartProps } from '../BarChart';
import { useLegendActions } from '../../logic/hooks/useLegendActions';
import { useBrushActions } from '../../logic/hooks/useBrushActions';

export function useBarChartLogic(props: BarChartProps) {
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
  const { xAxisHeight } = useXAxisHeight({ settingsToMerge, widthOfLongestXTickLabel, positiveXTickRotateAngle });
  const { yAxisWidth } = useYAxisWidth({ data, maxYValue, settingsToMerge });
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
  } = useLegendActions({ data });

  const { startIndex, endIndex, onBrushChange } = useBrushActions({ data });

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
