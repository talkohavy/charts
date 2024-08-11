import { BarSeries, LineSeries } from '../types';

/**
 * @throws An Error.
 */
function validateUniqueNamesOnDataSets(allSeries: Array<BarSeries | LineSeries>) {
  for (let i = 0; i < allSeries.length - 1; i++) {
    for (let j = i + 1; j < allSeries.length; j++) {
      if ((allSeries[i] as any).name === (allSeries[j] as any).name)
        throw new Error(`Two series CANNOT have the same name! Saw '${(allSeries[i] as any).name}' twice.`);
    }
  }
}

/**
 * @throws An Error.
 */
function validateXAxisValuesAreSameType(allSeries: Array<BarSeries | LineSeries>) {
  let currentType = null;
  let prevType: any = null;

  allSeries.forEach((currentSeries) => {
    currentSeries.data.forEach(({ x }) => {
      currentType = typeof x;

      if (prevType !== null && prevType !== currentType)
        throw new Error('All X values on all series MUST be of the same type!');

      prevType = currentType;
    });
  });
}

/**
 * @throws An Error.
 */
function validateNameExists(series: BarSeries | LineSeries) {
  if (!series.name) throw new Error('All series MUST have a `name` property on them!');
}

/**
 * @throws An Error.
 */
function validateDataExists(series: BarSeries | LineSeries) {
  if (!series.data)
    throw new Error(`All series MUST have a 'data' property on them! Could not find 'data' on series ${series.name}`);
}

/**
 * @throws An Error.
 */
function runValidationsOnAllSeries(allSeries: Array<BarSeries | LineSeries>) {
  if (!allSeries) throw new Error(`chart data was not defined... allSeries was ${allSeries}`);

  allSeries.forEach((series) => {
    validateNameExists(series);
    validateDataExists(series);
  });

  validateXAxisValuesAreSameType(allSeries);
  validateUniqueNamesOnDataSets(allSeries);
}

export { runValidationsOnAllSeries };
