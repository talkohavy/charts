import { FORMATTERS, formatLabel } from '../../../logic/utils';
import { PieChartSettings } from '../../types';

const defaultYValueFormatter = (num: number) => {
  if (num >= 1000000) {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'short',
      maximumFractionDigits: 2,
    }).format(num);
  } else {
    return new Intl.NumberFormat('en-US').format(num);
  }
};

type getMergedPieChartSettingsProps = {
  settings?: PieChartSettings;
};

function getMergedPieChartSettings(props: getMergedPieChartSettingsProps) {
  const { settings } = props;

  const showLegend = settings?.legend?.show ?? true;

  return {
    legend: {
      show: showLegend,
      props: {
        xValueFormatter:
          settings?.legend?.xValueFormatter ?? (((value) => formatLabel(value, 10)) as (value: string) => string),
        // iconSize: 14,
        // fontSize: 14
      },
    },
    tooltip: {
      props: {
        yValueSuffix: settings?.tooltip?.unit ?? '', // <--- Notice that I copy whatever the yAxis has.
        xValueFormatter: settings?.tooltip?.xValueFormatter ?? (FORMATTERS.category as (value: string) => string),
        yValueFormatter: settings?.tooltip?.yValueFormatter ?? defaultYValueFormatter,
      },
    },
  };
}

export { getMergedPieChartSettings };
