/**
 * @example
 * // Use them like so:
 * const x = PIE_CHART.centerPoint.x + xDirection * radius;
 * const y = PIE_CHART.centerPoint.y + yDirection * radius;
 */
export function getDirectionFromAngle(angleInRadians: number) {
  return {
    xDirection: Math.cos(angleInRadians),
    yDirection: Math.sin(angleInRadians),
  };
}
