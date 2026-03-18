import React from 'react';
import { Trash2, RefreshCw } from 'lucide-react';

const Settings = ({ setDevices }) => {
    const handleClearData = () => {
        if (window.confirm("Are you sure you want to clear all your tracked devices?")) {
            localStorage.removeItem('staticfund_devices');
            setDevices([]);
        }
    };

    const handleResetDemo = () => {
        const demoDevices = [
            { id: 1, name: 'Living Room Heater', watts: 1500, hours: 0 },
            { id: 2, name: 'Samsung Fridge', watts: 200, hours: 24 },
            { id: 3, name: 'Microwave', watts: 200, hours: 0 },
        ];
        localStorage.setItem('staticfund_devices', JSON.stringify(demoDevices));
        setDevices(demoDevices);
    };

    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Manage your application data.</div>

            <div className="content">
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Data Management</h3>

                    <button
                        className="btn"
                        style={{
                            justifyContent: 'flex-start',
                            gap: '0.75rem',
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            color: '#EF4444',
                            border: '1px solid rgba(239, 68, 68, 0.2)'
                        }}
                        onClick={handleClearData}
                    >
                        <Trash2 size={20} />
                        Clear All Data
                    </button>

                    <button
                        className="btn"
                        style={{
                            justifyContent: 'flex-start',
                            gap: '0.75rem',
                            backgroundColor: 'rgba(12, 211, 173, 0.1)',
                            color: 'var(--accent)',
                            border: '1px solid rgba(12, 211, 173, 0.2)'
                        }}
                        onClick={handleResetDemo}
                    >
                        <RefreshCw size={20} />
                        Reset Demo Data
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
