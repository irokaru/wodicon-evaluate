<template>
  <tr>
    <td>{{ evaluate.name }}</td>
    <td
      v-for="score in evaluate.score"
      :key="score"
      class="number"
      :class="`c${score}`"
    >
      {{ score }}
    </td>
  </tr>
</template>

<script setup lang="ts">
import type { EvaluateRow } from "../interfaces/EvaluateRow";

const { evaluate } = defineProps<{ evaluate: EvaluateRow }>();
</script>
