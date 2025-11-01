#!/bin/bash

# Quick start script for Vighnaharta Steel Website
echo "🏭 Starting Vighnaharta Steel Website..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Dependencies not found. Running setup first..."
    npm run setup
fi

# Start the development server
echo "🚀 Starting development server..."
npm run dev


