import React from 'react';
import { Bell, Zap, Battery } from 'lucide-react';

const Settings = ({ settings, onUpdateSettings }) => {
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        onUpdateSettings({
            ...settings,
            [name]: type === 'checkbox' ? checked : parseFloat(value) || value
        });
    };

    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Customize your energy profile and preferences.</div>

            <div className="content">
                <div className="card">
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--text-brand)' }}>
                        <Zap size={20} /> Electricity Rate
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Cost per kWh ($)</label>
                        <input
                            type="number"
                            name="electricityRate"
                            className="input-field"
                            step="0.01"
                            value={settings.electricityRate || ''}
                            onChange={handleChange}
                            placeholder="e.g. 0.15"
                        />
                    </div>
                </div>

                <div className="card">
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--text-brand)' }}>
                        <Battery size={20} /> Inverter Configuration
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Capacity (Watts)</label>
                        <input
                            type="number"
                            name="inverterCapacity"
                            className="input-field"
                            step="100"
                            value={settings.inverterCapacity || ''}
                            onChange={handleChange}
                            placeholder="e.g. 5000"
                        />
                    </div>
                </div>

                <div className="card">
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--text-brand)' }}>
                        <Bell size={20} /> Notifications
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>Enable energy saving alerts</span>
                        <label style={{ position: 'relative', display: 'inline-block', width: '40px', height: '24px' }}>
                            <input
                                type="checkbox"
                                name="notificationsEnabled"
                                checked={settings.notificationsEnabled || false}
                                onChange={handleChange}
                                style={{ opacity: 0, width: 0, height: 0 }}
                            />
                            <span style={{
                                position: 'absolute',
                                cursor: 'pointer',
                                top: 0, left: 0, right: 0, bottom: 0,
                                backgroundColor: settings.notificationsEnabled ? 'var(--accent)' : 'var(--bg-blue)',
                                borderRadius: '24px',
                                transition: '.4s'
                            }}>
                                <span style={{
                                    position: 'absolute',
                                    content: '""',
                                    height: '16px',
                                    width: '16px',
                                    left: settings.notificationsEnabled ? '20px' : '4px',
                                    bottom: '4px',
                                    backgroundColor: 'white',
                                    borderRadius: '50%',
                                    transition: '.4s'
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
