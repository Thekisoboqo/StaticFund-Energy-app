import React from 'react';
import { Trash2, AlertTriangle } from 'lucide-react';

const Settings = ({ setDevices }) => {
    const handleClearData = () => {
        if (window.confirm("Are you sure you want to clear all your data? This cannot be undone.")) {
            localStorage.clear();
            setDevices([
                { id: 1, name: 'Living Room Heater', watts: 1500, hours: 0 },
                { id: 2, name: 'Samsung Fridge', watts: 200, hours: 24 },
                { id: 3, name: 'Microwave', watts: 200, hours: 0 },
            ]);
            alert("Data cleared successfully.");
            window.location.reload();
        }
    };

    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Manage your preferences and data.</div>

            <div className="content">
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <AlertTriangle size={20} color="#F59E0B" />
                        Danger Zone
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        Clearing your data will remove all saved devices, audit information, and personalized insights from this browser. It resets the app to its initial state.
                    </p>
                    <button
                        className="btn"
                        onClick={handleClearData}
                        style={{
                            backgroundColor: '#DC2626',
                            color: 'white',
                            marginTop: '0.5rem',
                            display: 'flex',
                            gap: '0.5rem',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
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
