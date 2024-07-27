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

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { EvaluateRow } from "@/interfaces/EvaluateRow";
import { PropConstructor } from "@/interfaces/VueProps";

@Options({
  props: {
    evaluate: {
      type: Object as PropConstructor<EvaluateRow>,
      required: true,
    },
  },
})
export default class EvaluateTr extends Vue {
  public evaluate!: EvaluateRow;
}
</script>
