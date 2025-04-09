import type { LabelProps } from 'recharts';
import { CustomTickFormatterFunc } from '../../types';
import { getTextWidth } from '../utils/getTextWidth';

type CustomizedAxisTickProps = LabelProps & {
  payload: any;
  // overriding the default type of the following params, where each one can be number | string | undefined. I'm cancelling out the string type for all, and the undefined for most.
  x: number;
  y: number;
  angle: number;
  dy?: number;
  tickFormatter: CustomTickFormatterFunc;
};

export default function CustomizedAxisTick(props: CustomizedAxisTickProps) {
  const { x, y, dy, color, payload, angle, textAnchor, fontWeight, fontSize, tickFormatter } = props;

  const formattedLabel = tickFormatter(payload.value);
  const textWidth = getTextWidth({ text: formattedLabel, fontSize: fontSize as number });
  const translateXBy = x + (angle < -45 ? -10 : angle ? 0 : textWidth / 2);
  const translateYBy = dy ? y + dy : y;

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
