import React, { useState, useEffect } from 'react';

const Settings = () => {
    const [rate, setRate] = useState(() => {
        const saved = localStorage.getItem('electricityRate');
        return saved || '0.15';
    });

    useEffect(() => {
        localStorage.setItem('electricityRate', rate);
    }, [rate]);

    const handleRateChange = (e) => {
        setRate(e.target.value);
    };

    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Manage your app preferences.</div>

            <div className="content">
                <div className="card">
                    <h3 style={{ marginBottom: '1rem' }}>Preferences</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Electricity Rate ($/kWh)</label>
                            <input
                                type="number"
                                step="0.01"
                                className="input-field"
                                placeholder="0.15"
                                value={rate}
                                onChange={handleRateChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
