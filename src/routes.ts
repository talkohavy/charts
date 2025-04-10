import { lazy } from 'react';

const LineChartExamplesPage = lazy(() => import('./pages/LineChartExamplesPage'));
const BarChartExamplePage = lazy(() => import('./pages/BarChartExamplePage'));
const PieChartExamplePage = lazy(() => import('./pages/PieChartExamplesPage'));
const LineChartPlaygroundPage = lazy(() => import('./pages/LineChartPlaygroundPage'));
const BarChartPlaygroundPage = lazy(() => import('./pages/BarChartPlaygroundPage'));

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
  {
    to: '/line-chart-playground',
    text: 'Playground L',
    activeNames: ['/line-chart-playground'],
    Component: LineChartPlaygroundPage,
  },
  {
    to: '/bar-chart-playground',
    text: 'Playground B',
    activeNames: ['/bar-chart-playground'],
    Component: BarChartPlaygroundPage,
  },
];
