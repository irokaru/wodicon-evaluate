import { mount } from "@vue/test-utils";

import App from "@/App.vue";

const SAMPLE_TEXT = [
  "[Aさん 熱中1-斬新2-物語3-画像音声4-遊びやすさ5-その他+6]",
  "[Bさん 熱中3-斬新4-物語5-画像音声6-遊びやすさ7-その他+8]",
].join("\n");

const execButton = (wrapper: ReturnType<typeof mount>) =>
  wrapper.find("div.right button");
const shareButton = (wrapper: ReturnType<typeof mount>) =>
  wrapper.find("div.separate button");

describe("App", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test("初期表示は0件でシェア不可", () => {
    const wrapper = mount(App);

    expect(wrapper.text()).toContain("投票数: 0");

    const share = shareButton(wrapper);
    expect(share.attributes("disabled")).toBeDefined();
    expect(share.classes()).toContain("gray");

    // thead: 投票者名 + 6項目
    const headers = wrapper.findAll("thead th");
    expect(headers.map((h) => h.text())).toEqual([
      "投票者名",
      "熱中",
      "斬新",
      "物語",
      "画像音声",
      "遊びやすさ",
      "その他",
    ]);

    // tfoot: 平均値/中央値/合計値の3行
    expect(wrapper.findAll("tfoot tr")).toHaveLength(3);
  });

  test("テキスト入力→算出で表と集計が表示されシェア可能になる", async () => {
    const wrapper = mount(App);

    await wrapper.get("textarea").setValue(SAMPLE_TEXT);
    await execButton(wrapper).trigger("click");

    expect(wrapper.text()).toContain("投票数: 2");

    // tbodyに2票
    const rows = wrapper.findAll("tbody tr");
    expect(rows).toHaveLength(2);
    expect(rows[0]?.text()).toContain("Aさん");
    expect(rows[1]?.text()).toContain("Bさん");

    // tfoot: 平均値行 = (1+3)/2=2, (2+4)/2=3, ... その他 (6+8)/2=7
    const footRows = wrapper.findAll("tfoot tr");
    expect(footRows).toHaveLength(3);
    expect(footRows[0]?.findAll("td").map((td) => td.text())).toEqual([
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
    ]);
    // 中央値行 (2件なので平均と同じ)
    expect(footRows[1]?.findAll("td").map((td) => td.text())).toEqual([
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
    ]);
    // 合計値行
    expect(footRows[2]?.findAll("td").map((td) => td.text())).toEqual([
      "4",
      "6",
      "8",
      "10",
      "12",
      "14",
    ]);

    const share = shareButton(wrapper);
    expect(share.attributes("disabled")).toBeUndefined();
    expect(share.classes()).toContain("green");
  });

  test("有効票がなければシェア不可のまま", async () => {
    const wrapper = mount(App);

    await wrapper.get("textarea").setValue("感想だけの本文");
    await execButton(wrapper).trigger("click");

    expect(wrapper.text()).toContain("投票数: 0");
    expect(shareButton(wrapper).attributes("disabled")).toBeDefined();
    expect(wrapper.findAll("tbody tr")).toHaveLength(0);
  });

  test("シェアボタンでX intentを開く", async () => {
    const wrapper = mount(App);
    const open = vi.spyOn(window, "open").mockReturnValue(null);

    await wrapper.get("textarea").setValue(SAMPLE_TEXT);
    await execButton(wrapper).trigger("click");
    await shareButton(wrapper).trigger("click");

    expect(open).toHaveBeenCalledTimes(1);
    expect(String(open.mock.calls[0]?.[0])).toContain(
      "https://x.com/intent/post?text=",
    );
    expect(open.mock.calls[0]?.[1]).toEqual("_blank");
  });
});
