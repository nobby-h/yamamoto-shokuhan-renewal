# デザインガイドライン

## カラースキーム

参考サイトの傾向を踏まえた配色案（最終決定はクライアント承認後）:

### プライマリカラー
```css
--color-primary: #1a6fb5;       /* メインブルー — 信頼・安定 */
--color-primary-light: #3a9fd8; /* ライトブルー — ホバー・アクセント */
--color-primary-dark: #0e4a7a;  /* ダークブルー — 見出し・強調 */
```

### セカンダリカラー
```css
--color-secondary: #2ecc71;     /* グリーン — CTA・アクセント */
--color-secondary-dark: #27ae60;
```

### ニュートラル
```css
--color-white: #ffffff;
--color-bg: #f8f9fa;            /* 背景グレー */
--color-bg-alt: #eef2f7;        /* セクション交互背景 */
--color-text: #2c3e50;          /* 本文テキスト */
--color-text-light: #6c7a89;    /* サブテキスト */
--color-border: #dce1e6;        /* ボーダー */
```

### アクセント
```css
--color-accent: #e74c3c;        /* 注意・緊急（求人CTA等） */
--color-accent-warm: #f39c12;   /* 暖色アクセント */
```

## タイポグラフィ

### フォント
```css
/* 見出し — 太く視認性高く */
--font-heading: "Noto Sans JP", "Hiragino Kaku Gothic ProN", sans-serif;
--font-heading-en: "Montserrat", sans-serif;

/* 本文 — 可読性重視 */
--font-body: "Noto Sans JP", "Hiragino Kaku Gothic ProN", sans-serif;
```

### サイズスケール（clamp関数でレスポンシブ）
```css
--text-xs: clamp(0.7rem, 0.65rem + 0.25vw, 0.8rem);
--text-sm: clamp(0.8rem, 0.75rem + 0.3vw, 0.9rem);
--text-base: clamp(0.9rem, 0.85rem + 0.35vw, 1rem);
--text-lg: clamp(1.1rem, 1rem + 0.5vw, 1.25rem);
--text-xl: clamp(1.3rem, 1.1rem + 1vw, 1.75rem);
--text-2xl: clamp(1.6rem, 1.3rem + 1.5vw, 2.25rem);
--text-3xl: clamp(2rem, 1.5rem + 2.5vw, 3rem);
--text-hero: clamp(2.5rem, 2rem + 3vw, 4rem);
```

### 見出しスタイル（参考: 桐原商事・大橋運輸）
- **h1**: hero用。超大型、英字サブタイトル付き
- **h2**: セクション見出し。大きめ + 英字小見出し + 下線アクセント
- **h3**: カード・ブロック見出し。中サイズ、太字
- 見出しには英字サブタイトルを併記するパターン（例: "会社概要 / About Us"）

## アニメーション

### スクロールアニメーション（AOS / GSAP ScrollTrigger）
- フェードイン（上・左・右から）: 各セクション進入時
- スライドイン: カード要素の順次表示（stagger: 0.1s）
- カウントアップ: 数値データ（実績・台数等）

### パララックス効果（参考: 夢前急送）
- ヒーローセクション: 背景画像固定 + コンテンツスクロール
- セクション間: 背景画像の速度差でレイヤー感
- `background-attachment: fixed` + GSAP ScrollTrigger

### イラストアニメーション（参考: ヨシダ商事・桐原商事）
- トラック走行アニメ: CSS keyframes で画面横断
- 荷物・段ボールのバウンスアニメ
- ページ遷移時のトラック走行ローディング（オプション）

### ヒーロースライダー（参考: 大橋運輸・和光興業）
- Swiper.js: フェードエフェクト、5秒自動切替
- PC/SP 画像切替対応
- テキストオーバーレイのフェードイン

### マイクロインタラクション
- ボタンホバー: スケール拡大 + 色変化 + シャドウ
- リンクホバー: 下線アニメーション
- ナビゲーション: ドロップダウンのスライド展開
- スクロールトップボタン: フェード表示/非表示

## レイアウト

### グリッドシステム
```css
--container-max: 1200px;
--container-padding: clamp(1rem, 3vw, 2rem);
--section-gap: clamp(4rem, 8vw, 8rem);
```

### セクション構成パターン
1. **全幅ヒーロー**: 画像/動画 + オーバーレイテキスト
2. **2カラム**: テキスト + 画像（交互配置）
3. **カードグリッド**: 3〜4列のカード配置（サービス紹介等）
4. **フルブリード背景**: 背景色/画像 + 中央コンテンツ
5. **タイムライン**: 沿革・実績の時系列表示

### レスポンシブ設計
- **モバイルファースト**
- 480px以下: 1カラム、ハンバーガーメニュー
- 768px: 2カラムグリッド開始
- 1024px: フルナビゲーション表示
- 1280px: 最大幅コンテナ

## 画像・メディア

### 画像フォーマット
- WebP優先（AVIF対応ブラウザにはAVIF）
- `<picture>` タグでフォールバック
- Lazy loading: `loading="lazy"` + Intersection Observer

### 動画
- ヒーロー動画: MP4 + WebM（自動再生、ミュート、ループ）
- YouTube埋め込み: Lite YouTube Embed（パフォーマンス考慮）

### イラスト
- SVG形式で制作（アニメーション対応）
- トラック、倉庫、配送スタッフ等の業種イラスト
- カラーはCSS変数で制御可能に

## コンポーネント

### ヘッダー
- 固定ヘッダー（スクロールで縮小）
- ロゴ + ナビ + CTA（お問い合わせ）
- モバイル: ハンバーガーメニュー（ドロワー）

### フッター
- 3〜4カラム: サイトマップ、会社情報、SNS、お問い合わせ
- グループ会社リンク
- コピーライト

### CTA（Call to Action）
- お問い合わせ: 固定フローティングボタン（モバイル）
- 求人応募: 目立つ配色（アクセントカラー）
- 電話番号: ヘッダーに常時表示
