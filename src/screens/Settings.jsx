import React from 'react';
import { Settings as SettingsIcon, Bell, Zap, Battery } from 'lucide-react';

const Settings = ({ settings, onUpdateSettings }) => {
    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Customize your app experience.</div>

            <div className="content">
                <div className="card" style={{ padding: '1.5rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                        <Zap size={24} color="var(--accent)" />
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Energy Configuration</h3>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
                            Electricity Rate ($/kWh)
                        </label>
                        <input
                            type="number"
                            className="input-field"
                            value={settings?.electricityRate || ''}
                            onChange={(e) => onUpdateSettings({ electricityRate: parseFloat(e.target.value) || 0 })}
                            placeholder="e.g. 0.15"
                            step="0.01"
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
                            Target Inverter Size (kW)
                        </label>
                        <input
                            type="number"
                            className="input-field"
                            value={settings?.inverterSize || ''}
                            onChange={(e) => onUpdateSettings({ inverterSize: parseFloat(e.target.value) || 0 })}
                            placeholder="e.g. 5"
                        />
                    </div>
                </div>

                <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                        <Bell size={24} color="var(--accent)" />
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Notifications</h3>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <div style={{ fontWeight: 500 }}>Push Notifications</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Receive alerts for energy peaks.</div>
                        </div>
                        <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px' }}>
                            <input
                                type="checkbox"
                                checked={settings?.notifications || false}
                                onChange={(e) => onUpdateSettings({ notifications: e.target.checked })}
                                style={{ opacity: 0, width: 0, height: 0 }}
                            />
                            <span style={{
                                position: 'absolute',
                                cursor: 'pointer',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: (settings?.notifications || false) ? 'var(--accent)' : 'var(--border)',
                                transition: '.4s',
                                borderRadius: '24px'
                            }}>
                                <span style={{
                                    position: 'absolute',
                                    content: '""',
                                    height: '18px',
                                    width: '18px',
                                    left: '3px',
                                    bottom: '3px',
                                    backgroundColor: 'white',
                                    transition: '.4s',
                                    borderRadius: '50%',
                                    transform: (settings?.notifications || false) ? 'translateX(20px)' : 'none'
                                }} />
                            </span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
