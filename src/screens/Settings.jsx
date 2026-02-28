import React, { useState, useEffect } from 'react';
import { Trash2, Link as LinkIcon, AlertTriangle } from 'lucide-react';

const Settings = ({ setDevices, setActiveScreen }) => {
    const [mockConnected, setMockConnected] = useState(() => {
        return localStorage.getItem('mockBackendConnected') === 'true';
    });

    useEffect(() => {
        localStorage.setItem('mockBackendConnected', mockConnected);
    }, [mockConnected]);

    const handleClearData = () => {
        if (window.confirm("Are you sure you want to clear all your device data? This cannot be undone.")) {
            localStorage.removeItem('devices');
            localStorage.removeItem('activeScreen');
            setDevices([
                { id: 1, name: 'Living Room Heater', watts: 1500, hours: 0 },
                { id: 2, name: 'Samsung Fridge', watts: 200, hours: 24 },
                { id: 3, name: 'Microwave', watts: 200, hours: 0 },
            ]);
            setActiveScreen('inventory');
        }
    };

    return (
        <div style={{ paddingBottom: '80px', flex: 1 }}>
            <div className="header">Settings</div>
            <div className="sub-header">Manage your app preferences and data.</div>

            <div style={{ padding: '0 1.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                <div className="card" style={{ marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <LinkIcon size={20} color="var(--accent)" />
                        Backend Services
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <div style={{ fontWeight: 500 }}>Simulate Multi-Agent Backend</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Enable to mock AI lead generation and analysis.</div>
                        </div>
                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={mockConnected}
                                onChange={(e) => setMockConnected(e.target.checked)}
                                style={{ width: '20px', height: '20px', accentColor: 'var(--accent)' }}
                            />
                        </label>
                    </div>
                </div>

                <div className="card card-red" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#EF4444' }}>
                        <AlertTriangle size={20} />
                        Danger Zone
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Permanently delete all your tracked devices and custom hours.
                    </p>
                    <button
                        onClick={handleClearData}
                        className="btn"
                        style={{ backgroundColor: '#EF4444', color: 'white', width: '100%', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}
                    >
                        <Trash2 size={20} />
                        Clear All Data
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
