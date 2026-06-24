import React from 'react';
import { Trash2 } from 'lucide-react';

const Settings = ({ onClearData }) => {
    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Manage your app preferences and data.</div>

            <div className="content">
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Data Management</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        Clear all your tracked devices and reset the application to its default state.
                    </p>

                    <button
                        className="btn"
                        style={{
                            backgroundColor: '#DC2626',
                            color: 'white',
                            display: 'flex',
                            gap: '0.5rem',
                            marginTop: '0.5rem'
                        }}
                        onClick={() => {
                            if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
                                onClearData();
                            }
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
