(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))e(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&e(n)}).observe(document,{childList:!0,subtree:!0});function t(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function e(a){if(a.ep)return;a.ep=!0;const i=t(a);fetch(a.href,i)}})();class y{constructor(){this.currentRoom="main-hall",this.data={},this.charts={},this.updateInterval=null,this.init()}async init(){console.log("🏰 Initializing The Lodge Dashboard..."),this.setupEventListeners(),await this.loadData(),this.renderRoom(this.currentRoom),this.startAutoRefresh(),console.log("✅ The Lodge is ready!")}setupEventListeners(){document.querySelectorAll(".room-tab").forEach(s=>{s.addEventListener("click",t=>{const e=t.currentTarget.dataset.room;this.switchRoom(e),this.closeMobileMenu()})}),window.addEventListener("resize",()=>{this.resizeCharts(),this.handleResponsiveFeatures()}),this.setupMobileMenu(),this.setupCollapsiblePanels(),this.setupFilterButtons(),this.handleResponsiveFeatures()}setupMobileMenu(){document.querySelector(".mobile-menu-toggle").addEventListener("click",()=>{this.toggleMobileMenu()}),document.addEventListener("click",t=>{const e=document.querySelector(".room-navigation"),a=document.querySelector(".mobile-menu-toggle");!e.contains(t.target)&&!a.contains(t.target)&&this.closeMobileMenu()})}toggleMobileMenu(){const s=document.querySelector(".room-navigation"),t=document.querySelector(".mobile-menu-toggle");s.classList.toggle("open"),t.classList.toggle("active")}closeMobileMenu(){const s=document.querySelector(".room-navigation"),t=document.querySelector(".mobile-menu-toggle");s.classList.remove("open"),t.classList.remove("active")}setupCollapsiblePanels(){window.innerWidth<=767&&document.querySelectorAll(".panel-header").forEach(s=>{s.addEventListener("click",t=>{const e=t.target.closest(".panel");e&&e.classList.toggle("collapsed")})})}setupFilterButtons(){document.querySelectorAll(".alert-filter-btn").forEach(a=>{a.addEventListener("click",i=>{document.querySelectorAll(".alert-filter-btn").forEach(n=>n.classList.remove("active")),i.target.classList.add("active"),this.filterAlerts(i.target.dataset.priority)})}),document.querySelectorAll(".news-filter-btn").forEach(a=>{a.addEventListener("click",i=>{document.querySelectorAll(".news-filter-btn").forEach(n=>n.classList.remove("active")),i.target.classList.add("active"),this.filterNews(i.target.dataset.category)})});const s=document.getElementById("prev-day"),t=document.getElementById("next-day");s&&s.addEventListener("click",()=>this.changeCalendarDay(-1)),t&&t.addEventListener("click",()=>this.changeCalendarDay(1));const e=document.getElementById("log-workout");e&&e.addEventListener("click",()=>this.logWorkout()),document.querySelectorAll(".trend-toggle").forEach(a=>{a.addEventListener("click",i=>{document.querySelectorAll(".trend-toggle").forEach(n=>n.classList.remove("active")),i.target.classList.add("active"),this.updateNetWorthChart(i.target.dataset.period)})})}handleResponsiveFeatures(){const s=window.innerWidth<=767,t=document.querySelector(".mobile-menu-toggle");t&&(t.style.display=s?"flex":"none");const e=document.querySelector(".room-navigation");s?e.classList.add("mobile"):e.classList.remove("mobile","open"),s||document.querySelectorAll(".panel").forEach(a=>{a.classList.remove("collapsed")}),this.resizeCharts()}filterAlerts(s){if(!this.data.alerts?.alerts)return;let t=this.data.alerts.alerts;s!=="all"&&(t=t.filter(e=>e.priority===s)),this.renderAlertsFromData(t)}filterNews(s){if(!this.data.news?.articles)return;let t=this.data.news.articles;s!=="all"&&(t=t.filter(e=>e.category===s||e.tags?.includes(s))),this.renderNewsFromData(t)}renderAlertsFromData(s){const t=document.getElementById("alerts-list");if(!t)return;let e="";s.slice(0,6).forEach(a=>{const i=a.priority||"medium";e+=`
                <div class="alert-item ${i}">
                    <span class="alert-type">${a.type}</span>
                    <span class="alert-message">${a.message}</span>
                </div>
            `}),t.innerHTML=e||'<p class="no-data">No alerts match the filter</p>'}renderNewsFromData(s){const t=document.getElementById("news-list");if(!t)return;let e="";s.slice(0,5).forEach(a=>{const i=new Date(a.published_date).toLocaleDateString();e+=`
                <div class="news-item">
                    <div class="news-title">${a.title}</div>
                    <div class="news-summary">${a.summary}</div>
                    <div class="news-meta">
                        <span class="news-source">${a.source}</span>
                        <span class="news-date">${i}</span>
                    </div>
                </div>
            `}),t.innerHTML=e||'<p class="no-data">No news matches the filter</p>'}changeCalendarDay(s){console.log(`Calendar day changed by ${s}`);const t=document.getElementById("current-date");if(t){const e=new Date;e.setDate(e.getDate()+s),t.textContent=e.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}}logWorkout(){alert("Workout logged! (Feature coming soon)")}updateNetWorthChart(s){if(!document.getElementById("net-worth-chart"))return;let e;switch(s){case"30d":e=30;break;case"90d":e=90;break;case"1y":e=365;break;default:e=90}const a=this.generateTrendData(e,3800,4600);this.charts.netWorth&&(this.charts.netWorth.data.labels=a.labels,this.charts.netWorth.data.datasets[0].data=a.values,this.charts.netWorth.update())}async loadData(){const s=["dashboard.json","agents.json","treasury.json","projects.json","training.json","markets.json","news.json","calendar.json","alerts.json","changelog.json","goals.json","emails.json"];console.log("📊 Loading data files...");for(const t of s)try{const e=await fetch(`/data/${t}`);if(e.ok){const a=t.replace(".json","");this.data[a]=await e.json(),console.log(`✅ Loaded ${t}`)}else console.warn(`⚠️ Failed to load ${t}: ${e.status}`)}catch(e){console.error(`❌ Error loading ${t}:`,e)}this.updateHeaderStats()}updateHeaderStats(){if(this.data.dashboard){const s=new Date(this.data.dashboard.last_updated);document.getElementById("last-updated").textContent=s.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})}if(this.data.treasury){const s=this.data.treasury.account_balances;let t=0;Object.values(s).forEach(e=>{t+=e.balance||0}),document.getElementById("net-worth").textContent=this.formatCurrency(t)}}switchRoom(s){document.querySelectorAll(".room-tab").forEach(t=>{t.classList.remove("active")}),document.querySelector(`[data-room="${s}"]`).classList.add("active"),document.querySelectorAll(".room").forEach(t=>{t.classList.remove("active")}),document.getElementById(s).classList.add("active"),this.currentRoom=s,this.renderRoom(s)}renderRoom(s){switch(console.log(`🏛️ Rendering room: ${s}`),s){case"main-hall":this.renderMainHall();break;case"war-room":this.renderWarRoom();break;case"treasury":this.renderTreasury();break;case"barracks":this.renderBarracks();break;case"training":this.renderTrainingRoom();break;case"command":this.renderCommand();break;case"watchtower":this.renderWatchtower();break;case"library":this.renderLibrary();break;case"lounge":this.renderLounge();break;default:console.log(`Room ${s} not implemented yet`)}}renderMainHall(){this.updateRoomTimestamp(),this.renderAgentStatusBar(),this.renderNetWorth(),this.renderBankBalances(),this.renderBurnRate(),this.renderRevenue(),this.renderDecisionQueue(),this.renderAlerts(),this.renderCalendar(),this.renderEmails(),this.renderPipelineSnapshot(),this.renderTraining(),this.renderWeather(),this.renderNews(),this.renderQuickStats()}updateRoomTimestamp(){const s=document.getElementById("room-timestamp");if(s){const t=new Date;s.textContent=`Last updated: ${t.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})}`}}renderAgentStatusBar(){const s=document.getElementById("agent-status-bar");if(!s||!this.data.agents?.agents)return;let t="";Object.entries(this.data.agents.agents).forEach(([e,a])=>{const i=a.status==="online"?"online":"offline",n=a.name.split(" ").map(o=>o[0]).join("").toUpperCase(),r=a.last_report?new Date(a.last_report.timestamp).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}):"No reports";t+=`
                <div class="agent-status-item">
                    <div class="agent-avatar">${n}</div>
                    <div class="agent-info">
                        <div class="agent-name">${a.name}</div>
                        <div class="agent-role">${a.role}</div>
                    </div>
                    <div class="agent-status">
                        <span class="status-badge ${i}">${a.status}</span>
                        <span class="agent-last-report">${r}</span>
                    </div>
                </div>
            `}),s.innerHTML=t}renderNetWorth(){if(!this.data.treasury)return;const s=this.data.treasury.account_balances;let t=0;Object.values(s).forEach(a=>{t+=a.balance||0});const e=document.getElementById("main-net-worth");e&&(e.textContent=this.formatCurrency(t)),this.renderNetWorthChart()}renderBankBalances(){const s=document.getElementById("balances-list");if(!s||!this.data.dashboard?.financial_snapshot?.cash_position)return;const t=this.data.dashboard.financial_snapshot.cash_position;let e="";Object.entries(t).forEach(([a,i])=>{if(a!=="total_liquid"){const n=a.replace(/_/g," ").replace(/\b\w/g,r=>r.toUpperCase());e+=`
                    <div class="balance-item">
                        <span class="balance-name">${n}</span>
                        <span class="balance-amount">${this.formatCurrency(i)}</span>
                    </div>
                `}}),s.innerHTML=e}renderBurnRate(){const s=document.getElementById("burn-rate-display");if(!s||!this.data.dashboard?.financial_snapshot)return;const t=this.data.dashboard.financial_snapshot.monthly_burn||0,e=this.data.dashboard.financial_snapshot.daily_change||0,a=e>=0?"positive":"negative",i=e>=0?"↓":"↑",n=`
            <span class="burn-rate-amount">${this.formatCurrency(t)}</span>
            <div class="burn-rate-trend">
                <span class="${a}">${i} ${this.formatCurrency(Math.abs(e))} today</span>
            </div>
        `;s.innerHTML=n}renderRevenue(){const s=document.getElementById("revenue-display");if(!s||!this.data.projects)return;let t=0,e=0;this.data.projects.pipeline_stats&&(t=this.data.projects.pipeline_stats.revenue_this_month||0,e=this.data.projects.pipeline_stats.deals_closed||0);const a=`
            <span class="revenue-amount">${this.formatCurrency(t)}</span>
            <div class="revenue-trend">
                <span class="deals-count">${e} deals closed</span>
            </div>
        `;s.innerHTML=a}renderAlerts(){const s=document.getElementById("alerts-list");if(!s||!this.data.alerts?.alerts)return;let t="";this.data.alerts.alerts.slice(0,6).forEach(a=>{const i=a.priority||"medium";t+=`
                <div class="alert-item ${i}">
                    <span class="alert-type">${a.type}</span>
                    <span class="alert-message">${a.message}</span>
                </div>
            `}),s.innerHTML=t||'<p class="no-data">No alerts</p>';const e=document.getElementById("queue-count");e&&(e.textContent=this.data.alerts?.alerts?.length||0)}renderCalendar(){const s=document.getElementById("calendar-content");if(!s||!this.data.calendar)return;let t='<div class="today-events">';this.data.calendar.today_events&&this.data.calendar.today_events.slice(0,4).forEach(e=>{const a=new Date(e.start).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:!0});t+=`
                    <div class="event-item">
                        <div class="event-time">${a}</div>
                        <div class="event-title">${e.title}</div>
                        ${e.location?`<div class="event-location">${e.location}</div>`:""}
                    </div>
                `}),t+="</div>",this.data.calendar.week_preview&&(t+=`
                <div class="week-preview">
                    <h4>This Week</h4>
                    <div class="week-days">
            `,this.data.calendar.week_preview.forEach(e=>{t+=`
                    <div class="week-day">
                        <span class="week-day-name">${e.day}</span>
                        <span class="week-day-count">${e.event_count} events</span>
                    </div>
                `}),t+="</div></div>"),s.innerHTML=t}renderEmails(){const s=document.getElementById("emails-list");if(!s||!this.data.emails?.priority_inbox)return;let t="";this.data.emails.priority_inbox.slice(0,5).forEach(a=>{const i=new Date(a.received).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:!0}),n=a.priority==="high"?"high":"",r=a.read?"":"unread";t+=`
                <div class="email-item ${n} ${r}">
                    <div class="email-header">
                        <span class="email-sender">${a.from}</span>
                        <span class="email-time">${i}</span>
                    </div>
                    <div class="email-subject">${a.subject}</div>
                    <div class="email-preview">${a.preview}</div>
                </div>
            `}),s.innerHTML=t;const e=document.getElementById("unread-count");if(e){const a=this.data.emails.integration_status?.unread_count||0;e.textContent=a}}renderPipelineSnapshot(){const s=document.getElementById("pipeline-stats");if(!s||!this.data.projects)return;const t=this.data.projects;let e="";e+=`
            <div class="pipeline-stats">
                <div class="pipeline-stat">
                    <span class="pipeline-stat-value">${t.lead_counts?.total||0}</span>
                    <span class="pipeline-stat-label">Total Leads</span>
                </div>
                <div class="pipeline-stat">
                    <span class="pipeline-stat-value">${t.lead_counts?.hot||0}</span>
                    <span class="pipeline-stat-label">Hot Leads</span>
                </div>
                <div class="pipeline-stat">
                    <span class="pipeline-stat-value">${t.active_projects?.length||0}</span>
                    <span class="pipeline-stat-label">Active Deals</span>
                </div>
                <div class="pipeline-stat">
                    <span class="pipeline-stat-value">${t.pipeline_stats?.conversion_rate||"0%"}</span>
                    <span class="pipeline-stat-label">Conversion</span>
                </div>
            </div>
        `,t.campaigns&&(e+='<div class="campaign-status">',Object.entries(t.campaigns).forEach(([a,i])=>{const n=i.status==="active"?"active":"paused";e+=`
                    <div class="campaign-item">
                        <span class="campaign-name">${a}</span>
                        <span class="campaign-status-badge ${n}">${i.status}</span>
                    </div>
                `}),e+="</div>"),s.innerHTML=e}renderTraining(){const s=document.getElementById("training-display");if(!s||!this.data.training)return;let t="";if(this.data.training.todays_workout){const e=this.data.training.todays_workout;t=`
                <div class="workout-today">
                    <div class="workout-type">${e.type||"Rest Day"}</div>
                    <div class="workout-details">
                        <div class="workout-detail">
                            <span class="workout-detail-label">Duration</span>
                            <span class="workout-detail-value">${e.duration||"N/A"}</span>
                        </div>
                        <div class="workout-detail">
                            <span class="workout-detail-label">Intensity</span>
                            <span class="workout-detail-value">${e.intensity||"N/A"}</span>
                        </div>
                    </div>
                    <div class="workout-description">${e.description||"No description available"}</div>
                </div>
            `}else t='<div class="workout-today"><div class="workout-type">Rest Day</div></div>';s.innerHTML=t}renderWeather(){const s=document.getElementById("weather-display");if(!s||!this.data.dashboard?.weather)return;const t=this.data.dashboard.weather,e=`
            <div class="weather-current">
                <div class="weather-temp">${t.current.temperature}°F</div>
                <div class="weather-condition">${t.current.condition}</div>
                <div class="weather-location">${t.location}</div>
            </div>
            <div class="weather-forecast">
                ${t.forecast_3day.map(a=>`
                    <div class="forecast-day">
                        <div class="day-name">${a.day}</div>
                        <div class="day-temps">${a.high}°/${a.low}°</div>
                        <div class="day-condition">${a.condition}</div>
                        ${a.rain>0?`<div class="rain-chance">${a.rain}% rain</div>`:""}
                    </div>
                `).join("")}
            </div>
        `;s.innerHTML=e}renderNews(){const s=document.getElementById("news-list");if(!s||!this.data.news?.articles)return;let t="";this.data.news.articles.slice(0,5).forEach(e=>{const a=new Date(e.published_date).toLocaleDateString();t+=`
                <div class="news-item">
                    <div class="news-title">${e.title}</div>
                    <div class="news-summary">${e.summary}</div>
                    <div class="news-meta">
                        <span class="news-source">${e.source}</span>
                        <span class="news-date">${a}</span>
                    </div>
                </div>
            `}),s.innerHTML=t||'<p class="no-data">No news available</p>'}renderCommand(){this.updateCommandTimestamp(),this.renderEmailsFull(),this.renderCalendarFull(),this.renderNotifications()}updateCommandTimestamp(){const s=document.getElementById("command-timestamp");if(s){const t=new Date;s.textContent=`Last updated: ${t.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})}`}}renderEmailsFull(){const s=document.getElementById("emails-full-list");if(!s||!this.data.emails?.priority_inbox)return;let t="";this.data.emails.priority_inbox.forEach(a=>{const i=new Date(a.received).toLocaleString(),n=a.priority==="high"?"high":"",r=a.read?"":"unread";t+=`
                <div class="email-item ${n} ${r}">
                    <div class="email-header">
                        <span class="email-sender">${a.from}</span>
                        <span class="email-time">${i}</span>
                    </div>
                    <div class="email-subject">${a.subject}</div>
                    <div class="email-preview">${a.preview}</div>
                    <div class="email-actions">
                        <button class="email-action-btn">Reply</button>
                        <button class="email-action-btn">Archive</button>
                    </div>
                </div>
            `}),s.innerHTML=t;const e=document.getElementById("email-stats");if(e){const a=this.data.emails.integration_status?.unread_count||0;e.textContent=`${a} unread`}}renderCalendarFull(){const s=document.getElementById("calendar-full-view");if(!s||!this.data.calendar)return;let t="";this.data.calendar.today_events&&(t+=`<div class="calendar-day-view"><h4>Today's Schedule</h4>`,this.data.calendar.today_events.forEach(e=>{const a=new Date(e.start).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:!0}),i=new Date(e.end).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:!0});t+=`
                    <div class="calendar-event-full">
                        <div class="event-time-full">${a} - ${i}</div>
                        <div class="event-title-full">${e.title}</div>
                        ${e.description?`<div class="event-description">${e.description}</div>`:""}
                        ${e.location?`<div class="event-location">${e.location}</div>`:""}
                        ${e.attendees?`<div class="event-attendees">With: ${e.attendees.join(", ")}</div>`:""}
                    </div>
                `}),t+="</div>"),this.data.calendar.upcoming_deadlines&&(t+='<div class="calendar-deadlines"><h4>Upcoming Deadlines</h4>',this.data.calendar.upcoming_deadlines.forEach(e=>{const a=new Date(e.due_date).toLocaleDateString(),i=e.priority==="high"?"high":e.priority;t+=`
                    <div class="deadline-item ${i}">
                        <div class="deadline-title">${e.title}</div>
                        <div class="deadline-due">Due: ${a} (${e.days_remaining} days)</div>
                        <div class="deadline-category">${e.category.replace(/_/g," ")}</div>
                    </div>
                `}),t+="</div>"),s.innerHTML=t}renderNotifications(){const s=document.getElementById("notifications-list");if(!s)return;let t=[];this.data.alerts?.alerts&&(t=t.concat(this.data.alerts.alerts.map(a=>({...a,source:"System Alert",timestamp:new Date().toISOString()})))),t.push({type:"email",message:"New high priority email received",source:"Gmail",timestamp:new Date(Date.now()-3e5).toISOString(),priority:"high"},{type:"calendar",message:"Upcoming meeting in 30 minutes",source:"Calendar",timestamp:new Date(Date.now()-6e5).toISOString(),priority:"medium"}),t.sort((a,i)=>new Date(i.timestamp)-new Date(a.timestamp));let e="";t.slice(0,10).forEach(a=>{const i=new Date(a.timestamp).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:!0}),n=a.priority||"medium";e+=`
                <div class="notification-item ${n}">
                    <div class="notification-header">
                        <span class="notification-source">${a.source}</span>
                        <span class="notification-time">${i}</span>
                    </div>
                    <div class="notification-message">${a.message}</div>
                </div>
            `}),s.innerHTML=e||'<p class="no-data">No notifications</p>'}renderWatchtower(){this.updateWatchtowerTimestamp(),this.renderCriticalAlerts(),this.renderSystemStatus(),this.renderContacts(),this.renderGoals()}updateWatchtowerTimestamp(){const s=document.getElementById("watchtower-timestamp");if(s){const t=new Date;s.textContent=`Last updated: ${t.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})}`}}renderCriticalAlerts(){const s=document.getElementById("critical-alerts-list");if(!s||!this.data.alerts?.alerts)return;const t=this.data.alerts.alerts.filter(i=>i.priority==="urgent"||i.priority==="high");let e="";t.forEach(i=>{const n=i.priority||"medium";e+=`
                <div class="critical-alert-item ${n}">
                    <div class="alert-header">
                        <span class="alert-type">${i.type}</span>
                        <span class="alert-priority">${i.priority.toUpperCase()}</span>
                    </div>
                    <div class="alert-message">${i.message}</div>
                    <div class="alert-actions">
                        <button class="alert-action-btn">Acknowledge</button>
                        <button class="alert-action-btn">Dismiss</button>
                    </div>
                </div>
            `}),s.innerHTML=e||'<p class="no-data">No critical alerts</p>';const a=document.getElementById("critical-alert-count");a&&(a.textContent=t.length)}renderSystemStatus(){const s=document.getElementById("system-status-grid");if(!s||!this.data.agents)return;const t=this.data.agents.agents,e=this.data.agents.summary||{};let a=`
            <div class="system-stat">
                <div class="system-stat-value">${e.active_agents||0}/${Object.keys(t).length}</div>
                <div class="system-stat-label">Agents Online</div>
                <div class="system-stat-status ${e.active_agents===Object.keys(t).length?"good":"warning"}">
                    ${e.active_agents===Object.keys(t).length?"✓ All Systems Operational":"⚠ Some Systems Down"}
                </div>
            </div>
            <div class="system-stat">
                <div class="system-stat-value">${e.reports_last_24h||0}</div>
                <div class="system-stat-label">Reports (24h)</div>
                <div class="system-stat-trend">+${Math.floor((e.reports_last_24h||0)*.15)} from yesterday</div>
            </div>
            <div class="system-stat">
                <div class="system-stat-value">${e.high_priority_alerts||0}</div>
                <div class="system-stat-label">High Priority Alerts</div>
                <div class="system-stat-status ${e.high_priority_alerts===0?"good":"alert"}">
                    ${e.high_priority_alerts===0?"✓ No Issues":`${e.high_priority_alerts} Need Attention`}
                </div>
            </div>
        `;s.innerHTML=a}renderContacts(){const s=document.getElementById("contacts-list");if(!s)return;const t=[{name:"John Martinez",role:"Motivated Seller",phone:"+1-555-0123",lastContact:"2024-02-15",priority:"high",notes:"Interested in 456 Pine Street property"},{name:"Sarah Johnson",role:"Real Estate Agent",phone:"+1-555-0456",lastContact:"2024-02-10",priority:"medium",notes:"Referral partner - DFW area"},{name:"Mike Thompson",role:"Contractor",phone:"+1-555-0789",lastContact:"2024-02-08",priority:"medium",notes:"Preferred contractor for renovations"}];let e="";t.forEach(a=>{const i=new Date(a.lastContact).toLocaleDateString(),n=Math.floor((new Date-new Date(a.lastContact))/(1e3*60*60*24)),r=a.priority;e+=`
                <div class="contact-item ${r}">
                    <div class="contact-header">
                        <div class="contact-name">${a.name}</div>
                        <div class="contact-role">${a.role}</div>
                    </div>
                    <div class="contact-details">
                        <div class="contact-phone">${a.phone}</div>
                        <div class="contact-last">Last contact: ${i} (${n} days ago)</div>
                    </div>
                    <div class="contact-notes">${a.notes}</div>
                    <div class="contact-actions">
                        <button class="contact-action-btn">Call</button>
                        <button class="contact-action-btn">Text</button>
                        <button class="contact-action-btn">Email</button>
                    </div>
                </div>
            `}),s.innerHTML=e}renderGoals(){const s=document.getElementById("goals-list");if(!s||!this.data.goals?.goals)return;let t="",e=0;this.data.goals.goals.forEach(i=>{const n=i.progress||0;e+=n;const r=n>=80?"good":n>=50?"warning":"behind";t+=`
                <div class="goal-item ${r}">
                    <div class="goal-header">
                        <div class="goal-title">${i.title}</div>
                        <div class="goal-progress">${n}%</div>
                    </div>
                    <div class="goal-progress-bar">
                        <div class="goal-progress-fill" style="width: ${n}%"></div>
                    </div>
                    <div class="goal-details">
                        <div class="goal-category">${i.category}</div>
                        <div class="goal-deadline">Due: ${new Date(i.deadline).toLocaleDateString()}</div>
                    </div>
                    <div class="goal-description">${i.description}</div>
                </div>
            `}),s.innerHTML=t;const a=document.getElementById("goals-progress");if(a&&this.data.goals?.goals?.length){const i=Math.round(e/this.data.goals.goals.length);a.textContent=`${i}% Complete`}}renderLibrary(){this.renderDocuments(),this.renderRecentDocs()}renderDocuments(){const s=document.getElementById("documents-list");if(!s)return;const t=[{name:"Land Purchase Agreement Template",type:"contracts",size:"2.3 MB",modified:"2024-02-15",description:"Standard template for land acquisitions"},{name:"Wholesaling Playbook 2024",type:"playbooks",size:"5.7 MB",modified:"2024-02-10",description:"Complete guide to land wholesaling strategies"},{name:"Market Analysis - Kaufman County",type:"reports",size:"1.8 MB",modified:"2024-02-08",description:"Detailed market analysis and trends"},{name:"Due Diligence Checklist",type:"playbooks",size:"0.8 MB",modified:"2024-02-05",description:"Property evaluation checklist"}];let e="";t.forEach(a=>{const i=new Date(a.modified).toLocaleDateString();e+=`
                <div class="document-item" data-type="${a.type}">
                    <div class="document-icon">📄</div>
                    <div class="document-info">
                        <div class="document-name">${a.name}</div>
                        <div class="document-description">${a.description}</div>
                        <div class="document-meta">
                            <span class="document-size">${a.size}</span>
                            <span class="document-modified">Modified: ${i}</span>
                            <span class="document-type">${a.type}</span>
                        </div>
                    </div>
                    <div class="document-actions">
                        <button class="doc-action-btn">View</button>
                        <button class="doc-action-btn">Download</button>
                        <button class="doc-action-btn">Share</button>
                    </div>
                </div>
            `}),s.innerHTML=e}renderRecentDocs(){const s=document.getElementById("recent-docs-list");if(!s)return;const t=["Wholesaling Playbook 2024","Market Analysis - Kaufman County","Land Purchase Agreement Template","Due Diligence Checklist"];let e="";t.forEach(a=>{e+=`
                <div class="recent-doc-item">
                    <div class="recent-doc-icon">📄</div>
                    <div class="recent-doc-name">${a}</div>
                    <div class="recent-doc-time">2 hours ago</div>
                </div>
            `}),s.innerHTML=e}renderLounge(){this.setupFocusTimer(),this.renderMusicControls(),this.renderDeepWorkStats()}setupFocusTimer(){let s,t=25,e=0,a=!1;const i=document.getElementById("timer-time"),n=document.getElementById("timer-status"),r=document.getElementById("start-timer"),o=document.getElementById("pause-timer"),l=document.getElementById("reset-timer"),d=()=>{const c=String(t).padStart(2,"0"),u=String(e).padStart(2,"0");i&&(i.textContent=`${c}:${u}`)},m=()=>{a||(a=!0,n&&(n.textContent="Focus session active"),s=setInterval(()=>{if(e===0){if(t===0){clearInterval(s),a=!1,n&&(n.textContent="Focus session complete!"),alert("Focus session complete! Take a break.");return}t--,e=59}else e--;d()},1e3))},p=()=>{a&&(clearInterval(s),a=!1,n&&(n.textContent="Paused"))},h=()=>{clearInterval(s),a=!1,t=25,e=0,n&&(n.textContent="Ready to focus"),d()};r&&r.addEventListener("click",m),o&&o.addEventListener("click",p),l&&l.addEventListener("click",h),document.querySelectorAll(".timer-preset").forEach(c=>{c.addEventListener("click",u=>{const g=parseInt(u.target.dataset.minutes);h(),t=g,d()})}),d()}renderMusicControls(){const s=document.getElementById("play-music"),t=document.getElementById("stop-music"),e=document.getElementById("volume-slider");s&&s.addEventListener("click",()=>{alert("Music playback would start here (Spotify/Apple Music integration)")}),t&&t.addEventListener("click",()=>{alert("Music playback would stop here")}),e&&e.addEventListener("input",a=>{console.log(`Volume set to ${a.target.value}%`)})}renderDeepWorkStats(){const s=document.getElementById("deep-work-stats");if(!s)return;const t={today:"2.5h",thisWeek:"18.5h",thisMonth:"67h"},e=`
            <div class="stat-item">
                <span class="stat-value">${t.today}</span>
                <span class="stat-label">Today</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${t.thisWeek}</span>
                <span class="stat-label">This Week</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${t.thisMonth}</span>
                <span class="stat-label">This Month</span>
            </div>
        `;s.innerHTML=e}renderTrainingRoom(){this.renderWorkout(),this.renderTrainingPlan(),this.renderProgressCharts(),this.renderRecoveryMetrics()}renderNetWorthChart(){const s=document.getElementById("net-worth-chart");if(!s)return;this.charts.netWorth&&this.charts.netWorth.destroy();const t=s.getContext("2d"),e=this.generateTrendData(30,4e3,4500);this.charts.netWorth=new Chart(t,{type:"line",data:{labels:e.labels,datasets:[{data:e.values,borderColor:"#D4AF37",backgroundColor:"rgba(212, 175, 55, 0.1)",borderWidth:2,fill:!0,tension:.4,pointRadius:0,pointHoverRadius:4,pointHoverBackgroundColor:"#D4AF37",pointHoverBorderColor:"#FFF"}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{x:{display:!1},y:{display:!1}},elements:{point:{radius:0}},interaction:{intersect:!1,mode:"index"}}})}renderBriefing(){const s=document.getElementById("briefing-content");if(!s||!this.data.dashboard)return;const t=this.data.dashboard;let e="";t.priorities&&(e+='<div class="priorities-list">',t.priorities.slice(0,4).forEach(a=>{e+=`<div class="priority-item">${a}</div>`}),e+="</div>"),t.alerts&&(e+='<div class="alerts-list">',t.alerts.slice(0,3).forEach(a=>{const i=a.action_required?"urgent":"info";e+=`
                    <div class="alert-item ${i}">
                        <span class="alert-type">${a.type.toUpperCase()}</span>
                        <span class="alert-message">${a.message}</span>
                    </div>
                `}),e+="</div>"),s.innerHTML=e}renderDecisionQueue(){const s=document.getElementById("decisions-list");if(!s||!this.data.dashboard?.decision_queue)return;let t="";this.data.dashboard.decision_queue.forEach(e=>{const a=e.priority==="urgent"?"urgent":e.priority==="high"?"high":"medium";t+=`
                <div class="decision-item ${a}">
                    <div class="decision-title">${e.title}</div>
                    <div class="decision-description">${e.description}</div>
                    <div class="decision-meta">
                        <span class="deadline">Due: ${e.deadline}</span>
                        ${e.potential_value?`<span class="value">Value: ${this.formatCurrency(e.potential_value)}</span>`:""}
                    </div>
                </div>
            `}),s.innerHTML=t}renderQuickStats(){const s=document.getElementById("quick-stats");if(!s||!this.data.dashboard?.quick_stats)return;const t=this.data.dashboard.quick_stats;let e="";Object.entries(t).forEach(([a,i])=>{const n=a.replace(/_/g," ").replace(/\b\w/g,o=>o.toUpperCase());let r=i;typeof i=="boolean"&&(r=i?"✓":"✗"),e+=`
                <div class="stat-card">
                    <span class="value">${r}</span>
                    <span class="label">${n}</span>
                </div>
            `}),s.innerHTML=e}renderWeatherCalendar(){const s=document.getElementById("weather-calendar");if(!s||!this.data.dashboard?.weather)return;const t=this.data.dashboard.weather,e=`
            <div class="weather-current">
                <div class="weather-temp">${t.current.temperature}°F</div>
                <div class="weather-condition">${t.current.condition}</div>
                <div class="weather-location">${t.location}</div>
            </div>
            <div class="weather-forecast">
                ${t.forecast_3day.map(a=>`
                    <div class="forecast-day">
                        <div class="day-name">${a.day}</div>
                        <div class="day-temps">${a.high}°/${a.low}°</div>
                        <div class="day-condition">${a.condition}</div>
                        ${a.rain>0?`<div class="rain-chance">${a.rain}% rain</div>`:""}
                    </div>
                `).join("")}
            </div>
        `;s.innerHTML=e}renderWarRoom(){this.renderProjects(),this.renderMarketData(),this.renderPipeline(),this.renderNewseFeed()}renderProjects(){const s=document.getElementById("projects-list");if(!s||!this.data.projects)return;let t="";this.data.projects.active_projects&&this.data.projects.active_projects.forEach(e=>{const a=e.status==="active"?"active":e.status==="paused"?"paused":"completed";t+=`
                    <div class="project-card">
                        <div class="project-header">
                            <h4>${e.name}</h4>
                            <span class="status-badge ${a}">${e.status}</span>
                        </div>
                        <div class="project-description">${e.description}</div>
                        <div class="project-stats">
                            <div class="stat">
                                <span class="label">Progress</span>
                                <span class="value">${e.progress||0}%</span>
                            </div>
                            <div class="stat">
                                <span class="label">Budget</span>
                                <span class="value">${this.formatCurrency(e.budget||0)}</span>
                            </div>
                        </div>
                    </div>
                `}),s.innerHTML=t||"<p>No active projects</p>"}renderMarketData(){const s=document.getElementById("market-data");if(!s||!this.data.markets)return;let t="";this.data.markets.rates&&(t+='<div class="rates-section"><h4>Current Rates</h4>',Object.entries(this.data.markets.rates).forEach(([e,a])=>{const i=(a*100).toFixed(2);t+=`
                    <div class="rate-item">
                        <span class="rate-type">${e.replace(/_/g," ").toUpperCase()}</span>
                        <span class="rate-value">${i}%</span>
                    </div>
                `}),t+="</div>"),s.innerHTML=t}renderPipeline(){console.log("Pipeline chart rendering - placeholder")}renderNewseFeed(){const s=document.getElementById("news-feed");if(!s||!this.data.news)return;let t="";this.data.news.articles&&this.data.news.articles.slice(0,5).forEach(e=>{const a=new Date(e.published_date);t+=`
                    <div class="news-item">
                        <div class="news-title">${e.title}</div>
                        <div class="news-summary">${e.summary}</div>
                        <div class="news-meta">
                            <span class="news-source">${e.source}</span>
                            <span class="news-date">${a.toLocaleDateString()}</span>
                        </div>
                    </div>
                `}),s.innerHTML=t||"<p>No news available</p>"}renderTreasury(){this.renderAccounts(),this.renderBurnChart(),this.renderSubscriptions(),this.renderTransactions()}renderAccounts(){const s=document.getElementById("accounts-list");if(!s||!this.data.treasury?.account_balances)return;let t="";Object.entries(this.data.treasury.account_balances).forEach(([e,a])=>{const i=e.replace(/_/g," ").replace(/\b\w/g,n=>n.toUpperCase());t+=`
                <div class="account-item">
                    <div class="account-name">${i}</div>
                    <div class="account-balance">${this.formatCurrency(a.balance)}</div>
                    <div class="account-type">${a.account_type}</div>
                </div>
            `}),s.innerHTML=t}renderBurnChart(){const s=document.getElementById("burn-chart");if(!s||!this.data.treasury)return;this.charts.burnRate&&this.charts.burnRate.destroy();const t=s.getContext("2d"),e=this.generateTrendData(12,800,1200);this.charts.burnRate=new Chart(t,{type:"bar",data:{labels:e.labels,datasets:[{label:"Monthly Burn",data:e.values,backgroundColor:"rgba(255, 165, 0, 0.6)",borderColor:"#FFA500",borderWidth:1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0,grid:{color:"rgba(212, 175, 55, 0.2)"},ticks:{color:"#D4AF37"}},x:{grid:{color:"rgba(212, 175, 55, 0.2)"},ticks:{color:"#D4AF37"}}}}})}renderSubscriptions(){const s=document.getElementById("subscriptions-list");if(!s||!this.data.treasury?.subscriptions)return;let t="";this.data.treasury.subscriptions.forEach(e=>{const a=new Date(e.next_charge),i=e.status==="active"?"active":"inactive";t+=`
                <div class="subscription-item">
                    <div class="sub-name">${e.service}</div>
                    <div class="sub-amount">${this.formatCurrency(e.amount)}</div>
                    <div class="sub-next">Next: ${a.toLocaleDateString()}</div>
                    <span class="status-badge ${i}">${e.status}</span>
                </div>
            `}),s.innerHTML=t}renderTransactions(){const s=document.getElementById("transactions-list");if(!s||!this.data.treasury?.recent_transactions)return;let t="";this.data.treasury.recent_transactions.slice(0,10).forEach(e=>{const a=new Date(e.date),i=e.amount>0?"positive":"negative";t+=`
                <div class="transaction-item">
                    <div class="trans-description">${e.description}</div>
                    <div class="trans-amount ${i}">${this.formatCurrency(e.amount)}</div>
                    <div class="trans-date">${a.toLocaleDateString()}</div>
                    <div class="trans-category">${e.category}</div>
                </div>
            `}),s.innerHTML=t}renderBarracks(){this.renderAgents(),this.renderReportsFeed(),this.renderSystemHealth(),this.renderChangelog()}renderAgents(){const s=document.getElementById("agents-grid");if(!s||!this.data.agents?.agents)return;let t="";Object.entries(this.data.agents.agents).forEach(([e,a])=>{const i=a.status==="online"?"online":"offline",n=a.name.split(" ").map(r=>r[0]).join("");t+=`
                <div class="agent-card">
                    <div class="agent-header">
                        <div class="agent-avatar">${n}</div>
                        <div class="agent-info">
                            <h4>${a.name}</h4>
                            <div class="agent-role">${a.role}</div>
                        </div>
                    </div>
                    <div class="agent-status">
                        <span class="status-badge ${i}">${a.status}</span>
                        <span class="reports-count">${a.total_reports} reports</span>
                    </div>
                    <div class="agent-last-report">
                        ${a.last_report?`Last: ${new Date(a.last_report.timestamp).toLocaleString()}`:"No reports yet"}
                    </div>
                    <div class="agent-performance">
                        <div class="perf-stats">
                            ${Object.entries(a.performance_24h||{}).map(([r,o])=>`<div class="perf-item">
                                    <span class="perf-label">${r.replace(/_/g," ")}</span>
                                    <span class="perf-value">${o}</span>
                                </div>`).join("")}
                        </div>
                    </div>
                </div>
            `}),s.innerHTML=t}renderReportsFeed(){const s=document.getElementById("reports-feed");if(!s||!this.data.agents?.recent_reports)return;let t="";this.data.agents.recent_reports.slice(0,10).forEach(e=>{const a=new Date(e.timestamp),i=e.priority==="urgent"?"urgent":e.priority==="high"?"high":"medium";t+=`
                <div class="report-item ${i}">
                    <div class="report-header">
                        <span class="report-agent">${e.agent}</span>
                        <span class="report-date">${a.toLocaleString()}</span>
                    </div>
                    <div class="report-content">${e.content.substring(0,200)}...</div>
                    <div class="report-meta">
                        <span class="report-source">${e.source}</span>
                        <span class="report-type">${e.type}</span>
                    </div>
                </div>
            `}),s.innerHTML=t}renderSystemHealth(){const s=document.getElementById("uptime-grid");if(!s||!this.data.agents)return;const t=this.data.agents.summary||{},e=`
            <div class="health-stat">
                <div class="health-value">${t.active_agents||0}</div>
                <div class="health-label">Active Agents</div>
            </div>
            <div class="health-stat">
                <div class="health-value">${t.reports_last_24h||0}</div>
                <div class="health-label">Reports (24h)</div>
            </div>
            <div class="health-stat">
                <div class="health-value">${t.high_priority_alerts||0}</div>
                <div class="health-label">High Priority</div>
            </div>
            <div class="health-stat">
                <div class="health-value status-${t.system_health||"unknown"}">${t.system_health||"Unknown"}</div>
                <div class="health-label">System Status</div>
            </div>
        `;s.innerHTML=e}renderChangelog(){const s=document.getElementById("changelog-list");if(!s||!this.data.changelog)return;let t="";this.data.changelog.entries&&this.data.changelog.entries.slice(0,5).forEach(e=>{const a=new Date(e.date);t+=`
                    <div class="changelog-item">
                        <div class="changelog-version">${e.version}</div>
                        <div class="changelog-date">${a.toLocaleDateString()}</div>
                        <div class="changelog-changes">
                            ${e.changes.map(i=>`<div class="change-item">${i}</div>`).join("")}
                        </div>
                    </div>
                `}),s.innerHTML=t||"<p>No changelog entries</p>"}renderTraining(){this.renderWorkout(),this.renderTrainingPlan(),this.renderProgressCharts(),this.renderRecoveryMetrics()}renderWorkout(){const s=document.getElementById("workout-display");if(!s||!this.data.training)return;let t="";if(this.data.training.todays_workout){const e=this.data.training.todays_workout;t=`
                <div class="workout-today">
                    <h4>${e.type||"Today's Workout"}</h4>
                    <div class="workout-details">
                        <div class="workout-duration">Duration: ${e.duration||"N/A"}</div>
                        <div class="workout-intensity">Intensity: ${e.intensity||"N/A"}</div>
                    </div>
                    <div class="workout-description">${e.description||"No description"}</div>
                </div>
            `}s.innerHTML=t||"<p>No workout planned for today</p>"}renderTrainingPlan(){const s=document.getElementById("training-schedule");if(!s||!this.data.training)return;let t="";this.data.training.weekly_plan&&this.data.training.weekly_plan.forEach(e=>{t+=`
                    <div class="plan-day">
                        <div class="day-name">${e.day}</div>
                        <div class="day-activity">${e.activity}</div>
                        <div class="day-duration">${e.duration}</div>
                    </div>
                `}),s.innerHTML=t||"<p>No training plan available</p>"}renderProgressCharts(){const s=document.getElementById("training-chart");if(!s)return;this.charts.training&&this.charts.training.destroy();const t=s.getContext("2d"),e=this.generateTrendData(30,20,60);this.charts.training=new Chart(t,{type:"line",data:{labels:e.labels,datasets:[{label:"Training Minutes",data:e.values,borderColor:"#32CD32",backgroundColor:"rgba(50, 205, 50, 0.1)",borderWidth:2,fill:!0,tension:.4}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!0,labels:{color:"#D4AF37"}}},scales:{y:{beginAtZero:!0,grid:{color:"rgba(212, 175, 55, 0.2)"},ticks:{color:"#D4AF37"}},x:{grid:{color:"rgba(212, 175, 55, 0.2)"},ticks:{color:"#D4AF37"}}}}})}renderRecoveryMetrics(){const s=document.getElementById("recovery-metrics");if(!s||!this.data.training)return;const t=this.data.training.recovery_metrics||{},e=`
            <div class="recovery-grid">
                <div class="recovery-item">
                    <div class="recovery-label">Sleep Score</div>
                    <div class="recovery-value">${t.sleep_score||"N/A"}</div>
                </div>
                <div class="recovery-item">
                    <div class="recovery-label">HRV</div>
                    <div class="recovery-value">${t.hrv||"N/A"}</div>
                </div>
                <div class="recovery-item">
                    <div class="recovery-label">Resting HR</div>
                    <div class="recovery-value">${t.resting_hr||"N/A"}</div>
                </div>
                <div class="recovery-item">
                    <div class="recovery-label">Recovery</div>
                    <div class="recovery-value">${t.recovery_status||"N/A"}</div>
                </div>
            </div>
        `;s.innerHTML=e}formatCurrency(s){return s>=1e6?`$${(s/1e6).toFixed(1)}M`:s>=1e3?`$${(s/1e3).toFixed(0)}K`:`$${s.toFixed(0)}`}generateTrendData(s,t,e){const a=[],i=[];for(let n=s;n>=0;n--){const r=new Date;r.setDate(r.getDate()-n),a.push(r.toLocaleDateString("en-US",{month:"short",day:"numeric"}));const o=t+(e-t)*(s-n)/s,l=(Math.random()-.5)*(e-t)*.1;i.push(Math.max(t,Math.min(e,o+l)))}return{labels:a,values:i}}resizeCharts(){Object.values(this.charts).forEach(s=>{s&&s.resize()})}startAutoRefresh(){this.updateInterval=setInterval(async()=>{console.log("🔄 Auto-refreshing data..."),await this.loadData(),this.renderRoom(this.currentRoom)},900*1e3)}destroy(){this.updateInterval&&clearInterval(this.updateInterval),Object.values(this.charts).forEach(s=>{s&&s.destroy()})}}document.addEventListener("DOMContentLoaded",()=>{window.lodge=new y});window.addEventListener("beforeunload",()=>{window.lodge&&window.lodge.destroy()});
