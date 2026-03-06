import React from 'react';
import { Trash2 } from 'lucide-react';

const Settings = ({ setDevices }) => {
    const handleClearData = () => {
        if (window.confirm("Are you sure you want to clear all devices? This action cannot be undone.")) {
            localStorage.removeItem('staticfund_devices');
            setDevices([]);
        }
    };

    return (
        <div>
            <div className="header" style={{ padding: '0 0 0.5rem 0' }}>Settings</div>
            <div className="sub-header" style={{ padding: '0 0 1rem 0' }}>Manage your app preferences and data.</div>

            <div>
                <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Data Management</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        Clear your saved devices and start fresh.
                    </p>
                    <button
                        className="btn"
                        style={{ backgroundColor: '#FEE2E2', color: '#DC2626', gap: '0.5rem', width: 'fit-content' }}
                        onClick={handleClearData}
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
