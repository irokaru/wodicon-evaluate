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

    <div>投票数: {{ evaluates.length }}</div>

    <table>
      <thead>
        <th>投票者名</th>
        <th>熱中</th>
        <th>斬新</th>
        <th>物語</th>
        <th>画像音声</th>
        <th>遊びやすさ</th>
        <th>その他</th>
      </thead>

      <tbody>
        <EvaluateTr
          :evaluate="evaluate"
          v-for="(evaluate, index) in evaluates"
          :key="`${evaluate.name}-${index}`"
        />
      </tbody>

      <tfoot>
        <th>投票者名</th>
        <th>熱中</th>
        <th>斬新</th>
        <th>物語</th>
        <th>画像音声</th>
        <th>遊びやすさ</th>
        <th>その他</th>
      </tfoot>
    </table>
  </main>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

import FormSelect from "@/components/Textarea.vue";
import EvaluateTr from "@/components/EvaluateTr.vue";

import { EvaluateRow } from "./interfaces/EvaluateRow";
import { text2EvaluateRowArray } from "./lib/EvaluateText";
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

  public exec(): void {
    this.evaluates = text2EvaluateRowArray(this.text);
  }
}
</script>
