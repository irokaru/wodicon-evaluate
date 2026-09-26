import { buildShareText, buildShareUrl } from "../../../src/lib/ShareText";

describe("buildShareText", () => {
  test("従来のシェア文面と同一", () => {
    const result = buildShareText({
      voteCount: 2,
      labels: ["熱中", "斬新", "物語", "画像音声", "遊びやすさ", "その他"],
      averages: [5, 6, 7, 8, 9, 1],
      medians: [5, 6, 7, 8, 9, 1],
      totals: [10, 12, 14, 16, 18, 2],
    });

    expect(result).toEqual(
      "投票数: 2\n" +
        "項目: 熱中 斬新 物語 画像音声 遊びやすさ その他\n" +
        "平均値: 5 6 7 8 9 1\n" +
        "中央値: 5 6 7 8 9 1\n" +
        "合計値: 10 12 14 16 18 2\n" +
        "#ウディコン評価算出機\n" +
        "https://wodicon-evaluate.nononotyaya.net/",
    );
  });
});

describe("buildShareUrl", () => {
  test("X intentのURLを組み立てる", () => {
    expect(buildShareUrl("a b")).toEqual(
      "https://x.com/intent/post?text=a%20b",
    );
  });
});
