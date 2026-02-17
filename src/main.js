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
                
                // Close mobile menu if open
                this.closeMobileMenu();
            });
        });
        
        // Handle window resize for charts and responsive features
        window.addEventListener('resize', () => {
            this.resizeCharts();
            this.handleResponsiveFeatures();
        });
        
        // Setup mobile menu
        this.setupMobileMenu();
        
        // Setup collapsible panels for mobile
        this.setupCollapsiblePanels();
        
        // Setup filter buttons
        this.setupFilterButtons();
        
        // Initial responsive setup
        this.handleResponsiveFeatures();
    }

    setupMobileMenu() {
        // Get mobile menu toggle
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        // Toggle menu on click
        mobileToggle.addEventListener('click', () => {
            this.toggleMobileMenu();
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            const nav = document.querySelector('.room-navigation');
            const toggle = document.querySelector('.mobile-menu-toggle');
            
            if (!nav.contains(e.target) && !toggle.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        const nav = document.querySelector('.room-navigation');
        const toggle = document.querySelector('.mobile-menu-toggle');
        
        nav.classList.toggle('open');
        toggle.classList.toggle('active');
    }

    closeMobileMenu() {
        const nav = document.querySelector('.room-navigation');
        const toggle = document.querySelector('.mobile-menu-toggle');
        
        nav.classList.remove('open');
        toggle.classList.remove('active');
    }

    setupCollapsiblePanels() {
        // Only enable on mobile
        if (window.innerWidth <= 767) {
            document.querySelectorAll('.panel-header').forEach(header => {
                header.addEventListener('click', (e) => {
                    const panel = e.target.closest('.panel');
                    if (panel) {
                        panel.classList.toggle('collapsed');
                    }
                });
            });
        }
    }

    setupFilterButtons() {
        // Alert filters
        document.querySelectorAll('.alert-filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.alert-filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.filterAlerts(e.target.dataset.priority);
            });
        });
        
        // News filters
        document.querySelectorAll('.news-filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.news-filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.filterNews(e.target.dataset.category);
            });
        });
        
        // Calendar navigation
        const prevBtn = document.getElementById('prev-day');
        const nextBtn = document.getElementById('next-day');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.changeCalendarDay(-1));
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.changeCalendarDay(1));
        }
        
        // Log workout button
        const logWorkoutBtn = document.getElementById('log-workout');
        if (logWorkoutBtn) {
            logWorkoutBtn.addEventListener('click', () => this.logWorkout());
        }
        
        // Trend toggles
        document.querySelectorAll('.trend-toggle').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.trend-toggle').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.updateNetWorthChart(e.target.dataset.period);
            });
        });
    }

    handleResponsiveFeatures() {
        const isMobile = window.innerWidth <= 767;
        const isTablet = window.innerWidth >= 768 && window.innerWidth <= 1023;
        
        // Update mobile menu visibility
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileToggle) {
            mobileToggle.style.display = isMobile ? 'flex' : 'none';
        }
        
        // Update navigation position for mobile
        const nav = document.querySelector('.room-navigation');
        if (isMobile) {
            nav.classList.add('mobile');
        } else {
            nav.classList.remove('mobile', 'open');
        }
        
        // Reset collapsed panels on desktop
        if (!isMobile) {
            document.querySelectorAll('.panel').forEach(panel => {
                panel.classList.remove('collapsed');
            });
        }
        
        // Adjust chart sizes
        this.resizeCharts();
    }

    filterAlerts(priority) {
        if (!this.data.alerts?.alerts) return;
        
        let filteredAlerts = this.data.alerts.alerts;
        
        if (priority !== 'all') {
            filteredAlerts = filteredAlerts.filter(alert => alert.priority === priority);
        }
        
        this.renderAlertsFromData(filteredAlerts);
    }

    filterNews(category) {
        if (!this.data.news?.articles) return;
        
        let filteredNews = this.data.news.articles;
        
        if (category !== 'all') {
            filteredNews = filteredNews.filter(article => 
                article.category === category || 
                article.tags?.includes(category)
            );
        }
        
        this.renderNewsFromData(filteredNews);
    }

    renderAlertsFromData(alerts) {
        const alertsEl = document.getElementById('alerts-list');
        if (!alertsEl) return;
        
        let alertsHTML = '';
        
        alerts.slice(0, 6).forEach(alert => {
            const priorityClass = alert.priority || 'medium';
            
            alertsHTML += `
                <div class="alert-item ${priorityClass}">
                    <span class="alert-type">${alert.type}</span>
                    <span class="alert-message">${alert.message}</span>
                </div>
            `;
        });
        
        alertsEl.innerHTML = alertsHTML || '<p class="no-data">No alerts match the filter</p>';
    }

    renderNewsFromData(articles) {
        const newsEl = document.getElementById('news-list');
        if (!newsEl) return;
        
        let newsHTML = '';
        
        articles.slice(0, 5).forEach(article => {
            const publishedDate = new Date(article.published_date).toLocaleDateString();
            
            newsHTML += `
                <div class="news-item">
                    <div class="news-title">${article.title}</div>
                    <div class="news-summary">${article.summary}</div>
                    <div class="news-meta">
                        <span class="news-source">${article.source}</span>
                        <span class="news-date">${publishedDate}</span>
                    </div>
                </div>
            `;
        });
        
        newsEl.innerHTML = newsHTML || '<p class="no-data">No news matches the filter</p>';
    }

    changeCalendarDay(direction) {
        // This would integrate with calendar API to show different days
        console.log(`Calendar day changed by ${direction}`);
        // For now, just update the label
        const currentDateEl = document.getElementById('current-date');
        if (currentDateEl) {
            const today = new Date();
            today.setDate(today.getDate() + direction);
            currentDateEl.textContent = today.toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric' 
            });
        }
    }

    logWorkout() {
        // This would integrate with workout logging system
        alert('Workout logged! (Feature coming soon)');
    }

    updateNetWorthChart(period) {
        // Update chart based on selected time period
        const canvas = document.getElementById('net-worth-chart');
        if (!canvas) return;
        
        // Generate data based on period
        let days;
        switch (period) {
            case '30d': days = 30; break;
            case '90d': days = 90; break;
            case '1y': days = 365; break;
            default: days = 90;
        }
        
        const trendData = this.generateTrendData(days, 3800, 4600);
        
        if (this.charts.netWorth) {
            this.charts.netWorth.data.labels = trendData.labels;
            this.charts.netWorth.data.datasets[0].data = trendData.values;
            this.charts.netWorth.update();
        }
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
            'emails.json',
            'tasks.json',
            'weekly-plan.json',
            'three-week-horizon.json',
            'suggestions.json',
            'streaks.json'
        ];
        
        console.log('📊 Loading data files...');
        
        for (const file of dataFiles) {
            try {
                const response = await fetch(`/the-lodge/data/${file}`);
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
                this.renderTrainingRoom();
                break;
            case 'command':
                this.renderCommand();
                break;
            case 'watchtower':
                this.renderWatchtower();
                break;
            case 'library':
                this.renderLibrary();
                break;
            case 'lounge':
                this.renderLounge();
                break;
            default:
                console.log(`Room ${roomId} not implemented yet`);
        }
    }
    
    renderMainHall() {
        this.updateBriefingGreeting();
        this.updateRoomTimestamp();
        this.renderAgentStatusBar();
        this.renderStreaksAndMomentum();
        this.renderQuickActions();
        this.renderTodaysGamePlan();
        this.renderSmartSuggestions();
        this.renderBriefingCalendar();
        this.renderPriorityEmails();
        this.renderWeather();
        this.renderPipelineCompact();
        this.renderTrainingBrief();
        this.renderAlerts();
        this.renderWeeklyOverview();
        this.renderHorizonView();
        this.renderNewsBrief();
    }
    
    updateBriefingGreeting() {
        const greetingEl = document.getElementById('briefing-greeting');
        if (greetingEl) {
            const now = new Date();
            const hour = now.getHours();
            let greeting = 'Good morning';
            if (hour >= 12 && hour < 17) greeting = 'Good afternoon';
            else if (hour >= 17) greeting = 'Good evening';
            
            const options = { 
                weekday: 'long',
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            const dateStr = now.toLocaleDateString('en-US', options);
            
            greetingEl.innerHTML = `${greeting}, Mason • ${dateStr}`;
        }
    }
    
    updateRoomTimestamp() {
        const timestampEl = document.getElementById('room-timestamp');
        if (timestampEl) {
            const now = new Date();
            timestampEl.textContent = `Last updated: ${now.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
            })}`;
        }
    }

    renderAgentStatusBar() {
        const agentBarEl = document.getElementById('agent-status-bar');
        if (!agentBarEl || !this.data.agents?.agents) return;
        
        let agentHTML = '';
        
        Object.entries(this.data.agents.agents).forEach(([key, agent]) => {
            const statusClass = agent.status === 'online' ? 'online' : 'offline';
            const initials = agent.name.split(' ').map(n => n[0]).join('').toUpperCase();
            const lastReport = agent.last_report ? 
                new Date(agent.last_report.timestamp).toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                }) : 'No reports';
            
            agentHTML += `
                <div class="agent-status-item">
                    <div class="agent-avatar">${initials}</div>
                    <div class="agent-info">
                        <div class="agent-name">${agent.name}</div>
                        <div class="agent-role">${agent.role}</div>
                    </div>
                    <div class="agent-status">
                        <span class="status-badge ${statusClass}">${agent.status}</span>
                        <span class="agent-last-report">${lastReport}</span>
                    </div>
                </div>
            `;
        });
        
        agentBarEl.innerHTML = agentHTML;
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

    renderBankBalances() {
        const balancesEl = document.getElementById('balances-list');
        if (!balancesEl || !this.data.dashboard?.financial_snapshot?.cash_position) return;
        
        const cashPosition = this.data.dashboard.financial_snapshot.cash_position;
        let balancesHTML = '';
        
        Object.entries(cashPosition).forEach(([account, balance]) => {
            if (account !== 'total_liquid') {
                const accountName = account.replace(/_/g, ' ')
                    .replace(/\b\w/g, l => l.toUpperCase());
                
                balancesHTML += `
                    <div class="balance-item">
                        <span class="balance-name">${accountName}</span>
                        <span class="balance-amount">${this.formatCurrency(balance)}</span>
                    </div>
                `;
            }
        });
        
        balancesEl.innerHTML = balancesHTML;
    }

    renderBurnRate() {
        const burnEl = document.getElementById('burn-rate-display');
        if (!burnEl || !this.data.dashboard?.financial_snapshot) return;
        
        const monthlyBurn = this.data.dashboard.financial_snapshot.monthly_burn || 0;
        const dailyChange = this.data.dashboard.financial_snapshot.daily_change || 0;
        const trendClass = dailyChange >= 0 ? 'positive' : 'negative';
        const trendSymbol = dailyChange >= 0 ? '↓' : '↑';
        
        const burnHTML = `
            <span class="burn-rate-amount">${this.formatCurrency(monthlyBurn)}</span>
            <div class="burn-rate-trend">
                <span class="${trendClass}">${trendSymbol} ${this.formatCurrency(Math.abs(dailyChange))} today</span>
            </div>
        `;
        
        burnEl.innerHTML = burnHTML;
    }

    renderRevenue() {
        const revenueEl = document.getElementById('revenue-display');
        if (!revenueEl || !this.data.projects) return;
        
        // Calculate revenue from projects data
        let monthlyRevenue = 0;
        let dealsThisMonth = 0;
        
        if (this.data.projects.pipeline_stats) {
            monthlyRevenue = this.data.projects.pipeline_stats.revenue_this_month || 0;
            dealsThisMonth = this.data.projects.pipeline_stats.deals_closed || 0;
        }
        
        const revenueHTML = `
            <span class="revenue-amount">${this.formatCurrency(monthlyRevenue)}</span>
            <div class="revenue-trend">
                <span class="deals-count">${dealsThisMonth} deals closed</span>
            </div>
        `;
        
        revenueEl.innerHTML = revenueHTML;
    }

    renderAlerts() {
        const alertsEl = document.getElementById('alerts-list');
        if (!alertsEl || !this.data.alerts?.alerts) return;
        
        let alertsHTML = '';
        
        this.data.alerts.alerts.slice(0, 6).forEach(alert => {
            const priorityClass = alert.priority || 'medium';
            
            alertsHTML += `
                <div class="alert-item ${priorityClass}">
                    <span class="alert-type">${alert.type}</span>
                    <span class="alert-message">${alert.message}</span>
                </div>
            `;
        });
        
        alertsEl.innerHTML = alertsHTML || '<p class="no-data">No alerts</p>';
        
        // Update queue count
        const queueCountEl = document.getElementById('queue-count');
        if (queueCountEl) {
            queueCountEl.textContent = this.data.alerts?.alerts?.length || 0;
        }
    }

    renderCalendar() {
        const calendarEl = document.getElementById('calendar-content');
        if (!calendarEl || !this.data.calendar) return;
        
        let calendarHTML = '<div class="today-events">';
        
        // Today's events
        if (this.data.calendar.today_events) {
            this.data.calendar.today_events.slice(0, 4).forEach(event => {
                const eventTime = new Date(event.start).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                });
                
                calendarHTML += `
                    <div class="event-item">
                        <div class="event-time">${eventTime}</div>
                        <div class="event-title">${event.title}</div>
                        ${event.location ? `<div class="event-location">${event.location}</div>` : ''}
                    </div>
                `;
            });
        }
        
        calendarHTML += '</div>';
        
        // Week preview
        if (this.data.calendar.week_preview) {
            calendarHTML += `
                <div class="week-preview">
                    <h4>This Week</h4>
                    <div class="week-days">
            `;
            
            this.data.calendar.week_preview.forEach(day => {
                calendarHTML += `
                    <div class="week-day">
                        <span class="week-day-name">${day.day}</span>
                        <span class="week-day-count">${day.event_count} events</span>
                    </div>
                `;
            });
            
            calendarHTML += '</div></div>';
        }
        
        calendarEl.innerHTML = calendarHTML;
    }

    renderEmails() {
        const emailsEl = document.getElementById('emails-list');
        if (!emailsEl || !this.data.emails?.priority_inbox) return;
        
        let emailsHTML = '';
        
        this.data.emails.priority_inbox.slice(0, 5).forEach(email => {
            const emailTime = new Date(email.received).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
            const priorityClass = email.priority === 'high' ? 'high' : '';
            const unreadClass = !email.read ? 'unread' : '';
            
            emailsHTML += `
                <div class="email-item ${priorityClass} ${unreadClass}">
                    <div class="email-header">
                        <span class="email-sender">${email.from}</span>
                        <span class="email-time">${emailTime}</span>
                    </div>
                    <div class="email-subject">${email.subject}</div>
                    <div class="email-preview">${email.preview}</div>
                </div>
            `;
        });
        
        emailsEl.innerHTML = emailsHTML;
        
        // Update unread count
        const unreadCountEl = document.getElementById('unread-count');
        if (unreadCountEl) {
            const unreadCount = this.data.emails.integration_status?.unread_count || 0;
            unreadCountEl.textContent = unreadCount;
        }
    }

    renderPipelineSnapshot() {
        const pipelineEl = document.getElementById('pipeline-stats');
        if (!pipelineEl || !this.data.projects) return;
        
        const projects = this.data.projects;
        let pipelineHTML = '';
        
        // Stats grid
        pipelineHTML += `
            <div class="pipeline-stats">
                <div class="pipeline-stat">
                    <span class="pipeline-stat-value">${projects.lead_counts?.total || 0}</span>
                    <span class="pipeline-stat-label">Total Leads</span>
                </div>
                <div class="pipeline-stat">
                    <span class="pipeline-stat-value">${projects.lead_counts?.hot || 0}</span>
                    <span class="pipeline-stat-label">Hot Leads</span>
                </div>
                <div class="pipeline-stat">
                    <span class="pipeline-stat-value">${projects.active_projects?.length || 0}</span>
                    <span class="pipeline-stat-label">Active Deals</span>
                </div>
                <div class="pipeline-stat">
                    <span class="pipeline-stat-value">${projects.pipeline_stats?.conversion_rate || '0%'}</span>
                    <span class="pipeline-stat-label">Conversion</span>
                </div>
            </div>
        `;
        
        // Campaign status
        if (projects.campaigns) {
            pipelineHTML += '<div class="campaign-status">';
            
            Object.entries(projects.campaigns).forEach(([name, campaign]) => {
                const statusClass = campaign.status === 'active' ? 'active' : 'paused';
                pipelineHTML += `
                    <div class="campaign-item">
                        <span class="campaign-name">${name}</span>
                        <span class="campaign-status-badge ${statusClass}">${campaign.status}</span>
                    </div>
                `;
            });
            
            pipelineHTML += '</div>';
        }
        
        pipelineEl.innerHTML = pipelineHTML;
    }

    renderTraining() {
        const trainingEl = document.getElementById('training-display');
        if (!trainingEl || !this.data.training) return;
        
        let trainingHTML = '';
        
        if (this.data.training.todays_workout) {
            const workout = this.data.training.todays_workout;
            
            trainingHTML = `
                <div class="workout-today">
                    <div class="workout-type">${workout.type || 'Rest Day'}</div>
                    <div class="workout-details">
                        <div class="workout-detail">
                            <span class="workout-detail-label">Duration</span>
                            <span class="workout-detail-value">${workout.duration || 'N/A'}</span>
                        </div>
                        <div class="workout-detail">
                            <span class="workout-detail-label">Intensity</span>
                            <span class="workout-detail-value">${workout.intensity || 'N/A'}</span>
                        </div>
                    </div>
                    <div class="workout-description">${workout.description || 'No description available'}</div>
                </div>
            `;
        } else {
            trainingHTML = '<div class="workout-today"><div class="workout-type">Rest Day</div></div>';
        }
        
        trainingEl.innerHTML = trainingHTML;
    }

    renderWeather() {
        const weatherEl = document.getElementById('weather-display');
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

    renderNews() {
        const newsEl = document.getElementById('news-list');
        if (!newsEl || !this.data.news?.articles) return;
        
        let newsHTML = '';
        
        this.data.news.articles.slice(0, 5).forEach(article => {
            const publishedDate = new Date(article.published_date).toLocaleDateString();
            
            newsHTML += `
                <div class="news-item">
                    <div class="news-title">${article.title}</div>
                    <div class="news-summary">${article.summary}</div>
                    <div class="news-meta">
                        <span class="news-source">${article.source}</span>
                        <span class="news-date">${publishedDate}</span>
                    </div>
                </div>
            `;
        });
        
        newsEl.innerHTML = newsHTML || '<p class="no-data">No news available</p>';
    }

    renderCommand() {
        this.updateCommandTimestamp();
        this.renderEmailsFull();
        this.renderCalendarFull();
        this.renderNotifications();
    }

    updateCommandTimestamp() {
        const timestampEl = document.getElementById('command-timestamp');
        if (timestampEl) {
            const now = new Date();
            timestampEl.textContent = `Last updated: ${now.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
            })}`;
        }
    }

    renderEmailsFull() {
        const emailsEl = document.getElementById('emails-full-list');
        if (!emailsEl || !this.data.emails?.priority_inbox) return;
        
        let emailsHTML = '';
        
        this.data.emails.priority_inbox.forEach(email => {
            const emailTime = new Date(email.received).toLocaleString();
            const priorityClass = email.priority === 'high' ? 'high' : '';
            const unreadClass = !email.read ? 'unread' : '';
            
            emailsHTML += `
                <div class="email-item ${priorityClass} ${unreadClass}">
                    <div class="email-header">
                        <span class="email-sender">${email.from}</span>
                        <span class="email-time">${emailTime}</span>
                    </div>
                    <div class="email-subject">${email.subject}</div>
                    <div class="email-preview">${email.preview}</div>
                    <div class="email-actions">
                        <button class="email-action-btn">Reply</button>
                        <button class="email-action-btn">Archive</button>
                    </div>
                </div>
            `;
        });
        
        emailsEl.innerHTML = emailsHTML;
        
        // Update email stats
        const emailStatsEl = document.getElementById('email-stats');
        if (emailStatsEl) {
            const unreadCount = this.data.emails.integration_status?.unread_count || 0;
            emailStatsEl.textContent = `${unreadCount} unread`;
        }
    }

    renderCalendarFull() {
        const calendarEl = document.getElementById('calendar-full-view');
        if (!calendarEl || !this.data.calendar) return;
        
        let calendarHTML = '';
        
        // Show all today's events with more detail
        if (this.data.calendar.today_events) {
            calendarHTML += '<div class="calendar-day-view"><h4>Today\'s Schedule</h4>';
            
            this.data.calendar.today_events.forEach(event => {
                const eventTime = new Date(event.start).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                });
                const endTime = new Date(event.end).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                });
                
                calendarHTML += `
                    <div class="calendar-event-full">
                        <div class="event-time-full">${eventTime} - ${endTime}</div>
                        <div class="event-title-full">${event.title}</div>
                        ${event.description ? `<div class="event-description">${event.description}</div>` : ''}
                        ${event.location ? `<div class="event-location">${event.location}</div>` : ''}
                        ${event.attendees ? `<div class="event-attendees">With: ${event.attendees.join(', ')}</div>` : ''}
                    </div>
                `;
            });
            
            calendarHTML += '</div>';
        }
        
        // Show upcoming deadlines
        if (this.data.calendar.upcoming_deadlines) {
            calendarHTML += '<div class="calendar-deadlines"><h4>Upcoming Deadlines</h4>';
            
            this.data.calendar.upcoming_deadlines.forEach(deadline => {
                const dueDate = new Date(deadline.due_date).toLocaleDateString();
                const priorityClass = deadline.priority === 'high' ? 'high' : deadline.priority;
                
                calendarHTML += `
                    <div class="deadline-item ${priorityClass}">
                        <div class="deadline-title">${deadline.title}</div>
                        <div class="deadline-due">Due: ${dueDate} (${deadline.days_remaining} days)</div>
                        <div class="deadline-category">${deadline.category.replace(/_/g, ' ')}</div>
                    </div>
                `;
            });
            
            calendarHTML += '</div>';
        }
        
        calendarEl.innerHTML = calendarHTML;
    }

    renderNotifications() {
        const notificationsEl = document.getElementById('notifications-list');
        if (!notificationsEl) return;
        
        // Combine alerts and other notifications
        let notifications = [];
        
        if (this.data.alerts?.alerts) {
            notifications = notifications.concat(
                this.data.alerts.alerts.map(alert => ({
                    ...alert,
                    source: 'System Alert',
                    timestamp: new Date().toISOString()
                }))
            );
        }
        
        // Add some sample notifications from other sources
        notifications.push(
            {
                type: 'email',
                message: 'New high priority email received',
                source: 'Gmail',
                timestamp: new Date(Date.now() - 300000).toISOString(),
                priority: 'high'
            },
            {
                type: 'calendar',
                message: 'Upcoming meeting in 30 minutes',
                source: 'Calendar',
                timestamp: new Date(Date.now() - 600000).toISOString(),
                priority: 'medium'
            }
        );
        
        // Sort by timestamp, newest first
        notifications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        let notificationsHTML = '';
        
        notifications.slice(0, 10).forEach(notification => {
            const time = new Date(notification.timestamp).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
            const priorityClass = notification.priority || 'medium';
            
            notificationsHTML += `
                <div class="notification-item ${priorityClass}">
                    <div class="notification-header">
                        <span class="notification-source">${notification.source}</span>
                        <span class="notification-time">${time}</span>
                    </div>
                    <div class="notification-message">${notification.message}</div>
                </div>
            `;
        });
        
        notificationsEl.innerHTML = notificationsHTML || '<p class="no-data">No notifications</p>';
    }

    renderWatchtower() {
        this.updateWatchtowerTimestamp();
        this.renderCriticalAlerts();
        this.renderSystemStatus();
        this.renderContacts();
        this.renderGoals();
    }

    updateWatchtowerTimestamp() {
        const timestampEl = document.getElementById('watchtower-timestamp');
        if (timestampEl) {
            const now = new Date();
            timestampEl.textContent = `Last updated: ${now.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
            })}`;
        }
    }

    renderCriticalAlerts() {
        const alertsEl = document.getElementById('critical-alerts-list');
        if (!alertsEl || !this.data.alerts?.alerts) return;
        
        const criticalAlerts = this.data.alerts.alerts.filter(alert => 
            alert.priority === 'urgent' || alert.priority === 'high'
        );
        
        let alertsHTML = '';
        
        criticalAlerts.forEach(alert => {
            const priorityClass = alert.priority || 'medium';
            
            alertsHTML += `
                <div class="critical-alert-item ${priorityClass}">
                    <div class="alert-header">
                        <span class="alert-type">${alert.type}</span>
                        <span class="alert-priority">${alert.priority.toUpperCase()}</span>
                    </div>
                    <div class="alert-message">${alert.message}</div>
                    <div class="alert-actions">
                        <button class="alert-action-btn">Acknowledge</button>
                        <button class="alert-action-btn">Dismiss</button>
                    </div>
                </div>
            `;
        });
        
        alertsEl.innerHTML = alertsHTML || '<p class="no-data">No critical alerts</p>';
        
        // Update count
        const countEl = document.getElementById('critical-alert-count');
        if (countEl) {
            countEl.textContent = criticalAlerts.length;
        }
    }

    renderSystemStatus() {
        const statusEl = document.getElementById('system-status-grid');
        if (!statusEl || !this.data.agents) return;
        
        const agents = this.data.agents.agents;
        const summary = this.data.agents.summary || {};
        
        let statusHTML = `
            <div class="system-stat">
                <div class="system-stat-value">${summary.active_agents || 0}/${Object.keys(agents).length}</div>
                <div class="system-stat-label">Agents Online</div>
                <div class="system-stat-status ${summary.active_agents === Object.keys(agents).length ? 'good' : 'warning'}">
                    ${summary.active_agents === Object.keys(agents).length ? '✓ All Systems Operational' : '⚠ Some Systems Down'}
                </div>
            </div>
            <div class="system-stat">
                <div class="system-stat-value">${summary.reports_last_24h || 0}</div>
                <div class="system-stat-label">Reports (24h)</div>
                <div class="system-stat-trend">+${Math.floor((summary.reports_last_24h || 0) * 0.15)} from yesterday</div>
            </div>
            <div class="system-stat">
                <div class="system-stat-value">${summary.high_priority_alerts || 0}</div>
                <div class="system-stat-label">High Priority Alerts</div>
                <div class="system-stat-status ${summary.high_priority_alerts === 0 ? 'good' : 'alert'}">
                    ${summary.high_priority_alerts === 0 ? '✓ No Issues' : `${summary.high_priority_alerts} Need Attention`}
                </div>
            </div>
        `;
        
        statusEl.innerHTML = statusHTML;
    }

    renderContacts() {
        const contactsEl = document.getElementById('contacts-list');
        if (!contactsEl) return;
        
        // Sample contacts data (would come from CRM/contacts API)
        const contacts = [
            {
                name: 'John Martinez',
                role: 'Motivated Seller',
                phone: '+1-555-0123',
                lastContact: '2024-02-15',
                priority: 'high',
                notes: 'Interested in 456 Pine Street property'
            },
            {
                name: 'Sarah Johnson',
                role: 'Real Estate Agent',
                phone: '+1-555-0456',
                lastContact: '2024-02-10',
                priority: 'medium',
                notes: 'Referral partner - DFW area'
            },
            {
                name: 'Mike Thompson',
                role: 'Contractor',
                phone: '+1-555-0789',
                lastContact: '2024-02-08',
                priority: 'medium',
                notes: 'Preferred contractor for renovations'
            }
        ];
        
        let contactsHTML = '';
        
        contacts.forEach(contact => {
            const lastContactDate = new Date(contact.lastContact).toLocaleDateString();
            const daysSince = Math.floor((new Date() - new Date(contact.lastContact)) / (1000 * 60 * 60 * 24));
            const priorityClass = contact.priority;
            
            contactsHTML += `
                <div class="contact-item ${priorityClass}">
                    <div class="contact-header">
                        <div class="contact-name">${contact.name}</div>
                        <div class="contact-role">${contact.role}</div>
                    </div>
                    <div class="contact-details">
                        <div class="contact-phone">${contact.phone}</div>
                        <div class="contact-last">Last contact: ${lastContactDate} (${daysSince} days ago)</div>
                    </div>
                    <div class="contact-notes">${contact.notes}</div>
                    <div class="contact-actions">
                        <button class="contact-action-btn">Call</button>
                        <button class="contact-action-btn">Text</button>
                        <button class="contact-action-btn">Email</button>
                    </div>
                </div>
            `;
        });
        
        contactsEl.innerHTML = contactsHTML;
    }

    renderGoals() {
        const goalsEl = document.getElementById('goals-list');
        if (!goalsEl || !this.data.goals?.goals) return;
        
        let goalsHTML = '';
        let totalProgress = 0;
        
        this.data.goals.goals.forEach(goal => {
            const progress = goal.progress || 0;
            totalProgress += progress;
            const statusClass = progress >= 80 ? 'good' : progress >= 50 ? 'warning' : 'behind';
            
            goalsHTML += `
                <div class="goal-item ${statusClass}">
                    <div class="goal-header">
                        <div class="goal-title">${goal.title}</div>
                        <div class="goal-progress">${progress}%</div>
                    </div>
                    <div class="goal-progress-bar">
                        <div class="goal-progress-fill" style="width: ${progress}%"></div>
                    </div>
                    <div class="goal-details">
                        <div class="goal-category">${goal.category}</div>
                        <div class="goal-deadline">Due: ${new Date(goal.deadline).toLocaleDateString()}</div>
                    </div>
                    <div class="goal-description">${goal.description}</div>
                </div>
            `;
        });
        
        goalsEl.innerHTML = goalsHTML;
        
        // Update overall progress
        const progressEl = document.getElementById('goals-progress');
        if (progressEl && this.data.goals?.goals?.length) {
            const avgProgress = Math.round(totalProgress / this.data.goals.goals.length);
            progressEl.textContent = `${avgProgress}% Complete`;
        }
    }

    renderLibrary() {
        this.renderDocuments();
        this.renderRecentDocs();
    }

    renderDocuments() {
        const documentsEl = document.getElementById('documents-list');
        if (!documentsEl) return;
        
        // Sample documents (would come from document management system)
        const documents = [
            {
                name: 'Land Purchase Agreement Template',
                type: 'contracts',
                size: '2.3 MB',
                modified: '2024-02-15',
                description: 'Standard template for land acquisitions'
            },
            {
                name: 'Wholesaling Playbook 2024',
                type: 'playbooks',
                size: '5.7 MB',
                modified: '2024-02-10',
                description: 'Complete guide to land wholesaling strategies'
            },
            {
                name: 'Market Analysis - Kaufman County',
                type: 'reports',
                size: '1.8 MB',
                modified: '2024-02-08',
                description: 'Detailed market analysis and trends'
            },
            {
                name: 'Due Diligence Checklist',
                type: 'playbooks',
                size: '0.8 MB',
                modified: '2024-02-05',
                description: 'Property evaluation checklist'
            }
        ];
        
        let documentsHTML = '';
        
        documents.forEach(doc => {
            const modifiedDate = new Date(doc.modified).toLocaleDateString();
            
            documentsHTML += `
                <div class="document-item" data-type="${doc.type}">
                    <div class="document-icon">📄</div>
                    <div class="document-info">
                        <div class="document-name">${doc.name}</div>
                        <div class="document-description">${doc.description}</div>
                        <div class="document-meta">
                            <span class="document-size">${doc.size}</span>
                            <span class="document-modified">Modified: ${modifiedDate}</span>
                            <span class="document-type">${doc.type}</span>
                        </div>
                    </div>
                    <div class="document-actions">
                        <button class="doc-action-btn">View</button>
                        <button class="doc-action-btn">Download</button>
                        <button class="doc-action-btn">Share</button>
                    </div>
                </div>
            `;
        });
        
        documentsEl.innerHTML = documentsHTML;
    }

    renderRecentDocs() {
        const recentEl = document.getElementById('recent-docs-list');
        if (!recentEl) return;
        
        const recentDocs = [
            'Wholesaling Playbook 2024',
            'Market Analysis - Kaufman County',
            'Land Purchase Agreement Template',
            'Due Diligence Checklist'
        ];
        
        let recentHTML = '';
        
        recentDocs.forEach(doc => {
            recentHTML += `
                <div class="recent-doc-item">
                    <div class="recent-doc-icon">📄</div>
                    <div class="recent-doc-name">${doc}</div>
                    <div class="recent-doc-time">2 hours ago</div>
                </div>
            `;
        });
        
        recentEl.innerHTML = recentHTML;
    }

    renderLounge() {
        this.setupFocusTimer();
        this.renderMusicControls();
        this.renderDeepWorkStats();
    }

    setupFocusTimer() {
        let timerInterval;
        let currentMinutes = 25;
        let currentSeconds = 0;
        let isRunning = false;
        
        const timerTimeEl = document.getElementById('timer-time');
        const timerStatusEl = document.getElementById('timer-status');
        const startBtn = document.getElementById('start-timer');
        const pauseBtn = document.getElementById('pause-timer');
        const resetBtn = document.getElementById('reset-timer');
        
        const updateDisplay = () => {
            const mins = String(currentMinutes).padStart(2, '0');
            const secs = String(currentSeconds).padStart(2, '0');
            if (timerTimeEl) {
                timerTimeEl.textContent = `${mins}:${secs}`;
            }
        };
        
        const startTimer = () => {
            if (isRunning) return;
            isRunning = true;
            if (timerStatusEl) timerStatusEl.textContent = 'Focus session active';
            
            timerInterval = setInterval(() => {
                if (currentSeconds === 0) {
                    if (currentMinutes === 0) {
                        // Timer finished
                        clearInterval(timerInterval);
                        isRunning = false;
                        if (timerStatusEl) timerStatusEl.textContent = 'Focus session complete!';
                        alert('Focus session complete! Take a break.');
                        return;
                    }
                    currentMinutes--;
                    currentSeconds = 59;
                } else {
                    currentSeconds--;
                }
                updateDisplay();
            }, 1000);
        };
        
        const pauseTimer = () => {
            if (!isRunning) return;
            clearInterval(timerInterval);
            isRunning = false;
            if (timerStatusEl) timerStatusEl.textContent = 'Paused';
        };
        
        const resetTimer = () => {
            clearInterval(timerInterval);
            isRunning = false;
            currentMinutes = 25;
            currentSeconds = 0;
            if (timerStatusEl) timerStatusEl.textContent = 'Ready to focus';
            updateDisplay();
        };
        
        if (startBtn) startBtn.addEventListener('click', startTimer);
        if (pauseBtn) pauseBtn.addEventListener('click', pauseTimer);
        if (resetBtn) resetBtn.addEventListener('click', resetTimer);
        
        // Timer preset buttons
        document.querySelectorAll('.timer-preset').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const minutes = parseInt(e.target.dataset.minutes);
                resetTimer();
                currentMinutes = minutes;
                updateDisplay();
            });
        });
        
        updateDisplay();
    }

    renderMusicControls() {
        const playBtn = document.getElementById('play-music');
        const stopBtn = document.getElementById('stop-music');
        const volumeSlider = document.getElementById('volume-slider');
        
        if (playBtn) {
            playBtn.addEventListener('click', () => {
                alert('Music playback would start here (Spotify/Apple Music integration)');
            });
        }
        
        if (stopBtn) {
            stopBtn.addEventListener('click', () => {
                alert('Music playback would stop here');
            });
        }
        
        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                console.log(`Volume set to ${e.target.value}%`);
            });
        }
    }

    renderDeepWorkStats() {
        const statsEl = document.getElementById('deep-work-stats');
        if (!statsEl) return;
        
        // Sample deep work data
        const stats = {
            today: '2.5h',
            thisWeek: '18.5h',
            thisMonth: '67h'
        };
        
        const statsHTML = `
            <div class="stat-item">
                <span class="stat-value">${stats.today}</span>
                <span class="stat-label">Today</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${stats.thisWeek}</span>
                <span class="stat-label">This Week</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${stats.thisMonth}</span>
                <span class="stat-label">This Month</span>
            </div>
        `;
        
        statsEl.innerHTML = statsHTML;
    }

    renderTrainingRoom() {
        this.renderWorkout();
        this.renderTrainingPlan();
        this.renderProgressCharts();
        this.renderRecoveryMetrics();
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
        this.renderCashFlowRunway();
        this.renderBudgetTracking();
        this.renderDealFinancingCalc();
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
    
    renderCashFlowRunway() {
        const canvas = document.getElementById('runway-chart');
        if (!canvas || !this.data.treasury) return;
        
        // Destroy existing chart
        if (this.charts.runway) {
            this.charts.runway.destroy();
        }
        
        const ctx = canvas.getContext('2d');
        
        // Calculate runway data
        const currentCash = Object.values(this.data.treasury.account_balances)
            .reduce((sum, account) => sum + account.balance, 0);
        const monthlyBurn = this.data.treasury.cash_flow_30_days?.projected_monthly_burn || 847;
        
        // Project next 12 months
        const labels = [];
        const values = [];
        let runningCash = currentCash;
        
        for (let i = 0; i < 12; i++) {
            const date = new Date();
            date.setMonth(date.getMonth() + i);
            labels.push(date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }));
            
            values.push(Math.max(0, runningCash));
            runningCash -= monthlyBurn;
        }
        
        this.charts.runway = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Cash Runway',
                    data: values,
                    borderColor: '#32CD32',
                    backgroundColor: 'rgba(50, 205, 50, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
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
                        ticks: { 
                            color: '#D4AF37',
                            callback: function(value) {
                                return '$' + (value/1000).toFixed(1) + 'K';
                            }
                        }
                    },
                    x: {
                        grid: { color: 'rgba(212, 175, 55, 0.2)' },
                        ticks: { color: '#D4AF37' }
                    }
                }
            }
        });
        
        // Update runway months display
        const runwayMonths = Math.floor(currentCash / monthlyBurn);
        const runwayEl = document.getElementById('runway-months');
        if (runwayEl) {
            runwayEl.textContent = runwayMonths + (runwayMonths === 1 ? ' month' : ' months');
            
            // Color code based on runway
            if (runwayMonths < 3) {
                runwayEl.style.color = '#FF4444';
            } else if (runwayMonths < 6) {
                runwayEl.style.color = '#FFA500';
            } else {
                runwayEl.style.color = '#32CD32';
            }
        }
    }
    
    renderBudgetTracking() {
        const container = document.getElementById('budget-tracking');
        if (!container || !this.data.treasury?.budget_tracking) return;
        
        const currentMonth = Object.keys(this.data.treasury.budget_tracking)[0];
        const budget = this.data.treasury.budget_tracking[currentMonth];
        
        let budgetHTML = '<div class="budget-items">';
        
        Object.entries(budget).forEach(([category, data]) => {
            const categoryName = category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            const percentUsed = data.percentage;
            const statusClass = percentUsed > 100 ? 'over-budget' : percentUsed > 80 ? 'warning' : 'on-track';
            
            budgetHTML += `
                <div class="budget-item ${statusClass}">
                    <div class="budget-header">
                        <span class="budget-category">${categoryName}</span>
                        <span class="budget-percentage">${percentUsed}%</span>
                    </div>
                    <div class="budget-bar">
                        <div class="budget-progress" style="width: ${Math.min(percentUsed, 100)}%"></div>
                    </div>
                    <div class="budget-details">
                        <span>${this.formatCurrency(data.actual)} / ${this.formatCurrency(data.budgeted)}</span>
                        <span class="remaining ${data.remaining < 0 ? 'negative' : 'positive'}">
                            ${data.remaining < 0 ? 'Over by' : 'Remaining'}: ${this.formatCurrency(Math.abs(data.remaining))}
                        </span>
                    </div>
                </div>
            `;
        });
        
        budgetHTML += '</div>';
        container.innerHTML = budgetHTML;
    }
    
    renderDealFinancingCalc() {
        const container = document.getElementById('deal-financing');
        if (!container || !this.data.treasury?.deal_financing) return;
        
        const rates = this.data.treasury.deal_financing.current_rates;
        const buyerCapacity = this.data.treasury.deal_financing.buyer_capacity;
        
        const financingHTML = `
            <div class="financing-rates">
                <div class="rate-item">
                    <span class="rate-label">Hard Money</span>
                    <span class="rate-value">${(rates.hard_money * 100).toFixed(1)}%</span>
                </div>
                <div class="rate-item">
                    <span class="rate-label">Private Lending</span>
                    <span class="rate-value">${(rates.private_lending * 100).toFixed(1)}%</span>
                </div>
                <div class="rate-item">
                    <span class="rate-label">Conventional</span>
                    <span class="rate-value">${(rates.conventional * 100).toFixed(1)}%</span>
                </div>
            </div>
            
            <div class="buyer-capacity">
                <div class="capacity-metric">
                    <span class="metric-label">Median Buyer Max</span>
                    <span class="metric-value">${this.formatCurrency(buyerCapacity.at_current_rates.median_buyer_max)}</span>
                </div>
                <div class="capacity-metric">
                    <span class="metric-label">Cash Buyers</span>
                    <span class="metric-value">${(buyerCapacity.at_current_rates.cash_buyer_percentage * 100).toFixed(0)}%</span>
                </div>
            </div>
            
            <div class="financing-impact">
                <h4>Rate Impact on $300K Property:</h4>
                <div class="payment-scenarios">
                    <div class="scenario">
                        <span>Hard Money (${(rates.hard_money * 100).toFixed(1)}%)</span>
                        <span>$${this.calculateMonthlyPayment(300000, rates.hard_money).toLocaleString()}/mo</span>
                    </div>
                    <div class="scenario">
                        <span>Private (${(rates.private_lending * 100).toFixed(1)}%)</span>
                        <span>$${this.calculateMonthlyPayment(300000, rates.private_lending).toLocaleString()}/mo</span>
                    </div>
                    <div class="scenario">
                        <span>Conventional (${(rates.conventional * 100).toFixed(1)}%)</span>
                        <span>$${this.calculateMonthlyPayment(300000, rates.conventional).toLocaleString()}/mo</span>
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML = financingHTML;
    }
    
    calculateMonthlyPayment(principal, annualRate, years = 30) {
        const monthlyRate = annualRate / 12;
        const numPayments = years * 12;
        
        if (monthlyRate === 0) return principal / numPayments;
        
        return (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
               (Math.pow(1 + monthlyRate, numPayments) - 1);
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