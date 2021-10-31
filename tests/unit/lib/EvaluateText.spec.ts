import { EvaluateRow } from "@/interfaces/EvaluateRow";
import { text2EvaluateRowArray, text2EvaluateRow } from "@/lib/EvaluateText";

// --------------------------------------------------------------------

describe("text2EvaluateRow", () => {
  const _p = (
    name: string,
    enthusiasm: number,
    innovative: number,
    story: number,
    media: number,
    easy: number,
    other: number
  ): EvaluateRow => {
    return {
      name: name,
      score: {
        enthusiasm: enthusiasm,
        innovative: innovative,
        story: story,
        media: media,
        easy: easy,
        other: other,
      },
    };
  };

  test("良さげパターン", () => {
    const suites: [EvaluateRow, string][] = [
      // expect, text
      [
        _p("-", 1, 2, 3, 4, 5, 6),
        "[熱中1-斬新2-物語3-画像音声4-遊びやすさ5-その他+6]",
      ],
      [
        _p("-", 10, 5, 4, 2, 6, 4),
        "[熱中10-斬新5-物語4-画像音声2-遊びやすさ6-その他+4]",
      ],
    ];

    for (const suite of suites) {
      expect(text2EvaluateRow(suite[1])).toEqual(suite[0]);
    }
  });
});
