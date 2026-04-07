import { LineChart, COLORS, type LineSeries } from '../../../../lib/main';
import ExampleCard from '../../../components/ExampleCard';

const lines: Array<LineSeries> = [
  {
    name: 'line1',
    color: COLORS[5],
    curveType: 'monotone',
    isDashed: true,
    data: [
      { x: 'Page A', y: 100 },
      { x: 'Page B', y: 300 },
      { x: 'Page C', y: 150 },
      { x: 'Page D', y: 200 },
      { x: 'Page E', y: 80 },
      { x: 'Page F', y: 180 },
    ],
  },
];

export default function LineChartExample8() {
  return (
    <ExampleCard>
      <div className='text-xl font-bold'>• Example 8:</div>

      <p>A Line chart as a Card</p>

      <div className='size-full max-h-md max-w-lg'>
        <LineChart data={lines} settings={{ grid: { show: true } }} className='rounded-lg border p-4 font-thin' />
      </div>
    </ExampleCard>
  );
}
