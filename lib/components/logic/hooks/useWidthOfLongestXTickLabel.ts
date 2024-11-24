import { useMemo } from 'react';
import { BaseChartSettings, CustomTickFormatterFunc } from '../../types';
import { FORMATTERS, getWidthOfLongestXLabel } from '../utils';

type UseWidthOfLongestXTickLabelProps = {
  transformedDataForRecharts: Array<any>;
  settingsToMerge?: BaseChartSettings;
  xAxisType: 'category' | 'number' | 'datetime';
};

export default function useWidthOfLongestXTickLabel(props: UseWidthOfLongestXTickLabelProps) {
  const { transformedDataForRecharts, settingsToMerge, xAxisType } = props;

  const widthOfLongestXTickLabel = useMemo(
    () =>
      getWidthOfLongestXLabel({
        transformedDataForRecharts,
        xTickFormatter: (settingsToMerge?.xAxis?.tickFormatter ?? FORMATTERS[xAxisType]) as CustomTickFormatterFunc,
        xFontSize: settingsToMerge?.xAxis?.tickFontSize,
        xFontFamily: settingsToMerge?.xAxis?.tickFontFamily,
      }),
    [
      transformedDataForRecharts,
      xAxisType,
      settingsToMerge?.xAxis?.tickFormatter,
      settingsToMerge?.xAxis?.tickFontSize,
      settingsToMerge?.xAxis?.tickFontFamily,
    ],
  );

  return { widthOfLongestXTickLabel };
}
