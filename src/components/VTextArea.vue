<template>
  <div class="form-part">
    <label :for="name" v-if="label">
      <span v-if="required" class="required">*</span>
    </label>

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
  label?: string;
  rows?: number;
  cols?: number;
  placeholder?: string;
  resize?: string;
  required?: boolean;
  modelValue?: string;
}

defineProps<Props>();
defineEmits(["update:modelValue"]);
</script>
