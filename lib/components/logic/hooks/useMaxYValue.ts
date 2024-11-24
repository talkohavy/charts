import { useMemo } from 'react';
import { BarSeries, LineSeries } from '../../types';

type UseMaxYValueProps = {
  data: Array<BarSeries | LineSeries>;
};

export default function useMaxYValue(props: UseMaxYValueProps) {
  const { data } = props;

  const maxYValue = useMemo(() => {
    let maxYValue = Number.NEGATIVE_INFINITY;
    data.forEach((currentLine) => {
      currentLine.data.forEach(({ y }) => {
        if (y !== null && maxYValue < y) maxYValue = y;
      });
    });

    return maxYValue;
  }, [data]);

  return { maxYValue };
}
