import { CartesianGrid } from 'recharts';

type UseGridProps = {
  gridSettings: any;
};

export function useGrid(props: UseGridProps) {
  const { gridSettings } = props;

  if (!gridSettings.show) return null;

  return <CartesianGrid {...gridSettings.props} />;
}
