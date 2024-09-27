type ActiveShapeProps = {
  color: string;
  activeOuterArcPath: string;
};

export default function ActiveShape(props: ActiveShapeProps) {
  const { color, activeOuterArcPath } = props;

  // Part 1: The outer arc
  return <path d={activeOuterArcPath} stroke='none' fill={color} />;
}
