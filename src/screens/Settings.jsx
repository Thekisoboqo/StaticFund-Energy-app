import React, { useState, useEffect } from 'react';

const Settings = () => {
    const [settings, setSettings] = useState(() => {
        const savedSettings = localStorage.getItem('appSettings');
        if (savedSettings) {
            try {
                return JSON.parse(savedSettings);
            } catch {
                console.error('Failed to parse settings from localStorage');
            }
        }
        return {
            electricityRate: 0.15,
            inverterConfig: '5kW',
            notificationsEnabled: true
        };
    });

    useEffect(() => {
        localStorage.setItem('appSettings', JSON.stringify(settings));
    }, [settings]);

    const handleRateChange = (e) => {
        setSettings({ ...settings, electricityRate: parseFloat(e.target.value) || 0 });
    };

    const handleInverterChange = (e) => {
        setSettings({ ...settings, inverterConfig: e.target.value });
    };

    const toggleNotifications = () => {
        setSettings({ ...settings, notificationsEnabled: !settings.notificationsEnabled });
    };

    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Manage your app preferences.</div>

            <div className="content">
                <div className="card">
                    <h3 style={{ marginBottom: '1rem' }}>General Preferences</h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Electricity Rate ($/kWh)</label>
                            <input
                                type="number"
                                step="0.01"
                                className="input-field"
                                value={settings.electricityRate}
                                onChange={handleRateChange}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Inverter Configuration</label>
                            <select
                                className="input-field"
                                value={settings.inverterConfig}
                                onChange={handleInverterChange}
                            >
                                <option value="3kW">3kW System</option>
                                <option value="5kW">5kW System</option>
                                <option value="8kW">8kW System</option>
                                <option value="10kW">10kW System</option>
                            </select>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                            <span style={{ fontWeight: 600 }}>Enable Notifications</span>
                            <button
                                onClick={toggleNotifications}
                                style={{
                                    width: '48px',
                                    height: '24px',
                                    borderRadius: '12px',
                                    backgroundColor: settings.notificationsEnabled ? 'var(--accent)' : 'var(--border)',
                                    position: 'relative',
                                    transition: 'background-color 0.3s'
                                }}
                            >
                                <div style={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    backgroundColor: 'white',
                                    position: 'absolute',
                                    top: '2px',
                                    left: settings.notificationsEnabled ? '26px' : '2px',
                                    transition: 'left 0.3s'
                                }} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
