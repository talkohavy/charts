const BRUSH_HEIGHT = 25;
const BRUSH_ITEMS_PER_PAGE = 10;
const LEGEND_HEIGHT = 25;
const X_AXIS_BASE_HEIGHT = 10;
const TICK_DASH_WIDTH = 10;
const DASHED_LINE = '20 20'; // or '5 5'
const DEFAULT_Y_TICK_COUNT = 5; // <--- recharts defaults to 5 anyways

const CLASSES = {
  tooltip: 'tk-custom-tooltip',
  brush: 'tk-custom-brush', // 'recharts-custom-brush'
};

const COLORS = [
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

export {
  BRUSH_HEIGHT,
  BRUSH_ITEMS_PER_PAGE,
  CLASSES,
  COLORS,
  DASHED_LINE,
  DEFAULT_Y_TICK_COUNT,
  LEGEND_HEIGHT,
  TICK_DASH_WIDTH,
  X_AXIS_BASE_HEIGHT,
};
