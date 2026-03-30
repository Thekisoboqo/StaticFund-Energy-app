import React from 'react';
import { Bell, Moon, Shield } from 'lucide-react';

const Settings = ({ settings, setSettings }) => {
    const toggleSetting = (key) => {
        setSettings({ ...settings, [key]: !settings[key] });
    };

    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Manage your preferences.</div>

            <div className="content">
                <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--accent)',
                        }}>
                            <Bell size={20} />
                        </div>
                        <div style={{ fontWeight: 600 }}>Notifications</div>
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="checkbox"
                                className="sr-only"
                                style={{ display: 'none' }}
                                checked={settings.notifications}
                                onChange={() => toggleSetting('notifications')}
                            />
                            <div style={{
                                width: '40px',
                                height: '24px',
                                backgroundColor: settings.notifications ? 'var(--accent)' : '#4B5563',
                                borderRadius: '9999px',
                                transition: 'background-color 0.2s'
                            }}></div>
                            <div style={{
                                position: 'absolute',
                                top: '2px',
                                left: settings.notifications ? '18px' : '2px',
                                width: '20px',
                                height: '20px',
                                backgroundColor: 'white',
                                borderRadius: '50%',
                                transition: 'left 0.2s'
                            }}></div>
                        </div>
                    </label>
                </div>

                <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--accent)',
                        }}>
                            <Moon size={20} />
                        </div>
                        <div style={{ fontWeight: 600 }}>Dark Mode</div>
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="checkbox"
                                className="sr-only"
                                style={{ display: 'none' }}
                                checked={settings.darkMode}
                                onChange={() => toggleSetting('darkMode')}
                            />
                            <div style={{
                                width: '40px',
                                height: '24px',
                                backgroundColor: settings.darkMode ? 'var(--accent)' : '#4B5563',
                                borderRadius: '9999px',
                                transition: 'background-color 0.2s'
                            }}></div>
                            <div style={{
                                position: 'absolute',
                                top: '2px',
                                left: settings.darkMode ? '18px' : '2px',
                                width: '20px',
                                height: '20px',
                                backgroundColor: 'white',
                                borderRadius: '50%',
                                transition: 'left 0.2s'
                            }}></div>
                        </div>
                    </label>
                </div>

                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem', marginBottom: '1rem' }}>
                     <div style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--accent)',
                        }}>
                        <Shield size={20} />
                     </div>
                     <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600 }}>Privacy Filter Agent</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Your data is kept locally and processed securely.</div>
                     </div>
                </div>

            </div>
        </div>
    );
};

export default Settings;
