import { mount } from "@vue/test-utils";

import EvaluateTr from "@/components/EvaluateTr.vue";

// --------------------------------------------------------------------

describe("template", () => {
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

  test("ちゃんと入ってるとき", () => {
    const suites: [any[], any[]][] = [
      // expect, params
      [["hoge", 1, 2, 3, 4, 5, 6], _p("hoge", 1, 2, 3, 4, 5, 6)],
    ];

    for (const suite of suites) {
      const wrapper = mount(EvaluateTr, {
        props: {
          evaluate: suite[1],
        },
      });

      const tds = wrapper.findAll("td");

      expect(tds).toHaveLength(7);

      for (const index in suite[0].keys()) {
        const num = Number(index);
        expect(tds[num]).toEqual(suite[0][num]);
      }
    }
  });
});
