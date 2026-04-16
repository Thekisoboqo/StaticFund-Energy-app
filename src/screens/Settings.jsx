import React, { useState } from 'react';

const Settings = () => {
    const [rate, setRate] = useState(() => {
        const saved = JSON.parse(localStorage.getItem('appSettings')) || {};
        return saved.rate || '';
    });
    const [inverter, setInverter] = useState(() => {
        const saved = JSON.parse(localStorage.getItem('appSettings')) || {};
        return saved.inverter || '';
    });
    const [agentMemory, setAgentMemory] = useState(() => {
        const saved = JSON.parse(localStorage.getItem('appSettings')) || {};
        return saved.agentMemory || '';
    });
    const [notifications, setNotifications] = useState(() => {
        const saved = JSON.parse(localStorage.getItem('appSettings')) || {};
        return saved.notifications || false;
    });

    const saveSettings = (newSettings) => {
        const updatedSettings = { rate, inverter, agentMemory, notifications, ...newSettings };
        localStorage.setItem('appSettings', JSON.stringify(updatedSettings));
    };

    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Configure your app preferences.</div>

            <div className="content" style={{ paddingBottom: '90px' }}>
                <div className="card">
                    <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem' }}>Preferences</h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Electricity Rate ($/kWh)</label>
                            <input
                                type="number"
                                className="input-field"
                                value={rate}
                                onChange={(e) => {
                                    setRate(e.target.value);
                                    saveSettings({ rate: e.target.value });
                                }}
                                placeholder="e.g. 0.15"
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Inverter Configuration</label>
                            <select
                                className="input-field"
                                value={inverter}
                                onChange={(e) => {
                                    setInverter(e.target.value);
                                    saveSettings({ inverter: e.target.value });
                                }}
                            >
                                <option value="">Select Inverter</option>
                                <option value="5kw">5kW Hybrid</option>
                                <option value="8kw">8kW Hybrid</option>
                                <option value="10kw">10kW Hybrid</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Agent Memory Level</label>
                            <select
                                className="input-field"
                                value={agentMemory}
                                onChange={(e) => {
                                    setAgentMemory(e.target.value);
                                    saveSettings({ agentMemory: e.target.value });
                                }}
                            >
                                <option value="">Select Memory Level</option>
                                <option value="low">Low (Session only)</option>
                                <option value="medium">Medium (Recent context)</option>
                                <option value="high">High (Full history)</option>
                            </select>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: 600 }}>Enable Notifications</span>
                            <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px' }}>
                                <input
                                    type="checkbox"
                                    style={{ opacity: 0, width: 0, height: 0 }}
                                    checked={notifications}
                                    onChange={(e) => {
                                        setNotifications(e.target.checked);
                                        saveSettings({ notifications: e.target.checked });
                                    }}
                                />
                                <span style={{
                                    position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
                                    backgroundColor: notifications ? 'var(--accent)' : '#E5E7EB',
                                    transition: '.4s', borderRadius: '24px'
                                }}>
                                    <span style={{
                                        position: 'absolute', content: '""', height: '18px', width: '18px', left: '3px', bottom: '3px',
                                        backgroundColor: 'white', transition: '.4s', borderRadius: '50%',
                                        transform: notifications ? 'translateX(20px)' : 'translateX(0)'
                                    }} />
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
