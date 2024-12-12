import clsx from 'clsx';
import { CustomTickFormatterFunc } from '../../types';
import { CLASSES } from '../constants';
import { formatLabel } from '../utils/formatters';
import styles from './CustomTooltip.module.scss';
import type { TooltipProps } from 'recharts';

type CustomTooltipProps = TooltipProps<number | string | Array<number | string>, number | string> & {
  ySuffix: string;
  xValueFormatter: CustomTickFormatterFunc;
  nameFormatter: (name: string) => string;
};

export default function CustomTooltip(props: CustomTooltipProps) {
  const { active, payload, label, separator, nameFormatter, xValueFormatter, ySuffix } = props;

  if (active && payload && payload.length) {
    const formattedXLabel = xValueFormatter(label);

    return (
      <div className={clsx(CLASSES.tooltip, styles.customTooltip)}>
        <p className={styles.customTooltipHeader}>{formattedXLabel}</p>

        <ul className={styles.customTooltipItemsList}>
          {payload.map((item, index) => {
            const { name, value, color, unit } = item;

            const formattedValue = formatLabel(value);
            const formattedName = nameFormatter(name as string);

            return (
              <li key={index} style={{ color }}>
                <span>{formattedName}</span>
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
