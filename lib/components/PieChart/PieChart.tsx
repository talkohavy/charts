import { useMemo, useState } from 'react';
import clsx from 'clsx';
import ActiveShape from './logic/ActiveShape/ActiveShape';
import { PIE_CHART } from './logic/constants';
import { getFontSizeFrom, getPieChart } from './logic/helpers';
import PieChartLegend from './logic/Legend';
import PercentLabelInSlice from './logic/PercentLabelInSlice/PercentLabelInSlice';
import PieSlice from './logic/PieSlice';
import PieTooltip from './logic/PieTooltip';
import styles from './PieChart.module.scss';
import { PieChartDrawData, SinglePie } from './types';

type PieChart = {
  data: Array<SinglePie>;
  showActiveShape?: boolean;
  className?: string;
};

export default function PieChart(props: PieChart) {
  const { data, showActiveShape = true, className } = props;

  const [activeSlice, setActiveSlice] = useState({} as PieChartDrawData);

  const { data: pieChartData, radius } = useMemo(() => {
    const radius = showActiveShape ? PIE_CHART.radius.small : PIE_CHART.radius.large;

    const sortedData = data.toSorted((a: any, b: any) => (a.value > b.value ? -1 : 1));

    const sortedPiChartData = getPieChart({ data: sortedData, radius });

    return {
      data: sortedPiChartData,
      radius,
    };
  }, [data, showActiveShape]);

  return (
    <div className={clsx('custom-pie-chart', styles.pieChart, className)}>
      <PieChartLegend pieChartData={pieChartData} setActiveSlice={setActiveSlice} />

      <svg
        viewBox={`0 0 ${PIE_CHART.width} ${PIE_CHART.height}`}
        xmlns='http://www.w3.org/2000/svg'
        style={{ fontFamily: 'Hiragino Sans GB,Arial,sans-serif' }}
      >
        {pieChartData.map((pieSlice, index) => {
          const { name, value, percent, percentFormatted, color, middleDirection, path, externalArcPath } = pieSlice;

          const labelDistanceFromCenter = 0.9 - 0.65 * percent; // <--- range of values goes between 25% - 90% of R from the center.
          const fontSize = getFontSizeFrom({ percent, showActiveShape });

          return (
            <g
              key={index}
              onMouseEnter={() => setActiveSlice(pieSlice)}
              onMouseLeave={() => setActiveSlice({} as PieChartDrawData)}
            >
              <PieSlice path={path} color={color} isActive={name === activeSlice.name} />

              {percent > 0.01 && (
                <PercentLabelInSlice
                  radius={radius}
                  percentFormatted={percentFormatted}
                  middleDirection={middleDirection}
                  labelDistanceFromCenter={labelDistanceFromCenter}
                  fontSize={fontSize}
                />
              )}

              {activeSlice.name === name && (
                <ActiveShape
                  radius={radius}
                  showFullShape={showActiveShape}
                  value={value}
                  color={color}
                  externalArcPath={externalArcPath}
                  percent={percent}
                  middleDirection={middleDirection}
                />
              )}
            </g>
          );
        })}

        {activeSlice.name && (
          <PieTooltip
            name={activeSlice.name}
            pieChartCenter={PIE_CHART.centerPoint}
            radius={radius}
            value={activeSlice.value}
            color={activeSlice.color}
            percentFormatted={activeSlice.percentFormatted}
            middleDirection={activeSlice.middleDirection}
          />
        )}
      </svg>
    </div>
  );
}
