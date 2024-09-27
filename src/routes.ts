import { lazy } from 'react';

const LineChartExamplePage = lazy(() => import('./pages/LineChartExamplePage'));
const BarChartExamplePage = lazy(() => import('./pages/BarChartExamplePage'));

export const routes = [
  {
    to: '/line-chart',
    text: 'Line Chart',
    activeNames: ['/line-chart', '/'],
    Component: LineChartExamplePage,
  },
  {
    to: '/bar-chart',
    text: 'Bar Chart',
    activeNames: ['/bar-chart'],
    Component: BarChartExamplePage,
  },
];
