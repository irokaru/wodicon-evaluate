import type { EvaluateKeys } from "../interfaces/Evaluates";
import { isEvaluates } from "../interfaces/Evaluates";
import type { EvaluateRow } from "../interfaces/EvaluateRow";
import { EvaluateKey, EvaluateKeyLabels } from "../constants/Evaluates";

const NAME_PATTERN = /\[(.+?) ?熱/;

const scorePattern = (
  key: EvaluateKeys,
  infix: string,
  suffix: string,
): RegExp => new RegExp(`${EvaluateKeyLabels[key]}${infix}(10|[1-9])${suffix}`);

const SCORE_PATTERNS: Record<EvaluateKeys, RegExp> = {
  [EvaluateKey.ENTHUSIASM]: scorePattern(EvaluateKey.ENTHUSIASM, "", "-"),
  [EvaluateKey.INNOVATIVE]: scorePattern(EvaluateKey.INNOVATIVE, "", "-"),
  [EvaluateKey.STORY]: scorePattern(EvaluateKey.STORY, "", "-"),
  [EvaluateKey.MEDIA]: scorePattern(EvaluateKey.MEDIA, "", "-"),
  [EvaluateKey.EASY]: scorePattern(EvaluateKey.EASY, "", "-"),
  [EvaluateKey.OTHER]: scorePattern(EvaluateKey.OTHER, "\\+", "]"),
};

// --------------------------------------------------------------------

export const text2EvaluateRowArray = (text: string): EvaluateRow[] => {
  const rows: EvaluateRow[] = [];

  for (const line of text.split(/\r\n|\r|\n/)) {
    if (!line.trim()) continue;

    const row = text2EvaluateRow(line);

    if (!isEvaluates(row.score)) continue;

    rows.push(row);
  }

  return rows;
};

export const text2EvaluateRow = (line: string): EvaluateRow => {
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

  const name = NAME_PATTERN.exec(line);
  row.name = name?.[1] ?? "-";

  for (const key of Object.keys(SCORE_PATTERNS) as EvaluateKeys[]) {
    const match = SCORE_PATTERNS[key].exec(line);

    if (!match) continue;

    row.score[key] = parseInt(match[1], 10);
  }

  return row;
};
