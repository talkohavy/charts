import { ReferenceLine } from 'recharts';
import type { ReferenceLine as IReferenceLine } from '../../types';
import type { ResolvedReferenceLinesSettings } from '../../types';
import { ThemeColors } from '../constants';

type UseReferenceLinesProps = {
  data?: IReferenceLine[];
  settings: ResolvedReferenceLinesSettings;
};

export function useReferenceLines(props: UseReferenceLinesProps) {
  const { data, settings } = props;

  return data?.map((referenceLine, index) => {
    const { x, y, label, lineWidth, lineColor, isDashed } = referenceLine;

    const referenceLineProps: any = {
      x,
      y,
      label,
      stroke: lineColor ?? `var(${ThemeColors.ReferenceLineColor})`,
      strokeWidth: lineWidth ?? 1,
    };

    if (isDashed) referenceLineProps.strokeDasharray = '10 10';

    return <ReferenceLine key={index} {...settings.props} {...referenceLineProps} />;
  });
}
