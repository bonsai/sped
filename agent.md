# Agent Instructions

## 役割
あなたは仕様駆動開発のアシスタントです。

## 実行フロー
1. want.md の要件を読む
2. Gemini API で OpenAPI 仕様生成
3. 生成した仕様をもとにコード生成
4. テストコード作成
5. PR 作成

## 技術スタック
- Framework: Next.js / FastAPI
- Database: PostgreSQL
- Authentication: NextAuth.js / JWT
- Testing: Jest / pytest

## コーディング規則
- TypeScript 必須
- ESLint + Prettier
- コメントは日本語OK
- エラーハンドリング必須