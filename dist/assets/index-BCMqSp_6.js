(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))e(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&e(i)}).observe(document,{childList:!0,subtree:!0});function s(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function e(a){if(a.ep)return;a.ep=!0;const r=s(a);fetch(a.href,r)}})();class l{constructor(){this.currentRoom="main-hall",this.data={},this.charts={},this.updateInterval=null,this.init()}async init(){console.log("🏰 Initializing The Lodge Dashboard..."),this.setupEventListeners(),await this.loadData(),this.renderRoom(this.currentRoom),this.startAutoRefresh(),console.log("✅ The Lodge is ready!")}setupEventListeners(){document.querySelectorAll(".room-tab").forEach(t=>{t.addEventListener("click",s=>{const e=s.currentTarget.dataset.room;this.switchRoom(e)})}),window.addEventListener("resize",()=>{this.resizeCharts()})}async loadData(){const t=["dashboard.json","agents.json","treasury.json","projects.json","training.json","markets.json","news.json","calendar.json","alerts.json","changelog.json","goals.json","emails.json"];console.log("📊 Loading data files...");for(const s of t)try{const e=await fetch(`/data/${s}`);if(e.ok){const a=s.replace(".json","");this.data[a]=await e.json(),console.log(`✅ Loaded ${s}`)}else console.warn(`⚠️ Failed to load ${s}: ${e.status}`)}catch(e){console.error(`❌ Error loading ${s}:`,e)}this.updateHeaderStats()}updateHeaderStats(){if(this.data.dashboard){const t=new Date(this.data.dashboard.last_updated);document.getElementById("last-updated").textContent=t.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})}if(this.data.treasury){const t=this.data.treasury.account_balances;let s=0;Object.values(t).forEach(e=>{s+=e.balance||0}),document.getElementById("net-worth").textContent=this.formatCurrency(s)}}switchRoom(t){document.querySelectorAll(".room-tab").forEach(s=>{s.classList.remove("active")}),document.querySelector(`[data-room="${t}"]`).classList.add("active"),document.querySelectorAll(".room").forEach(s=>{s.classList.remove("active")}),document.getElementById(t).classList.add("active"),this.currentRoom=t,this.renderRoom(t)}renderRoom(t){switch(console.log(`🏛️ Rendering room: ${t}`),t){case"main-hall":this.renderMainHall();break;case"war-room":this.renderWarRoom();break;case"treasury":this.renderTreasury();break;case"barracks":this.renderBarracks();break;case"training":this.renderTraining();break;default:console.log(`Room ${t} not implemented yet`)}}renderMainHall(){this.renderNetWorth(),this.renderBriefing(),this.renderDecisionQueue(),this.renderQuickStats(),this.renderWeatherCalendar()}renderNetWorth(){if(!this.data.treasury)return;const t=this.data.treasury.account_balances;let s=0;Object.values(t).forEach(a=>{s+=a.balance||0});const e=document.getElementById("main-net-worth");e&&(e.textContent=this.formatCurrency(s)),this.renderNetWorthChart()}renderNetWorthChart(){const t=document.getElementById("net-worth-chart");if(!t)return;this.charts.netWorth&&this.charts.netWorth.destroy();const s=t.getContext("2d"),e=this.generateTrendData(30,4e3,4500);this.charts.netWorth=new Chart(s,{type:"line",data:{labels:e.labels,datasets:[{data:e.values,borderColor:"#D4AF37",backgroundColor:"rgba(212, 175, 55, 0.1)",borderWidth:2,fill:!0,tension:.4,pointRadius:0,pointHoverRadius:4,pointHoverBackgroundColor:"#D4AF37",pointHoverBorderColor:"#FFF"}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{x:{display:!1},y:{display:!1}},elements:{point:{radius:0}},interaction:{intersect:!1,mode:"index"}}})}renderBriefing(){const t=document.getElementById("briefing-content");if(!t||!this.data.dashboard)return;const s=this.data.dashboard;let e="";s.priorities&&(e+='<div class="priorities-list">',s.priorities.slice(0,4).forEach(a=>{e+=`<div class="priority-item">${a}</div>`}),e+="</div>"),s.alerts&&(e+='<div class="alerts-list">',s.alerts.slice(0,3).forEach(a=>{const r=a.action_required?"urgent":"info";e+=`
                    <div class="alert-item ${r}">
                        <span class="alert-type">${a.type.toUpperCase()}</span>
                        <span class="alert-message">${a.message}</span>
                    </div>
                `}),e+="</div>"),t.innerHTML=e}renderDecisionQueue(){const t=document.getElementById("decisions-list");if(!t||!this.data.dashboard?.decision_queue)return;let s="";this.data.dashboard.decision_queue.forEach(e=>{const a=e.priority==="urgent"?"urgent":e.priority==="high"?"high":"medium";s+=`
                <div class="decision-item ${a}">
                    <div class="decision-title">${e.title}</div>
                    <div class="decision-description">${e.description}</div>
                    <div class="decision-meta">
                        <span class="deadline">Due: ${e.deadline}</span>
                        ${e.potential_value?`<span class="value">Value: ${this.formatCurrency(e.potential_value)}</span>`:""}
                    </div>
                </div>
            `}),t.innerHTML=s}renderQuickStats(){const t=document.getElementById("quick-stats");if(!t||!this.data.dashboard?.quick_stats)return;const s=this.data.dashboard.quick_stats;let e="";Object.entries(s).forEach(([a,r])=>{const i=a.replace(/_/g," ").replace(/\b\w/g,o=>o.toUpperCase());let n=r;typeof r=="boolean"&&(n=r?"✓":"✗"),e+=`
                <div class="stat-card">
                    <span class="value">${n}</span>
                    <span class="label">${i}</span>
                </div>
            `}),t.innerHTML=e}renderWeatherCalendar(){const t=document.getElementById("weather-calendar");if(!t||!this.data.dashboard?.weather)return;const s=this.data.dashboard.weather,e=`
            <div class="weather-current">
                <div class="weather-temp">${s.current.temperature}°F</div>
                <div class="weather-condition">${s.current.condition}</div>
                <div class="weather-location">${s.location}</div>
            </div>
            <div class="weather-forecast">
                ${s.forecast_3day.map(a=>`
                    <div class="forecast-day">
                        <div class="day-name">${a.day}</div>
                        <div class="day-temps">${a.high}°/${a.low}°</div>
                        <div class="day-condition">${a.condition}</div>
                        ${a.rain>0?`<div class="rain-chance">${a.rain}% rain</div>`:""}
                    </div>
                `).join("")}
            </div>
        `;t.innerHTML=e}renderWarRoom(){this.renderProjects(),this.renderMarketData(),this.renderPipeline(),this.renderNewseFeed()}renderProjects(){const t=document.getElementById("projects-list");if(!t||!this.data.projects)return;let s="";this.data.projects.active_projects&&this.data.projects.active_projects.forEach(e=>{const a=e.status==="active"?"active":e.status==="paused"?"paused":"completed";s+=`
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
                `}),t.innerHTML=s||"<p>No active projects</p>"}renderMarketData(){const t=document.getElementById("market-data");if(!t||!this.data.markets)return;let s="";this.data.markets.rates&&(s+='<div class="rates-section"><h4>Current Rates</h4>',Object.entries(this.data.markets.rates).forEach(([e,a])=>{const r=(a*100).toFixed(2);s+=`
                    <div class="rate-item">
                        <span class="rate-type">${e.replace(/_/g," ").toUpperCase()}</span>
                        <span class="rate-value">${r}%</span>
                    </div>
                `}),s+="</div>"),t.innerHTML=s}renderPipeline(){console.log("Pipeline chart rendering - placeholder")}renderNewseFeed(){const t=document.getElementById("news-feed");if(!t||!this.data.news)return;let s="";this.data.news.articles&&this.data.news.articles.slice(0,5).forEach(e=>{const a=new Date(e.published_date);s+=`
                    <div class="news-item">
                        <div class="news-title">${e.title}</div>
                        <div class="news-summary">${e.summary}</div>
                        <div class="news-meta">
                            <span class="news-source">${e.source}</span>
                            <span class="news-date">${a.toLocaleDateString()}</span>
                        </div>
                    </div>
                `}),t.innerHTML=s||"<p>No news available</p>"}renderTreasury(){this.renderAccounts(),this.renderBurnChart(),this.renderSubscriptions(),this.renderTransactions()}renderAccounts(){const t=document.getElementById("accounts-list");if(!t||!this.data.treasury?.account_balances)return;let s="";Object.entries(this.data.treasury.account_balances).forEach(([e,a])=>{const r=e.replace(/_/g," ").replace(/\b\w/g,i=>i.toUpperCase());s+=`
                <div class="account-item">
                    <div class="account-name">${r}</div>
                    <div class="account-balance">${this.formatCurrency(a.balance)}</div>
                    <div class="account-type">${a.account_type}</div>
                </div>
            `}),t.innerHTML=s}renderBurnChart(){const t=document.getElementById("burn-chart");if(!t||!this.data.treasury)return;this.charts.burnRate&&this.charts.burnRate.destroy();const s=t.getContext("2d"),e=this.generateTrendData(12,800,1200);this.charts.burnRate=new Chart(s,{type:"bar",data:{labels:e.labels,datasets:[{label:"Monthly Burn",data:e.values,backgroundColor:"rgba(255, 165, 0, 0.6)",borderColor:"#FFA500",borderWidth:1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0,grid:{color:"rgba(212, 175, 55, 0.2)"},ticks:{color:"#D4AF37"}},x:{grid:{color:"rgba(212, 175, 55, 0.2)"},ticks:{color:"#D4AF37"}}}}})}renderSubscriptions(){const t=document.getElementById("subscriptions-list");if(!t||!this.data.treasury?.subscriptions)return;let s="";this.data.treasury.subscriptions.forEach(e=>{const a=new Date(e.next_charge),r=e.status==="active"?"active":"inactive";s+=`
                <div class="subscription-item">
                    <div class="sub-name">${e.service}</div>
                    <div class="sub-amount">${this.formatCurrency(e.amount)}</div>
                    <div class="sub-next">Next: ${a.toLocaleDateString()}</div>
                    <span class="status-badge ${r}">${e.status}</span>
                </div>
            `}),t.innerHTML=s}renderTransactions(){const t=document.getElementById("transactions-list");if(!t||!this.data.treasury?.recent_transactions)return;let s="";this.data.treasury.recent_transactions.slice(0,10).forEach(e=>{const a=new Date(e.date),r=e.amount>0?"positive":"negative";s+=`
                <div class="transaction-item">
                    <div class="trans-description">${e.description}</div>
                    <div class="trans-amount ${r}">${this.formatCurrency(e.amount)}</div>
                    <div class="trans-date">${a.toLocaleDateString()}</div>
                    <div class="trans-category">${e.category}</div>
                </div>
            `}),t.innerHTML=s}renderBarracks(){this.renderAgents(),this.renderReportsFeed(),this.renderSystemHealth(),this.renderChangelog()}renderAgents(){const t=document.getElementById("agents-grid");if(!t||!this.data.agents?.agents)return;let s="";Object.entries(this.data.agents.agents).forEach(([e,a])=>{const r=a.status==="online"?"online":"offline",i=a.name.split(" ").map(n=>n[0]).join("");s+=`
                <div class="agent-card">
                    <div class="agent-header">
                        <div class="agent-avatar">${i}</div>
                        <div class="agent-info">
                            <h4>${a.name}</h4>
                            <div class="agent-role">${a.role}</div>
                        </div>
                    </div>
                    <div class="agent-status">
                        <span class="status-badge ${r}">${a.status}</span>
                        <span class="reports-count">${a.total_reports} reports</span>
                    </div>
                    <div class="agent-last-report">
                        ${a.last_report?`Last: ${new Date(a.last_report.timestamp).toLocaleString()}`:"No reports yet"}
                    </div>
                    <div class="agent-performance">
                        <div class="perf-stats">
                            ${Object.entries(a.performance_24h||{}).map(([n,o])=>`<div class="perf-item">
                                    <span class="perf-label">${n.replace(/_/g," ")}</span>
                                    <span class="perf-value">${o}</span>
                                </div>`).join("")}
                        </div>
                    </div>
                </div>
            `}),t.innerHTML=s}renderReportsFeed(){const t=document.getElementById("reports-feed");if(!t||!this.data.agents?.recent_reports)return;let s="";this.data.agents.recent_reports.slice(0,10).forEach(e=>{const a=new Date(e.timestamp),r=e.priority==="urgent"?"urgent":e.priority==="high"?"high":"medium";s+=`
                <div class="report-item ${r}">
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
            `}),t.innerHTML=s}renderSystemHealth(){const t=document.getElementById("uptime-grid");if(!t||!this.data.agents)return;const s=this.data.agents.summary||{},e=`
            <div class="health-stat">
                <div class="health-value">${s.active_agents||0}</div>
                <div class="health-label">Active Agents</div>
            </div>
            <div class="health-stat">
                <div class="health-value">${s.reports_last_24h||0}</div>
                <div class="health-label">Reports (24h)</div>
            </div>
            <div class="health-stat">
                <div class="health-value">${s.high_priority_alerts||0}</div>
                <div class="health-label">High Priority</div>
            </div>
            <div class="health-stat">
                <div class="health-value status-${s.system_health||"unknown"}">${s.system_health||"Unknown"}</div>
                <div class="health-label">System Status</div>
            </div>
        `;t.innerHTML=e}renderChangelog(){const t=document.getElementById("changelog-list");if(!t||!this.data.changelog)return;let s="";this.data.changelog.entries&&this.data.changelog.entries.slice(0,5).forEach(e=>{const a=new Date(e.date);s+=`
                    <div class="changelog-item">
                        <div class="changelog-version">${e.version}</div>
                        <div class="changelog-date">${a.toLocaleDateString()}</div>
                        <div class="changelog-changes">
                            ${e.changes.map(r=>`<div class="change-item">${r}</div>`).join("")}
                        </div>
                    </div>
                `}),t.innerHTML=s||"<p>No changelog entries</p>"}renderTraining(){this.renderWorkout(),this.renderTrainingPlan(),this.renderProgressCharts(),this.renderRecoveryMetrics()}renderWorkout(){const t=document.getElementById("workout-display");if(!t||!this.data.training)return;let s="";if(this.data.training.todays_workout){const e=this.data.training.todays_workout;s=`
                <div class="workout-today">
                    <h4>${e.type||"Today's Workout"}</h4>
                    <div class="workout-details">
                        <div class="workout-duration">Duration: ${e.duration||"N/A"}</div>
                        <div class="workout-intensity">Intensity: ${e.intensity||"N/A"}</div>
                    </div>
                    <div class="workout-description">${e.description||"No description"}</div>
                </div>
            `}t.innerHTML=s||"<p>No workout planned for today</p>"}renderTrainingPlan(){const t=document.getElementById("training-schedule");if(!t||!this.data.training)return;let s="";this.data.training.weekly_plan&&this.data.training.weekly_plan.forEach(e=>{s+=`
                    <div class="plan-day">
                        <div class="day-name">${e.day}</div>
                        <div class="day-activity">${e.activity}</div>
                        <div class="day-duration">${e.duration}</div>
                    </div>
                `}),t.innerHTML=s||"<p>No training plan available</p>"}renderProgressCharts(){const t=document.getElementById("training-chart");if(!t)return;this.charts.training&&this.charts.training.destroy();const s=t.getContext("2d"),e=this.generateTrendData(30,20,60);this.charts.training=new Chart(s,{type:"line",data:{labels:e.labels,datasets:[{label:"Training Minutes",data:e.values,borderColor:"#32CD32",backgroundColor:"rgba(50, 205, 50, 0.1)",borderWidth:2,fill:!0,tension:.4}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!0,labels:{color:"#D4AF37"}}},scales:{y:{beginAtZero:!0,grid:{color:"rgba(212, 175, 55, 0.2)"},ticks:{color:"#D4AF37"}},x:{grid:{color:"rgba(212, 175, 55, 0.2)"},ticks:{color:"#D4AF37"}}}}})}renderRecoveryMetrics(){const t=document.getElementById("recovery-metrics");if(!t||!this.data.training)return;const s=this.data.training.recovery_metrics||{},e=`
            <div class="recovery-grid">
                <div class="recovery-item">
                    <div class="recovery-label">Sleep Score</div>
                    <div class="recovery-value">${s.sleep_score||"N/A"}</div>
                </div>
                <div class="recovery-item">
                    <div class="recovery-label">HRV</div>
                    <div class="recovery-value">${s.hrv||"N/A"}</div>
                </div>
                <div class="recovery-item">
                    <div class="recovery-label">Resting HR</div>
                    <div class="recovery-value">${s.resting_hr||"N/A"}</div>
                </div>
                <div class="recovery-item">
                    <div class="recovery-label">Recovery</div>
                    <div class="recovery-value">${s.recovery_status||"N/A"}</div>
                </div>
            </div>
        `;t.innerHTML=e}formatCurrency(t){return t>=1e6?`$${(t/1e6).toFixed(1)}M`:t>=1e3?`$${(t/1e3).toFixed(0)}K`:`$${t.toFixed(0)}`}generateTrendData(t,s,e){const a=[],r=[];for(let i=t;i>=0;i--){const n=new Date;n.setDate(n.getDate()-i),a.push(n.toLocaleDateString("en-US",{month:"short",day:"numeric"}));const o=s+(e-s)*(t-i)/t,c=(Math.random()-.5)*(e-s)*.1;r.push(Math.max(s,Math.min(e,o+c)))}return{labels:a,values:r}}resizeCharts(){Object.values(this.charts).forEach(t=>{t&&t.resize()})}startAutoRefresh(){this.updateInterval=setInterval(async()=>{console.log("🔄 Auto-refreshing data..."),await this.loadData(),this.renderRoom(this.currentRoom)},900*1e3)}destroy(){this.updateInterval&&clearInterval(this.updateInterval),Object.values(this.charts).forEach(t=>{t&&t.destroy()})}}document.addEventListener("DOMContentLoaded",()=>{window.lodge=new l});window.addEventListener("beforeunload",()=>{window.lodge&&window.lodge.destroy()});
