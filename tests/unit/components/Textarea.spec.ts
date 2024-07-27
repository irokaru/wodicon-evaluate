import { mount } from "@vue/test-utils";

import Textarea from "@/components/Textarea.vue";

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

describe("labelText", () => {
  test("アスタリスクの出力確認", () => {
    const suites: [string, string, boolean][] = [
      // expect, label, required,
      [
        '<label for="a">aaaaa<span class="required">*</span></label>',
        "aaaaa",
        true,
      ],
      ['<label for="a">aaaaa</label>', "aaaaa", false],
    ];

    for (const suite of suites) {
      const props = {
        name: "a",
        label: suite[1],
        modelValue: "",
        required: suite[2],
      };

      const wrapper = mount(Textarea, {
        props: props,
      });

      expect(wrapper.get("label").html()).toEqual(suite[0]);
    }
  });

  test("labelの指定がないときには表示されないこと", () => {
    const props = {
      name: "hogehoge",
      modelValue: "",
      required: true,
    };

    const wrapper = mount(Textarea, {
      props: props,
    });

    expect(wrapper.find("label").exists()).toBeFalsy();
  });
});
