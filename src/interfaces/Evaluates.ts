import { EvaluateKey } from "../constants/Evaluates";

export type EvaluateKeys = (typeof EvaluateKey)[keyof typeof EvaluateKey];
export type Evaluates = Record<EvaluateKeys, number>;

export const isEvaluates = (arg: unknown): arg is Evaluates => {
  if (typeof arg !== "object" || arg === null) return false;

  const validates: { key: EvaluateKeys; min: number; max: number }[] = [
    { key: EvaluateKey.ENTHUSIASM, min: 1, max: 10 },
    { key: EvaluateKey.INNOVATIVE, min: 1, max: 10 },
    { key: EvaluateKey.STORY, min: 1, max: 10 },
    { key: EvaluateKey.MEDIA, min: 1, max: 10 },
    { key: EvaluateKey.EASY, min: 1, max: 10 },
    { key: EvaluateKey.OTHER, min: 0, max: 10 },
  ];

  for (const { key, min, max } of validates) {
    const value = (arg as Evaluates)[key] ?? null;
    if (typeof value !== "number" || value < min || max < value) return false;
  }

  return true;
};
