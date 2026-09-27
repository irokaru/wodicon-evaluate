import { computed, ref } from "vue";

import { EvaluateKey, EvaluateKeyLabels } from "../constants/Evaluates";
import type { EvaluateRow } from "../interfaces/EvaluateRow";
import { text2EvaluateRowArray } from "../lib/EvaluateText";
import {
  averageArray,
  medianArray,
  roundDigit,
  totalArray,
} from "../lib/Statistics";
import { buildShareText, buildShareUrl } from "../lib/ShareText";

export interface EvaluateSummary {
  label: string;
  calc: (key: EvaluateKey) => number;
}

export const useEvaluate = () => {
  const text = ref("");
  const evaluates = ref<EvaluateRow[]>([]);
  const evaluateKeys = Object.values(EvaluateKey);
  const isExecuted = computed(() => evaluates.value.length > 0);

  const getEvaluateNumbers = (key: EvaluateKey): number[] => {
    return evaluates.value.map((evaluate) => evaluate.score[key]);
  };

  const total = (key: EvaluateKey): number => {
    return totalArray(getEvaluateNumbers(key));
  };

  const average = (key: EvaluateKey): number => {
    return roundDigit(averageArray(getEvaluateNumbers(key)), 2);
  };

  const median = (key: EvaluateKey): number => {
    return medianArray(getEvaluateNumbers(key));
  };

  const summaries: EvaluateSummary[] = [
    { label: "平均値", calc: average },
    { label: "中央値", calc: median },
    { label: "合計値", calc: total },
  ];

  const exec = (): void => {
    evaluates.value = text2EvaluateRowArray(text.value);
  };

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

  return {
    text,
    evaluates,
    evaluateKeys,
    isExecuted,
    summaries,
    exec,
    total,
    average,
    median,
    shareOnX,
  };
};
