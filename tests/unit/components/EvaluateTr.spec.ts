import { mount } from "@vue/test-utils";

import EvaluateTr from "@/components/EvaluateTr.vue";

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

  test.each([
    ["hoge", 1, 2, 3, 4, 5, 6],
    ["重複スコア", 5, 5, 5, 5, 5, 5],
  ])("ちゃんと入ってるとき %s", (name, ...scores) => {
    const [enthusiasm, innovative, story, media, easy, other] = scores;
    const wrapper = mount(EvaluateTr, {
      props: {
        evaluate: _p(name, enthusiasm, innovative, story, media, easy, other),
      },
    });

    const tds = wrapper.findAll("td");

    expect(tds).toHaveLength(7);
    expect(tds[0].text()).toEqual(name);

    const expectedScores = [enthusiasm, innovative, story, media, easy, other];
    expectedScores.forEach((expected, index) => {
      const td = tds[index + 1];
      expect(td.text()).toEqual(String(expected));
      expect(td.classes()).toContain(`c${expected}`);
    });
  });
});
