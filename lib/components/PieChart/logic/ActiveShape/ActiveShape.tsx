import { getTextWidth } from '../../../logic/utils';
import { formatLabel } from '../../../logic/utils/formatters';
import { PIE_CHART } from '../constants';

const FIRST_LINE_LENGTH = 1.16;
const SECOND_LINE_LENGTH = 26;

type ActiveShapeProps = {
  radius: number;
  showFullShape: boolean;
  value: number;
  color: string;
  externalArcPath: string;
  percent: number;
  middleDirection: { xDirection: number; yDirection: number };
};

export default function ActiveShape(props: ActiveShapeProps) {
  const { radius, showFullShape, value, color, externalArcPath, percent, middleDirection } = props;

  const isRightMultiplier = middleDirection.xDirection >= 0 ? 1 : -1;
  const xDot = PIE_CHART.centerPoint.x + radius * 1.08 * middleDirection.xDirection;
  const yDot = PIE_CHART.centerPoint.y + radius * 1.08 * middleDirection.yDirection;
  const xMiddleBreak = PIE_CHART.centerPoint.x + radius * FIRST_LINE_LENGTH * middleDirection.xDirection;
  const yMiddleBreak = PIE_CHART.centerPoint.y + radius * FIRST_LINE_LENGTH * middleDirection.yDirection;
  const xFinal = xMiddleBreak + isRightMultiplier * SECOND_LINE_LENGTH;
  const yFinal = yMiddleBreak;

  const valueLabel = `Value: ${formatLabel(value)}`;
  const percentLabel = `(${(percent * 100).toFixed(2)}%)`;
  const valueLabelWidth = getTextWidth({ text: valueLabel, fontSize: 30 });
  const percentLabelWidth = getTextWidth({ text: percentLabel, fontSize: 30 });

  return (
    <g>
      {/* Part 1: The arc  */}
      <path d={externalArcPath} stroke='none' fill={color} />

      {showFullShape && (
        <>
          {/* Part 2: The • dot  */}
          <circle cx={xDot} cy={yDot} r={5} fill='black' stroke='none' />

          {/* Part 3: crooked pointy line  */}
          <path
            d={`M${xDot},${yDot}L${xMiddleBreak},${yMiddleBreak}L${xFinal},${yFinal}`}
            stroke='black'
            strokeWidth={2}
            fill='none'
          />

          {/* Part 5: The absolute value */}
          <text
            x={xFinal + isRightMultiplier * (valueLabelWidth / 2)}
            y={yFinal}
            textAnchor='middle'
            fill='#333'
            style={{ fontSize: 22 }}
          >
            {valueLabel}
          </text>

          {/* Part 6: The % ratio value */}
          <text
            x={xFinal + isRightMultiplier * (percentLabelWidth / 2)}
            y={yFinal}
            dy={24}
            textAnchor='middle'
            fill='#999'
            style={{ fontSize: 16 }}
          >
            {percentLabel}
          </text>
        </>
      )}
    </g>
  );
}
