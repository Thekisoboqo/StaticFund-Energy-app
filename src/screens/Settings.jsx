import React, { useState, useEffect } from 'react';

const Settings = () => {
    const [rate, setRate] = useState(() => localStorage.getItem('electricityRate') || '0.15');
    const [inverter, setInverter] = useState(() => localStorage.getItem('inverterConfig') || '5kW');
    const [memory, setMemory] = useState(() => localStorage.getItem('agentMemory') || 'Enabled');
    const [notifications, setNotifications] = useState(() => localStorage.getItem('notifications') || 'Off');

    useEffect(() => {
        localStorage.setItem('electricityRate', rate);
    }, [rate]);

    useEffect(() => {
        localStorage.setItem('inverterConfig', inverter);
    }, [inverter]);

    useEffect(() => {
        localStorage.setItem('agentMemory', memory);
    }, [memory]);

    useEffect(() => {
        localStorage.setItem('notifications', notifications);
    }, [notifications]);

    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Manage your app preferences and mock database features.</div>

            <div className="content" style={{ paddingBottom: '90px' }}>
                <div className="card">
                    <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Energy Settings</h3>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                            Electricity Rate ($/kWh)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            className="input-field"
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                            Inverter Configuration
                        </label>
                        <select
                            className="input-field"
                            value={inverter}
                            onChange={(e) => setInverter(e.target.value)}
                        >
                            <option value="3kW">3kW System</option>
                            <option value="5kW">5kW System</option>
                            <option value="8kW">8kW System</option>
                            <option value="10kW">10kW System</option>
                        </select>
                    </div>
                </div>

                <div className="card" style={{ marginTop: '1rem' }}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>App Preferences</h3>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                            Agent Memory
                        </label>
                        <select
                            className="input-field"
                            value={memory}
                            onChange={(e) => setMemory(e.target.value)}
                        >
                            <option value="Enabled">Enabled</option>
                            <option value="Disabled">Disabled</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                            Notifications
                        </label>
                        <select
                            className="input-field"
                            value={notifications}
                            onChange={(e) => setNotifications(e.target.value)}
                        >
                            <option value="On">On</option>
                            <option value="Off">Off</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
