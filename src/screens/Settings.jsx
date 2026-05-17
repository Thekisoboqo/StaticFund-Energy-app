import React from 'react';
import { DollarSign, Save } from 'lucide-react';

const Settings = ({ electricityRate, onRateChange }) => {
    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Customize your app preferences.</div>

            <div className="content">
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                        <DollarSign size={20} color="var(--accent)" />
                        <span>Electricity Rate ($/kWh)</span>
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        Enter your current utility rate to accurately estimate your monthly bill.
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>$</span>
                        <input
                            type="number"
                            step="0.01"
                            min="0.01"
                            className="input-field"
                            value={electricityRate}
                            onChange={(e) => onRateChange(parseFloat(e.target.value) || 0)}
                            style={{ flex: 1 }}
                        />
                    </div>
                </div>

                <div className="card" style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                        <Save size={20} color="var(--accent)" />
                        <span>Data Management</span>
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        All your data is saved locally on your device for privacy.
                    </div>
                    <button
                        className="btn"
                        style={{ border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                        onClick={() => {
                            if (window.confirm("Are you sure you want to clear all data? This cannot be undone.")) {
                                localStorage.clear();
                                window.location.reload();
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
