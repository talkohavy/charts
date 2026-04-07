import { CartesianGrid } from 'recharts';
import type { ResolvedGridSettings } from '../../types';

export function useGrid(gridSettings: ResolvedGridSettings) {
  if (!gridSettings.show) return null;

  return <CartesianGrid {...gridSettings.props} />;
}
