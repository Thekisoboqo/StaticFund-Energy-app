import React from 'react';
import { Settings as SettingsIcon, Save, Trash2 } from 'lucide-react';

const Settings = ({ rate, onRateChange, onClearData }) => {
    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Customize your app experience.</div>

            <div className="content">
                <div className="card" style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <SettingsIcon size={20} color="var(--accent)" />
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Preferences</h3>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                Electricity Rate ($/kWh)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                min="0.01"
                                className="input-field"
                                value={rate}
                                onChange={(e) => onRateChange(parseFloat(e.target.value) || 0)}
                            />
                        </div>
                    </div>
                </div>

                <div className="card card-mint" style={{ border: '1px solid #DC2626' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#DC2626' }}>
                        <Trash2 size={20} />
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Danger Zone</h3>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        This will permanently delete all your devices and reset the app.
                    </p>
                    <button
                        className="btn"
                        style={{ width: '100%', backgroundColor: '#FEF2F2', color: '#DC2626', border: '1px solid #FCA5A5' }}
                        onClick={() => {
                            if (window.confirm('Are you sure you want to clear all data?')) {
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
