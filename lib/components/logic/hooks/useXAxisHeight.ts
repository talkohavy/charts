import { useMemo } from 'react';
import { BaseChartSettings } from '../../types';
import { getXAxisHeight } from '../utils';

type UseXAxisHeightProps = {
  widthOfLongestXTickLabel: number;
  positiveXTickRotateAngle: number;
  settingsToMerge?: BaseChartSettings;
};

export default function useXAxisHeight(props: UseXAxisHeightProps) {
  const { settingsToMerge, positiveXTickRotateAngle, widthOfLongestXTickLabel } = props;

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
