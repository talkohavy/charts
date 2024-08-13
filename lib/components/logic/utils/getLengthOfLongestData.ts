import { BarSeries, LineSeries } from '../../../types';

function getLengthOfLongestData(dataArr: Array<LineSeries | BarSeries>) {
  return dataArr.reduce((maxLength, { data }) => {
    if (maxLength < data.length) return data.length;

    return maxLength;
  }, 0);
}

export { getLengthOfLongestData };
