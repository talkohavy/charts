import { getNiceTickValues } from 'recharts-scale';
import { TICK_DASH_WIDTH } from '../constants';
import { calculateLongestNiceTickWidth } from './calculateLongestNiceTickWidth';

type CalculateYAxisWidthProps = {
  maxYValue: number;
  yTickSuffix?: string;
  yLabel?: string;
};

function calculateYAxisWidth(props: CalculateYAxisWidthProps) {
  const { maxYValue, yTickSuffix, yLabel } = props;

  const yTickCount = 5;
  const domain: [number, number] = [0, maxYValue];
  const allowDecimals = true;
  const niceYTicks = getNiceTickValues(domain, yTickCount, allowDecimals);

  const longestYTickWidth = calculateLongestNiceTickWidth(niceYTicks, yTickSuffix);

  const yAxisWidth = longestYTickWidth + TICK_DASH_WIDTH + (yLabel ? 8 : 0);

  return yAxisWidth;
}

export { calculateYAxisWidth };