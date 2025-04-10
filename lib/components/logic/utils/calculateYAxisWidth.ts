import { getNiceTickValues } from 'recharts-scale';
import { DEFAULT_Y_TICK_COUNT, TICK_DASH_WIDTH } from '../constants';
import { calculateLongestNiceTickWidth } from './calculateLongestNiceTickWidth';

type GetTickValuesProps = {
  maxYValue: number;
  tickCount: number;
};

export function getTickValues(props: GetTickValuesProps) {
  const { maxYValue, tickCount } = props;

  const domain: [number, number] = [0, maxYValue];
  const allowDecimals = true;
  const niceYTicks = getNiceTickValues(domain, tickCount, allowDecimals);

  return niceYTicks;
}

type CalculateYAxisWidthProps = {
  maxYValue: number;
  yTickSuffix?: string;
  yLabel?: string;
  fontSize?: number;
  fontFamily?: string;
  tickCount?: number;
  customTicks?: Array<number>;
};

export function calculateYAxisWidth(props: CalculateYAxisWidthProps) {
  const { maxYValue, yTickSuffix, yLabel, fontSize, fontFamily, tickCount = DEFAULT_Y_TICK_COUNT, customTicks } = props;

  const yTickValues = customTicks ?? getTickValues({ maxYValue, tickCount });

  const longestYTickWidth = calculateLongestNiceTickWidth({
    niceTicks: yTickValues,
    suffix: yTickSuffix,
    fontSize,
    fontFamily,
  });

  const yAxisWidth = longestYTickWidth + TICK_DASH_WIDTH + (yLabel ? 10 : 5);

  return yAxisWidth;
}
