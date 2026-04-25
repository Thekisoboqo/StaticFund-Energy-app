import React from 'react';

const Settings = ({ settings, onUpdateSettings }) => {
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        onUpdateSettings({
            ...settings,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Customize your app preferences.</div>

            <div className="content">
                <div className="card">
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Preferences</h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Electricity Rate ($/kWh)</label>
                            <input
                                type="number"
                                name="electricityRate"
                                className="input-field"
                                value={settings.electricityRate || ''}
                                onChange={handleChange}
                                placeholder="0.15"
                                step="0.01"
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Inverter Configuration</label>
                            <select
                                name="inverterConfig"
                                className="input-field"
                                value={settings.inverterConfig || 'none'}
                                onChange={handleChange}
                            >
                                <option value="none">No Inverter</option>
                                <option value="3kw">3kW System</option>
                                <option value="5kw">5kW System</option>
                                <option value="8kw">8kW+ System</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    name="agentMemory"
                                    checked={settings.agentMemory || false}
                                    onChange={handleChange}
                                    style={{ width: '20px', height: '20px', accentColor: 'var(--accent)' }}
                                />
                                <span style={{ fontWeight: 600 }}>Enable Agent Memory</span>
                            </label>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginLeft: '1.75rem' }}>
                                Allows the app to learn from your daily habits for better insights.
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    name="notifications"
                                    checked={settings.notifications || false}
                                    onChange={handleChange}
                                    style={{ width: '20px', height: '20px', accentColor: 'var(--accent)' }}
                                />
                                <span style={{ fontWeight: 600 }}>Enable Notifications</span>
                            </label>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginLeft: '1.75rem' }}>
                                Receive alerts for off-peak hours and energy saving tips.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
