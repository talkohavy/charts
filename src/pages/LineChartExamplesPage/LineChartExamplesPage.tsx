import LineChartExample1 from './examples/LineChartExample1';
import LineChartExample10 from './examples/LineChartExample10';
import LineChartExample11 from './examples/LineChartExample11';
import LineChartExample12 from './examples/LineChartExample12';
import LineChartExample2 from './examples/LineChartExample2';
import LineChartExample3 from './examples/LineChartExample3';
import LineChartExample4 from './examples/LineChartExample4';
import LineChartExample5 from './examples/LineChartExample5';
import LineChartExample6 from './examples/LineChartExample6';
import LineChartExample7 from './examples/LineChartExample7';
import LineChartExample8 from './examples/LineChartExample8';
import LineChartExample9 from './examples/LineChartExample9';

export default function HomePage() {
  return (
    <div className='flex size-full flex-col items-start justify-start gap-10 overflow-auto p-6'>
      <h1 className='self-center text-3xl font-bold'>LineChart Examples</h1>

      <div className='size-full space-y-10'>
        <LineChartExample1 />
        <LineChartExample2 />
        <LineChartExample3 />
        <LineChartExample4 />
        <LineChartExample5 />
        <LineChartExample6 />
        <LineChartExample7 />
        <LineChartExample8 />
        <LineChartExample9 />
        <LineChartExample10 />
        <LineChartExample11 />
        <LineChartExample12 />
      </div>
    </div>
  );
}
