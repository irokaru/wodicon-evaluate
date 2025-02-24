import * as fs from "fs";
import * as path from "path";

import { EvaluateRow } from "../../../src/interfaces/EvaluateRow";
import {
  text2EvaluateRowArray,
  text2EvaluateRow,
} from "../../../src/lib/EvaluateText";

// --------------------------------------------------------------------

describe("text2EvaluateRowArray", () => {
  test("実データを利用した集計", async () => {
    const filepath = path.join(__dirname, "../../text/evaluate_ok.txt");
    const text = fs.readFileSync(filepath, "utf-8").toString();

    const result = text2EvaluateRowArray(text);

    expect(result).toHaveLength(114);
  });

  test("空文字を利用した集計", async () => {
    const text = "\n\n\n\n\n";

    const result = text2EvaluateRowArray(text);

    expect(result).toHaveLength(0);
  });
});

describe("text2EvaluateRow", () => {
  const _p = (
    name: string,
    enthusiasm = 0,
    innovative = 0,
    story = 0,
    media = 0,
    easy = 0,
    other = 0,
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
      [
        _p("ウルファールさん", 1, 10, 4, 2, 6, 4),
        "[ウルファールさん 熱中1-斬新10-物語4-画像音声2-遊びやすさ6-その他+4]",
      ],
      [
        _p("エディ", 1, 2, 10, 2, 6, 4),
        "[エディ 熱中1-斬新2-物語10-画像音声2-遊びやすさ6-その他+4]",
      ],
      [
        _p("ハカセ", 1, 2, 5, 10, 6, 4),
        "[ハカセ 熱中1-斬新2-物語5-画像音声10-遊びやすさ6-その他+4]",
      ],
      [
        _p("ター", 1, 2, 5, 8, 10, 4),
        "[ター 熱中1-斬新2-物語5-画像音声8-遊びやすさ10-その他+4]",
      ],
      [
        _p("コックさん", 1, 2, 5, 8, 2, 10),
        "[コックさん 熱中1-斬新2-物語5-画像音声8-遊びやすさ2-その他+10]",
      ],
      [
        _p("ウディタ", 1, 2, 5, 8, 2, 0),
        "[ウディタ 熱中1-斬新2-物語5-画像音声8-遊びやすさ2-その他+0]",
      ],
    ];

    for (const suite of suites) {
      expect(text2EvaluateRow(suite[1])).toEqual(suite[0]);
    }
  });

  test("値に1～10以外の評価が入っているパターン", () => {
    const suites: [EvaluateRow, string][] = [
      // expect, text
      [
        _p("ゼロ埋め"),
        "[ゼロ埋め 熱中0-斬新0-物語0-画像音声0-遊びやすさ0-その他+0]",
      ],
      [
        _p("マイナス"),
        "[マイナス 熱中-1-斬新-2-物語-3-画像音声-4-遊びやすさ-5-その他+-6]",
      ],
      [
        _p("10超過"),
        "[10超過 熱中-11-斬新-12-物語-31-画像音声-43-遊びやすさ-50-その他+64]",
      ],
      [
        _p("0パディング"),
        "[0パディング 熱中-01-斬新-02-物語-03-画像音声-04-遊びやすさ-05-その他+06]",
      ],
      [
        _p("全角数字"),
        "[全角数字 熱中-１-斬新-２-物語-３-画像音声-４-遊びやすさ-５-その他+６]",
      ],
      [
        _p("日本語"),
        "[日本語 熱中-い-斬新-ろ-物語-は-画像音声-に-遊びやすさ-ほ-その他+へ]",
      ],
      [
        _p("からっぽ"),
        "[からっぽ 熱中--斬新--物語--画像音声--遊びやすさ--その他+]",
      ],
    ];

    for (const suite of suites) {
      expect(text2EvaluateRow(suite[1])).toEqual(suite[0]);
    }
  });

  test("紛らわしいものたち", () => {
    const suites: [EvaluateRow, string][] = [
      // expect, text
      [_p("-"), "[]"],
      [_p("-"), ""],
      [_p("-"), "[これはダミーのやつですよ]"],
    ];

    for (const suite of suites) {
      expect(text2EvaluateRow(suite[1])).toEqual(suite[0]);
    }
  });
});
