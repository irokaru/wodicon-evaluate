<template>
  <tr>
    <td>{{ props.evaluate.name }}</td>
    <td
      v-for="key in evaluateKeys"
      :key="key"
      class="number"
      :class="`c${props.evaluate.score[key]}`"
    >
      {{ props.evaluate.score[key] }}
    </td>
  </tr>
</template>

<script setup lang="ts">
import { EvaluateKey } from "../constants/Evaluates";
import type { EvaluateRow } from "../interfaces/EvaluateRow";

const props = defineProps<{ evaluate: EvaluateRow }>();

const evaluateKeys = Object.values(EvaluateKey);
</script>
