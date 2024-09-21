import { PieChart } from '../../../lib/main';
import Title from '../Title';

export default function PieChartExample() {
  return (
    <div>
      <Title title='Pie Chart Example' />

      <PieChart
        data={[
          { name: 'A', value: 10 },
          { name: 'B', value: 30 },
          { name: 'C', value: 60 },
          { name: 'D', value: 60 },
          { name: 'E', value: 2 },
          { name: 'F', value: 2 },
          { name: 'G', value: 1 },
          { name: 'H', value: 1 },
          { name: 'I', value: 20 },
          { name: 'J', value: 20 },
          { name: 'K', value: 20 },
          { name: 'L', value: 20 },
          { name: 'M', value: 20 },
          { name: 'N', value: 20 },
          { name: 'O', value: 20 },
          { name: 'P', value: 20 },
        ]}
        className='border border-black max-w-2xl'
        showActiveShape={false}
      />
    </div>
  );
}
