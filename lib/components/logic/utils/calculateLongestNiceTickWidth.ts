import { formatLabel } from './formatters';
import { getTextWidth } from './getTextWidth';

function calculateLongestNiceTickWidth(niceTicks: Array<any>, suffix: string = '', fontSize?: number) {
  let widthOfLongestTickLabel = 0;

  niceTicks.forEach((currentTickValue) => {
    const currentTickWidth = getTextWidth({ text: `${formatLabel(currentTickValue)}${suffix}`, fontSize });

    if (widthOfLongestTickLabel < currentTickWidth) {
      widthOfLongestTickLabel = currentTickWidth;
    }
  });

  return widthOfLongestTickLabel;
}

export { calculateLongestNiceTickWidth };
