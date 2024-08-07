<template>
  <header>
    <h1>ウディコン評価算出機</h1>
  </header>

  <main>
    <FormSelect
      name="evaluate"
      placeholder="ここに届いたメールの本文をコピペしてください"
      resize="vertical"
      v-model="text"
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
            :evaluate="evaluate"
            v-for="(evaluate, index) in evaluates"
            :key="`${evaluate.name}-${index}`"
          />
        </tbody>

        <tfoot>
          <tr>
            <th>平均値</th>
            <td class="number" v-for="key in evaluateKeys" :key="key">
              {{ average(key) }}
            </td>
          </tr>
          <tr>
            <th>中央値</th>
            <td class="number" v-for="key in evaluateKeys" :key="key">
              {{ median(key) }}
            </td>
          </tr>
          <tr>
            <th>合計値</th>
            <td class="number" v-for="key in evaluateKeys" :key="key">
              {{ total(key) }}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </main>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { text2EvaluateRowArray } from "./lib/EvaluateText";
import {
  averageArray,
  medianArray,
  roundDigit,
  totalArray,
} from "./lib/MathUtil";

import FormSelect from "@/components/Textarea.vue";
import EvaluateTr from "@/components/EvaluateTr.vue";

import { EvaluateRow } from "./interfaces/EvaluateRow";
import { Evaluates } from "./interfaces/Evaluates";

@Options({
  components: {
    FormSelect,
    EvaluateTr,
  },
})
export default class App extends Vue {
  public text = "";
  public evaluates: EvaluateRow[] = [];
  public evaluateKeys = Evaluates;
  public isExecuted = false;

  public exec(): void {
    this.evaluates = text2EvaluateRowArray(this.text);
    this.isExecuted = this.evaluates.length > 0;
  }

  public total(key: keyof Evaluates): number {
    const numbers = this.getEvaluateNumbers(this.evaluates, key);
    return totalArray(numbers);
  }

  public average(key: keyof Evaluates): number {
    const numbers = this.getEvaluateNumbers(this.evaluates, key);
    return roundDigit(averageArray(numbers), 2);
  }

  public median(key: keyof Evaluates): number {
    const numbers = this.getEvaluateNumbers(this.evaluates, key);
    return medianArray(numbers);
  }

  public shareOnX(): void {
    const labels = ["熱中", "斬新", "物語", "画像音声", "遊びやすさ", "その他"];

    const averages = Evaluates.map(this.average);
    const totals = Evaluates.map(this.total);
    const medians = Evaluates.map(this.median);
    const text =
      `投票数: ${this.evaluates.length}\n` +
      `項目: ${labels.join(" ")}\n` +
      `平均値: ${averages.join(" ")}\n` +
      `中央値: ${medians.join(" ")}\n` +
      `合計値: ${totals.join(" ")}\n` +
      "#ウディコン評価算出機\n" +
      "https://wodicon-evaluate.nononotyaya.net/";

    const url = `https://x.com/intent/post?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  }

  private getEvaluateNumbers(
    evaluates: EvaluateRow[],
    key: keyof Evaluates
  ): number[] {
    return evaluates.map((evaluate) => evaluate.score[key]);
  }
}
</script>
