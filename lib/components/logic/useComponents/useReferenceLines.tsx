import { ReferenceLine } from 'recharts';
import { ReferenceLine as IReferenceLine } from '../../types';

type UseReferenceLinesProps = {
  data?: Array<IReferenceLine>;
  settings: any;
};

export function useReferenceLines(props: UseReferenceLinesProps) {
  const { data, settings } = props;

  return (
    <>
      {data?.map((referenceLine, index) => {
        const { x, y, label, lineWidth, lineColor, isDashed } = referenceLine;

        const referenceLineProps: any = {
          x,
          y,
          label,
          stroke: lineColor ?? '#666',
          strokeWidth: lineWidth ?? 1,
        };

        if (isDashed) referenceLineProps.strokeDasharray = '10 10';

        return <ReferenceLine key={index} {...settings.props} {...referenceLineProps} />;
      })}
    </>
  );
}
