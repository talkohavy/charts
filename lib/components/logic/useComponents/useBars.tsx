import { Bar, LabelList, Rectangle } from 'recharts';
import { ACTIVE_BAR_COLOR, DEFAULT_BAR_COLOR } from '../../BarChart/logic/constants';
import CustomizedLabel from '../CustomizedLabel';
import type { BarClickEventProps, BarSeries, GeneralSettings, ResolvedBarsSettings } from '../../types';
import type { BarShapeProps } from 'recharts';

type UseBarsProps = {
  data: Array<BarSeries>;
  generalSettings: GeneralSettings;
  barsSettings: ResolvedBarsSettings;
  visibleBars: Record<string, boolean>;
  onClickBar: ((props: BarClickEventProps & { name: string; barTypeIndex: number }) => void) | undefined;
  activeBarId?: string;
  isLegendHovered: boolean;
  isBarTypeHovered: Record<string, boolean>;
};

export function useBars(props: UseBarsProps) {
  const {
    data,
    barsSettings,
    generalSettings,
    visibleBars,
    onClickBar,
    activeBarId,
    isLegendHovered,
    isBarTypeHovered,
  } = props;

  return data.map(({ name, data, unit, color, barBorderColor, stackId }, index) => {
    const barColorInLegend = color ?? DEFAULT_BAR_COLOR;

    const barShape = (shapeProps: BarShapeProps) => {
      const xValue = shapeProps.payload?.x;
      const specificColor = data.find((item) => item.x === xValue)?.color;
      const barId = `${name}-${xValue}`;

      return (
        <Rectangle
          {...shapeProps}
          fill={barId === activeBarId ? ACTIVE_BAR_COLOR : (specificColor ?? color ?? DEFAULT_BAR_COLOR)}
          opacity={isLegendHovered ? (isBarTypeHovered[name] ? 1 : 0.2) : undefined}
          cursor={onClickBar ? 'pointer' : undefined}
        />
      );
    };

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
      <Bar key={`${name}-${index}`} {...barsSettings.props} {...barProps} shape={barShape}>
        {generalSettings.showValues && (
          <LabelList dataKey={name} fontSize={11} position={stackId ? 'center' : 'top'} content={CustomizedLabel} />
        )}
      </Bar>
    );
  });
}
