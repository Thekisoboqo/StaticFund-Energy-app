import React, { useState, useEffect } from 'react';

const Settings = () => {
    const [rate, setRate] = useState(() => {
        try {
            const stored = localStorage.getItem('electricityRate');
            if (stored) {
                return parseFloat(stored);
            }
        } catch (e) {
            console.error('Error parsing electricity rate', e);
        }
        return 0.15; // default rate
    });

    const [notifications, setNotifications] = useState(() => {
        try {
            const stored = localStorage.getItem('notificationsEnabled');
            if (stored) {
                return stored === 'true';
            }
        } catch (e) {
            console.error('Error parsing notifications', e);
        }
        return true; // default true
    });

    useEffect(() => {
        localStorage.setItem('electricityRate', rate.toString());
    }, [rate]);

    useEffect(() => {
        localStorage.setItem('notificationsEnabled', notifications.toString());
    }, [notifications]);

    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Manage your app preferences.</div>

            <div className="content">
                <div className="card" style={{ marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Electricity Rate ($/kWh)</h3>
                    <input
                        type="number"
                        className="input-field"
                        step="0.01"
                        min="0"
                        value={rate}
                        onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
                    />
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                        Used to calculate your estimated monthly bill.
                    </p>
                </div>

                <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Notifications</h3>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Receive savings tips and reminders.</p>
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="checkbox"
                                style={{ opacity: 0, position: 'absolute', width: 0, height: 0 }}
                                checked={notifications}
                                onChange={(e) => setNotifications(e.target.checked)}
                            />
                            <div style={{
                                width: '40px',
                                height: '24px',
                                backgroundColor: notifications ? 'var(--accent)' : 'var(--bg-mint)',
                                borderRadius: '12px',
                                transition: 'background-color 0.2s',
                                position: 'relative'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: '2px',
                                    left: notifications ? '18px' : '2px',
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: 'white',
                                    borderRadius: '50%',
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
