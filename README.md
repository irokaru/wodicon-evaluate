# wodifes-evaluate

ウディコン評価算出機です。

## 開発の準備

### 1. 環境構築

nodejsとyarnが必要です。インストールしておきましょう。

### 2. パッケージインストール

```bash
yarn install
```

上記コマンドで各種必要パッケージを落としてきましょう。

## 開発

### 1. ホットリロードをかましながら

```bash
yarn serve
```

アプリが立ち上がります。ブラウザにアクセスしたらよいです。ファイルの変更を自動で読み取って状態を自動で更新してくれます。

### 2. テストする

```bash
yarn test
```

`/tests` 配下にあるすべてのテストファイル(`*.spec.ts`)をテストします。

終了とともに `/coverage` ディレクトリにカバレッジも吐き出してくれます。まずは70%を目指して頑張りましょう。

### 3. コード整形する

```bash
yarn lint
```

コミット時に自動で整形してくれますが、コミット前にも整形してほしいときに使います。

### `.tool-versions` とは

[asdf](https://asdf-vm.com/) というランタイムバージョンマネージャー用のバージョン管理ファイルです。

asdf をインストールして、以下のコマンドを実行することで `.tool-versions` に記載されたランタイムをインストールすることができます。

```sh
asdf install
```
