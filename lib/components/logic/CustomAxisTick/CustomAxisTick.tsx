import { getTextWidth } from '../utils/getTextWidth';
import type { LabelProps } from 'recharts';

type CustomizedAxisTickProps = LabelProps & {
  payload: any;
  x: number | string;
  y: number | string;
  angle: number;
  dy?: number;
  tickFormatter?: (value: any, ...args: any[]) => string;
};

export default function CustomizedAxisTick(props: CustomizedAxisTickProps) {
  const { x, y, dy, color, payload, angle, textAnchor, fontWeight, fontSize, tickFormatter } = props;

  const numX = Number(x);
  const numY = Number(y);
  const formattedLabel = tickFormatter ? tickFormatter(payload.value) : String(payload.value);
  const textWidth = getTextWidth({ text: formattedLabel, fontSize: fontSize as number });
  const translateXBy = numX + (angle < -45 ? -10 : angle ? 0 : textWidth / 2);
  const translateYBy = dy ? numY + dy : numY;

  return (
    <g transform={`translate(${translateXBy},${translateYBy})`}>
      <title>{payload.value}</title>
      <text
        x={0}
        y={0}
        dy={16}
        stroke='none'
        textAnchor={textAnchor}
        fill={color}
        transform={angle ? `rotate(${angle})` : undefined}
        style={{ fontSize, fontWeight }}
      >
        {formattedLabel}
      </text>
    </g>
  );
}
