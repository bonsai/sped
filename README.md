# SPED - Simple Project Environment for Development

## 概要
シンプルなプロジェクト環境を素早く構築するためのツールセットです。

## 特徴
- シンプルなコマンドでプロジェクトを初期化
- 自動生成されたAPIエンドポイント
- モダンなフロントエンドとバックエンドの統合

## クイックスタート

```bash
# プロジェクトの初期化
node sped.js init

# 開発サーバーの起動
node sped.js start

# クライアントのビルド
node sped.js build
```

## プロジェクト構成
```
.
├── config/               # 設定ファイル
│   └── sped.config.json  # メイン設定
├── server/              # バックエンド
├── client/              # フロントエンド
└── spec/                # API仕様
    └── openapi.yml      # OpenAPI仕様
```

## 開発

### 必要な環境
- Node.js 18+
- npm 9+

### 依存関係のインストール
```bash
# ルートディレクトリで
npm install

# サーバー依存関係
cd server
npm install

# クライアント依存関係
cd ../client
npm install
```

## デプロイ
```bash
# 本番ビルド
node sped.js build --prod

# デプロイ
node sped.js deploy
```

## ライセンス
MIT