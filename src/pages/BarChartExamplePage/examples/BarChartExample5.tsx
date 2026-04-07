import { BarChart, type BarSeries } from '../../../../lib/main';
import ExampleCard from '../../../components/ExampleCard';

const bars: Array<BarSeries> = [
  {
    name: 'Cars',
    data: [
      { x: 'Page A', y: 14 },
      { x: 'Page B', y: 26.5 },
      { x: 'Page C', y: 28 },
      { x: 'Page D', y: 32 },
      { x: 'Page E', y: 26 },
      { x: 'Page F', y: 35 },
    ],
  },
];

export default function BarChartExample5() {
  return (
    <ExampleCard>
      <div className='text-xl font-bold'>• Example 5:</div>

      <p>A BarChart wrapped in a Box</p>

      <div className='size-full max-h-md max-w-lg'>
        <BarChart
          data={bars}
          settings={{ legend: { show: true } }}
          className='rounded-lg border p-2'
          style={{ fontFamily: 'Hiragino Sans GB,Arial,sans-serif' }}
        />
      </div>
    </ExampleCard>
  );
}
