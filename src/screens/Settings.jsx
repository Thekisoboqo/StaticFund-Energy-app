import React from 'react';
import { Trash2, RefreshCcw } from 'lucide-react';

const Settings = ({ onResetData, onClearData }) => {
    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Manage your app data and preferences.</div>

            <div className="content">
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1.5rem' }}>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Reset to Defaults</h3>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            Restore the initial demo devices and discard your changes.
                        </p>
                        <button
                            className="btn"
                            style={{ backgroundColor: 'var(--bg-blue)', color: '#0369A1', marginTop: '0.5rem' }}
                            onClick={() => {
                                if (window.confirm("Are you sure you want to reset to default data?")) {
                                    onResetData();
                                }
                            }}
                        >
                            <RefreshCcw size={18} style={{ marginRight: '0.5rem' }} />
                            Reset Data
                        </button>
                    </div>

                    <div style={{ height: '1px', backgroundColor: 'var(--border)' }} />

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Clear All Data</h3>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            Remove all devices and start with a blank slate.
                        </p>
                        <button
                            className="btn"
                            style={{ backgroundColor: '#FEE2E2', color: '#DC2626', marginTop: '0.5rem' }}
                            onClick={() => {
                                if (window.confirm("Are you sure you want to clear all data? This cannot be undone.")) {
                                    onClearData();
                                }
                            }}
                        >
                            <Trash2 size={18} style={{ marginRight: '0.5rem' }} />
                            Clear Data
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Settings;
