import type { HorizontalAlignmentType, VerticalAlignmentType } from 'recharts/types/component/DefaultLegendContent';
import type { AxisDomain, AxisInterval, LayoutType, ScaleType, StackOffsetType } from 'recharts/types/util/types';
import type {
  BarChartSettings,
  CustomTickFormatterFunc,
  LineChartSettings,
  RechartsTickFormatterFunc,
} from '../../types';
import { BRUSH_HEIGHT, TICK_DASH_WIDTH } from '../constants';
import { calculateXAxisLabelPositioning } from './calculateXAxisLabelPositioning';
import { FORMATTERS, formatLabel } from './formatters';
import { getLegendHeight } from './getLegendHeight';

type GetMergedChartSettingsProps = {
  chartType: 'LineChart' | 'BarChart';
  settings?: LineChartSettings | BarChartSettings;
  xAxisHeight?: number;
  yAxisWidth: number;
  xAxisType: 'category' | 'number' | 'datetime';
};

export function getBarChartMergedChartSettings(props: GetMergedChartSettingsProps) {
  const sharedSettings = getSharedMergedChartSettings(props);

  const settingsToMerge = props.settings as BarChartSettings;
  const hasLeftGap = !!sharedSettings.yAxis.props.label.value;
  const hasBottomGap = !sharedSettings.xAxis.props.hide;

  return {
    ...sharedSettings,
    barChartBase: {
      props: {
        margin: {
          left: hasLeftGap ? 12 : 0,
          bottom: hasBottomGap ? 30 : 10,
          right: 10, // <--- needed for last tick label to not be cut off
        },
        stackOffset: 'sign' as StackOffsetType, // <--- sign knows how to deal with negative values, while default stackOffset just hides them (doesn't show them).
        // reverseStackOrder // <--- default is false. When true, stacked items will be rendered right to left. By default, stacked items are rendered left to right. Render direction affects SVG layering, not x position.
        // barCategoryGap='10%' // <--- gap between bars. Hard to make this generic. The default seems to do a pretty good job.
      },
    },
    bars: {
      props: {
        barSize: settingsToMerge?.bars?.barSize, // <--- it is best to leave this as automatically calculated
        // minPointSize: 5, // <--- give a min height to the lowest value, so that it would still be visible.
        // background: { fill: barBackgroundOverlayColor } // <--- DO NOT put a background! This is what interrupted my onClick event from getting the right BarChart name!
        // onAnimationEnd={() => console.log('animation end!')}
        // label={{ position: 'top' }} // <--- Don't need! I'm using a custom label renderer instead (CustomizedLabel).
      },
    },
  };
}

export function getLineChartMergedChartSettings(props: GetMergedChartSettingsProps) {
  const sharedSettings = getSharedMergedChartSettings(props);

  const settingsToMerge = props.settings as LineChartSettings;
  const hasLeftGap = !!sharedSettings.yAxis.props.label.value;
  const hasBottomGap = !sharedSettings.xAxis.props.hide;

  return {
    ...sharedSettings,
    lineChartBase: {
      props: {
        margin: {
          left: hasLeftGap ? 12 : 0,
          bottom: hasBottomGap ? 30 : 10,
          right: 10, // <--- needed for last tick label to not be cut off
        },
      },
    },
    lines: {
      props: {
        isAnimationActive: settingsToMerge?.general?.isAnimationActive, // <--- rechart says it defaults to true in CSR and to false in SSR
        connectNulls: settingsToMerge?.lines?.connectNulls,
      },
      hideDots: settingsToMerge?.lines?.hideDots,
    },
  };
}

export function getSharedMergedChartSettings(props: GetMergedChartSettingsProps) {
  const { chartType, settings, xAxisHeight, yAxisWidth, xAxisType } = props;

  const showGrid = settings?.grid?.show ?? true;
  const showLegend = settings?.legend?.show ?? chartType === 'BarChart';
  const showTooltip = settings?.tooltip?.show ?? true;
  const legendHeight = getLegendHeight({ showLegend, xAxisLabel: settings?.xAxis?.label, chartType });

  return {
    general: {
      showValues: settings?.general?.showValues,
    },
    xAxis: {
      props: {
        hide: settings?.xAxis?.show === undefined ? false : !settings?.xAxis?.show,
        label: {
          value: settings?.xAxis?.label,
          angle: 0,
          position: 'bottom',
          dy: calculateXAxisLabelPositioning({
            showLegend,
            showZoomSlider: settings?.zoomSlider?.show ?? false,
          }),
          dx: -yAxisWidth / 2,
        },
        color: settings?.xAxis?.tickColor ?? 'black', // <--- this is the color of the tick's value!
        fontSize: settings?.xAxis?.tickFontSize,
        fontFamily: settings?.xAxis?.tickFontFamily,
        ticks: settings?.xAxis?.customTicks,
        tickLine: settings?.xAxis?.showTickLine ?? true,
        tickFormatter: (settings?.xAxis?.tickFormatter ?? FORMATTERS[xAxisType]) as RechartsTickFormatterFunc, // <--- only passes the string value as an argument.
        axisLine: settings?.xAxis?.showAxisLine ?? true,
        stroke: settings?.xAxis?.axisLineColor ?? '#666', // <--- this is the color of the xAxis line itself!
        domain: (settings?.xAxis?.domain ?? ['auto', 'auto']) as AxisDomain,
        allowDataOverflow: false,
        angle: settings?.xAxis?.tickAngle ? -Math.abs(settings?.xAxis?.tickAngle) : 0,
        height: xAxisHeight,
        textAnchor: 'end', // <--- CustomizedAxisTick assumes this will always be set to 'end'. We calculate x with it. It's easier to render angled xAxis ticks that way.
        padding: { right: 40 }, // <--- you can use this to remove padding between: A. The first bar and the Y axis; B. The last bar and the chart axis. I'm using 40 to have the last dot always visible in case the last data point is a large red dot - 40 would make it visible.
        interval: 'preserveStartEnd' as AxisInterval, // <--- defaults to "preserveEnd". If set 0, all the ticks will be shown. If set "preserveStart", "preserveEnd" or "preserveStartEnd", the ticks which is to be shown or hidden will be calculated automatically.
        // minTickGap: 5,
        // mirror: true,
        // dy: 0,
        // tickSize: 6, // <--- defaults to 6. The length of tick line.
        // tickCount: 5, // <-- defaults to 5
        // includeHidden: true, // <--- defaults to false. Ensures that all data points within a chart contribute to its domain calculation, even when they are hidden.
        // allowDecimals: false, // <--- default to true
        // unit: 'cm', // <--- Doesn't appear if you're using `tick`, which you are. Also, it is good practice to have units appear on the label itself, and not on the ticks of the xAxis.
        // fontWeight: 100,
      },
      verticalProps: {
        dataKey: 'x',
        padding: 'gap' as 'gap' | 'no-gap', // <--- 'gap' is unique to BarChart. 'gap' gives the first and the last bar gap from the walls. 'no-gap' has both the first & last bars touch the walls.
        type: (xAxisType === 'category' ? 'category' : 'number') as 'number' as 'number' | 'category' | undefined, // <--- 'category' v.s. 'number'. What is the difference? Isn't it the same eventually? Well no, because consider a case where gaps exist. For instance, 0 1 2 4 5. A 'category' would place an even distance between 2 & 4, when in fact it's a double gap!
        scale: (xAxisType === 'category' ? 'auto' : 'time') as ScaleType,
      },
    },
    yAxis: {
      props: {
        hide: settings?.yAxis?.show === undefined ? false : !settings?.yAxis?.show,
        label: {
          value: settings?.yAxis?.label,
          angle: -90,
          position: 'left',
          fontSize: settings?.yAxis?.labelFontSize,
          style: { textAnchor: 'middle' },
        },
        stroke: settings?.yAxis?.axisLineColor ?? '#666',
        fontSize: settings?.yAxis?.tickFontSize,
        fontFamily: settings?.yAxis?.tickFontFamily,
        tick: {
          fill: settings?.yAxis?.tickColor ?? '#666',
        },
        tickSize: settings?.yAxis?.tickSize ?? TICK_DASH_WIDTH,
        ticks: settings?.yAxis?.customTicks,
        axisLine: settings?.yAxis?.showAxisLine ?? true,
        tickLine: settings?.yAxis?.showTickLine ?? true,
        unit: settings?.yAxis?.tickSuffix ?? '',
        domain: settings?.yAxis?.domain,
        width: yAxisWidth,
        tickFormatter: (settings?.yAxis?.tickFormatter ?? formatLabel) as CustomTickFormatterFunc,
        padding: { top: 18 },
        includeHidden: true, // <--- when having multiple lines, and playing around clicking the legend items, animations look so much better with this as `true`.
        // dataKey: 'y'// <--- do NOT put dataKey on y axis of BarChart or LineChart! We are going to use the `name` of each Bars set.
      },
      horizontalProps: {
        dataKey: 'x',
        type: 'category' as 'number' | 'category', // <--- defaults to 'number'. Options are: 'category' or 'number'.
        padding: 'gap' as any, // <--- 'gap' is unique to BarChart. 'gap' gives the first and the last bar gap from the walls. 'no-gap' has both the first & last bars touch the walls.
      },
    },
    grid: {
      show: !!showGrid,
      props: {
        stroke: settings?.grid?.color ?? '#ddd',
        strokeWidth: 0.5,
        horizontal: typeof showGrid === 'boolean' ? showGrid : !!showGrid.horizontal,
        vertical: typeof showGrid === 'boolean' ? showGrid : !!showGrid.vertical,
        strokeDasharray: settings?.grid?.strokeDasharray ?? '5 5',
        syncWithTicks: true,
      },
    },
    legend: {
      show: showLegend ?? false,
      props: {
        layout: 'horizontal' as LayoutType, // <--- how to align items of the legend.
        verticalAlign: 'bottom' as VerticalAlignmentType, // <--- pin legend to top, bottom or center.
        align: 'left' as HorizontalAlignmentType, // <--- defaults to 'center'. Horizontal alignment.
        iconSize: 14, // <--- defaults to 14
        formatter: settings?.legend?.nameFormatter ?? ((name) => formatLabel(name, 14)),
        height: legendHeight,
        // iconType: 'circle' // <--- defaults to 'line'
      },
    },
    tooltip: {
      show: showTooltip,
      props: {
        ySuffix: settings?.yAxis?.tickSuffix ?? '', // <--- Notice that I copy whatever the yAxis has.
        xValueFormatter:
          settings?.xAxis?.tickFormatter ??
          settings?.tooltip?.xValueFormatter ??
          (FORMATTERS[xAxisType] as CustomTickFormatterFunc),
        nameFormatter: settings?.tooltip?.nameFormatter ?? ((name: string) => name),
      },
    },
    zoomSlider: {
      show: settings?.zoomSlider?.show,
      showPreviewInSlider: settings?.zoomSlider?.showPreviewInSlider,
      props: {
        stroke: '#4b5af1',
        height: BRUSH_HEIGHT,
        // gap: 1 // <--- Default to 1. `gap` is the refresh rate. 1 is smoothest.
        // travellerWidth: 6
      },
    },
    referenceLines: {
      props: {
        // isFront // <--- defaults to false. true will display it on top of bars in BarCharts, or lines in LineCharts.
      },
    },
  };
}
