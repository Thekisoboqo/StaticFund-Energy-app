import React from 'react';
import { DollarSign, Zap, BrainCircuit, Bell, Save } from 'lucide-react';

const Settings = ({ settings, onUpdateSettings }) => {
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        onUpdateSettings({
            [name]: type === 'checkbox' ? checked : value
        });
    };

    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Manage your preferences and system configuration.</div>

            <div className="content">
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                        <DollarSign size={20} color="var(--accent)" />
                        <span>Electricity Rate ($/kWh)</span>
                    </div>
                    <input
                        type="number"
                        step="0.01"
                        className="input-field"
                        name="electricityRate"
                        value={settings.electricityRate}
                        onChange={handleChange}
                        placeholder="e.g. 0.15"
                    />
                </div>

                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                        <Zap size={20} color="var(--accent)" />
                        <span>Inverter Configuration</span>
                    </div>
                    <select
                        className="input-field"
                        name="inverterConfig"
                        value={settings.inverterConfig}
                        onChange={handleChange}
                    >
                        <option value="3kW System">3kW System</option>
                        <option value="5kW System">5kW System</option>
                        <option value="8kW System">8kW System</option>
                        <option value="10kW System">10kW System</option>
                    </select>
                </div>

                <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                        <BrainCircuit size={20} color="var(--accent)" />
                        <span>Agent Memory</span>
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            name="agentMemory"
                            checked={settings.agentMemory}
                            onChange={handleChange}
                            style={{ width: '1.25rem', height: '1.25rem', accentColor: 'var(--accent)' }}
                        />
                    </label>
                </div>

                <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                        <Bell size={20} color="var(--accent)" />
                        <span>Notifications</span>
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            name="notifications"
                            checked={settings.notifications}
                            onChange={handleChange}
                            style={{ width: '1.25rem', height: '1.25rem', accentColor: 'var(--accent)' }}
                        />
                    </label>
                </div>

                <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    Settings are automatically saved to your device.
                </div>
            </div>
        </div>
    );
};

export default Settings;
