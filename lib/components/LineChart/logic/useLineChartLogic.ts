import { useMemo, useRef, useState } from 'react';
import {
  getLengthOfLongestData,
  getLineChartMergedChartSettings,
  getNamesObject,
  runValidationsOnAllSeries,
} from '../../logic/utils';
import useTransformedDataForRecharts from '../../logic/hooks/useTransformedDataForRecharts';
import useYAxisWidth from '../../logic/hooks/useYAxisWidth';
import useXAxisHeight from '../../logic/hooks/useXAxisHeight';
import useWidthOfLongestXTickLabel from '../../logic/hooks/useWidthOfLongestXTickLabel';
import { LineChartProps } from '../LineChart';
import { Payload } from 'recharts/types/component/DefaultLegendContent';
import { DataKey } from 'recharts/types/util/types';
import useMaxYValue from '../../logic/hooks/useMaxYValue';
import { BRUSH_ITEMS_PER_PAGE } from '../../logic/constants';

export function useLineChartLogic(props: LineChartProps) {
  const { type: xAxisType = 'category', data, settings: settingsToMerge } = props;

  useMemo(() => runValidationsOnAllSeries(data), [data]);

  const lengthOfLongestData = useMemo(() => getLengthOfLongestData(data), [data]);

  const startIndex = useRef<number | undefined>(0);
  const endIndex = useRef<number | undefined>(Math.min(BRUSH_ITEMS_PER_PAGE, lengthOfLongestData - 1));
  const [isLegendHovered, setIsLegendHovered] = useState(false);
  const [isLineHovered, setIsLineHovered] = useState(() => getNamesObject(data));
  const [visibleLines, setVisibleLines] = useState(() => getNamesObject(data, true));

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

  const onLegendMouseEnter = (payload: Payload & { dataKey?: DataKey<any> }) => {
    const lineName = payload.dataKey as string;

    if (!visibleLines[lineName]) return;

    setIsLegendHovered(true);
    setIsLineHovered((prevState) => ({ ...prevState, [lineName]: true }));
  };

  const onLegendMouseLeave = (payload: Payload & { dataKey?: DataKey<any> }) => {
    const lineName = payload.dataKey as string;

    if (!visibleLines[lineName]) return;

    setIsLegendHovered(false);

    setIsLineHovered((prevState) => ({ ...prevState, [lineName]: false }));
  };

  const onLegendClick = (payload: Payload & { dataKey?: DataKey<any> }) => {
    const lineName = payload.dataKey as string;

    if (visibleLines[lineName]) setIsLegendHovered(false);

    setVisibleLines((prevState) => ({ ...prevState, [lineName]: !prevState[lineName] }));
  };

  const onBrushChange = (brushProps: { startIndex?: number; endIndex?: number }) => {
    startIndex.current = brushProps.startIndex;
    endIndex.current = brushProps.endIndex;
  };

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
