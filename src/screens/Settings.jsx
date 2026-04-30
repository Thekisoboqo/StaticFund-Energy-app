import React from 'react';
import { Bell, DollarSign, ChevronRight } from 'lucide-react';

const Settings = ({ electricityRate, setElectricityRate }) => {
    return (
        <div>
            <div className="header">Settings</div>
            <div className="sub-header">Manage your app preferences.</div>

            <div className="content">
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ background: 'var(--bg-blue)', padding: '0.5rem', borderRadius: '50%' }}>
                                <DollarSign size={20} color="var(--accent)" />
                            </div>
                            <span style={{ fontWeight: 600 }}>Electricity Rate ($/kWh)</span>
                        </div>
                    </div>
                    <input
                        type="number"
                        step="0.01"
                        className="input-field"
                        placeholder="e.g. 0.15"
                        value={electricityRate}
                        onChange={(e) => setElectricityRate(parseFloat(e.target.value) || 0)}
                    />
                </div>

                <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ background: 'var(--bg-orange)', padding: '0.5rem', borderRadius: '50%' }}>
                            <Bell size={20} color="var(--accent)" />
                        </div>
                        <span style={{ fontWeight: 600 }}>Notifications</span>
                    </div>
                    <ChevronRight size={20} color="var(--text-secondary)" />
                </div>
            </div>
        </div>
    );
};

export default Settings;
