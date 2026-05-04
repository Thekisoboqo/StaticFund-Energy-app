import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Zap, Server, Bell, Save } from 'lucide-react';

const Settings = () => {
    const [rate, setRate] = useState(() => localStorage.getItem('elec_rate') || '0.15');
    const [inverterCapacity, setInverterCapacity] = useState(() => localStorage.getItem('inv_cap') || '5');
    const [agentMemory, setAgentMemory] = useState(() => localStorage.getItem('agent_mem') || 'Standard');
    const [notifications, setNotifications] = useState(() => localStorage.getItem('notif_enabled') === 'true');
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        if (isSaved) {
            const timer = setTimeout(() => setIsSaved(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [isSaved]);

    const handleSave = () => {
        localStorage.setItem('elec_rate', rate);
        localStorage.setItem('inv_cap', inverterCapacity);
        localStorage.setItem('agent_mem', agentMemory);
        localStorage.setItem('notif_enabled', notifications.toString());
        setIsSaved(true);
    };

    return (
        <div>
            <div className="header">Preferences</div>
            <div className="sub-header">Manage your simulated agent settings.</div>

            <div className="content" style={{ paddingBottom: '90px' }}>
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--accent)' }}>
                        <Zap size={20} />
                        <h3 style={{ fontWeight: 600 }}>Energy Cost</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Electricity Rate ($/kWh)</label>
                        <input
                            type="number"
                            step="0.01"
                            className="input-field"
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                        />
                    </div>
                </div>

                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--accent)' }}>
                        <Server size={20} />
                        <h3 style={{ fontWeight: 600 }}>System Config</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Target Inverter Capacity (kW)</label>
                            <input
                                type="number"
                                className="input-field"
                                value={inverterCapacity}
                                onChange={(e) => setInverterCapacity(e.target.value)}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Agent Memory Mode</label>
                            <select
                                className="input-field"
                                value={agentMemory}
                                onChange={(e) => setAgentMemory(e.target.value)}
                                style={{ appearance: 'none' }}
                            >
                                <option value="Minimal">Minimal</option>
                                <option value="Standard">Standard</option>
                                <option value="Aggressive">Aggressive</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Bell size={20} color="var(--accent)" />
                        <div>
                            <div style={{ fontWeight: 600 }}>Notifications</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Alerts on usage spikes</div>
                        </div>
                    </div>
                    <label style={{ position: 'relative', display: 'inline-block', width: '40px', height: '24px' }}>
                        <input
                            type="checkbox"
                            checked={notifications}
                            onChange={(e) => setNotifications(e.target.checked)}
                            style={{ opacity: 0, width: 0, height: 0 }}
                        />
                        <span style={{
                            position: 'absolute',
                            cursor: 'pointer',
                            top: 0, left: 0, right: 0, bottom: 0,
                            backgroundColor: notifications ? 'var(--accent)' : 'var(--bg-mint)',
                            transition: '.4s',
                            borderRadius: '24px',
                            border: '1px solid var(--border)'
                        }}>
                            <span style={{
                                position: 'absolute',
                                height: '16px',
                                width: '16px',
                                left: notifications ? '20px' : '4px',
                                bottom: '3px',
                                backgroundColor: 'white',
                                transition: '.4s',
                                borderRadius: '50%'
                            }} />
                        </span>
                    </label>
                </div>

                <button
                    className="btn btn-primary"
                    onClick={handleSave}
                    style={{ marginTop: '1rem', width: '100%', gap: '0.5rem' }}
                >
                    <Save size={20} />
                    {isSaved ? 'Settings Saved!' : 'Save Configurations'}
                </button>
            </div>
        </div>
    );
};

export default Settings;
