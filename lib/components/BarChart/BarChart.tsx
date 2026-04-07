import clsx from 'clsx';
import { BarChart as BarChartBase, ResponsiveContainer } from 'recharts';
import type { BarChartProps } from '../types';
import { CLASSES } from '../logic/constants';
import { useBarChartAxes } from '../logic/useComponents/useBarChartAxes';
import { useBarChartBrush } from '../logic/useComponents/useBarChartBrush';
import { useBars } from '../logic/useComponents/useBars';
import { useGrid } from '../logic/useComponents/useGrid';
import { useLegend } from '../logic/useComponents/useLegend';
import { useReferenceLines } from '../logic/useComponents/useReferenceLines';
import { useTooltip } from '../logic/useComponents/useTooltip';
import { BAR_LAYOUT_TO_CHART_LAYOUT } from './logic/constants';
import { useBarChartLogic } from './logic/useBarChartLogic';
import '../../recharts.css';

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

  const { xAxis, yAxis } = useBarChartAxes({
    xAxisSettings: chartSettings.xAxis,
    yAxisSettings: chartSettings.yAxis,
    barsLayout,
  });

  const grid = useGrid(chartSettings.grid);

  const tooltip = useTooltip(chartSettings.tooltip);

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
    generalSettings: chartSettings.general,
    barsSettings: chartSettings.bars,
    visibleBars,
    onClickBar,
    activeBarId,
    isLegendHovered,
    isBarTypeHovered,
  });

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
        {xAxis}
        {yAxis}
        {tooltip}
        {legend}
        {brush}
        {referenceLines}
        {bars}
      </BarChartBase>
    </ResponsiveContainer>
  );
}
