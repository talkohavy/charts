const formatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric', // day in month
  hour: 'numeric', // 2-digit/numeric - same result
  minute: 'numeric', // 2-digit/numeric - same result
  month: 'short', // long = 'November', short = 'Nov', narrow = 'N', 2-digit/numeric = '11'.
  second: 'numeric', // 2-digit/numeric - same result
  year: 'numeric', // numeric = '2024', 2-digit = '24'
  hour12: true, // should display hour in modulus 12
  weekday: 'long', // long = 'Sunday', short = 'Sun', narrow = 'S'
  // dayPeriod: 'narrow', // any value here would result at 'at night'.
});

function getTimeParts(datetime: number) {
  const parts = formatter.formatToParts(datetime);

  const weekday = parts[0].value;
  const monthName = parts[2].value;
  const dayInMonth = parts[4].value;
  const year = parts[6].value;
  const hours = parts[8].value;
  const minutes = parts[10].value;
  const seconds = parts[12].value;
  const amPm = parts[14].value;

  return {
    year,
    monthName,
    dayInMonth,
    hours,
    minutes,
    seconds,
    amPm,
    weekday,
  };
}

export function formatDateAndTime(datetime: number) {
  const { monthName, dayInMonth, hours, minutes, amPm } = getTimeParts(datetime);

  return `${monthName} ${dayInMonth}, ${hours}:${minutes}${amPm.toLowerCase()}`;
}

export function formatDateAndMonth(datetime: number) {
  const { monthName, dayInMonth } = getTimeParts(datetime);

  return `${monthName} ${dayInMonth}`;
}
