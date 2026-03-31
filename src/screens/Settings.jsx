import React from 'react';
import { Trash2, Shield, User, Bell } from 'lucide-react';

const Settings = ({ onClearData }) => {
    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Manage your privacy and preferences.</div>

            <div className="content">
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Account & Privacy</h3>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem 0' }}>
                        <div style={{ background: '#1A2733', padding: '0.5rem', borderRadius: '50%' }}>
                            <User size={20} color="#38BDF8" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600 }}>Profile</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Update your details.</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem 0' }}>
                        <div style={{ background: '#162B27', padding: '0.5rem', borderRadius: '50%' }}>
                            <Shield size={20} color="#0CD3AD" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600 }}>Privacy Mode</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Your data stays local.</div>
                        </div>
                        <div style={{ background: '#0CD3AD', color: '#111C1A', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
                            ON
                        </div>
                    </div>
                </div>

                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Data Management</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        All your device and tracking data is stored directly on your device to ensure privacy.
                    </p>

                    <button
                        className="btn"
                        style={{ background: '#451a1d', color: '#f87171', border: '1px solid #7f1d1d', marginTop: '0.5rem' }}
                        onClick={onClearData}
                    >
                        <Trash2 size={18} style={{ marginRight: '0.5rem' }} />
                        Clear All Local Data
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
