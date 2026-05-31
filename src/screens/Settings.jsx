import React from 'react';
import { Settings as SettingsIcon, Bell, Zap, Sun } from 'lucide-react';

const Settings = ({ settings, onUpdateSettings }) => {
    const handleUpdate = (key, value) => {
        onUpdateSettings({ ...settings, [key]: value });
    };

    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Customize your energy agent.</div>

            <div className="content">
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Electricity Rate Setting */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <Zap size={20} color="var(--accent)" />
                            <label style={{ fontWeight: 600 }}>Electricity Rate ($/kWh)</label>
                        </div>
                        <input
                            type="number"
                            step="0.01"
                            className="input-field"
                            value={settings.electricityRate}
                            onChange={(e) => handleUpdate('electricityRate', parseFloat(e.target.value))}
                        />
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                            Check your last utility bill for this value.
                        </p>
                    </div>

                    {/* Solar System Size Setting */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <Sun size={20} color="#F59E0B" />
                            <label style={{ fontWeight: 600 }}>Ideal Solar System Size (kW)</label>
                        </div>
                        <input
                            type="number"
                            step="0.5"
                            className="input-field"
                            value={settings.systemSize}
                            onChange={(e) => handleUpdate('systemSize', parseFloat(e.target.value))}
                        />
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                            Used for calculating long-term savings goals.
                        </p>
                    </div>

                    {/* Notifications Setting */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Bell size={20} color="var(--text-brand)" />
                            <label style={{ fontWeight: 600 }}>Enable Notifications</label>
                        </div>
                        <input
                            type="checkbox"
                            style={{ transform: 'scale(1.5)', accentColor: 'var(--accent)' }}
                            checked={settings.notifications}
                            onChange={(e) => handleUpdate('notifications', e.target.checked)}
                        />
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                    <SettingsIcon size={24} color="var(--text-secondary)" style={{ marginBottom: '0.5rem' }} />
                    <p>Agent Version 1.0.0</p>
                    <p>Privacy-first local storage</p>
                </div>
            </div>
        </div>
    );
};

export default Settings;
