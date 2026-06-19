import React, { useState } from 'react';
import { Settings as SettingsIcon, Save } from 'lucide-react';

const Settings = ({ settings, onUpdateSettings }) => {
    const [baseCost, setBaseCost] = useState(settings?.baseCost ?? 50);
    const [rate, setRate] = useState(settings?.rate ?? 0.15);
    const [saved, setSaved] = useState(false);

    const handleSave = (e) => {
        e.preventDefault();
        onUpdateSettings({
            baseCost: parseFloat(baseCost),
            rate: parseFloat(rate)
        });
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div>
            <div className="header" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <SettingsIcon size={24} />
                <span>Settings</span>
            </div>
            <div className="sub-header">Configure your energy profile.</div>

            <div className="content">
                <form onSubmit={handleSave} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Base Monthly Cost ($)</label>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                            Fixed charges on your electricity bill before usage.
                        </p>
                        <input
                            type="number"
                            step="0.01"
                            className="input-field"
                            value={baseCost}
                            onChange={(e) => setBaseCost(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Electricity Rate ($/kWh)</label>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                            The cost per kilowatt-hour of energy you consume.
                        </p>
                        <input
                            type="number"
                            step="0.001"
                            className="input-field"
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}
                    >
                        <Save size={20} />
                        {saved ? 'Saved!' : 'Save Settings'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Settings;
