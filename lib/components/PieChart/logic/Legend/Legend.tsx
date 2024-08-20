import { formatLabel } from '../../../logic/utils';
import { PieChartDrawData } from '../../types';
import styles from './Legend.module.scss';

type LegendProps = {
  pieChartData: Array<PieChartDrawData>;
  setActiveSlice: (value: PieChartDrawData) => void;
};

export default function Legend(props: LegendProps) {
  const { pieChartData, setActiveSlice } = props;

  return (
    <div className={styles.legend}>
      <div className={styles.legendScrollbar}>
        <div className={styles.legendContent}>
          {pieChartData.map((pieSlice, index) => {
            const { name, color } = pieSlice;

            return (
              <div
                key={index}
                className={styles.legendContentItem}
                onMouseEnter={() => setActiveSlice(pieSlice)}
                onMouseLeave={() => setActiveSlice({} as PieChartDrawData)}
              >
                <div className={styles.legendContentItemIcon} style={{ backgroundColor: color }} />

                <div className={styles.legendContentItemLabel} title={name} style={{ color }}>
                  {formatLabel(name)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
