import React from 'react';

const Settings = ({ electricityRate, setElectricityRate, inverterConfig, setInverterConfig }) => {
    const handleInverterChange = (field, value) => {
        setInverterConfig(prev => ({ ...prev, [field]: value }));
    };

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

                <div className="card" style={{ padding: '1.5rem', marginTop: '1rem' }}>
                    <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 700 }}>Inverter Integration</h3>
                    <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        Connect your smart inverter API (Sunsynk, Deye, Growatt, Victron, Huawei) for real-time tracking.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Brand / API Type</label>
                            <select
                                className="input-field"
                                value={inverterConfig?.brand || ''}
                                onChange={(e) => handleInverterChange('brand', e.target.value)}
                                style={{ width: '100%' }}
                            >
                                <option value="">Select an Inverter Brand</option>
                                <option value="Sunsynk">Sunsynk (api.sunsynk.net)</option>
                                <option value="Deye">Deye (globalapi.solarmanpv.com)</option>
                                <option value="Growatt">Growatt (openapi.growatt.com)</option>
                                <option value="Victron">Victron (vrmapi.victronenergy.com)</option>
                                <option value="Huawei">Huawei (intl.fusionsolar.huawei.com)</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Plant ID / System ID</label>
                            <input
                                type="text"
                                className="input-field"
                                value={inverterConfig?.plantId || ''}
                                onChange={(e) => handleInverterChange('plantId', e.target.value)}
                                placeholder="e.g. 123456"
                                style={{ width: '100%' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>API Username</label>
                            <input
                                type="text"
                                className="input-field"
                                value={inverterConfig?.username || ''}
                                onChange={(e) => handleInverterChange('username', e.target.value)}
                                placeholder="Email or Username"
                                style={{ width: '100%' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>API Password / Token</label>
                            <input
                                type="password"
                                className="input-field"
                                value={inverterConfig?.password || ''}
                                onChange={(e) => handleInverterChange('password', e.target.value)}
                                placeholder="••••••••"
                                style={{ width: '100%' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
