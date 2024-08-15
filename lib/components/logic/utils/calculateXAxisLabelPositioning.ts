import { BRUSH_HEIGHT, LEGEND_HEIGHT } from '../constants';

type CalculateXAxisLabelPositioningProps = {
  showLegend: boolean;
  showZoomSlider: boolean;
};

function calculateXAxisLabelPositioning(props: CalculateXAxisLabelPositioningProps) {
  const { showLegend, showZoomSlider } = props;

  let xLabelGoesDownBy = 10;

  if (showLegend) xLabelGoesDownBy += LEGEND_HEIGHT;

  if (showZoomSlider) xLabelGoesDownBy += BRUSH_HEIGHT;

  return xLabelGoesDownBy;
}

export { calculateXAxisLabelPositioning };
