#!/bin/bash

# deploy-data.sh - Update data and deploy to frontend directories

LODGE_DIR="/Users/masonmathis/.openclaw/workspace/the-lodge"
DATA_DIR="$LODGE_DIR/data"
PUBLIC_DIR="$LODGE_DIR/public"
DIST_DIR="$LODGE_DIR/dist"

echo "🔄 Deploying Lodge data files..."

# Update all data first
cd "$LODGE_DIR"
./scripts/update-data.sh

# Copy to public directory (for dev server)
mkdir -p "$PUBLIC_DIR/data"
cp -r "$DATA_DIR"/* "$PUBLIC_DIR/data/"
echo "✅ Data copied to public directory"

# Copy to dist directory (for production build)
if [ -d "$DIST_DIR" ]; then
    mkdir -p "$DIST_DIR/data"
    cp -r "$DATA_DIR"/* "$DIST_DIR/data/"
    echo "✅ Data copied to dist directory"
fi

echo "🏕️ Data deployment complete!"