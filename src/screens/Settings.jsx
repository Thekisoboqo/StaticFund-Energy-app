import React, { useState, useEffect } from 'react';
import { Trash2, Bell } from 'lucide-react';

const Settings = ({ onDevicesChange }) => {
    // Lazy initialize states from localStorage
    const [electricityRate, setElectricityRate] = useState(() => {
        try {
            const stored = localStorage.getItem('electricityRate');
            return stored ? parseFloat(stored) : 0.15;
        } catch {
            return 0.15;
        }
    });

    const [inverterConfig, setInverterConfig] = useState(() => {
        try {
            const stored = localStorage.getItem('inverterConfig');
            if (stored) {
                const parsed = JSON.parse(stored);
                if (typeof parsed === 'object' && parsed !== null) {
                    return parsed;
                }
            }
            return { systemSize: 5, batteryCapacity: 10 };
        } catch {
            return { systemSize: 5, batteryCapacity: 10 };
        }
    });

    const [notifications, setNotifications] = useState(() => {
        try {
            const stored = localStorage.getItem('notifications');
            return stored ? JSON.parse(stored) : true;
        } catch {
            return true;
        }
    });

    // Save states to localStorage when they change
    useEffect(() => {
        localStorage.setItem('electricityRate', electricityRate);
    }, [electricityRate]);

    useEffect(() => {
        localStorage.setItem('inverterConfig', JSON.stringify(inverterConfig));
    }, [inverterConfig]);

    useEffect(() => {
        localStorage.setItem('notifications', JSON.stringify(notifications));
    }, [notifications]);

    const handleClearData = () => {
        if (window.confirm("Are you sure you want to clear all device data and agent memory?")) {
            onDevicesChange([]);
            localStorage.removeItem('devices');
            alert('Data cleared successfully.');
        }
    };

    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Manage your app preferences and data.</div>

            <div className="content">
                {/* General Settings */}
                <div className="card" style={{ marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>General Settings</h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                                Electricity Rate ($/kWh)
                            </label>
                            <input
                                type="number"
                                className="input-field"
                                value={electricityRate}
                                onChange={(e) => setElectricityRate(parseFloat(e.target.value) || 0)}
                                step="0.01"
                                min="0"
                            />
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Bell size={20} color="var(--text-secondary)" />
                                <span style={{ fontWeight: 600 }}>Push Notifications</span>
                            </div>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={notifications}
                                    onChange={(e) => setNotifications(e.target.checked)}
                                />
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Inverter Configuration */}
                <div className="card" style={{ marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Ideal Solar Setup</h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Configure your target solar system to personalize your long-term goal on the Insights screen.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                                System Size (kW)
                            </label>
                            <input
                                type="number"
                                className="input-field"
                                value={inverterConfig.systemSize}
                                onChange={(e) => setInverterConfig({ ...inverterConfig, systemSize: parseFloat(e.target.value) || 0 })}
                                step="0.1"
                                min="0"
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                                Battery Capacity (kWh)
                            </label>
                            <input
                                type="number"
                                className="input-field"
                                value={inverterConfig.batteryCapacity}
                                onChange={(e) => setInverterConfig({ ...inverterConfig, batteryCapacity: parseFloat(e.target.value) || 0 })}
                                step="0.1"
                                min="0"
                            />
                        </div>
                    </div>
                </div>

                {/* Data Management */}
                <div className="card" style={{ border: '1px solid #7f1d1d' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: '#fca5a5' }}>Danger Zone</h3>
                    <button
                        className="btn"
                        style={{
                            width: '100%',
                            backgroundColor: 'rgba(220, 38, 38, 0.1)',
                            color: '#f87171',
                            border: '1px solid #991b1b'
                        }}
                        onClick={handleClearData}
                    >
                        <Trash2 size={20} style={{ marginRight: '0.5rem' }} />
                        Clear Agent Memory & Data
                    </button>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem', textAlign: 'center' }}>
                        This will permanently delete all your tracked devices and reset your profile.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Settings;
