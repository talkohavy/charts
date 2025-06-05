import { Bar, Cell, LabelList } from 'recharts';
import { ACTIVE_BAR_COLOR, DEFAULT_BAR_COLOR } from '../../BarChart/logic/constants';
import { BarClickEventProps, BarSeries } from '../../types';
import CustomizedLabel from '../CustomizedLabel';

type UseBarsProps = {
  data: Array<BarSeries>;
  barsSettings: any;
  visibleBars: Record<string, boolean>;
  onClickBar: ((props: BarClickEventProps & { name: string; barTypeIndex: number }) => void) | undefined;
  activeBarId?: string;
  isLegendHovered: boolean;
  isBarTypeHovered: Record<string, boolean>;
};

export function useBars(props: UseBarsProps) {
  const { data, barsSettings, visibleBars, onClickBar, activeBarId, isLegendHovered, isBarTypeHovered } = props;

  return data.map(({ name, data, unit, color, barBorderColor, stackId }, index) => {
    const barColorInLegend = color ?? DEFAULT_BAR_COLOR;

    const barProps = {
      fill: barColorInLegend,
      stroke: barBorderColor,
      dataKey: name,
      stackId,
      unit,
      hide: !visibleBars[name],
      onClick: (props: any, index: number) => onClickBar?.({ ...props, barTypeIndex: index, name }),
    };

    return (
      <Bar key={`${name}-${index}`} {...barsSettings.props} {...barProps}>
        {barsSettings.general.showValues && (
          <LabelList dataKey={name} fontSize={11} position={stackId ? 'center' : 'top'} content={CustomizedLabel} />
        )}

        {data.map((bar: any) => {
          const { x, color: specificColor } = bar;

          const barId = `${name}-${x}`;

          const cellProps = {
            fill: barId === activeBarId ? ACTIVE_BAR_COLOR : (specificColor ?? color ?? DEFAULT_BAR_COLOR),
            opacity: isLegendHovered ? (isBarTypeHovered[name] ? 1 : 0.2) : undefined,
            cursor: onClickBar && 'pointer',
          };

          return <Cell key={barId} {...cellProps} />;
        })}
      </Bar>
    );
  });
}
