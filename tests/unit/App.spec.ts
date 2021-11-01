import { mount } from "@vue/test-utils";

import * as fs from "fs";
import * as path from "path";

import App from "@/App.vue";
import { EvaluateRow } from "@/interfaces/EvaluateRow";
import { Evaluates } from "@/interfaces/Evaluates";

// --------------------------------------------------------------------

const _p = (
  name: any,
  enthusiasm: any,
  innovative: any,
  story: any,
  media: any,
  easy: any,
  other: any
): any => {
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

  test("test", () => {
    const suites: [number, EvaluateRow[], keyof Evaluates][] = [
      // expect, evaluates, key
      [0, [], "enthusiasm"],

      [2, dataset, "enthusiasm"],
      [3.67, dataset, "innovative"],
      [4, dataset, "story"],
      [5, dataset, "media"],
      [6, dataset, "easy"],
      [7, dataset, "other"],
    ];

    for (const suite of suites) {
      wrapper.vm.evaluates = suite[1];
      expect(wrapper.vm.average(suite[2])).toEqual(suite[0]);
    }
  });
});

describe("median", () => {
  const wrapper = mount(App);

  test("test", () => {
    const suites: [number, EvaluateRow[], keyof Evaluates][] = [
      // expect, evaluates, key
      [0, [], "enthusiasm"],

      [2, dataset, "enthusiasm"],
      [4, dataset, "innovative"],
      [4, dataset, "story"],
      [5, dataset, "media"],
      [6, dataset, "easy"],
      [7, dataset, "other"],
    ];

    for (const suite of suites) {
      wrapper.vm.evaluates = suite[1];
      expect(wrapper.vm.median(suite[2])).toEqual(suite[0]);
    }
  });
});
