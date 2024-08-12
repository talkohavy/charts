import { useState } from 'react';
import { BarChart } from '../lib/main';

export default function App() {
  const [barsLayout, setBarsLayout] = useState<'vertical' | 'horizontal'>('vertical');

  console.log('current barsLayout is:', barsLayout);

  return (
    <div className='size-full overflow-auto p-6'>
      <button
        type='button'
        className='h-10 w-40 rounded-md bg-blue-500 text-white'
        onClick={() => setBarsLayout((prev) => (prev === 'horizontal' ? 'vertical' : 'horizontal'))}
      >
        Switch to {barsLayout === 'horizontal' ? 'vertical' : 'horizontal'}
      </button>

      <div className='h-xl w-xl'>
        <BarChart
          // layout='horizontal'
          layout={barsLayout}
          type='number'
          settings={{
            general: {
              showValues: true,
            },
            xAxis: {
              //   label: 'comical',
            },
            yAxis: {
              //   label: 'Y Axis',
            },
          }}
          bars={[
            {
              name: 'bar_1',
              stackId: 'aaa',
              data: [
                { x: 1, y: 10 },
                { x: 2, y: 20 },
                { x: 3, y: 30 },
                { x: 4, y: 40 },
                { x: 5, y: 50 },
                { x: 6, y: 60 },
                { x: 7, y: 70 },
                { x: 8, y: 80 },
                { x: 9, y: 90 },
                // { x: 10, y: 100 },
                // { x: 'A', y: 10 },
                // { x: 'B', y: 20 },
                // { x: 'C', y: 30 },
                // { x: 'D', y: 40 },
                // { x: 'E', y: 50 },
                // { x: 'F', y: 60 },
                // { x: 'G', y: 70 },
                // { x: 'H', y: 80 },
                // { x: 'I', y: 90 },
                // { x: 'J', y: 100 },
              ],
            },
            // {
            //   name: 'Bar 2',
            //   color: 'red',
            //   stackId: 'aaa',
            //   data: [
            //     { x: 1, y: 90 },
            //     { x: 2, y: 80 },
            //     { x: 3, y: 70 },
            //     { x: 4, y: 60 },
            //     { x: 5, y: 50 },
            //     { x: 6, y: 40 },
            //     { x: 7, y: 30 },
            //     { x: 8, y: 20 },
            //     { x: 9, y: 10 },
            //     // { x: 'A', y: 100 },
            //     // { x: 'B', y: 90 },
            //     // { x: 'C', y: 80 },
            //     // { x: 'D', y: 70 },
            //     // { x: 'E', y: 60 },
            //     // { x: 'F', y: 50 },
            //     // { x: 'G', y: 40 },
            //     // { x: 'H', y: 30 },
            //     // { x: 'I', y: 20 },
            //     // { x: 'J', y: 10 },
            //   ],
            // },
          ]}
        />
      </div>

      <div className='h-xs w-xl'>
        {/* <LineChart
          settings={{
            xAxis: {
              tickAngle: 45,
            },
          }}
          type='datetime'
          lines={[
            {
              name: 'Line 1',
              curveType: 'monotoneX',
              color: 'blue',
              data: [
                { x: 100000000000, y: 10 },
                { x: 200000000000, y: 30 },
                { x: 300000000000, y: 20 },
                { x: 400000000000, y: 40 },
                { x: 500000000000, y: 50 },
                { x: 600000000000, y: 90 },
                { x: 700000000000, y: 70 },
                { x: 800000000000, y: 80 },
                { x: 900000000000, y: 60 },
                { x: 2000000000000, y: 27 },
              ],
            },
          ]}
        /> */}
      </div>
    </div>
  );
}
