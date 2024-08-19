import clsx from 'clsx';
import { PIE_CHART } from '../constants';
import styles from './PieTooltip.module.scss';

const tooltipWidth = 300;
const tooltipHeight = 150;

type TooltipProps = {
  name: string;
  value: number | string;
  color: string;
  radius: number;
  percentFormatted: number;
  middleDirection: {
    xDirection: number;
    yDirection: number;
  };
};

export default function PieTooltip(props: TooltipProps) {
  const { name, value, color, percentFormatted, radius, middleDirection } = props;

  const xPosition = PIE_CHART.centerPoint.x + radius * 0.5 * middleDirection.xDirection;
  const yPosition = PIE_CHART.centerPoint.y + radius * 0.5 * middleDirection.yDirection;

  return (
    <>
      <rect
        x={xPosition}
        y={yPosition}
        width={tooltipWidth}
        height={tooltipHeight}
        fill='white'
        stroke='black'
        strokeWidth={2}
        rx={10}
        className={clsx('pie-chart-tooltip', styles.pieChartTooltip)}
        style={{ pointerEvents: 'none' }}
      />

      <text
        x={xPosition + 20}
        y={yPosition + 40}
        fill={color}
        fontSize={32}
        fontWeight='bold'
        style={{ pointerEvents: 'none' }}
      >
        Name: {name}
      </text>

      <text
        x={xPosition + 20}
        y={yPosition + 95}
        fill='black'
        fontSize={24}
        fontWeight='thin'
        style={{ pointerEvents: 'none' }}
      >
        Value: {value}
      </text>

      <text
        x={xPosition + 20}
        y={yPosition + 130}
        fill='black'
        fontSize={24}
        fontWeight='thin'
        style={{ pointerEvents: 'none' }}
      >
        Percent: {percentFormatted}%
      </text>
    </>
  );
}
