import React, { useEffect, useState } from 'react';
import { Activity, ShieldCheck, Zap, CloudLightning, Eye, Bell, Globe, Clock, DollarSign, Flame, TrendingUp, Users, CheckCircle, Building } from 'lucide-react';
import memoryService from '../services/memoryService';
import { apiService } from '../services/api';
import { inverterService } from '../services/inverterService';

const Dashboard = ({ inverterConfig }) => {
    const [recentMemories, setRecentMemories] = useState([]);
    const [applyingB2B, setApplyingB2B] = useState(false);
    const [leadResult, setLeadResult] = useState(null);
    const [dashboardData, setDashboardData] = useState({
        systemHealth: 'Loading...',
        weatherForecast: 'Loading...',
        solarROI: 'Loading...',
        gamification: 'Loading...',
        community: 'Loading...',
    });
    const [inverterData, setInverterData] = useState(null);

    // Inverter Telemetry Polling
    useEffect(() => {
        let isMounted = true;
        let timeoutId;

        const pollInverter = async () => {
            if (inverterConfig && inverterConfig.brand && inverterConfig.plantId) {
                try {
                    const data = await inverterService.getTelemetry(inverterConfig);
                    if (isMounted) {
                        setInverterData(data);
                    }
                } catch (err) {
                    console.error("Failed to poll inverter:", err);
                }
            } else {
                setInverterData(null);
            }

            // Poll every 5 seconds if mounted
            if (isMounted && inverterConfig && inverterConfig.brand) {
                timeoutId = setTimeout(pollInverter, 5000);
            }
        };

        pollInverter();

        return () => {
            isMounted = false;
            clearTimeout(timeoutId);
        };
    }, [inverterConfig]);

    const handleApplyForSolar = async () => {
        setApplyingB2B(true);
        try {
            const result = await apiService.applyForB2B('home_user_123');
            setLeadResult(result);
        } catch (error) {
            console.error("Error applying for solar:", error);
        } finally {
            setApplyingB2B(false);
        }
    };

    useEffect(() => {
        // Fetch recent memories for the Vision Status card
        const fetchMemories = () => {
            const docs = memoryService.getAll();
            setRecentMemories(docs.slice(-3).reverse());
        };
        fetchMemories();

        // Setup listener for future additions
        const interval = setInterval(fetchMemories, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const homeId = 'home_user_123';
                const [roiData, gamificationData, communityData, watcherData] = await Promise.all([
                    apiService.getSolarROI(homeId),
                    apiService.getGamification(homeId),
                    apiService.getCommunityInsights(homeId),
                    apiService.getSolarWatcherData(homeId)
                ]);

                setDashboardData({
                    systemHealth: `Status: ${watcherData.systemHealth}. ${watcherData.healthScore}% efficiency.`,
                    weatherForecast: watcherData.forecast.nextHours,
                    solarROI: `Saved R${roiData.monthlySavings} this month. Payback in ${roiData.payback.yearsRemaining} yrs. ${roiData.performance.selfSufficiency}% Self-Sufficiency.`,
                    gamification: `${gamificationData.streak}-Day Streak 🔥! You are top ${gamificationData.userRank}% in your city.`,
                    community: communityData.comparison.verdict
                });
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
                setDashboardData({
                    systemHealth: 'All systems optimal. 98% efficiency.',
                    weatherForecast: 'Clear skies. No outages predicted.',
                    solarROI: 'Saved R450 this month. Payback in 3.2 yrs. 82% Self-Sufficiency.',
                    gamification: '12-Day Streak 🔥! You are top 15% in your city.',
                    community: 'You use 4.2 kWh/day LESS than the Mangaung average. 🎉'
                });
            }
        };

        fetchDashboardData();
    }, []);

    const cards = [
        {
            title: 'System Health',
            agent: 'Coordinator Agent',
            icon: Activity,
            color: '#3B82F6',
            bgColor: '#DBEAFE',
            content: dashboardData.systemHealth,
        },
        {
            title: 'Appliance Analysis',
            agent: 'Appliance Analyst',
            icon: Zap,
            color: '#F59E0B',
            bgColor: '#FEF3C7',
            content: 'Detected spike: HVAC running efficiently.',
        },
        {
            title: 'Battery Optimizer',
            agent: 'Battery Optimizer',
            icon: ShieldCheck,
            color: '#10B981',
            bgColor: '#D1FAE5',
            content: 'Charging during off-peak. 85% capacity.',
        },
        {
            title: 'Environment Guardian',
            agent: 'Weather/Environment',
            icon: CloudLightning,
            color: '#8B5CF6',
            bgColor: '#EDE9FE',
            content: dashboardData.weatherForecast,
        },
        {
            title: 'Inverter Telemetry',
            agent: 'Solar & Inverter Agent',
            icon: Activity,
            color: '#3B82F6',
            bgColor: '#DBEAFE',
            content: inverterData ?
                `SOC: ${inverterData.battery_soc}%. PV: ${inverterData.pv_watts}W. Grid: ${inverterData.grid_draw_watts}W. Load: ${inverterData.load_watts}W.` :
                'No inverter configured. Add one in Settings.',
        },
        {
            title: 'Vision Status',
            agent: 'Vision Agent (Qwen3)',
            icon: Eye,
            color: '#EC4899',
            bgColor: '#FCE7F3',
            content: `Recent Scans: ${recentMemories.length > 0 ? recentMemories.map(m => m.metadata?.name || 'Unknown').join(', ') : 'None yet'}`,
        },
        {
            title: 'Tariff Zone',
            agent: 'Schedule Agent',
            icon: DollarSign,
            color: '#00D4AA', // Green for off-peak
            bgColor: '#E6FFF9',
            content: 'OFF-PEAK (R1.20/kWh). Good time to run heavy loads.',
        },
        {
            title: 'Hours Remaining',
            agent: 'Budget Pace',
            icon: Clock,
            color: '#F59E0B',
            bgColor: '#FEF3C7',
            content: '42h remaining on meter at current pace.',
        },
        {
            title: 'Solar ROI',
            agent: 'Finance Agent',
            icon: TrendingUp,
            color: '#3B82F6',
            bgColor: '#DBEAFE',
            content: dashboardData.solarROI,
        },
        {
            title: 'Gamification',
            agent: 'Community',
            icon: Flame,
            color: '#EF4444',
            bgColor: '#FEE2E2',
            content: dashboardData.gamification,
        },
        {
            title: 'Community Comparison',
            agent: 'Mesh Network',
            icon: Users,
            color: '#8B5CF6',
            bgColor: '#EDE9FE',
            content: dashboardData.community,
        }
    ];

    return (
        <div>
            <div className="header">StaticFund Phase D Dashboard</div>
            <div className="sub-header">Advanced Multi-Agent & Resilience Overview</div>

            <div className="content" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem', paddingBottom: '2rem' }}>

                {/* Tou Timeline Mock */}
                <div className="card" style={{ gridColumn: '1 / -1', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>TOU Tariff Timeline (24h)</div>
                    <div style={{ display: 'flex', height: '24px', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#E5E7EB' }}>
                        {/* Mock timeline: Green off-peak, Red peak, Yellow standard */}
                        <div style={{ flex: 6, backgroundColor: '#00D4AA' }} title="00:00 - 06:00 (Off-Peak)"></div>
                        <div style={{ flex: 3, backgroundColor: '#FF6B6B' }} title="07:00 - 10:00 (Peak)"></div>
                        <div style={{ flex: 6, backgroundColor: '#FFB347' }} title="11:00 - 16:00 (Standard)"></div>
                        <div style={{ flex: 3, backgroundColor: '#FF6B6B' }} title="17:00 - 20:00 (Peak)"></div>
                        <div style={{ flex: 3, backgroundColor: '#00D4AA', position: 'relative' }} title="21:00 - 23:59 (Off-Peak)">
                            {/* Current Hour Indicator roughly at 22:00 */}
                            <div style={{ position: 'absolute', top: '-4px', bottom: '-4px', left: '33%', width: '4px', backgroundColor: '#1F2937', borderRadius: '2px' }}></div>
                        </div>
                    </div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
                        <span>00:00</span>
                        <span>12:00</span>
                        <span>23:59</span>
                    </div>
                </div>

                {cards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                        <div key={index} className="card" style={{ display: 'flex', flexDirection: 'column', padding: '1rem', minHeight: '140px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                                <div style={{ backgroundColor: card.bgColor, padding: '0.5rem', borderRadius: '50%' }}>
                                    <Icon size={20} color={card.color} />
                                </div>
                                <div style={{ fontWeight: 700, fontSize: '0.875rem', lineHeight: 1.2 }}>{card.title}</div>
                            </div>

                            <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                                {card.agent}
                            </div>

                            <div style={{ fontSize: '0.875rem', color: 'var(--text-primary)', flex: 1 }}>
                                {card.content}
                            </div>
                        </div>
                    );
                })}

                {/* B2B Lead Generation Section */}
                <div className="card" style={{ gridColumn: '1 / -1', padding: '1.5rem', marginTop: '1rem', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem' }}>

                        {!leadResult ? (
                            <>
                                <div>
                                    <h3 style={{ fontWeight: 800, fontSize: '1.25rem', color: '#1E293B', marginBottom: '0.5rem' }}>Ready to Go Solar?</h3>
                                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                        Generate a bankable energy prospect report and match with a verified local installer instantly.
                                    </p>
                                </div>
                                <button
                                    className="btn btn-primary"
                                    style={{ width: '100%', display: 'flex', gap: '0.5rem', backgroundColor: '#475569' }}
                                    onClick={handleApplyForSolar}
                                    disabled={applyingB2B}
                                >
                                    <Building size={20} />
                                    {applyingB2B ? 'Generating Report & Matching...' : 'Match with Local Installer'}
                                </button>
                            </>
                        ) : (
                            <div style={{ width: '100%', textAlign: 'left' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--accent)' }}>
                                    <CheckCircle size={24} />
                                    <span style={{ fontWeight: 700, fontSize: '1.125rem' }}>Matched with {leadResult.matched_installer}</span>
                                </div>

                                <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '8px', border: '1px dashed var(--accent)' }}>
                                    <div style={{ fontWeight: 800, color: 'var(--text-brand)', marginBottom: '0.75rem', fontSize: '0.875rem', textTransform: 'uppercase' }}>
                                        📄 Bankable Prospect Report
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Rec. Size</div>
                                            <div style={{ fontWeight: 700, fontSize: '1.125rem' }}>{leadResult.report.system_size_kw}kW</div>
                                        </div>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>ROI</div>
                                            <div style={{ fontWeight: 700, fontSize: '1.125rem' }}>{leadResult.report.roi_years}y</div>
                                        </div>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Score</div>
                                            <div style={{ fontWeight: 700, fontSize: '1.125rem', color: '#10B981' }}>{leadResult.report.prospect_score}%</div>
                                        </div>
                                    </div>

                                    <div style={{ fontSize: '0.875rem', fontStyle: 'italic', color: 'var(--text-secondary)', borderTop: '1px solid var(--border)', paddingTop: '0.75rem', textAlign: 'center' }}>
                                        "{leadResult.report.sales_hook}"
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
