import { useState } from 'react';
import { BarChart, LineChart, PieChart } from '../lib/main';

export default function App() {
  const [barsLayout, setBarsLayout] = useState<'vertical' | 'horizontal'>('vertical');

  return (
    <div className='size-full overflow-auto p-6'>
      <PieChart
        data={[
          { name: 'A', value: 10 },
          { name: 'B', value: 30 },
          { name: 'C', value: 60 },
          { name: 'D', value: 60 },
          { name: 'E', value: 2 },
          // { name: 'F', value: 2 },
          // { name: 'G', value: 1 },
          // { name: 'H', value: 1 },
        ]}
        className='border border-black'
        showActiveShape={false}
      />

      <button
        type='button'
        className='h-10 w-40 rounded-md bg-blue-500 text-white'
        onClick={() => setBarsLayout((prev) => (prev === 'horizontal' ? 'vertical' : 'horizontal'))}
      >
        Switch to {barsLayout === 'horizontal' ? 'vertical' : 'horizontal'}
      </button>

      <div className='h-[270px] w-xl'>
        <LineChart
          // type='datetime'
          settings={{
            xAxis: {
              // label: 'Apples',
              tickAngle: 35,
            },
            // yAxis: {
            //   label: 'Flying cars',
            // },
            grid: {
              // show: true,
              // showHorizontalLines: true,
              // show: { horizontal: true },
              // show: { vertical: true },
              // show: true ,
              show: false,
            },
            legend: {
              show: true,
            },
            general: {
              showValues: true,
            },
            zoomSlider: {
              show: true,
            },
          }}
          lines={[
            {
              name: 'chart 1',
              curveType: 'monotoneX',
              // color: 'blue',
              // lineWidth: 2,
              // showValues: true,
              // isDashed: true,
              data: [
                { x: 0, y: 10 },
                { x: 1, y: 30 },
                { x: 2, y: 70 },
                { x: 3, y: 10, dot: { r: 12, fill: 'red', stroke: 'black' } },
                { x: 4, y: 90, showValue: true },
                { x: 5, y: 70 },
                { x: 7, y: 80 },
                { x: 8, y: 80 },
                { x: 9, y: 80 },
                { x: 10, y: 80 },
                { x: 11, y: 80 },
                { x: 12, y: 80 },
                { x: 13, y: 80 },
                { x: 14, y: 80 },
                { x: 15, y: 80 },
                { x: 16, y: 80 },
                { x: 17, y: 80 },
                { x: 18, y: 80 },
                { x: 19, y: 80 },
                { x: 20, y: 80 },
              ],
            },
            {
              name: 'chart 2',
              curveType: 'monotoneX',
              color: 'blue',
              // lineWidth: 2,
              // showValues: true,
              // isDashed: true,
              data: [
                { x: 0, y: 20 },
                { x: 1, y: 50 },
                { x: 2, y: 10 },
                { x: 3, y: 100 },
                { x: 4, y: 180, showValue: true },
                { x: 5, y: 10 },
                { x: 7, y: 20 },
                { x: 8, y: 20 },
                { x: 9, y: 30 },
                { x: 10, y: 40 },
                { x: 11, y: 50 },
                { x: 12, y: 60 },
                { x: 13, y: 10 },
                { x: 14, y: 20 },
                { x: 15, y: 20 },
                { x: 16, y: 30 },
                { x: 17, y: 70 },
                { x: 18, y: 90 },
                { x: 19, y: 80 },
                { x: 20, y: 180 },
              ],
            },
          ]}
          onDotClick={(props) => console.log('props is:', props)}
          className='border border-black'
        />
      </div>

      <div className='h-xl w-xl'>
        <BarChart
          layout={barsLayout}
          type='category'
          settings={{
            general: {
              showValues: true,
            },
            xAxis: {
              // label: 'comical',
              // tickAngle: 22,
            },
            yAxis: {
              label: 'Y Axis',
            },
            // zoomSlider: {
            //   show: true,
            // },
          }}
          bars={[
            {
              name: 'extremely_long_bar_1',
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
              name: 'extremely_long_bar_2',
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
          className='border border-black'
        />
      </div>

      <div className='h-xl w-xl'>
        <BarChart
          layout={barsLayout}
          type='category'
          settings={{
            general: {
              showValues: true,
            },
            xAxis: {
              // label: 'comical',
              // tickAngle: 22,
            },
            yAxis: {
              label: 'Y Axis',
            },
            // zoomSlider: {
            //   show: true,
            // },
          }}
          bars={[
            {
              name: 'Countries',
              data: [
                { x: 'Israel', y: 10 },
                { x: 'France', y: 20 },
                { x: 'Italy', y: 30 },
                { x: 'England', y: 40 },
                { x: 'Russia', y: 50 },
                { x: 'Bulgaria', y: 60 },
              ],
            },
          ]}
          className='border border-black'
        />
      </div>
    </div>
  );
}
