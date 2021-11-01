import {
  averageArray,
  medianArray,
  roundDigit,
  totalArray,
} from "@/lib/MathUtil";

describe("totalArray", () => {
  test("test", () => {
    const suites: [number, number[]][] = [
      // expect, array
      [15, [1, 2, 3, 4, 5]],
      [-15, [-1, -2, -3, -4, -5]],
      [0, []],
    ];

    for (const suite of suites) {
      expect(totalArray(suite[1])).toEqual(suite[0]);
    }
  });
});

describe("acerageArray", () => {
  test("test", () => {
    const suites: [number, number[]][] = [
      // expect, array
      [3, [1, 2, 3, 4, 5]],
      [-3, [-1, -2, -3, -4, -5]],
      [0, []],
    ];

    for (const suite of suites) {
      expect(averageArray(suite[1])).toEqual(suite[0]);
    }
  });
});

describe("medianArray", () => {
  test("test", () => {
    const suites: [number, number[]][] = [
      // expect, array
      [3, [1, 2, 3, 4, 5]],
      [3.5, [1, 2, 3, 4, 5, 6]],

      [-3, [-1, -2, -3, -4, -5]],
      [-3.5, [-1, -2, -3, -4, -5, -6]],

      [2, [1, 1, 2, 2, 3, 3]],

      [0, []],
    ];

    for (const suite of suites) {
      expect(medianArray(suite[1])).toEqual(suite[0]);
    }
  });
});

describe("roundDigit", () => {
  test("test", () => {
    const suites: [number, number, number][] = [
      // expect, number, digit
      [0, 0, 1],

      [1.2, 1.23456789, 1],
      [1.23, 1.23456789, 2],
      [1.235, 1.23456789, 3],
      [1.2346, 1.23456789, 4],
      [1.23457, 1.23456789, 5],
      [1.234568, 1.23456789, 6],

      [2, 1.99999, 4],
    ];

    for (const suite of suites) {
      expect(roundDigit(suite[1], suite[2])).toEqual(suite[0]);
    }
  });
});
