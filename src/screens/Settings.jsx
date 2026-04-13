import React, { useState } from 'react';

const Settings = ({ settings, onUpdateSettings }) => {
    const [rate, setRate] = useState(settings?.electricityRate || 0.15);
    const [inverter, setInverter] = useState(settings?.inverterConfig || 'none');
    const [memory, setMemory] = useState(settings?.agentMemory || '');
    const [notifications, setNotifications] = useState(settings?.notifications ?? true);

    const handleSave = () => {
        onUpdateSettings({
            electricityRate: rate,
            inverterConfig: inverter,
            agentMemory: memory,
            notifications
        });
        alert("Settings saved locally!");
    };

    return (
        <div>
            <div className="header">App Settings</div>
            <div className="sub-header">Configure app and local mock settings.</div>

            <div className="content" style={{ paddingBottom: '90px' }}>
                <div className="card">
                    <h3 style={{ marginBottom: '1rem', fontWeight: 600 }}>Preferences</h3>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                            Electricity Rate ($/kWh)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            className="input-field"
                            value={rate}
                            onChange={(e) => setRate(parseFloat(e.target.value))}
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                            Inverter Configuration
                        </label>
                        <select
                            className="input-field"
                            value={inverter}
                            onChange={(e) => setInverter(e.target.value)}
                        >
                            <option value="none">None</option>
                            <option value="5kw">5kW Hybrid</option>
                            <option value="8kw">8kW Hybrid</option>
                            <option value="12kw">12kW Hybrid</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={notifications}
                                onChange={(e) => setNotifications(e.target.checked)}
                                style={{ width: '20px', height: '20px' }}
                            />
                            <span>Enable Notifications</span>
                        </label>
                    </div>
                </div>

                <div className="card">
                    <h3 style={{ marginBottom: '1rem', fontWeight: 600 }}>Mock Agent Memory</h3>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                            Simulate agent context for Insights
                        </label>
                        <textarea
                            className="input-field"
                            rows="4"
                            value={memory}
                            onChange={(e) => setMemory(e.target.value)}
                            placeholder="e.g. User wants to buy a battery in 6 months..."
                            style={{ resize: 'vertical' }}
                        />
                    </div>
                </div>

                <button
                    className="btn btn-primary"
                    style={{ width: '100%', marginTop: '1rem' }}
                    onClick={handleSave}
                >
                    Save Settings
                </button>
            </div>
        </div>
    );
};

export default Settings;
