import { LineChart, COLORS, type LineSeries } from '../../../../lib/main';
import ExampleCard from '../../../components/ExampleCard';

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
    <ExampleCard>
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
          className='border border-black'
        />
      </div>
    </ExampleCard>
  );
}
