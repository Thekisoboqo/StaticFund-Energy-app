import React from 'react';
import { DollarSign, Trash2 } from 'lucide-react';

const Settings = ({ electricityRate, onRateChange, onClearData }) => {
    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Manage your app preferences.</div>

            <div className="content">
                <div className="card">
                    <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <DollarSign size={20} color="var(--accent)" />
                        Electricity Rate ($/kWh)
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Set your local electricity rate so we can accurately estimate your monthly bill and savings.
                    </p>
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        className="input-field"
                        value={electricityRate}
                        onChange={(e) => onRateChange(parseFloat(e.target.value) || 0)}
                        placeholder="e.g. 0.15"
                    />
                </div>

                <div className="card" style={{ marginTop: '1rem', borderColor: '#FCA5A5' }}>
                    <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#DC2626' }}>
                        <Trash2 size={20} color="#DC2626" />
                        Danger Zone
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        This will delete all tracked devices and reset your electricity rate to the default value. This action cannot be undone.
                    </p>
                    <button
                        className="btn"
                        style={{ width: '100%', backgroundColor: '#FEE2E2', color: '#DC2626', border: '1px solid #FCA5A5' }}
                        onClick={() => {
                            if (window.confirm("Are you sure you want to clear all your data?")) {
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