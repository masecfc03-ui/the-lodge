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
            case 'fireplace':
                return this.getBaseCampContent();
            case 'desk':
                return this.getProjectsContent();
            case 'bunks':
                return this.getTeamContent();
            case 'safe':
                return this.getTreasuryContent();
            case 'radio':
                return this.getCommandCenterContent();
            case 'jukebox':
                return this.getJukeboxContent();
            case 'bookshelf':
                return this.getFieldJournalContent();
            case 'monitors':
                return this.getTrailCamsContent();
            default:
                return '<p>Welcome to The Lodge!</p>';
        }
    }
    
    getBaseCampContent() {
        return `
            <div style="text-align: center; margin-bottom: 30px;">
                <h3 style="color: #ff8c00; margin-bottom: 15px;">🔥 Welcome to Base Camp</h3>
                <p style="font-size: 16px; margin-bottom: 20px;">Mason's Command Center</p>
                
                <div style="background: rgba(139, 69, 19, 0.3); padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                    <strong>📍 Kaufman, TX</strong><br>
                    🌡️ 72°F • Partly Cloudy<br>
                    <small style="color: #c4a374;">Perfect weather for hunting deals</small>
                </div>
            </div>
            
            <div class="stats-grid">
                <div class="stat-card">
                    <span class="stat-value">16,663</span>
                    <div class="stat-label">Total Leads</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value">311</span>
                    <div class="stat-label">Traced</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value">0</span>
                    <div class="stat-label">Closed</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value">$20</span>
                    <div class="stat-label">Spent</div>
                </div>
            </div>
            
            <h4 style="color: #ff8c00; margin: 25px 0 15px 0;">📧 Inbox (3 unread)</h4>
            <div style="background: rgba(139, 69, 19, 0.2); padding: 12px; border-radius: 6px; margin-bottom: 10px; border-left: 3px solid #ff8c00;">
                <strong>County Records Update</strong><br>
                <small style="color: #c4a374;">New properties available in Ellis County</small>
            </div>
            <div style="background: rgba(139, 69, 19, 0.2); padding: 12px; border-radius: 6px; margin-bottom: 10px;">
                <strong>Lead Quality Alert</strong><br>
                <small style="color: #c4a374;">High-value properties detected</small>
            </div>
            <div style="background: rgba(139, 69, 19, 0.2); padding: 12px; border-radius: 6px;">
                <strong>System Health Report</strong><br>
                <small style="color: #c4a374;">All systems operational</small>
            </div>
            
            <h4 style="color: #ff8c00; margin: 25px 0 15px 0;">⚡ Recent Activity</h4>
            <div style="font-size: 14px; color: #c4a374;">
                <p>• Scout found 12 new prospects in Dallas County</p>
                <p>• Tim processed 3 deal packages</p>
                <p>• Builder deployed Trail Cams update</p>
                <p>• 8 new leads from marketing campaigns</p>
            </div>
        `;
    }
    
    getProjectsContent() {
        return `
            <h3 style="color: #ff8c00; margin-bottom: 20px;">📋 Active Projects</h3>
            
            <div style="margin-bottom: 25px;">
                <div class="button-group">
                    <button class="lodge-btn" onclick="window.lodgeUI.expandProject('wholesaling')">
                        📈 Wholesaling
                    </button>
                    <div style="background: rgba(139, 69, 19, 0.3); padding: 8px 12px; border-radius: 4px; font-size: 12px;">
                        ACTIVE
                    </div>
                </div>
                
                <div style="background: rgba(139, 69, 19, 0.2); padding: 15px; border-radius: 6px; margin-top: 10px;">
                    <div class="stats-grid">
                        <div class="stat-card">
                            <span class="stat-value">23</span>
                            <div class="stat-label">In Pipeline</div>
                        </div>
                        <div class="stat-card">
                            <span class="stat-value">7</span>
                            <div class="stat-label">Under Contract</div>
                        </div>
                        <div class="stat-card">
                            <span class="stat-value">$45K</span>
                            <div class="stat-label">Avg Profit</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div style="margin-bottom: 25px;">
                <div class="button-group">
                    <button class="lodge-btn">
                        🎯 Kalshi Trading
                    </button>
                    <div style="background: rgba(255, 140, 0, 0.3); padding: 8px 12px; border-radius: 4px; font-size: 12px;">
                        PAUSED
                    </div>
                </div>
                
                <div style="background: rgba(139, 69, 19, 0.2); padding: 15px; border-radius: 6px; margin-top: 10px;">
                    <p><strong>Balance:</strong> $125.73</p>
                    <p style="color: #c4a374; font-size: 14px; margin-top: 8px;">
                        Automated trading paused for strategy review
                    </p>
                </div>
            </div>
            
            <button class="lodge-btn" style="width: 100%; background: linear-gradient(135deg, #32cd32, #228b22);">
                ➕ New Project
            </button>
            
            <div id="wholesaling-kanban" style="display: none; margin-top: 30px;">
                <h4 style="color: #ff8c00; margin-bottom: 15px;">🏠 Wholesaling Pipeline</h4>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px;">
                    <div style="background: rgba(139, 69, 19, 0.3); padding: 15px; border-radius: 6px;">
                        <h5 style="color: #e6d3a3; margin-bottom: 10px;">🔍 Prospecting</h5>
                        <div style="font-size: 12px; color: #c4a374;">
                            <p>• 123 Oak St - $85K</p>
                            <p>• 456 Pine Ave - $92K</p>
                            <p>• 789 Elm Dr - $78K</p>
                        </div>
                    </div>
                    
                    <div style="background: rgba(255, 140, 0, 0.3); padding: 15px; border-radius: 6px;">
                        <h5 style="color: #e6d3a3; margin-bottom: 10px;">📋 Under Contract</h5>
                        <div style="font-size: 12px; color: #c4a374;">
                            <p>• 321 Maple St - $105K</p>
                            <p>• 654 Cedar Ln - $88K</p>
                        </div>
                    </div>
                    
                    <div style="background: rgba(50, 205, 50, 0.3); padding: 15px; border-radius: 6px;">
                        <h5 style="color: #e6d3a3; margin-bottom: 10px;">✅ Closed</h5>
                        <div style="font-size: 12px; color: #c4a374;">
                            <p>• 987 Birch Way - $12K profit</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    getTeamContent() {
        return `
            <h3 style="color: #ff8c00; margin-bottom: 20px;">👥 The Team</h3>
            
            <div class="team-member">
                <div class="member-status active"></div>
                <div class="member-info">
                    <h4>Tim</h4>
                    <p class="member-role">Manager • On the Hunt</p>
                </div>
            </div>
            
            <div class="team-member">
                <div class="member-status away"></div>
                <div class="member-info">
                    <h4>Scout</h4>
                    <p class="member-role">Lead Finder • Back at Camp</p>
                </div>
            </div>
            
            <div class="team-member">
                <div class="member-status active"></div>
                <div class="member-info">
                    <h4>Builder</h4>
                    <p class="member-role">Developer • On the Hunt</p>
                </div>
            </div>
            
            <h4 style="color: #ff8c00; margin: 25px 0 15px 0;">📊 Team Activity</h4>
            
            <div style="background: rgba(139, 69, 19, 0.2); padding: 15px; border-radius: 6px; margin-bottom: 15px;">
                <h5 style="color: #32cd32; margin: 0 0 10px 0;">🎯 Tim's Tasks</h5>
                <div style="font-size: 14px; color: #c4a374;">
                    <p>• Review 12 new property leads</p>
                    <p>• Call 3 motivated sellers</p>
                    <p>• Update deal pipeline status</p>
                </div>
            </div>
            
            <div style="background: rgba(139, 69, 19, 0.2); padding: 15px; border-radius: 6px; margin-bottom: 15px;">
                <h5 style="color: #ffa500; margin: 0 0 10px 0;">🔍 Scout's Finds</h5>
                <div style="font-size: 14px; color: #c4a374;">
                    <p>• 45 new prospects identified</p>
                    <p>• 12 high-priority leads flagged</p>
                    <p>• Market analysis complete</p>
                </div>
            </div>
            
            <div style="background: rgba(139, 69, 19, 0.2); padding: 15px; border-radius: 6px;">
                <h5 style="color: #32cd32; margin: 0 0 10px 0;">⚙️ Builder's Updates</h5>
                <div style="font-size: 14px; color: #c4a374;">
                    <p>• The Lodge system deployed</p>
                    <p>• Trail Cams monitoring active</p>
                    <p>• Performance optimizations live</p>
                </div>
            </div>
        `;
    }
    
    getTreasuryContent() {
        return `
            <h3 style="color: #ff8c00; margin-bottom: 20px;">💰 Treasury</h3>
            
            <div style="text-align: center; margin-bottom: 30px;">
                <div style="font-size: 48px; color: #ffd700; margin-bottom: 10px;">💰</div>
                <h4 style="color: #e6d3a3;">Financial Overview</h4>
            </div>
            
            <div class="stats-grid">
                <div class="stat-card">
                    <span class="stat-value">$125.73</span>
                    <div class="stat-label">Kalshi Balance</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value">$220</span>
                    <div class="stat-label">Monthly Spend</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value">$0</span>
                    <div class="stat-label">Revenue</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value">$20</span>
                    <div class="stat-label">Marketing Spend</div>
                </div>
            </div>
            
            <h4 style="color: #ff8c00; margin: 25px 0 15px 0;">📊 Expense Breakdown</h4>
            
            <div style="background: rgba(139, 69, 19, 0.2); padding: 20px; border-radius: 6px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <span>Software & Tools</span>
                    <span style="color: #ff8c00;">$150</span>
                </div>
                <div style="width: 100%; background: rgba(139, 69, 19, 0.5); border-radius: 10px; height: 8px; margin-bottom: 15px;">
                    <div style="width: 68%; background: #ff8c00; height: 100%; border-radius: 10px;"></div>
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <span>Marketing</span>
                    <span style="color: #ff8c00;">$50</span>
                </div>
                <div style="width: 100%; background: rgba(139, 69, 19, 0.5); border-radius: 10px; height: 8px; margin-bottom: 15px;">
                    <div style="width: 23%; background: #ff8c00; height: 100%; border-radius: 10px;"></div>
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <span>Operations</span>
                    <span style="color: #ff8c00;">$20</span>
                </div>
                <div style="width: 100%; background: rgba(139, 69, 19, 0.5); border-radius: 10px; height: 8px;">
                    <div style="width: 9%; background: #ff8c00; height: 100%; border-radius: 10px;"></div>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
                <p style="color: #c4a374; font-style: italic;">
                    "Every dollar invested in good intel pays dividends in closed deals"
                </p>
            </div>
        `;
    }
    
    getCommandCenterContent() {
        return `
            <h3 style="color: #ff8c00; margin-bottom: 20px;">📻 Command Center</h3>
            
            <div class="button-group">
                <button class="lodge-btn" style="background: linear-gradient(135deg, #ff4500, #ff6347);">
                    🚀 Fire Email Blast
                </button>
                <button class="lodge-btn" style="background: linear-gradient(135deg, #32cd32, #228b22);">
                    📱 Fire SMS Campaign
                </button>
            </div>
            
            <h4 style="color: #ff8c00; margin: 25px 0 15px 0;">🏃‍♂️ Task Queue</h4>
            <div style="background: rgba(139, 69, 19, 0.2); padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span>📧 Process Email Responses</span>
                    <span style="color: #32cd32;">RUNNING</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span>🔍 Scan New Leads</span>
                    <span style="color: #ffa500;">QUEUED</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span>📊 Generate Reports</span>
                    <span style="color: #ffa500;">QUEUED</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span>🏠 Update Property Data</span>
                    <span style="color: #32cd32;">COMPLETE</span>
                </div>
            </div>
            
            <h4 style="color: #ff8c00; margin: 25px 0 15px 0;">⚡ System Health</h4>
            <div class="stats-grid">
                <div class="stat-card">
                    <span class="stat-value" style="color: #32cd32;">98%</span>
                    <div class="stat-label">Uptime</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: #32cd32;">142ms</span>
                    <div class="stat-label">Response Time</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value">847</span>
                    <div class="stat-label">API Calls/hr</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value">12GB</span>
                    <div class="stat-label">Storage Used</div>
                </div>
            </div>
            
            <h4 style="color: #ff8c00; margin: 25px 0 15px 0;">📤 Send Command to Tim</h4>
            <div style="display: flex; gap: 10px;">
                <input type="text" placeholder="Type message..." style="flex: 1; padding: 10px; background: rgba(139, 69, 19, 0.3); border: 1px solid #654321; border-radius: 4px; color: #e6d3a3;">
                <button class="lodge-btn" style="min-width: 80px;">SEND</button>
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
    }
}