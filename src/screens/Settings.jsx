import React from 'react';
import { Settings as SettingsIcon, Bell, Zap, Save } from 'lucide-react';

const Settings = ({ settings, setSettings }) => {
    const handleSave = (e) => {
        e.preventDefault();
        // Since we're syncing on change, this could just give a visual indicator or nothing
        // Or we could have local state that syncs up on save. Let's make it sync immediately for simplicity
    };

    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Customize your app preferences.</div>

            <div className="content">
                <form className="card" onSubmit={handleSave}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                        <div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                                <Zap size={18} color="var(--accent)" />
                                Electricity Rate ($/kWh)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                className="input-field"
                                value={settings.electricityRate}
                                onChange={(e) => setSettings({ ...settings, electricityRate: parseFloat(e.target.value) || 0 })}
                            />
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                                This is used to calculate your estimated savings.
                            </p>
                        </div>

                        <div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                                <Bell size={18} color="var(--accent)" />
                                Notifications
                            </label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={settings.notificationsEnabled}
                                        onChange={(e) => setSettings({ ...settings, notificationsEnabled: e.target.checked })}
                                        style={{ width: '1.25rem', height: '1.25rem', accentColor: 'var(--accent)' }}
                                    />
                                    <span>Enable Energy Saving Alerts</span>
                                </label>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                            <Save size={20} style={{ marginRight: '0.5rem' }} />
                            Save Settings
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Settings;
