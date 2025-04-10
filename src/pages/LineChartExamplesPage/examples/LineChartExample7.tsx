import { COLORS } from '../../../../lib/components/logic/constants';
import { LineSeries } from '../../../../lib/components/types';
import { LineChart } from '../../../../lib/main';

const lines: Array<LineSeries> = [
  {
    name: 'line1',
    color: COLORS[4],
    curveType: 'monotone',
    isDashed: true,
    data: [
      { x: 'Page A', y: 100 },
      { x: 'Page B', y: 300 },
      { x: 'Page C', y: 151, value: { show: true }, dot: { r: 12, fill: 'red', stroke: 'black' } },
      { x: 'Page D', y: 200 },
      { x: 'Page E', y: 80 },
      { x: 'Page F', y: 180 },
    ],
  },
];

export default function LineChartExample7() {
  return (
    <div className='flex h-xl w-full max-w-xl grow flex-col items-start justify-start gap-6 border p-6'>
      <div className='text-xl font-bold'>• Example 7:</div>

      <p>A Line chart with 1 singled out point</p>

      <div className='size-full max-h-md max-w-lg'>
        <LineChart data={lines} settings={{ grid: { show: true } }} className='border border-black' />
      </div>
    </div>
  );
}
