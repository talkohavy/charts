import { Brush, Line, LineChart as LineChartBase } from 'recharts';
import { LineSeries } from '../../types';
import { DASHED_LINE, CLASSES as GLOBAL_CLASSES } from '../constants';

type UseLineChartBrushProps = {
  brushSettings: any;
  startIndex: React.RefObject<number | undefined>;
  endIndex: React.RefObject<number | undefined>;
  onBrushChange: (brushProps: { startIndex?: number; endIndex?: number }) => void;
  transformedDataForRecharts: Array<{ x: number | string }>;
  data: Array<LineSeries>;
};

export function useLineChartBrush(props: UseLineChartBrushProps) {
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
        <LineChartBase data={transformedDataForRecharts}>
          {data.map(({ name, curveType, isDashed }) => (
            <Line
              key={name}
              dataKey={name}
              type={curveType}
              isAnimationActive={false}
              dot={false}
              strokeDasharray={isDashed ? DASHED_LINE : undefined}
              stroke='#999'
            />
          ))}
        </LineChartBase>
      ) : undefined}
    </Brush>
  );
}
