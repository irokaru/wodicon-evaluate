<template>
  <div class="form-part">
    <textarea
      :class="`resize-${resize}`"
      :name="name"
      :rows="rows"
      :cols="cols"
      :placeholder="placeholder"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)
      "
    ></textarea>
  </div>
</template>

<script setup lang="ts">
interface Props {
  name: string;
  rows?: number;
  cols?: number;
  placeholder?: string;
  resize?: string;
  modelValue?: string;
}

defineProps<Props>();
defineEmits(["update:modelValue"]);
</script>
