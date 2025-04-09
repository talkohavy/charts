import { useMemo } from 'react';
import { BaseChartSettings } from '../../types';
import { getXAxisHeight } from '../utils';
import { useWidthOfLongestXTickLabel } from './useWidthOfLongestXTickLabel';

type UseXAxisHeightProps = {
  settingsToMerge?: BaseChartSettings;
  transformedDataForRecharts: Array<{ x: number | string }>;
  xAxisType: 'category' | 'number' | 'datetime';
};

export function useXAxisHeight(props: UseXAxisHeightProps) {
  const { settingsToMerge, transformedDataForRecharts, xAxisType } = props;

  const positiveXTickRotateAngle = Math.abs(settingsToMerge?.xAxis?.tickAngle ?? 0);

  const { widthOfLongestXTickLabel } = useWidthOfLongestXTickLabel({
    settingsToMerge,
    transformedDataForRecharts,
    xAxisType,
  });

  const xAxisHeight = useMemo(
    () =>
      getXAxisHeight({
        tickAngle: -positiveXTickRotateAngle,
        maxTextWidth: widthOfLongestXTickLabel,
        isLegendVisible: !!settingsToMerge?.legend?.show,
        isSliderVisible: !!settingsToMerge?.zoomSlider?.show,
        isXLabelVisible: !!settingsToMerge?.xAxis?.label,
      }),
    [
      positiveXTickRotateAngle,
      widthOfLongestXTickLabel,
      settingsToMerge?.legend?.show,
      settingsToMerge?.zoomSlider?.show,
      settingsToMerge?.xAxis?.label,
    ],
  );

  return { xAxisHeight };
}
