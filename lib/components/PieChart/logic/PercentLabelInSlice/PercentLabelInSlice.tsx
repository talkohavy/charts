import { PIE_CHART } from '../constants';

type PercentLabelInSliceProps = {
  radius: number;
  percentFormatted: number;
  middleDirection: { xDirection: number; yDirection: number };
  labelDistanceFromCenter: number;
  fontSize: number;
};

export default function PercentLabelInSlice(props: PercentLabelInSliceProps) {
  const { radius, percentFormatted, middleDirection, labelDistanceFromCenter, fontSize } = props;

  return (
    <text
      x={PIE_CHART.centerPoint.x + labelDistanceFromCenter * radius * middleDirection.xDirection}
      y={PIE_CHART.centerPoint.y + labelDistanceFromCenter * radius * middleDirection.yDirection}
      textAnchor='middle'
      style={{ fontSize, fill: 'white', userSelect: 'none', alignmentBaseline: 'central' }}
    >
      {percentFormatted}%
    </text>
  );
}
