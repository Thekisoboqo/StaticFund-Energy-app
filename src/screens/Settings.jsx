import React, { useState } from 'react';
import { Save } from 'lucide-react';

const Settings = ({ settings, onUpdateSettings }) => {
    const [localSettings, setLocalSettings] = useState(settings);

    const handleChange = (key, value) => {
        setLocalSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        onUpdateSettings(localSettings);
    };

    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Manage your app preferences and configurations.</div>

            <div className="content">
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Electricity Rate</h3>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Rate per kWh ($)</label>
                        <input
                            type="number"
                            step="0.01"
                            className="input-field"
                            value={localSettings.ratePerKwh}
                            onChange={(e) => handleChange('ratePerKwh', parseFloat(e.target.value))}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Base Monthly Cost ($)</label>
                        <input
                            type="number"
                            className="input-field"
                            value={localSettings.baseCost}
                            onChange={(e) => handleChange('baseCost', parseFloat(e.target.value))}
                        />
                    </div>
                </div>

                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>System Configuration</h3>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Inverter Capacity (kW)</label>
                        <input
                            type="number"
                            step="0.1"
                            className="input-field"
                            value={localSettings.inverterCapacity}
                            onChange={(e) => handleChange('inverterCapacity', parseFloat(e.target.value))}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Battery Capacity (kWh)</label>
                        <input
                            type="number"
                            step="0.1"
                            className="input-field"
                            value={localSettings.batteryCapacity}
                            onChange={(e) => handleChange('batteryCapacity', parseFloat(e.target.value))}
                        />
                    </div>
                </div>

                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Preferences</h3>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.875rem' }}>Enable Notifications</span>
                        <input
                            type="checkbox"
                            checked={localSettings.notificationsEnabled}
                            onChange={(e) => handleChange('notificationsEnabled', e.target.checked)}
                            style={{ width: '1.25rem', height: '1.25rem' }}
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.875rem' }}>Agent Memory</span>
                        <input
                            type="checkbox"
                            checked={localSettings.agentMemoryEnabled}
                            onChange={(e) => handleChange('agentMemoryEnabled', e.target.checked)}
                            style={{ width: '1.25rem', height: '1.25rem' }}
                        />
                    </div>
                </div>

                <button className="btn btn-primary" onClick={handleSave} style={{ marginTop: '1rem', width: '100%' }}>
                    <Save size={20} style={{ marginRight: '0.5rem' }} /> Save Settings
                </button>
            </div>
        </div>
    );
};

export default Settings;
