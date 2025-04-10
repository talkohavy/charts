import { useMemo } from 'react';
import { BaseChartSettings, CustomTickFormatterFunc } from '../../types';
import { FORMATTERS } from '../utils/formatters';
import { getWidthOfLongestXLabel } from '../utils/getWidthOfLongestXLabel';

type UseWidthOfLongestXTickLabelProps = {
  transformedDataForRecharts: Array<any>;
  settingsToMerge?: BaseChartSettings;
  xAxisType: 'category' | 'number' | 'datetime';
};

export function useWidthOfLongestXTickLabel(props: UseWidthOfLongestXTickLabelProps) {
  const { transformedDataForRecharts, settingsToMerge, xAxisType } = props;

  const widthOfLongestXTickLabel = useMemo(
    () =>
      getWidthOfLongestXLabel({
        transformedDataForRecharts,
        xTickFormatter: (settingsToMerge?.xAxis?.tickFormatter ?? FORMATTERS[xAxisType]) as CustomTickFormatterFunc,
        xFontSize: settingsToMerge?.xAxis?.tickFontSize,
        xFontFamily: settingsToMerge?.xAxis?.tickFontFamily,
        xTickSuffix: settingsToMerge?.xAxis?.tickSuffix,
      }),
    [
      transformedDataForRecharts,
      xAxisType,
      settingsToMerge?.xAxis?.tickFormatter,
      settingsToMerge?.xAxis?.tickFontSize,
      settingsToMerge?.xAxis?.tickFontFamily,
      settingsToMerge?.xAxis?.tickSuffix,
    ],
  );

  return { widthOfLongestXTickLabel };
}
