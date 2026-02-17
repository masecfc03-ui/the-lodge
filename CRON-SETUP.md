# Cron Setup for Automated Data Updates

## Set up automated data refresh for The Lodge

### 1. Edit crontab
```bash
crontab -e
```

### 2. Add hourly updates
```bash
# The Lodge - Update data every hour
0 * * * * cd /Users/masonmathis/.openclaw/workspace/the-lodge && ./scripts/update-data.sh >> /tmp/lodge-cron.log 2>&1

# The Lodge - Deploy data to frontend every hour  
5 * * * * cd /Users/masonmathis/.openclaw/workspace/the-lodge && ./scripts/deploy-data.sh >> /tmp/lodge-cron.log 2>&1
```

### 3. For more frequent updates (every 15 minutes)
```bash
# The Lodge - High frequency updates
*/15 * * * * cd /Users/masonmathis/.openclaw/workspace/the-lodge && ./scripts/update-data.sh >> /tmp/lodge-cron.log 2>&1
*/15 * * * * cd /Users/masonmathis/.openclaw/workspace/the-lodge && ./scripts/deploy-data.sh >> /tmp/lodge-cron.log 2>&1
```

### 4. Check cron logs
```bash
tail -f /tmp/lodge-cron.log
```

### 5. Verify cron is working
```bash
crontab -l  # List current cron jobs
```

## Alternative: macOS LaunchAgent

Create `~/Library/LaunchAgents/com.lodge.dataupdate.plist`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.lodge.dataupdate</string>
    <key>ProgramArguments</key>
    <array>
        <string>/Users/masonmathis/.openclaw/workspace/the-lodge/scripts/update-data.sh</string>
    </array>
    <key>StartInterval</key>
    <integer>3600</integer>
    <key>WorkingDirectory</key>
    <string>/Users/masonmathis/.openclaw/workspace/the-lodge</string>
    <key>StandardOutPath</key>
    <string>/tmp/lodge-update.log</string>
    <key>StandardErrorPath</key>
    <string>/tmp/lodge-update.log</string>
</dict>
</plist>
```

Load it:
```bash
launchctl load ~/Library/LaunchAgents/com.lodge.dataupdate.plist
launchctl start com.lodge.dataupdate
```