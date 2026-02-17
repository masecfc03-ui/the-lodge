export class UI {
    constructor(isMobile) {
        this.isMobile = isMobile;
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
        ctx.fillStyle = '#0a1f0a'; // Dark forest background
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
        // Convert world coordinates to minimap coordinates
        const minimapPlayerX = ((playerX - 30) / 1240) * 160 + 10;
        const minimapPlayerY = ((playerY - 30) / 940) * 110 + 5;
        
        ctx.fillStyle = '#32cd32';
        ctx.beginPath();
        ctx.arc(minimapPlayerX, minimapPlayerY, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Player outline
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(minimapPlayerX, minimapPlayerY, 3, 0, Math.PI * 2);
        ctx.stroke();
    }
    
    openPanel(roomName, objectType) {
        const panel = document.getElementById('panel');
        const overlay = document.getElementById('overlay');
        const title = document.getElementById('panel-title');
        const content = document.getElementById('panel-content');
        
        title.textContent = roomName;
        content.innerHTML = this.getPanelContent(roomName, objectType);
        
        overlay.style.display = 'block';
        setTimeout(() => {
            panel.classList.add('open');
        }, 10);
        
        // Setup any interactive elements
        this.setupPanelInteractions(objectType);
    }
    
    closePanel() {
        const panel = document.getElementById('panel');
        const overlay = document.getElementById('overlay');
        
        panel.classList.remove('open');
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 300);
    }
    
    getPanelContent(roomName, objectType) {
        switch (objectType) {
            case 'dashboard':
                return this.getMainHallContent();
            case 'radio':
                return this.getCommandCenterContent();
            case 'desk':
                return this.getWarRoomContent();
            case 'safe':
                return this.getTreasuryContent();
            case 'bunks':
                return this.getBarracksContent();
            case 'training':
                return this.getTrainingRoomContent();
            case 'jukebox':
                return this.getLoungeContent();
            case 'bookshelf':
                return this.getLibraryContent();
            case 'monitors':
                return this.getWatchtowerContent();
            default:
                return '<p>Welcome to The Lodge!</p>';
        }
    }
    
    getMainHallContent() {
        return `
            <div style="text-align: center; margin-bottom: 24px;">
                <h3 style="color: var(--lodge-accent); margin-bottom: 8px; font-size: 24px; font-weight: 700;">📊 Morning Briefing</h3>
                <p style="color: var(--lodge-text-secondary); font-size: 14px;">${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            
            <!-- Weather & Location -->
            <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 16px; margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <h4 style="color: var(--lodge-light); margin: 0; font-size: 16px;">📍 Kaufman, TX</h4>
                        <p style="color: var(--lodge-text-secondary); margin: 4px 0 0 0; font-size: 14px;">72°F • Partly Cloudy</p>
                    </div>
                    <div style="font-size: 32px;">🌤️</div>
                </div>
            </div>
            
            <!-- Financial Snapshot -->
            <div class="stats-grid" style="margin-bottom: 24px;">
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-gold);">$2,847</span>
                    <div class="stat-label">Chase Checking</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-gold);">$125.73</span>
                    <div class="stat-label">Kalshi</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: #32cd32;">+$45</span>
                    <div class="stat-label">Yesterday</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: #ff6b35;">$220</span>
                    <div class="stat-label">Monthly Burn</div>
                </div>
            </div>
            
            <!-- Recent Transactions -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">💳 Recent Transactions</h4>
            <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; overflow: hidden;">
                ${this.generateTransactionList()}
            </div>
            
            <!-- Subscriptions Due -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">📅 Upcoming Charges</h4>
            <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 140, 0, 0.3); border-radius: 12px; padding: 16px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span style="color: var(--lodge-light); font-size: 14px;">OpenAI API</span>
                    <span style="color: var(--lodge-accent); font-size: 14px; font-weight: 600;">Feb 20 • ~$85</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span style="color: var(--lodge-light); font-size: 14px;">Anthropic Claude</span>
                    <span style="color: var(--lodge-accent); font-size: 14px; font-weight: 600;">Feb 23 • ~$65</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span style="color: var(--lodge-light); font-size: 14px;">Digital Ocean</span>
                    <span style="color: var(--lodge-accent); font-size: 14px; font-weight: 600;">Feb 28 • $20</span>
                </div>
            </div>
            
            <!-- Quick Stats -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">📈 Quick Stats</h4>
            <div class="stats-grid">
                <div class="stat-card">
                    <span class="stat-value">47</span>
                    <div class="stat-label">New Leads Today</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value">12</span>
                    <div class="stat-label">Unread Emails</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value">2</span>
                    <div class="stat-label">Calendar Items</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value">💪</span>
                    <div class="stat-label">Workout Done</div>
                </div>
            </div>
        `;
    }
    
    getWarRoomContent() {
        return `
            <div style="text-align: center; margin-bottom: 20px;">
                <h3 style="color: var(--lodge-accent); margin-bottom: 8px; font-size: 24px; font-weight: 700;">🎯 War Room</h3>
                <p style="color: var(--lodge-text-secondary); font-size: 14px;">Land Wholesaling Operations</p>
            </div>
            
            <!-- Key Metrics -->
            <div class="stats-grid" style="margin-bottom: 24px;">
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-gold);">16,663</span>
                    <div class="stat-label">Total Leads</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-accent);">47</span>
                    <div class="stat-label">New Today</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: #32cd32;">23</span>
                    <div class="stat-label">In Pipeline</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: #ff6b35;">$180K</span>
                    <div class="stat-label">Potential This Week</div>
                </div>
            </div>
            
            <!-- Campaign Status -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">📊 Campaign Status</h4>
            <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px; margin-bottom: 20px;">
                ${this.generateCampaignStatus()}
            </div>
            
            <!-- Deal Pipeline -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">🏠 Deal Pipeline</h4>
            <div id="deal-pipeline" style="margin-bottom: 20px;">
                ${this.generateDealPipeline()}
            </div>
            
            <!-- Agent Activity -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">🎯 Agent Activity (24h)</h4>
            <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; overflow: hidden;">
                <div style="padding: 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div style="color: #32cd32; font-weight: 600;">Scout</div>
                            <div style="color: var(--lodge-text-secondary); font-size: 12px;">Lead Generation</div>
                        </div>
                        <div style="text-align: right;">
                            <div style="color: var(--lodge-light); font-weight: 600;">47 leads found</div>
                            <div style="color: var(--lodge-text-secondary); font-size: 12px;">Ellis & Dallas Counties</div>
                        </div>
                    </div>
                </div>
                
                <div style="padding: 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div style="color: var(--lodge-accent); font-weight: 600;">Tim</div>
                            <div style="color: var(--lodge-text-secondary); font-size: 12px;">Sales Manager</div>
                        </div>
                        <div style="text-align: right;">
                            <div style="color: var(--lodge-light); font-weight: 600;">8 calls made</div>
                            <div style="color: var(--lodge-text-secondary); font-size: 12px;">3 appointments booked</div>
                        </div>
                    </div>
                </div>
                
                <div style="padding: 16px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div style="color: #9370db; font-weight: 600;">Tracker</div>
                            <div style="color: var(--lodge-text-secondary); font-size: 12px;">Market Analysis</div>
                        </div>
                        <div style="text-align: right;">
                            <div style="color: var(--lodge-light); font-weight: 600;">Market scan complete</div>
                            <div style="color: var(--lodge-text-secondary); font-size: 12px;">Inventory down 15%</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Quick Actions -->
            <div class="button-group" style="margin-top: 20px;">
                <button class="lodge-btn" style="background: linear-gradient(135deg, #32cd32, #228b22);">
                    📧 Send Blast
                </button>
                <button class="lodge-btn" style="background: linear-gradient(135deg, #ff6b35, #ff4500);">
                    📱 SMS Campaign  
                </button>
            </div>
        `;
    }
    
    getBarracksContent() {
        return `
            <div style="text-align: center; margin-bottom: 20px;">
                <h3 style="color: var(--lodge-accent); margin-bottom: 8px; font-size: 24px; font-weight: 700;">👥 Agent Reports</h3>
                <p style="color: var(--lodge-text-secondary); font-size: 14px;">Unified Intelligence Feed</p>
            </div>
            
            <!-- Filter Tabs -->
            <div class="report-tabs" style="display: flex; gap: 8px; margin-bottom: 20px; overflow-x: auto;">
                <button class="tab-btn active" onclick="window.lodgeUI.switchReportTab('today')">Today</button>
                <button class="tab-btn" onclick="window.lodgeUI.switchReportTab('week')">This Week</button>
                <button class="tab-btn" onclick="window.lodgeUI.switchReportTab('highlights')">Highlights</button>
                <button class="tab-btn" onclick="window.lodgeUI.switchReportTab('all')">All</button>
            </div>
            
            <!-- Agent Filter -->
            <div style="display: flex; gap: 6px; margin-bottom: 16px; overflow-x: auto;">
                <span style="color: var(--lodge-text-secondary); font-size: 12px; align-self: center; margin-right: 8px; white-space: nowrap;">FILTER:</span>
                <button class="filter-btn active" data-agent="all">ALL</button>
                <button class="filter-btn" data-agent="scout">Scout</button>
                <button class="filter-btn" data-agent="builder">Builder</button>
                <button class="filter-btn" data-agent="tim">Tim</button>
                <button class="filter-btn" data-agent="tracker">Tracker</button>
            </div>
            
            <!-- Reports Feed -->
            <div id="reports-feed" style="max-height: 500px; overflow-y: auto;">
                ${this.generateReportsFeed()}
            </div>
            
            <!-- Load More -->
            <div style="text-align: center; margin-top: 16px;">
                <button class="lodge-btn" style="font-size: 12px; padding: 8px 16px;" onclick="window.lodgeUI.loadMoreReports()">
                    Load More Reports
                </button>
            </div>
            
            <!-- Summary Stats -->
            <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px; margin-top: 20px;">
                <h4 style="color: var(--lodge-accent); margin: 0 0 12px 0; font-size: 14px; font-weight: 600;">📊 Report Summary (24h)</h4>
                <div class="stats-grid" style="grid-template-columns: repeat(2, 1fr); gap: 12px;">
                    <div class="stat-card" style="padding: 12px;">
                        <span class="stat-value" style="font-size: 18px;">23</span>
                        <div class="stat-label" style="font-size: 11px;">Total Reports</div>
                    </div>
                    <div class="stat-card" style="padding: 12px;">
                        <span class="stat-value" style="font-size: 18px;">7</span>
                        <div class="stat-label" style="font-size: 11px;">Unread</div>
                    </div>
                    <div class="stat-card" style="padding: 12px;">
                        <span class="stat-value" style="font-size: 18px;">4</span>
                        <div class="stat-label" style="font-size: 11px;">Active Agents</div>
                    </div>
                    <div class="stat-card" style="padding: 12px;">
                        <span class="stat-value" style="font-size: 18px;">3</span>
                        <div class="stat-label" style="font-size: 11px;">Platforms</div>
                    </div>
                </div>
            </div>
        `;
    }
    
    getTreasuryContent() {
        return `
            <div style="text-align: center; margin-bottom: 20px;">
                <h3 style="color: var(--lodge-accent); margin-bottom: 8px; font-size: 24px; font-weight: 700;">💰 Treasury</h3>
                <p style="color: var(--lodge-text-secondary); font-size: 14px;">Financial Command Center</p>
            </div>
            
            <!-- Account Balances -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">🏦 Account Balances</h4>
            <div class="stats-grid" style="margin-bottom: 24px;">
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-gold);">$2,847</span>
                    <div class="stat-label">Chase Checking</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-gold);">$125.73</span>
                    <div class="stat-label">Kalshi Trading</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-gold);">$1,250</span>
                    <div class="stat-label">Business Savings</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-gold);">$4,222.73</span>
                    <div class="stat-label">Total Liquid</div>
                </div>
            </div>
            
            <!-- Budget vs Actual -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">📊 Budget Tracking (February)</h4>
            <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px; margin-bottom: 20px;">
                ${this.generateBudgetTracking()}
            </div>
            
            <!-- Investment Positions -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">📈 Investment Positions</h4>
            <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; overflow: hidden; margin-bottom: 20px;">
                <div style="padding: 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div style="color: var(--lodge-light); font-weight: 600;">Kalshi Prediction Market</div>
                            <div style="color: var(--lodge-text-secondary); font-size: 12px;">Active positions: 3</div>
                        </div>
                        <div style="text-align: right;">
                            <div style="color: var(--lodge-gold); font-weight: 600; font-family: 'JetBrains Mono', monospace;">$125.73</div>
                            <div style="color: #32cd32; font-size: 12px; font-weight: 600;">+12.4%</div>
                        </div>
                    </div>
                </div>
                
                <div style="padding: 16px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div style="color: var(--lodge-light); font-weight: 600;">Real Estate Holdings</div>
                            <div style="color: var(--lodge-text-secondary); font-size: 12px;">Properties under contract: 3</div>
                        </div>
                        <div style="text-align: right;">
                            <div style="color: var(--lodge-gold); font-weight: 600; font-family: 'JetBrains Mono', monospace;">$180K</div>
                            <div style="color: var(--lodge-text-secondary); font-size: 12px;">Potential profit</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Cash Flow Analysis -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">💸 Cash Flow (30 days)</h4>
            <div class="stats-grid" style="margin-bottom: 20px;">
                <div class="stat-card">
                    <span class="stat-value" style="color: #32cd32;">+$245</span>
                    <div class="stat-label">Total Inflow</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: #ff6b35;">-$220</span>
                    <div class="stat-label">Total Outflow</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-gold);">+$25</span>
                    <div class="stat-label">Net Flow</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-text-secondary);">$847</span>
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
    
    getCommandCenterContent() {
        return `
            <div style="text-align: center; margin-bottom: 20px;">
                <h3 style="color: var(--lodge-accent); margin-bottom: 8px; font-size: 24px; font-weight: 700;">📧 Command Center</h3>
                <p style="color: var(--lodge-text-secondary); font-size: 14px;">Email & Calendar Operations</p>
            </div>
            
            <!-- Email Priority Inbox -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">📬 Priority Inbox (12 unread)</h4>
            <div style="max-height: 300px; overflow-y: auto; background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; margin-bottom: 20px;">
                ${this.generateEmailList()}
            </div>
            
            <!-- Today's Calendar -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">📅 Today's Schedule</h4>
            <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px; margin-bottom: 20px;">
                ${this.generateTodaysCalendar()}
            </div>
            
            <!-- This Week Preview -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">📆 This Week</h4>
            <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; overflow: hidden; margin-bottom: 20px;">
                ${this.generateWeekPreview()}
            </div>
            
            <!-- Quick Actions -->
            <div class="button-group" style="margin-bottom: 20px;">
                <button class="lodge-btn" style="background: linear-gradient(135deg, #ff4500, #ff6347);">
                    🚀 Email Blast
                </button>
                <button class="lodge-btn" style="background: linear-gradient(135deg, #32cd32, #228b22);">
                    📅 Quick Event
                </button>
            </div>
            
            <!-- Notifications -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">🔔 Notifications</h4>
            <div class="stats-grid">
                <div class="stat-card">
                    <span class="stat-value" style="color: #ff6b35;">3</span>
                    <div class="stat-label">Meeting Reminders</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-accent);">7</span>
                    <div class="stat-label">Email Replies</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: #32cd32;">2</span>
                    <div class="stat-label">Task Due</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: #9370db;">1</span>
                    <div class="stat-label">Calendar Conflicts</div>
                </div>
            </div>
        `;
    }
    
    getJukeboxContent() {
        return `
            <h3 style="color: #ff8c00; margin-bottom: 20px;">🎵 Jukebox</h3>
            
            <div style="text-align: center; margin-bottom: 30px;">
                <div style="font-size: 64px; margin-bottom: 15px;">🎵</div>
                <p style="color: #c4a374;">Set the mood for your hunt</p>
            </div>
            
            <div style="background: rgba(139, 69, 19, 0.2); padding: 20px; border-radius: 6px; margin-bottom: 20px;">
                <h4 style="color: #32cd32; margin: 0 0 15px 0;">🎧 Now Playing</h4>
                <p style="font-size: 16px; margin: 0 0 5px 0;">"Eye of the Tiger"</p>
                <p style="color: #c4a374; margin: 0;">Survivor • Greatest Hits</p>
                
                <div style="margin: 15px 0;">
                    <div style="width: 100%; background: rgba(139, 69, 19, 0.5); border-radius: 10px; height: 6px;">
                        <div style="width: 45%; background: #32cd32; height: 100%; border-radius: 10px;"></div>
                    </div>
                </div>
                
                <div style="display: flex; justify-content: center; gap: 15px; margin-top: 20px;">
                    <button style="background: none; border: none; color: #e6d3a3; font-size: 20px; cursor: pointer;">⏮️</button>
                    <button style="background: none; border: none; color: #e6d3a3; font-size: 24px; cursor: pointer;">⏸️</button>
                    <button style="background: none; border: none; color: #e6d3a3; font-size: 20px; cursor: pointer;">⏭️</button>
                </div>
            </div>
            
            <h4 style="color: #ff8c00; margin: 20px 0 15px 0;">🎶 Playlists</h4>
            
            <div class="button-group" style="flex-direction: column;">
                <button class="lodge-btn">🏹 Hunt Mode (Focus Music)</button>
                <button class="lodge-btn">🔥 Pump Up (Motivational)</button>
                <button class="lodge-btn">🌲 Lodge Vibes (Chill)</button>
                <button class="lodge-btn">💼 Business (Professional)</button>
            </div>
            
            <div style="background: rgba(139, 69, 19, 0.2); padding: 15px; border-radius: 6px; margin-top: 20px; text-align: center;">
                <p style="color: #c4a374; font-style: italic; margin: 0;">
                    🎯 "The right soundtrack makes every deal feel like a victory"
                </p>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background: rgba(50, 205, 50, 0.2); border-radius: 6px; border: 1px solid #32cd32;">
                <p style="color: #32cd32; margin: 0; font-size: 14px;">
                    💡 <strong>Pro Tip:</strong> Studies show that upbeat music increases productivity by 23%
                </p>
            </div>
        `;
    }
    
    getFieldJournalContent() {
        return `
            <h3 style="color: #ff8c00; margin-bottom: 20px;">📚 Field Journal</h3>
            
            <div style="margin-bottom: 20px;">
                <input type="text" placeholder="🔍 Search leads..." style="width: 100%; padding: 12px; background: rgba(139, 69, 19, 0.3); border: 1px solid #654321; border-radius: 6px; color: #e6d3a3; font-size: 14px;">
            </div>
            
            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                <button class="lodge-btn" style="font-size: 12px; padding: 8px 12px;">All Counties</button>
                <button class="lodge-btn" style="font-size: 12px; padding: 8px 12px;">Dallas</button>
                <button class="lodge-btn" style="font-size: 12px; padding: 8px 12px;">Ellis</button>
                <button class="lodge-btn" style="font-size: 12px; padding: 8px 12px;">Kaufman</button>
            </div>
            
            <h4 style="color: #ff8c00; margin: 20px 0 15px 0;">🏠 Recent Leads (${this.formatNumber(16663)} total)</h4>
            
            <div style="background: rgba(139, 69, 19, 0.2); border-radius: 6px; overflow: hidden;">
                ${this.generateLeadsTable()}
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
                <button class="lodge-btn" style="background: linear-gradient(135deg, #32cd32, #228b22);">
                    📊 Generate Report
                </button>
            </div>
            
            <div class="stats-grid" style="margin-top: 25px;">
                <div class="stat-card">
                    <span class="stat-value">47</span>
                    <div class="stat-label">Today's Finds</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value">12</span>
                    <div class="stat-label">High Priority</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value">85%</span>
                    <div class="stat-label">Quality Score</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value">$92K</span>
                    <div class="stat-label">Avg Value</div>
                </div>
            </div>
        `;
    }
    
    getTrailCamsContent() {
        return `
            <h3 style="color: #ff8c00; margin-bottom: 20px;">📹 Trail Cams</h3>
            
            <div style="margin-bottom: 20px;">
                <div class="button-group">
                    <button class="lodge-btn active">All</button>
                    <button class="lodge-btn">🔥 Hot Leads</button>
                    <button class="lodge-btn">💬 Responses</button>
                    <button class="lodge-btn">⚙️ System</button>
                    <button class="lodge-btn">🏠 Deals</button>
                </div>
            </div>
            
            <h4 style="color: #ff8c00; margin: 20px 0 15px 0;">📊 Live Feed</h4>
            
            <div style="max-height: 400px; overflow-y: auto;">
                ${this.generateNotificationFeed()}
            </div>
            
            <div class="stats-grid" style="margin-top: 25px;">
                <div class="stat-card">
                    <span class="stat-value">23</span>
                    <div class="stat-label">Active Alerts</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value">156</span>
                    <div class="stat-label">Today's Events</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value">7</span>
                    <div class="stat-label">Critical</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value">98%</span>
                    <div class="stat-label">Uptime</div>
                </div>
            </div>
            
            <div style="background: rgba(139, 69, 19, 0.3); padding: 15px; border-radius: 6px; margin-top: 20px; text-align: center;">
                <p style="color: #e6d3a3; margin: 0; font-size: 14px;">
                    📡 <strong>Trail Cams Status:</strong> <span style="color: #32cd32;">MONITORING</span>
                </p>
                <p style="color: #c4a374; margin: 5px 0 0 0; font-size: 12px;">
                    All systems operational • Last scan: 2 minutes ago
                </p>
            </div>
        `;
    }
    
    generateLeadsTable() {
        const leads = [
            { address: '123 Oak Street', county: 'Dallas', value: '$95,000', priority: '🔥', status: 'New' },
            { address: '456 Pine Avenue', county: 'Ellis', value: '$87,500', priority: '⭐', status: 'Contacted' },
            { address: '789 Maple Drive', county: 'Kaufman', value: '$102,000', priority: '🔥', status: 'New' },
            { address: '321 Cedar Lane', county: 'Dallas', value: '$78,000', priority: '💎', status: 'Qualified' },
            { address: '654 Birch Way', county: 'Ellis', value: '$91,200', priority: '⭐', status: 'New' },
            { address: '987 Elm Court', county: 'Kaufman', value: '$83,800', priority: '🔥', status: 'Follow-up' },
            { address: '147 Ash Street', county: 'Dallas', value: '$96,500', priority: '💎', status: 'New' },
            { address: '258 Willow Ave', county: 'Ellis', value: '$89,300', priority: '⭐', status: 'Contacted' },
            { address: '369 Poplar Dr', county: 'Kaufman', value: '$94,700', priority: '🔥', status: 'New' },
            { address: '741 Spruce Ln', county: 'Dallas', value: '$88,900', priority: '💎', status: 'Qualified' }
        ];
        
        return leads.map((lead, index) => `
            <div style="padding: 12px; border-bottom: 1px solid #654321; display: flex; justify-content: space-between; align-items: center; ${index % 2 === 0 ? 'background: rgba(139, 69, 19, 0.1);' : ''}">
                <div style="flex: 1;">
                    <div style="font-weight: bold; margin-bottom: 4px;">${lead.priority} ${lead.address}</div>
                    <div style="font-size: 12px; color: #c4a374;">${lead.county} County • ${lead.value}</div>
                </div>
                <div style="text-align: right; font-size: 12px;">
                    <div style="padding: 4px 8px; background: rgba(255, 140, 0, 0.3); border-radius: 12px; color: #ff8c00; font-weight: bold;">
                        ${lead.status}
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    generateReportsFeed() {
        // This would be loaded from /api/reports.json in real implementation
        const reports = [
            {
                id: 1,
                agent: 'Scout',
                timestamp: '2026-02-16T17:45:00Z',
                source: 'Discord #leads',
                type: 'lead-report',
                priority: 'high',
                content: 'Found 12 new high-value properties in Ellis County. Average equity: $67K. 3 properties marked as urgent - owners responding to calls.',
                data: { leads: 12, avgEquity: 67000, urgent: 3 }
            },
            {
                id: 2,
                agent: 'Builder',
                timestamp: '2026-02-16T17:30:00Z',
                source: 'Terminal',
                type: 'deployment',
                priority: 'medium',
                content: 'Lodge visual upgrade deployed successfully. Enhanced lighting, textures, and unified report system now live. Performance improved 23%.',
                data: { deploymentId: 'lodge-v2.1', performance: '+23%' }
            },
            {
                id: 3,
                agent: 'Tim',
                timestamp: '2026-02-16T16:15:00Z',
                source: 'Telegram DM',
                type: 'pipeline-update',
                priority: 'high',
                content: 'Called 8 leads today. 3 verbal agreements for site visits. 2 properties ready for contract. Deal pipeline strong - $180K potential this week.',
                data: { callsMade: 8, siteVisits: 3, contracts: 2, potentialValue: 180000 }
            },
            {
                id: 4,
                agent: 'Tracker',
                timestamp: '2026-02-16T15:45:00Z',
                source: 'Cron Job',
                type: 'market-analysis',
                priority: 'medium',
                content: 'Market scan complete. Dallas County inventory down 15% this week. Prices trending up. Recommend increasing acquisition pace.',
                data: { inventoryChange: '-15%', priceDirection: 'up', recommendation: 'increase_pace' }
            },
            {
                id: 5,
                agent: 'Scout',
                timestamp: '2026-02-16T14:30:00Z',
                source: 'Discord #alerts',
                type: 'alert',
                priority: 'urgent',
                content: 'URGENT: 456 Oak Street owner just listed with realtor at $95K. Our analysis shows $45K equity. Move fast!',
                data: { property: '456 Oak Street', listPrice: 95000, equity: 45000, urgency: 'high' }
            },
            {
                id: 6,
                agent: 'Builder',
                timestamp: '2026-02-16T13:20:00Z',
                source: 'Discord #dev',
                type: 'system-health',
                priority: 'low',
                content: 'All systems operational. Lead processing: 99.2% uptime. Email campaigns: 89% delivery rate. Database optimized.',
                data: { uptime: '99.2%', deliveryRate: '89%', dbStatus: 'optimized' }
            },
            {
                id: 7,
                agent: 'Tim',
                timestamp: '2026-02-16T12:00:00Z',
                source: 'Telegram Group',
                type: 'daily-standup',
                priority: 'medium',
                content: 'Morning update: 5 appointments scheduled this week. 2 contracts in review. Need Builder to update CRM integration by Wed.',
                data: { appointments: 5, contractsInReview: 2, taskAssigned: 'crm-integration' }
            }
        ];
        
        return reports.map(report => this.renderReport(report)).join('');
    }
    
    renderReport(report) {
        const timeAgo = this.getTimeAgo(report.timestamp);
        const priorityColor = {
            'urgent': '#ff4444',
            'high': '#ff8c00', 
            'medium': '#ffd700',
            'low': '#32cd32'
        }[report.priority] || '#888';
        
        const sourceIcon = {
            'Discord #leads': '💬',
            'Discord #alerts': '🚨', 
            'Discord #dev': '⚙️',
            'Telegram DM': '📱',
            'Telegram Group': '👥',
            'Terminal': '💻',
            'Cron Job': '🤖'
        }[report.source] || '📝';
        
        const agentColor = {
            'Scout': '#32cd32',
            'Builder': '#00ced1', 
            'Tim': '#ff8c00',
            'Tracker': '#9370db'
        }[report.agent] || '#888';
        
        return `
            <div class="report-item" style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px; margin-bottom: 12px; border-left: 4px solid ${priorityColor};">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="color: ${agentColor}; font-weight: 600; font-size: 14px;">${report.agent}</span>
                        <span style="font-size: 12px;">${sourceIcon}</span>
                        <span style="color: var(--lodge-text-secondary); font-size: 11px; font-family: 'JetBrains Mono', monospace;">${report.source}</span>
                    </div>
                    <div style="text-align: right;">
                        <div style="color: var(--lodge-text-secondary); font-size: 11px; font-family: 'JetBrains Mono', monospace;">${timeAgo}</div>
                        <div style="background: ${priorityColor}; color: white; font-size: 9px; padding: 2px 6px; border-radius: 8px; font-weight: 600; margin-top: 2px; text-transform: uppercase;">${report.priority}</div>
                    </div>
                </div>
                
                <div style="color: var(--lodge-light); font-size: 14px; line-height: 1.5; margin-bottom: 8px;">
                    ${report.content}
                </div>
                
                ${report.data ? this.renderReportData(report) : ''}
            </div>
        `;
    }
    
    renderReportData(report) {
        if (!report.data) return '';
        
        const dataItems = Object.entries(report.data).map(([key, value]) => {
            let displayValue = value;
            if (typeof value === 'number' && value > 1000) {
                displayValue = new Intl.NumberFormat('en-US', { 
                    style: 'currency', 
                    currency: 'USD',
                    maximumFractionDigits: 0 
                }).format(value);
            }
            
            return `<span style="background: rgba(255, 255, 255, 0.1); padding: 4px 8px; border-radius: 6px; font-size: 11px; color: var(--lodge-text-secondary); font-family: 'JetBrains Mono', monospace;">${key}: ${displayValue}</span>`;
        }).join('');
        
        return `<div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;">${dataItems}</div>`;
    }
    
    getTimeAgo(timestamp) {
        const now = new Date();
        const reportTime = new Date(timestamp);
        const diffMs = now - reportTime;
        
        const minutes = Math.floor(diffMs / (1000 * 60));
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        
        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    }
    
    generateNotificationFeed() {
        const notifications = [
            { time: '2 min ago', type: '🔥', message: 'High-value property detected: 123 Oak St, Dallas County', category: 'hot' },
            { time: '5 min ago', type: '📧', message: 'Email response received from motivated seller', category: 'response' },
            { time: '8 min ago', type: '⚙️', message: 'Lead processing completed: 47 new prospects', category: 'system' },
            { time: '12 min ago', type: '💰', message: 'Deal potential flagged: $45K profit margin detected', category: 'deal' },
            { time: '15 min ago', type: '🔍', message: 'Scout identified 12 new properties in Ellis County', category: 'hot' },
            { time: '18 min ago', type: '📱', message: 'SMS campaign delivered: 89% open rate', category: 'system' },
            { time: '22 min ago', type: '🏠', message: 'Property analysis complete: 456 Pine Ave', category: 'hot' },
            { time: '28 min ago', type: '💬', message: 'Lead responded to follow-up call', category: 'response' },
            { time: '32 min ago', type: '⚡', message: 'System performance optimized: 23% faster processing', category: 'system' },
            { time: '35 min ago', type: '🎯', message: 'Marketing campaign ROI: 340% return detected', category: 'deal' }
        ];
        
        return notifications.map((notif, index) => `
            <div style="padding: 12px; border-bottom: 1px solid #654321; ${index % 2 === 0 ? 'background: rgba(139, 69, 19, 0.1);' : ''}">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 5px;">
                    <span style="font-size: 18px;">${notif.type}</span>
                    <span style="font-size: 12px; color: #c4a374;">${notif.time}</span>
                </div>
                <p style="margin: 0; font-size: 14px; color: #e6d3a3; line-height: 1.4;">${notif.message}</p>
            </div>
        `).join('');
    }
    
    formatNumber(num) {
        return num.toLocaleString();
    }
    
    generateTransactionList() {
        const transactions = [
            { date: '2 hours ago', description: 'OpenAI API Usage', amount: -23.47, category: 'AI/Tools' },
            { date: 'Yesterday', description: 'Facebook Ads - Lead Gen', amount: -15.00, category: 'Marketing' },
            { date: 'Yesterday', description: 'Kalshi Withdrawal', amount: +125.00, category: 'Trading' },
            { date: 'Feb 14', description: 'Chase Bank Interest', amount: +2.34, category: 'Interest' },
            { date: 'Feb 13', description: 'Digital Ocean Hosting', amount: -20.00, category: 'Infrastructure' }
        ];
        
        return transactions.map((tx, index) => `
            <div style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); display: flex; justify-content: space-between; align-items: center; ${index % 2 === 0 ? 'background: rgba(255, 255, 255, 0.05);' : ''}">
                <div>
                    <div style="color: var(--lodge-light); font-size: 14px; font-weight: 500; margin-bottom: 2px;">${tx.description}</div>
                    <div style="color: var(--lodge-text-secondary); font-size: 12px;">${tx.date} • ${tx.category}</div>
                </div>
                <div style="color: ${tx.amount > 0 ? '#32cd32' : '#ff6b35'}; font-size: 14px; font-weight: 600; font-family: 'JetBrains Mono', monospace;">
                    ${tx.amount > 0 ? '+' : ''}$${Math.abs(tx.amount).toFixed(2)}
                </div>
            </div>
        `).join('');
    }
    
    generateCampaignStatus() {
        const campaigns = [
            { name: 'Ellis County Direct Mail', status: 'active', sent: 2847, responses: 23, cost: 847.50 },
            { name: 'Dallas FB Lead Ads', status: 'active', sent: 1205, responses: 8, cost: 156.00 },
            { name: 'SMS Follow-up Sequence', status: 'scheduled', sent: 0, responses: 0, cost: 0 }
        ];
        
        return campaigns.map(campaign => {
            const responseRate = campaign.sent > 0 ? ((campaign.responses / campaign.sent) * 100).toFixed(2) : '0.00';
            const statusColor = campaign.status === 'active' ? '#32cd32' : '#ffd700';
            
            return `
                <div style="padding: 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div style="color: var(--lodge-light); font-weight: 600; font-size: 14px;">${campaign.name}</div>
                        <div style="color: var(--lodge-text-secondary); font-size: 12px; margin-top: 2px;">
                            ${campaign.sent} sent • ${campaign.responses} responses • ${responseRate}% rate
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <div style="background: ${statusColor}; color: white; padding: 4px 8px; border-radius: 8px; font-size: 10px; font-weight: 600; text-transform: uppercase; margin-bottom: 4px;">
                            ${campaign.status}
                        </div>
                        <div style="color: var(--lodge-text-secondary); font-size: 12px; font-family: 'JetBrains Mono', monospace;">
                            $${campaign.cost.toFixed(2)}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    generateDealPipeline() {
        return `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px;">
                <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px; border-top: 4px solid #ffd700;">
                    <h5 style="color: var(--lodge-light); margin: 0 0 8px 0; font-size: 14px;">🔍 Prospecting</h5>
                    <div style="color: var(--lodge-accent); font-size: 20px; font-weight: 700; margin-bottom: 4px;">18</div>
                    <div style="color: var(--lodge-text-secondary); font-size: 11px;">Active leads</div>
                </div>
                
                <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px; border-top: 4px solid #ff8c00;">
                    <h5 style="color: var(--lodge-light); margin: 0 0 8px 0; font-size: 14px;">📞 Contacted</h5>
                    <div style="color: var(--lodge-accent); font-size: 20px; font-weight: 700; margin-bottom: 4px;">12</div>
                    <div style="color: var(--lodge-text-secondary); font-size: 11px;">Follow-ups due</div>
                </div>
                
                <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px; border-top: 4px solid #ff6b35;">
                    <h5 style="color: var(--lodge-light); margin: 0 0 8px 0; font-size: 14px;">📋 Negotiating</h5>
                    <div style="color: var(--lodge-accent); font-size: 20px; font-weight: 700; margin-bottom: 4px;">5</div>
                    <div style="color: var(--lodge-text-secondary); font-size: 11px;">Offers out</div>
                </div>
                
                <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px; border-top: 4px solid #32cd32;">
                    <h5 style="color: var(--lodge-light); margin: 0 0 8px 0; font-size: 14px;">✅ Under Contract</h5>
                    <div style="color: var(--lodge-accent); font-size: 20px; font-weight: 700; margin-bottom: 4px;">3</div>
                    <div style="color: var(--lodge-text-secondary); font-size: 11px;">Closing this week</div>
                </div>
            </div>
        `;
    }
    
    // Report filtering methods
    switchReportTab(tab) {
        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        // Filter reports based on tab
        // In real implementation, this would make API call with filter params
        console.log(`Switching to ${tab} reports`);
    }
    
    loadMoreReports() {
        // Load additional reports from API
        console.log('Loading more reports...');
    }
    
    generateEmailList() {
        const emails = [
            { 
                from: 'Lead Response System', 
                subject: 'URGENT: 3 Property Owners Responded', 
                time: '8 min ago', 
                priority: 'high',
                preview: 'Multiple responses to Dallas County mailer campaign...'
            },
            { 
                from: 'County Records Alert', 
                subject: 'New Foreclosure Filings - Ellis County', 
                time: '2 hours ago', 
                priority: 'high',
                preview: '12 new pre-foreclosure properties match your criteria...'
            },
            { 
                from: 'OpenAI Billing', 
                subject: 'Usage Alert: 80% of Monthly Limit', 
                time: '4 hours ago', 
                priority: 'medium',
                preview: 'Your API usage is approaching the monthly limit...'
            },
            { 
                from: 'John Martinez', 
                subject: 'RE: 456 Pine Street Property Inquiry', 
                time: '6 hours ago', 
                priority: 'high',
                preview: 'Yes, I am interested in selling. Can we meet this week?'
            },
            { 
                from: 'Marketing Campaign', 
                subject: 'Weekly Performance Report', 
                time: 'Yesterday', 
                priority: 'low',
                preview: 'Facebook campaigns generated 23 leads this week...'
            }
        ];
        
        return emails.map(email => {
            const priorityColor = {
                'high': '#ff4444',
                'medium': '#ffd700', 
                'low': '#32cd32'
            }[email.priority];
            
            return `
                <div style="padding: 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); cursor: pointer; transition: background 0.2s;" 
                     onmouseover="this.style.background='rgba(255, 255, 255, 0.05)'" 
                     onmouseout="this.style.background='transparent'">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                        <div style="color: var(--lodge-light); font-weight: 600; font-size: 14px;">${email.from}</div>
                        <div style="text-align: right;">
                            <div style="color: var(--lodge-text-secondary); font-size: 11px; font-family: 'JetBrains Mono', monospace;">${email.time}</div>
                            <div style="width: 6px; height: 6px; background: ${priorityColor}; border-radius: 50%; margin-left: auto; margin-top: 4px;"></div>
                        </div>
                    </div>
                    <div style="color: var(--lodge-light); font-size: 13px; margin-bottom: 4px; font-weight: 500;">${email.subject}</div>
                    <div style="color: var(--lodge-text-secondary); font-size: 12px; line-height: 1.3;">${email.preview}</div>
                </div>
            `;
        }).join('');
    }
    
    generateTodaysCalendar() {
        const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
        const events = [
            { time: '9:00 AM', title: 'Swimming Training', type: 'workout', duration: '45 min' },
            { time: '11:30 AM', title: 'Property Walk-through', type: 'business', duration: '1 hour', location: '123 Oak St' },
            { time: '2:00 PM', title: 'Seller Call - Martinez', type: 'business', duration: '30 min' },
            { time: '4:00 PM', title: 'Weekly Team Standup', type: 'meeting', duration: '30 min' }
        ];
        
        return `
            <div style="color: var(--lodge-light); font-weight: 600; margin-bottom: 16px;">${today}</div>
            ${events.map(event => {
                const typeColor = {
                    'workout': '#ff4500',
                    'business': '#32cd32',
                    'meeting': '#ffd700'
                }[event.type];
                
                return `
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px; padding: 8px; background: rgba(255, 255, 255, 0.05); border-radius: 8px;">
                        <div style="color: ${typeColor}; font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 600; min-width: 60px;">
                            ${event.time}
                        </div>
                        <div style="flex: 1;">
                            <div style="color: var(--lodge-light); font-size: 14px; font-weight: 500;">${event.title}</div>
                            <div style="color: var(--lodge-text-secondary); font-size: 12px;">
                                ${event.duration}${event.location ? ' • ' + event.location : ''}
                            </div>
                        </div>
                    </div>
                `;
            }).join('')}
        `;
    }
    
    generateWeekPreview() {
        const weekEvents = [
            { day: 'Tue', count: 2, highlight: 'Contract Review Meeting' },
            { day: 'Wed', count: 4, highlight: '3 Property Showings' },
            { day: 'Thu', count: 1, highlight: 'Ironman Training Block' },
            { day: 'Fri', count: 3, highlight: 'Team Performance Review' },
            { day: 'Sat', count: 1, highlight: 'Long Training Session' }
        ];
        
        return weekEvents.map((day, index) => `
            <div style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); ${index % 2 === 0 ? 'background: rgba(255, 255, 255, 0.02);' : ''}">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div style="color: var(--lodge-light); font-weight: 600; font-size: 14px;">${day.day}</div>
                        <div style="color: var(--lodge-text-secondary); font-size: 12px;">${day.highlight}</div>
                    </div>
                    <div style="background: var(--lodge-accent); color: white; padding: 4px 8px; border-radius: 8px; font-size: 12px; font-weight: 600;">
                        ${day.count}
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    generateWeeklyPlan() {
        const plan = [
            { day: 'Mon', workout: 'Swimming - Base', status: 'complete', duration: '45 min' },
            { day: 'Tue', workout: 'Running - Intervals', status: 'scheduled', duration: '60 min' },
            { day: 'Wed', workout: 'Cycling - Endurance', status: 'scheduled', duration: '90 min' },
            { day: 'Thu', workout: 'Swimming - Speed', status: 'scheduled', duration: '45 min' },
            { day: 'Fri', workout: 'Brick Training', status: 'scheduled', duration: '75 min' },
            { day: 'Sat', workout: 'Long Run', status: 'scheduled', duration: '120 min' },
            { day: 'Sun', workout: 'Recovery/Yoga', status: 'scheduled', duration: '30 min' }
        ];
        
        return plan.map((day, index) => {
            const statusColor = day.status === 'complete' ? '#32cd32' : 
                              day.status === 'scheduled' ? '#ffd700' : '#888';
            
            return `
                <div style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); ${index % 2 === 0 ? 'background: rgba(255, 255, 255, 0.02);' : ''}">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div style="color: var(--lodge-light); font-weight: 600; font-size: 14px;">${day.day}</div>
                            <div style="color: var(--lodge-text-secondary); font-size: 12px;">${day.workout} • ${day.duration}</div>
                        </div>
                        <div style="background: ${statusColor}; color: white; padding: 3px 8px; border-radius: 8px; font-size: 10px; font-weight: 600; text-transform: uppercase;">
                            ${day.status}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    generateRecentWorkouts() {
        const workouts = [
            { date: 'Today', type: 'Swimming', distance: '2000m', time: '31:45', hr: '142 avg', quality: 'excellent' },
            { date: 'Yesterday', type: 'Running', distance: '8.2 km', time: '42:15', hr: '156 avg', quality: 'good' },
            { date: 'Feb 14', type: 'Cycling', distance: '45 km', time: '1:38:22', hr: '148 avg', quality: 'good' },
            { date: 'Feb 13', type: 'Swimming', distance: '1500m', time: '24:30', hr: '138 avg', quality: 'excellent' }
        ];
        
        return workouts.map((workout, index) => {
            const qualityColor = {
                'excellent': '#32cd32',
                'good': '#ffd700', 
                'fair': '#ff8c00',
                'poor': '#ff4444'
            }[workout.quality];
            
            return `
                <div style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); ${index % 2 === 0 ? 'background: rgba(255, 255, 255, 0.02);' : ''}">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                        <div>
                            <div style="color: var(--lodge-light); font-weight: 600; font-size: 14px;">${workout.type}</div>
                            <div style="color: var(--lodge-text-secondary); font-size: 11px;">${workout.date}</div>
                        </div>
                        <div style="text-align: right;">
                            <div style="color: var(--lodge-light); font-size: 12px; font-family: 'JetBrains Mono', monospace;">
                                ${workout.distance} • ${workout.time}
                            </div>
                            <div style="color: ${qualityColor}; font-size: 10px; font-weight: 600; text-transform: uppercase;">
                                ${workout.quality}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    getTrainingRoomContent() {
        return `
            <div style="text-align: center; margin-bottom: 20px;">
                <h3 style="color: var(--lodge-accent); margin-bottom: 8px; font-size: 24px; font-weight: 700;">🏋️ Training Room</h3>
                <p style="color: var(--lodge-text-secondary); font-size: 14px;">Ironman Training Command</p>
            </div>
            
            <!-- Today's Workout -->
            <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 20px; margin-bottom: 20px; border-left: 4px solid var(--lodge-accent);">
                <h4 style="color: var(--lodge-accent); margin: 0 0 12px 0; font-size: 18px; font-weight: 600;">🎯 Today's Mission</h4>
                <div style="color: var(--lodge-light); font-size: 16px; font-weight: 600; margin-bottom: 8px;">Swimming - Endurance Base</div>
                <div style="color: var(--lodge-text-secondary); font-size: 14px; margin-bottom: 16px;">45 minutes • Zone 2 aerobic base building</div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 12px;">
                    <div class="stat-card" style="padding: 12px;">
                        <span class="stat-value" style="font-size: 16px; color: var(--lodge-accent);">2000m</span>
                        <div class="stat-label" style="font-size: 11px;">Target Distance</div>
                    </div>
                    <div class="stat-card" style="padding: 12px;">
                        <span class="stat-value" style="font-size: 16px; color: var(--lodge-accent);">1:35/100m</span>
                        <div class="stat-label" style="font-size: 11px;">Target Pace</div>
                    </div>
                    <div class="stat-card" style="padding: 12px;">
                        <span class="stat-value" style="font-size: 16px; color: var(--lodge-accent);">140-150</span>
                        <div class="stat-label" style="font-size: 11px;">Target HR</div>
                    </div>
                </div>
                
                <div style="margin-top: 16px;">
                    <button class="lodge-btn" style="width: 100%; background: linear-gradient(135deg, #32cd32, #228b22);" onclick="window.lodgeUI.startWorkout()">
                        🏊‍♂️ Start Workout
                    </button>
                </div>
            </div>
            
            <!-- This Week's Plan -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">📅 Training Plan (Week 8)</h4>
            <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; overflow: hidden; margin-bottom: 20px;">
                ${this.generateWeeklyPlan()}
            </div>
            
            <!-- Recent Performance -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">📈 Recent Sessions</h4>
            <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; overflow: hidden; margin-bottom: 20px;">
                ${this.generateRecentWorkouts()}
            </div>
            
            <!-- Progress Stats -->
            <div class="stats-grid">
                <div class="stat-card">
                    <span class="stat-value" style="color: #32cd32;">12/14</span>
                    <div class="stat-label">Workouts This Month</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-accent);">8.2 hrs</span>
                    <div class="stat-label">Weekly Volume</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-gold);">92%</span>
                    <div class="stat-label">Plan Compliance</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: #ff6b35;">23w</span>
                    <div class="stat-label">Until Race Day</div>
                </div>
            </div>
            
            <!-- Quick Log -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">📝 Quick Log</h4>
            <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; margin-bottom: 16px;">
                    <input type="number" placeholder="Distance (m)" style="padding: 8px 12px; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 8px; color: var(--lodge-light); font-size: 14px;">
                    <input type="text" placeholder="Time (mm:ss)" style="padding: 8px 12px; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 8px; color: var(--lodge-light); font-size: 14px;">
                    <input type="number" placeholder="Avg HR" style="padding: 8px 12px; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 8px; color: var(--lodge-light); font-size: 14px;">
                </div>
                <button class="lodge-btn" style="width: 100%; font-size: 14px;" onclick="window.lodgeUI.logWorkout()">
                    📊 Log Workout
                </button>
            </div>
        `;
    }
    
    setupPanelInteractions(objectType) {
        if (objectType === 'desk') {
            // Setup project expansion
            window.lodgeUI.expandProject = (project) => {
                const kanban = document.getElementById('wholesaling-kanban');
                if (kanban) {
                    kanban.style.display = kanban.style.display === 'none' ? 'block' : 'none';
                }
            };
        }
        
        // Training room interactions
        window.lodgeUI.startWorkout = () => {
            alert('Starting workout timer! (Would integrate with fitness app/tracker)');
        };
        
        window.lodgeUI.logWorkout = () => {
            alert('Workout logged! (Would save to training database)');
        };
    }
    
    generateBudgetTracking() {
        const budget = [
            { category: 'AI/Software', budgeted: 200, actual: 170, color: '#32cd32' },
            { category: 'Marketing', budgeted: 150, actual: 65, color: '#32cd32' },
            { category: 'Infrastructure', budgeted: 75, actual: 50, color: '#32cd32' },
            { category: 'Training/Health', budgeted: 100, actual: 125, color: '#ff8c00' },
            { category: 'Misc/Other', budgeted: 50, actual: 35, color: '#32cd32' }
        ];
        
        return budget.map(item => {
            const percentage = (item.actual / item.budgeted) * 100;
            const statusColor = percentage > 100 ? '#ff6b35' : 
                               percentage > 80 ? '#ff8c00' : '#32cd32';
            
            return `
                <div style="margin-bottom: 16px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                        <span style="color: var(--lodge-light); font-size: 14px; font-weight: 500;">${item.category}</span>
                        <span style="color: ${statusColor}; font-size: 12px; font-family: 'JetBrains Mono', monospace; font-weight: 600;">
                            $${item.actual} / $${item.budgeted}
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
    
    getWatchtowerContent() {
        return `
            <div style="text-align: center; margin-bottom: 20px;">
                <h3 style="color: var(--lodge-accent); margin-bottom: 8px; font-size: 24px; font-weight: 700;">⚠️ Watchtower</h3>
                <p style="color: var(--lodge-text-secondary); font-size: 14px;">Critical Alerts & Monitoring</p>
            </div>
            
            <!-- Critical Alerts -->
            <h4 style="color: #ff4444; margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">🚨 Critical Alerts</h4>
            <div style="background: linear-gradient(135deg, rgba(255, 68, 68, 0.2), rgba(255, 68, 68, 0.1)); border: 1px solid #ff4444; border-radius: 12px; padding: 16px; margin-bottom: 20px;">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                    <div style="width: 8px; height: 8px; background: #ff4444; border-radius: 50%; animation: pulse 2s infinite;"></div>
                    <div>
                        <div style="color: var(--lodge-light); font-weight: 600; font-size: 14px;">Property Owner Response URGENT</div>
                        <div style="color: var(--lodge-text-secondary); font-size: 12px;">456 Oak Street - Owner wants to meet TODAY</div>
                    </div>
                </div>
                
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 8px; height: 8px; background: #ff8c00; border-radius: 50%;"></div>
                    <div>
                        <div style="color: var(--lodge-light); font-weight: 600; font-size: 14px;">API Usage Alert</div>
                        <div style="color: var(--lodge-text-secondary); font-size: 12px;">OpenAI usage at 85% - billing cycle ends in 3 days</div>
                    </div>
                </div>
            </div>
            
            <!-- System Status -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">🖥️ System Status</h4>
            <div class="stats-grid" style="margin-bottom: 20px;">
                <div class="stat-card">
                    <span class="stat-value" style="color: #32cd32;">99.2%</span>
                    <div class="stat-label">Uptime</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: #32cd32;">142ms</span>
                    <div class="stat-label">Avg Response</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-accent);">847</span>
                    <div class="stat-label">API Calls/hr</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-text-secondary);">12GB</span>
                    <div class="stat-label">Storage Used</div>
                </div>
            </div>
            
            <!-- Monitoring Feeds -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">📡 Live Monitoring</h4>
            <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; overflow: hidden; margin-bottom: 20px;">
                ${this.generateMonitoringFeed()}
            </div>
        `;
    }
    
    generateMonitoringFeed() {
        const alerts = [
            { time: '30s ago', type: 'success', message: 'Lead processing batch completed: 47 new prospects analyzed', source: 'Scout' },
            { time: '2m ago', type: 'warning', message: 'Email delivery rate dropped to 87% (threshold: 90%)', source: 'Marketing' },
            { time: '5m ago', type: 'info', message: 'Database optimization completed: 23% performance improvement', source: 'Builder' },
            { time: '8m ago', type: 'success', message: 'Tim completed 3 seller calls - 2 appointments scheduled', source: 'CRM' },
            { time: '12m ago', type: 'warning', message: 'API rate limit approaching: 89% of hourly limit', source: 'System' }
        ];
        
        return alerts.map((alert, index) => {
            const typeColor = {
                'success': '#32cd32',
                'warning': '#ff8c00',
                'error': '#ff4444',
                'info': '#00ced1'
            }[alert.type];
            
            return `
                <div style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); ${index % 2 === 0 ? 'background: rgba(255, 255, 255, 0.02);' : ''}">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <div style="width: 6px; height: 6px; background: ${typeColor}; border-radius: 50%;"></div>
                            <span style="color: var(--lodge-text-secondary); font-size: 11px; font-family: 'JetBrains Mono', monospace;">${alert.source}</span>
                        </div>
                        <span style="color: var(--lodge-text-secondary); font-size: 11px; font-family: 'JetBrains Mono', monospace;">${alert.time}</span>
                    </div>
                    <div style="color: var(--lodge-light); font-size: 13px; line-height: 1.4; margin-left: 14px;">
                        ${alert.message}
                    </div>
                </div>
            `;
        }).join('');
    }
    
    getLoungeContent() {
        return `
            <div style="text-align: center; margin-bottom: 20px;">
                <h3 style="color: var(--lodge-accent); margin-bottom: 8px; font-size: 24px; font-weight: 700;">🎵 Lounge</h3>
                <p style="color: var(--lodge-text-secondary); font-size: 14px;">Music & Relaxation</p>
            </div>
            
            <!-- Now Playing -->
            <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 20px; margin-bottom: 20px; text-align: center;">
                <div style="font-size: 48px; margin-bottom: 12px;">🎵</div>
                <h4 style="color: #32cd32; margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">Now Playing</h4>
                <div style="color: var(--lodge-light); font-size: 16px; font-weight: 500; margin-bottom: 4px;">"Eye of the Tiger"</div>
                <div style="color: var(--lodge-text-secondary); font-size: 14px; margin-bottom: 16px;">Survivor • Greatest Hits</div>
                
                <div style="margin: 20px 0;">
                    <div style="width: 100%; background: rgba(255, 255, 255, 0.1); border-radius: 12px; height: 6px;">
                        <div style="width: 45%; background: #32cd32; height: 100%; border-radius: 12px;"></div>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-top: 8px; color: var(--lodge-text-secondary); font-size: 12px; font-family: 'JetBrains Mono', monospace;">
                        <span>1:42</span>
                        <span>3:47</span>
                    </div>
                </div>
            </div>
            
            <!-- Playlists -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">🎶 Playlists</h4>
            <div style="display: grid; grid-template-columns: 1fr; gap: 12px; margin-bottom: 20px;">
                <button class="lodge-btn" style="justify-content: flex-start; text-align: left; padding: 16px;">
                    <div>
                        <div style="font-weight: 600; margin-bottom: 4px;">🏹 Hunt Mode</div>
                        <div style="font-size: 12px; opacity: 0.7;">Focus music for deep work • 47 tracks</div>
                    </div>
                </button>
                
                <button class="lodge-btn" style="justify-content: flex-start; text-align: left; padding: 16px;">
                    <div>
                        <div style="font-weight: 600; margin-bottom: 4px;">🔥 Pump Up</div>
                        <div style="font-size: 12px; opacity: 0.7;">Motivational workout tracks • 23 tracks</div>
                    </div>
                </button>
            </div>
        `;
    }
    
    getLibraryContent() {
        return `
            <div style="text-align: center; margin-bottom: 20px;">
                <h3 style="color: var(--lodge-accent); margin-bottom: 8px; font-size: 24px; font-weight: 700;">📚 Library</h3>
                <p style="color: var(--lodge-text-secondary); font-size: 14px;">Knowledge Base & Documents</p>
            </div>
            
            <!-- Quick Search -->
            <div style="margin-bottom: 20px;">
                <input type="text" placeholder="🔍 Search documents, contracts, playbooks..." style="width: 100%; padding: 12px 16px; background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 12px; color: var(--lodge-light); font-size: 14px;">
            </div>
            
            <!-- Document Categories -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">📁 Document Categories</h4>
            <div style="display: grid; grid-template-columns: 1fr; gap: 12px; margin-bottom: 20px;">
                <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px; cursor: pointer;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div style="color: var(--lodge-light); font-weight: 600; font-size: 14px;">📋 Real Estate Contracts</div>
                            <div style="color: var(--lodge-text-secondary); font-size: 12px;">Purchase agreements, assignments</div>
                        </div>
                        <div style="color: var(--lodge-accent); font-weight: 600; font-size: 14px;">23</div>
                    </div>
                </div>
                
                <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px; cursor: pointer;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div style="color: var(--lodge-light); font-weight: 600; font-size: 14px;">🎯 Marketing Playbooks</div>
                            <div style="color: var(--lodge-text-secondary); font-size: 12px;">Campaign strategies, scripts</div>
                        </div>
                        <div style="color: var(--lodge-accent); font-weight: 600; font-size: 14px;">15</div>
                    </div>
                </div>
            </div>
        `;
    }
}