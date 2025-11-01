@echo off
REM Vighnaharta Steel Website Setup Script for Windows
echo 🏭 Setting up Vighnaharta Steel Website...
echo ========================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed!
    echo 📋 Install Node.js from https://nodejs.org/ (v20 LTS or higher)
    pause
    exit /b 1
)

REM Get Node.js version
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo 📦 Current Node.js version: %NODE_VERSION%

REM Check if package.json exists
if not exist "package.json" (
    echo ❌ package.json not found! Please run this script from the project root directory.
    pause
    exit /b 1
)

REM Install dependencies
echo.
echo 📦 Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully

REM Check project structure
echo.
echo 📁 Checking project structure...
if exist "src\components" (echo ✅ src\components exists) else (echo ⚠️  src\components missing)
if exist "src\pages" (echo ✅ src\pages exists) else (echo ⚠️  src\pages missing)
if exist "public\assets\images" (echo ✅ public\assets\images exists) else (echo ⚠️  public\assets\images missing)
if exist "app\api" (echo ✅ app\api exists) else (echo ⚠️  app\api missing)

REM Create .env.local if it doesn't exist
if not exist ".env.local" (
    echo.
    echo 📄 Creating .env.local file...
    (
        echo # Vighnaharta Steel Website Environment Variables
        echo NEXT_PUBLIC_SITE_NAME="Vighnaharta Steel Industries"
        echo NEXT_PUBLIC_SITE_URL="http://localhost:3000"
        echo.
        echo # Add your environment variables here
        echo # Example:
        echo # DATABASE_URL="your_database_url"
        echo # API_KEY="your_api_key"
    ) > .env.local
    echo ✅ .env.local created
) else (
    echo ✅ .env.local already exists
)

echo.
echo 🎉 Setup completed successfully!
echo.
echo 📋 Next steps:
echo    1. Run: npm run dev (to start development server)
echo    2. Open: http://localhost:3000 (to view the website)
echo    3. Edit files in src\ folder for frontend changes
echo    4. Edit files in app\ folder for backend API changes
echo.
echo 🔧 Available commands:
echo    npm run dev     - Start development server
echo    npm run build   - Build for production
echo    npm run start   - Start production server
echo    npm run lint    - Run ESLint
echo.
echo Happy coding! 🚀
pause


