import { useMemo, useRef, useState } from 'react';
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
import { BRUSH_ITEMS_PER_PAGE, CLASSES as GLOBAL_CLASSES } from '../logic/constants';
import CustomizedAxisTick from '../logic/CustomAxisTick';
import CustomizedLabel from '../logic/CustomizedLabel';
import CustomTooltip from '../logic/CustomTooltip';
import {
  FORMATTERS,
  calculateYAxisWidth,
  getBarChartMergedChartSettings,
  getLengthOfLongestData,
  getNamesObject,
  getWidthOfLongestXLabel,
  getXAxisHeight,
  runValidationsOnAllSeries,
} from '../logic/utils';
import styles from './BarChart.module.scss';
import { ACTIVE_BAR_COLOR, BAR_LAYOUT_TO_CHART_LAYOUT, DEFAULT_BAR_COLOR } from './constants';
import { CLASSES } from './logic/constants';
import type {
  BarChartSettings,
  BarClickEventProps,
  BarSeries,
  BaseChartProps,
  CustomTickFormatterFunc,
  XAsNumber,
  XAsString,
} from '../types';
import '../../recharts.css';

type BarChartProps = BaseChartProps & {
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
    type: xAxisType = 'category',
    layout: barsLayout = 'vertical',
    settings: settingsToMerge,
    data,
    referenceLines,
    className,
    style,
    onClickBar,
    activeBarId,
  } = props;

  useMemo(() => runValidationsOnAllSeries(data), [data]);

  const lengthOfLongestData = useMemo(() => getLengthOfLongestData(data), [data]);

  const startIndex = useRef(0);
  const endIndex = useRef(Math.min(BRUSH_ITEMS_PER_PAGE, lengthOfLongestData - 1));
  const [isLegendHovered, setIsLegendHovered] = useState(false);
  const [isBarTypeHovered, setIsBarTypeHovered] = useState(() => getNamesObject(data));
  const [visibleBars, setVisibleBars] = useState(() => getNamesObject(data, true));

  const positiveXTickRotateAngle = Math.abs(settingsToMerge?.xAxis?.tickAngle ?? 0);

  const transformedDataForRecharts: Array<{ x: number | string }> = useMemo(() => {
    const transformedDataByKey: Record<string, any> = {};

    data.forEach((barType) => {
      barType.data.forEach(({ x, y }) => {
        transformedDataByKey[x] ??= { x };
        transformedDataByKey[x][barType.name] = y;
      });
    });

    const transformedData = Object.values(transformedDataByKey);

    if (!transformedData.length) return transformedData;

    const sortNumbers = (a: XAsNumber, b: XAsNumber) => a.x - b.x;
    const sortStrings = (a: XAsString, b: XAsString) => a.x.localeCompare(b.x);
    const sorter = typeof transformedData[0].x === 'number' ? sortNumbers : sortStrings;

    transformedData.sort(sorter);

    return transformedData;
  }, [data]);

  const maxYValue = useMemo(() => {
    let maxYValue = Number.NEGATIVE_INFINITY;
    data.forEach((currentBarType) => {
      currentBarType.data.forEach(({ y }) => {
        if (maxYValue < y) maxYValue = y;
      });
    });

    return maxYValue;
  }, [data]);

  const widthOfLongestXTickLabel = useMemo(
    () =>
      getWidthOfLongestXLabel({
        transformedDataForRecharts,
        xTickFormatter: (settingsToMerge?.xAxis?.tickFormatter ?? FORMATTERS[xAxisType]) as CustomTickFormatterFunc,
        xFontSize: settingsToMerge?.xAxis?.tickFontSize,
        xFontFamily: settingsToMerge?.xAxis?.tickFontFamily,
      }),
    [
      transformedDataForRecharts,
      xAxisType,
      settingsToMerge?.xAxis?.tickFormatter,
      settingsToMerge?.xAxis?.tickFontSize,
      settingsToMerge?.xAxis?.tickFontFamily,
    ],
  );

  const xAxisHeight = useMemo(
    () =>
      getXAxisHeight({
        tickAngle: -positiveXTickRotateAngle,
        maxTextWidth: widthOfLongestXTickLabel,
        isLegendVisible: !!(settingsToMerge?.legend?.show ?? true),
        isSliderVisible: !!settingsToMerge?.zoomSlider?.show,
        isXLabelVisible: !!settingsToMerge?.xAxis?.label,
      }),
    [
      positiveXTickRotateAngle,
      widthOfLongestXTickLabel,
      settingsToMerge?.legend?.show,
      settingsToMerge?.zoomSlider?.show,
      settingsToMerge?.xAxis?.label,
    ],
  );

  const yAxisWidth = useMemo(() => {
    const yAxisWidth = calculateYAxisWidth({
      maxYValue,
      yLabel: settingsToMerge?.yAxis?.label,
      yTickSuffix: settingsToMerge?.yAxis?.tickSuffix,
      fontSize: settingsToMerge?.yAxis?.tickFontSize,
      tickCount: settingsToMerge?.yAxis?.tickCount,
      customTicks: settingsToMerge?.yAxis?.customTicks,
    });

    return yAxisWidth;
  }, [
    data,
    maxYValue,
    settingsToMerge?.yAxis?.label,
    settingsToMerge?.yAxis?.tickSuffix,
    settingsToMerge?.yAxis?.tickFontSize,
    settingsToMerge?.yAxis?.tickCount,
    settingsToMerge?.yAxis?.customTicks,
  ]);

  const chartSettings = useMemo(
    () =>
      getBarChartMergedChartSettings({
        settings: settingsToMerge,
        chartType: 'BarChart',
        xAxisType,
        xAxisHeight,
        yAxisWidth,
      }),
    [settingsToMerge, xAxisType, xAxisHeight, yAxisWidth],
  );

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChartBase
        data={transformedDataForRecharts}
        className={clsx(
          CLASSES.barChart,
          styles.barChartDefaultStyle,
          settingsToMerge?.xAxis?.label && styles.barChartLabelGap,
          className,
        )}
        style={style}
        {...chartSettings.barChartBase.props}
        layout={BAR_LAYOUT_TO_CHART_LAYOUT[barsLayout]} // <--- chart layout is by default 'horizontal' (which means bars layout is vertical).
        // reverseStackOrder // <--- default is false. When true, stacked items will be rendered right to left. By default, stacked items are rendered left to right. Render direction affects SVG layering, not x position.
        // barCategoryGap='10%' // <--- gap between bars. Hard to make this generic. The default seems to do a pretty good job.
      >
        {/* MUST come before XAxis & YAxis */}
        {chartSettings.grid.show && <CartesianGrid {...chartSettings.grid.props} />}

        <XAxis
          {...chartSettings.xAxis.props}
          tickFormatter={chartSettings.xAxis.tickFormatter}
          {...(barsLayout === 'vertical' ? chartSettings.xAxis.verticalProps : { type: 'number' as any })}
          label={{
            ...chartSettings.xAxis.label,
            value: barsLayout === 'vertical' ? chartSettings.xAxis.label?.value : chartSettings.yAxis.label?.value,
          }}
          tick={(tickProps) => (
            // passes everything as an argument! x, y, width, height, everything! You'll even need to handle the tick's positioning, and format the entire tick.
            <CustomizedAxisTick {...tickProps} xTickFormatter={chartSettings.xAxis.tickFormatter} />
          )}
        />

        <YAxis
          {...chartSettings.yAxis.props}
          label={{
            ...chartSettings.yAxis.label,
            value: barsLayout === 'vertical' ? chartSettings.yAxis.label.value : chartSettings.xAxis.label.value,
          }}
          {...(barsLayout === 'vertical' ? {} : chartSettings.yAxis.horizontalProps)}
        />

        {chartSettings.tooltip.show && (
          <Tooltip
            content={(tooltipProps) => (
              <CustomTooltip
                {...tooltipProps}
                xValueFormatter={chartSettings.tooltip.xValueFormatter as CustomTickFormatterFunc}
                ySuffix={chartSettings.tooltip.yTickSuffix}
              />
            )}
          />
        )}

        {chartSettings.legend.show && (
          <Legend
            {...chartSettings.legend.props}
            onMouseEnter={(payload) => {
              const barName = payload.dataKey as string;

              if (!visibleBars[barName]) return;

              setIsLegendHovered(true);
              setIsBarTypeHovered((prevState) => ({ ...prevState, [barName]: true }));
            }}
            onMouseLeave={(payload) => {
              const barName = payload.dataKey as string;

              if (!visibleBars[barName]) return;

              setIsLegendHovered(false);

              setIsBarTypeHovered((prevState) => ({ ...prevState, [barName]: false }));
            }}
            onClick={(payload) => {
              const barName = payload.dataKey as string;

              if (visibleBars[barName]) setIsLegendHovered(false);

              setVisibleBars((prevState) => ({ ...prevState, [barName]: !prevState[barName] }));
            }}
          />
        )}

        {chartSettings.zoomSlider.show && (
          <Brush
            {...chartSettings.zoomSlider.props}
            startIndex={startIndex.current} // <--- The default start index of brush. If the option is not set, the start index will be 0.
            endIndex={endIndex.current} // <---The default end index of brush. If the option is not set, the end index will be calculated by the length of data.
            onChange={(brushProps) => {
              startIndex.current = brushProps.startIndex as number;
              endIndex.current = brushProps.endIndex as number;
            }}
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

          return (
            <ReferenceLine
              key={index}
              {...chartSettings.referenceLines.props}
              {...referenceLineProps}
              // isFront // <--- defaults to false. true will display it on top of bars in BarCharts, or lines in LineCharts.
            />
          );
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
              // onAnimationEnd={() => console.log('animation end!')}
              // label={{ position: 'top' }} // <--- Don't need! I'm using a custom label renderer instead (CustomizedLabel).
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
