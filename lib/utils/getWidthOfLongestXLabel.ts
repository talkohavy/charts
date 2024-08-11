import { getTextWidth } from './getTextWidth';

type GetWidthOfLongestXLabeProps = {
  transformedDataForRecharts: Array<any>;
  xTickFormatter: (value: string | number, maxStringLength?: number) => string | undefined;
};

function getWidthOfLongestXLabel(props: GetWidthOfLongestXLabeProps) {
  const { transformedDataForRecharts, xTickFormatter } = props;

  let widthOfLongestXTickLabel = 0;

  transformedDataForRecharts.forEach(({ x: currentXTickValue }) => {
    const currentXTickWidth = getTextWidth({ text: xTickFormatter(currentXTickValue) ?? '' });

    if (widthOfLongestXTickLabel < currentXTickWidth) widthOfLongestXTickLabel = currentXTickWidth;
  });

  return widthOfLongestXTickLabel;
}

export { getWidthOfLongestXLabel };
