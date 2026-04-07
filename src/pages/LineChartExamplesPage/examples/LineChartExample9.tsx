import { LineChart, COLORS, ValuePositions, type LineSeries } from '../../../../lib/main';
import ExampleCard from '../../../components/ExampleCard';

const lines: Array<LineSeries> = [
  {
    name: 'line1',
    color: COLORS[6],
    curveType: 'monotone',
    isDashed: true,
    showValues: true,
    data: [
      { x: 'Page A', y: 100 },
      { x: 'Page B', y: 300 },
      {
        x: 'Page C',
        y: 150,
        value: { show: false, customValue: 'a2', color: 'white' },
        dot: { r: 8, position: ValuePositions.Center },
      },
      { x: 'Page D', y: 200 },
      { x: 'Page E', y: 80 },
      { x: 'Page F', y: 180 },
    ],
  },
];

export default function LineChartExample9() {
  return (
    <ExampleCard>
      <div className='text-xl font-bold'>• Example 9:</div>

      <p>LineChart has values above dots</p>

      <div className='size-full max-h-md max-w-lg'>
        <LineChart data={lines} settings={{ grid: { show: true } }} className='border border-black' />
      </div>
    </ExampleCard>
  );
}
