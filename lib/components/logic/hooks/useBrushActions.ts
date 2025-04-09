import { useMemo, useRef } from 'react';
import { getLengthOfLongestData } from '../utils';
import { BRUSH_ITEMS_PER_PAGE } from '../constants';

type UseBrushActionsProps = {
  data: Array<any>;
};

export function useBrushActions(props: UseBrushActionsProps) {
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
