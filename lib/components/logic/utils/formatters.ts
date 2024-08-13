import { ellipsisString } from './ellipsisString';

const map = [
  { suffix: 'T', threshold: 1e12 },
  { suffix: 'B', threshold: 1e9 },
  { suffix: 'M', threshold: 1e6 },
  { suffix: 'K', threshold: 1e3 },
  { suffix: '', threshold: 1 },
];

type FormatNumberProps = { num: number; precision?: number };

function formatNumber(props: FormatNumberProps): string {
  const { num, precision = 2 } = props;

  const found = map.find((mapItem) => Math.abs(num) >= mapItem.threshold);
  if (found) {
    const precisionValue = 10 ** precision;
    const formatted = Math.round((num / found.threshold) * precisionValue) / precisionValue + found.suffix;

    return formatted;
  }

  return num.toString();
}

function formatLabel(value?: string | number, maxStringLength: number = 9): string | undefined {
  if (value == null) return undefined;

  if (typeof value === 'string') return ellipsisString({ str: value, maxStringLength });

  return formatNumber({ num: value });
}

/**
 * @description
 * The argument `date` is a unix timestamp in milliseconds, which means it's a number.
 * I didn't put number as the type, because of FORMATTERS. When calling FORMATTERS[type](value),
 * there's a mixture of types, and hence a typescript error.
 */
function formatDate(date: any): string {
  const formattedDate = Intl.DateTimeFormat('en-US').format(date);

  return formattedDate;
}

const FORMATTERS = {
  category: formatLabel,
  number: formatLabel,
  datetime: formatDate,
};

export { FORMATTERS, formatDate, formatLabel };
