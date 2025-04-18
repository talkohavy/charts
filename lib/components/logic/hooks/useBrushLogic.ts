import { useMemo, useRef } from 'react';
import { BarSeries, LineSeries } from '../../types';
import { BRUSH_ITEMS_PER_PAGE } from '../constants';
import { getLengthOfLongestData } from '../utils/getLengthOfLongestData';

type UseBrushLogicProps = {
  data: Array<LineSeries | BarSeries>;
};

export function useBrushLogic(props: UseBrushLogicProps) {
  const { data } = props;

  const lengthOfLongestData = useMemo(() => getLengthOfLongestData(data), [data]);

  const startIndex = useRef<number | undefined>(0);
  const endIndex = useRef<number | undefined>(Math.min(BRUSH_ITEMS_PER_PAGE, lengthOfLongestData - 1));

  const onBrushChange = (brushProps: { startIndex?: number; endIndex?: number }) => {
    startIndex.current = brushProps.startIndex;
    endIndex.current = brushProps.endIndex;
  };

  return { startIndex, endIndex, onBrushChange };
}
