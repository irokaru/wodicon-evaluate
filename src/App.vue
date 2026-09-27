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
import { useEvaluate } from "./composables/useEvaluate";

import VTextArea from "./components/VTextArea.vue";
import EvaluateTr from "./components/EvaluateTr.vue";

import { EvaluateKeyLabels } from "./constants/Evaluates";

const { text, evaluates, evaluateKeys, isExecuted, summaries, exec, shareOnX } =
  useEvaluate();
</script>
