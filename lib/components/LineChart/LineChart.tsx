import clsx from 'clsx';
import {
  Brush,
  CartesianGrid,
  Legend,
  Line,
  LineChart as LineChartBase,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { BaseChartProps, LineChartSettings, LineSeries } from '../types';
import { DASHED_LINE, CLASSES as GLOBAL_CLASSES } from '../logic/constants';
import CustomizedAxisTick from '../logic/CustomAxisTick';
import CustomTooltip from '../logic/CustomTooltip';
import ActiveDot, { ActiveDotProps } from './logic/ActiveDot';
import { CLASSES } from './logic/constants';
import NonActiveDot from './logic/NonActiveDot';
import { useLineChartLogic } from './logic/useLineChartLogic';
import '../../recharts.css';

export type LineChartProps = BaseChartProps & {
  settings?: LineChartSettings;
  data: Array<LineSeries>;
  onDotClick?: (data: ActiveDotProps, e: any) => void;
};

export default function LineChart(props: LineChartProps) {
  const { data, onDotClick, referenceLines, className } = props;

  const {
    xAxisType,
    transformedDataForRecharts,
    chartSettings,
    startIndex,
    endIndex,
    isLineHovered,
    isLegendHovered,
    visibleLines,
    onLegendMouseEnter,
    onLegendMouseLeave,
    onLegendClick,
    onBrushChange,
  } = useLineChartLogic(props);

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <LineChartBase
        {...chartSettings.lineChartBase.props}
        data={transformedDataForRecharts}
        className={clsx(CLASSES.lineChart, className)}
      >
        {/* MUST come before XAxis & YAxis! It needs to be painted behind them */}
        {chartSettings.grid.show && <CartesianGrid {...chartSettings.grid.props} />}

        <XAxis
          dataKey='x'
          {...chartSettings.xAxis.props}
          type={xAxisType === 'datetime' ? 'number' : xAxisType} // <--- 'category' v.s. 'number'. What is the difference? Isn't it the same eventually? Well no, because consider a case where gaps exist. For instance, 0 1 2 4 5. A 'category' would place an even distance between 2 & 4, when in fact it's a double gap!
          scale={xAxisType === 'datetime' ? 'time' : 'auto'}
          tick={(tickProps) => <CustomizedAxisTick {...tickProps} />}
        />

        <YAxis
          {...chartSettings.yAxis.props}
          type={'number' as 'number' | 'category' | undefined} // <--- defaults to 'number'. 'category' or 'number'.
        />

        {chartSettings.tooltip.show && (
          <Tooltip content={(tooltipProps) => <CustomTooltip {...tooltipProps} {...chartSettings.tooltip.props} />} />
        )}

        {chartSettings.legend.show && (
          <Legend
            {...chartSettings.legend.props}
            onMouseEnter={onLegendMouseEnter}
            onMouseLeave={onLegendMouseLeave}
            onClick={onLegendClick}
          />
        )}

        {chartSettings.zoomSlider.show && (
          <Brush
            {...chartSettings.zoomSlider.props}
            startIndex={startIndex.current} // <--- The default start index of brush. If the option is not set, the start index will be 0.
            endIndex={endIndex.current} // <---The default end index of brush. If the option is not set, the end index will be calculated by the length of data.
            onChange={onBrushChange}
            className={GLOBAL_CLASSES.tooltip}
          >
            {chartSettings.zoomSlider.showPreviewInSlider ? (
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
        )}

        {referenceLines?.map(({ x, y, label, lineWidth, lineColor, isDashed }, index) => {
          const referenceLineProps: any = {
            x,
            y,
            label,
            stroke: lineColor ?? '#666',
            strokeWidth: lineWidth ?? 1,
          };

          if (isDashed) referenceLineProps.strokeDasharray = '10 10';

          return <ReferenceLine key={index} {...chartSettings.referenceLines.props} {...referenceLineProps} />;
        })}

        {data.map((line) => {
          const { name, color, data, lineWidth, curveType, isDashed, dots, showValues: showLineValues, hide } = line;

          const lineProps: any = {
            hide,
            dataKey: name,
            stroke: color ?? 'black',
            strokeWidth: lineWidth ?? 1,
            type: curveType ?? 'linear',
            r: dots?.r ?? 3, // <--- 3 is recharts default!
            opacity: isLegendHovered ? (isLineHovered[name] ? 1 : 0.1) : undefined,
            // data, <--- don't put data here because if you do the line would not appear!
          };

          if (isDashed) lineProps.strokeDasharray = DASHED_LINE;

          return (
            <Line
              key={name}
              {...chartSettings.lines.props}
              {...lineProps}
              hide={!visibleLines[name]}
              // This destruct below solves the pesky error of "Warning: A props object containing a "key" prop is being spread into JSX: let props = {key: someKey, r: ..., stroke: ..., strokeWidth: ..., opacity: ..., strokeDasharray: ..., fill: ..., width: ..., height: ..., value: ..., dataKey: ..., cx: ..., cy: ..., index: ..., payload: ..., data: ..., showChartValues: ..., showLineValues: ...};"
              dot={({ key, ...dotProps }) => (
                <NonActiveDot
                  key={key}
                  {...dotProps}
                  data={data}
                  hideDots={chartSettings.lines.hideDots}
                  showChartValues={chartSettings.general.showValues}
                  showLineValues={showLineValues}
                />
              )}
              activeDot={(dotProps: any) => (
                <ActiveDot
                  {...dotProps}
                  data={data}
                  showChartValues={chartSettings.general.showValues}
                  showLineValues={showLineValues}
                  onClick={(e: any) => onDotClick?.(dotProps, e)}
                />
              )}
            />
          );
        })}
      </LineChartBase>
    </ResponsiveContainer>
  );
}
