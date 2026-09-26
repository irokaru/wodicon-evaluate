<template>
  <div class="form-part">
    <textarea
      :class="`resize-${resize}`"
      :name="name"
      :rows="rows"
      :cols="cols"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
interface Props {
  name: string;
  rows?: number;
  cols?: number;
  placeholder?: string;
  resize?: "none" | "both" | "horizontal" | "vertical";
  modelValue?: string;
}

defineProps<Props>();
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const onInput = (event: Event): void => {
  emit("update:modelValue", (event.target as HTMLTextAreaElement).value);
};
</script>
