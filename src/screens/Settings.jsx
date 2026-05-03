import React from 'react';
import { Settings as SettingsIcon, Bell, Database, Zap, Cpu } from 'lucide-react';

const Settings = ({ settings, onUpdateSettings }) => {
    const handleChange = (key, value) => {
        onUpdateSettings({ [key]: value });
    };

    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Manage your privacy and preferences.</div>

            <div className="content">
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--text-brand)' }}>
                        <Zap size={20} />
                        <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Energy Profile</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Electricity Rate ($/kWh)</label>
                            <input
                                type="number"
                                step="0.01"
                                className="input-field"
                                value={settings.electricityRate}
                                onChange={(e) => handleChange('electricityRate', parseFloat(e.target.value) || 0)}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Inverter Config</label>
                            <select
                                className="input-field"
                                value={settings.inverterConfig}
                                onChange={(e) => handleChange('inverterConfig', e.target.value)}
                            >
                                <option value="3kW">3kW System</option>
                                <option value="5kW">5kW System</option>
                                <option value="8kW">8kW System</option>
                                <option value="10kW">10kW System</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--text-brand)' }}>
                        <Database size={20} />
                        <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Agent Memory & Data</h3>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                        <div>
                            <div style={{ fontWeight: 500 }}>Enable Agent Memory</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Allow agent to learn your habits</div>
                        </div>
                        <input
                            type="checkbox"
                            checked={settings.agentMemory}
                            onChange={(e) => handleChange('agentMemory', e.target.checked)}
                            style={{ width: '1.25rem', height: '1.25rem', accentColor: 'var(--accent)' }}
                        />
                    </div>
                    <button className="btn" style={{ width: '100%', marginTop: '1rem', border: '1px solid var(--border)', color: '#EF4444' }} onClick={() => {
                        if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
                            localStorage.clear();
                            window.location.reload();
                        }
                    }}>
                        Clear Local Data
                    </button>
                </div>

                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--text-brand)' }}>
                        <Bell size={20} />
                        <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Notifications</h3>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                        <div>
                            <div style={{ fontWeight: 500 }}>Savings Alerts</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Get notified of off-peak times</div>
                        </div>
                        <input
                            type="checkbox"
                            checked={settings.notifications}
                            onChange={(e) => handleChange('notifications', e.target.checked)}
                            style={{ width: '1.25rem', height: '1.25rem', accentColor: 'var(--accent)' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
