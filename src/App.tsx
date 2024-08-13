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
          layout={barsLayout}
          type='category'
          settings={{
            general: {
              showValues: true,
            },
            xAxis: {
              label: 'comical',
              tickAngle: 45,
            },
            yAxis: {
              label: 'Y Axis',
            },
            zoomSlider: {
              show: true,
            },
          }}
          bars={[
            {
              name: 'bar_1',
              stackId: 'aaa',
              data: [
                // { x: 1, y: 10 },
                // { x: 2, y: 20 },
                // { x: 3, y: 30 },
                // { x: 4, y: 40 },
                // { x: 5, y: 50 },
                // { x: 6, y: 60 },
                // { x: 7, y: 70 },
                // { x: 8, y: 80 },
                // { x: 9, y: 90 },
                // { x: 10, y: 100 },
                { x: 'Aaa', y: 10 },
                { x: 'Baa', y: 20 },
                { x: 'Caa', y: 30 },
                { x: 'Daa', y: 40 },
                { x: 'Eaa', y: 50 },
                { x: 'Faa', y: 60 },
                { x: 'Gaa', y: 70 },
                { x: 'Haa', y: 80 },
                { x: 'Iaa', y: 90 },
                { x: 'Jaa', y: 100 },
              ],
            },
            {
              name: 'Bar 2',
              color: 'red',
              stackId: 'aaa',
              data: [
                // { x: 1, y: 90 },
                // { x: 2, y: 80 },
                // { x: 3, y: 70 },
                // { x: 4, y: 60 },
                // { x: 5, y: 50 },
                // { x: 6, y: 40 },
                // { x: 7, y: 30 },
                // { x: 8, y: 20 },
                // { x: 9, y: 10 },
                { x: 'Aaa', y: 100 },
                { x: 'Baa', y: 90 },
                { x: 'Caa', y: 80 },
                { x: 'Daa', y: 70 },
                { x: 'Eaa', y: 60 },
                { x: 'Faa', y: 50 },
                { x: 'Gaa', y: 40 },
                { x: 'Haa', y: 30 },
                { x: 'Iaa', y: 20 },
                { x: 'Jaa', y: 10 },
              ],
            },
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
