import React, { useState, useEffect } from 'react';
import { Bell, Zap, Sliders, Battery } from 'lucide-react';

const Settings = () => {
    const [rate, setRate] = useState(() => {
        return localStorage.getItem('electricityRate') || '0.15';
    });

    const [notifications, setNotifications] = useState(() => {
        return localStorage.getItem('notifications') === 'true';
    });

    const [inverterConfig, setInverterConfig] = useState(() => {
        return localStorage.getItem('inverterConfig') || 'default';
    });

    useEffect(() => {
        localStorage.setItem('electricityRate', rate);
    }, [rate]);

    useEffect(() => {
        localStorage.setItem('notifications', notifications.toString());
    }, [notifications]);

    useEffect(() => {
        localStorage.setItem('inverterConfig', inverterConfig);
    }, [inverterConfig]);

    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Customize your preferences and config.</div>

            <div className="content">
                <div className="card" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <Zap size={24} color="var(--accent)" />
                        <span style={{ fontWeight: 700, fontSize: '1.125rem' }}>Electricity Rate ($/kWh)</span>
                    </div>
                    <input
                        type="number"
                        className="input-field"
                        placeholder="e.g. 0.15"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        step="0.01"
                        min="0"
                    />
                </div>

                <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Bell size={24} color="var(--accent)" />
                        <span style={{ fontWeight: 700, fontSize: '1.125rem' }}>Notifications</span>
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={notifications}
                            onChange={(e) => setNotifications(e.target.checked)}
                            style={{ width: '20px', height: '20px', accentColor: 'var(--accent)' }}
                        />
                    </label>
                </div>

                <div className="card" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <Battery size={24} color="var(--accent)" />
                        <span style={{ fontWeight: 700, fontSize: '1.125rem' }}>Inverter Configuration</span>
                    </div>
                    <select
                        className="input-field"
                        value={inverterConfig}
                        onChange={(e) => setInverterConfig(e.target.value)}
                    >
                        <option value="default">Default</option>
                        <option value="grid-tied">Grid-Tied</option>
                        <option value="off-grid">Off-Grid</option>
                        <option value="hybrid">Hybrid</option>
                    </select>
                </div>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    padding: '0.5rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.75rem',
                    color: 'var(--text-primary)',
                    marginTop: '1rem'
                }}>
                    <Sliders size={14} />
                    <span>Configuration is saved locally to your device.</span>
                </div>
            </div>
        </div>
    );
};

export default Settings;
