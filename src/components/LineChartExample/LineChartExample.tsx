import { LineChart } from '../../../lib/main';

export default function LineChartExample() {
  return (
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
  );
}
