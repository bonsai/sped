@echo off
echo 📦 Installing dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install dependencies
    exit /b %ERRORLEVEL%
)

echo 🔧 Setting up TypeScript...
call npm install --save-dev typescript @types/node ts-node

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to set up TypeScript
    exit /b %ERRORLEVEL%
)

echo 📦 Installing additional packages...
call npm install commander @types/commander

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install additional packages
    exit /b %ERRORLEVEL%
)

if not exist "gemini.txt" (
    echo 📝 Creating sample gemini.txt...
    (
        echo # Gemini API Configuration
        echo GEMINI_API_KEY=your_api_key_here
        echo MODEL_NAME=gemini-1.5-pro
    ) > gemini.txt
    echo ✅ Created gemini.txt
    echo    Please update it with your actual Gemini API key
)

echo 🔨 Building the project...
call npx tsc

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Build failed
    exit /b %ERRORLEVEL%
)

echo.
echo ✨ Setup complete! Here's what you can do next:
echo 1. Edit gemini.txt and add your API key
echo 2. Run 'npm start' to start the CLI
echo 3. Or use 'npm run dev' for development

pause
