import { formatLabel } from './formatters';
import { getTextWidth } from './getTextWidth';

type CalculateLongestNiceTickWidthProps = {
  niceTicks: Array<any>;
  suffix?: string;
  fontSize?: number;
  fontFamily?: string;
};

function calculateLongestNiceTickWidth(props: CalculateLongestNiceTickWidthProps) {
  const { niceTicks, suffix = '', fontSize, fontFamily } = props;

  let widthOfLongestTickLabel = 0;

  niceTicks.forEach((currentTickValue) => {
    const currentTickWidth = getTextWidth({ text: `${formatLabel(currentTickValue)}${suffix}`, fontSize, fontFamily });

    if (widthOfLongestTickLabel < currentTickWidth) {
      widthOfLongestTickLabel = currentTickWidth;
    }
  });

  return widthOfLongestTickLabel;
}

export { calculateLongestNiceTickWidth };
