import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Bell, Zap, Cpu } from 'lucide-react';

const Settings = ({ settings, onUpdateSettings }) => {
    const [rate, setRate] = useState(settings.rate || 0.15);
    const [notifications, setNotifications] = useState(settings.notifications || false);
    const [inverterSize, setInverterSize] = useState(settings.inverterSize || 5);

    useEffect(() => {
        onUpdateSettings({ rate, notifications, inverterSize });
    }, [rate, notifications, inverterSize, onUpdateSettings]);

    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Customize your energy profile.</div>

            <div className="content">
                <div className="card" style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: 'var(--bg-card)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--accent)',
                            boxShadow: 'var(--shadow-sm)'
                        }}>
                            <Zap size={24} />
                        </div>
                        <span style={{ fontWeight: 600, fontSize: '1.125rem' }}>Electricity Rate ($/kWh)</span>
                    </div>
                    <input
                        type="number"
                        step="0.01"
                        className="input-field"
                        value={rate}
                        onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
                    />
                </div>

                <div className="card" style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: 'var(--bg-card)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--accent)',
                            boxShadow: 'var(--shadow-sm)'
                        }}>
                            <Cpu size={24} />
                        </div>
                        <span style={{ fontWeight: 600, fontSize: '1.125rem' }}>Inverter Size (kW)</span>
                    </div>
                    <input
                        type="number"
                        step="0.1"
                        className="input-field"
                        value={inverterSize}
                        onChange={(e) => setInverterSize(parseFloat(e.target.value) || 0)}
                    />
                </div>

                <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: 'var(--bg-card)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--accent)',
                            boxShadow: 'var(--shadow-sm)'
                        }}>
                            <Bell size={24} />
                        </div>
                        <span style={{ fontWeight: 600, fontSize: '1.125rem' }}>Push Notifications</span>
                    </div>
                    <label style={{ position: 'relative', display: 'inline-block', width: '60px', height: '34px' }}>
                        <input
                            type="checkbox"
                            checked={notifications}
                            onChange={(e) => setNotifications(e.target.checked)}
                            style={{ opacity: 0, width: 0, height: 0 }}
                        />
                        <span style={{
                            position: 'absolute',
                            cursor: 'pointer',
                            top: 0, left: 0, right: 0, bottom: 0,
                            backgroundColor: notifications ? 'var(--accent)' : 'var(--border)',
                            transition: '.4s',
                            borderRadius: '34px'
                        }}>
                            <span style={{
                                position: 'absolute',
                                content: '""',
                                height: '26px',
                                width: '26px',
                                left: '4px',
                                bottom: '4px',
                                backgroundColor: 'white',
                                transition: '.4s',
                                borderRadius: '50%',
                                transform: notifications ? 'translateX(26px)' : 'translateX(0)'
                            }} />
                        </span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Settings;