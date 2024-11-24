import { CustomTickFormatterFunc } from '../../types';
import { getTextWidth } from './getTextWidth';

type GetWidthOfLongestXLabeProps = {
  transformedDataForRecharts: Array<any>;
  xTickFormatter: CustomTickFormatterFunc;
  xFontSize?: number;
  xFontFamily?: string;
};

function getWidthOfLongestXLabel(props: GetWidthOfLongestXLabeProps) {
  const { transformedDataForRecharts, xTickFormatter, xFontSize, xFontFamily } = props;

  let widthOfLongestXTickLabel = 0;

  transformedDataForRecharts.forEach(({ x: currentXTickValue }) => {
    const currentXTickWidth = getTextWidth({
      text: xTickFormatter(currentXTickValue) ?? '',
      fontSize: xFontSize,
      fontFamily: xFontFamily,
    });

    if (widthOfLongestXTickLabel < currentXTickWidth) widthOfLongestXTickLabel = currentXTickWidth;
  });

  return widthOfLongestXTickLabel;
}

export { getWidthOfLongestXLabel };
