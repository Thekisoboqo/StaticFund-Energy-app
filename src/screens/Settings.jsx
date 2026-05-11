import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';

const Settings = () => {
    const [rate, setRate] = useState(() => {
        const saved = localStorage.getItem('electricityRate');
        return saved ? parseFloat(saved) : 0.15;
    });

    const [inverterConfig, setInverterConfig] = useState(() => {
        return localStorage.getItem('inverterConfig') || 'default';
    });

    const [agentMemory, setAgentMemory] = useState(() => {
        return localStorage.getItem('agentMemory') === 'true' || localStorage.getItem('agentMemory') === null;
    });

    const [notifications, setNotifications] = useState(() => {
        return localStorage.getItem('notifications') === 'true';
    });

    const [savedMessage, setSavedMessage] = useState(false);

    useEffect(() => {
        localStorage.setItem('electricityRate', rate.toString());
        localStorage.setItem('inverterConfig', inverterConfig);
        localStorage.setItem('agentMemory', agentMemory.toString());
        localStorage.setItem('notifications', notifications.toString());
    }, [rate, inverterConfig, agentMemory, notifications]);

    const handleSave = (setter, value) => {
        setter(value);
        setSavedMessage(true);
        setTimeout(() => setSavedMessage(false), 2000);
    };

    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Manage your preferences.</div>

            <div className="content">
                <div className="card">
                    <h3 style={{ marginBottom: '1rem', color: 'var(--text-brand)' }}>Energy Settings</h3>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                            Electricity Rate ($/kWh)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            className="input-field"
                            value={rate}
                            onChange={(e) => handleSave(setRate, parseFloat(e.target.value) || 0)}
                        />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                            Inverter Configuration
                        </label>
                        <select
                            className="input-field"
                            value={inverterConfig}
                            onChange={(e) => handleSave(setInverterConfig, e.target.value)}
                        >
                            <option value="default">Default Setup</option>
                            <option value="solar">Solar Focus</option>
                            <option value="battery">Battery Backup Focus</option>
                        </select>
                    </div>
                </div>

                <div className="card" style={{ marginTop: '1rem' }}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--text-brand)' }}>App Preferences</h3>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <div>
                            <div style={{ fontWeight: 500 }}>Agent Memory</div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Remember past interactions</div>
                        </div>
                        <input
                            type="checkbox"
                            checked={agentMemory}
                            onChange={(e) => handleSave(setAgentMemory, e.target.checked)}
                            style={{ width: '20px', height: '20px', accentColor: 'var(--accent)' }}
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <div style={{ fontWeight: 500 }}>Push Notifications</div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Get energy alerts</div>
                        </div>
                        <input
                            type="checkbox"
                            checked={notifications}
                            onChange={(e) => handleSave(setNotifications, e.target.checked)}
                            style={{ width: '20px', height: '20px', accentColor: 'var(--accent)' }}
                        />
                    </div>
                </div>

                {savedMessage && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        color: 'var(--accent)',
                        marginTop: '1rem',
                        fontWeight: 500
                    }}>
                        <Save size={18} />
                        Settings saved automatically
                    </div>
                )}
            </div>
        </div>
    );
};

export default Settings;
