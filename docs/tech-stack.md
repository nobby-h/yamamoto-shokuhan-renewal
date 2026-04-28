# 技術スタック詳細

## フロントエンド

### ビルドツール
- **Vite 6.x**: Webpack 4からの移行。HMR高速化、ES Modules対応
- 開発サーバー: `vite dev`
- ビルド: `vite build` → dist/ に出力

### CSS
- **TailwindCSS v4**: ユーティリティファーストCSS
  - カスタムテーマ設定（カラー・フォント・ブレークポイント）
  - `@apply` でコンポーネントクラス定義
- **代替案**: カスタムSCSS（クライアント/保守要件による判断）
  - PostCSS + Autoprefixer
  - CSS Custom Properties でテーマ管理

### JavaScript
- **Vanilla JS (ES2024)**: jQuery依存からの脱却
- **Alpine.js**: 軽量なリアクティブUI（必要箇所のみ）
  - ドロップダウン、モーダル、タブ切替等
- **GSAP 3 + ScrollTrigger**: ハイエンドアニメーション
  - パララックス効果
  - スクロール連動アニメーション
  - テキスト・要素のフェードイン
- **Swiper.js 11**: スライダー/カルーセル
  - ヒーロースライダー（フェード効果）
  - 実績・ニュースカルーセル
- **AOS (Animate On Scroll)**: 軽量スクロールアニメ（GSAP不要な箇所）

### 画像最適化
- **Sharp**: ビルド時のWebP/AVIF変換
- **vite-plugin-image-optimizer**: 自動画像最適化
- **SVG**: イラスト素材はインラインSVG（アニメーション対応）

## バックエンド（WordPress）

### WordPress環境
- **WordPress 6.x**: 最新安定版
- **PHP 8.1+**: Xserver対応バージョン
- **MySQL 8.0**: 既存DB(nobbyh_wp3)を継承

### テーマ構成
- **カスタムテーマ新規作成**: nano_tcd065からの移行
- テンプレート階層に準拠
- Viteとの連携: `wp-vite` プラグインまたはカスタムエンキュー

### 必須プラグイン（継続 or 代替）
| プラグイン | 用途 | 対応方針 |
|-----------|------|---------|
| Contact Form 7 | お問い合わせ | 継続 |
| Wordfence | セキュリティ | 継続 |
| WP Multibyte Patch | 日本語対応 | 継続 |
| BackWPup | バックアップ | 継続 |
| Akismet | スパム対策 | 継続 |
| Classic Editor | エディタ | 廃止（Gutenberg移行検討） |
| LifterLMS/Masterstudy/SFWD | LMS | 要件確認後に判断 |

### カスタムフィールド
- **ACF Pro**: カスタムフィールド管理（推奨）
- 既存テーマのカスタムメタボックスから移行

### SEO
- **Yoast SEO** または **Rank Math**: SEO管理
- JSON-LD構造化データ自動出力
- OGP / Twitter Card自動生成

## 開発環境

### ローカル開発
- **Local by Flywheel** または **wp-env**: ローカルWordPress環境
- **Vite Dev Server**: フロントエンド開発（HMR）

### バージョン管理
- **Git**: ソースコード管理
- `.gitignore`: wp-core, node_modules, .env, uploads 除外

### デプロイ
- **Xserver**: 本番環境
- SFTP経由のデプロイ（既存ワークフロー踏襲）
- ステージング環境での事前検証必須

## パフォーマンス最適化

### 読み込み
- Critical CSS インライン化
- JavaScript defer/async 適用
- フォント: `font-display: swap` + preload
- 画像: Lazy load + 適切なサイズ指定（width/height属性）

### キャッシュ
- ブラウザキャッシュ（.htaccess設定）
- 静的アセットにハッシュ付きファイル名

### 計測
- Lighthouse CI（ビルド時にスコア確認）
- Core Web Vitals モニタリング
