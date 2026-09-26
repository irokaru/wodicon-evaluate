import { EvaluateKey } from "../constants/Evaluates";

export type EvaluateKeys = (typeof EvaluateKey)[keyof typeof EvaluateKey];
export type Evaluates = Record<EvaluateKeys, number>;

const EVALUATE_VALIDATES: { key: EvaluateKeys; min: number; max: number }[] = [
  { key: EvaluateKey.ENTHUSIASM, min: 1, max: 10 },
  { key: EvaluateKey.INNOVATIVE, min: 1, max: 10 },
  { key: EvaluateKey.STORY, min: 1, max: 10 },
  { key: EvaluateKey.MEDIA, min: 1, max: 10 },
  { key: EvaluateKey.EASY, min: 1, max: 10 },
  { key: EvaluateKey.OTHER, min: 0, max: 10 },
];

export const isEvaluates = (arg: unknown): arg is Evaluates => {
  if (typeof arg !== "object" || arg === null) return false;

  for (const { key, min, max } of EVALUATE_VALIDATES) {
    const value = (arg as Evaluates)[key] ?? null;
    if (typeof value !== "number" || value < min || max < value) return false;
  }

  return true;
};
