import { COLORS } from '../../../../lib/components/logic/constants';
import { LineSeries } from '../../../../lib/components/types';
import { LineChart } from '../../../../lib/main';

const lines: Array<LineSeries> = [
  {
    name: 'line1',
    color: COLORS[3],
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

export default function LineChartExample4() {
  return (
    <div className='flex h-xl w-full max-w-xl grow flex-col items-start justify-start gap-6 border p-6'>
      <div className='text-xl font-bold'>• Example 4:</div>

      <p>A Line chart with a legend</p>

      <div className='size-full max-h-md max-w-lg'>
        <LineChart
          lines={lines}
          settings={{ grid: { show: true }, legend: { show: true } }}
          style={{
            fontFamily: 'Hiragino Sans GB,Arial,sans-serif',
            border: '1px solid black',
          }}
        />
      </div>
    </div>
  );
}
