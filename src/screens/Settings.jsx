import React from 'react';
import { Save } from 'lucide-react';

const Settings = ({ settings, onUpdateSettings }) => {
    const handleChange = (key, value) => {
        onUpdateSettings({ ...settings, [key]: value });
    };

    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Manage your application preferences.</div>

            <div className="content">
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Electricity Rate ($/kWh)</label>
                        <input
                            type="number"
                            className="input-field"
                            value={settings.electricityRate || ''}
                            onChange={(e) => handleChange('electricityRate', parseFloat(e.target.value) || 0)}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Inverter Capacity (kW)</label>
                        <input
                            type="number"
                            className="input-field"
                            value={settings.inverterCapacity || ''}
                            onChange={(e) => handleChange('inverterCapacity', parseFloat(e.target.value) || 0)}
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 600 }}>Enable Notifications</span>
                        <input
                            type="checkbox"
                            checked={settings.notificationsEnabled || false}
                            onChange={(e) => handleChange('notificationsEnabled', e.target.checked)}
                            style={{ width: '20px', height: '20px' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
