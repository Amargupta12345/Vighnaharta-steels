#!/bin/bash

# Vighnaharta Steel Website Setup Script
echo "🏭 Setting up Vighnaharta Steel Website..."
echo "========================================"

# Check if Node.js is installed and get version
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo "📦 Current Node.js version: $NODE_VERSION"

    # Extract major version number
    NODE_MAJOR=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')

    if [ "$NODE_MAJOR" -lt 20 ]; then
        echo "⚠️  Node.js version $NODE_VERSION is too old!"
        echo "   Required: Node.js v20.17.0 or higher"
        echo ""
        echo "📋 To update Node.js:"
        echo "   1. Visit https://nodejs.org/"
        echo "   2. Download and install Node.js v20 LTS or higher"
        echo "   3. Or use nvm: 'nvm install 20 && nvm use 20'"
        echo ""
        echo "❌ Setup cannot continue with current Node.js version"
        exit 1
    else
        echo "✅ Node.js version is compatible"
    fi
else
    echo "❌ Node.js is not installed!"
    echo "📋 Install Node.js from https://nodejs.org/ (v20 LTS or higher)"
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found! Please run this script from the project root directory."
    exit 1
fi

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Check if required directories exist
echo ""
echo "📁 Checking project structure..."

REQUIRED_DIRS=("src/components" "src/pages" "public/assets/images" "app/api")
for dir in "${REQUIRED_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        echo "✅ $dir exists"
    else
        echo "⚠️  $dir missing"
    fi
done

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo ""
    echo "📄 Creating .env.local file..."
    cat > .env.local << EOL
# Vighnaharta Steel Website Environment Variables
NEXT_PUBLIC_SITE_NAME="Vighnaharta Steel Industries"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# Add your environment variables here
# Example:
# DATABASE_URL="your_database_url"
# API_KEY="your_api_key"
EOL
    echo "✅ .env.local created"
else
    echo "✅ .env.local already exists"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "   1. Run: npm run dev (to start development server)"
echo "   2. Open: http://localhost:3000 (to view the website)"
echo "   3. Edit files in src/ folder for frontend changes"
echo "   4. Edit files in app/ folder for backend API changes"
echo ""
echo "🔧 Available commands:"
echo "   npm run dev     - Start development server"
echo "   npm run build   - Build for production"
echo "   npm run start   - Start production server"
echo "   npm run lint    - Run ESLint"
echo ""
echo "Happy coding! 🚀"
