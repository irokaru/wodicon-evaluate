export const totalArray = (array: number[]): number => {
  return array.reduce((prev, current) => prev + current);
};

export const averageArray = (array: number[]): number => {
  return totalArray(array) / array.length;
};

export const medianArray = (array: number[]): number => {
  const sorted = array.sort((a, b) => {
    if (a > b) return -1;
    if (b > a) return 1;
    return 0;
  });

  const mid = (sorted.length / 2) >> 0;

  if (mid % 2 === 1) return sorted[mid];

  return (sorted[mid - 1] + sorted[mid]) / 2;
};
