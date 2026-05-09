import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Zap, Server, Bell, Database, HardDrive, DollarSign, Brain } from 'lucide-react';

const defaultSettings = {
    electricityRate: 0.15,
    inverterConfig: '5kW Hybrid',
    batterySize: '10kWh',
    notificationsEnabled: true,
    agentMemoryEnabled: true,
};

const Settings = () => {
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('appSettings');
        return saved ? JSON.parse(saved) : defaultSettings;
    });

    useEffect(() => {
        localStorage.setItem('appSettings', JSON.stringify(settings));
    }, [settings]);

    const handleToggle = (key) => {
        setSettings({ ...settings, [key]: !settings[key] });
    };

    const handleChange = (key, value) => {
        setSettings({ ...settings, [key]: value });
    };

    return (
        <div>
            <div className="header">Settings & Database</div>
            <div className="sub-header">Manage your local mock database and application preferences.</div>

            <div className="content">
                {/* User Config */}
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--text-brand)' }}>
                        <Zap size={20} />
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Energy Configuration</h3>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-secondary)' }}>
                                Electricity Rate ($/kWh)
                            </label>
                            <div style={{ position: 'relative' }}>
                                <DollarSign size={16} color="var(--text-secondary)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                                <input
                                    type="number"
                                    step="0.01"
                                    className="input-field"
                                    style={{ paddingLeft: '2.5rem' }}
                                    value={settings.electricityRate}
                                    onChange={(e) => handleChange('electricityRate', parseFloat(e.target.value))}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-secondary)' }}>
                                Inverter Configuration
                            </label>
                            <input
                                type="text"
                                className="input-field"
                                value={settings.inverterConfig}
                                onChange={(e) => handleChange('inverterConfig', e.target.value)}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-secondary)' }}>
                                Battery Size
                            </label>
                            <input
                                type="text"
                                className="input-field"
                                value={settings.batterySize}
                                onChange={(e) => handleChange('batterySize', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* System Prefs */}
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--text-brand)' }}>
                        <Server size={20} />
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>System Preferences</h3>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Bell size={18} color="var(--text-secondary)" />
                                <span>Push Notifications</span>
                            </div>
                            <button
                                onClick={() => handleToggle('notificationsEnabled')}
                                style={{
                                    width: '44px', height: '24px', borderRadius: '12px',
                                    backgroundColor: settings.notificationsEnabled ? 'var(--accent)' : 'var(--bg-card)',
                                    border: `1px solid ${settings.notificationsEnabled ? 'var(--accent)' : 'var(--border)'}`,
                                    position: 'relative', transition: 'all 0.2s'
                                }}
                            >
                                <div style={{
                                    position: 'absolute', top: '2px', left: settings.notificationsEnabled ? '22px' : '2px',
                                    width: '18px', height: '18px', borderRadius: '50%',
                                    backgroundColor: settings.notificationsEnabled ? 'var(--text-inverse)' : 'var(--text-secondary)',
                                    transition: 'all 0.2s'
                                }} />
                            </button>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Brain size={18} color="var(--text-secondary)" />
                                <span>Agent Memory</span>
                            </div>
                            <button
                                onClick={() => handleToggle('agentMemoryEnabled')}
                                style={{
                                    width: '44px', height: '24px', borderRadius: '12px',
                                    backgroundColor: settings.agentMemoryEnabled ? 'var(--accent)' : 'var(--bg-card)',
                                    border: `1px solid ${settings.agentMemoryEnabled ? 'var(--accent)' : 'var(--border)'}`,
                                    position: 'relative', transition: 'all 0.2s'
                                }}
                            >
                                <div style={{
                                    position: 'absolute', top: '2px', left: settings.agentMemoryEnabled ? '22px' : '2px',
                                    width: '18px', height: '18px', borderRadius: '50%',
                                    backgroundColor: settings.agentMemoryEnabled ? 'var(--text-inverse)' : 'var(--text-secondary)',
                                    transition: 'all 0.2s'
                                }} />
                            </button>
                        </div>
                    </div>
                </div>

                 {/* Database / Advanced */}
                 <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#F87171' }}>
                        <Database size={20} />
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Local Database</h3>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        All application state is persisted locally in your browser to maintain privacy and offline capabilities.
                    </p>
                    <button
                        onClick={() => {
                            if(window.confirm('Are you sure you want to clear all local data? This action cannot be undone.')) {
                                localStorage.clear();
                                window.location.reload();
                            }
                        }}
                        className="btn"
                        style={{ width: '100%', backgroundColor: 'transparent', border: '1px solid #451A1A', color: '#F87171' }}
                    >
                        <HardDrive size={18} style={{ marginRight: '0.5rem' }} />
                        Clear Local Data
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
