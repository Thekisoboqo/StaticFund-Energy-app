import React from 'react';
import { Sun, Moon, Info, Refrigerator, Tv, Zap } from 'lucide-react';

const Audit = ({ devices, onUpdate, onScreenChange }) => {
    const handleHoursChange = (id, hours) => {
        onUpdate(id, { hours: parseFloat(hours) });
    };

    const getIcon = (name) => {
        const lower = name.toLowerCase();
        if (lower.includes('fridge')) return <Refrigerator size={24} />;
        if (lower.includes('tv')) return <Tv size={24} />;
        return <Zap size={24} />;
    };

    const getContextBadge = (name) => {
        const lower = name.toLowerCase();
        if (lower.includes('tv')) return "Most people watch for ~4 hours.";
        if (lower.includes('fridge')) return "Runs constantly.";
        if (lower.includes('heater')) return "High energy consumer.";
        return "Adjust usage to save.";
    };

    return (
        <div>
            <div className="header">Daily Habits</div>
            <div className="sub-header">Tell us how you use your devices.</div>

            <div className="content">
                {devices.map((device) => (
                    <div key={device.id} className="card card-mint" style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                backgroundColor: 'var(--bg-card)',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--text-brand)',
                                boxShadow: 'var(--shadow-sm)'
                            }}>
                                {getIcon(device.name)}
                            </div>
                            <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontWeight: 700, fontSize: '1.125rem' }}>{device.name}</span>
                                <span style={{ fontWeight: 600 }}>{device.hours || 0} hrs/day</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <Sun size={20} color="var(--accent)" />
                            <input
                                type="range"
                                min="0"
                                max="24"
                                step="0.5"
                                value={device.hours || 0}
                                onChange={(e) => handleHoursChange(device.id, e.target.value)}
                            />
                            <Moon size={20} color="var(--text-secondary)" />
                        </div>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            backgroundColor: 'rgba(255,255,255,0.6)',
                            padding: '0.5rem 0.75rem',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.75rem',
                            color: 'var(--text-secondary)'
                        }}>
                            <Info size={14} />
                            <span>{getContextBadge(device.name)}</span>
                        </div>
                    </div>
                ))}

                <button
                    className="btn btn-primary"
                    style={{ marginTop: '1rem', width: '100%', fontSize: '1.125rem' }}
                    onClick={() => onScreenChange && onScreenChange('insights')} // Assuming onScreenChange is passed or handled via Layout
                >
                    See My Savings Plan
                </button>
            </div>
        </div>
    );
};

export default Audit;
