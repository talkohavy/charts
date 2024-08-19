import clsx from 'clsx';
import styles from './PieSlice.module.scss';

type PieSliceProps = {
  path: string;
  color: string;
  isActive: boolean;
};

export default function PieSlice(props: PieSliceProps) {
  const { path, color, isActive } = props;

  return (
    <path
      fill={color}
      d={path}
      strokeWidth='4'
      stroke='white'
      className={clsx(styles.pieSlice, isActive && 'pie-chart-active-slice')}
    />
  );
}
