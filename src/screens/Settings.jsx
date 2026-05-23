import React from 'react';
import { Settings as SettingsIcon, Bell, Zap, Cpu, Database } from 'lucide-react';

const Settings = ({ settings, onUpdate }) => {
    const handleChange = (field, value) => {
        onUpdate({ ...settings, [field]: value });
    };

    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Manage your application configurations.</div>

            <div className="content">
                {/* Electricity Rate */}
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <Zap size={20} color="var(--accent)" />
                        <h3 style={{ fontWeight: 600 }}>Electricity Rate ($/kWh)</h3>
                    </div>
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        className="input-field"
                        value={settings.electricityRate}
                        onChange={(e) => handleChange('electricityRate', parseFloat(e.target.value))}
                    />
                </div>

                {/* Inverter Configuration */}
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <Cpu size={20} color="var(--accent)" />
                        <h3 style={{ fontWeight: 600 }}>Inverter Configuration</h3>
                    </div>
                    <select
                        className="input-field"
                        value={settings.inverterConfig}
                        onChange={(e) => handleChange('inverterConfig', e.target.value)}
                    >
                        <option value="3kW System">3kW System</option>
                        <option value="5kW System">5kW System</option>
                        <option value="8kW System">8kW System</option>
                        <option value="10kW System">10kW System</option>
                    </select>
                </div>

                {/* Toggles */}
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {/* Agent Memory Toggle */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Database size={20} color="var(--text-secondary)" />
                            <span style={{ fontWeight: 500 }}>Agent Memory</span>
                        </div>
                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={settings.agentMemory}
                                onChange={(e) => handleChange('agentMemory', e.target.checked)}
                                style={{ width: '1.25rem', height: '1.25rem', accentColor: 'var(--accent)' }}
                            />
                        </label>
                    </div>

                    <div style={{ height: '1px', backgroundColor: 'var(--border)' }}></div>

                    {/* Notifications Toggle */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Bell size={20} color="var(--text-secondary)" />
                            <span style={{ fontWeight: 500 }}>Notifications</span>
                        </div>
                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={settings.notifications}
                                onChange={(e) => handleChange('notifications', e.target.checked)}
                                style={{ width: '1.25rem', height: '1.25rem', accentColor: 'var(--accent)' }}
                            />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
