import { useState } from 'react';
import { getNamesObject } from '../utils/getNamesObject';
import type { BarSeries, LineSeries, Payload } from '../../types';

type UseLegendLogicProps = {
  data: Array<LineSeries | BarSeries>;
};

export function useLegendLogic(props: UseLegendLogicProps) {
  const { data } = props;

  const [isLegendHovered, setIsLegendHovered] = useState(false);
  const [isSeriesHovered, setIsSeriesHovered] = useState(() => getNamesObject(data));
  const [visibleSeries, setVisibleSeries] = useState(() => getNamesObject(data, true));

  const onLegendMouseEnter = (payload: Payload) => {
    const seriesName = payload.dataKey as string;

    if (!visibleSeries[seriesName]) return;

    setIsLegendHovered(true);
    setIsSeriesHovered((prevState) => ({ ...prevState, [seriesName]: true }));
  };

  const onLegendMouseLeave = (payload: Payload) => {
    const seriesName = payload.dataKey as string;

    if (!visibleSeries[seriesName]) return;

    setIsLegendHovered(false);

    setIsSeriesHovered((prevState) => ({ ...prevState, [seriesName]: false }));
  };

  const onLegendClick = (payload: Payload) => {
    const seriesName = payload.dataKey as string;

    if (visibleSeries[seriesName]) setIsLegendHovered(false);

    setVisibleSeries((prevState) => ({ ...prevState, [seriesName]: !prevState[seriesName] }));
  };

  return { isLegendHovered, isSeriesHovered, visibleSeries, onLegendMouseEnter, onLegendMouseLeave, onLegendClick };
}
