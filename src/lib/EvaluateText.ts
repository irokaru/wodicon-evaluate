import { Evaluates, isEvaluates } from "@/interfaces/Evaluates";
import { EvaluateRow } from "@/interfaces/EvaluateRow";

const NAME_PATTERN = /\[(.+?)熱/;

const SCORE_PATTERNS = {
  enthusiasm: /熱中(10|[1-9])-/,
  innovative: /熱中(10|[1-9])-/,
  story: /熱中(10|[1-9])-/,
  media: /熱中(10|[1-9])-/,
  easy: /熱中(10|[1-9])-/,
  other: /熱中(10|[1-9])-/,
};

// --------------------------------------------------------------------

export const text2evaluaterow = (text: string): EvaluateRow[] => {
  const rows: EvaluateRow[] = [];

  for (const line of text.split("\n")) {
    const matches: EvaluateRow = {
      name: "",
      score: {
        enthusiasm: 0,
        innovative: 0,
        story: 0,
        media: 0,
        easy: 0,
        other: 0,
      },
    };

    const name = NAME_PATTERN.exec(line);
    matches.name = name ? name[1] : "-";

    for (const [key, pattern] of Object.entries(SCORE_PATTERNS) as [
      keyof Evaluates,
      RegExp
    ][]) {
      const match = pattern.exec(line);

      if (!match) break;

      const result = Number(match[1]);
      matches.score[key] = result;
    }

    if (!isEvaluates(matches)) continue;

    rows.push(matches);
  }

  return rows;
};
