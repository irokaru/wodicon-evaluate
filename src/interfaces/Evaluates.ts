export interface Evaluates {
  enthusiasm: number;
  innovative: number;
  story: number;
  media: number;
  easy: number;
  other: number;
}

export const isEvaluates = (arg: unknown): arg is Evaluates => {
  if (typeof arg !== "object" || arg === null) return false;

  const keys: (keyof Evaluates)[] = [
    "enthusiasm",
    "innovative",
    "story",
    "media",
    "easy",
    "other",
  ];

  for (const key of keys) {
    const value = (arg as Evaluates)[key];

    if (typeof value !== "number" || value < 1 || 10 < value) return false;
  }

  return true;
};
