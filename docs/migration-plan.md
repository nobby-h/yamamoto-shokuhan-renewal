# 移行計画

## フェーズ概要

### Phase 1: 設計・準備
- [ ] 現行サイトのコンテンツ棚卸し（テキスト・画像・動画）
- [ ] ワイヤーフレーム作成（トップページ + 主要下層ページ）
- [ ] デザインカンプ作成（Figma or Pencil）
- [ ] クライアント承認
- [ ] イラスト素材の制作/発注（SVGトラック、業務イラスト等）

### Phase 2: 静的コーディング
- [ ] 開発環境構築（Vite + TailwindCSS）
- [ ] トップページ HTML/CSS/JS コーディング
- [ ] アニメーション実装（GSAP + ScrollTrigger）
  - パララックス効果
  - トラックアニメーション
  - スクロールフェードイン
  - ヒーロースライダー
- [ ] 下層ページ コーディング
  - 会社紹介
  - 事業案内
  - 採用情報
  - ニュース
  - お問い合わせ
- [ ] レスポンシブ対応（モバイル/タブレット/デスクトップ）
- [ ] クロスブラウザテスト

### Phase 3: WordPress テーマ化
- [ ] カスタムテーマ作成（テンプレート階層構築）
- [ ] functions.php: Viteアセット読み込み、カスタム投稿タイプ登録
- [ ] ACF Pro カスタムフィールド設定
- [ ] テンプレートパーツ分割
- [ ] ナビゲーションメニュー登録
- [ ] ウィジェットエリア設定
- [ ] Contact Form 7 フォーム移行

### Phase 4: コンテンツ移行
- [ ] 既存投稿データの移行（WP All-in-One Migration or WP CLI）
- [ ] カスタムフィールドデータの移行・マッピング
- [ ] メディアファイル（画像・PDF）の移行
- [ ] 固定ページコンテンツの移行
- [ ] メニュー構成の再設定

### Phase 5: テスト・最適化
- [ ] Lighthouse パフォーマンス測定（目標: 90+）
- [ ] Core Web Vitals 確認
- [ ] モバイルユーザビリティテスト
- [ ] フォーム動作テスト
- [ ] 全リンクチェック
- [ ] SEO設定確認（meta, OGP, JSON-LD, sitemap）
- [ ] アクセシビリティチェック

### Phase 6: デプロイ
- [ ] ステージング環境で最終確認
- [ ] DNS切替 or ディレクトリ切替
- [ ] 旧URL→新URLリダイレクト設定（.htaccess）
- [ ] Google Search Console 再登録
- [ ] Google Analytics / GTM 設定確認
- [ ] 本番稼働後の監視（1週間）

---

## 既存テーマからの移行ポイント

### カスタム投稿タイプ（要再実装）
| 投稿タイプ | スラッグ | 移行方法 |
|-----------|---------|---------|
| News | news | functions.php で再登録 |
| Company | company | functions.php で再登録 |
| Service | service | functions.php で再登録 |
| Works | works | functions.php で再登録 |

### カスタムタクソノミー
| タクソノミー | 対象投稿タイプ | 移行方法 |
|-------------|--------------|---------|
| news_category | News | functions.php で再登録 |
| service_category | Service | functions.php で再登録 |

### テンプレートファイル対応表
| 既存テーマ | 新テーマ |
|-----------|---------|
| front-page.php | front-page.php |
| single-news.php | single-news.php |
| single-service.php | single-service.php |
| single-works.php | single-works.php |
| archive-news.php | archive-news.php |
| archive-service.php | archive-service.php |
| archive-works.php | archive-works.php |
| page-saiyou.php | page-recruit.php |
| page-school.php | 要確認 |

### 画像サイズ（再定義）
既存テーマで12種類以上定義済み → 必要最小限に整理:
- thumbnail: 300x300 (カード用)
- medium: 600x400 (一覧用)
- large: 1200x800 (詳細ページ用)
- hero: 1920x1080 (ヒーロー用)
- og-image: 1200x630 (OGP用)

---

## リスク・注意事項

1. **LMSプラグイン**: LifterLMS, Masterstudy, SFWD が3つ入っている → 実際に使用中か要確認
2. **セキュリティプラグイン**: Wordfence + WP Cerber の重複 → 1つに統合推奨
3. **旧URLのSEO**: リダイレクト設定が不完全だとSEO評価が下がる
4. **Xserver制限**: PHPメモリ上限、実行時間制限の確認
5. **データベース**: 既存DB(nobbyh_wp3)をそのまま使うか、新規作成するか判断
