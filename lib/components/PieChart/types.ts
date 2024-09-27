export type PieChartDrawData = {
  name: string;
  value: number;
  percent: number;
  percentFormatted: number;
  color: string;
  angle: number;
  startAngle: number;
  endAngle: number;
  path: string;
  activeOuterArcPath: string;
  middleDirection: { xDirection: number; yDirection: number };
  arcStartPoint: { x: number; y: number };
  arcEndPoint: { x: number; y: number };
};

export type PieChartSettings = {
  legend?: {
    /**
     * @default true
     */
    show?: boolean;
    xValueFormatter?: (value: string) => string;
  };
  tooltip?: {
    xValueFormatter?: (value: string) => string;
    yValueFormatter?: (value: number) => string;
    unit: string;
  };
};

export type PieSlice = {
  name: string;
  value: number;
  color?: string;
};
