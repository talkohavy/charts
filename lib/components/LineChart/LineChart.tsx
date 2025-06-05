import clsx from 'clsx';
import { LineChart as LineChartBase, ResponsiveContainer } from 'recharts';
import type { BaseChartProps, LineChartSettings, LineSeries } from '../types';
import { useGrid } from '../logic/useComponents/useGrid';
import { useLegend } from '../logic/useComponents/useLegend';
import { useLineChartAxes } from '../logic/useComponents/useLineChartAxes';
import { useLineChartBrush } from '../logic/useComponents/useLineChartBrush';
import { useLines } from '../logic/useComponents/useLines';
import { useReferenceLines } from '../logic/useComponents/useReferenceLines';
import { useTooltip } from '../logic/useComponents/useTooltip';
import { ActiveDotProps } from './logic/ActiveDot';
import { CLASSES } from './logic/constants';
import { useLineChartLogic } from './logic/useLineChartLogic';
import '../../recharts.css';

export type LineChartProps = BaseChartProps & {
  settings?: LineChartSettings;
  data: Array<LineSeries>;
  onDotClick?: (data: ActiveDotProps, e: any) => void;
};

export default function LineChart(props: LineChartProps) {
  const { data, onDotClick, referenceLines: referenceLinesData, className } = props;

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

  const grid = useGrid({ gridSettings: chartSettings.grid });
  const axes = useLineChartAxes({ xAxisSettings: chartSettings.xAxis, yAxisSettings: chartSettings.yAxis, xAxisType });
  const tooltip = useTooltip({ tooltipSettings: chartSettings.tooltip });
  const legend = useLegend({
    legendSettings: chartSettings.legend,
    onLegendClick,
    onLegendMouseEnter,
    onLegendMouseLeave,
  });
  const brush = useLineChartBrush({
    brushSettings: chartSettings.zoomSlider,
    startIndex,
    endIndex,
    onBrushChange,
    transformedDataForRecharts,
    data,
  });
  const referenceLines = useReferenceLines({ data: referenceLinesData, settings: chartSettings.referenceLines });
  const lines = useLines({
    data,
    linesSettings: chartSettings.lines,
    generalSettings: chartSettings.general,
    visibleLines,
    onDotClick,
    isLegendHovered,
    isLineHovered,
  });

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <LineChartBase
        {...chartSettings.lineChartBase.props}
        data={transformedDataForRecharts}
        className={clsx(CLASSES.lineChart, className)}
      >
        {/* Grid MUST be rendered before XAxis & YAxis! It needs to be painted behind them */}
        {grid}
        {axes}
        {tooltip}
        {legend}
        {brush}
        {referenceLines}
        {lines}
      </LineChartBase>
    </ResponsiveContainer>
  );
}
