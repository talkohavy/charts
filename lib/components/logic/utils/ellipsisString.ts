type EllipsisStringProps = {
  str: string;
  maxStringLength: number;
};

function ellipsisString(props: EllipsisStringProps): string {
  const { str, maxStringLength = 8 } = props;

  const updatedString = str.length > maxStringLength ? str.substring(0, maxStringLength).concat('..') : str;

  return updatedString;
}

export { ellipsisString };
