import styles from './BarChart.module.scss';

type BarChartProps = {
  name: string;
};

export default function BarChart(props: BarChartProps) {
  console.log('props is:', props);

  return <div className={styles.barChart}>BarChart</div>;
}
