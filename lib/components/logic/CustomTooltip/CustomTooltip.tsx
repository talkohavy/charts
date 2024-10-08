import clsx from 'clsx';
import { CustomTickFormatterFunc } from '../../types';
import { CLASSES } from '../constants';
import { formatLabel } from '../utils/formatters';
import styles from './CustomTooltip.module.scss';
import type { TooltipProps } from 'recharts';

type CustomTooltipProps = TooltipProps<number | string | Array<number | string>, number | string> & {
  ySuffix: string;
  xValueFormatter: CustomTickFormatterFunc;
};

export default function CustomTooltip(props: CustomTooltipProps) {
  const { active, payload, label, separator, xValueFormatter, ySuffix } = props;

  if (active && payload && payload.length) {
    const formattedXLabel = xValueFormatter(label);

    return (
      <div className={clsx(CLASSES.tooltip, styles.customTooltip)}>
        <p className={styles.customTooltipHeader}>{formattedXLabel}</p>

        <ul className={styles.customTooltipItemsList}>
          {payload.map(({ name, value, color, unit }, index) => {
            const formattedValue = formatLabel(value);

            return (
              <li key={index} style={{ color }}>
                <span>{name}</span>
                <span>{separator}</span>
                <span>{formattedValue}</span>
                <span>{unit ?? ySuffix}</span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return null;
}
