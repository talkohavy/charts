import { getTextWidth } from './getTextWidth';

type GetWidthOfLongestXLabeProps = {
  transformedDataForRecharts: Array<any>;
  xTickFormatter: (value: string | number, maxStringLength?: number) => string | undefined;
  xFontSize?: number;
};

function getWidthOfLongestXLabel(props: GetWidthOfLongestXLabeProps) {
  const { transformedDataForRecharts, xTickFormatter, xFontSize } = props;

  let widthOfLongestXTickLabel = 0;

  transformedDataForRecharts.forEach(({ x: currentXTickValue }) => {
    const currentXTickWidth = getTextWidth({ text: xTickFormatter(currentXTickValue) ?? '', fontSize: xFontSize });

    if (widthOfLongestXTickLabel < currentXTickWidth) widthOfLongestXTickLabel = currentXTickWidth;
  });

  return widthOfLongestXTickLabel;
}

export { getWidthOfLongestXLabel };
