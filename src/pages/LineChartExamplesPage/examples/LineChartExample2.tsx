import { COLORS } from '../../../../lib/components/logic/constants';
import { LineSeries } from '../../../../lib/components/types';
import { LineChart } from '../../../../lib/main';

const lines: Array<LineSeries> = [
  {
    name: 'line 1',
    color: COLORS[1],
    curveType: 'monotone',
    isDashed: true,
    data: [
      { x: 'Page A', y: 400 }, // x: 0 | Page A
      { x: 'Page B', y: 300 }, // x: 10 | Page B
      { x: 'Page C', y: 300 }, // x: 20 | Page C
      { x: 'Page D', y: 200 }, // x: 30 | Page D
      { x: 'Page E', y: 280 }, // x: 40 | Page E
      { x: 'Page F', y: 180 }, // x: 50 | Page F
    ],
  },
];

export default function LineChartExample2() {
  return (
    <div className='mb-6 flex h-96 w-full max-w-xl grow flex-col items-start justify-start gap-6 border p-6'>
      <div className='text-xl font-bold'>• Example 2:</div>

      <p>A simple Line chart x & y labels</p>

      <div className='size-full max-h-md max-w-lg'>
        <LineChart
          data={lines}
          settings={{
            yAxis: { label: 'Amount in Liters' },
            xAxis: { label: 'List of Alligators' },
            grid: { show: true },
          }}
          style={{
            fontFamily: 'Hiragino Sans GB,Arial,sans-serif',
            border: '1px solid black',
          }}
        />
      </div>
    </div>
  );
}
