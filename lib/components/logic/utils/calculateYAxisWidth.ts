import { getNiceTickValues } from 'recharts-scale';

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
