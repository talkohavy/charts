import { Bar, BarChart as BarChartBase, Brush } from 'recharts';
import { BarSeries } from '../../types';
import { CLASSES as GLOBAL_CLASSES } from '../constants';

type UseBarChartBrushProps = {
  brushSettings: any;
  startIndex: React.RefObject<number | undefined>;
  endIndex: React.RefObject<number | undefined>;
  onBrushChange: (brushProps: { startIndex?: number; endIndex?: number }) => void;
  transformedDataForRecharts: Array<{ x: number | string }>;
  data: Array<BarSeries>;
};

export function useBarChartBrush(props: UseBarChartBrushProps) {
  const { brushSettings, startIndex, endIndex, onBrushChange, transformedDataForRecharts, data } = props;

  if (!brushSettings.show) return null;

  return (
    <Brush
      {...brushSettings.props}
      startIndex={startIndex.current} // <--- The default start index of brush. If the option is not set, the start index will be 0.
      endIndex={endIndex.current} // <---The default end index of brush. If the option is not set, the end index will be calculated by the length of data.
      onChange={onBrushChange}
      className={GLOBAL_CLASSES.brush}
    >
      {brushSettings.showPreviewInSlider ? (
        <BarChartBase data={transformedDataForRecharts}>
          {data.map(({ name }) => (
            <Bar key={name} dataKey={name} isAnimationActive={false} fill='#999' />
          ))}
        </BarChartBase>
      ) : undefined}
    </Brush>
  );
}
