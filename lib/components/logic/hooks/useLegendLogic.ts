import { useState } from 'react';
import { Payload } from 'recharts/types/component/DefaultLegendContent';
import { DataKey } from 'recharts/types/util/types';
import { getNamesObject } from '../utils';

type UseLegendLogicProps = {
  data: Array<any>;
};

export function useLegendLogic(props: UseLegendLogicProps) {
  const { data } = props;

  const [isLegendHovered, setIsLegendHovered] = useState(false);
  const [isSeriesHovered, setIsSeriesHovered] = useState(() => getNamesObject(data));
  const [visibleSeries, setVisibleSeries] = useState(() => getNamesObject(data, true));

  const onLegendMouseEnter = (payload: Payload & { dataKey?: DataKey<any> }) => {
    const seriesName = payload.dataKey as string;

    if (!visibleSeries[seriesName]) return;

    setIsLegendHovered(true);
    setIsSeriesHovered((prevState) => ({ ...prevState, [seriesName]: true }));
  };

  const onLegendMouseLeave = (payload: Payload & { dataKey?: DataKey<any> }) => {
    const seriesName = payload.dataKey as string;

    if (!visibleSeries[seriesName]) return;

    setIsLegendHovered(false);

    setIsSeriesHovered((prevState) => ({ ...prevState, [seriesName]: false }));
  };

  const onLegendClick = (payload: Payload & { dataKey?: DataKey<any> }) => {
    const seriesName = payload.dataKey as string;

    if (visibleSeries[seriesName]) setIsLegendHovered(false);

    setVisibleSeries((prevState) => ({ ...prevState, [seriesName]: !prevState[seriesName] }));
  };

  return { isLegendHovered, isSeriesHovered, visibleSeries, onLegendMouseEnter, onLegendMouseLeave, onLegendClick };
}
