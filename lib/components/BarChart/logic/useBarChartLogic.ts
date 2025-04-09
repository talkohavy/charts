import { useMemo, useRef, useState } from 'react';
import { Payload } from 'recharts/types/component/DefaultLegendContent';
import { DataKey } from 'recharts/types/util/types';
import { BRUSH_ITEMS_PER_PAGE } from '../../logic/constants';
import useMaxYValue from '../../logic/hooks/useMaxYValue';
import useTransformedDataForRecharts from '../../logic/hooks/useTransformedDataForRecharts';
import useWidthOfLongestXTickLabel from '../../logic/hooks/useWidthOfLongestXTickLabel';
import useXAxisHeight from '../../logic/hooks/useXAxisHeight';
import useYAxisWidth from '../../logic/hooks/useYAxisWidth';
import {
  getBarChartMergedChartSettings,
  getLengthOfLongestData,
  getNamesObject,
  runValidationsOnAllSeries,
} from '../../logic/utils';
import { BarChartProps } from '../BarChart';

export function useBarChartLogic(props: BarChartProps) {
  const { type: xAxisType = 'category', data, settings: settingsToMerge } = props;

  useMemo(() => runValidationsOnAllSeries(data), [data]);

  const lengthOfLongestData = useMemo(() => getLengthOfLongestData(data), [data]);

  const startIndex = useRef<number | undefined>(0);
  const endIndex = useRef<number | undefined>(Math.min(BRUSH_ITEMS_PER_PAGE, lengthOfLongestData - 1));
  const [isLegendHovered, setIsLegendHovered] = useState(false);
  const [isBarTypeHovered, setIsBarTypeHovered] = useState(() => getNamesObject(data));
  const [visibleBars, setVisibleBars] = useState(() => getNamesObject(data, true));

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

  const onLegendMouseEnter = (payload: Payload & { dataKey?: DataKey<any> }) => {
    const barName = payload.dataKey as string;

    if (!visibleBars[barName]) return;

    setIsLegendHovered(true);
    setIsBarTypeHovered((prevState) => ({ ...prevState, [barName]: true }));
  };

  const onLegendMouseLeave = (payload: Payload & { dataKey?: DataKey<any> }) => {
    const barName = payload.dataKey as string;

    if (!visibleBars[barName]) return;

    setIsLegendHovered(false);

    setIsBarTypeHovered((prevState) => ({ ...prevState, [barName]: false }));
  };

  const onLegendClick = (payload: Payload & { dataKey?: DataKey<any> }) => {
    const barName = payload.dataKey as string;

    if (visibleBars[barName]) setIsLegendHovered(false);

    setVisibleBars((prevState) => ({ ...prevState, [barName]: !prevState[barName] }));
  };

  const onBrushChange = (brushProps: { startIndex?: number; endIndex?: number }) => {
    startIndex.current = brushProps.startIndex;
    endIndex.current = brushProps.endIndex;
  };

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
