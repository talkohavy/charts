import clsx from 'clsx';
import { BarChart as BarChartBase, ResponsiveContainer } from 'recharts';
import type { BarChartSettings, BarClickEventProps, BarSeries, BaseChartProps } from '../types';
import { useBarChartAxes } from '../logic/useComponents/useBarChartAxes';
import { useBarChartBrush } from '../logic/useComponents/useBarChartBrush';
import { useBars } from '../logic/useComponents/useBars';
import { useGrid } from '../logic/useComponents/useGrid';
import { useLegend } from '../logic/useComponents/useLegend';
import { useReferenceLines } from '../logic/useComponents/useReferenceLines';
import { useTooltip } from '../logic/useComponents/useTooltip';
import { BAR_LAYOUT_TO_CHART_LAYOUT } from './logic/constants';
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
  const {
    layout: barsLayout = 'vertical',
    data,
    referenceLines: referenceLinesData,
    className,
    onClickBar,
    activeBarId,
  } = props;

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

  const axes = useBarChartAxes({ xAxisSettings: chartSettings.xAxis, yAxisSettings: chartSettings.yAxis, barsLayout });
  const tooltip = useTooltip({ tooltipSettings: chartSettings.tooltip });
  const legend = useLegend({
    legendSettings: chartSettings.legend,
    onLegendClick,
    onLegendMouseEnter,
    onLegendMouseLeave,
  });
  const brush = useBarChartBrush({
    brushSettings: chartSettings.zoomSlider,
    startIndex,
    endIndex,
    onBrushChange,
    transformedDataForRecharts,
    data,
  });
  const referenceLines = useReferenceLines({ data: referenceLinesData, settings: chartSettings.referenceLines });
  const bars = useBars({
    data,
    barsSettings: chartSettings.bars,
    visibleBars,
    onClickBar,
    activeBarId,
    isLegendHovered,
    isBarTypeHovered,
  });
  const grid = useGrid({ gridSettings: chartSettings.grid });

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChartBase
        data={transformedDataForRecharts}
        className={clsx(CLASSES.barChart, className)}
        layout={BAR_LAYOUT_TO_CHART_LAYOUT[barsLayout]} // <--- chart layout is by default 'horizontal' (which means bars layout is vertical).
        {...chartSettings.barChartBase.props}
      >
        {/* Grid MUST be rendered before XAxis & YAxis! It needs to be painted behind them */}
        {grid}
        {axes}
        {tooltip}
        {legend}
        {brush}
        {referenceLines}
        {bars}
      </BarChartBase>
    </ResponsiveContainer>
  );
}
