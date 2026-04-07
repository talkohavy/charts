import { LEGEND_HEIGHT } from '../constants';

type getLegendHeightProps = {
  showLegend: boolean;
  xAxisLabel?: string;
};

export function getLegendHeight(props: getLegendHeightProps) {
  const { showLegend, xAxisLabel } = props;

  if (!showLegend) return;

  if (xAxisLabel) return LEGEND_HEIGHT;

  return 1; // <--- falsy values makes chart height shrink for some reason. I put 1 because it's the minimum value, which makes the chart grow and fill the space.
}
