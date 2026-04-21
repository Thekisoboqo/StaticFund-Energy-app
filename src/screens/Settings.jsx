import React, { useState } from 'react';
import { Save, Trash2, Bell, Zap, Settings2 } from 'lucide-react';

const Settings = ({ onWipeData }) => {
    const [rate, setRate] = useState(() => {
        const storedRate = localStorage.getItem('electricityRate');
        return storedRate ? parseFloat(storedRate) : 0.15;
    });

    const [inverter, setInverter] = useState(() => {
        return localStorage.getItem('inverterConfig') || '5kW';
    });

    const [notifications, setNotifications] = useState(() => {
        const storedNotifs = localStorage.getItem('notifications');
        return storedNotifs !== null ? storedNotifs === 'true' : true;
    });

    const handleSave = () => {
        localStorage.setItem('electricityRate', rate);
        localStorage.setItem('inverterConfig', inverter);
        localStorage.setItem('notifications', notifications);
        alert('Settings saved successfully!');
    };

    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Manage your app preferences and data.</div>

            <div className="content" style={{ paddingBottom: '2rem' }}>
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    <div>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                            <Zap size={18} color="var(--accent)" />
                            Electricity Rate ($/kWh)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            className="input-field"
                            value={rate}
                            onChange={(e) => setRate(parseFloat(e.target.value))}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                            <Settings2 size={18} color="var(--accent)" />
                            Inverter Configuration
                        </label>
                        <select
                            className="input-field"
                            value={inverter}
                            onChange={(e) => setInverter(e.target.value)}
                            style={{ appearance: 'none', backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)' }}
                        >
                            <option value="3kW">3kW System</option>
                            <option value="5kW">5kW System</option>
                            <option value="8kW">8kW System</option>
                            <option value="10kW">10kW+ System</option>
                        </select>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                            <Bell size={18} color="var(--accent)" />
                            Push Notifications
                        </div>
                        <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px' }}>
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
                                borderRadius: '24px'
                            }}>
                                <span style={{
                                    position: 'absolute',
                                    content: '""',
                                    height: '18px',
                                    width: '18px',
                                    left: notifications ? '22px' : '3px',
                                    bottom: '3px',
                                    backgroundColor: notifications ? '#111C1A' : 'var(--text-secondary)',
                                    transition: '.4s',
                                    borderRadius: '50%'
                                }} />
                            </span>
                        </label>
                    </div>

                    <button className="btn btn-primary" onClick={handleSave} style={{ marginTop: '1rem' }}>
                        <Save size={20} style={{ marginRight: '0.5rem' }} />
                        Save Preferences
                    </button>
                </div>

                <div className="card" style={{ marginTop: '1.5rem', border: '1px solid #7F1D1D' }}>
                    <h3 style={{ color: '#F87171', marginBottom: '0.5rem' }}>Danger Zone</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        This will permanently delete all your tracked devices and custom settings from this device.
                    </p>
                    <button
                        className="btn"
                        onClick={onWipeData}
                        style={{ backgroundColor: '#7F1D1D', color: '#FECACA', width: '100%' }}
                    >
                        <Trash2 size={20} style={{ marginRight: '0.5rem' }} />
                        Wipe All Data
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
