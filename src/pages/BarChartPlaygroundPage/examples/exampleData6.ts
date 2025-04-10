import { COLORS } from '../../../../lib/components/logic/constants';
import { BarSeries } from '../../../../lib/components/types';

const now = Date.UTC(2024, 10, 0, 22, 0, 0, 0);
const _1_HOUR = 1000 * 60 * 60;
const _1_DAY = _1_HOUR * 24;

export const example6: Array<BarSeries> = [
  {
    name: 'line1',
    color: COLORS[0],
    data: [
      { x: now, y: 100 },
      { x: now, y: 300 },
      { x: now, y: 150 },
      { x: now, y: 200 },
      { x: now, y: 80 },
      { x: now, y: 180 },
      { x: now, y: 225 },
      { x: now, y: 150 },
      { x: now, y: 80 },
      { x: now, y: 70 },
      { x: now, y: 120 },
      { x: now, y: 210 },
      { x: now, y: 230 },
      { x: now, y: 245 },
      { x: now, y: 160 },
      { x: now, y: 145 },
      { x: now, y: 115 },
      { x: now, y: 190 },
      { x: now, y: 200 },
      { x: now, y: 230 },
      { x: now, y: 170 },
      { x: now, y: 120 },
      { x: now, y: 80 },
      { x: now, y: 60 },
      { x: now, y: 80 },
      { x: now, y: 120 },
      { x: now, y: 70 },
      { x: now, y: 90 },
      { x: now, y: 100 },
      { x: now, y: 180 },
    ].map((point, index) => ({ ...point, x: point.x + index * _1_DAY })),
  },
];
