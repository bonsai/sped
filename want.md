# VSCode拡張 - Java Project Manager

## Project Overview

This project contains various components, including:

- **a**: A file containing initial project details.
- **newDirectory**: A directory with a sample file `newFile.txt`.
- **newExtension**: A directory containing a VSCode extension implementation in `newExtension.ts`.

## プロジェクト構成

```
java-project-manager/
├── package.json              # 拡張メタデータ
├── src/
│   ├── extension.ts         # メインエントリポイント
│   ├── commands/
│   │   ├── scanProject.ts   # プロジェクト分析コマンド
│   │   ├── setupProject.ts  # 環境セットアップコマンド
│   │   └── installJdk.ts    # JDKインストールコマンド
│   ├── providers/
│   │   └── statusBar.ts     # ステータスバー管理
│   └── utils/
│       ├── powershell.ts    # PowerShell実行ユーティリティ
│       └── config.ts        # 設定管理
├── scripts/
│   └── project-manager.ps1  # 既存PowerShellスクリプト
├── resources/
│   └── icons/               # アイコンファイル
└── README.md
```

## 開発セットアップ

### 1. 拡張開発環境準備

- Node.js環境確認
- Yeomanと拡張ジェネレーターインストール
- 新しい拡張プロジェクト作成

### 2. 拡張設定

**package.json** - 拡張メタデータ  
拡張の基本情報、コマンド、設定、スクリプト、依存関係などを定義します。

### 3. TypeScript実装

- **src/extension.ts** - メインエントリポイント  
  VSCode拡張のアクティベート・コマンド登録・ステータスバー管理などを実装します。

- **src/utils/powershell.ts** - PowerShell実行ユーティリティ  
  PowerShellスクリプトの実行をTypeScriptから行うためのユーティリティです。

### 4. ビルド・パッケージング

- 開発中のコンパイル
- ウォッチモード（開発時）
- VSIXパッケージ作成
- ローカルインストール（テスト用）

### 5. デバッグ・テスト

- `launch.json`でF5でデバッグ可能

## How to Use

1. コマンドパレット (`Ctrl+Shift+P`)
2. "Java Project" で検索
3. 実行したいコマンドを選択
4. Navigate through the directories to explore the files.
5. Refer to `newExtension/newExtension.ts` for the VSCode extension implementation.
6. Use `newDirectory/newFile.txt` as a placeholder for additional content.

## 注意事項 / Notes

- PowerShell実行ポリシーの設定が必要
- 初回実行時はスクリプトパスの設定推奨
- Windows環境推奨（PowerShellスクリプト依存）
- Ensure all dependencies are installed before running the extension.
- Modify the files as needed to suit your project requirements.