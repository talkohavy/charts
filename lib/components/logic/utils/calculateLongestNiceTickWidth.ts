import { formatLabel } from './formatters';
import { getTextWidth } from './getTextWidth';

type CalculateLongestNiceTickWidthProps = {
  niceTicks: Array<any>;
  suffix?: string;
  fontSize?: number;
  fontFamily?: string;
};

export function calculateLongestNiceTickWidth(props: CalculateLongestNiceTickWidthProps) {
  const { niceTicks, suffix = '', fontSize, fontFamily } = props;

  let widthOfLongestTickLabel = 0;

  niceTicks.forEach((currentTickValue) => {
    const currentTickLabel = `${formatLabel(currentTickValue)}${suffix}`;
    const currentTickWidth = getTextWidth({ text: currentTickLabel, fontSize, fontFamily });

    if (widthOfLongestTickLabel < currentTickWidth) {
      widthOfLongestTickLabel = currentTickWidth;
    }
  });

  return widthOfLongestTickLabel;
}
