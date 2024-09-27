import { PieChart } from '../../../../lib/main';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

export default function PieChartExample1() {
  return (
    <div className='flex w-full max-w-xl grow flex-col items-start justify-start gap-6 overflow-auto border p-6'>
      <div className='text-xl font-bold'>• Example 1:</div>

      <p>Basic PieChart:</p>

      <PieChart data={data} />
    </div>
  );
}
