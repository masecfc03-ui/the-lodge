// The Lodge - Main JavaScript Module
// Premium Lodge Dashboard with Dark Wood Theme and Brass Accents

class LodgeDashboard {
    constructor() {
        this.currentRoom = 'main-hall';
        this.data = {};
        this.charts = {};
        this.updateInterval = null;
        
        this.init();
    }
    
    async init() {
        console.log('🏰 Initializing The Lodge Dashboard...');
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Load all data
        await this.loadData();
        
        // Render initial room
        this.renderRoom(this.currentRoom);
        
        // Start auto-refresh
        this.startAutoRefresh();
        
        console.log('✅ The Lodge is ready!');
    }
    
    setupEventListeners() {
        // Room navigation
        document.querySelectorAll('.room-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const room = e.currentTarget.dataset.room;
                this.switchRoom(room);
            });
        });
        
        // Handle window resize for charts
        window.addEventListener('resize', () => {
            this.resizeCharts();
        });
    }
    
    async loadData() {
        const dataFiles = [
            'dashboard.json',
            'agents.json', 
            'treasury.json',
            'projects.json',
            'training.json',
            'markets.json',
            'news.json',
            'calendar.json',
            'alerts.json',
            'changelog.json',
            'goals.json',
            'emails.json'
        ];
        
        console.log('📊 Loading data files...');
        
        for (const file of dataFiles) {
            try {
                const response = await fetch(`/data/${file}`);
                if (response.ok) {
                    const filename = file.replace('.json', '');
                    this.data[filename] = await response.json();
                    console.log(`✅ Loaded ${file}`);
                } else {
                    console.warn(`⚠️ Failed to load ${file}: ${response.status}`);
                }
            } catch (error) {
                console.error(`❌ Error loading ${file}:`, error);
            }
        }
        
        // Update header stats
        this.updateHeaderStats();
    }
    
    updateHeaderStats() {
        if (this.data.dashboard) {
            // Update last updated time
            const lastUpdated = new Date(this.data.dashboard.last_updated);
            document.getElementById('last-updated').textContent = 
                lastUpdated.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                });
        }
        
        if (this.data.treasury) {
            // Calculate net worth
            const accounts = this.data.treasury.account_balances;
            let totalNetWorth = 0;
            
            Object.values(accounts).forEach(account => {
                totalNetWorth += account.balance || 0;
            });
            
            document.getElementById('net-worth').textContent = 
                this.formatCurrency(totalNetWorth);
        }
    }
    
    switchRoom(roomId) {
        // Update active tab
        document.querySelectorAll('.room-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-room="${roomId}"]`).classList.add('active');
        
        // Update active room
        document.querySelectorAll('.room').forEach(room => {
            room.classList.remove('active');
        });
        document.getElementById(roomId).classList.add('active');
        
        this.currentRoom = roomId;
        this.renderRoom(roomId);
    }
    
    renderRoom(roomId) {
        console.log(`🏛️ Rendering room: ${roomId}`);
        
        switch (roomId) {
            case 'main-hall':
                this.renderMainHall();
                break;
            case 'war-room':
                this.renderWarRoom();
                break;
            case 'treasury':
                this.renderTreasury();
                break;
            case 'barracks':
                this.renderBarracks();
                break;
            case 'training':
                this.renderTraining();
                break;
            default:
                console.log(`Room ${roomId} not implemented yet`);
        }
    }
    
    renderMainHall() {
        this.renderNetWorth();
        this.renderBriefing();
        this.renderDecisionQueue();
        this.renderQuickStats();
        this.renderWeatherCalendar();
    }
    
    renderNetWorth() {
        if (!this.data.treasury) return;
        
        const accounts = this.data.treasury.account_balances;
        let totalNetWorth = 0;
        
        Object.values(accounts).forEach(account => {
            totalNetWorth += account.balance || 0;
        });
        
        const netWorthEl = document.getElementById('main-net-worth');
        if (netWorthEl) {
            netWorthEl.textContent = this.formatCurrency(totalNetWorth);
        }
        
        // Render trend chart (placeholder data)
        this.renderNetWorthChart();
    }
    
    renderNetWorthChart() {
        const canvas = document.getElementById('net-worth-chart');
        if (!canvas) return;
        
        // Destroy existing chart
        if (this.charts.netWorth) {
            this.charts.netWorth.destroy();
        }
        
        const ctx = canvas.getContext('2d');
        
        // Generate sample trend data
        const trendData = this.generateTrendData(30, 4000, 4500);
        
        this.charts.netWorth = new Chart(ctx, {
            type: 'line',
            data: {
                labels: trendData.labels,
                datasets: [{
                    data: trendData.values,
                    borderColor: '#D4AF37',
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    pointHoverBackgroundColor: '#D4AF37',
                    pointHoverBorderColor: '#FFF'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: { display: false },
                    y: { display: false }
                },
                elements: {
                    point: { radius: 0 }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }
    
    renderBriefing() {
        const briefingEl = document.getElementById('briefing-content');
        if (!briefingEl || !this.data.dashboard) return;
        
        const dashboard = this.data.dashboard;
        let briefingHTML = '';
        
        if (dashboard.priorities) {
            briefingHTML += '<div class="priorities-list">';
            dashboard.priorities.slice(0, 4).forEach(priority => {
                briefingHTML += `<div class="priority-item">${priority}</div>`;
            });
            briefingHTML += '</div>';
        }
        
        if (dashboard.alerts) {
            briefingHTML += '<div class="alerts-list">';
            dashboard.alerts.slice(0, 3).forEach(alert => {
                const alertClass = alert.action_required ? 'urgent' : 'info';
                briefingHTML += `
                    <div class="alert-item ${alertClass}">
                        <span class="alert-type">${alert.type.toUpperCase()}</span>
                        <span class="alert-message">${alert.message}</span>
                    </div>
                `;
            });
            briefingHTML += '</div>';
        }
        
        briefingEl.innerHTML = briefingHTML;
    }
    
    renderDecisionQueue() {
        const decisionsEl = document.getElementById('decisions-list');
        if (!decisionsEl || !this.data.dashboard?.decision_queue) return;
        
        let decisionsHTML = '';
        
        this.data.dashboard.decision_queue.forEach(decision => {
            const priorityClass = decision.priority === 'urgent' ? 'urgent' : 
                                 decision.priority === 'high' ? 'high' : 'medium';
            
            decisionsHTML += `
                <div class="decision-item ${priorityClass}">
                    <div class="decision-title">${decision.title}</div>
                    <div class="decision-description">${decision.description}</div>
                    <div class="decision-meta">
                        <span class="deadline">Due: ${decision.deadline}</span>
                        ${decision.potential_value ? 
                            `<span class="value">Value: ${this.formatCurrency(decision.potential_value)}</span>` : 
                            ''}
                    </div>
                </div>
            `;
        });
        
        decisionsEl.innerHTML = decisionsHTML;
    }
    
    renderQuickStats() {
        const statsEl = document.getElementById('quick-stats');
        if (!statsEl || !this.data.dashboard?.quick_stats) return;
        
        const stats = this.data.dashboard.quick_stats;
        let statsHTML = '';
        
        Object.entries(stats).forEach(([key, value]) => {
            const label = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            let displayValue = value;
            
            if (typeof value === 'boolean') {
                displayValue = value ? '✓' : '✗';
            }
            
            statsHTML += `
                <div class="stat-card">
                    <span class="value">${displayValue}</span>
                    <span class="label">${label}</span>
                </div>
            `;
        });
        
        statsEl.innerHTML = statsHTML;
    }
    
    renderWeatherCalendar() {
        const weatherEl = document.getElementById('weather-calendar');
        if (!weatherEl || !this.data.dashboard?.weather) return;
        
        const weather = this.data.dashboard.weather;
        
        const weatherHTML = `
            <div class="weather-current">
                <div class="weather-temp">${weather.current.temperature}°F</div>
                <div class="weather-condition">${weather.current.condition}</div>
                <div class="weather-location">${weather.location}</div>
            </div>
            <div class="weather-forecast">
                ${weather.forecast_3day.map(day => `
                    <div class="forecast-day">
                        <div class="day-name">${day.day}</div>
                        <div class="day-temps">${day.high}°/${day.low}°</div>
                        <div class="day-condition">${day.condition}</div>
                        ${day.rain > 0 ? `<div class="rain-chance">${day.rain}% rain</div>` : ''}
                    </div>
                `).join('')}
            </div>
        `;
        
        weatherEl.innerHTML = weatherHTML;
    }
    
    renderWarRoom() {
        this.renderProjects();
        this.renderMarketData();
        this.renderPipeline();
        this.renderNewseFeed();
    }
    
    renderProjects() {
        const projectsEl = document.getElementById('projects-list');
        if (!projectsEl || !this.data.projects) return;
        
        let projectsHTML = '';
        
        if (this.data.projects.active_projects) {
            this.data.projects.active_projects.forEach(project => {
                const statusClass = project.status === 'active' ? 'active' : 
                                   project.status === 'paused' ? 'paused' : 'completed';
                
                projectsHTML += `
                    <div class="project-card">
                        <div class="project-header">
                            <h4>${project.name}</h4>
                            <span class="status-badge ${statusClass}">${project.status}</span>
                        </div>
                        <div class="project-description">${project.description}</div>
                        <div class="project-stats">
                            <div class="stat">
                                <span class="label">Progress</span>
                                <span class="value">${project.progress || 0}%</span>
                            </div>
                            <div class="stat">
                                <span class="label">Budget</span>
                                <span class="value">${this.formatCurrency(project.budget || 0)}</span>
                            </div>
                        </div>
                    </div>
                `;
            });
        }
        
        projectsEl.innerHTML = projectsHTML || '<p>No active projects</p>';
    }
    
    renderMarketData() {
        const marketEl = document.getElementById('market-data');
        if (!marketEl || !this.data.markets) return;
        
        let marketHTML = '';
        
        if (this.data.markets.rates) {
            marketHTML += '<div class="rates-section"><h4>Current Rates</h4>';
            Object.entries(this.data.markets.rates).forEach(([type, rate]) => {
                const percentage = (rate * 100).toFixed(2);
                marketHTML += `
                    <div class="rate-item">
                        <span class="rate-type">${type.replace(/_/g, ' ').toUpperCase()}</span>
                        <span class="rate-value">${percentage}%</span>
                    </div>
                `;
            });
            marketHTML += '</div>';
        }
        
        marketEl.innerHTML = marketHTML;
    }
    
    renderPipeline() {
        // Pipeline visualization would go here
        // For now, we'll add a placeholder
        console.log('Pipeline chart rendering - placeholder');
    }
    
    renderNewseFeed() {
        const newsEl = document.getElementById('news-feed');
        if (!newsEl || !this.data.news) return;
        
        let newsHTML = '';
        
        if (this.data.news.articles) {
            this.data.news.articles.slice(0, 5).forEach(article => {
                const publishedDate = new Date(article.published_date);
                newsHTML += `
                    <div class="news-item">
                        <div class="news-title">${article.title}</div>
                        <div class="news-summary">${article.summary}</div>
                        <div class="news-meta">
                            <span class="news-source">${article.source}</span>
                            <span class="news-date">${publishedDate.toLocaleDateString()}</span>
                        </div>
                    </div>
                `;
            });
        }
        
        newsEl.innerHTML = newsHTML || '<p>No news available</p>';
    }
    
    renderTreasury() {
        this.renderAccounts();
        this.renderBurnChart();
        this.renderSubscriptions();
        this.renderTransactions();
    }
    
    renderAccounts() {
        const accountsEl = document.getElementById('accounts-list');
        if (!accountsEl || !this.data.treasury?.account_balances) return;
        
        let accountsHTML = '';
        
        Object.entries(this.data.treasury.account_balances).forEach(([name, account]) => {
            const accountName = name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            accountsHTML += `
                <div class="account-item">
                    <div class="account-name">${accountName}</div>
                    <div class="account-balance">${this.formatCurrency(account.balance)}</div>
                    <div class="account-type">${account.account_type}</div>
                </div>
            `;
        });
        
        accountsEl.innerHTML = accountsHTML;
    }
    
    renderBurnChart() {
        const canvas = document.getElementById('burn-chart');
        if (!canvas || !this.data.treasury) return;
        
        // Destroy existing chart
        if (this.charts.burnRate) {
            this.charts.burnRate.destroy();
        }
        
        const ctx = canvas.getContext('2d');
        
        // Generate sample burn rate data
        const burnData = this.generateTrendData(12, 800, 1200);
        
        this.charts.burnRate = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: burnData.labels,
                datasets: [{
                    label: 'Monthly Burn',
                    data: burnData.values,
                    backgroundColor: 'rgba(255, 165, 0, 0.6)',
                    borderColor: '#FFA500',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(212, 175, 55, 0.2)' },
                        ticks: { color: '#D4AF37' }
                    },
                    x: {
                        grid: { color: 'rgba(212, 175, 55, 0.2)' },
                        ticks: { color: '#D4AF37' }
                    }
                }
            }
        });
    }
    
    renderSubscriptions() {
        const subsEl = document.getElementById('subscriptions-list');
        if (!subsEl || !this.data.treasury?.subscriptions) return;
        
        let subsHTML = '';
        
        this.data.treasury.subscriptions.forEach(sub => {
            const nextCharge = new Date(sub.next_charge);
            const statusClass = sub.status === 'active' ? 'active' : 'inactive';
            
            subsHTML += `
                <div class="subscription-item">
                    <div class="sub-name">${sub.service}</div>
                    <div class="sub-amount">${this.formatCurrency(sub.amount)}</div>
                    <div class="sub-next">Next: ${nextCharge.toLocaleDateString()}</div>
                    <span class="status-badge ${statusClass}">${sub.status}</span>
                </div>
            `;
        });
        
        subsEl.innerHTML = subsHTML;
    }
    
    renderTransactions() {
        const transEl = document.getElementById('transactions-list');
        if (!transEl || !this.data.treasury?.recent_transactions) return;
        
        let transHTML = '';
        
        this.data.treasury.recent_transactions.slice(0, 10).forEach(trans => {
            const transDate = new Date(trans.date);
            const amountClass = trans.amount > 0 ? 'positive' : 'negative';
            
            transHTML += `
                <div class="transaction-item">
                    <div class="trans-description">${trans.description}</div>
                    <div class="trans-amount ${amountClass}">${this.formatCurrency(trans.amount)}</div>
                    <div class="trans-date">${transDate.toLocaleDateString()}</div>
                    <div class="trans-category">${trans.category}</div>
                </div>
            `;
        });
        
        transEl.innerHTML = transHTML;
    }
    
    renderBarracks() {
        this.renderAgents();
        this.renderReportsFeed();
        this.renderSystemHealth();
        this.renderChangelog();
    }
    
    renderAgents() {
        const agentsEl = document.getElementById('agents-grid');
        if (!agentsEl || !this.data.agents?.agents) return;
        
        let agentsHTML = '';
        
        Object.entries(this.data.agents.agents).forEach(([key, agent]) => {
            const statusClass = agent.status === 'online' ? 'online' : 'offline';
            const initials = agent.name.split(' ').map(n => n[0]).join('');
            
            agentsHTML += `
                <div class="agent-card">
                    <div class="agent-header">
                        <div class="agent-avatar">${initials}</div>
                        <div class="agent-info">
                            <h4>${agent.name}</h4>
                            <div class="agent-role">${agent.role}</div>
                        </div>
                    </div>
                    <div class="agent-status">
                        <span class="status-badge ${statusClass}">${agent.status}</span>
                        <span class="reports-count">${agent.total_reports} reports</span>
                    </div>
                    <div class="agent-last-report">
                        ${agent.last_report ? 
                            `Last: ${new Date(agent.last_report.timestamp).toLocaleString()}` : 
                            'No reports yet'
                        }
                    </div>
                    <div class="agent-performance">
                        <div class="perf-stats">
                            ${Object.entries(agent.performance_24h || {}).map(([key, value]) => 
                                `<div class="perf-item">
                                    <span class="perf-label">${key.replace(/_/g, ' ')}</span>
                                    <span class="perf-value">${value}</span>
                                </div>`
                            ).join('')}
                        </div>
                    </div>
                </div>
            `;
        });
        
        agentsEl.innerHTML = agentsHTML;
    }
    
    renderReportsFeed() {
        const reportsEl = document.getElementById('reports-feed');
        if (!reportsEl || !this.data.agents?.recent_reports) return;
        
        let reportsHTML = '';
        
        this.data.agents.recent_reports.slice(0, 10).forEach(report => {
            const reportDate = new Date(report.timestamp);
            const priorityClass = report.priority === 'urgent' ? 'urgent' : 
                                 report.priority === 'high' ? 'high' : 'medium';
            
            reportsHTML += `
                <div class="report-item ${priorityClass}">
                    <div class="report-header">
                        <span class="report-agent">${report.agent}</span>
                        <span class="report-date">${reportDate.toLocaleString()}</span>
                    </div>
                    <div class="report-content">${report.content.substring(0, 200)}...</div>
                    <div class="report-meta">
                        <span class="report-source">${report.source}</span>
                        <span class="report-type">${report.type}</span>
                    </div>
                </div>
            `;
        });
        
        reportsEl.innerHTML = reportsHTML;
    }
    
    renderSystemHealth() {
        const healthEl = document.getElementById('uptime-grid');
        if (!healthEl || !this.data.agents) return;
        
        const summary = this.data.agents.summary || {};
        
        const healthHTML = `
            <div class="health-stat">
                <div class="health-value">${summary.active_agents || 0}</div>
                <div class="health-label">Active Agents</div>
            </div>
            <div class="health-stat">
                <div class="health-value">${summary.reports_last_24h || 0}</div>
                <div class="health-label">Reports (24h)</div>
            </div>
            <div class="health-stat">
                <div class="health-value">${summary.high_priority_alerts || 0}</div>
                <div class="health-label">High Priority</div>
            </div>
            <div class="health-stat">
                <div class="health-value status-${summary.system_health || 'unknown'}">${summary.system_health || 'Unknown'}</div>
                <div class="health-label">System Status</div>
            </div>
        `;
        
        healthEl.innerHTML = healthHTML;
    }
    
    renderChangelog() {
        const changelogEl = document.getElementById('changelog-list');
        if (!changelogEl || !this.data.changelog) return;
        
        let changelogHTML = '';
        
        if (this.data.changelog.entries) {
            this.data.changelog.entries.slice(0, 5).forEach(entry => {
                const entryDate = new Date(entry.date);
                changelogHTML += `
                    <div class="changelog-item">
                        <div class="changelog-version">${entry.version}</div>
                        <div class="changelog-date">${entryDate.toLocaleDateString()}</div>
                        <div class="changelog-changes">
                            ${entry.changes.map(change => `<div class="change-item">${change}</div>`).join('')}
                        </div>
                    </div>
                `;
            });
        }
        
        changelogEl.innerHTML = changelogHTML || '<p>No changelog entries</p>';
    }
    
    renderTraining() {
        this.renderWorkout();
        this.renderTrainingPlan();
        this.renderProgressCharts();
        this.renderRecoveryMetrics();
    }
    
    renderWorkout() {
        const workoutEl = document.getElementById('workout-display');
        if (!workoutEl || !this.data.training) return;
        
        let workoutHTML = '';
        
        if (this.data.training.todays_workout) {
            const workout = this.data.training.todays_workout;
            workoutHTML = `
                <div class="workout-today">
                    <h4>${workout.type || 'Today\'s Workout'}</h4>
                    <div class="workout-details">
                        <div class="workout-duration">Duration: ${workout.duration || 'N/A'}</div>
                        <div class="workout-intensity">Intensity: ${workout.intensity || 'N/A'}</div>
                    </div>
                    <div class="workout-description">${workout.description || 'No description'}</div>
                </div>
            `;
        }
        
        workoutEl.innerHTML = workoutHTML || '<p>No workout planned for today</p>';
    }
    
    renderTrainingPlan() {
        const planEl = document.getElementById('training-schedule');
        if (!planEl || !this.data.training) return;
        
        let planHTML = '';
        
        if (this.data.training.weekly_plan) {
            this.data.training.weekly_plan.forEach(day => {
                planHTML += `
                    <div class="plan-day">
                        <div class="day-name">${day.day}</div>
                        <div class="day-activity">${day.activity}</div>
                        <div class="day-duration">${day.duration}</div>
                    </div>
                `;
            });
        }
        
        planEl.innerHTML = planHTML || '<p>No training plan available</p>';
    }
    
    renderProgressCharts() {
        const canvas = document.getElementById('training-chart');
        if (!canvas) return;
        
        // Destroy existing chart
        if (this.charts.training) {
            this.charts.training.destroy();
        }
        
        const ctx = canvas.getContext('2d');
        
        // Generate sample training data
        const trainingData = this.generateTrendData(30, 20, 60); // minutes
        
        this.charts.training = new Chart(ctx, {
            type: 'line',
            data: {
                labels: trainingData.labels,
                datasets: [{
                    label: 'Training Minutes',
                    data: trainingData.values,
                    borderColor: '#32CD32',
                    backgroundColor: 'rgba(50, 205, 50, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { 
                        display: true,
                        labels: { color: '#D4AF37' }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(212, 175, 55, 0.2)' },
                        ticks: { color: '#D4AF37' }
                    },
                    x: {
                        grid: { color: 'rgba(212, 175, 55, 0.2)' },
                        ticks: { color: '#D4AF37' }
                    }
                }
            }
        });
    }
    
    renderRecoveryMetrics() {
        const recoveryEl = document.getElementById('recovery-metrics');
        if (!recoveryEl || !this.data.training) return;
        
        const metrics = this.data.training.recovery_metrics || {};
        
        const recoveryHTML = `
            <div class="recovery-grid">
                <div class="recovery-item">
                    <div class="recovery-label">Sleep Score</div>
                    <div class="recovery-value">${metrics.sleep_score || 'N/A'}</div>
                </div>
                <div class="recovery-item">
                    <div class="recovery-label">HRV</div>
                    <div class="recovery-value">${metrics.hrv || 'N/A'}</div>
                </div>
                <div class="recovery-item">
                    <div class="recovery-label">Resting HR</div>
                    <div class="recovery-value">${metrics.resting_hr || 'N/A'}</div>
                </div>
                <div class="recovery-item">
                    <div class="recovery-label">Recovery</div>
                    <div class="recovery-value">${metrics.recovery_status || 'N/A'}</div>
                </div>
            </div>
        `;
        
        recoveryEl.innerHTML = recoveryHTML;
    }
    
    // Utility Functions
    formatCurrency(amount) {
        if (amount >= 1000000) {
            return `$${(amount / 1000000).toFixed(1)}M`;
        } else if (amount >= 1000) {
            return `$${(amount / 1000).toFixed(0)}K`;
        } else {
            return `$${amount.toFixed(0)}`;
        }
    }
    
    generateTrendData(days, min, max) {
        const labels = [];
        const values = [];
        
        for (let i = days; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
            
            // Generate trending upward data with some noise
            const trend = min + ((max - min) * (days - i) / days);
            const noise = (Math.random() - 0.5) * (max - min) * 0.1;
            values.push(Math.max(min, Math.min(max, trend + noise)));
        }
        
        return { labels, values };
    }
    
    resizeCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart) {
                chart.resize();
            }
        });
    }
    
    startAutoRefresh() {
        // Refresh data every 15 minutes
        this.updateInterval = setInterval(async () => {
            console.log('🔄 Auto-refreshing data...');
            await this.loadData();
            this.renderRoom(this.currentRoom);
        }, 15 * 60 * 1000);
    }
    
    destroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        
        Object.values(this.charts).forEach(chart => {
            if (chart) {
                chart.destroy();
            }
        });
    }
}

// Initialize the dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.lodge = new LodgeDashboard();
});

// Handle page unload
window.addEventListener('beforeunload', () => {
    if (window.lodge) {
        window.lodge.destroy();
    }
});