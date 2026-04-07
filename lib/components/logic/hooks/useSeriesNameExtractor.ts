import { useMemo } from 'react';
import type { BarSeries, LineSeries } from '../../types';

/**
 * Even if data isn't memoized, the series names will be memoized because the unique key is memoized.
 */
export function useSeriesNameExtractor(data: Array<LineSeries | BarSeries>) {
  const uniqueKey = data.map(({ name }) => name).join('_');

  const seriesNames = useMemo(() => {
    return data.map(({ name }) => name);
  }, [uniqueKey]);

  return seriesNames;
}
