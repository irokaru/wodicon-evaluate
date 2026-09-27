import { EvaluateKey } from "@/constants/Evaluates";
import { useEvaluate } from "@/composables/useEvaluate";

describe("useEvaluate", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test("初期状態", () => {
    const vm = useEvaluate();

    expect(vm.text.value).toEqual("");
    expect(vm.evaluates.value).toEqual([]);
    expect(vm.isExecuted.value).toBe(false);
    expect(vm.evaluateKeys).toEqual(Object.values(EvaluateKey));
    expect(vm.summaries.map((s) => s.label)).toEqual([
      "平均値",
      "中央値",
      "合計値",
    ]);
  });

  test("execで有効票のみ集計しisExecutedが立つ", () => {
    const vm = useEvaluate();
    vm.text.value = [
      "[Aさん 熱中1-斬新2-物語3-画像音声4-遊びやすさ5-その他+6]",
      "これは感想文なので無視される",
      "[Bさん 熱中3-斬新4-物語5-画像音声6-遊びやすさ7-その他+8]",
      "",
    ].join("\n");

    vm.exec();

    expect(vm.evaluates.value).toHaveLength(2);
    expect(vm.evaluates.value[0]?.name).toEqual("Aさん");
    expect(vm.evaluates.value[1]?.name).toEqual("Bさん");
    expect(vm.isExecuted.value).toBe(true);
  });

  test("execで有効票がなければisExecutedはfalseのまま", () => {
    const vm = useEvaluate();
    vm.text.value = "感想だけ\n\nダミー[]";

    vm.exec();

    expect(vm.evaluates.value).toHaveLength(0);
    expect(vm.isExecuted.value).toBe(false);
  });

  test("execし直すと結果が置き換わる", () => {
    const vm = useEvaluate();
    vm.text.value = "[Aさん 熱中1-斬新2-物語3-画像音声4-遊びやすさ5-その他+6]";
    vm.exec();
    expect(vm.isExecuted.value).toBe(true);

    vm.text.value = "";
    vm.exec();
    expect(vm.evaluates.value).toHaveLength(0);
    expect(vm.isExecuted.value).toBe(false);
  });

  test("total/average/median/summariesの計算", () => {
    const vm = useEvaluate();
    vm.text.value = [
      "[Aさん 熱中1-斬新2-物語3-画像音声4-遊びやすさ5-その他+6]",
      "[Bさん 熱中3-斬新4-物語5-画像音声6-遊びやすさ7-その他+8]",
      "[Cさん 熱中2-斬新2-物語2-画像音声2-遊びやすさ2-その他+2]",
    ].join("\n");
    vm.exec();

    // 熱中: 1,3,2
    expect(vm.total(EvaluateKey.ENTHUSIASM)).toEqual(6);
    expect(vm.average(EvaluateKey.ENTHUSIASM)).toEqual(2);
    expect(vm.median(EvaluateKey.ENTHUSIASM)).toEqual(2);

    // 空状態のsummariesは0を返す
    const empty = useEvaluate();
    for (const summary of empty.summaries) {
      expect(summary.calc(EvaluateKey.ENTHUSIASM)).toEqual(0);
    }

    const byLabel = Object.fromEntries(
      vm.summaries.map((s) => [s.label, s.calc]),
    );
    expect(byLabel["平均値"]?.(EvaluateKey.ENTHUSIASM)).toEqual(
      vm.average(EvaluateKey.ENTHUSIASM),
    );
    expect(byLabel["中央値"]?.(EvaluateKey.ENTHUSIASM)).toEqual(
      vm.median(EvaluateKey.ENTHUSIASM),
    );
    expect(byLabel["合計値"]?.(EvaluateKey.ENTHUSIASM)).toEqual(
      vm.total(EvaluateKey.ENTHUSIASM),
    );
  });

  test("averageは小数第2位で丸める", () => {
    const vm = useEvaluate();
    vm.text.value = [
      "[Aさん 熱中1-斬新1-物語1-画像音声1-遊びやすさ1-その他+0]",
      "[Bさん 熱中2-斬新1-物語1-画像音声1-遊びやすさ1-その他+0]",
      "[Cさん 熱中2-斬新1-物語1-画像音声1-遊びやすさ1-その他+0]",
    ].join("\n");
    vm.exec();

    // (1+2+2)/3 = 1.666... -> 1.67
    expect(vm.average(EvaluateKey.ENTHUSIASM)).toEqual(1.67);
  });

  test("shareOnXはX intentのURLをwindow.openする", () => {
    const vm = useEvaluate();
    vm.text.value = "[Aさん 熱中1-斬新2-物語3-画像音声4-遊びやすさ5-その他+6]";
    vm.exec();

    const open = vi.spyOn(window, "open").mockReturnValue(null);

    vm.shareOnX();

    expect(open).toHaveBeenCalledTimes(1);
    const [url, target] = open.mock.calls[0] ?? [];
    expect(target).toEqual("_blank");
    expect(String(url)).toContain("https://x.com/intent/post?text=");

    const decoded = decodeURIComponent(String(url).split("?text=")[1] ?? "");
    expect(decoded).toContain("投票数: 1");
    expect(decoded).toContain("平均値:");
    expect(decoded).toContain("中央値:");
    expect(decoded).toContain("合計値:");
  });
});
