import { mount } from "@vue/test-utils";

import * as fs from "fs";
import * as path from "path";

import App from "@/App.vue";
import { EvaluateRow } from "@/interfaces/EvaluateRow";
import { Evaluates } from "@/interfaces/Evaluates";

// --------------------------------------------------------------------

const _p = (
  name: string,
  enthusiasm: number,
  innovative: number,
  story: number,
  media: number,
  easy: number,
  other: number,
) => {
  return {
    name,
    score: {
      enthusiasm,
      innovative,
      story,
      media,
      easy,
      other,
    },
  };
};

const dataset: EvaluateRow[] = [
  _p("hoge", 1, 2, 3, 4, 5, 6),
  _p("fuga", 2, 5, 4, 5, 6, 7),
  _p("piyo", 3, 4, 5, 6, 7, 8),
];

// --------------------------------------------------------------------

describe("exec", () => {
  const wrapper = mount(App);

  test("test", async () => {
    const filepath = path.join(__dirname, "../text/evaluate_ok.txt");
    const text = fs.readFileSync(filepath, "utf-8").toString();

    wrapper.vm.text = text;
    wrapper.vm.exec();

    expect(wrapper.vm.evaluates).toHaveLength(114);
  });
});

describe("average", () => {
  const wrapper = mount(App);

  test.each<{
    expected: number;
    evaluates: EvaluateRow[];
    key: keyof Evaluates;
  }>([
    { expected: 0, evaluates: [], key: "enthusiasm" },
    { expected: 2, evaluates: dataset, key: "enthusiasm" },
    { expected: 3.67, evaluates: dataset, key: "innovative" },
    { expected: 4, evaluates: dataset, key: "story" },
    { expected: 5, evaluates: dataset, key: "media" },
    { expected: 6, evaluates: dataset, key: "easy" },
    { expected: 7, evaluates: dataset, key: "other" },
  ])("calc average for key: $key", ({ expected, evaluates, key }) => {
    wrapper.vm.evaluates = evaluates;
    expect(wrapper.vm.average(key)).toEqual(expected);
  });
});

describe("median", () => {
  const wrapper = mount(App);

  test.each<{
    expected: number;
    evaluates: EvaluateRow[];
    key: keyof Evaluates;
  }>([
    { expected: 0, evaluates: [], key: "enthusiasm" },
    { expected: 2, evaluates: dataset, key: "enthusiasm" },
    { expected: 4, evaluates: dataset, key: "innovative" },
    { expected: 4, evaluates: dataset, key: "story" },
    { expected: 5, evaluates: dataset, key: "media" },
    { expected: 6, evaluates: dataset, key: "easy" },
    { expected: 7, evaluates: dataset, key: "other" },
  ])("calc median for key: $key", ({ expected, evaluates, key }) => {
    wrapper.vm.evaluates = evaluates;
    expect(wrapper.vm.median(key)).toEqual(expected);
  });
});

describe("total", () => {
  const wrapper = mount(App);

  test.each<{
    expected: number;
    evaluates: EvaluateRow[];
    key: keyof Evaluates;
  }>([
    { expected: 0, evaluates: [], key: "enthusiasm" },
    { expected: 6, evaluates: dataset, key: "enthusiasm" },
    { expected: 11, evaluates: dataset, key: "innovative" },
    { expected: 12, evaluates: dataset, key: "story" },
    { expected: 15, evaluates: dataset, key: "media" },
    { expected: 18, evaluates: dataset, key: "easy" },
    { expected: 21, evaluates: dataset, key: "other" },
  ])("calc total for key: $key", ({ expected, evaluates, key }) => {
    wrapper.vm.evaluates = evaluates;
    expect(wrapper.vm.total(key)).toEqual(expected);
  });
});
