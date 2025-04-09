type GetFontSizeFromProps = {
  percent: number;
  showActiveShape?: boolean;
};

/**
 * @description
 * 100% is actually 1.
 */
export function getFontSizeFrom(props: GetFontSizeFromProps) {
  const { percent } = props;

  // No matter if big pieChart or small pieChart, Pie slices below 2% are 24px:
  if (percent <= 0.03) return 24;

  // PieChart is large version:
  return 40;
}
