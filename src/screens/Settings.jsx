import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Zap, Server, Shield, Bell } from 'lucide-react';

const Settings = () => {
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('appSettings');
        if (saved) {
            return JSON.parse(saved);
        }
        return {
            electricityRate: 0.15,
            inverterConfig: 'Hybrid',
            agentMemoryEnabled: true,
            notifications: true
        };
    });

    useEffect(() => {
        localStorage.setItem('appSettings', JSON.stringify(settings));
    }, [settings]);

    const updateSetting = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div>
            <div className="header">Preferences</div>
            <div className="sub-header">Customize your StaticFund experience.</div>

            <div className="content">
                {/* Rate Configuration */}
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Zap size={20} color="var(--accent)" />
                        <span style={{ fontWeight: 600, fontSize: '1.125rem' }}>Electricity Rate</span>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Cost per kWh ($)</label>
                        <input
                            type="number"
                            className="input-field"
                            step="0.01"
                            value={settings.electricityRate}
                            onChange={(e) => updateSetting('electricityRate', parseFloat(e.target.value))}
                        />
                    </div>
                </div>

                {/* Inverter Config */}
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Server size={20} color="var(--accent)" />
                        <span style={{ fontWeight: 600, fontSize: '1.125rem' }}>Inverter Configuration</span>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>System Type</label>
                        <select
                            className="input-field"
                            value={settings.inverterConfig}
                            onChange={(e) => updateSetting('inverterConfig', e.target.value)}
                            style={{ width: '100%' }}
                        >
                            <option value="Off-Grid">Off-Grid</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="Grid-Tied">Grid-Tied</option>
                        </select>
                    </div>
                </div>

                {/* Privacy Filter Agent Features */}
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Shield size={20} color="var(--accent)" />
                        <span style={{ fontWeight: 600, fontSize: '1.125rem' }}>Agent Settings</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontWeight: 600 }}>Local Memory</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Persist agent context securely on device</div>
                        </div>
                        <label style={{ position: 'relative', display: 'inline-block', width: '40px', height: '20px' }}>
                            <input
                                type="checkbox"
                                checked={settings.agentMemoryEnabled}
                                onChange={(e) => updateSetting('agentMemoryEnabled', e.target.checked)}
                                style={{ opacity: 0, width: 0, height: 0 }}
                            />
                            <span style={{
                                position: 'absolute',
                                cursor: 'pointer',
                                top: 0, left: 0, right: 0, bottom: 0,
                                backgroundColor: settings.agentMemoryEnabled ? 'var(--accent)' : 'var(--border)',
                                transition: '.4s',
                                borderRadius: '20px'
                            }}>
                                <span style={{
                                    position: 'absolute',
                                    content: "",
                                    height: '16px', width: '16px',
                                    left: settings.agentMemoryEnabled ? '22px' : '2px',
                                    bottom: '2px',
                                    backgroundColor: 'white',
                                    transition: '.4s',
                                    borderRadius: '50%'
                                }} />
                            </span>
                        </label>
                    </div>
                </div>

                {/* Notifications */}
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Bell size={20} color="var(--accent)" />
                        <span style={{ fontWeight: 600, fontSize: '1.125rem' }}>Notifications</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontWeight: 600 }}>Push Alerts</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Receive savings tips & alerts</div>
                        </div>
                        <label style={{ position: 'relative', display: 'inline-block', width: '40px', height: '20px' }}>
                            <input
                                type="checkbox"
                                checked={settings.notifications}
                                onChange={(e) => updateSetting('notifications', e.target.checked)}
                                style={{ opacity: 0, width: 0, height: 0 }}
                            />
                            <span style={{
                                position: 'absolute',
                                cursor: 'pointer',
                                top: 0, left: 0, right: 0, bottom: 0,
                                backgroundColor: settings.notifications ? 'var(--accent)' : 'var(--border)',
                                transition: '.4s',
                                borderRadius: '20px'
                            }}>
                                <span style={{
                                    position: 'absolute',
                                    content: "",
                                    height: '16px', width: '16px',
                                    left: settings.notifications ? '22px' : '2px',
                                    bottom: '2px',
                                    backgroundColor: 'white',
                                    transition: '.4s',
                                    borderRadius: '50%'
                                }} />
                            </span>
                        </label>
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                    StaticFund v1.0.0
                </div>
            </div>
        </div>
    );
};

export default Settings;
