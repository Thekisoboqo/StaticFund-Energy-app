import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Trash2, Bell, Zap, Battery } from 'lucide-react';

const Settings = () => {
    const [electricityRate, setElectricityRate] = useState(() => {
        try {
            const stored = localStorage.getItem('electricityRate');
            return stored ? parseFloat(stored) : 0.15;
        } catch (e) {
            console.error(e);
            return 0.15;
        }
    });

    const [inverterSize, setInverterSize] = useState(() => {
        try {
            const stored = localStorage.getItem('inverterSize');
            return stored ? parseInt(stored) : 5000;
        } catch (e) {
            console.error(e);
            return 5000;
        }
    });

    const [notifications, setNotifications] = useState(() => {
        try {
            const stored = localStorage.getItem('notifications');
            return stored ? JSON.parse(stored) : true;
        } catch (e) {
            console.error(e);
            return true;
        }
    });

    useEffect(() => {
        localStorage.setItem('electricityRate', electricityRate);
    }, [electricityRate]);

    useEffect(() => {
        localStorage.setItem('inverterSize', inverterSize);
    }, [inverterSize]);

    useEffect(() => {
        localStorage.setItem('notifications', JSON.stringify(notifications));
    }, [notifications]);

    const handleClearData = () => {
        if (window.confirm('Are you sure you want to clear all data? This will reset your inventory and settings.')) {
            localStorage.clear();
            window.location.reload();
        }
    };

    return (
        <div>
            <div className="header" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <SettingsIcon size={24} />
                <span>Settings</span>
            </div>
            <div className="sub-header">Configure your app experience.</div>

            <div className="content">
                {/* Cost Settings */}
                <div className="card">
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '1.125rem' }}>
                        <Zap size={20} color="var(--accent)" />
                        Energy Cost
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Electricity Rate ($/kWh)</label>
                        <input
                            type="number"
                            className="input-field"
                            step="0.01"
                            min="0"
                            value={electricityRate}
                            onChange={(e) => setElectricityRate(parseFloat(e.target.value) || 0)}
                        />
                    </div>
                </div>

                {/* System Settings */}
                <div className="card">
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '1.125rem' }}>
                        <Battery size={20} color="var(--accent)" />
                        System Goals
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Target Inverter Size (W)</label>
                        <input
                            type="number"
                            className="input-field"
                            step="500"
                            min="1000"
                            value={inverterSize}
                            onChange={(e) => setInverterSize(parseInt(e.target.value) || 0)}
                        />
                    </div>
                </div>

                {/* Notifications */}
                <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Bell size={20} color="var(--text-secondary)" />
                        <div>
                            <div style={{ fontWeight: 600 }}>Notifications</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Tips and reminders</div>
                        </div>
                    </div>
                    {/* Simple toggle switch */}
                    <div
                        onClick={() => setNotifications(!notifications)}
                        style={{
                            width: '44px',
                            height: '24px',
                            backgroundColor: notifications ? 'var(--accent)' : 'var(--bg-mint)',
                            borderRadius: '12px',
                            position: 'relative',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s'
                        }}
                    >
                        <div style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: '#fff',
                            borderRadius: '50%',
                            position: 'absolute',
                            top: '2px',
                            left: notifications ? '22px' : '2px',
                            transition: 'left 0.3s',
                            boxShadow: 'var(--shadow-sm)'
                        }} />
                    </div>
                </div>

                {/* Danger Zone */}
                <div style={{ marginTop: '2rem' }}>
                    <h3 style={{ fontSize: '0.875rem', color: '#EF4444', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.05em' }}>Danger Zone</h3>
                    <button
                        className="btn"
                        style={{
                            width: '100%',
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            color: '#EF4444',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            display: 'flex',
                            gap: '0.5rem'
                        }}
                        onClick={handleClearData}
                    >
                        <Trash2 size={20} />
                        Clear All Data
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
