import React from 'react';

const Settings = ({ elecRate, onRateChange }) => {
    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Manage your preferences.</div>

            <div className="content">
                <div className="card">
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Preferences</h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                            Electricity Rate ($/kWh)
                        </label>
                        <input
                            type="number"
                            className="input-field"
                            placeholder="0.15"
                            step="0.01"
                            min="0"
                            value={elecRate}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (val === '') {
                                    onRateChange('');
                                } else {
                                    onRateChange(parseFloat(val));
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
