import React, { useState, useEffect } from 'react';
import { Database, BrainCircuit, Trash2, Bell, Shield } from 'lucide-react';

const Settings = ({ setDevices }) => {
    const [agentMemoryEnabled, setAgentMemoryEnabled] = useState(() => {
        const saved = localStorage.getItem('agentMemoryEnabled');
        return saved !== null ? JSON.parse(saved) : true;
    });

    const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
        const saved = localStorage.getItem('notificationsEnabled');
        return saved !== null ? JSON.parse(saved) : true;
    });

    useEffect(() => {
        localStorage.setItem('agentMemoryEnabled', JSON.stringify(agentMemoryEnabled));
    }, [agentMemoryEnabled]);

    useEffect(() => {
        localStorage.setItem('notificationsEnabled', JSON.stringify(notificationsEnabled));
    }, [notificationsEnabled]);

    const handleClearData = () => {
        if (window.confirm("Are you sure you want to clear all local data? This action cannot be undone.")) {
            localStorage.removeItem('devices');
            setDevices([
                { id: 1, name: 'Living Room Heater', watts: 1500, hours: 0 },
                { id: 2, name: 'Samsung Fridge', watts: 200, hours: 24 },
                { id: 3, name: 'Microwave', watts: 200, hours: 0 },
            ]);
            alert("Local data cleared and devices reset to defaults.");
        }
    };

    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Manage your app preferences and data.</div>

            <div className="content">
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Agent Memory Toggle */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ padding: '0.5rem', background: 'var(--bg-mint)', borderRadius: '8px' }}>
                                <BrainCircuit size={20} color="var(--accent)" />
                            </div>
                            <div>
                                <div style={{ fontWeight: 600 }}>Agent Memory</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Allow agent to remember context</div>
                            </div>
                        </div>
                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={agentMemoryEnabled}
                                onChange={(e) => setAgentMemoryEnabled(e.target.checked)}
                                style={{
                                    appearance: 'none',
                                    width: '40px',
                                    height: '20px',
                                    background: agentMemoryEnabled ? 'var(--accent)' : 'var(--border)',
                                    borderRadius: '10px',
                                    position: 'relative',
                                    outline: 'none',
                                    cursor: 'pointer'
                                }}
                            />
                            <div style={{
                                position: 'absolute',
                                width: '16px',
                                height: '16px',
                                background: 'white',
                                borderRadius: '50%',
                                transition: 'transform 0.2s',
                                transform: `translateX(${agentMemoryEnabled ? '22px' : '2px'})`,
                                pointerEvents: 'none'
                            }} />
                        </label>
                    </div>

                    {/* Notifications Toggle */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ padding: '0.5rem', background: 'var(--bg-blue)', borderRadius: '8px' }}>
                                <Bell size={20} color="#38BDF8" />
                            </div>
                            <div>
                                <div style={{ fontWeight: 600 }}>Notifications</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Receive insights and alerts</div>
                            </div>
                        </div>
                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={notificationsEnabled}
                                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                                style={{
                                    appearance: 'none',
                                    width: '40px',
                                    height: '20px',
                                    background: notificationsEnabled ? 'var(--accent)' : 'var(--border)',
                                    borderRadius: '10px',
                                    position: 'relative',
                                    outline: 'none',
                                    cursor: 'pointer'
                                }}
                            />
                            <div style={{
                                position: 'absolute',
                                width: '16px',
                                height: '16px',
                                background: 'white',
                                borderRadius: '50%',
                                transition: 'transform 0.2s',
                                transform: `translateX(${notificationsEnabled ? '22px' : '2px'})`,
                                pointerEvents: 'none'
                            }} />
                        </label>
                    </div>

                    {/* Data Privacy Info */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ padding: '0.5rem', background: 'var(--bg-orange)', borderRadius: '8px' }}>
                            <Shield size={20} color="#F59E0B" />
                        </div>
                        <div>
                            <div style={{ fontWeight: 600 }}>Data Privacy</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Your data is stored locally</div>
                        </div>
                    </div>

                </div>

                <div className="card" style={{ marginTop: '1rem' }}>
                    <div style={{ fontWeight: 600, marginBottom: '1rem', color: '#EF4444' }}>Danger Zone</div>
                    <button
                        onClick={handleClearData}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #EF4444',
                            borderRadius: '8px',
                            color: '#EF4444',
                            fontWeight: 600,
                            backgroundColor: 'transparent'
                        }}
                    >
                        <Trash2 size={18} />
                        Clear All Local Data
                    </button>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem', textAlign: 'center' }}>
                        This will permanently delete your device inventory and audit history.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Settings;