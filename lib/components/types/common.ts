export const ValuePositions = {
  Above: 'above',
  Center: 'center',
  Below: 'below',
} as const;

export type ValuePositionValues = (typeof ValuePositions)[keyof typeof ValuePositions];

export type AxisLabelPosition =
  | 'insideLeft'
  | 'insideRight'
  | 'insideTop'
  | 'insideBottom'
  | 'insideTopLeft'
  | 'insideTopRight'
  | 'insideBottomLeft'
  | 'insideBottomRight'
  | 'left'
  | 'right'
  | 'middle'
  | 'bottom'
  | 'centerBottom'
  | 'centerTop'
  | 'center'
  | 'insideEnd'
  | 'insideStart';

export type CustomTickFormatterFunc = (value: any, index?: number, maxStringLength?: number) => string;
export type RechartsTickFormatterFunc = (value: any, index: number) => string;

export type XAsNumber = { x: number };
export type XAsString = { x: string };
