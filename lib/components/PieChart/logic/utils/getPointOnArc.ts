import { PIE_CHART } from '../constants';
import { getDirectionFromAngle } from './getDirectionFromAngle';

type GetPointOnArcProps = {
  radius: number;
  angleInRadians: number;
};

/**
 * @description
 * Function to calculate endpoint of arc given center, radius, and angle in degrees.
 */
function getPointOnArc(props: GetPointOnArcProps) {
  const { radius, angleInRadians } = props;

  const dir = getDirectionFromAngle(angleInRadians);

  const x = PIE_CHART.centerPoint.x + dir.xDirection * radius;
  const y = PIE_CHART.centerPoint.y + dir.yDirection * radius;

  return { x, y };
}

export { getPointOnArc };
