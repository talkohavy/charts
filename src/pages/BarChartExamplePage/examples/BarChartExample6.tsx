import { BarChart, type BarSeries } from '../../../../lib/main';
import ExampleCard from '../../../components/ExampleCard';

const bars: Array<BarSeries> = [
  {
    name: 'Health Care',
    data: [
      { x: 'Israel', y: 990 },
      { x: 'England', y: 705 },
      { x: 'Finland', y: 314 },
      { x: 'France', y: 567 },
      { x: 'Netherlands', y: 202 },
      { x: 'USA', y: 865 },
      { x: 'Canada', y: 586 },
      { x: 'Russia', y: 165 },
      { x: 'China', y: 333 },
      { x: 'Arab Saudi', y: 13 },
      { x: 'Austria', y: 1003 },
    ],
  },
];

export default function BarChartExample6() {
  return (
    <ExampleCard>
      <div className='text-xl font-bold'>• Example 6:</div>

      <p>XAxis with angled ticks since values are with different lengths, and some are really long.</p>

      <div className='size-full max-h-md max-w-lg'>
        <BarChart
          data={bars}
          settings={{
            xAxis: { label: 'Countries', tickAngle: 46 },
            yAxis: { label: 'Amount in km' },
            legend: { show: true },
          }}
          style={{ fontFamily: 'Hiragino Sans GB,Arial,sans-serif', border: '1px solid black' }}
        />
      </div>
    </ExampleCard>
  );
}
