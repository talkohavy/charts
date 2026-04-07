import { useMemo } from 'react';
import type { BaseChartSettings } from '../../types';
import { getXAxisHeight } from '../utils/getXAxisHeight';
import { useWidthOfLongestTickLabel } from './useWidthOfLongestTickLabel';

type UseXAxisHeightProps = {
  settingsToMerge?: BaseChartSettings;
  transformedDataForRecharts: Array<{ x: number | string }>;
};

export function useXAxisHeight(props: UseXAxisHeightProps) {
  const { settingsToMerge, transformedDataForRecharts } = props;

  const positiveXTickRotateAngle = Math.abs(settingsToMerge?.xAxis?.tickAngle ?? 0);

  const { widthOfLongestTickLabel } = useWidthOfLongestTickLabel({
    keys: ['x'],
    settingsToMerge,
    transformedDataForRecharts,
  });

  const xAxisHeight = useMemo(
    () =>
      getXAxisHeight({
        tickAngle: -positiveXTickRotateAngle,
        maxTextWidth: widthOfLongestTickLabel,
        isLegendVisible: !!settingsToMerge?.legend?.show,
        isSliderVisible: !!settingsToMerge?.zoomSlider?.show,
        isXLabelVisible: !!settingsToMerge?.xAxis?.label,
      }),
    [
      positiveXTickRotateAngle,
      widthOfLongestTickLabel,
      settingsToMerge?.legend?.show,
      settingsToMerge?.zoomSlider?.show,
      settingsToMerge?.xAxis?.label,
    ],
  );

  return { xAxisHeight };
}
