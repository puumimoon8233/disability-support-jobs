# Glow Compass

あなたの技術が、誰かの支援になる。

障害福祉×ITの仕事を横断して探せるまとめサイト

## 技術スタック

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- 静的データ（`data/*.ts`）

## 実装済みページ

- `/` - トップページ
- `/companies` - 企業一覧・URLクエリベースの検索/絞り込み
- `/companies/[slug]` - 企業詳細
- `/jobs` - 求人一覧・URLクエリベースの検索/絞り込み
- `/jobs/[slug]` - 求人詳細

`/search` と `/categories/[categorySlug]` は後続フェーズで実装予定です。

## データ方針

初期MVPではDBを使わず、以下の静的データを参照します。

- `data/companies.ts`
- `data/jobs.ts`
- `data/categories.ts`

`Company` と `Job` はどちらも `id` と `slug` を持ちます。求人は必ず `companyId` で企業に紐づき、詳細ページのURLは slug を使用します。

## ローカル起動手順

```bash
npm install
npm run dev
```

ブラウザで <http://localhost:3000> を開いてください。

## 開発時の確認コマンド

```bash
npm run typecheck
npm run lint
npm run build
```

- `npm run typecheck`: TypeScript の型チェックを実行します。
- `npm run lint`: ESLint で Next.js / TypeScript の静的解析を実行します。
- `npm run build`: Vercel と同等の本番ビルド確認を行います。

## 開発フロー

1. 最新のmainから新しいCodex Taskを作成する
2. 1 Task = 1 PR = 1目的を基本とする
3. 実装後にbuild・typecheck・差分を確認する
4. GitHubでFiles changedとCodex Reviewを確認する
5. Vercel Previewでマージ前の画面を確認する
6. 指摘を修正し、未解決コメントがない状態でmainへマージする
7. マージ後は次のTaskを最新mainから作成する

## 検索・絞り込み仕様

企業一覧と求人一覧では、URLクエリで検索条件を扱います。

例:

```txt
/jobs?q=アクセシビリティ
/jobs?category=welfare-dx&remote=true
/companies?q=Next.js&sideJob=true&flex=true
```

対応しているクエリ:

- `q`: キーワード
- `category`: カテゴリ slug
- `remote=true`: リモート可
- `sideJob=true`: 副業可
- `flex=true`: フレックス

## Vercel デプロイ前提の注意点

- Tailwind CSS は v4 構成のため、PostCSS plugin は `@tailwindcss/postcss` を使用します。

- Build Command は `npm run build` を想定しています。
- Install Command は通常どおり `npm install` を想定しています。
- Output Directory は Next.js のデフォルト設定のままで問題ありません。
- 現時点では外部DBや環境変数は不要です。
- 静的データを更新した場合、再デプロイで反映されます。
- 将来的にDBやCMSへ移行する場合は、Vercel側で必要な環境変数を設定してください。

## 補足

この実行環境では npm registry の制限により scoped package の取得が `403 Forbidden` になる場合があります。通常のローカル環境またはVercelで `npm install` が通る前提で、依存関係と設定を整えています。
