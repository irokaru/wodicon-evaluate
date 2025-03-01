import { mount } from "@vue/test-utils";

import EvaluateTr from "../../../src/components/EvaluateTr.vue";

// --------------------------------------------------------------------

describe("template", () => {
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

  test.each([[["hoge", 1, 2, 3, 4, 5, 6], _p("hoge", 1, 2, 3, 4, 5, 6)]])(
    "ちゃんと入ってるとき",
    (expected, evaluates) => {
      const wrapper = mount(EvaluateTr, {
        props: {
          evaluate: evaluates,
        },
      });

      const tds = wrapper.findAll("td");

      expect(tds).toHaveLength(7);

      for (const index in expected.keys()) {
        const num = Number(index);
        expect(tds[num]).toEqual(expected[num]);
      }
    },
  );
});
