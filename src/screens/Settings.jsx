import React from 'react';
import { Trash2, AlertCircle } from 'lucide-react';

const Settings = ({ onReset }) => {
    const handleReset = () => {
        if (window.confirm("Are you sure you want to clear all your tracked devices? This cannot be undone.")) {
            onReset();
        }
    };

    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Manage your data and preferences.</div>

            <div className="content">
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid #7F1D1D', backgroundColor: '#35191A' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#F87171' }}>
                        <AlertCircle size={24} />
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, margin: 0 }}>Danger Zone</h3>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        Clearing your data will remove all scanned devices, tracked hours, and insights from this device.
                    </p>
                    <button
                        onClick={handleReset}
                        className="btn"
                        style={{ backgroundColor: '#DC2626', color: 'white', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}
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
