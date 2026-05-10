import React from 'react';
import { Settings as SettingsIcon, Bell, Zap } from 'lucide-react';

const Settings = ({ settings, onUpdateSettings }) => {
    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Customize your application preferences.</div>

            <div className="content">
                <div className="card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{ background: 'var(--bg-blue)', padding: '0.5rem', borderRadius: '50%' }}>
                            <Zap size={20} color="var(--accent)" />
                        </div>
                        <span style={{ fontWeight: 600 }}>Electricity Rate ($/kWh)</span>
                    </div>
                    <input
                        type="number"
                        className="input-field"
                        value={settings.rate}
                        step="0.01"
                        onChange={(e) => onUpdateSettings({ ...settings, rate: parseFloat(e.target.value) || 0 })}
                    />
                </div>

                <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ background: 'var(--bg-mint)', padding: '0.5rem', borderRadius: '50%' }}>
                            <Bell size={20} color="var(--accent)" />
                        </div>
                        <span style={{ fontWeight: 600 }}>Push Notifications</span>
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="checkbox"
                                style={{ srOnly: true, opacity: 0, position: 'absolute' }}
                                checked={settings.notifications}
                                onChange={(e) => onUpdateSettings({ ...settings, notifications: e.target.checked })}
                            />
                            <div style={{
                                width: '40px',
                                height: '24px',
                                backgroundColor: settings.notifications ? 'var(--accent)' : 'var(--text-secondary)',
                                borderRadius: '12px',
                                transition: 'background-color 0.2s',
                                position: 'relative'
                            }}>
                                <div style={{
                                    width: '18px',
                                    height: '18px',
                                    backgroundColor: 'white',
                                    borderRadius: '50%',
                                    position: 'absolute',
                                    top: '3px',
                                    left: settings.notifications ? '19px' : '3px',
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
