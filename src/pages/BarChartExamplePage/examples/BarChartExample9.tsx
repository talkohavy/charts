import { BarChart, type BarSeries } from '../../../../lib/main';
import ExampleCard from '../../../components/ExampleCard';

const bars: Array<BarSeries> = [
  {
    name: 'Cars',
    unit: 'cm',
    data: [
      { x: 'Page A', y: 9900 },
      { x: 'Page B', y: 705 },
      { x: 'Page C', y: 314 },
      { x: 'Page D', y: 567 },
      { x: 'Page E', y: 202 },
      { x: 'Page F', y: 865 },
    ],
  },
];

export default function BarChartExample9() {
  return (
    <ExampleCard>
      <div className='text-xl font-bold'>• Example 9:</div>

      <p>Tooltip values show unit suffix.</p>

      <div className='size-full max-h-md max-w-lg'>
        <BarChart
          data={bars}
          settings={{ legend: { show: true } }}
          // style={{ fontFamily: 'Hiragino Sans GB,Arial,sans-serif', border: '1px solid black' }}
        />
      </div>
    </ExampleCard>
  );
}
