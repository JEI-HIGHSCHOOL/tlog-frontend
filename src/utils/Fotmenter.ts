export function formatNumber(value: number): string {
  if (!value) return '0';
  const suffixes = ['', '만', '억', '조', '해'];
  const suffixNum = Math.floor(('' + value).length / 4);
  let shortValue: string | number = parseFloat(
    (suffixNum != 0 ? value / Math.pow(10000, suffixNum) : value).toPrecision(2)
  );
  if (shortValue % 1 != 0) {
    shortValue = shortValue.toFixed(1);
  }
  if (suffixNum === 1 && shortValue < 1) return Number(shortValue) * 10 + '천';
  else if (shortValue === 1000) return '1천';
  return shortValue + suffixes[suffixNum];
}

export function toStringByFormatting(date: Date, delimiter = '-') {
  const year = date.getFullYear();
  const month = leftPad(date.getMonth() + 1);
  const day = leftPad(date.getDate());

  return [year, month, day].join(delimiter);
}

function leftPad(value: any) {
  if (value >= 10) {
    return value;
  }

  return `0${value}`;
}
