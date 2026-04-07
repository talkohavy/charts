import { useMemo } from 'react';
import type { BaseChartSettings, CustomTickFormatterFunc } from '../../types';
import { FORMATTERS } from '../utils/formatters';
import { getWidthOfLongestLabel } from '../utils/getWidthOfLongestLabel';

type UseWidthOfLongestTickLabelProps = {
  keys: string[];
  transformedDataForRecharts: Array<{ x: number | string }>;
  settingsToMerge?: BaseChartSettings;
};

export function useWidthOfLongestTickLabel(props: UseWidthOfLongestTickLabelProps) {
  const { keys, transformedDataForRecharts, settingsToMerge } = props;

  const widthOfLongestTickLabel = useMemo(
    () =>
      getWidthOfLongestLabel({
        keys,
        transformedDataForRecharts,
        tickFormatter: (settingsToMerge?.xAxis?.tickFormatter ?? FORMATTERS.category) as CustomTickFormatterFunc,
        fontSize: settingsToMerge?.xAxis?.tickFontSize,
        fontFamily: settingsToMerge?.xAxis?.tickFontFamily,
        tickSuffix: settingsToMerge?.xAxis?.tickSuffix,
      }),
    [
      transformedDataForRecharts,
      settingsToMerge?.xAxis?.tickFormatter,
      settingsToMerge?.xAxis?.tickFontSize,
      settingsToMerge?.xAxis?.tickFontFamily,
      settingsToMerge?.xAxis?.tickSuffix,
    ],
  );

  return { widthOfLongestTickLabel };
}
