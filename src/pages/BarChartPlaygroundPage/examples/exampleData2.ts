import { BarSeries } from '../../../../lib/components/types';

// Example 2: 3 lines
export const example2: Array<BarSeries> = [
  {
    name: 'line1',
    color: '#ff7300',
    data: [
      { x: 0, y: 400 },
      { x: 1, y: 300 },
      { x: 2, y: 300 },
      { x: 3, y: 200 },
      { x: 4, y: 280 },
      { x: 5, y: 180 },
    ],
  },
  {
    name: 'line2',
    color: 'blue',
    data: [
      { x: 0, y: 800 },
      { x: 1, y: 100 },
      { x: 2, y: 500 },
      { x: 3, y: 200 },
      { x: 4, y: 380 },
      { x: 5, y: 480 },
    ],
  },
  {
    name: 'line3',
    color: 'green',
    data: [
      { x: 0, y: 200 },
      { x: 1, y: 500 },
      { x: 2, y: 100 },
      { x: 3, y: 400 },
      { x: 4, y: 80 },
      { x: 5, y: 300 },
    ],
  },
];
