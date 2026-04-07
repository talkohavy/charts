export const BRUSH_HEIGHT = 25;
export const BRUSH_ITEMS_PER_PAGE = 10;
export const LEGEND_HEIGHT = 25;
export const X_AXIS_BASE_HEIGHT = 10;
export const TICK_DASH_WIDTH = 6;
export const DASHED_LINE = '20 20'; // or '5 5'
export const DEFAULT_Y_TICK_COUNT = 5; // <--- recharts defaults to 5 anyways

export const CLASSES = {
  lineChart: 'tk-custom-line-chart',
  barChart: 'tk-custom-bar-chart',
  tooltip: 'tk-custom-tooltip',
  brush: 'tk-custom-brush',
};

export const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#4CAF50',
  '#9C27B0',
  '#FF5722',
  '#795548',
  '#607D8B',
  '#E91E63',
  '#9E9E9E',
  '#2196F3',
  '#3F51B5',
  '#FF9800',
  '#009688',
  '#FFEB3B',
  '#CDDC39',
  '#03A9F4',
  '#8BC34A',
  '#FF5252',
];

export const ValuePositions = {
  Above: 'above',
  Center: 'center',
  Below: 'below',
} as const;

export type ValuePositionValues = (typeof ValuePositions)[keyof typeof ValuePositions];

export const ChartLayouts = {
  Horizontal: 'horizontal',
  Vertical: 'vertical',
} as const;

export type ChartLayoutValues = (typeof ChartLayouts)[keyof typeof ChartLayouts];

export const ThemeColors = {
  LineColor: '--tk-custom-line-chart-line-color',
  GridLinesColor: '--tk-custom-line-chart-grid-color',
  XAxisLineColor: '--tk-custom-line-chart-x-axis-line-color',
  XAxisTickLabelColor: '--tk-custom-line-chart-x-axis-tick-label-color',
  XAxisLabelColor: '--tk-custom-line-chart-x-axis-label-color',
  YAxisLineColor: '--tk-custom-line-chart-y-axis-line-color',
  YAxisTickLabelColor: '--tk-custom-line-chart-y-axis-tick-label-color',
  YAxisLabelColor: '--tk-custom-line-chart-y-axis-label-color',
  ValueColor: '--tk-custom-line-chart-value-color',
  TooltipBorderColor: '--tk-custom-line-chart-tooltip-border-color',
  TooltipBackgroundColor: '--tk-custom-line-chart-tooltip-background-color',
  ReferenceLineColor: '--tk-custom-line-chart-reference-line-color',
} as const;
