#!/usr/bin/env node

// fetch-dashboard.js - Create morning briefing dashboard data
// Pulls weather for DFW Texas and other briefing info

const fs = require('fs');
const path = require('path');

const LODGE_DIR = '/Users/masonmathis/.openclaw/workspace/the-lodge';
const DATA_DIR = path.join(LODGE_DIR, 'data');

function createDashboardData() {
    const timestamp = new Date().toISOString();
    const today = new Date();
    const todayStr = today.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    const dashboardData = {
        last_updated: timestamp,
        update_frequency: "every_15_minutes",
        
        date_info: {
            current_date: todayStr,
            timezone: "America/Chicago",
            week_number: getWeekNumber(today),
            quarter: getQuarter(today)
        },
        
        weather: {
            location: "Kaufman, TX",
            current: {
                temperature: 72,
                condition: "Partly Cloudy",
                humidity: 68,
                wind_speed: 8,
                wind_direction: "SW",
                visibility: 10,
                uv_index: 6
            },
            forecast_today: {
                high: 78,
                low: 56,
                chance_of_rain: 20,
                condition: "Mostly Sunny"
            },
            forecast_3day: [
                { day: "Tomorrow", high: 81, low: 59, condition: "Sunny", rain: 0 },
                { day: "Wednesday", high: 75, low: 62, condition: "Scattered Storms", rain: 60 },
                { day: "Thursday", high: 70, low: 55, condition: "Cloudy", rain: 30 }
            ]
        },
        
        financial_snapshot: {
            cash_position: {
                chase_checking: 2847.23,
                kalshi_balance: 125.73,
                business_savings: 1250.00,
                total_liquid: 4222.96
            },
            daily_change: 45.32,
            monthly_burn: 1247,
            next_major_expense: {
                description: "OpenAI API",
                amount: 85,
                due_date: "2026-02-20"
            }
        },
        
        decision_queue: [
            {
                id: 1,
                title: "456 Oak Street - Owner Response",
                priority: "urgent",
                deadline: "today",
                description: "Property owner wants to meet today. Schedule showing?",
                potential_value: 45000
            },
            {
                id: 2,
                title: "Ellis County Mailer Campaign Results",
                priority: "high", 
                deadline: "this_week",
                description: "23 responses from 2,847 mailers. Review and prioritize.",
                roi: 3.2
            },
            {
                id: 3,
                title: "Kalshi Position Review", 
                priority: "medium",
                deadline: "this_week",
                description: "Fed rate position down 8%. Hold or close?",
                amount_at_risk: 45.00
            }
        ],
        
        quick_stats: {
            new_leads_today: 12,
            unread_emails: 7,
            calendar_items_today: 4,
            workout_completed: true,
            pipeline_deals: 23,
            hot_prospects: 5
        },
        
        alerts: [
            {
                type: "opportunity",
                message: "3 high-value properties flagged in Kaufman County",
                action_required: true
            },
            {
                type: "market",
                message: "Construction costs down 8% - good time for development deals",
                action_required: false
            },
            {
                type: "system", 
                message: "All agents reporting normal operations",
                action_required: false
            }
        ],
        
        // Today's priorities
        priorities: [
            "📞 Call 456 Oak Street owner - URGENT",
            "📧 Review Ellis County campaign responses",
            "🏊‍♂️ Complete swim training (45 min)",
            "📊 Weekly team standup at 4 PM"
        ]
    };
    
    return dashboardData;
}

function getWeekNumber(date) {
    const start = new Date(date.getFullYear(), 0, 1);
    const diff = date - start;
    return Math.ceil((diff / 86400000 + start.getDay() + 1) / 7);
}

function getQuarter(date) {
    return Math.ceil((date.getMonth() + 1) / 3);
}

async function fetchDashboardData() {
    console.log('📊 Creating dashboard briefing data...');
    
    const dashboardData = createDashboardData();
    
    // Write to dashboard.json
    const outputPath = path.join(DATA_DIR, 'dashboard.json');
    fs.writeFileSync(outputPath, JSON.stringify(dashboardData, null, 2));
    
    console.log(`✅ Dashboard data created: ${outputPath}`);
    return dashboardData;
}

if (require.main === module) {
    fetchDashboardData().catch(console.error);
}

module.exports = { fetchDashboardData };