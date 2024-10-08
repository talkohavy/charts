import { formatLabel } from '../../../logic/utils/formatters';
import { LineSeriesDataItem, ValuePositions } from '../../../types';
import type { DotProps } from 'recharts';

const VALUE_POSITION: Record<ValuePositions, (radius: number) => number> = {
  [ValuePositions.Above]: (radius) => -5 - radius * 1.1,
  [ValuePositions.Center]: () => 3, // <--- 3 is the dot's center
  [ValuePositions.Below]: (radius) => 11 + radius * 1.1,
};

type ActiveDotProps = DotProps & {
  payload: any;
  dataKey: string;
  data: Array<LineSeriesDataItem>;
  showChartValues: boolean;
  showLineValues: boolean;
  hideDots: boolean;
};

export default function NonActiveDot(props: ActiveDotProps) {
  const { cx, cy, payload, dataKey, data, r, stroke, opacity, showChartValues, showLineValues, hideDots } = props;

  if (!payload[dataKey]) return;

  const { showValue: showDotValue, dot } =
    data.find((dotData) => dotData.x === payload.x && dotData.y === payload[dataKey]) ?? {};

  const isValueVisible = showDotValue ?? showLineValues ?? showChartValues;
  const isDotVisible = !hideDots || dot;

  const dotProps = { r: (dot?.r ?? r)!, fill: dot?.fill ?? stroke, stroke: dot?.stroke, opacity };
  const getDyOfText = VALUE_POSITION[dot?.position as ValuePositions] ?? VALUE_POSITION.above;
  const dyOfText = getDyOfText(dotProps.r);

  return (
    <svg>
      {isDotVisible && <circle cx={cx} cy={cy} {...dotProps} />}

      {isValueVisible && (
        <text x={cx} y={cy} dy={dyOfText} textAnchor='middle' fontSize={9}>
          {formatLabel(payload[dataKey])}
        </text>
      )}
    </svg>
  );
}
