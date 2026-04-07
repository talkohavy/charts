import type { CustomTickFormatterFunc } from '../../types';
import { getTextWidth } from './getTextWidth';

type GetWidthOfLongestLabeProps = {
  keys: string[];
  transformedDataForRecharts: Array<any>;
  tickFormatter: CustomTickFormatterFunc;
  fontSize?: number;
  fontFamily?: string;
  tickSuffix?: string;
};

export function getWidthOfLongestLabel(props: GetWidthOfLongestLabeProps) {
  const { keys, transformedDataForRecharts, tickFormatter, fontSize, fontFamily, tickSuffix = '' } = props;

  let longestTickLabelWidth = 0;

  transformedDataForRecharts.forEach((dataPoint) => {
    const valuesToCompare = keys.map((key) => {
      const currentValue = dataPoint[key];
      const currentTickLabel = `${tickFormatter(currentValue)}${tickSuffix}`;

      return getTextWidth({
        text: currentTickLabel,
        fontSize: fontSize,
        fontFamily: fontFamily,
      });
    });

    const currentTickLabelWidth = Math.max(...valuesToCompare);

    if (longestTickLabelWidth < currentTickLabelWidth) longestTickLabelWidth = currentTickLabelWidth;
  });

  return longestTickLabelWidth;
}
