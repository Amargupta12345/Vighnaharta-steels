#!/bin/bash

# CSS Fix Script for Vighnaharta Steel Website
echo "🎨 Fixing CSS Issues..."
echo "========================"

# Step 1: Clean existing installation
echo "🧹 Cleaning existing installation..."
rm -rf node_modules package-lock.json .next

# Step 2: Install correct dependencies
echo "📦 Installing correct Tailwind CSS v3 dependencies..."
npm install

# Step 3: Build Tailwind CSS
echo "🎨 Building Tailwind CSS..."
npx tailwindcss -i ./src/styles/globals.css -o ./src/styles/output.css --watch &

# Step 4: Start development server
echo "🚀 Starting development server..."
npm run dev

echo "✅ CSS should now be working!"
echo "🌐 Open http://localhost:3000 in your browser"
