import { PieSlice } from '../../../../lib/components/PieChart/types';
import { PieChart } from '../../../../lib/main';

const data: Array<PieSlice> = [
  { name: 'Group A', value: 20 },
  { name: 'Group B', value: 0.8 },
  { name: 'Group C', value: 4 },
  { name: 'Group D', value: 1 },
  { name: 'Group E', value: 1 },
  { name: 'Group F', value: 0.3 },
  { name: 'Group G', value: 0.1 },
];

export default function PieChartExample2() {
  return (
    <div className='flex w-full max-w-xl grow flex-col items-start justify-start gap-6 border p-6'>
      <div className='text-xl font-bold'>• Example 2:</div>

      <p>How it looks when slices are small:</p>

      <div className='size-full max-h-lg max-w-lg'>
        <PieChart data={data} />
      </div>
    </div>
  );
}
