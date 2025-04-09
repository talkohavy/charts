import { LineSeries } from '../../../../lib/components/types';
import { LineChart } from '../../../../lib/main';

const lines: Array<LineSeries> = [
  {
    name: 'line1',
    color: 'black',
    curveType: 'monotone',
    isDashed: true,
    data: [
      { x: 'Page A', y: 10 }, // x: 0 | Page A
      { x: 'Page B', y: 2 }, // x: 10 | Page B
      { x: 'Page C', y: 6 }, // x: 20 | Page C
      { x: 'Page D', y: 8 }, // x: 30 | Page D
      { x: 'Page E', y: 14 }, // x: 40 | Page E
      { x: 'Page is', y: 7 }, // x: 50 | Page F
    ],
  },
];

export default function LineChartExample1() {
  return (
    <div className='flex h-96 w-full max-w-xl grow flex-col items-start justify-start gap-6 border p-6'>
      <div className='text-xl font-bold'>• Example 1:</div>

      <p>A simple Line chart with xAxis of type 'category'</p>

      <div className='size-full max-h-md max-w-lg'>
        <LineChart
          settings={{ grid: { show: true }, yAxis: { label: 'hello' } }}
          data={lines}
          className='border border-black'
        />
      </div>
    </div>
  );
}
