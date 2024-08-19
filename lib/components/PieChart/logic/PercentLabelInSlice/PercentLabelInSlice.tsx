import { PIE_CHART } from '../constants';

type PercentLabelInSliceProps = {
  percentFormatted: number;
  middleDirection: { xDirection: number; yDirection: number };
  labelDistanceFromCenter: number;
  fontSize: number;
};

export default function PercentLabelInSlice(props: PercentLabelInSliceProps) {
  const { percentFormatted, middleDirection, labelDistanceFromCenter, fontSize } = props;

  return (
    <text
      x={PIE_CHART.centerPoint.x + labelDistanceFromCenter * PIE_CHART.outerRadius * middleDirection.xDirection}
      y={PIE_CHART.centerPoint.y + labelDistanceFromCenter * PIE_CHART.outerRadius * middleDirection.yDirection}
      textAnchor='middle'
      style={{ fontSize, fill: 'white', userSelect: 'none', alignmentBaseline: 'central' }}
    >
      {percentFormatted}%
    </text>
  );
}
