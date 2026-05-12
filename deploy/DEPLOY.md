# ConoHa VPS デプロイ手順 — new.yamamoto-shokuhan.com

このサイトは Vite でビルド済みの**静的サイト**です。PHP・データベース不要。

## 1. 旧サイトのバックアップ（事前作業 — ユーザー側）

- [ ] 旧 WordPress の DB ダンプ（mysqldump）
- [ ] `wp-content/`（テーマ・uploads・plugins）一式
- [ ] `wp-config.php` と `.htaccess`
- [ ] 旧サイトの静的キャプチャ（任意）

バックアップ取得後、旧サイトのファイル群はそのまま VPS 上に残しても構いません（DNS は使わなくなるため事実上アクセス不可になります）。

## 2. アップロード

### 2-1. ZIP の中身
- `dist.zip` を解凍すると、サイトのルート構成（`index.html`, `about.html`, `assets/`, …）がそのまま出てきます。
- これを VPS の **ドキュメントルート** に配置します。標準パス例: `/var/www/yamamoto-shokuhan/`

### 2-2. ConoHa パネル/SFTP でのアップロード手順
1. ConoHa の VPS にログイン
2. SSH で接続できる場合は次を実行（推奨）:
   ```bash
   ssh root@<your-vps-ip>
   sudo mkdir -p /var/www/yamamoto-shokuhan
   sudo chown -R $(whoami):$(whoami) /var/www/yamamoto-shokuhan
   ```
3. SFTP クライアント（FileZilla / Cyberduck / Termius など）で `/var/www/yamamoto-shokuhan/` に接続
4. ローカルで `dist.zip` を解凍した中身を**全てアップロード**
5. アップロード後、所有権を Nginx 実行ユーザーに変更:
   ```bash
   sudo chown -R www-data:www-data /var/www/yamamoto-shokuhan
   sudo find /var/www/yamamoto-shokuhan -type d -exec chmod 755 {} \;
   sudo find /var/www/yamamoto-shokuhan -type f -exec chmod 644 {} \;
   ```
   *Ubuntu/Debian は `www-data`、AlmaLinux/Rocky/CentOS は `nginx`。`ps -ef | grep nginx` で確認できます。*

## 3. Nginx 設定

### 3-1. 設定ファイル設置
同梱の `nginx-yamamoto-shokuhan.conf` を VPS にアップ:

**Ubuntu/Debian の場合:**
```bash
sudo cp nginx-yamamoto-shokuhan.conf /etc/nginx/sites-available/yamamoto-shokuhan
sudo ln -sf /etc/nginx/sites-available/yamamoto-shokuhan /etc/nginx/sites-enabled/yamamoto-shokuhan

# 旧サイトの設定ファイルがあれば無効化
sudo rm -f /etc/nginx/sites-enabled/<旧WordPressサイトの設定名>
```

**AlmaLinux/Rocky/CentOS の場合:**
```bash
sudo cp nginx-yamamoto-shokuhan.conf /etc/nginx/conf.d/yamamoto-shokuhan.conf
# 旧サイトの設定があれば、ファイル名末尾を .disabled にリネーム等で停止
```

### 3-2. SSL 証明書

旧サイトで既に `new.yamamoto-shokuhan.com` の Let's Encrypt 証明書が発行済みなら、そのまま使えます（`/etc/letsencrypt/live/new.yamamoto-shokuhan.com/` のパスを Nginx 設定で指定済み）。

新規発行/再発行する場合:
```bash
sudo apt install certbot python3-certbot-nginx   # Ubuntu/Debian
# または
sudo dnf install certbot python3-certbot-nginx   # AlmaLinux/Rocky

sudo certbot --nginx -d new.yamamoto-shokuhan.com
```

### 3-3. 設定テストとリロード
```bash
sudo nginx -t              # 構文チェック
sudo systemctl reload nginx
```

## 4. DNS 切替

ConoHa VPS の DNS 管理画面で、`new.yamamoto-shokuhan.com` の A レコードが VPS の IP を指していることを確認。
（旧サイトと同じ VPS なら DNS 変更は不要です。Nginx の設定ファイル切替で完了します。）

## 5. 動作確認

```bash
curl -I https://new.yamamoto-shokuhan.com/                 # 200 を期待
curl -I https://new.yamamoto-shokuhan.com/about.html       # 200 を期待
curl -I https://new.yamamoto-shokuhan.com/company/         # 301 → /about.html
curl -I https://new.yamamoto-shokuhan.com/service/unsou/   # 301 → /service/unsou.html
```

ブラウザで以下を確認:
- [ ] トップページが表示される
- [ ] 4事業部のリンクが正しく機能する
- [ ] アクセスのGoogleマップが表示される
- [ ] お問い合わせフォームが動作する（送信先は確認必要）
- [ ] 旧URL（`/company/`等）が新URLにリダイレクトされる
- [ ] スマホ表示が崩れない

## 6. 旧サイトファイルの整理（任意）

新サイトの動作確認後、旧 WordPress ファイル群を退避:

```bash
sudo mv /var/www/<旧WordPressディレクトリ> /var/backups/old-yamamoto-wordpress-$(date +%Y%m%d)
```

（または完全削除）

## トラブルシュート

| 症状 | 確認 |
|------|------|
| 502 / 504 | `sudo systemctl status nginx` / `sudo nginx -t` |
| 403 Forbidden | ファイル所有権・パーミッション（`ls -la /var/www/yamamoto-shokuhan/`） |
| 画像が表示されない | `/assets/` 内のファイルが存在するか、Nginx のロケーションブロックが正しいか |
| 旧URL リダイレクトされない | Nginx 設定をリロードしたか（`sudo systemctl reload nginx`） |
| お問い合わせフォーム送信失敗 | Contact Form 7 から Netlify Forms 等に切り替えが必要。別途相談。 |

## 注意事項

- **お問い合わせフォーム**: 旧サイトは Contact Form 7（PHP）でしたが、新サイトは静的HTMLのため Contact Form 7 は動作しません。フォーム送信先の切替が必要です（Formspree / Getform / Cloudflare Workers / Netlify Forms など）。現状は `/contact.html` のフォームが**実際には送信できない可能性**があります。事前にテスト送信して動作を確認してください。
- **ニュース管理画面**: `/admin/` 配下に Supabase 連携のニュース管理画面があります。これは Supabase に依存しているため、Supabase の URL / API キー（環境変数）が正しく埋め込まれた状態でビルドする必要があります。
