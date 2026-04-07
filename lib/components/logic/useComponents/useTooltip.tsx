import { Tooltip } from 'recharts';
import type { ResolvedTooltipSettings } from '../../types/resolvedBarChartSettings';
import CustomTooltip from '../CustomTooltip';

export function useTooltip(tooltipSettings: ResolvedTooltipSettings) {
  if (!tooltipSettings.show) return null;

  return <Tooltip content={(tooltipProps) => <CustomTooltip {...tooltipProps} {...tooltipSettings.props} />} />;
}
