<template>
  <header>
    <h1>ウディコン評価算出機</h1>
  </header>

  <main>
    <VTextArea
      v-model="text"
      name="evaluate"
      placeholder="ここに届いたメールの本文をコピペしてください"
      resize="vertical"
    />

    <div class="right">
      <button class="btn big soft orange" @click="exec">評価を算出</button>
    </div>

    <hr />

    <h2>算出結果</h2>

    <div class="separate">
      <div>投票数: {{ evaluates.length }}</div>
      <button
        class="btn small soft"
        :class="isExecuted ? 'green' : 'gray'"
        :disabled="!isExecuted"
        @click="shareOnX"
      >
        結果をXでシェアする
      </button>
    </div>

    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>投票者名</th>
            <th v-for="key in evaluateKeys" :key="key">
              {{ EvaluateKeyLabels[key] }}
            </th>
          </tr>
        </thead>

        <tbody>
          <EvaluateTr
            v-for="(evaluate, index) in evaluates"
            :key="index"
            :evaluate="evaluate"
          />
        </tbody>

        <tfoot>
          <tr v-for="summary in summaries" :key="summary.label">
            <th>{{ summary.label }}</th>
            <td v-for="key in evaluateKeys" :key="key" class="number">
              {{ summary.calc(key) }}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </main>
</template>

<script setup lang="ts">
import { text2EvaluateRowArray } from "./lib/EvaluateText";
import {
  averageArray,
  medianArray,
  roundDigit,
  totalArray,
} from "./lib/MathUtil";
import { buildShareText, buildShareUrl } from "./lib/ShareText";

import VTextArea from "./components/VTextArea.vue";
import EvaluateTr from "./components/EvaluateTr.vue";

import type { EvaluateRow } from "./interfaces/EvaluateRow";
import { EvaluateKey, EvaluateKeyLabels } from "./constants/Evaluates";
import { ref } from "vue";

const text = ref("");
const evaluates = ref<EvaluateRow[]>([]);
const evaluateKeys = Object.values(EvaluateKey);
const isExecuted = ref(false);

const exec = (): void => {
  evaluates.value = text2EvaluateRowArray(text.value);
  isExecuted.value = evaluates.value.length > 0;
};

const total = (key: EvaluateKey): number => {
  const numbers = getEvaluateNumbers(evaluates.value, key);
  return totalArray(numbers);
};

const average = (key: EvaluateKey): number => {
  const numbers = getEvaluateNumbers(evaluates.value, key);
  return roundDigit(averageArray(numbers), 2);
};

const median = (key: EvaluateKey): number => {
  const numbers = getEvaluateNumbers(evaluates.value, key);
  return medianArray(numbers);
};

const summaries: { label: string; calc: (key: EvaluateKey) => number }[] = [
  { label: "平均値", calc: average },
  { label: "中央値", calc: median },
  { label: "合計値", calc: total },
];

const shareOnX = (): void => {
  const labels = Object.values(EvaluateKeyLabels);
  const shareText = buildShareText({
    voteCount: evaluates.value.length,
    labels,
    averages: evaluateKeys.map(average),
    medians: evaluateKeys.map(median),
    totals: evaluateKeys.map(total),
  });

  window.open(buildShareUrl(shareText), "_blank");
};

const getEvaluateNumbers = (
  evaluates: EvaluateRow[],
  key: EvaluateKey,
): number[] => {
  return evaluates.map((evaluate) => evaluate.score[key]);
};
</script>
