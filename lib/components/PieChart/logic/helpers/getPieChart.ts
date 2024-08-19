import { COLORS } from '../../../logic/constants';
import { PieChartDrawData, SinglePie } from '../../types';
import { getSliceData } from './getSliceData';

type GetPieChartProps = {
  data: Array<SinglePie>;
  radius: number;
};

function getPieChart(props: GetPieChartProps): Array<PieChartDrawData> {
  const { data, radius } = props;

  const sum = data.reduce((acc, curItem) => acc + curItem.value, 0);

  const pieChartDrawData: Array<any> = data.map((curItem, index) => {
    const percent = curItem.value / sum;

    return {
      ...curItem,
      color: curItem.color ?? COLORS[index % COLORS.length],
      percent,
      percentFormatted: Math.floor(percent * 100),
      angle: percent * 2 * Math.PI,
    };
  });

  // Calc start & end angles for every slice
  pieChartDrawData[0].startAngle = 0;
  pieChartDrawData[0].endAngle = pieChartDrawData[0].angle;
  for (let i = 1; i < pieChartDrawData.length; i++) {
    pieChartDrawData[i].startAngle = pieChartDrawData[i - 1].endAngle;
    pieChartDrawData[i].endAngle = pieChartDrawData[i - 1].endAngle + pieChartDrawData[i].angle;
  }

  const piChartData = pieChartDrawData.map((item) => {
    const { startAngle, endAngle } = item;

    const sliceData = getSliceData({ startAngle, endAngle, radius });

    return { ...item, ...sliceData };
  });

  return piChartData;
}

export { getPieChart };
