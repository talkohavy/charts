import { Legend } from 'recharts';
import type { Payload, ResolvedLegendSettings } from '../../types';

type UseLegendProps = {
  legendSettings: ResolvedLegendSettings;
  onLegendClick: (payload: Payload) => void;
  onLegendMouseEnter: (payload: Payload) => void;
  onLegendMouseLeave: (payload: Payload) => void;
};

export function useLegend(props: UseLegendProps) {
  const { legendSettings, onLegendClick, onLegendMouseEnter, onLegendMouseLeave } = props;

  if (!legendSettings.show) return null;

  return (
    <Legend
      {...legendSettings.props}
      onClick={onLegendClick}
      onMouseEnter={onLegendMouseEnter}
      onMouseLeave={onLegendMouseLeave}
    />
  );
}
