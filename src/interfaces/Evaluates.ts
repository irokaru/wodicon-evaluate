export const Evaluates = [
  "enthusiasm",
  "innovative",
  "story",
  "media",
  "easy",
  "other",
] as const;
export type EvaluateKeys = (typeof Evaluates)[number];
export type Evaluates = Record<EvaluateKeys, number>;

export const isEvaluates = (arg: unknown): arg is Evaluates => {
  if (typeof arg !== "object" || arg === null) return false;

  const keys: [keyof Evaluates, number, number][] = [
    ["enthusiasm", 1, 10],
    ["innovative", 1, 10],
    ["story", 1, 10],
    ["media", 1, 10],
    ["easy", 1, 10],
    ["other", 0, 10],
  ];

  for (const [key, min, max] of keys) {
    const value = (arg as Evaluates)[key] ?? null;

    if (typeof value !== "number" || value < min || max < value) return false;
  }

  return true;
};
