# wodicon-evaluate

[![codecov](https://codecov.io/gh/irokaru/wodicon-evaluate/graph/badge.svg?token=3YFZRHHG1C)](https://codecov.io/gh/irokaru/wodicon-evaluate)

ウディコン評価算出機です。

## 開発の準備

### 1. 環境構築

nodejsとnpmが必要です。インストールしておきましょう。

### 2. パッケージインストール

```bash
npm install
```

上記コマンドで各種必要パッケージを落としてきましょう。

## 開発

### 1. ホットリロードをかましながら

```bash
npm run dev
```

アプリが立ち上がります。ブラウザにアクセスしたらよいです。ファイルの変更を自動で読み取って状態を自動で更新してくれます。

### 2. テストする

```bash
npm test
```

`/tests` 配下にあるすべてのテストファイル(`*.spec.ts`)をテストします。

カバレッジ付きで実行したい場合は以下を使います。終了とともに `/coverage` ディレクトリにカバレッジを吐き出します。80%を下限としています (`vitest.config.ts` の `coverage.thresholds` を参照)。

```bash
npm run coverage
```

変更監視モードで実行したい場合は以下を使います。

```bash
npm run test:watch
```

### 3. コード整形・静的検査する

```bash
npm run lint
```

コミット時に自動で整形してくれますが、コミット前にも整形してほしいときに使います。
変更せず検査だけしたい場合は `npm run lint:check` を使います。
