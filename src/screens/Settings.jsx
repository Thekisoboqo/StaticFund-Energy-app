import React, { useState, useEffect } from 'react';

const Settings = () => {
    const [electricityRate, setElectricityRate] = useState(() => {
        return localStorage.getItem('electricityRate') || '0.15';
    });
    const [inverterConfigs, setInverterConfigs] = useState(() => {
        return localStorage.getItem('inverterConfigs') || '5kW';
    });
    const [agentMemory, setAgentMemory] = useState(() => {
        return localStorage.getItem('agentMemory') || 'Basic';
    });
    const [notificationSettings, setNotificationSettings] = useState(() => {
        return localStorage.getItem('notificationSettings') === 'true';
    });

    useEffect(() => {
        localStorage.setItem('electricityRate', electricityRate);
    }, [electricityRate]);

    useEffect(() => {
        localStorage.setItem('inverterConfigs', inverterConfigs);
    }, [inverterConfigs]);

    useEffect(() => {
        localStorage.setItem('agentMemory', agentMemory);
    }, [agentMemory]);

    useEffect(() => {
        localStorage.setItem('notificationSettings', notificationSettings);
    }, [notificationSettings]);

    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Manage your app configurations.</div>

            <div className="content">
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600 }}>Electricity Rate ($/kWh)</label>
                        <input
                            type="number"
                            step="0.01"
                            className="input-field"
                            value={electricityRate}
                            onChange={(e) => setElectricityRate(e.target.value)}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600 }}>Inverter Configuration</label>
                        <select
                            className="input-field"
                            value={inverterConfigs}
                            onChange={(e) => setInverterConfigs(e.target.value)}
                            style={{ WebkitAppearance: 'none', appearance: 'none', color: 'var(--text-primary)' }}
                        >
                            <option value="3kW">3kW System</option>
                            <option value="5kW">5kW System</option>
                            <option value="8kW">8kW System</option>
                            <option value="10kW">10kW System</option>
                        </select>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600 }}>Agent Memory Profile</label>
                        <select
                            className="input-field"
                            value={agentMemory}
                            onChange={(e) => setAgentMemory(e.target.value)}
                            style={{ WebkitAppearance: 'none', appearance: 'none', color: 'var(--text-primary)' }}
                        >
                            <option value="Basic">Basic (No historical context)</option>
                            <option value="Standard">Standard (Retains 30 days)</option>
                            <option value="Advanced">Advanced (Full contextual history)</option>
                        </select>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                        <label style={{ fontWeight: 600 }}>Enable Notifications</label>
                        <div
                            onClick={() => setNotificationSettings(!notificationSettings)}
                            style={{
                                width: '48px',
                                height: '24px',
                                backgroundColor: notificationSettings ? 'var(--accent)' : 'var(--border)',
                                borderRadius: '12px',
                                position: 'relative',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s'
                            }}
                        >
                            <div style={{
                                width: '20px',
                                height: '20px',
                                backgroundColor: 'var(--bg-card)',
                                borderRadius: '50%',
                                position: 'absolute',
                                top: '2px',
                                left: notificationSettings ? '26px' : '2px',
                                transition: 'left 0.2s',
                                boxShadow: 'var(--shadow-sm)'
                            }} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Settings;
