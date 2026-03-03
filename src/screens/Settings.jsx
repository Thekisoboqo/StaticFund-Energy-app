import React, { useState } from 'react';
import { Save, Trash2, Settings as SettingsIcon } from 'lucide-react';

const SettingsScreen = ({ onClearData }) => {
    const [ratePerKwh, setRatePerKwh] = useState(() => {
        const stored = localStorage.getItem('app_settings');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (parsed.ratePerKwh) return parseFloat(parsed.ratePerKwh);
            } catch (e) {
                console.error("Failed to parse settings", e);
            }
        }
        return 0.15;
    });

    const handleSave = () => {
        localStorage.setItem('app_settings', JSON.stringify({ ratePerKwh: parseFloat(ratePerKwh) }));
        alert("Settings saved successfully!");
    };

    return (
        <>
            <div className="header">Settings</div>
            <div className="sub-header">Manage your app preferences and data.</div>

            <div className="content">
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                        <SettingsIcon size={20} color="var(--accent)" />
                        <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Preferences</h3>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                            Electricity Rate ($/kWh)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            className="input-field"
                            value={ratePerKwh}
                            onChange={(e) => setRatePerKwh(e.target.value)}
                        />
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                            Used to estimate your savings and monthly bill. Default is 0.15.
                        </p>
                    </div>

                    <button className="btn btn-primary" onClick={handleSave} style={{ alignSelf: 'flex-start', display: 'flex', gap: '0.5rem' }}>
                        <Save size={18} /> Save Settings
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginTop: '1rem' }}>
                        <Trash2 size={20} color="#EF4444" />
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#EF4444' }}>Danger Zone</h3>
                    </div>

                    <div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Clearing data will remove all your tracked devices and habits from this device permanently.
                        </p>
                        <button
                            className="btn"
                            style={{ border: '1px solid #EF4444', color: '#EF4444', display: 'flex', gap: '0.5rem', width: '100%' }}
                            onClick={() => {
                                if (window.confirm("Are you sure you want to delete all local data? This action cannot be undone.")) {
                                    onClearData();
                                }
                            }}
                        >
                            <Trash2 size={18} /> Clear All App Data
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
};

export default SettingsScreen;
