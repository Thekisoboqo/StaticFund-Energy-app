import React from 'react';
import { Bell, Brain, Zap } from 'lucide-react';

const Settings = ({ settings, onSettingsChange }) => {
    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Customize your agent's configuration.</div>

            <div className="content">
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {/* Agent Memory Toggle */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ background: 'var(--bg-mint)', padding: '0.5rem', borderRadius: '8px' }}>
                                <Brain size={20} color="var(--accent)" />
                            </div>
                            <div>
                                <div style={{ fontWeight: 600 }}>Agent Memory</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Remember my habits</div>
                            </div>
                        </div>
                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={settings.agentMemory}
                                onChange={(e) => onSettingsChange({ ...settings, agentMemory: e.target.checked })}
                                style={{ width: '20px', height: '20px', accentColor: 'var(--accent)' }}
                            />
                        </label>
                    </div>

                    {/* Notifications Toggle */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ background: 'var(--bg-blue)', padding: '0.5rem', borderRadius: '8px' }}>
                                <Bell size={20} color="var(--accent)" />
                            </div>
                            <div>
                                <div style={{ fontWeight: 600 }}>Notifications</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Alerts for off-peak times</div>
                            </div>
                        </div>
                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={settings.notifications}
                                onChange={(e) => onSettingsChange({ ...settings, notifications: e.target.checked })}
                                style={{ width: '20px', height: '20px', accentColor: 'var(--accent)' }}
                            />
                        </label>
                    </div>

                    {/* Electricity Rate Input */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ background: 'var(--bg-orange)', padding: '0.5rem', borderRadius: '8px' }}>
                                <Zap size={20} color="var(--accent)" />
                            </div>
                            <div>
                                <div style={{ fontWeight: 600 }}>Electricity Rate ($/kWh)</div>
                            </div>
                        </div>
                        <input
                            type="number"
                            className="input-field"
                            step="0.01"
                            min="0"
                            value={settings.electricityRate}
                            onChange={(e) => onSettingsChange({ ...settings, electricityRate: parseFloat(e.target.value) || 0 })}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
