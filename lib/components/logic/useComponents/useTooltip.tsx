import { Tooltip } from 'recharts';
import CustomTooltip from '../CustomTooltip';

type UseTooltipProps = {
  tooltipSettings: any;
};

export function useTooltip(props: UseTooltipProps) {
  const { tooltipSettings } = props;

  if (!tooltipSettings.show) return null;

  return <Tooltip content={(tooltipProps) => <CustomTooltip {...tooltipProps} {...tooltipSettings.props} />} />;
}
