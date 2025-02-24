<template>
  <tr>
    <td>{{ evaluate.name }}</td>
    <td
      class="number"
      :class="`c${score}`"
      v-for="score in evaluate.score"
      :key="score"
    >
      {{ score }}
    </td>
  </tr>
</template>

<script setup lang="ts">
import type { EvaluateRow } from "../interfaces/EvaluateRow";

const { evaluate } = defineProps<{ evaluate: EvaluateRow }>();
</script>
