import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';

const Settings = ({ electricityRate, onUpdateRate }) => {
    const [rateInput, setRateInput] = useState(electricityRate.toString());

    const handleSave = (e) => {
        e.preventDefault();
        const parsed = parseFloat(rateInput);
        if (!isNaN(parsed) && parsed > 0) {
            onUpdateRate(parsed);
            alert("Settings saved!");
        } else {
            alert("Please enter a valid rate greater than 0");
        }
    };

    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Customize your preferences to improve estimations.</div>

            <div className="content">
                <form className="card card-mint" onSubmit={handleSave}>
                    <h3 style={{ marginBottom: '1rem', fontWeight: 600 }}>Energy Rate ($/kWh)</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Enter your average electricity rate to get a more accurate estimation of your monthly bill.
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <div style={{
                            padding: '0.75rem',
                            backgroundColor: 'var(--bg-card)',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius-sm)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <DollarSign size={20} color="var(--accent)" />
                        </div>
                        <input
                            type="number"
                            step="0.01"
                            min="0.01"
                            value={rateInput}
                            onChange={(e) => setRateInput(e.target.value)}
                            className="input-field"
                            placeholder="e.g. 0.15"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        Save Settings
                    </button>
                </form>

                <div className="card" style={{ marginTop: '1rem' }}>
                    <h3 style={{ marginBottom: '0.5rem', fontWeight: 600 }}>About StaticFund</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        StaticFund is an energy tracking and B2B installer lead generation tool that helps you simulate your complex home energy usage. Version 1.0.0.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Settings;
