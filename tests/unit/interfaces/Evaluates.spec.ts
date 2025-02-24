import { isEvaluates } from "../../../src/interfaces/Evaluates";

// --------------------------------------------------------------------

describe("isEvaluates", () => {
  const _p = (
    enthusiasm: unknown,
    innovative: unknown,
    story: unknown,
    media: unknown,
    easy: unknown,
    other: unknown,
  ) => {
    return {
      enthusiasm: enthusiasm,
      innovative: innovative,
      story: story,
      media: media,
      easy: easy,
      other: other,
    };
  };

  test("OKパターン", () => {
    const suites = [
      // params
      _p(1, 2, 3, 4, 5, 6),
      _p(5, 6, 7, 8, 9, 10),
      _p(5, 6, 7, 8, 9, 0),
    ];

    for (const suite of suites) {
      expect(isEvaluates(suite)).toBeTruthy();
    }
  });

  test("NGパターン", () => {
    const suites = [
      // params
      _p(null, null, null, null, null, null), // null
      _p("a", "b", "c", "d", "e", "f"), // 文字
      _p(0, -1, -2, -3, -4, -5), // マイナス
      _p(11, 12, 13, 14, 15, 16), // 10超過

      { aaa: "hoge" },

      "a",
      1,
      null,
    ];

    for (const suite of suites) {
      expect(isEvaluates(suite)).toBeFalsy();
    }
  });
});
