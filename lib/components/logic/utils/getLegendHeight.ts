import { LEGEND_HEIGHT } from '../constants';

type getLegendHeightProps = {
  showLegend: boolean;
  xAxisLabel?: string;
  chartType?: 'LineChart' | 'BarChart';
};

function getLegendHeight(props: getLegendHeightProps) {
  const { showLegend, xAxisLabel, chartType } = props;

  if (!showLegend) return;

  if (chartType === 'LineChart') {
    if (xAxisLabel) return LEGEND_HEIGHT;

    return 1;
  }

  if (chartType === 'BarChart') {
    if (xAxisLabel) return LEGEND_HEIGHT + 10; // <--- this 10 is needed in order for the xAxisLabel not to get cut

    return 15;
  }
}

export { getLegendHeight };
