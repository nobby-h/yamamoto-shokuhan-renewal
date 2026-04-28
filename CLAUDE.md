# ヤマモト食販 ウェブサイトリニューアル

## プロジェクト概要

- **サイト**: new.yamamoto-shokuhan.net
- **業種**: 食品販売・運送業（グループ企業あり）
- **目的**: 既存WordPressサイトのフルリニューアル
- **方針**: 最新トレンドのデザイン・アニメーションで魅力あるサイトへ刷新
- **コンテンツ**: 会社紹介、グループ紹介、外部求人サイト等は現行内容を継続

## 既存サイト情報

- **CMS**: WordPress（Xserver: mysql2001.xserver.jp）
- **テーマ**: NANO (nano_tcd065) + 子テーマ
- **ビルド**: Webpack 4 + Babel 7 + SCSS
- **プラグイン**: Contact Form 7, Wordfence, LifterLMS 等18個
- **カスタム投稿タイプ**: News, Company, Service, Works
- **既存ソース**: `../Newヤマモト食版/` ディレクトリに格納

## デザイン方針

クライアントが参考サイトから特に気に入ったポイント:

1. **イラスト・アニメーション** — トラックや業務イラストをCSS/SVGアニメで動かす
2. **パララックス（背景固定スクロール）** — 背景画像を固定しコンテンツがスライド
3. **色遣い・見出し** — 青系アクセント、大きく見やすい見出し、清潔感ある配色
4. **動画・写真差込** — ヒーローセクションに動画/スライドショー
5. **シンプルで見やすい配置** — 余白を活かした整理されたレイアウト

→ 詳細は `docs/design-guidelines.md` を参照

## 技術スタック（リニューアル後）

→ 詳細は `docs/tech-stack.md` を参照

### フロントエンド
- **HTML/CSS**: セマンティックHTML5 + TailwindCSS v4（またはカスタムSCSS）
- **JS**: Vanilla JS（ES2024）+ 必要に応じてAlpine.js
- **アニメーション**: GSAP + ScrollTrigger / AOS / CSS Keyframes
- **スライダー**: Swiper.js
- **ビルド**: Vite

### バックエンド
- **CMS**: WordPress（既存環境を継承）
- **テーマ**: カスタムテーマを新規作成（既存tcd065からの移行）
- **PHP**: 8.1+

## ディレクトリ構成

```
001_ヤマモト食販リニューアル/
├── CLAUDE.md              # このファイル
├── docs/                  # プロジェクト指示書
│   ├── design-guidelines.md   # デザインガイドライン
│   ├── tech-stack.md          # 技術スタック詳細
│   ├── reference-sites.md     # 参考サイト分析
│   ├── page-structure.md      # ページ構成・サイトマップ
│   └── migration-plan.md      # 移行計画
├── theme/                 # 新WordPressテーマ
│   ├── src/               # ソースコード
│   │   ├── css/           # SCSS/TailwindCSS
│   │   ├── js/            # JavaScript
│   │   └── images/        # 画像素材
│   ├── dist/              # ビルド出力
│   ├── template-parts/    # テンプレートパーツ
│   ├── inc/               # PHPインクルード
│   ├── functions.php
│   ├── style.css
│   └── vite.config.js
├── assets/                # デザイン素材
│   ├── illustrations/     # SVGイラスト素材
│   ├── photos/            # 写真素材
│   └── videos/            # 動画素材
└── tasks/                 # タスク管理
    └── todo.md
```

## コーディング規約

### HTML
- セマンティックタグ使用（header, nav, main, section, article, footer）
- BEM命名規則（Block__Element--Modifier）
- アクセシビリティ: WAI-ARIA、alt属性必須

### CSS
- モバイルファースト設計
- CSS Custom Properties でカラーテーマ管理
- ブレークポイント: 480px / 768px / 1024px / 1280px

### JavaScript
- ES Modules使用
- DOM操作はVanilla JS優先（jQuery非依存を目指す）
- アニメーションはGSAP or CSS優先、requestAnimationFrame活用

### PHP (WordPress)
- WordPress Coding Standards準拠
- エスケープ・サニタイズ徹底（esc_html, wp_kses等）
- カスタムフィールドはACF Pro使用を推奨

## 開発ワークフロー

1. デザインカンプ作成 → クライアント承認
2. 静的HTML/CSSコーディング（トップページ → 下層ページ）
3. WordPressテーマ化
4. コンテンツ移行（既存サイトからのデータ移行）
5. テスト・検証（クロスブラウザ、モバイル、パフォーマンス）
6. 本番デプロイ

## パフォーマンス目標

- Lighthouse Performance: 90+
- LCP: < 2.5s
- CLS: < 0.1
- FID: < 100ms
- 画像: WebP/AVIF + lazy load
- Core Web Vitals 全項目 Good判定

## SEO要件

- 構造化データ（JSON-LD）: Organization, LocalBusiness, BreadcrumbList
- meta description / OGP / Twitter Card 全ページ設定
- sitemap.xml / robots.txt 最適化
- 既存URLからのリダイレクト設定

## 注意事項

- 既存コンテンツ（テキスト・画像）は基本的に流用
- 外部求人サイトへのリンクは維持
- Contact Form 7は継続使用（または同等機能で置換）
- Xserverの制約を考慮（PHP/MySQL バージョン、メモリ制限等）
- 本番デプロイ前に必ずステージング環境で検証
