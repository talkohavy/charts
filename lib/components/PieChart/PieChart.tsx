import { useMemo, useState } from 'react';
import clsx from 'clsx';
import ActiveShape from './logic/ActiveShape/ActiveShape';
import { PIE_CHART } from './logic/constants';
import { getFontSizeFrom, getPieChart } from './logic/helpers';
import PieChartLegend from './logic/Legend/Legend';
import PercentLabelInSlice from './logic/PercentLabelInSlice/PercentLabelInSlice';
import PieSlice from './logic/PieSlice';
import styles from './PieChart.module.scss';
import { SinglePie } from './types';

type PieChart = {
  data: Array<SinglePie>;
  showActiveShape?: boolean;
};

export default function PieChart(props: PieChart) {
  const { data, showActiveShape = true } = props;

  const [slicesOverrides, setSlicesOverrides] = useState(() => Array.from(Array(data.length)));

  const { data: pieChartData, radius } = useMemo(() => {
    const radius = showActiveShape ? PIE_CHART.radius.small : PIE_CHART.radius.large;

    return { data: getPieChart({ data, radius }), radius };
  }, [data, showActiveShape, showActiveShape]);

  return (
    <div className={clsx('custom-pie-chart', styles.pieChart)}>
      <PieChartLegend pieChartData={pieChartData} setSlicesOverrides={setSlicesOverrides} />

      <svg
        viewBox={`0 0 ${PIE_CHART.width} ${PIE_CHART.height}`}
        xmlns='http://www.w3.org/2000/svg'
        style={{ fontFamily: 'Hiragino Sans GB,Arial,sans-serif' }}
      >
        {pieChartData.map((pieSlice, index) => {
          const { value, path, externalArcPath, middleDirection, percentFormatted, percent, color } = pieSlice;

          const currentSliceOverride = slicesOverrides?.at(index) ?? {};
          const labelDistanceFromCenter = 0.9 - 0.65 * percent; // <--- range of values goes between 25% - 90% of R from the center.
          const fontSize = getFontSizeFrom({ percent, showActiveShape });

          return (
            <g
              key={index}
              onMouseEnter={() =>
                setSlicesOverrides((prevArr) =>
                  prevArr.with(index, {
                    ...prevArr[index],
                    active: true,
                    fill: '#333',
                    // transform: `translate(${middleDirection.xDirection * 20},${middleDirection.yDirection * 20})`,
                  }),
                )
              }
              onMouseLeave={() =>
                setSlicesOverrides((prevArr) =>
                  prevArr.with(index, {
                    ...prevArr[index],
                    active: false,
                    fill: color,
                    // transform: 'translate(0)'
                  }),
                )
              }
            >
              <PieSlice path={path} color={color} currentSliceOverride={currentSliceOverride} />

              {percent > 0.01 && (
                <PercentLabelInSlice
                  radius={radius}
                  percentFormatted={percentFormatted}
                  middleDirection={middleDirection}
                  labelDistanceFromCenter={labelDistanceFromCenter}
                  fontSize={fontSize}
                />
              )}

              <ActiveShape
                radius={radius}
                isActive={currentSliceOverride.active}
                showFullShape={showActiveShape}
                value={value}
                color={color}
                externalArcPath={externalArcPath}
                percent={percent}
                middleDirection={middleDirection}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
