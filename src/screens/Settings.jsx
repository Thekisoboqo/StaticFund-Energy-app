import React, { useState, useEffect } from 'react';
import { Save, Trash2, Zap, Battery, DollarSign, Database, Bell } from 'lucide-react';

const Settings = ({ settings, setSettings, onClearData }) => {
    const [localSettings, setLocalSettings] = useState(settings);

    useEffect(() => {
        setLocalSettings(settings);
    }, [settings]);

    const handleChange = (key, value) => {
        setLocalSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        setSettings(localSettings);
        // Could add a toast or success feedback here
    };

    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Customize your application preferences.</div>

            <div className="content">
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                            <DollarSign size={18} color="var(--accent)" />
                            Electricity Rate ($/kWh)
                        </label>
                        <input
                            type="number"
                            className="input-field"
                            value={localSettings.electricityRate}
                            onChange={(e) => handleChange('electricityRate', parseFloat(e.target.value) || 0)}
                            step="0.01"
                        />
                    </div>

                    <div>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                            <Zap size={18} color="var(--accent)" />
                            Inverter Capacity (kW)
                        </label>
                        <input
                            type="number"
                            className="input-field"
                            value={localSettings.inverterCapacity}
                            onChange={(e) => handleChange('inverterCapacity', parseFloat(e.target.value) || 0)}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                            <Battery size={18} color="var(--accent)" />
                            Battery Capacity (kWh)
                        </label>
                        <input
                            type="number"
                            className="input-field"
                            value={localSettings.batteryCapacity}
                            onChange={(e) => handleChange('batteryCapacity', parseFloat(e.target.value) || 0)}
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                            <Database size={18} color="var(--accent)" />
                            Agent Memory
                        </label>
                        <label style={{ position: 'relative', display: 'inline-block', width: '40px', height: '24px' }}>
                            <input
                                type="checkbox"
                                style={{ opacity: 0, width: 0, height: 0 }}
                                checked={localSettings.agentMemory}
                                onChange={(e) => handleChange('agentMemory', e.target.checked)}
                            />
                            <span style={{
                                position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
                                backgroundColor: localSettings.agentMemory ? 'var(--accent)' : 'var(--border)',
                                transition: '0.4s', borderRadius: '24px'
                            }}>
                                <span style={{
                                    position: 'absolute', content: '""', height: '16px', width: '16px', left: '4px', bottom: '4px',
                                    backgroundColor: localSettings.agentMemory ? '#0A1110' : 'var(--text-secondary)',
                                    transition: '0.4s', borderRadius: '50%',
                                    transform: localSettings.agentMemory ? 'translateX(16px)' : 'translateX(0)'
                                }} />
                            </span>
                        </label>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                            <Bell size={18} color="var(--accent)" />
                            Notifications
                        </label>
                        <label style={{ position: 'relative', display: 'inline-block', width: '40px', height: '24px' }}>
                            <input
                                type="checkbox"
                                style={{ opacity: 0, width: 0, height: 0 }}
                                checked={localSettings.notificationsEnabled}
                                onChange={(e) => handleChange('notificationsEnabled', e.target.checked)}
                            />
                            <span style={{
                                position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
                                backgroundColor: localSettings.notificationsEnabled ? 'var(--accent)' : 'var(--border)',
                                transition: '0.4s', borderRadius: '24px'
                            }}>
                                <span style={{
                                    position: 'absolute', content: '""', height: '16px', width: '16px', left: '4px', bottom: '4px',
                                    backgroundColor: localSettings.notificationsEnabled ? '#0A1110' : 'var(--text-secondary)',
                                    transition: '0.4s', borderRadius: '50%',
                                    transform: localSettings.notificationsEnabled ? 'translateX(16px)' : 'translateX(0)'
                                }} />
                            </span>
                        </label>
                    </div>

                    <button className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }} onClick={handleSave}>
                        <Save size={20} style={{ marginRight: '0.5rem' }} /> Save Settings
                    </button>
                </div>

                <div className="card" style={{ borderColor: '#ef4444' }}>
                    <h3 style={{ color: '#ef4444', marginBottom: '0.5rem', fontSize: '1rem' }}>Danger Zone</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Permanently delete all tracked devices and reset settings to default values.
                    </p>
                    <button
                        className="btn"
                        style={{ width: '100%', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid #ef4444' }}
                        onClick={() => {
                            if (window.confirm("Are you sure you want to clear all data? This action cannot be undone.")) {
                                onClearData();
                            }
                        }}
                    >
                        <Trash2 size={20} style={{ marginRight: '0.5rem' }} /> Clear All Data
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
