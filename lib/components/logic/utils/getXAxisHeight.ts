import { X_AXIS_BASE_HEIGHT } from '../constants';

const TICK_HEIGHT = 1;

type GetRotationHeightProps = {
  maxTextWidth: number;
  thetaInDegrees?: number;
};

function getRotationHeight(props: GetRotationHeightProps) {
  const { thetaInDegrees, maxTextWidth } = props;

  if (!thetaInDegrees) return 0;

  const RECTANGLE = { height: TICK_HEIGHT, width: maxTextWidth };

  const thetaInRadians = thetaInDegrees * (Math.PI / 180);
  const initialThetaInRadians = Math.atan(RECTANGLE.height / RECTANGLE.width);
  const fixedThetaInRadians = thetaInRadians - initialThetaInRadians;

  const hypotenuse = Math.sqrt(RECTANGLE.height ** 2 + RECTANGLE.width ** 2);

  const rotationHeight = Math.abs(Math.sin(fixedThetaInRadians) * hypotenuse) / 2 + (thetaInDegrees <= 20 ? 6 : 0);

  return rotationHeight;
}

type GetHeightProps = {
  tickAngle: number;
  maxTextWidth: number;
  isLegendVisible: boolean;
  isSliderVisible: boolean;
  isXLabelVisible: boolean;
};

function getXAxisHeight(props: GetHeightProps): number | undefined {
  const { tickAngle: thetaInDegrees, maxTextWidth, isLegendVisible, isSliderVisible, isXLabelVisible } = props;

  const addRotationHeight = getRotationHeight({ thetaInDegrees, maxTextWidth });

  if (!isXLabelVisible && !isLegendVisible && !isSliderVisible) return X_AXIS_BASE_HEIGHT + addRotationHeight;
  if (isXLabelVisible && !isLegendVisible && !isSliderVisible) return 20 + addRotationHeight;
  if (!isXLabelVisible && isLegendVisible && !isSliderVisible) return 30 + addRotationHeight;
  if (!isXLabelVisible && !isLegendVisible && isSliderVisible) return 35 + addRotationHeight;
  if (isXLabelVisible && isLegendVisible && !isSliderVisible) return 20 + addRotationHeight;
  if (isXLabelVisible && !isLegendVisible && isSliderVisible) return 35 + addRotationHeight;
  if (!isXLabelVisible && isLegendVisible && isSliderVisible) return 35 + addRotationHeight;
  if (isXLabelVisible && isLegendVisible && isSliderVisible) return 35 + addRotationHeight;
}

export { getXAxisHeight };
