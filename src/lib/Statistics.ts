export const totalArray = (array: number[]): number => {
  if (!array.length) return 0;

  return array.reduce((prev, current) => prev + current, 0);
};

export const averageArray = (array: number[]): number => {
  if (!array.length) return 0;

  return totalArray(array) / array.length;
};

export const medianArray = (array: number[]): number => {
  if (!array.length) return 0;

  const sorted = [...array].sort((a, b) => a - b);

  if (sorted.length % 2 === 1) {
    return sorted[Math.floor(sorted.length / 2)] as number;
  }

  const rightIndex = sorted.length / 2;
  const left = sorted[rightIndex - 1] as number;
  const right = sorted[rightIndex] as number;
  return (left + right) / 2;
};

export const roundDigit = (num: number, digit: number): number => {
  const power = Math.pow(10, digit);
  const upper = num * power;
  return Math.round(upper) / power;
};
