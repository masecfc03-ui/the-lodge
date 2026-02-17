// ui-enhanced-complete.js - Complete enhanced UI with all methods
import { DataLoader } from './data-loader.js';

export class UI {
    constructor(isMobile) {
        this.isMobile = isMobile;
        this.dataLoader = new DataLoader();
        this.setupEventListeners();
        this.startClock();
        
        // Initial minimap update
        setTimeout(() => {
            this.updateMinimap();
        }, 100);
    }
    
    setupEventListeners() {
        // Close panel handlers
        document.getElementById('close-panel').addEventListener('click', () => {
            this.closePanel();
        });
        
        document.getElementById('overlay').addEventListener('click', (e) => {
            if (e.target.id === 'overlay') {
                this.closePanel();
            }
        });
        
        // ESC key handler
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closePanel();
            }
        });
    }
    
    startClock() {
        const updateClock = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                hour12: true,
                hour: 'numeric',
                minute: '2-digit'
            });
            const clockElement = document.getElementById('clock');
            if (clockElement) {
                clockElement.textContent = timeString;
            }
        };
        
        updateClock();
        setInterval(updateClock, 1000);
    }
    
    updateMinimap(currentRoom = 'Main Hall', playerX = 630, playerY = 480) {
        const canvas = document.getElementById('minimap');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Clear canvas
        ctx.fillStyle = '#0a1f0a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Lodge background
        ctx.fillStyle = '#3d2214';
        ctx.fillRect(10, 5, 160, 110);
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 2;
        ctx.strokeRect(10, 5, 160, 110);
        
        // Draw rooms as rectangles (3x3 grid)
        const roomWidth = 50;
        const roomHeight = 33;
        const startX = 15;
        const startY = 10;
        
        const roomPositions = [
            { name: 'Base Camp', x: startX, y: startY },
            { name: 'Projects', x: startX + roomWidth, y: startY },
            { name: 'The Team', x: startX + roomWidth*2, y: startY },
            { name: 'Treasury', x: startX, y: startY + roomHeight },
            { name: 'Main Hall', x: startX + roomWidth, y: startY + roomHeight },
            { name: 'Command Center', x: startX + roomWidth*2, y: startY + roomHeight },
            { name: 'Jukebox', x: startX, y: startY + roomHeight*2 },
            { name: 'Field Journal', x: startX + roomWidth, y: startY + roomHeight*2 },
            { name: 'Trail Cams', x: startX + roomWidth*2, y: startY + roomHeight*2 }
        ];
        
        roomPositions.forEach(room => {
            // Highlight current room
            if (room.name === currentRoom) {
                ctx.fillStyle = '#ff8c00';
                ctx.fillRect(room.x - 2, room.y - 2, roomWidth - 6, roomHeight - 6);
            }
            
            // Room outline
            ctx.strokeStyle = '#654321';
            ctx.lineWidth = 1;
            ctx.strokeRect(room.x, room.y, roomWidth - 10, roomHeight - 6);
            
            // Room name (abbreviated)
            ctx.fillStyle = '#e6d3a3';
            ctx.font = '8px Courier New';
            ctx.fillText(room.name.substring(0, 4), room.x + 2, room.y + 12);
        });
        
        // Draw player dot
        const minimapPlayerX = ((playerX - 30) / 1240) * 160 + 10;
        const minimapPlayerY = ((playerY - 30) / 940) * 110 + 5;
        
        ctx.fillStyle = '#32cd32';
        ctx.beginPath();
        ctx.arc(minimapPlayerX, minimapPlayerY, 3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(minimapPlayerX, minimapPlayerY, 3, 0, Math.PI * 2);
        ctx.stroke();
    }
    
    async openPanel(roomName, objectType) {
        const panel = document.getElementById('panel');
        const overlay = document.getElementById('overlay');
        const title = document.getElementById('panel-title');
        const content = document.getElementById('panel-content');
        
        title.textContent = roomName;
        
        // Show loading state
        content.innerHTML = '<div style="text-align: center; padding: 40px; color: var(--lodge-text-secondary);"><div>Loading...</div></div>';
        
        overlay.style.display = 'block';
        setTimeout(() => {
            panel.classList.add('open');
        }, 10);
        
        // Load real content
        try {
            const panelContent = await this.getPanelContent(roomName, objectType);
            content.innerHTML = panelContent;
            this.setupPanelInteractions(objectType);
        } catch (error) {
            console.error('Error loading panel content:', error);
            content.innerHTML = '<div style="text-align: center; padding: 40px; color: #ff6b35;"><div>Error loading data</div></div>';
        }
    }
    
    closePanel() {
        const panel = document.getElementById('panel');
        const overlay = document.getElementById('overlay');
        
        panel.classList.remove('open');
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 300);
    }
    
    async getPanelContent(roomName, objectType) {
        switch (objectType) {
            case 'dashboard':
                return await this.getMainHallContent();
            case 'radio':
                return await this.getCommandCenterContent();
            case 'desk':
                return await this.getWarRoomContent();
            case 'safe':
                return await this.getTreasuryContent();
            case 'bunks':
                return await this.getBarracksContent();
            case 'training':
                return await this.getTrainingRoomContent();
            case 'jukebox':
                return this.getLoungeContent();
            case 'bookshelf':
                return this.getLibraryContent();
            case 'monitors':
                return await this.getWatchtowerContent();
            default:
                return '<p>Welcome to The Lodge!</p>';
        }
    }
    
    async getMainHallContent() {
        const dashboardData = await this.dataLoader.getDashboardData();
        const lastUpdated = this.formatLastUpdated(dashboardData.last_updated);
        
        return `
            <div style="text-align: center; margin-bottom: 24px;">
                <h3 style="color: var(--lodge-accent); margin-bottom: 8px; font-size: 24px; font-weight: 700;">📊 Morning Briefing</h3>
                <p style="color: var(--lodge-text-secondary); font-size: 14px;">${dashboardData.date_info?.current_date || new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <div style="color: var(--lodge-text-secondary); font-size: 11px; margin-top: 4px;">Last updated: ${lastUpdated}</div>
            </div>
            
            <!-- Weather & Location -->
            <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 16px; margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <h4 style="color: var(--lodge-light); margin: 0; font-size: 16px;">📍 ${dashboardData.weather?.location || 'Kaufman, TX'}</h4>
                        <p style="color: var(--lodge-text-secondary); margin: 4px 0 0 0; font-size: 14px;">${dashboardData.weather?.current?.temperature || 72}°F • ${dashboardData.weather?.current?.condition || 'Partly Cloudy'}</p>
                    </div>
                    <div style="font-size: 32px;">🌤️</div>
                </div>
            </div>
            
            <!-- Financial Snapshot -->
            <div class="stats-grid" style="margin-bottom: 24px;">
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-gold);">$${this.formatCurrency(dashboardData.financial_snapshot?.cash_position?.chase_checking || 2847.23)}</span>
                    <div class="stat-label">Chase Checking</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-gold);">$${this.formatCurrency(dashboardData.financial_snapshot?.cash_position?.kalshi_balance || 125.73)}</span>
                    <div class="stat-label">Kalshi</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: #32cd32;">+$${dashboardData.financial_snapshot?.daily_change || 45}</span>
                    <div class="stat-label">Yesterday</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: #ff6b35;">$${dashboardData.financial_snapshot?.monthly_burn || 220}</span>
                    <div class="stat-label">Monthly Burn</div>
                </div>
            </div>
            
            <!-- Decision Queue -->
            ${dashboardData.decision_queue ? this.generateDecisionQueue(dashboardData.decision_queue) : ''}
            
            <!-- Quick Stats -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">📈 Quick Stats</h4>
            <div class="stats-grid">
                <div class="stat-card">
                    <span class="stat-value">${dashboardData.quick_stats?.new_leads_today || 12}</span>
                    <div class="stat-label">New Leads Today</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value">${dashboardData.quick_stats?.unread_emails || 7}</span>
                    <div class="stat-label">Unread Emails</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value">${dashboardData.quick_stats?.calendar_items_today || 4}</span>
                    <div class="stat-label">Calendar Items</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value">${dashboardData.quick_stats?.workout_completed ? '💪' : '⏱️'}</span>
                    <div class="stat-label">Workout ${dashboardData.quick_stats?.workout_completed ? 'Done' : 'Pending'}</div>
                </div>
            </div>
        `;
    }
    
    generateDecisionQueue(decisions) {
        if (!decisions || !Array.isArray(decisions) || decisions.length === 0) return '';
        
        return `
            <h4 style="color: #ff4444; margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">⚡ Decision Queue</h4>
            <div style="margin-bottom: 20px;">
                ${decisions.map(decision => `
                    <div style="background: linear-gradient(135deg, rgba(255, 68, 68, 0.2), rgba(255, 68, 68, 0.1)); border: 1px solid #ff4444; border-radius: 8px; padding: 12px; margin-bottom: 8px;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                            <div style="color: var(--lodge-light); font-weight: 600; font-size: 14px;">${decision.title}</div>
                            <div style="background: #ff4444; color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px; text-transform: uppercase;">${decision.priority}</div>
                        </div>
                        <div style="color: var(--lodge-text-secondary); font-size: 12px; margin-bottom: 4px;">${decision.description}</div>
                        ${decision.potential_value ? `<div style="color: var(--lodge-gold); font-size: 12px; font-weight: 600;">Potential: $${this.formatNumber(decision.potential_value)}</div>` : ''}
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    async getWarRoomContent() {
        const projectsData = await this.dataLoader.getProjectsData();
        const marketsData = await this.dataLoader.getMarketsData();
        const newsData = await this.dataLoader.getNewsData();
        const lastUpdated = this.formatLastUpdated(projectsData.last_updated);
        
        const landProject = projectsData.projects?.land_wholesaling;
        
        return `
            <div style="text-align: center; margin-bottom: 20px;">
                <h3 style="color: var(--lodge-accent); margin-bottom: 8px; font-size: 24px; font-weight: 700;">🎯 War Room</h3>
                <p style="color: var(--lodge-text-secondary); font-size: 14px;">Land Wholesaling Operations</p>
                <div style="color: var(--lodge-text-secondary); font-size: 11px; margin-top: 4px;">Last updated: ${lastUpdated}</div>
            </div>
            
            <!-- Market Pulse - NEW Bloomberg-style section -->
            <h4 style="color: #ff8c00; margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">📈 Market Pulse</h4>
            <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 140, 0, 0.3); border-radius: 12px; padding: 16px; margin-bottom: 20px;">
                ${await this.generateMarketPulse(marketsData)}
            </div>
            
            <!-- Key Metrics -->
            <div class="stats-grid" style="margin-bottom: 24px;">
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-gold);">${this.formatNumber(landProject?.leads?.total_in_system || 8056)}</span>
                    <div class="stat-label">Total Leads</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-accent);">${landProject?.leads?.new_today || 12}</span>
                    <div class="stat-label">New Today</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: #32cd32;">${landProject?.leads?.in_pipeline || 23}</span>
                    <div class="stat-label">In Pipeline</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: #ff6b35;">$${this.formatNumber(projectsData.overview?.total_pipeline_value || 180000)}</span>
                    <div class="stat-label">Pipeline Value</div>
                </div>
            </div>
            
            <!-- Campaign Status -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">📊 Campaign Status</h4>
            <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px; margin-bottom: 20px;">
                ${this.generateCampaignStatus(landProject?.campaigns)}
            </div>
            
            <!-- Deal Pipeline -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">🏠 Deal Pipeline</h4>
            <div id="deal-pipeline" style="margin-bottom: 20px;">
                ${this.generateDealPipeline(landProject?.deal_pipeline)}
            </div>
            
            <!-- Quick Actions -->
            <div class="button-group" style="margin-top: 20px;">
                <button class="lodge-btn" style="background: linear-gradient(135deg, #32cd32, #228b22);">
                    📧 Send Blast
                </button>
                <button class="lodge-btn" style="background: linear-gradient(135deg, #ff6b35, #ff4500);">
                    📱 SMS Campaign  
                </button>
                <button class="lodge-btn" style="background: linear-gradient(135deg, #ff8c00, #ff4500);">
                    📊 Full Report  
                </button>
            </div>
        `;
    }
    
    async generateMarketPulse(marketsData) {
        const rates = marketsData.interest_rates || {};
        const land = marketsData.land_market?.target_counties || {};
        const construction = marketsData.construction_costs || {};
        
        return `
            <!-- Interest Rate Environment -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; margin-bottom: 16px;">
                <div style="text-align: center;">
                    <div style="color: var(--lodge-accent); font-size: 18px; font-weight: 700;">${rates.fed_funds_rate?.current || 5.25}%</div>
                    <div style="color: var(--lodge-text-secondary); font-size: 11px;">Fed Funds</div>
                </div>
                <div style="text-align: center;">
                    <div style="color: var(--lodge-accent); font-size: 18px; font-weight: 700;">${rates.mortgage_30yr?.current || 6.81}%</div>
                    <div style="color: var(--lodge-text-secondary); font-size: 11px;">30yr Mortgage</div>
                </div>
                <div style="text-align: center;">
                    <div style="color: var(--lodge-gold); font-size: 18px; font-weight: 700;">$${this.formatNumber(land.kaufman_tx?.avg_per_acre || 8500)}</div>
                    <div style="color: var(--lodge-text-secondary); font-size: 11px;">Kaufman/Acre</div>
                </div>
                <div style="text-align: center;">
                    <div style="color: ${this.getTrendColor(construction.lumber_index?.trend)}; font-size: 18px; font-weight: 700;">${construction.lumber_index?.current || 487}</div>
                    <div style="color: var(--lodge-text-secondary); font-size: 11px;">Lumber Index</div>
                </div>
            </div>
            
            <!-- Rate Environment Indicator -->
            <div style="background: rgba(255, 255, 255, 0.1); padding: 12px; border-radius: 8px; text-align: center;">
                <span style="color: ${rates.mortgage_30yr?.current > 7 ? '#ff6b35' : '#ffd700'}; font-weight: 600;">
                    ${this.getRateEnvironmentText(rates.mortgage_30yr?.current || 6.81)}
                </span>
            </div>
        `;
    }
    
    getTrendColor(trend) {
        switch(trend) {
            case 'rising': return '#ff6b35';
            case 'falling': return '#32cd32';
            case 'volatile': return '#ff8c00';
            default: return '#ffd700';
        }
    }
    
    getRateEnvironmentText(rate) {
        if (rate > 7) return '🔴 RESTRICTIVE - Buyer financing challenged';
        if (rate > 6.5) return '🟡 MODERATE HEADWIND - Some buyer impact';
        if (rate > 6) return '🟢 MANAGEABLE - Normal market conditions';
        return '🟢 FAVORABLE - Strong buyer financing environment';
    }
    
    generateCampaignStatus(campaigns) {
        if (!campaigns) return '<p style="color: var(--lodge-text-secondary);">No campaigns data available</p>';
        
        const campaignEntries = Object.entries(campaigns);
        
        return campaignEntries.map(([key, campaign]) => {
            const responseRate = campaign.sent > 0 ? ((campaign.responses / campaign.sent) * 100).toFixed(2) : '0.00';
            const statusColor = campaign.status === 'active' ? '#32cd32' : '#ffd700';
            
            return `
                <div style="padding: 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div style="color: var(--lodge-light); font-weight: 600; font-size: 14px;">${campaign.name || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
                        <div style="color: var(--lodge-text-secondary); font-size: 12px; margin-top: 2px;">
                            ${campaign.sent || 0} sent • ${campaign.responses || 0} responses • ${responseRate}% rate
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <div style="background: ${statusColor}; color: white; padding: 4px 8px; border-radius: 8px; font-size: 10px; font-weight: 600; text-transform: uppercase; margin-bottom: 4px;">
                            ${campaign.status}
                        </div>
                        <div style="color: var(--lodge-text-secondary); font-size: 12px; font-family: 'JetBrains Mono', monospace;">
                            $${(campaign.cost || 0).toFixed(2)}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    generateDealPipeline(pipeline) {
        if (!pipeline) return '<p style="color: var(--lodge-text-secondary);">No pipeline data available</p>';
        
        return `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px;">
                <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px; border-top: 4px solid #ffd700;">
                    <h5 style="color: var(--lodge-light); margin: 0 0 8px 0; font-size: 14px;">🔍 Prospecting</h5>
                    <div style="color: var(--lodge-accent); font-size: 20px; font-weight: 700; margin-bottom: 4px;">${pipeline.prospecting || 0}</div>
                    <div style="color: var(--lodge-text-secondary); font-size: 11px;">Active leads</div>
                </div>
                
                <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px; border-top: 4px solid #ff8c00;">
                    <h5 style="color: var(--lodge-light); margin: 0 0 8px 0; font-size: 14px;">📞 Contacted</h5>
                    <div style="color: var(--lodge-accent); font-size: 20px; font-weight: 700; margin-bottom: 4px;">${pipeline.contacted || 0}</div>
                    <div style="color: var(--lodge-text-secondary); font-size: 11px;">Follow-ups due</div>
                </div>
                
                <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px; border-top: 4px solid #ff6b35;">
                    <h5 style="color: var(--lodge-light); margin: 0 0 8px 0; font-size: 14px;">📋 Negotiating</h5>
                    <div style="color: var(--lodge-accent); font-size: 20px; font-weight: 700; margin-bottom: 4px;">${pipeline.negotiating || 0}</div>
                    <div style="color: var(--lodge-text-secondary); font-size: 11px;">Offers out</div>
                </div>
                
                <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px; border-top: 4px solid #32cd32;">
                    <h5 style="color: var(--lodge-light); margin: 0 0 8px 0; font-size: 14px;">✅ Under Contract</h5>
                    <div style="color: var(--lodge-accent); font-size: 20px; font-weight: 700; margin-bottom: 4px;">${pipeline.under_contract || 0}</div>
                    <div style="color: var(--lodge-text-secondary); font-size: 11px;">Closing soon</div>
                </div>
            </div>
        `;
    }
    
    // Add simple placeholder methods for other rooms
    async getBarracksContent() {
        const agentsData = await this.dataLoader.getAgentsData();
        const lastUpdated = this.formatLastUpdated(agentsData.last_updated);
        
        return `
            <div style="text-align: center; margin-bottom: 20px;">
                <h3 style="color: var(--lodge-accent); margin-bottom: 8px; font-size: 24px; font-weight: 700;">👥 Agent Reports</h3>
                <p style="color: var(--lodge-text-secondary); font-size: 14px;">Unified Intelligence Feed</p>
                <div style="color: var(--lodge-text-secondary); font-size: 11px; margin-top: 4px;">Last updated: ${lastUpdated}</div>
            </div>
            
            <div class="stats-grid" style="margin-bottom: 20px;">
                <div class="stat-card">
                    <span class="stat-value">${agentsData.summary?.active_agents || 4}</span>
                    <div class="stat-label">Active Agents</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value">${agentsData.summary?.reports_last_24h || 0}</span>
                    <div class="stat-label">Reports 24h</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value">${agentsData.total_reports || 0}</span>
                    <div class="stat-label">Total Reports</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value">${agentsData.summary?.system_health === 'operational' ? '✅' : '⚠️'}</span>
                    <div class="stat-label">System Health</div>
                </div>
            </div>
            
            <p style="color: var(--lodge-text-secondary); text-align: center; font-style: italic;">
                Agent reporting system active. ${agentsData.total_reports || 0} reports collected.
            </p>
        `;
    }
    
    async getTreasuryContent() {
        const treasuryData = await this.dataLoader.getTreasuryData();
        const marketsData = await this.dataLoader.getMarketsData();
        const lastUpdated = this.formatLastUpdated(treasuryData.last_updated);
        
        const balances = treasuryData.account_balances || {};
        
        return `
            <div style="text-align: center; margin-bottom: 20px;">
                <h3 style="color: var(--lodge-accent); margin-bottom: 8px; font-size: 24px; font-weight: 700;">💰 Treasury</h3>
                <p style="color: var(--lodge-text-secondary); font-size: 14px;">Financial Command Center</p>
                <div style="color: var(--lodge-text-secondary); font-size: 11px; margin-top: 4px;">Last updated: ${lastUpdated}</div>
            </div>
            
            <!-- Rate Environment Impact -->
            <h4 style="color: #ff8c00; margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">📊 Rate Environment Impact</h4>
            <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 140, 0, 0.3); border-radius: 12px; padding: 16px; margin-bottom: 20px;">
                ${this.generateRateImpactAnalysis(marketsData, treasuryData)}
            </div>
            
            <!-- Account Balances -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">🏦 Account Balances</h4>
            <div class="stats-grid" style="margin-bottom: 24px;">
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-gold);">$${this.formatCurrency(balances.chase_checking?.balance || 2847.23)}</span>
                    <div class="stat-label">Chase Checking</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-gold);">$${this.formatCurrency(balances.kalshi_trading?.balance || 125.73)}</span>
                    <div class="stat-label">Kalshi Trading</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-gold);">$${this.formatCurrency(balances.business_savings?.balance || 1250)}</span>
                    <div class="stat-label">Business Savings</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-gold);">$${this.formatCurrency(this.calculateTotalLiquid(balances))}</span>
                    <div class="stat-label">Total Liquid</div>
                </div>
            </div>
            
            <!-- Budget Tracking -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">📊 Budget Tracking (February)</h4>
            <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px; margin-bottom: 20px;">
                ${this.generateBudgetTracking(treasuryData.budget_tracking?.february_2026)}
            </div>
            
            <!-- Cash Flow -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">💸 Cash Flow (30 days)</h4>
            <div class="stats-grid" style="margin-bottom: 20px;">
                <div class="stat-card">
                    <span class="stat-value" style="color: #32cd32;">+$${treasuryData.cash_flow_30_days?.total_inflow || 245}</span>
                    <div class="stat-label">Total Inflow</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: #ff6b35;">$${Math.abs(treasuryData.cash_flow_30_days?.total_outflow || -220)}</span>
                    <div class="stat-label">Total Outflow</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: ${(treasuryData.cash_flow_30_days?.net_flow || 25) > 0 ? '#32cd32' : '#ff6b35'};">${(treasuryData.cash_flow_30_days?.net_flow || 25) > 0 ? '+' : ''}$${treasuryData.cash_flow_30_days?.net_flow || 25}</span>
                    <div class="stat-label">Net Flow</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-text-secondary);">$${treasuryData.cash_flow_30_days?.projected_monthly_burn || 847}</span>
                    <div class="stat-label">Projected Burn</div>
                </div>
            </div>
            
            <!-- Quick Actions -->
            <div class="button-group">
                <button class="lodge-btn" style="background: linear-gradient(135deg, #32cd32, #228b22);">
                    📊 Full Report
                </button>
                <button class="lodge-btn" style="background: linear-gradient(135deg, var(--lodge-accent), var(--lodge-secondary));">
                    💳 Reconcile
                </button>
            </div>
        `;
    }
    
    generateRateImpactAnalysis(marketsData, treasuryData) {
        const mortgageRate = marketsData.interest_rates?.mortgage_30yr?.current || 6.81;
        const buyerCapacity = treasuryData.deal_financing?.buyer_capacity?.at_current_rates?.median_buyer_max || 425000;
        const cashPercentage = treasuryData.deal_financing?.buyer_capacity?.at_current_rates?.cash_buyer_percentage || 0.23;
        
        return `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; margin-bottom: 16px;">
                <div style="text-align: center;">
                    <div style="color: var(--lodge-accent); font-size: 18px; font-weight: 700;">${mortgageRate}%</div>
                    <div style="color: var(--lodge-text-secondary); font-size: 11px;">Current 30yr Rate</div>
                </div>
                <div style="text-align: center;">
                    <div style="color: var(--lodge-gold); font-size: 18px; font-weight: 700;">$${this.formatNumber(buyerCapacity)}</div>
                    <div style="color: var(--lodge-text-secondary); font-size: 11px;">Median Buyer Max</div>
                </div>
                <div style="text-align: center;">
                    <div style="color: var(--lodge-gold); font-size: 18px; font-weight: 700;">${Math.round(cashPercentage * 100)}%</div>
                    <div style="color: var(--lodge-text-secondary); font-size: 11px;">Cash Buyers</div>
                </div>
            </div>
            
            <div style="background: rgba(255, 255, 255, 0.1); padding: 12px; border-radius: 8px; text-align: center;">
                <span style="color: ${mortgageRate > 7 ? '#ff6b35' : '#32cd32'}; font-weight: 600;">
                    ${this.getCostOfCapitalText(mortgageRate)}
                </span>
            </div>
        `;
    }
    
    getCostOfCapitalText(rate) {
        if (rate > 7) return 'High cost environment - Focus on cash buyers and seller financing';
        if (rate > 6.5) return 'Moderate cost pressure - Price deals accordingly';  
        return 'Favorable financing environment - Strong buyer pool available';
    }
    
    generateBudgetTracking(budget) {
        if (!budget) return '<p style="color: var(--lodge-text-secondary);">No budget data available</p>';
        
        const budgetEntries = Object.entries(budget);
        
        return budgetEntries.map(([category, data]) => {
            const percentage = (data.actual / data.budgeted) * 100;
            const statusColor = percentage > 100 ? '#ff6b35' : 
                               percentage > 80 ? '#ff8c00' : '#32cd32';
            
            return `
                <div style="margin-bottom: 16px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                        <span style="color: var(--lodge-light); font-size: 14px; font-weight: 500;">${category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                        <span style="color: ${statusColor}; font-size: 12px; font-family: 'JetBrains Mono', monospace; font-weight: 600;">
                            $${data.actual} / $${data.budgeted}
                        </span>
                    </div>
                    <div style="width: 100%; background: rgba(255, 255, 255, 0.1); border-radius: 8px; height: 6px;">
                        <div style="width: ${Math.min(percentage, 100)}%; background: ${statusColor}; height: 100%; border-radius: 8px; transition: width 0.3s ease;"></div>
                    </div>
                    <div style="text-align: right; margin-top: 2px;">
                        <span style="color: var(--lodge-text-secondary); font-size: 11px;">${percentage.toFixed(0)}% of budget</span>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    // Add placeholder methods for remaining rooms
    async getCommandCenterContent() {
        return '<h3 style="color: var(--lodge-accent);">📧 Command Center</h3><p>Email & Calendar integration coming soon...</p>';
    }
    
    async getTrainingRoomContent() {
        return '<h3 style="color: var(--lodge-accent);">🏋️ Training Room</h3><p>Ironman training dashboard loading...</p>';
    }
    
    getLoungeContent() {
        return '<h3 style="color: var(--lodge-accent);">🎵 Lounge</h3><p>Music controls and playlists...</p>';
    }
    
    getLibraryContent() {
        return '<h3 style="color: var(--lodge-accent);">📚 Library</h3><p>Knowledge base and documents...</p>';
    }
    
    async getWatchtowerContent() {
        return '<h3 style="color: var(--lodge-accent);">⚠️ Watchtower</h3><p>System alerts and monitoring...</p>';
    }
    
    setupPanelInteractions(objectType) {
        // Add interactive elements if needed
        if (objectType === 'desk') {
            // War Room interactions
        }
    }
    
    // Utility methods
    formatCurrency(amount) {
        if (typeof amount !== 'number') return '0.00';
        return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    
    formatNumber(num) {
        if (typeof num !== 'number') return '0';
        return num.toLocaleString('en-US');
    }
    
    formatLastUpdated(timestamp) {
        if (!timestamp) return 'Unknown';
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / (1000 * 60));
        
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours}h ago`;
        return date.toLocaleDateString();
    }
    
    calculateTotalLiquid(balances) {
        return (balances.chase_checking?.balance || 0) + 
               (balances.kalshi_trading?.balance || 0) + 
               (balances.business_savings?.balance || 0);
    }
}