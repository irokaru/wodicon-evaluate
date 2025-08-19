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
      <div class="btn big soft orange" @click="exec">評価を算出</div>
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
            <th>熱中</th>
            <th>斬新</th>
            <th>物語</th>
            <th>画像音声</th>
            <th>遊びやすさ</th>
            <th>その他</th>
          </tr>
        </thead>

        <tbody>
          <EvaluateTr
            v-for="(evaluate, index) in evaluates"
            :key="`${evaluate.name}-${index}`"
            :evaluate="evaluate"
          />
        </tbody>

        <tfoot>
          <tr>
            <th>平均値</th>
            <td v-for="key in evaluateKeys" :key="key" class="number">
              {{ average(key) }}
            </td>
          </tr>
          <tr>
            <th>中央値</th>
            <td v-for="key in evaluateKeys" :key="key" class="number">
              {{ median(key) }}
            </td>
          </tr>
          <tr>
            <th>合計値</th>
            <td v-for="key in evaluateKeys" :key="key" class="number">
              {{ total(key) }}
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

import VTextArea from "./components/VTextArea.vue";
import EvaluateTr from "./components/EvaluateTr.vue";

import type { EvaluateRow } from "./interfaces/EvaluateRow";
import { EvaluateKeyLabels } from "./constants/Evaluates";
import { EvaluateKey } from "./constants/Evaluates";
import { computed, ref } from "vue";

const text = ref("");
const evaluates = ref<EvaluateRow[]>([]);
const evaluateKeys = computed<EvaluateKey[]>(() => Object.values(EvaluateKey));
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

const shareOnX = (): void => {
  const labels = Object.values(EvaluateKeyLabels);
  const averages = evaluateKeys.value.map(average);
  const totals = evaluateKeys.value.map(total);
  const medians = evaluateKeys.value.map(median);
  const text =
    `投票数: ${evaluates.value.length}\n` +
    `項目: ${labels.join(" ")}\n` +
    `平均値: ${averages.join(" ")}\n` +
    `中央値: ${medians.join(" ")}\n` +
    `合計値: ${totals.join(" ")}\n` +
    "#ウディコン評価算出機\n" +
    "https://wodicon-evaluate.nononotyaya.net/";

  const url = `https://x.com/intent/post?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
};

const getEvaluateNumbers = (
  evaluates: EvaluateRow[],
  key: EvaluateKey,
): number[] => {
  return evaluates.map((evaluate) => evaluate.score[key]);
};
</script>
