type PieSliceProps = {
  currentSliceOverride: any;
  path: string;
  color: string;
};

export default function PieSlice(props: PieSliceProps) {
  const { currentSliceOverride, path, color } = props;
  // eslint-disable-next-line
  const { active, ...restOfOverrideProps } = currentSliceOverride;

  return (
    <path fill={color} d={path} strokeWidth='4' stroke='white' className='duration-200' {...restOfOverrideProps} />
  );
}
