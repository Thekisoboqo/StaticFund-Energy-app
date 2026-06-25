import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Bell, DollarSign, Battery } from 'lucide-react';

const Settings = () => {
    const [rate, setRate] = useState(() => {
        try {
            const stored = localStorage.getItem('electricityRate');
            return stored ? JSON.parse(stored) : 0.15;
        } catch {
            return 0.15;
        }
    });

    const [inverterSize, setInverterSize] = useState(() => {
        try {
            const stored = localStorage.getItem('inverterSize');
            return stored ? JSON.parse(stored) : 5;
        } catch {
            return 5;
        }
    });

    const [notifications, setNotifications] = useState(() => {
        try {
            const stored = localStorage.getItem('notificationsEnabled');
            return stored ? JSON.parse(stored) : true;
        } catch {
            return true;
        }
    });

    useEffect(() => {
        localStorage.setItem('electricityRate', JSON.stringify(rate));
    }, [rate]);

    useEffect(() => {
        localStorage.setItem('inverterSize', JSON.stringify(inverterSize));
    }, [inverterSize]);

    useEffect(() => {
        localStorage.setItem('notificationsEnabled', JSON.stringify(notifications));
    }, [notifications]);

    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Manage your app preferences.</div>

            <div className="content">
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ background: 'var(--bg-blue)', padding: '0.5rem', borderRadius: '50%' }}>
                            <DollarSign size={20} color="var(--accent)" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600 }}>Electricity Rate ($/kWh)</div>
                            <input
                                type="number"
                                className="input-field"
                                style={{ marginTop: '0.5rem', padding: '0.5rem' }}
                                value={rate}
                                onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
                                step="0.01"
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                        <div style={{ background: 'var(--bg-mint)', padding: '0.5rem', borderRadius: '50%' }}>
                            <Battery size={20} color="var(--accent)" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600 }}>Inverter Size (kW)</div>
                            <input
                                type="number"
                                className="input-field"
                                style={{ marginTop: '0.5rem', padding: '0.5rem' }}
                                value={inverterSize}
                                onChange={(e) => setInverterSize(parseFloat(e.target.value) || 0)}
                                step="0.5"
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ background: 'var(--bg-orange)', padding: '0.5rem', borderRadius: '50%' }}>
                                <Bell size={20} color="var(--accent)" />
                            </div>
                            <div style={{ fontWeight: 600 }}>Notifications</div>
                        </div>
                        <label style={{ position: 'relative', display: 'inline-block', width: '48px', height: '24px' }}>
                            <input
                                type="checkbox"
                                style={{ opacity: 0, width: 0, height: 0 }}
                                checked={notifications}
                                onChange={(e) => setNotifications(e.target.checked)}
                            />
                            <span style={{
                                position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
                                backgroundColor: notifications ? 'var(--accent)' : 'var(--bg-primary)',
                                transition: '.4s', borderRadius: '24px', border: '1px solid var(--border)'
                            }}>
                                <span style={{
                                    position: 'absolute', content: '""', height: '16px', width: '16px',
                                    left: notifications ? '26px' : '4px', bottom: '3px', backgroundColor: 'white',
                                    transition: '.4s', borderRadius: '50%'
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
