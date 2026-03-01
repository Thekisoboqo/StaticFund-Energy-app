import React from 'react';
import { Trash2, AlertCircle } from 'lucide-react';

const Settings = ({ onReset }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="header">Settings</div>
            <div className="sub-header">Manage your app data and preferences.</div>

            <div className="content">
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ padding: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px' }}>
                            <AlertCircle size={24} color="#EF4444" />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Danger Zone</h3>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>These actions cannot be undone.</p>
                        </div>
                    </div>

                    <button
                        className="btn"
                        style={{
                            border: '1px solid #EF4444',
                            color: '#EF4444',
                            display: 'flex',
                            gap: '0.5rem',
                            marginTop: '0.5rem'
                        }}
                        onClick={() => {
                            if (window.confirm("Are you sure you want to delete all tracked devices and reset your energy plan?")) {
                                onReset();
                            }
                        }}
                    >
                        <Trash2 size={18} />
                        Clear All Data
                    </button>
                </div>

                <div className="card" style={{ marginTop: '1rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>About StaticFund</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        Version 1.0.0<br/>
                        Privacy Filter Agent Enabled. Your data stays on your device.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Settings;
