import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Bell, Zap, Battery } from 'lucide-react';

const Settings = () => {
    const [electricityRate, setElectricityRate] = useState(() => {
        const stored = localStorage.getItem('electricityRate');
        return stored !== null ? parseFloat(stored) : 0.15;
    });

    const [inverterSize, setInverterSize] = useState(() => {
        const stored = localStorage.getItem('inverterSize');
        return stored !== null ? parseFloat(stored) : 5;
    });

    const [notifications, setNotifications] = useState(() => {
        const stored = localStorage.getItem('notifications');
        return stored !== null ? stored === 'true' : true;
    });

    useEffect(() => {
        localStorage.setItem('electricityRate', electricityRate.toString());
    }, [electricityRate]);

    useEffect(() => {
        localStorage.setItem('inverterSize', inverterSize.toString());
    }, [inverterSize]);

    useEffect(() => {
        localStorage.setItem('notifications', notifications.toString());
    }, [notifications]);

    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Customize your app experience.</div>

            <div className="content">
                <div className="card" style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <Zap size={20} color="var(--accent)" />
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Energy Profile</h3>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                Electricity Rate ($ / kWh)
                            </label>
                            <input
                                type="number"
                                className="input-field"
                                value={electricityRate}
                                step="0.01"
                                min="0"
                                onChange={(e) => setElectricityRate(e.target.value)}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                Target Inverter Size (kW)
                            </label>
                            <input
                                type="number"
                                className="input-field"
                                value={inverterSize}
                                step="0.5"
                                min="0"
                                onChange={(e) => setInverterSize(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <Bell size={20} color="var(--accent)" />
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Preferences</h3>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.875rem' }}>Push Notifications</span>
                        <button
                            onClick={() => setNotifications(!notifications)}
                            style={{
                                width: '44px',
                                height: '24px',
                                backgroundColor: notifications ? 'var(--accent)' : 'var(--bg-primary)',
                                border: '1px solid var(--border)',
                                borderRadius: '12px',
                                position: 'relative',
                                transition: 'all 0.2s',
                                cursor: 'pointer'
                            }}
                        >
                            <div style={{
                                width: '18px',
                                height: '18px',
                                backgroundColor: notifications ? '#0A1110' : 'var(--text-secondary)',
                                borderRadius: '50%',
                                position: 'absolute',
                                top: '2px',
                                left: notifications ? '22px' : '2px',
                                transition: 'all 0.2s'
                            }} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
