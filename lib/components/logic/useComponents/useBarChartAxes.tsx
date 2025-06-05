import { XAxis, YAxis } from 'recharts';
import CustomizedAxisTick from '../CustomAxisTick';

type UseBarChartAxesProps = {
  xAxisSettings: any;
  yAxisSettings: any;
  barsLayout?: 'horizontal' | 'vertical';
};

export function useBarChartAxes(props: UseBarChartAxesProps) {
  const { xAxisSettings, yAxisSettings, barsLayout } = props;

  return (
    <>
      <XAxis
        {...xAxisSettings.props}
        {...(barsLayout === 'vertical' ? xAxisSettings.verticalProps : xAxisSettings.horizontalProps)}
        label={{
          ...xAxisSettings.props.label,
          value: barsLayout === 'vertical' ? xAxisSettings.props.label.value : yAxisSettings.props.label.value,
        }}
        tick={(tickProps) => <CustomizedAxisTick {...tickProps} />}
      />

      <YAxis
        {...yAxisSettings.props}
        {...(barsLayout === 'vertical' ? yAxisSettings.verticalProps : yAxisSettings.horizontalProps)}
        label={{
          ...yAxisSettings.props.label,
          value: barsLayout === 'vertical' ? yAxisSettings.props.label.value : xAxisSettings.props.label.value,
        }}
      />
    </>
  );
}
