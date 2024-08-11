import styles from './LineChart.module.scss';

type LineChartProps = {
  name: string;
};

export default function LineChart(props: LineChartProps) {
  console.log('props is:', props);

  return <div className={styles.lineChart}>LineChart</div>;
}
