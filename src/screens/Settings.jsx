import React from 'react';

const Settings = ({ settings, setSettings }) => {
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings({
            ...settings,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Manage your app preferences and defaults.</div>

            <div className="content">
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Electricity Rate ($/kWh)</label>
                        <input
                            type="number"
                            name="electricityRate"
                            step="0.01"
                            className="input-field"
                            value={settings.electricityRate}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Inverter Configuration</label>
                        <select
                            name="inverterConfig"
                            className="input-field"
                            value={settings.inverterConfig}
                            onChange={handleChange}
                        >
                            <option value="3kW">3kW System</option>
                            <option value="5kW">5kW System</option>
                            <option value="8kW">8kW System</option>
                            <option value="10kW">10kW System</option>
                        </select>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                        <span style={{ fontWeight: 600 }}>Enable Notifications</span>
                        <input
                            type="checkbox"
                            name="notificationsEnabled"
                            checked={settings.notificationsEnabled}
                            onChange={handleChange}
                            style={{ width: '1.25rem', height: '1.25rem' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
