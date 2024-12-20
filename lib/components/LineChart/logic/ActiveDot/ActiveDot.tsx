import { formatLabel } from '../../../logic/utils/formatters';
import { LineSeriesDataItem, ValuePositions } from '../../../types';
import type { DotProps } from 'recharts';

const DOT_CENTER = 3;

export type ActiveDotProps = DotProps & {
  payload: any;
  dataKey: string;
  data: Array<LineSeriesDataItem>;
  showChartValues: boolean;
  showLineValues: boolean;
  onClick?: (data: any) => void;
};

export default function ActiveDot(props: ActiveDotProps) {
  const { cx, cy, payload, dataKey, data, r, fill, onClick, opacity } = props;

  if (!payload[dataKey]) return null;

  const { dot, value } = data.find((dotData) => dotData.x === payload.x && dotData.y === payload[dataKey]) ?? {};
  const { show: showDotValue, color, customValue } = value ?? {};

  const isValueVisible = showDotValue && dot?.position === ValuePositions.Center;
  const displayValue = customValue ?? formatLabel(payload[dataKey]);

  const dotProps = { r: (dot?.r ?? r)! * 1.1 + 2, fill: dot?.fill ?? fill, stroke: dot?.stroke, opacity };

  return (
    <svg onClick={onClick}>
      <circle cx={cx} cy={cy} {...dotProps} />

      {/* An invisible circle to enlarge the clicking area */}
      <circle cx={cx} cy={cy} r={150} fill='transparent' />

      {isValueVisible && (
        <text x={cx} y={cy} dy={DOT_CENTER} textAnchor='middle' fill={color} fontSize={9}>
          {displayValue}
        </text>
      )}
    </svg>
  );
}
