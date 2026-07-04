import React, { useState, useEffect } from 'react';

const Settings = () => {
    const [rate, setRate] = useState(() => {
        try {
            const stored = localStorage.getItem('electricityRate');
            if (stored) {
                const parsed = JSON.parse(stored);
                if (typeof parsed === 'number') {
                    return parsed;
                }
            }
        } catch (e) {
            console.error('Error parsing electricityRate from localStorage', e);
        }
        return 0.15; // default rate
    });

    useEffect(() => {
        localStorage.setItem('electricityRate', JSON.stringify(rate));
    }, [rate]);

    const handleClearData = () => {
        if (window.confirm("Are you sure you want to clear all app data? This action cannot be undone.")) {
            localStorage.clear();
            window.location.reload();
        }
    };

    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Manage your app preferences and data.</div>

            <div className="content">
                <div className="card">
                    <h3 style={{ marginBottom: '1rem' }}>Electricity Rate</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Set your local electricity rate per kWh to get accurate cost estimates.
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.125rem', fontWeight: 600 }}>$</span>
                        <input
                            type="number"
                            step="0.01"
                            className="input-field"
                            value={rate}
                            onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
                            style={{ flex: 1 }}
                        />
                    </div>
                </div>

                <div className="card" style={{ marginTop: '1rem', border: '1px solid #DC2626' }}>
                    <h3 style={{ marginBottom: '1rem', color: '#EF4444' }}>Danger Zone</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Clearing app data will remove all your saved devices and settings.
                    </p>
                    <button
                        className="btn"
                        style={{ width: '100%', backgroundColor: '#FEE2E2', color: '#DC2626', fontWeight: 600 }}
                        onClick={handleClearData}
                    >
                        Clear All App Data
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
