import BarChartExample from '../../components/BarChartExample';
import LineChartExample from '../../components/LineChartExample';
import PieChartExample from '../../components/PieChartExample';

export default function BarChartExamplePage() {
  return (
    <div className='size-full overflow-auto p-6'>
      <PieChartExample />

      <LineChartExample />

      <BarChartExample />
    </div>
  );
}
