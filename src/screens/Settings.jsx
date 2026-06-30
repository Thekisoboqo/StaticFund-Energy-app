import React from 'react';
import { Settings as SettingsIcon, AlertTriangle } from 'lucide-react';

const Settings = ({ electricityRate, setElectricityRate, onClearData }) => {
    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Manage your app preferences and data.</div>

            <div style={{ padding: '0 1.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="card">
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <SettingsIcon size={20} color="var(--accent)" />
                        App Preferences
                    </h3>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                            Electricity Rate ($ / kWh)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            className="input-field"
                            value={electricityRate}
                            onChange={(e) => setElectricityRate(parseFloat(e.target.value) || 0)}
                        />
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                            Update this value to get more accurate estimated monthly bill calculations on the Insights screen.
                        </p>
                    </div>
                </div>

                <div className="card" style={{ borderColor: '#ef4444' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444' }}>
                        <AlertTriangle size={20} />
                        Danger Zone
                    </h3>

                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Clearing app data will remove all your tracked devices and reset your settings to default. This action cannot be undone.
                    </p>

                    <button
                        className="btn"
                        style={{
                            width: '100%',
                            backgroundColor: '#fee2e2',
                            color: '#b91c1c',
                            border: '1px solid #fca5a5'
                        }}
                        onClick={() => {
                            if (window.confirm('Are you sure you want to clear all app data?')) {
                                onClearData();
                            }
                        }}
                    >
                        Clear All Data
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
