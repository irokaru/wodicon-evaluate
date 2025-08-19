export enum EvaluateKey {
  ENTHUSIASM = "enthusiasm",
  INNOVATIVE = "innovative",
  STORY = "story",
  MEDIA = "media",
  EASY = "easy",
  OTHER = "other",
}

export const EvaluateKeyLabels: Record<EvaluateKey, string> = {
  [EvaluateKey.ENTHUSIASM]: "熱中",
  [EvaluateKey.INNOVATIVE]: "斬新",
  [EvaluateKey.STORY]: "物語",
  [EvaluateKey.MEDIA]: "画像音声",
  [EvaluateKey.EASY]: "遊びやすさ",
  [EvaluateKey.OTHER]: "その他",
};
