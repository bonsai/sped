# ユーザーにリポジトリ名を尋ねる
$name = Read-Host "GitHubリポジトリ名を入力してください"

# GitHub CLI認証（未認証の場合のみ）
gh auth status
if ($LASTEXITCODE -ne 0) {
    gh auth login
}

# Git初期化（既存の場合はスキップされます）
if (!(Test-Path ".git")) {
    git init
}

# GitHubリポジトリ作成＆初回プッシュ
gh repo create $name --public --source=. --remote=origin --push

# 以降の変更をコミット＆プッシュ
git add .
git commit -m "Update"
git branch -M main
git push -u origin main