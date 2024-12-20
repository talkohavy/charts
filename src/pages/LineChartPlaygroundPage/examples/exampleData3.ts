import { LineSeries } from '../../../../lib/components/types';

// Example 3: 1 line with 1 singled out dot
export const example3: Array<LineSeries> = [
  {
    name: 'line1',
    curveType: 'monotone',
    isDashed: true,
    data: [
      { x: 100000, y: 100 },
      { x: 200000, y: 300 },
      { x: 300000, y: 151, value: { show: true }, dot: { r: 12, fill: 'red', stroke: 'black' } },
      { x: 400000, y: 200 },
      { x: 500000, y: 80 },
      { x: 800000, y: 180, value: { show: true }, dot: { r: 12, fill: 'red', stroke: 'black' } },
    ],
  },
];
