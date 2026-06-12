import React from 'react';
import { Settings as SettingsIcon, DollarSign } from 'lucide-react';

const Settings = ({ electricityRate, setElectricityRate }) => {
    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Configure your app preferences.</div>

            <div className="content">
                <div className="card">
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <SettingsIcon size={20} color="var(--accent)" />
                        App Preferences
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                                Electricity Rate ($/kWh)
                            </label>
                            <div style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--text-secondary)' }}>
                                    <DollarSign size={16} />
                                </div>
                                <input
                                    type="number"
                                    className="input-field"
                                    style={{ paddingLeft: '2.5rem' }}
                                    value={electricityRate}
                                    step="0.01"
                                    min="0"
                                    onChange={(e) => setElectricityRate(parseFloat(e.target.value) || 0)}
                                />
                            </div>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                                Used to calculate your estimated monthly bill on the Insights screen.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
