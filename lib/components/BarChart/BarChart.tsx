import clsx from 'clsx';
import {
  Bar,
  BarChart as BarChartBase,
  Brush,
  CartesianGrid,
  Cell,
  LabelList,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { BarChartSettings, BarClickEventProps, BarSeries, BaseChartProps } from '../types';
import { CLASSES as GLOBAL_CLASSES } from '../logic/constants';
import CustomizedAxisTick from '../logic/CustomAxisTick';
import CustomizedLabel from '../logic/CustomizedLabel';
import CustomTooltip from '../logic/CustomTooltip';
import { ACTIVE_BAR_COLOR, BAR_LAYOUT_TO_CHART_LAYOUT, DEFAULT_BAR_COLOR } from './constants';
import { CLASSES } from './logic/constants';
import { useBarChartLogic } from './logic/useBarChartLogic';
import '../../recharts.css';

export type BarChartProps = BaseChartProps & {
  settings?: BarChartSettings;
  data: Array<BarSeries>;
  onClickBar?: (props: BarClickEventProps & { name: string; barTypeIndex: number }) => void;
  /**
   * Every Bar within the BarChart has an ID which is a string comprised of '[bar name]-[x value]'.
   * @example
   * const data = [{ name: 'hello', data: [{x: 'Israel', y: 140}, x: 'France', y: 120]}];
   * // The barIds are: 'hello-Israel' & 'hello-France'
   */
  activeBarId?: string;
  /**
   * @default 'vertical'
   */
  layout?: 'horizontal' | 'vertical';
};

export default function BarChart(props: BarChartProps) {
  const { layout: barsLayout = 'vertical', data, referenceLines, className, onClickBar, activeBarId } = props;

  const {
    transformedDataForRecharts,
    chartSettings,
    visibleBars,
    startIndex,
    endIndex,
    isLegendHovered,
    isBarTypeHovered,
    onLegendMouseEnter,
    onLegendMouseLeave,
    onLegendClick,
    onBrushChange,
  } = useBarChartLogic(props);

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChartBase
        data={transformedDataForRecharts}
        className={clsx(CLASSES.barChart, className)}
        layout={BAR_LAYOUT_TO_CHART_LAYOUT[barsLayout]} // <--- chart layout is by default 'horizontal' (which means bars layout is vertical).
        {...chartSettings.barChartBase.props}
      >
        {/* MUST come before XAxis & YAxis! It needs to be painted behind them */}
        {chartSettings.grid.show && <CartesianGrid {...chartSettings.grid.props} />}

        <XAxis
          {...chartSettings.xAxis.props}
          {...(barsLayout === 'vertical' ? chartSettings.xAxis.verticalProps : { type: 'number' as any })}
          label={{
            ...chartSettings.xAxis.props.label,
            value:
              barsLayout === 'vertical' ? chartSettings.xAxis.props.label.value : chartSettings.yAxis.props.label.value,
          }}
          tick={(tickProps) => <CustomizedAxisTick {...tickProps} />}
        />

        <YAxis
          {...chartSettings.yAxis.props}
          label={{
            ...chartSettings.yAxis.props.label,
            value:
              barsLayout === 'vertical' ? chartSettings.yAxis.props.label.value : chartSettings.xAxis.props.label.value,
          }}
          {...(barsLayout === 'vertical' ? {} : chartSettings.yAxis.horizontalProps)}
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
            className={GLOBAL_CLASSES.brush}
          >
            {chartSettings.zoomSlider.showPreviewInSlider ? (
              <BarChartBase data={transformedDataForRecharts}>
                {data.map(({ name }) => (
                  <Bar key={name} dataKey={name} isAnimationActive={false} fill='#999' />
                ))}
              </BarChartBase>
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

        {data.map(({ name, data, unit, color, barBorderColor, stackId }, index) => {
          const barColorInLegend = color ?? DEFAULT_BAR_COLOR;

          const barProps = {
            fill: barColorInLegend,
            stroke: barBorderColor,
            dataKey: name,
            stackId,
            unit,
          };

          return (
            <Bar
              key={`${name}-${index}`}
              {...chartSettings.bars.props}
              {...barProps}
              hide={!visibleBars[name]}
              onClick={(props, index) => onClickBar?.({ ...props, barTypeIndex: index, name })}
            >
              {chartSettings.general.showValues && (
                <LabelList
                  dataKey={name}
                  fontSize={11}
                  position={stackId ? 'center' : 'top'}
                  content={CustomizedLabel}
                />
              )}

              {data.map(({ x, color: specificColor }) => {
                const barId = `${name}-${x}`;

                return (
                  <Cell
                    key={barId}
                    fill={barId === activeBarId ? ACTIVE_BAR_COLOR : (specificColor ?? color ?? DEFAULT_BAR_COLOR)}
                    opacity={isLegendHovered ? (isBarTypeHovered[name] ? 1 : 0.2) : undefined}
                    cursor={onClickBar && 'pointer'}
                  />
                );
              })}
            </Bar>
          );
        })}
      </BarChartBase>
    </ResponsiveContainer>
  );
}
