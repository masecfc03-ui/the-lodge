# The Lodge — Vision Doc

**"Built for Land. Built for War. Built for Legacy."**

## What It Is
Mason's Life OS. One page he opens every morning. Everything he needs to run his life, businesses, health, and finances — unified, automated, 24/7.

## Design Language
- See `design-reference.jpg` — THIS IS THE TARGET AESTHETIC
- Dark mahogany wood panels, brass fixtures, warm amber lighting
- Leather furniture, stone fireplace, antler mounts
- Data screens embedded in the lodge environment (not floating over it)
- NOT a pixel game, NOT a generic dashboard — an immersive lodge UI
- Each room has a rich background with data overlaid naturally
- Think: high-end whiskey lounge meets Bloomberg terminal
- Mobile-first, loads fast, works on phone from the toilet at 6 AM

## Tech
- Modern web dashboard (HTML/CSS/JS) — NOT Phaser.js game engine
- Sidebar/tab navigation between rooms (one tap, instant)
- CSS background images + overlaid data panels with lodge theming
- PWA capable (add to home screen)
- JSON data files in data/ directory, refreshed by scripts
- GitHub Pages hosting
- Target: under 200KB initial load (no game engine overhead)

## Core Principle
Mason should NEVER have to search for information. It comes to him, organized, prioritized, actionable. Tim automatically updates the Lodge with every action taken across any channel.

## Rooms

### 🏠 Main Hall (Morning Dashboard)
- Daily briefing (text + audio TTS option)
- Decision queue — things needing yes/no
- Quick capture — voice/text → task queue
- Weather, calendar preview, quick stats

### 📧 Command Center
- Priority emails flagged for attention
- Calendar today + week ahead
- Notifications from all platforms
- Filtered news: TX land market, DFW development, construction, rates

### 🎯 War Room
- Texas map with target counties highlighted (like the reference image)
- Active project cards (wholesaling first, scales to more)
- Pipeline: lead counts, campaign status, deal flow
- Market watch — land comps, price trends auto-updating
- Idea prompts — AI-generated opportunities

### 💰 Treasury
- Net worth — one number, trend chart
- All accounts: bank, Kalshi, investments
- Burn rate, monthly recurring, spending anomalies
- Deal P&L scoreboard
- Real-time rates: mortgage, Fed funds, construction costs
- Cost tracker for tools/APIs, ROI per tool

### 👥 Barracks (Agent HQ)
- Unified report feed — ALL agents, ALL channels (Discord/Telegram/Cron/Terminal)
- Filter by agent, date, platform
- Daily briefing, weekly rollup, highlights
- Uptime monitor — green/red per agent
- Changelog — what got shipped

### 🏋️ Training Room
- Ironman training plan — swim/bike/run/strength
- Today's workout
- Garmin sync — HR, sleep, HRV, recovery
- Strava sync — runs/rides/swims with GPS
- Nutrition tracking
- Progress charts, race readiness

### 🎵 Lounge
- Focus timer (Pomodoro)
- Music/playlist
- Deep work hours tracking

### 📚 Library
- Knowledge base, contracts, playbooks
- Searchable
- Documents organized by project

### ⚠️ Watchtower
- Critical alerts — needs attention NOW
- System monitoring — all bots/services status
- Relationship tracker — key contacts, last contact, nudges
- 90-day goal tracker with progress bars

## Persistent UI
- Room navigation sidebar (lodge-themed)
- Agent status bar — last report from each agent
- Quick capture button
- Clock, date, "last updated" timestamp

## Auto-Generated Reports
- Weekly scorecard every Sunday
- Daily briefing every morning
- Monthly financial summary

## Integrations
- Garmin Connect, Strava
- Gmail, Google Calendar
- Bank/financial (Plaid or manual)
- Discord, Telegram (agent reports)
- FRED API (rates), Brave Search (news/market)
- County GIS / MLS (market watch)

## Standing Order
THE LODGE IS THE OS. Every project, agent, financial change, training update, campaign result, and new feature AUTOMATICALLY reflects in the Lodge. Tim never waits to be told.
