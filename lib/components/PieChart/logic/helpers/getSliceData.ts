import { PIE_CHART } from '../constants';
import { drawArc } from './drawArc';
import { getDirectionFromAngle } from './getDirectionFromAngle';
import { getPointOnArc } from './getPointOnArc';

type GetSliceDataProps = {
  startAngle: number;
  endAngle: number;
};

function getSliceData(props: GetSliceDataProps) {
  const { startAngle, endAngle } = props;

  const radius = PIE_CHART.outerRadius;

  // Step 1: get the 2 points on the main arc
  const arcStartPoint = getPointOnArc({ radius, angleInRadians: Math.PI + startAngle });
  const arcEndPoint = getPointOnArc({ radius, angleInRadians: Math.PI + endAngle });

  // Step 2: get direction of middle slice
  const middleDirection = getDirectionFromAngle(Math.PI + (startAngle + endAngle) / 2);

  // Step 3: get 0 of small arc, or 1 if it's a large arc
  const largeArcFlag = endAngle - startAngle <= Math.PI ? 0 : 1;

  // Step 4: Construct the d value for the SVG's path
  const path = `M ${PIE_CHART.centerPoint.x},${PIE_CHART.centerPoint.y} 
                  L ${arcStartPoint.x},${arcStartPoint.y} 
                  A ${radius},${radius} 0 ${largeArcFlag} 1 ${arcEndPoint.x},${arcEndPoint.y} 
                  Z`;

  const externalArcPath = drawArc({
    startAngle: startAngle + 0.04,
    endAngle: endAngle - 0.04,
    innerRadius: PIE_CHART.outerRadius + 6,
    outerRadius: PIE_CHART.outerRadius + 12,
  });

  return { path, externalArcPath, middleDirection, arcStartPoint, arcEndPoint };
}

export { getSliceData };
