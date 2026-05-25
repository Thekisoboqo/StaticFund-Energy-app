import React, { useState, useEffect } from 'react';
import { Trash2, Bell } from 'lucide-react';

const Settings = ({ setDevices, defaultDevices }) => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
        return localStorage.getItem('notificationsEnabled') === 'true';
    });

    useEffect(() => {
        localStorage.setItem('notificationsEnabled', notificationsEnabled);
    }, [notificationsEnabled]);

    const handleClearData = () => {
        if (window.confirm("Are you sure you want to clear all your data? This cannot be undone.")) {
            localStorage.clear();
            setDevices(defaultDevices);
            window.location.reload(); // Quick way to reset all state to init
        }
    };

    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Manage your app preferences.</div>

            <div className="content">
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Notifications Toggle */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ background: 'var(--bg-blue)', padding: '0.5rem', borderRadius: '50%' }}>
                                <Bell size={20} color="var(--accent)" />
                            </div>
                            <div>
                                <div style={{ fontWeight: 600 }}>Notifications</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Get energy saving tips.</div>
                            </div>
                        </div>
                        <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px' }}>
                            <input
                                type="checkbox"
                                style={{ opacity: 0, width: 0, height: 0 }}
                                checked={notificationsEnabled}
                                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                            />
                            <span style={{
                                position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
                                backgroundColor: notificationsEnabled ? 'var(--accent)' : 'var(--bg-primary)',
                                transition: '.4s', borderRadius: '34px',
                                border: '1px solid var(--border)'
                            }}>
                                <span style={{
                                    position: 'absolute', content: '""', height: '18px', width: '18px',
                                    left: notificationsEnabled ? '22px' : '3px', bottom: '2px',
                                    backgroundColor: 'white', transition: '.4s', borderRadius: '50%'
                                }} />
                            </span>
                        </label>
                    </div>

                    <hr style={{ borderColor: 'var(--border)', margin: '0' }} />

                    {/* Clear Data */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ background: 'var(--bg-orange)', padding: '0.5rem', borderRadius: '50%' }}>
                                <Trash2 size={20} color="#EF4444" />
                            </div>
                            <div>
                                <div style={{ fontWeight: 600, color: '#EF4444' }}>Clear Data</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Reset all your devices.</div>
                            </div>
                        </div>
                        <button
                            className="btn"
                            style={{ padding: '0.5rem 1rem', border: '1px solid #EF4444', color: '#EF4444', fontSize: '0.875rem' }}
                            onClick={handleClearData}
                        >
                            Reset
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Settings;
