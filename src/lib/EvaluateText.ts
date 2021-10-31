import { Evaluates, isEvaluates } from "@/interfaces/Evaluates";
import { EvaluateRow } from "@/interfaces/EvaluateRow";

const NAME_PATTERN = /\[(.+?) ?熱/;

const SCORE_PATTERNS = {
  enthusiasm: /熱中(10|[1-9])-/,
  innovative: /斬新(10|[1-9])-/,
  story: /物語(10|[1-9])-/,
  media: /画像音声(10|[1-9])-/,
  easy: /遊びやすさ(10|[1-9])-/,
  other: /その他\+(10|[1-9])]/,
};

// --------------------------------------------------------------------

export const text2EvaluateRowArray = (text: string): EvaluateRow[] => {
  const rows: EvaluateRow[] = [];

  for (const line of text.split(/\r\n|\r|\n/)) {
    if (!line) continue;

    const row = text2EvaluateRow(line);

    if (!isEvaluates(row.score)) continue;

    rows.push(row);
  }

  return rows;
};

export const text2EvaluateRow = (text: string): EvaluateRow => {
  const row: EvaluateRow = {
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

  const name = NAME_PATTERN.exec(text);
  row.name = name ? name[1] : "-";

  for (const [key, pattern] of Object.entries(SCORE_PATTERNS) as [
    keyof Evaluates,
    RegExp
  ][]) {
    const match = pattern.exec(text);

    if (!match) continue;

    row.score[key] = parseInt(match[1]);
  }

  return row;
};
