import React, { useState, useEffect } from 'react';
import { Trash2, Cpu, Database, Bell } from 'lucide-react';

const Settings = () => {
    const [inverterConfig, setInverterConfig] = useState(() => localStorage.getItem('inverterConfig') || 'Standard 5kW');
    const [agentMemory, setAgentMemory] = useState(() => localStorage.getItem('agentMemory') || 'Enabled');
    const [notifications, setNotifications] = useState(() => localStorage.getItem('notifications') === 'true');

    useEffect(() => {
        localStorage.setItem('inverterConfig', inverterConfig);
        localStorage.setItem('agentMemory', agentMemory);
        localStorage.setItem('notifications', notifications.toString());
    }, [inverterConfig, agentMemory, notifications]);

    const handleClearData = () => {
        if (window.confirm("Are you sure you want to clear all data? This will remove your devices and reset settings.")) {
            localStorage.removeItem('devices');
            localStorage.removeItem('inverterConfig');
            localStorage.removeItem('agentMemory');
            localStorage.removeItem('notifications');
            window.location.reload();
        }
    };

    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Manage your app configurations.</div>

            <div className="content">
                <div className="card" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--text-brand)' }}>
                        <Cpu size={20} />
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Inverter Configuration</h3>
                    </div>
                    <select
                        className="input-field"
                        value={inverterConfig}
                        onChange={(e) => setInverterConfig(e.target.value)}
                        style={{ marginBottom: '1rem' }}
                    >
                        <option value="Standard 5kW">Standard 5kW</option>
                        <option value="Premium 8kW">Premium 8kW</option>
                        <option value="Heavy Duty 12kW">Heavy Duty 12kW</option>
                    </select>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--text-brand)' }}>
                        <Database size={20} />
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Agent Memory</h3>
                    </div>
                    <select
                        className="input-field"
                        value={agentMemory}
                        onChange={(e) => setAgentMemory(e.target.value)}
                        style={{ marginBottom: '1rem' }}
                    >
                        <option value="Enabled">Enabled (Learning)</option>
                        <option value="Disabled">Disabled (Static)</option>
                    </select>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--text-brand)' }}>
                        <Bell size={20} />
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Notifications</h3>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={notifications}
                                onChange={(e) => setNotifications(e.target.checked)}
                                style={{ width: '1.2rem', height: '1.2rem', accentColor: 'var(--accent)' }}
                            />
                            <span>Enable Daily Insights</span>
                        </label>
                    </div>

                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', marginTop: '1rem' }}>
                        <button
                            className="btn"
                            style={{
                                width: '100%',
                                border: '1px solid #EF4444',
                                color: '#EF4444',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                justifyContent: 'center'
                            }}
                            onClick={handleClearData}
                        >
                            <Trash2 size={20} />
                            Clear All Local Data
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;