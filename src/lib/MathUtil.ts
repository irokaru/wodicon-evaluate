export const totalArray = (array: number[]): number => {
  if (!array.length) return 0;

  return array.reduce((prev, current) => prev + current);
};

export const averageArray = (array: number[]): number => {
  if (!array.length) return 0;

  return totalArray(array) / array.length;
};

export const medianArray = (array: number[]): number => {
  if (!array.length) return 0;

  const sorted = array.sort((a, b) => {
    if (a < b) return -1;
    if (b < a) return 1;
    return 0;
  });

  const mid = (sorted.length / 2) >> 0;

  if (mid % 2 === 0) return sorted[mid];

  return (sorted[mid - 1] + sorted[mid]) / 2;
};

export const roundDigit = (num: number, digit: number): number => {
  const power = Math.pow(10, digit);
  const upper = num * power;
  return Math.round(upper) / power;
};
