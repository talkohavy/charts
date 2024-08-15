import type { DotProps } from 'recharts';

export type ActiveDotProps = DotProps & {
  payload: any;
  dataKey: string;
  data: Array<any>;
  showChartValues: boolean;
  showLineValues: boolean;
  onClick?: (data: any) => void;
};

export default function ActiveDot(props: ActiveDotProps) {
  const { cx, cy, payload, dataKey, data, r, fill, onClick } = props;

  if (!payload[dataKey]) return;

  const { dot } = data.find((dotData) => dotData.x === payload.x && dotData.y === payload[dataKey]) ?? {};

  const dotProps = { r: (dot?.r ?? r) * 1.1 + 2, fill: dot?.fill ?? fill, stroke: dot?.stroke ?? 'white' };

  return (
    <svg onClick={onClick}>
      <circle cx={cx} cy={cy} {...dotProps} />
    </svg>
  );
}
