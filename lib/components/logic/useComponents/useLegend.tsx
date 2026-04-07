import type { Payload } from 'recharts/types/component/DefaultLegendContent';
import type { DataKey } from 'recharts/types/util/types';
import { Legend } from 'recharts';
import type { ResolvedLegendSettings } from '../../types';

type UseLegendProps = {
  legendSettings: ResolvedLegendSettings;
  onLegendClick: (payload: Payload & { dataKey?: DataKey<any> }) => void;
  onLegendMouseEnter: (payload: Payload & { dataKey?: DataKey<any> }) => void;
  onLegendMouseLeave: (payload: Payload & { dataKey?: DataKey<any> }) => void;
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
