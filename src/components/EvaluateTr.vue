<template>
  <tr>
    <td>{{ evaluate.name }}</td>
    <td>{{ evaluate.score.enthusiasm }}</td>
    <td>{{ evaluate.score.innovative }}</td>
    <td>{{ evaluate.score.story }}</td>
    <td>{{ evaluate.score.media }}</td>
    <td>{{ evaluate.score.easy }}</td>
    <td>{{ evaluate.score.other }}</td>
  </tr>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { EvaluateRow } from "@/interfaces/EvaluateRow";
import { PropType } from "@vue/runtime-core";

@Options({
  props: {
    evaluate: { type: Object as PropType<EvaluateRow>, required: true },
  },
})
export default class EvaluateTr extends Vue {
  public evaluate!: EvaluateRow;
}
</script>
