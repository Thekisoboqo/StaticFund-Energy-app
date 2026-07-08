import React, { useState, useEffect } from 'react';

const Settings = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
        try {
            const stored = localStorage.getItem('settings_notifications');
            if (stored !== null) {
                const parsed = JSON.parse(stored);
                if (typeof parsed === 'boolean') {
                    return parsed;
                }
            }
        } catch (e) {
            console.error('Error parsing notifications setting from localStorage', e);
        }
        return true;
    });

    useEffect(() => {
        localStorage.setItem('settings_notifications', JSON.stringify(notificationsEnabled));
    }, [notificationsEnabled]);

    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Manage your preferences.</div>

            <div className="content">
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontWeight: 600 }}>Push Notifications</div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Get alerts to save energy</div>
                        </div>

                        <label style={{
                            position: 'relative',
                            display: 'inline-block',
                            width: '50px',
                            height: '28px'
                        }}>
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
                                backgroundColor: notificationsEnabled ? 'var(--accent)' : 'var(--status-gray-light)',
                                transition: '.4s',
                                borderRadius: '34px'
                            }}>
                                <span style={{
                                    position: 'absolute',
                                    content: '""',
                                    height: '20px',
                                    width: '20px',
                                    left: notificationsEnabled ? '26px' : '4px',
                                    bottom: '4px',
                                    backgroundColor: notificationsEnabled ? 'var(--bg-primary)' : 'var(--text-primary)',
                                    transition: '.4s',
                                    borderRadius: '50%'
                                }} />
                            </span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
