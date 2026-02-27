import React, { useEffect, useState } from 'react';
import { Activity, ShieldCheck, Zap, CloudLightning, Eye, Bell, Globe } from 'lucide-react';
import memoryService from '../services/memoryService';

const Dashboard = () => {
    const [recentMemories, setRecentMemories] = useState([]);

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

    const cards = [
        {
            title: 'System Health',
            agent: 'Coordinator Agent',
            icon: Activity,
            color: '#3B82F6',
            bgColor: '#DBEAFE',
            content: 'All systems optimal. 98% efficiency.',
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
            content: 'Clear skies. No outages predicted.',
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
            title: 'Notifications',
            agent: 'Alert System',
            icon: Bell,
            color: '#EF4444',
            bgColor: '#FEE2E2',
            content: '0 active alerts.',
        },
        {
            title: 'Community Impact',
            agent: 'StaticFund Network',
            icon: Globe,
            color: '#06B6D4',
            bgColor: '#CFFAFE',
            content: 'Local grid stable. You unlocked 2.4 MW of solar potential.',
        },
    ];

    return (
        <div>
            <div className="header">StaticFund Dashboard</div>
            <div className="sub-header">Multi-Agent System Overview</div>

            <div className="content" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem', paddingBottom: '2rem' }}>
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
            </div>
        </div>
    );
};

export default Dashboard;
