# ヤマモト食販株式会社 公式サイト

公式ウェブサイトのリニューアルプロジェクト。

- **Production**: https://yamamoto-news.netlify.app
- **Build**: Vite + Vanilla JS + SCSS + Alpine.js + Swiper
- **Backend**: Supabase（お知らせCMS）
- **Hosting**: Netlify（GitHub連携・自動デプロイ）

## 開発

```bash
npm install
npm run dev      # ローカル開発（http://localhost:3000）
npm run build    # プロダクションビルド
```

`.env` に Supabase 設定が必要：

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

## 構成

- `index.html` / `about.html` / `service.html` / `news.html` / `recruit.html` / `contact.html`
- `service/{unsou,jinzai,jidousha}.html` — 事業詳細
- `admin/index.html` — お知らせ管理（Supabase Auth）
- `src/` — JS / SCSS / 画像
- `public/` — 静的アセット（フォント等）

## デプロイ

`main` ブランチへのpushで Netlify が自動ビルド・デプロイ。
