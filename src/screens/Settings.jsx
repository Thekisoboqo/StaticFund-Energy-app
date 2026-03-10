import React from 'react';

const Settings = ({ onClearData }) => {
    const handleClearData = () => {
        if (window.confirm("Are you sure you want to clear all your local data? This cannot be undone.")) {
            onClearData();
        }
    };

    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Manage your app preferences and data.</div>

            <div className="content">
                <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Data Management</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        Clear all stored data on your device, including your inventory, daily habits, and personal energy plan.
                    </p>
                    <button
                        className="btn"
                        style={{ backgroundColor: '#EF4444', color: 'white', fontWeight: 600, padding: '0.75rem' }}
                        onClick={handleClearData}
                    >
                        Clear Local Data
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
