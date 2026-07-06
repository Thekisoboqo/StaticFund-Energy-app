import React from 'react';
import { Settings as SettingsIcon, Bell, Zap, Cpu, Database } from 'lucide-react';

const Settings = ({ settings, onUpdateSettings }) => {
    const handleToggle = (key) => {
        onUpdateSettings({ ...settings, [key]: !settings[key] });
    };

    const handleChange = (key, value) => {
        onUpdateSettings({ ...settings, [key]: value });
    };

    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Customize your app preferences.</div>

            <div className="content">
                {/* Electricity Rate */}
                <div className="card" style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{ background: '#FEF3C7', padding: '0.5rem', borderRadius: '50%' }}>
                            <Zap size={20} color="#D97706" />
                        </div>
                        <div style={{ fontWeight: 600 }}>Electricity Rate ($/kWh)</div>
                    </div>
                    <input
                        type="number"
                        className="input-field"
                        value={settings.electricityRate}
                        onChange={(e) => handleChange('electricityRate', parseFloat(e.target.value) || 0)}
                        step="0.01"
                    />
                </div>

                {/* Inverter Configuration */}
                <div className="card" style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{ background: '#DBEAFE', padding: '0.5rem', borderRadius: '50%' }}>
                            <Cpu size={20} color="#2563EB" />
                        </div>
                        <div style={{ fontWeight: 600 }}>Inverter Configuration</div>
                    </div>
                    <select
                        className="input-field"
                        value={settings.inverterType}
                        onChange={(e) => handleChange('inverterType', e.target.value)}
                        style={{ appearance: 'auto' }}
                    >
                        <option value="none">None</option>
                        <option value="hybrid">Hybrid</option>
                        <option value="off-grid">Off-Grid</option>
                        <option value="grid-tied">Grid-Tied</option>
                    </select>
                </div>

                {/* Agent Memory */}
                <div className="card" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ background: '#E0E7FF', padding: '0.5rem', borderRadius: '50%' }}>
                            <Database size={20} color="#4F46E5" />
                        </div>
                        <div>
                            <div style={{ fontWeight: 600 }}>Agent Memory</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Allow agent to remember past interactions</div>
                        </div>
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="checkbox"
                                style={{ opacity: 0, position: 'absolute', width: '100%', height: '100%', cursor: 'pointer' }}
                                checked={settings.agentMemory}
                                onChange={() => handleToggle('agentMemory')}
                            />
                            <div style={{
                                width: '40px',
                                height: '24px',
                                backgroundColor: settings.agentMemory ? 'var(--accent)' : 'var(--border)',
                                borderRadius: '12px',
                                transition: 'background-color 0.2s',
                                position: 'relative'
                            }}>
                                <div style={{
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: 'white',
                                    borderRadius: '50%',
                                    position: 'absolute',
                                    top: '2px',
                                    left: settings.agentMemory ? '18px' : '2px',
                                    transition: 'left 0.2s',
                                    boxShadow: 'var(--shadow-sm)'
                                }} />
                            </div>
                        </div>
                    </label>
                </div>

                {/* Notifications */}
                <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ background: '#FCE7F3', padding: '0.5rem', borderRadius: '50%' }}>
                            <Bell size={20} color="#DB2777" />
                        </div>
                        <div>
                            <div style={{ fontWeight: 600 }}>Notifications</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Receive alerts and insights</div>
                        </div>
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="checkbox"
                                style={{ opacity: 0, position: 'absolute', width: '100%', height: '100%', cursor: 'pointer' }}
                                checked={settings.notifications}
                                onChange={() => handleToggle('notifications')}
                            />
                            <div style={{
                                width: '40px',
                                height: '24px',
                                backgroundColor: settings.notifications ? 'var(--accent)' : 'var(--border)',
                                borderRadius: '12px',
                                transition: 'background-color 0.2s',
                                position: 'relative'
                            }}>
                                <div style={{
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: 'white',
                                    borderRadius: '50%',
                                    position: 'absolute',
                                    top: '2px',
                                    left: settings.notifications ? '18px' : '2px',
                                    transition: 'left 0.2s',
                                    boxShadow: 'var(--shadow-sm)'
                                }} />
                            </div>
                        </div>
                    </label>
                </div>

            </div>
        </div>
    );
};

export default Settings;
