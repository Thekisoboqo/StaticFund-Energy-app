import React, { useState, useEffect } from 'react';
import { AlertTriangle, Zap } from 'lucide-react';

const Settings = ({ resetDevices }) => {
    const [rate, setRate] = useState(() => {
        try {
            const stored = localStorage.getItem('electricityRate');
            return stored ? parseFloat(stored) : 0.15;
        } catch (e) {
            console.error('Error reading electricity rate', e);
            return 0.15;
        }
    });

    useEffect(() => {
        localStorage.setItem('electricityRate', rate.toString());
    }, [rate]);

    const handleRateChange = (e) => {
        const val = parseFloat(e.target.value);
        if (!isNaN(val) && val >= 0) {
            setRate(val);
        }
    };

    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Customize your app preferences.</div>

            <div className="content">
                <div className="card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: 'rgba(12, 211, 173, 0.1)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--text-brand)',
                        }}>
                            <Zap size={24} />
                        </div>
                        <div>
                            <span style={{ fontWeight: 700, fontSize: '1.125rem', display: 'block' }}>Electricity Rate</span>
                            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Cost per kWh</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.125rem', fontWeight: 600 }}>$</span>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            className="input-field"
                            value={rate}
                            onChange={handleRateChange}
                            style={{ flex: 1 }}
                        />
                    </div>
                </div>

                <div className="card" style={{ padding: '1.5rem', borderColor: '#7f1d1d' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ef4444',
                        }}>
                            <AlertTriangle size={24} />
                        </div>
                        <div>
                            <span style={{ fontWeight: 700, fontSize: '1.125rem', display: 'block', color: '#ef4444' }}>Danger Zone</span>
                            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Reset all device data</span>
                        </div>
                    </div>
                    <button
                        className="btn"
                        style={{
                            width: '100%',
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            color: '#ef4444',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            fontWeight: 600
                        }}
                        onClick={() => {
                            if (window.confirm("Are you sure you want to reset all tracked devices to their defaults? This action cannot be undone.")) {
                                resetDevices();
                            }
                        }}
                    >
                        Clear All Devices
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
