import React from 'react';
import { Settings as SettingsIcon, Save, Zap, Bell, Server } from 'lucide-react';

const Settings = ({ settings, onUpdateSettings }) => {

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        onUpdateSettings({
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSave = (e) => {
        e.preventDefault();
        alert('Settings saved successfully!');
    };

    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Manage your application preferences.</div>

            <div className="content">
                <form onSubmit={handleSave} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    <div>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                            <Zap size={18} color="var(--accent)" />
                            Energy Configuration
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Electricity Rate ($/kWh)</label>
                            <input
                                type="number"
                                name="electricityRate"
                                step="0.01"
                                min="0"
                                className="input-field"
                                value={settings.electricityRate}
                                onChange={handleChange}
                                style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                            />
                        </div>
                    </div>

                    <div>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                            <Server size={18} color="var(--accent)" />
                            System Configuration
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Inverter Configuration</label>
                            <select
                                name="inverterConfig"
                                className="input-field"
                                value={settings.inverterConfig}
                                onChange={handleChange}
                                style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', appearance: 'none' }}
                            >
                                <option value="3kW">3kW System</option>
                                <option value="5kW">5kW System</option>
                                <option value="8kW">8kW System</option>
                                <option value="10kW">10kW System</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                            <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Agent Memory</label>
                            <select
                                name="agentMemory"
                                className="input-field"
                                value={settings.agentMemory}
                                onChange={handleChange}
                                style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', appearance: 'none' }}
                            >
                                <option value="low">Low (Faster, less context)</option>
                                <option value="medium">Medium (Balanced)</option>
                                <option value="high">High (Slower, full context)</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                            <Bell size={18} color="var(--accent)" />
                            Preferences
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input
                                type="checkbox"
                                name="notificationsEnabled"
                                id="notificationsEnabled"
                                checked={settings.notificationsEnabled}
                                onChange={handleChange}
                                style={{ accentColor: 'var(--accent)', width: '18px', height: '18px' }}
                            />
                            <label htmlFor="notificationsEnabled" style={{ fontSize: '0.875rem', color: 'var(--text-primary)', cursor: 'pointer' }}>
                                Enable Push Notifications
                            </label>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                        <Save size={18} />
                        Save Settings
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Settings;
