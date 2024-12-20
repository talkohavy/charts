import { COLORS } from '../../../../lib/components/logic/constants';
import { LineSeries } from '../../../../lib/components/types';
import { LineChart } from '../../../../lib/main';

const lines: Array<LineSeries> = [
  {
    name: 'line1',
    color: COLORS[0],
    curveType: 'monotone',
    isDashed: true,
    data: [
      { x: 'Page A', y: 100 }, // x: 0 | Page A
      { x: 'Page B', y: 300 }, // x: 10 | Page B
      { x: 'Page C', y: 150 }, // x: 20 | Page C
      { x: 'Page D', y: 200 }, // x: 30 | Page D
      { x: 'Page E', y: 80 }, // x: 40 | Page E
      { x: 'Page F', y: 180 }, // x: 50 | Page F
    ],
  },
];

/** @type {Array<ReferenceLine>} */
const referenceLines = [
  {
    y: 220,
    label: 'Max',
    lineWidth: 2,
    lineColor: 'black',
  },
  {
    x: 'Page B', // 'Page B' | 40
    label: 'Vertical',
    lineColor: 'blue',
    isDashed: true,
  },
];

export default function LineChartExample6() {
  return (
    <div className='flex h-xl w-full max-w-xl grow flex-col items-start justify-start gap-6 border p-6'>
      <div className='text-xl font-bold'>• Example 6:</div>

      <p>A LineChart with reference lines</p>

      <div className='size-full max-h-md max-w-lg'>
        <LineChart
          data={lines}
          referenceLines={referenceLines}
          settings={{ grid: { show: true } }}
          style={{
            fontFamily: 'Hiragino Sans GB,Arial,sans-serif',
            border: '1px solid black',
          }}
        />
      </div>
    </div>
  );
}
