import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Bell, Database, Zap, HardDrive } from 'lucide-react';

const Settings = () => {
    // Lazy initialization for localStorage values
    const [electricityRate, setElectricityRate] = useState(() => {
        try {
            const stored = localStorage.getItem('electricityRate');
            return stored ? JSON.parse(stored) : 0.15;
        } catch (e) {
            console.error('Error parsing electricityRate from localStorage', e);
            return 0.15;
        }
    });

    const [inverterConfig, setInverterConfig] = useState(() => {
        try {
            const stored = localStorage.getItem('inverterConfig');
            return stored ? JSON.parse(stored) : { systemSize: 5, batterySize: 10 };
        } catch (e) {
            console.error('Error parsing inverterConfig from localStorage', e);
            return { systemSize: 5, batterySize: 10 };
        }
    });

    const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
        try {
            const stored = localStorage.getItem('notificationsEnabled');
            return stored ? JSON.parse(stored) : true;
        } catch (e) {
            console.error('Error parsing notificationsEnabled from localStorage', e);
            return true;
        }
    });

    const [agentMemoryEnabled, setAgentMemoryEnabled] = useState(() => {
        try {
            const stored = localStorage.getItem('agentMemoryEnabled');
            return stored ? JSON.parse(stored) : true;
        } catch (e) {
            console.error('Error parsing agentMemoryEnabled from localStorage', e);
            return true;
        }
    });

    // Save to localStorage on change
    useEffect(() => {
        localStorage.setItem('electricityRate', JSON.stringify(electricityRate));
    }, [electricityRate]);

    useEffect(() => {
        localStorage.setItem('inverterConfig', JSON.stringify(inverterConfig));
    }, [inverterConfig]);

    useEffect(() => {
        localStorage.setItem('notificationsEnabled', JSON.stringify(notificationsEnabled));
    }, [notificationsEnabled]);

    useEffect(() => {
        localStorage.setItem('agentMemoryEnabled', JSON.stringify(agentMemoryEnabled));
    }, [agentMemoryEnabled]);

    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Manage your preferences and configurations.</div>

            <div className="content" style={{ paddingBottom: '90px' }}>
                <div className="card" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.125rem' }}>
                        <Zap size={20} color="var(--accent)" /> Energy Rate
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Rate per kWh ($)</label>
                        <input
                            type="number"
                            className="input-field"
                            step="0.01"
                            value={electricityRate}
                            onChange={(e) => setElectricityRate(parseFloat(e.target.value) || 0)}
                        />
                    </div>
                </div>

                <div className="card" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.125rem' }}>
                        <HardDrive size={20} color="var(--accent)" /> Inverter Configuration
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>System Size (kW)</label>
                        <input
                            type="number"
                            className="input-field"
                            step="0.1"
                            value={inverterConfig.systemSize}
                            onChange={(e) => setInverterConfig({ ...inverterConfig, systemSize: parseFloat(e.target.value) || 0 })}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Battery Size (kWh)</label>
                        <input
                            type="number"
                            className="input-field"
                            step="0.1"
                            value={inverterConfig.batterySize}
                            onChange={(e) => setInverterConfig({ ...inverterConfig, batterySize: parseFloat(e.target.value) || 0 })}
                        />
                    </div>
                </div>

                <div className="card" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.125rem' }}>
                        <Database size={20} color="var(--accent)" /> Preferences
                    </h3>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Bell size={20} color="var(--text-secondary)" />
                            <span>Notifications</span>
                        </div>
                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={notificationsEnabled}
                                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                                style={{ width: '18px', height: '18px', accentColor: 'var(--accent)' }}
                            />
                        </label>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Database size={20} color="var(--text-secondary)" />
                            <span>Agent Memory</span>
                        </div>
                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={agentMemoryEnabled}
                                onChange={(e) => setAgentMemoryEnabled(e.target.checked)}
                                style={{ width: '18px', height: '18px', accentColor: 'var(--accent)' }}
                            />
                        </label>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        Agent Memory allows the Privacy Filter Agent to securely remember your preferences locally.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Settings;
