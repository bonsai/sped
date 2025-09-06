# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
npm install

# Install TypeScript and type definitions
Write-Host "🔧 Setting up TypeScript..." -ForegroundColor Cyan
npm install --save-dev typescript @types/node ts-node

# Install other required packages
Write-Host "📦 Installing additional packages..." -ForegroundColor Cyan
npm install commander

# Create a sample gemini.txt if it doesn't exist
$geminiPath = Join-Path -Path $PSScriptRoot -ChildPath "gemini.txt"
if (-not (Test-Path $geminiPath)) {
    Write-Host "📝 Creating sample gemini.txt..." -ForegroundColor Cyan
    @"
# Gemini API Configuration
GEMINI_API_KEY=your_api_key_here
MODEL_NAME=gemini-1.5-pro
"@ | Out-File -FilePath $geminiPath -Encoding utf8
    Write-Host "✅ Created $geminiPath" -ForegroundColor Green
    Write-Host "   Please update it with your actual Gemini API key" -ForegroundColor Yellow
}

# Build the project
Write-Host "🔨 Building the project..." -ForegroundColor Cyan
npm run build

Write-Host "
✨ Setup complete! Here's what you can do next:" -ForegroundColor Green
Write-Host "1. Edit gemini.txt and add your API key" -ForegroundColor Cyan
Write-Host "2. Run 'npm start' to start the CLI" -ForegroundColor Cyan
Write-Host "3. Or use 'npm run dev' for development" -ForegroundColor Cyan
