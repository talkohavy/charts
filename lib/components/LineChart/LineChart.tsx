import { useMemo, useRef, useState } from 'react';
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
import { BRUSH_ITEMS_PER_PAGE, DASHED_LINE, CLASSES as GLOBAL_CLASSES } from '../logic/constants';
import CustomizedAxisTick from '../logic/CustomAxisTick';
import CustomTooltip from '../logic/CustomTooltip';
import useMaxYValue from '../logic/hooks/useMaxYValue';
import useTransformedDataForRecharts from '../logic/hooks/useTransformedDataForRecharts';
import useWidthOfLongestXTickLabel from '../logic/hooks/useWidthOfLongestXTickLabel';
import useXAxisHeight from '../logic/hooks/useXAxisHeight';
import useYAxisWidth from '../logic/hooks/useYAxisWidth';
import {
  getLengthOfLongestData,
  getLineChartMergedChartSettings,
  getNamesObject,
  runValidationsOnAllSeries,
} from '../logic/utils';
import styles from './LineChart.module.scss';
import ActiveDot, { ActiveDotProps } from './logic/ActiveDot';
import { CLASSES } from './logic/constants';
import NonActiveDot from './logic/NonActiveDot';
import type { BaseChartProps, CustomTickFormatterFunc, LineChartSettings, LineSeries } from '../types';
import '../../recharts.css';

type LineChartProps = BaseChartProps & {
  settings?: LineChartSettings;
  data: Array<LineSeries>;
  onDotClick?: (data: ActiveDotProps) => void;
};

export default function LineChart(props: LineChartProps) {
  const {
    type: xAxisType = 'category',
    settings: settingsToMerge,
    /**
     * **IMPORTANT!!!*
     *
     * When choosing chart type of `datetime`, each data series must be sorted!
     * For other types (category & number), recharts sorts the data internally.
     */
    data,
    onDotClick,
    referenceLines,
    className,
    style,
  } = props;

  useMemo(() => runValidationsOnAllSeries(data), [data]);

  const lengthOfLongestData = useMemo(() => getLengthOfLongestData(data), [data]);

  const startIndex = useRef(0);
  const endIndex = useRef(Math.min(BRUSH_ITEMS_PER_PAGE, lengthOfLongestData - 1));
  const [isLegendHovered, setIsLegendHovered] = useState(false);
  const [isLineHovered, setIsLineHovered] = useState(() => getNamesObject(data));
  const [visibleLines, setVisibleLines] = useState(() => getNamesObject(data, true));

  const positiveXTickRotateAngle = Math.abs(settingsToMerge?.xAxis?.tickAngle ?? 0);

  const { transformedDataForRecharts } = useTransformedDataForRecharts({ data });
  const { maxYValue } = useMaxYValue({ data });
  const { widthOfLongestXTickLabel } = useWidthOfLongestXTickLabel({
    settingsToMerge,
    transformedDataForRecharts,
    xAxisType,
  });
  const { xAxisHeight } = useXAxisHeight({ settingsToMerge, positiveXTickRotateAngle, widthOfLongestXTickLabel });
  const { yAxisWidth } = useYAxisWidth({ data, settingsToMerge, maxYValue });
  const chartSettings = useMemo(
    () =>
      getLineChartMergedChartSettings({
        settings: settingsToMerge,
        chartType: 'LineChart',
        xAxisType,
        xAxisHeight,
        yAxisWidth,
      }),
    [settingsToMerge, xAxisType, xAxisHeight, yAxisWidth],
  );

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <LineChartBase
        {...chartSettings.lineChartBase.props}
        data={transformedDataForRecharts}
        className={clsx(CLASSES.lineChart, settingsToMerge?.xAxis?.label && styles.lineChartLabelGap, className)}
        style={style}
      >
        {/* MUST come before XAxis & YAxis */}
        {chartSettings.grid.show && <CartesianGrid {...chartSettings.grid.props} />}

        <XAxis
          {...chartSettings.xAxis.props}
          dataKey='x'
          label={chartSettings.xAxis.label}
          type={xAxisType === 'datetime' ? 'number' : xAxisType} // <--- 'category' v.s. 'number'. What is the difference? Isn't it the same eventually? Well no, because consider a case where gaps exist. For instance, 0 1 2 4 5. A 'category' would place an even distance between 2 & 4, when in fact it's a double gap!
          scale={xAxisType === 'datetime' ? 'time' : 'auto'}
          // passes everything as an argument! x, y, width, height, everything! You'll even need to handle the tick's positioning, and format the entire tick.
          tick={(tickProps) => <CustomizedAxisTick {...tickProps} />}
        />

        <YAxis
          {...chartSettings.yAxis.props}
          type={'number' as 'number' | 'category' | undefined} // <--- defaults to 'number'. 'category' or 'number'.
          label={chartSettings.yAxis.label}
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
              const lineName = payload.dataKey as string;

              if (!visibleLines[lineName]) return;

              setIsLegendHovered(true);
              setIsLineHovered((prevState) => ({ ...prevState, [lineName]: true }));
            }}
            onMouseLeave={(payload) => {
              const lineName = payload.dataKey as string;

              if (!visibleLines[lineName]) return;

              setIsLegendHovered(false);

              setIsLineHovered((prevState) => ({ ...prevState, [lineName]: false }));
            }}
            onClick={(payload) => {
              const lineName = payload.dataKey as string;

              if (visibleLines[lineName]) setIsLegendHovered(false);

              setVisibleLines((prevState) => ({ ...prevState, [lineName]: !prevState[lineName] }));
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

          return (
            <ReferenceLine
              key={index}
              {...chartSettings.referenceLines.props}
              {...referenceLineProps}
              // isFront // <--- defaults to false. true will display it on top of bars in BarCharts, or data in LineCharts.
            />
          );
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
              // This solves the pesky error of "Warning: A props object containing a "key" prop is being spread into JSX: let props = {key: someKey, r: ..., stroke: ..., strokeWidth: ..., opacity: ..., strokeDasharray: ..., fill: ..., width: ..., height: ..., value: ..., dataKey: ..., cx: ..., cy: ..., index: ..., payload: ..., data: ..., showChartValues: ..., showLineValues: ...};"
              dot={({ key, ...dotProps }) => (
                <NonActiveDot
                  key={key}
                  {...dotProps}
                  hideDots={chartSettings.lines.hideDots}
                  data={data}
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
                  onClick={() => onDotClick?.(dotProps)}
                />
              )}
            />
          );
        })}
      </LineChartBase>
    </ResponsiveContainer>
  );
}
