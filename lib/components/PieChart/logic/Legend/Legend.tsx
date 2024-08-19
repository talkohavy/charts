import { formatLabel } from '../../../logic/utils';
import styles from './Legend.module.scss';

type LegendProps = {
  pieChartData: Array<{ name: string; color: string }>;
  setSlicesOverrides: (value: any) => void;
};

export default function Legend(props: LegendProps) {
  const { pieChartData, setSlicesOverrides } = props;

  return (
    <div className={styles.legend}>
      <div className={styles.legendScrollbar}>
        <div className={styles.legendContent}>
          {pieChartData.map(({ name, color }, index) => (
            <div
              key={index}
              className={styles.legendContentItem}
              onMouseEnter={() =>
                setSlicesOverrides((prevArr: Array<any>) =>
                  prevArr.with(index, {
                    ...prevArr[index],
                    active: true,
                    // color: 'black'
                  }),
                )
              }
              onMouseLeave={() =>
                setSlicesOverrides((prevArr: Array<any>) =>
                  prevArr.with(index, {
                    ...prevArr[index],
                    active: false,
                    // color: undefined,
                  }),
                )
              }
            >
              <div className={styles.legendContentItemIcon} style={{ backgroundColor: color }} />

              <div className={styles.legendContentItemLabel} style={{ color }}>
                {formatLabel(name)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
