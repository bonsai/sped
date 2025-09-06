# Deploy script for SPED (Simple Project Environment for Development)

# Configuration
$REPO_NAME = "SPED"
$GIT_REMOTE = "origin"
$MAIN_BRANCH = "main"

function Show-Header {
    Clear-Host
    Write-Host "=== SPED Deployment Script ===" -ForegroundColor Cyan
    Write-Host "1. Initialize Git Repository"
    Write-Host "2. Deploy to GitHub"
    Write-Host "3. Full Setup & Deploy"
    Write-Host "Q. Quit"
    Write-Host "============================" -ForegroundColor Cyan
}

function Initialize-GitRepository {
    # Check if Git is installed
    if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
        Write-Error "Git is not installed. Please install Git and try again."
        exit 1
    }

    # Initialize Git repository if not already initialized
    if (-not (Test-Path ".git")) {
        Write-Host "Initializing Git repository..." -ForegroundColor Yellow
        git init
        
        # Create .gitignore if it doesn't exist
        if (-not (Test-Path ".gitignore")) {
            @"
# Dependencies
node_modules/

# Environment variables
.env

# Logs
logs
*.log

# Build output
dist/
build/

# IDE specific files
.vscode/
.idea/

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
"@ | Out-File -FilePath ".gitignore" -Encoding utf8
        }
    }

    # Add all files to Git
    git add .
    
    # Make initial commit if no commits exist
    if (-not (git rev-parse --verify HEAD 2>$null)) {
        git commit -m "Initial commit"
    }
    
    Write-Host "✓ Git repository initialized" -ForegroundColor Green
}

function Deploy-ToGitHub {
    # Check if GitHub CLI is installed
    if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
        Write-Error "GitHub CLI is not installed. Please install it from https://cli.github.com/"
        exit 1
    }

    # Check if user is logged in to GitHub
    $ghAuthStatus = gh auth status 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Logging in to GitHub..." -ForegroundColor Yellow
        gh auth login
    }

    # Create GitHub repository if it doesn't exist
    $repoExists = gh repo view $REPO_NAME 2>$null
    if (-not $repoExists) {
        Write-Host "Creating GitHub repository '$REPO_NAME'..." -ForegroundColor Yellow
        gh repo create $REPO_NAME --public --confirm
    }

    # Add remote if it doesn't exist
    $remoteUrl = git remote get-url $GIT_REMOTE 2>$null
    if (-not $remoteUrl) {
        $githubUser = gh api user --jq '.login' 2>$null
        if (-not $githubUser) {
            Write-Error "Failed to get GitHub username"
            exit 1
        }
        $remoteUrl = "https://github.com/$githubUser/$REPO_NAME.git"
        git remote add $GIT_REMOTE $remoteUrl
    }

    # Push to GitHub
    Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
    git push -u $GIT_REMOTE $MAIN_BRANCH
    
    Write-Host "✓ Successfully deployed to GitHub" -ForegroundColor Green
    Write-Host "Repository URL: $remoteUrl" -ForegroundColor Cyan
}

# Main script execution
$choice = $null
while ($choice -ne "Q") {
    Show-Header
    $choice = Read-Host "Select an option"
    
    switch ($choice) {
        "1" { 
            Initialize-GitRepository
            Pause
        }
        "2" { 
            Deploy-ToGitHub
            Pause
        }
        "3" {
            Initialize-GitRepository
            Deploy-ToGitHub
            Pause
        }
        "Q" { 
            Write-Host "Goodbye!" -ForegroundColor Green
            exit 0 
        }
        default { 
            Write-Host "Invalid option. Please try again." -ForegroundColor Red
            Start-Sleep -Seconds 2
        }
    }
}
