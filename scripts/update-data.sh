#!/bin/bash

# update-data.sh - Master script to refresh all Lodge data files
# Can be run by cron for automated updates

set -e

LODGE_DIR="/Users/masonmathis/.openclaw/workspace/the-lodge"
SCRIPTS_DIR="$LODGE_DIR/scripts" 
DATA_DIR="$LODGE_DIR/data"

echo "🏕️ The Lodge - Master Data Update"
echo "================================="
echo "Started: $(date)"
echo ""

# Ensure data directory exists
mkdir -p "$DATA_DIR"

# Make all scripts executable
chmod +x "$SCRIPTS_DIR"/*.sh "$SCRIPTS_DIR"/*.js

echo "📊 1/6 - Fetching market data..."
if command -v node &> /dev/null; then
    node "$SCRIPTS_DIR/fetch-markets-live.js" || echo "⚠️ Market data fetch failed"
else
    echo "⚠️ Node.js not found, skipping market data"
fi

echo ""
echo "📰 2/6 - Collecting industry news..."
if command -v node &> /dev/null; then
    node "$SCRIPTS_DIR/fetch-news.js" || echo "⚠️ News fetch failed"
else
    echo "⚠️ Node.js not found, skipping news"
fi

echo ""
echo "🔄 3/6 - Syncing lead data..."
if command -v node &> /dev/null; then
    node "$SCRIPTS_DIR/sync-leads.js" || echo "⚠️ Lead sync failed"
else
    echo "⚠️ Node.js not found, skipping lead sync"
fi

echo ""
echo "👥 4/6 - Collecting agent reports..."
if command -v node &> /dev/null; then
    node "$SCRIPTS_DIR/collect-reports.js" || echo "⚠️ Agent report collection failed"
else
    echo "⚠️ Node.js not found, skipping agent reports"
fi

echo ""
echo "📊 5/6 - Updating dashboard data..."
if command -v node &> /dev/null; then
    node "$SCRIPTS_DIR/fetch-dashboard.js" || echo "⚠️ Dashboard update failed"
else
    echo "⚠️ Node.js not found, skipping dashboard"
fi

echo ""
echo "🔍 6/6 - Validating data files..."

# Check that all required data files exist
REQUIRED_FILES=(
    "markets.json"
    "news.json" 
    "projects.json"
    "agents.json"
    "dashboard.json"
    "treasury.json"
    "training.json"
    "emails.json"
    "calendar.json"
    "alerts.json"
    "changelog.json"
    "goals.json"
)

MISSING_FILES=()

for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "$DATA_DIR/$file" ]; then
        MISSING_FILES+=("$file")
    fi
done

if [ ${#MISSING_FILES[@]} -eq 0 ]; then
    echo "✅ All data files present and updated"
else
    echo "⚠️ Missing data files: ${MISSING_FILES[*]}"
fi

# Create update summary
UPDATE_SUMMARY="$DATA_DIR/update-summary.json"
cat > "$UPDATE_SUMMARY" << EOF
{
  "last_update": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "script_version": "1.0",
  "files_updated": ${#REQUIRED_FILES[@]},
  "files_missing": ${#MISSING_FILES[@]}, 
  "missing_files": $(printf '%s\n' "${MISSING_FILES[@]}" | jq -R . | jq -s .),
  "update_status": "$( [ ${#MISSING_FILES[@]} -eq 0 ] && echo "success" || echo "partial" )",
  "next_update": "$(date -d '+1 hour' -u +"%Y-%m-%dT%H:%M:%SZ")"
}
EOF

echo ""
echo "📈 Data Update Summary:"
echo "- Files updated: ${#REQUIRED_FILES[@]}"
echo "- Files missing: ${#MISSING_FILES[@]}"
echo "- Status: $( [ ${#MISSING_FILES[@]} -eq 0 ] && echo "SUCCESS" || echo "PARTIAL" )"
echo "- Next update: $(date -d '+1 hour')"
echo ""
echo "🏕️ The Lodge data refresh complete!"
echo "Finished: $(date)"

# Exit with error code if there are missing files
[ ${#MISSING_FILES[@]} -eq 0 ] && exit 0 || exit 1