import { useMemo, useState } from 'react';
import clsx from 'clsx';
import ActiveShape from './logic/ActiveShape';
import { CLASSES, PIE_CHART } from './logic/constants';
import PieChartLegend from './logic/Legend';
import PercentLabelInSlice from './logic/PercentLabelInSlice/PercentLabelInSlice';
import PieSliceComponent from './logic/PieSlice';
import PieTooltip from './logic/PieTooltip';
import { getFontSizeFrom, getMergedPieChartSettings, getPieChart } from './logic/utils';
import styles from './PieChart.module.scss';
import { PieChartDrawData, PieChartSettings, PieSlice } from './types';

type PieChart = {
  data: Array<PieSlice>;
  settings?: PieChartSettings;
  className?: string;
};

export default function PieChart(props: PieChart) {
  const { data, settings: settingsToMerge, className } = props;

  const [activeSlice, setActiveSlice] = useState({} as PieChartDrawData);

  const { data: pieChartData, radius } = useMemo(() => {
    const radius = PIE_CHART.radius.large;

    const sortedData = data.toSorted((a: any, b: any) => (a.value > b.value ? -1 : 1));

    const sortedPiChartData = getPieChart({ data: sortedData, radius });

    return { data: sortedPiChartData, radius };
  }, [data]);

  const chartSettings = useMemo(() => getMergedPieChartSettings({ settings: settingsToMerge }), [settingsToMerge]);

  return (
    <div className={clsx(CLASSES.pieChart, styles.pieChart, className)}>
      {chartSettings.legend.show && (
        <PieChartLegend pieChartData={pieChartData} setActiveSlice={setActiveSlice} {...chartSettings.legend.props} />
      )}

      <svg
        viewBox={`0 0 ${PIE_CHART.width} ${PIE_CHART.height}`}
        xmlns='http://www.w3.org/2000/svg'
        style={{ fontFamily: 'Hiragino Sans GB,Arial,sans-serif' }}
      >
        {pieChartData.map((pieSlice, index) => {
          const { name, percent, percentFormatted, color, middleDirection, activeOuterArcPath, path } = pieSlice;

          const labelDistanceFromCenter = 0.9 - 0.65 * percent; // <--- range of values goes between 25% - 90% of R from the center.
          const fontSize = getFontSizeFrom({ percent });

          return (
            <g
              key={index}
              onMouseEnter={() => setActiveSlice(pieSlice)}
              onMouseLeave={() => setActiveSlice({} as PieChartDrawData)}
            >
              <PieSliceComponent path={path} color={color} isActive={name === activeSlice.name} />

              {percent > 0.01 && (
                <PercentLabelInSlice
                  radius={radius}
                  percentFormatted={percentFormatted}
                  middleDirection={middleDirection}
                  labelDistanceFromCenter={labelDistanceFromCenter}
                  fontSize={fontSize}
                />
              )}

              {activeSlice.name === name && <ActiveShape color={color} activeOuterArcPath={activeOuterArcPath} />}
            </g>
          );
        })}

        {activeSlice.name && (
          <PieTooltip
            name={activeSlice.name}
            radius={radius}
            value={activeSlice.value}
            color={activeSlice.color}
            percentFormatted={activeSlice.percentFormatted}
            middleDirection={activeSlice.middleDirection}
            {...chartSettings.tooltip.props}
          />
        )}
      </svg>
    </div>
  );
}
