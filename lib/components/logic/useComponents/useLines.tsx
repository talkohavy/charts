import { Line } from 'recharts';
import ActiveDot, { ActiveDotProps } from '../../LineChart/logic/ActiveDot';
import NonActiveDot from '../../LineChart/logic/NonActiveDot';
import { LineSeries } from '../../types';
import { DASHED_LINE } from '../constants';

type UseLinesProps = {
  data: Array<LineSeries>;
  linesSettings: any;
  generalSettings: any;
  visibleLines: Record<string, boolean>;
  onDotClick?: (data: ActiveDotProps, e: any) => void;
  isLegendHovered: boolean;
  isLineHovered: Record<string, boolean>;
};

export function useLines(props: UseLinesProps) {
  const { data, linesSettings, generalSettings, visibleLines, onDotClick, isLegendHovered, isLineHovered } = props;

  return data.map((line) => {
    const { name, color, data, lineWidth, curveType, isDashed, dots, showValues: showLineValues, hide } = line;

    const lineProps: any = {
      hide,
      dataKey: name,
      stroke: color ?? 'black',
      strokeWidth: lineWidth ?? 1,
      type: curveType ?? 'linear',
      r: dots?.r ?? 3, // <--- 3 is recharts default!
      opacity: isLegendHovered ? (isLineHovered[name] ? 1 : 0.1) : undefined,
      // data, <--- don't put data here because if you do the line would not appear!
    };

    if (isDashed) lineProps.strokeDasharray = DASHED_LINE;

    return (
      <Line
        key={name}
        {...linesSettings.props}
        {...lineProps}
        hide={!visibleLines[name]}
        // This destruct below solves the pesky error of "Warning: A props object containing a "key" prop is being spread into JSX: let props = {key: someKey, r: ..., stroke: ..., strokeWidth: ..., opacity: ..., strokeDasharray: ..., fill: ..., width: ..., height: ..., value: ..., dataKey: ..., cx: ..., cy: ..., index: ..., payload: ..., data: ..., showChartValues: ..., showLineValues: ...};"
        dot={({ key, ...dotProps }) => (
          <NonActiveDot
            key={key}
            {...dotProps}
            data={data}
            hideDots={linesSettings.hideDots}
            showChartValues={generalSettings.showValues}
            showLineValues={showLineValues}
          />
        )}
        activeDot={(dotProps: any) => (
          <ActiveDot
            {...dotProps}
            data={data}
            showChartValues={generalSettings.showValues}
            showLineValues={showLineValues}
            onClick={(e: any) => onDotClick?.(dotProps, e)}
          />
        )}
      />
    );
  });
}
