import { useMemo } from 'react';
import { BaseChartSettings } from '../../types';
import { getXAxisHeight } from '../utils';

type UseXAxisHeightProps = {
  settingsToMerge?: BaseChartSettings;
  widthOfLongestXTickLabel: number;
};

export default function useXAxisHeight(props: UseXAxisHeightProps) {
  const { settingsToMerge, widthOfLongestXTickLabel } = props;

  const positiveXTickRotateAngle = Math.abs(settingsToMerge?.xAxis?.tickAngle ?? 0);

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
