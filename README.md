# Spec Kit + Windsurf Agent 環境構築

## 概要
このプロジェクトは、仕様駆動開発を実現するための環境を構築することを目的としています。要件を日本語で記述し、Gemini APIを使用してOpenAPI仕様を生成し、Spec Kitで検証後、Windsurf Agentを用いてコードを自動生成します。

## プロジェクト構成
- **agent.md**: エージェントの役割や実行フロー、技術スタック、コーディング規則を記述したファイルです。
- **want.md**: システムの概要、機能要件、非機能要件を記述したファイルです。
- **spec/generated/openapi.yml**: 生成されたOpenAPI仕様が格納されるYAMLファイルです。
- **scripts/generate-openapi.js**: 要件に基づいてOpenAPI仕様を生成するNode.jsスクリプトです。
- **.github/workflows/spec-driven.yml**: GitHub Actionsのワークフローを定義したファイルで、OpenAPIの生成、検証、コード生成のプロセスを自動化します。
- **package.json**: プロジェクトの依存関係やスクリプトを管理するnpmの設定ファイルです。

## セットアップ手順
1. 必要なものを準備します。
   - Gemini API Key
   - GitHub アカウント
   - Windsurf エディタ
   - Node.js 18+

2. リポジトリをクローンします。
   ```
   git clone <repository-url>
   cd spec-driven-project
   ```

3. 依存関係をインストールします。
   ```
   npm install
   ```

## 使い方
1. **要件を記述**: `want.md`にシステムの要件を記述します。
2. **自動実行**: `want.md`をコミット・プッシュすると、GitHub Actionsが自動的に実行されます。
3. **レビュー・マージ**: 生成されたコードをレビューし、必要に応じて修正後、マージします。

## トラブルシューティング
- **Gemini API エラー**: APIキーやリクエスト制限を確認してください。
- **Spec Kit 検証失敗**: YAML構文やOpenAPI仕様の準拠を確認してください。
- **Windsurf 連携エラー**: Webhook URLや設定を確認してください。

## 参考リンク
- [GitHub Spec Kit](https://github.com/github/spec-kit)
- [Windsurf Agent](https://windsurf.ai/docs)
- [Gemini API](https://ai.google.dev/)
- [OpenAPI 3.0](https://swagger.io/specification/)