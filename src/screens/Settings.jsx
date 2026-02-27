import React from 'react';

const Settings = ({ electricityRate, setElectricityRate }) => {
    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Customize your app experience.</div>

            <div className="content">
                <div className="card" style={{ padding: '1.5rem' }}>
                    <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 700 }}>Electricity Rate</h3>
                    <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        Enter your electricity rate per kWh to get accurate cost estimates.
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontWeight: 600 }}>$</span>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            className="input-field"
                            value={electricityRate}
                            onChange={(e) => setElectricityRate(parseFloat(e.target.value))}
                            style={{ maxWidth: '120px' }}
                        />
                        <span style={{ color: 'var(--text-secondary)' }}>/ kWh</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
