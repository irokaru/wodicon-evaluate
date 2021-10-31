<template>
  <div class="form-part">
    <label :for="name" v-html="labelText()" v-if="label"></label>

    <textarea
      :class="`resize-${resize}`"
      :name="name"
      :rows="rows"
      :cols="cols"
      :value="modelValue"
      :placeholder="placeholder"
      @input="input"
      @blur="input"
    ></textarea>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    name: { type: String, required: true },
    label: { type: String, required: false },
    rows: { type: Number, required: false },
    cols: { type: Number, required: false },
    placeholder: { type: String, required: false },
    resize: { type: String, required: false, default: "none" },
    required: { type: Boolean, required: false, default: false },
    modelValue: { type: String, required: true },
  },
  emits: ["update:modelValue"],
})
export default class Textarea extends Vue {
  name!: string;
  label!: string;
  rows!: number;
  cols!: number;
  placeholder!: string;
  resize!: string;
  required!: boolean;
  modelValue!: string;

  labelText(): string {
    const required = this.required ? '<span class="required">*</span>' : "";

    return this.label + required;
  }

  input(e: Event): void {
    this.$emit("update:modelValue", (e.target as HTMLTextAreaElement).value);
  }
}
</script>
