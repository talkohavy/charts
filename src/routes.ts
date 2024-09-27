import { lazy } from 'react';

const LineChartExamplesPage = lazy(() => import('./pages/LineChartExamplesPage'));
const BarChartExamplePage = lazy(() => import('./pages/BarChartExamplePage'));
const PieChartExamplePage = lazy(() => import('./pages/PieChartExamplesPage'));

export const routes = [
  // Leave this as the first, since it will serve as the homepage
  {
    to: '/line-chart',
    text: 'Line Chart',
    activeNames: ['/line-chart', '/'],
    Component: LineChartExamplesPage,
  },
  {
    to: '/bar-chart',
    text: 'Bar Chart',
    activeNames: ['/bar-chart'],
    Component: BarChartExamplePage,
  },
  {
    to: '/pie-chart',
    text: 'Pie Chart',
    activeNames: ['/pie-chart'],
    Component: PieChartExamplePage,
  },
];
