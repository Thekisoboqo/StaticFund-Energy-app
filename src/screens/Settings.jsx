import React, { useState, useEffect } from 'react';
import { Bell, DollarSign, Shield, Zap } from 'lucide-react';

const Settings = ({ electricityRate, onRateChange }) => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
        const saved = localStorage.getItem('notificationsEnabled');
        return saved !== null ? JSON.parse(saved) : true;
    });

    useEffect(() => {
        localStorage.setItem('notificationsEnabled', JSON.stringify(notificationsEnabled));
    }, [notificationsEnabled]);

    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Manage your app preferences.</div>

            <div className="content">
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ padding: '0.5rem', background: '#111C1A', borderRadius: '0.5rem', color: '#0CD3AD' }}>
                            <DollarSign size={20} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600 }}>Electricity Rate ($/kWh)</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Used for savings estimates</div>
                        </div>
                    </div>
                    <input
                        type="number"
                        className="input-field"
                        value={electricityRate}
                        onChange={(e) => onRateChange(parseFloat(e.target.value) || 0)}
                        step="0.01"
                        min="0"
                    />
                </div>

                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                    <div style={{ padding: '0.5rem', background: '#111C1A', borderRadius: '0.5rem', color: '#0CD3AD' }}>
                        <Bell size={20} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600 }}>Push Notifications</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Tips and reminders</div>
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="checkbox"
                                style={{ srOnly: true, opacity: 0, position: 'absolute', width: 0, height: 0 }}
                                checked={notificationsEnabled}
                                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                            />
                            <div style={{
                                width: '40px',
                                height: '24px',
                                backgroundColor: notificationsEnabled ? 'var(--accent)' : 'var(--border)',
                                borderRadius: '12px',
                                transition: 'all 0.3s',
                                position: 'relative'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: '2px',
                                    left: notificationsEnabled ? '18px' : '2px',
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: 'white',
                                    borderRadius: '50%',
                                    transition: 'all 0.3s'
                                }} />
                            </div>
                        </div>
                    </label>
                </div>

                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                    <div style={{ padding: '0.5rem', background: '#111C1A', borderRadius: '0.5rem', color: '#0CD3AD' }}>
                        <Shield size={20} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600 }}>Privacy & Data</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>All data stored locally.</div>
                    </div>
                </div>

                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                    <div style={{ padding: '0.5rem', background: '#111C1A', borderRadius: '0.5rem', color: '#0CD3AD' }}>
                        <Zap size={20} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600 }}>App Version</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>v1.0.0</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
