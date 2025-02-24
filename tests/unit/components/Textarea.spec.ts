import { mount } from "@vue/test-utils";

import Textarea from "../../../src/components/VTextArea.vue";

// --------------------------------------------------------------------

describe("input", () => {
  test("propsの確認", async () => {
    const suites = [
      // expect, input
      ["", ""],
      ["aaa\naaa", "aaa\naaa"],
    ];

    for (const suite of suites) {
      const props = {
        name: "a",
        modelValue: "",
      };

      const wrapper = mount(Textarea, {
        props: props,
      });

      await wrapper.get("textarea").setValue(suite[1]);
      await wrapper.vm.$nextTick();

      const emit = wrapper.emitted("update:modelValue");

      expect(emit).toBeTruthy();
      expect(emit?.[0][0]).toEqual(suite[0]);
    }
  });
});
