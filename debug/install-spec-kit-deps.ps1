# spec-kit の依存をインストールする PowerShell スクリプト
$python = "C:\Users\dance\python-sdk\python3.13.2\python.exe"

# pip がなければ get-pip.py でインストール
& $python -m ensurepip

# pip をアップグレード
& $python -m pip install --upgrade pip

# spec-kit の主要依存をインストール
& $python -m pip install typer rich pyyaml httpx readchar
