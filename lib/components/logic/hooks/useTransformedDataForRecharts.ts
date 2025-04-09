import { useMemo } from 'react';
import { BarSeries, LineSeries, XAsNumber, XAsString } from '../../types';

type UseTransformedDataForRechartsProps = {
  data: Array<LineSeries | BarSeries>;
};

export function useTransformedDataForRecharts(props: UseTransformedDataForRechartsProps) {
  const { data } = props;

  const transformedDataForRecharts: Array<{ x: number | string }> = useMemo(() => {
    const transformedDataByKey: Record<string, any> = {};

    data.forEach((currentLine) => {
      currentLine.data.forEach(({ x, y }) => {
        transformedDataByKey[x] ??= { x };
        transformedDataByKey[x][currentLine.name] = y;
      });
    });

    const transformedData = Object.values(transformedDataByKey);

    if (!transformedData.length) return transformedData;

    const sortNumbers = (a: XAsNumber, b: XAsNumber) => a.x - b.x;
    const sortStrings = (a: XAsString, b: XAsString) => a.x.localeCompare(b.x);
    const sorter = typeof transformedData[0].x === 'number' ? sortNumbers : sortStrings;

    transformedData.sort(sorter);

    return transformedData;
  }, [data]);

  return { transformedDataForRecharts };
}
