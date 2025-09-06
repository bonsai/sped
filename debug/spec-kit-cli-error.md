# spec-kit validate コマンドエラーまとめ

## エラーの本質
- 実行したコマンド：
  ```
  python spec-kit/src/specify_cli/__init__.py validate spec/generated/openapi.yml
  ```
- エラー内容：
  ```
  No such command 'validate'.
  ```
- 原因：
  - `spec-kit/src/specify_cli/__init__.py` は CLI のエントリポイントですが、`validate` というサブコマンドが定義されていません。
  - もしくは、正しい CLI 実行方法が異なる可能性があります。

## 種類
- コマンド定義ミス：CLI のサブコマンドが存在しない。
- 実行方法の誤り：本来は `python -m specify_cli` や `python spec-kit/src/specify_cli/cli.py` など、別のファイルや方法で実行する必要がある場合。

## 解消法
1. **正しい spec-kit CLI 実行方法を確認する**
   - `README.md` や `pyproject.toml` を参照し、正しいコマンドを調べる。
   - 例：
     ```
     python -m specify_cli validate spec/generated/openapi.yml
     ```
     または
     ```
     python spec-kit/src/specify_cli/cli.py validate spec/generated/openapi.yml
     ```
2. **コマンド一覧を表示して確認**
   - `python spec-kit/src/specify_cli/__init__.py --help`
   - `python -m specify_cli --help`
   - で利用可能なコマンドを確認。
3. **CLI 実装を修正する**
   - 必要なら `validate` コマンドを追加する。

---

## 参考
- [spec-kit/README.md](spec-kit/README.md)
- [spec-kit/pyproject.toml](spec-kit/pyproject.toml)

---

この内容をもとに、正しい spec-kit の使い方を調査・修正してください。
