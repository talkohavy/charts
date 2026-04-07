import { XAxis, YAxis } from 'recharts';
import type { ResolvedXAxisSettings, ResolvedYAxisSettings } from '../../types';
import CustomizedAxisTick from '../CustomAxisTick';

type UseLineChartAxesProps = {
  xAxisSettings: ResolvedXAxisSettings;
  yAxisSettings: ResolvedYAxisSettings;
  xAxisType: 'number' | 'category' | 'datetime';
};

export function useLineChartAxes(props: UseLineChartAxesProps) {
  const { xAxisSettings, yAxisSettings, xAxisType } = props;

  const xAxis = (
    <XAxis
      dataKey='x'
      {...xAxisSettings.props}
      type={xAxisType === 'datetime' ? 'number' : xAxisType} // <--- 'category' v.s. 'number'. What is the difference? Isn't it the same eventually? Well no, because consider a case where gaps exist. For instance, 0 1 2 4 5. A 'category' would place an even distance between 2 & 4, when in fact it's a double gap!
      scale={xAxisType === 'datetime' ? 'time' : 'auto'}
      tick={(tickProps) => <CustomizedAxisTick {...tickProps} />}
    />
  );

  const yAxis = (
    <YAxis
      {...yAxisSettings.props}
      type={'number' as 'number' | 'category' | undefined} // <--- defaults to 'number'. 'category' or 'number'.
    />
  );

  return { xAxis, yAxis };
}
