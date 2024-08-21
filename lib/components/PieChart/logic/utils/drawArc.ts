import { getPointOnArc } from './getPointOnArc';

type DrawArcProps = {
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
};

function drawArc(props: DrawArcProps) {
  const { innerRadius, outerRadius, startAngle, endAngle } = props;

  // Step 1: get the 4 points on the main arc and the secondary arc
  const innerArcStartPoint = getPointOnArc({ radius: innerRadius, angleInRadians: Math.PI + startAngle });
  const innerArcEndPoint = getPointOnArc({ radius: innerRadius, angleInRadians: Math.PI + endAngle });
  const outerArcStartPoint = getPointOnArc({ radius: outerRadius, angleInRadians: Math.PI + startAngle });
  const outerArcEndPoint = getPointOnArc({ radius: outerRadius, angleInRadians: Math.PI + endAngle });

  // Step 2: get 0 of small arc, or 1 if it's a large arc
  const largeArcFlag = endAngle - startAngle <= Math.PI ? 0 : 1;

  // Step 3: Construct the d value for the SVG's path
  // const path = `M ${PIE_CHART.centerPoint.x},${PIE_CHART.centerPoint.y}
  //               L ${arcStartPoint.x},${arcStartPoint.y}
  //               A ${radius},${radius} 0 ${largeArcFlag} 1 ${arcEndPoint.x},${arcEndPoint.y}
  //               Z`;
  const path = `
  M ${outerArcStartPoint.x} ${outerArcStartPoint.y}
  A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerArcEndPoint.x} ${outerArcEndPoint.y}
  L ${innerArcEndPoint.x} ${innerArcEndPoint.y}
  A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerArcStartPoint.x} ${innerArcStartPoint.y}
  Z`;

  return path;
}

export { drawArc };
