import React from 'react';
import { Bell, Trash2, Zap, DollarSign, Battery, Sun } from 'lucide-react';

const Settings = ({ settings, onUpdateSettings, onClearData }) => {
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
            <div className="sub-header">Manage your app preferences and data.</div>

            <div className="content">
                <div className="card card-mint">
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <DollarSign size={20} color="var(--accent)" />
                        Energy Cost
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-secondary)' }}>
                                Base Monthly Cost ($)
                            </label>
                            <input
                                type="number"
                                name="baseCost"
                                className="input-field"
                                value={settings.baseCost}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-secondary)' }}>
                                Electricity Rate ($/kWh)
                            </label>
                            <input
                                type="number"
                                name="electricityRate"
                                step="0.01"
                                className="input-field"
                                value={settings.electricityRate}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="card card-mint">
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Zap size={20} color="var(--accent)" />
                        Solar Goals
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-secondary)' }}>
                                Target Inverter Size (kW)
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Sun size={18} color="var(--text-secondary)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                                <input
                                    type="number"
                                    name="inverterSize"
                                    className="input-field"
                                    style={{ paddingLeft: '2.5rem' }}
                                    value={settings.inverterSize}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-secondary)' }}>
                                Target Battery Size (kWh)
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Battery size={18} color="var(--text-secondary)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                                <input
                                    type="number"
                                    name="batterySize"
                                    className="input-field"
                                    style={{ paddingLeft: '2.5rem' }}
                                    value={settings.batterySize}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card card-mint" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ background: 'var(--bg-blue)', padding: '0.5rem', borderRadius: '50%' }}>
                            <Bell size={20} color="var(--accent)" />
                        </div>
                        <div>
                            <div style={{ fontWeight: 600 }}>Notifications</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Get savings alerts</div>
                        </div>
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            name="notificationsEnabled"
                            style={{ display: 'none' }}
                            checked={settings.notificationsEnabled}
                            onChange={handleChange}
                        />
                        <div style={{
                            width: '40px',
                            height: '24px',
                            backgroundColor: settings.notificationsEnabled ? 'var(--accent)' : 'var(--bg-card)',
                            borderRadius: '12px',
                            position: 'relative',
                            transition: 'background-color 0.2s',
                            border: '1px solid var(--border)'
                        }}>
                            <div style={{
                                width: '18px',
                                height: '18px',
                                backgroundColor: settings.notificationsEnabled ? '#0A1110' : 'var(--text-secondary)',
                                borderRadius: '50%',
                                position: 'absolute',
                                top: '2px',
                                left: settings.notificationsEnabled ? '18px' : '2px',
                                transition: 'left 0.2s'
                            }} />
                        </div>
                    </label>
                </div>

                <div className="card" style={{ border: '1px solid #7F1D1D' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#EF4444', marginBottom: '0.5rem' }}>Danger Zone</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Permanently delete all your devices and settings.
                    </p>
                    <button
                        className="btn"
                        style={{ backgroundColor: 'transparent', border: '1px solid #EF4444', color: '#EF4444', width: '100%' }}
                        onClick={() => {
                            if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
                                onClearData();
                            }
                        }}
                    >
                        <Trash2 size={18} style={{ marginRight: '0.5rem' }} />
                        Clear All Data
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
