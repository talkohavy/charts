import { Tooltip } from 'recharts';
import CustomTooltip from '../CustomTooltip';
import type { ResolvedTooltipSettings } from '../../types';

export function useTooltip(tooltipSettings: ResolvedTooltipSettings) {
  if (!tooltipSettings.show) return null;

  return (
    <Tooltip content={(tooltipProps) => <CustomTooltip {...(tooltipProps as any)} {...tooltipSettings.props} />} />
  );
}
