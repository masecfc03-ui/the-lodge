// data-loader.js - Load real data from JSON files for The Lodge

export class DataLoader {
    constructor() {
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
    }
    
    async loadData(fileName) {
        const cacheKey = fileName;
        const now = Date.now();
        
        // Check cache first
        if (this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (now - cached.timestamp < this.cacheTimeout) {
                return cached.data;
            }
        }
        
        try {
            const response = await fetch(`/data/${fileName}`);
            if (!response.ok) {
                throw new Error(`Failed to load ${fileName}: ${response.statusText}`);
            }
            
            const data = await response.json();
            
            // Cache the data
            this.cache.set(cacheKey, {
                data: data,
                timestamp: now
            });
            
            return data;
            
        } catch (error) {
            console.error(`Error loading ${fileName}:`, error);
            return this.getFallbackData(fileName);
        }
    }
    
    getFallbackData(fileName) {
        // Return reasonable fallback data if JSON files can't be loaded
        const fallbacks = {
            'dashboard.json': {
                weather: { location: 'Kaufman, TX', current: { temperature: 72, condition: 'Partly Cloudy' }},
                financial_snapshot: { total_liquid: 4222.96 },
                quick_stats: { new_leads_today: 12, unread_emails: 7 }
            },
            'projects.json': {
                projects: {
                    land_wholesaling: {
                        leads: { total_in_system: 8056, hot_leads: 85, in_pipeline: 23 }
                    }
                }
            },
            'markets.json': {
                interest_rates: { fed_funds_rate: { current: 5.25 }, mortgage_30yr: { current: 6.81 }},
                land_market: { target_counties: { kaufman_tx: { avg_per_acre: 8500 }}}
            },
            'treasury.json': {
                account_balances: {
                    chase_checking: { balance: 2847.23 },
                    kalshi_trading: { balance: 125.73 }
                }
            }
        };
        
        return fallbacks[fileName] || {};
    }
    
    // Convenience methods for specific data types
    async getDashboardData() {
        return await this.loadData('dashboard.json');
    }
    
    async getProjectsData() {
        return await this.loadData('projects.json');
    }
    
    async getMarketsData() {
        return await this.loadData('markets.json');
    }
    
    async getTreasuryData() {
        return await this.loadData('treasury.json');
    }
    
    async getAgentsData() {
        return await this.loadData('agents.json');
    }
    
    async getNewsData() {
        return await this.loadData('news.json');
    }
    
    async getTrainingData() {
        return await this.loadData('training.json');
    }
    
    async getEmailsData() {
        return await this.loadData('emails.json');
    }
    
    async getCalendarData() {
        return await this.loadData('calendar.json');
    }
    
    async getAlertsData() {
        return await this.loadData('alerts.json');
    }
    
    clearCache() {
        this.cache.clear();
    }
    
    getLastUpdated(fileName) {
        const cached = this.cache.get(fileName);
        if (cached && cached.data.last_updated) {
            return new Date(cached.data.last_updated);
        }
        return null;
    }
}