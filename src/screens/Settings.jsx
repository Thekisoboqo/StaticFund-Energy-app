import React, { useState, useEffect } from 'react';
import { Bell, Cpu, Zap, Brain } from 'lucide-react';

const Settings = () => {
    // Electricity Rate
    const [elecRate, setElecRate] = useState(() => {
        try {
            const stored = localStorage.getItem('elecRate');
            return stored ? parseFloat(stored) : 0.15;
        } catch (e) {
            console.error('Error reading elecRate', e);
            return 0.15;
        }
    });

    // Inverter Configuration
    const [inverterConfig, setInverterConfig] = useState(() => {
        try {
            const stored = localStorage.getItem('inverterConfig');
            return stored ? stored : 'hybrid';
        } catch (e) {
            console.error('Error reading inverterConfig', e);
            return 'hybrid';
        }
    });

    // Agent Memory
    const [agentMemory, setAgentMemory] = useState(() => {
        try {
            const stored = localStorage.getItem('agentMemory');
            return stored ? stored : 'standard';
        } catch (e) {
            console.error('Error reading agentMemory', e);
            return 'standard';
        }
    });

    // Notification Settings
    const [notifications, setNotifications] = useState(() => {
        try {
            const stored = localStorage.getItem('notifications');
            return stored ? JSON.parse(stored) === true : true;
        } catch (e) {
            console.error('Error reading notifications', e);
            return true;
        }
    });

    // Save states to local storage on change
    useEffect(() => {
        localStorage.setItem('elecRate', elecRate.toString());
    }, [elecRate]);

    useEffect(() => {
        localStorage.setItem('inverterConfig', inverterConfig);
    }, [inverterConfig]);

    useEffect(() => {
        localStorage.setItem('agentMemory', agentMemory);
    }, [agentMemory]);

    useEffect(() => {
        localStorage.setItem('notifications', JSON.stringify(notifications));
    }, [notifications]);

    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Customize your application preferences.</div>

            <div className="content">
                {/* Electricity Rate */}
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <Zap size={20} color="var(--accent)" />
                        <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Electricity Rate</h3>
                    </div>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
                        Cost per kWh ($)
                        <input
                            type="number"
                            step="0.01"
                            className="input-field"
                            value={elecRate}
                            onChange={(e) => setElecRate(parseFloat(e.target.value) || 0)}
                        />
                    </label>
                </div>

                {/* Inverter Configuration */}
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <Cpu size={20} color="var(--accent)" />
                        <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Inverter Configuration</h3>
                    </div>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
                        System Type
                        <select
                            className="input-field"
                            value={inverterConfig}
                            onChange={(e) => setInverterConfig(e.target.value)}
                        >
                            <option value="grid-tied">Grid-Tied</option>
                            <option value="off-grid">Off-Grid</option>
                            <option value="hybrid">Hybrid</option>
                        </select>
                    </label>
                </div>

                {/* Agent Memory */}
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <Brain size={20} color="var(--accent)" />
                        <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Agent Memory</h3>
                    </div>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
                        Memory Retention
                        <select
                            className="input-field"
                            value={agentMemory}
                            onChange={(e) => setAgentMemory(e.target.value)}
                        >
                            <option value="minimal">Minimal</option>
                            <option value="standard">Standard</option>
                            <option value="detailed">Detailed</option>
                        </select>
                    </label>
                </div>

                {/* Notification Settings */}
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <Bell size={20} color="var(--accent)" />
                        <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Notifications</h3>
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                        <input
                            type="checkbox"
                            checked={notifications}
                            onChange={(e) => setNotifications(e.target.checked)}
                            style={{ width: '20px', height: '20px', accentColor: 'var(--accent)' }}
                        />
                        Enable Push Notifications
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Settings;
