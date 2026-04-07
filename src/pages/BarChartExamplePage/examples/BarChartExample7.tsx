import { BarChart, type BarSeries } from '../../../../lib/main';
import ExampleCard from '../../../components/ExampleCard';

const bars: Array<BarSeries> = [
  {
    name: 'Cars',
    data: [
      { x: 'Page A', y: 1000000000 },
      { x: 'Page B', y: 800200026.5 },
      { x: 'Page C', y: 700110028 },
      { x: 'Page D', y: 900032 },
      { x: 'Page E', y: 117013026 },
      { x: 'Page F', y: 688658035 },
    ],
  },
];

export default function BarChartExample7() {
  return (
    <ExampleCard>
      <div className='text-xl font-bold'>• Example 7:</div>

      <p>Big numbers are formatted with K, M & B suffixes</p>

      <div className='size-full max-h-md max-w-lg'>
        <BarChart
          data={bars}
          settings={{ legend: { show: true } }}
          style={{ fontFamily: 'Hiragino Sans GB,Arial,sans-serif', border: '1px solid black' }}
        />
      </div>
    </ExampleCard>
  );
}
