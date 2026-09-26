# AGENTS.md

## これは何か

WOLF RPGエディターコンテスト (ウディコン) の投稿者向けツール。
コンテスト終了後に運営から届く「結果メール」の本文を貼り付けると、項目別の平均値・中央値・合計値を算出する。

## コードにない前提知識

- 結果メールは運営から投稿者宛に送られるもので、自分の作品への一般投票コメントが全件列挙されている。
- メール本文の構造は、前文 + 投票者ごとの `[得点行]` + 感想文の繰り返し。実例は `tests/text/evaluate_ok.txt` を見よ。仕様書ではなく実物が正である。
- 投票の6項目 (`熱中 / 斬新 / 物語 / 画像音声 / 遊びやすさ / その他`) はウディコンの公式投票形式であり、本アプリが定めたものではない。項目名の対応は `src/constants/Evaluates.ts` を正とする。
- `その他` のみ加算 (`+N`) 形式で、他5項目と性格が異なる。点数の有効範囲や不正行の扱いは `src/interfaces/Evaluates.ts` を正とし、AGENTS.mdには転記しない。
- 投票者名は省略されることがある (匿名票)。これは欠損ではなく正常系である。
- 集計の使い道は「投稿者が自分の得点を把握し、Xで共有する」こと。順位付けや他作品比較の機能はない。

## 辿り方

実装の詳細はコードを読め。入口だけ示す。

- UIフロー: `src/App.vue` (`exec` → 集計 → `shareOnX`)
- メール本文のパース: `src/lib/EvaluateText.ts`
- 有効票の判定: `src/interfaces/Evaluates.ts`
- 集計計算: `src/lib/MathUtil.ts`
- X共有文の組み立て: `src/lib/ShareText.ts`
- テストは `tests/unit/` が `src/` と対応。実メールでの回帰は `tests/text/evaluate_ok.txt` を使う。

## コマンド

定義は `package.json` の scripts が正。CI (`/.github/workflows/works.yml`) の順序 (`lint:check` → `coverage` → `build`) に従え。
