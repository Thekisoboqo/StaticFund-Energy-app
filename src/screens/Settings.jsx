import React, { useState, useEffect } from 'react';
import { Bell, DollarSign } from 'lucide-react';

const Settings = () => {
    const [electricityRate, setElectricityRate] = useState(() => {
        return localStorage.getItem('electricityRate') || '0.15';
    });

    const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
        const saved = localStorage.getItem('notificationsEnabled');
        return saved !== null ? saved === 'true' : true;
    });

    const [savedMessage, setSavedMessage] = useState(false);

    useEffect(() => {
        localStorage.setItem('electricityRate', electricityRate);
        localStorage.setItem('notificationsEnabled', notificationsEnabled);
    }, [electricityRate, notificationsEnabled]);

    const handleRateChange = (e) => {
        setElectricityRate(e.target.value);
        showSavedMessage();
    };

    const handleNotificationChange = (e) => {
        setNotificationsEnabled(e.target.checked);
        showSavedMessage();
    };

    const showSavedMessage = () => {
        setSavedMessage(true);
        setTimeout(() => setSavedMessage(false), 2000);
    };

    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Manage your preferences.</div>

            <div className="content">
                {savedMessage && (
                    <div style={{
                        backgroundColor: 'var(--bg-mint)',
                        color: 'var(--accent)',
                        padding: '0.5rem',
                        borderRadius: 'var(--radius-sm)',
                        textAlign: 'center',
                        fontSize: '0.875rem',
                        fontWeight: 'bold',
                        marginBottom: '1rem'
                    }}>
                        Settings saved!
                    </div>
                )}

                <div className="card" style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <DollarSign size={20} color="var(--accent)" />
                        <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Electricity Rate ($/kWh)</h3>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Used to calculate your estimated savings.
                    </p>
                    <input
                        type="number"
                        className="input-field"
                        placeholder="0.15"
                        step="0.01"
                        min="0"
                        value={electricityRate}
                        onChange={handleRateChange}
                    />
                </div>

                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Bell size={20} color="var(--accent)" />
                            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Notifications</h3>
                        </div>

                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="checkbox"
                                    style={{ opacity: 0, width: 0, height: 0 }}
                                    checked={notificationsEnabled}
                                    onChange={handleNotificationChange}
                                />
                                <div style={{
                                    width: '40px',
                                    height: '24px',
                                    backgroundColor: notificationsEnabled ? 'var(--accent)' : 'var(--border)',
                                    borderRadius: '12px',
                                    transition: 'background-color 0.2s',
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
                                        transition: 'left 0.2s',
                                        boxShadow: 'var(--shadow-sm)'
                                    }} />
                                </div>
                            </div>
                        </label>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                        Receive tips and weekly energy reports.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Settings;
