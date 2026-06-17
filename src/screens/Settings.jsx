import React, { useState, useEffect } from 'react';

const Settings = () => {
    const [electricityRate, setElectricityRate] = useState(() => {
        try {
            const stored = localStorage.getItem('electricityRate');
            if (stored !== null) return parseFloat(stored) || 0.15;
        } catch (e) {
            console.error('Error reading electricityRate', e);
        }
        return 0.15;
    });

    const [inverterCapacity, setInverterCapacity] = useState(() => {
        try {
            const stored = localStorage.getItem('inverterCapacity');
            if (stored !== null) return parseFloat(stored) || 5;
        } catch (e) {
            console.error('Error reading inverterCapacity', e);
        }
        return 5;
    });

    const [batteryCapacity, setBatteryCapacity] = useState(() => {
        try {
            const stored = localStorage.getItem('batteryCapacity');
            if (stored !== null) return parseFloat(stored) || 10;
        } catch (e) {
            console.error('Error reading batteryCapacity', e);
        }
        return 10;
    });

    const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
        try {
            const stored = localStorage.getItem('notificationsEnabled');
            if (stored !== null) return stored === 'true';
        } catch (e) {
            console.error('Error reading notificationsEnabled', e);
        }
        return true;
    });

    useEffect(() => {
        localStorage.setItem('electricityRate', electricityRate.toString());
    }, [electricityRate]);

    useEffect(() => {
        localStorage.setItem('inverterCapacity', inverterCapacity.toString());
    }, [inverterCapacity]);

    useEffect(() => {
        localStorage.setItem('batteryCapacity', batteryCapacity.toString());
    }, [batteryCapacity]);

    useEffect(() => {
        localStorage.setItem('notificationsEnabled', notificationsEnabled.toString());
    }, [notificationsEnabled]);

    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Manage your configurations.</div>

            <div className="content">
                <div className="card">
                    <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem' }}>Financial</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Electricity Rate ($/kWh)</label>
                        <input
                            type="number"
                            step="0.01"
                            className="input-field"
                            value={electricityRate}
                            onChange={(e) => setElectricityRate(e.target.value)}
                        />
                    </div>
                </div>

                <div className="card">
                    <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem' }}>Hardware Configurations</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Inverter Capacity (kW)</label>
                            <input
                                type="number"
                                step="0.1"
                                className="input-field"
                                value={inverterCapacity}
                                onChange={(e) => setInverterCapacity(e.target.value)}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Battery Capacity (kWh)</label>
                            <input
                                type="number"
                                step="0.1"
                                className="input-field"
                                value={batteryCapacity}
                                onChange={(e) => setBatteryCapacity(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <h3 style={{ fontSize: '1.125rem' }}>Notifications</h3>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Enable push notifications</p>
                    </div>
                    <label style={{ position: 'relative', display: 'inline-block', width: '40px', height: '24px' }}>
                        <input
                            type="checkbox"
                            checked={notificationsEnabled}
                            onChange={(e) => setNotificationsEnabled(e.target.checked)}
                            style={{ opacity: 0, width: 0, height: 0 }}
                        />
                        <span style={{
                            position: 'absolute',
                            cursor: 'pointer',
                            top: 0, left: 0, right: 0, bottom: 0,
                            backgroundColor: notificationsEnabled ? 'var(--accent)' : 'var(--border)',
                            transition: '0.4s',
                            borderRadius: '24px'
                        }}>
                            <span style={{
                                position: 'absolute',
                                content: '""',
                                height: '16px',
                                width: '16px',
                                left: notificationsEnabled ? '20px' : '4px',
                                bottom: '4px',
                                backgroundColor: 'var(--bg-primary)',
                                transition: '0.4s',
                                borderRadius: '50%'
                            }} />
                        </span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Settings;
