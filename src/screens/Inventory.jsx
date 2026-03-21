import React, { useState } from 'react';
import { Camera, ChevronRight, Refrigerator, Tv, Zap, CheckCircle } from 'lucide-react';

const Inventory = ({ devices, onAdd, onRemove }) => {
    const [name, setName] = useState('');
    const [watts, setWatts] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !watts) return;
        onAdd({ name, watts: parseInt(watts) });
        setName('');
        setWatts('');
        setIsAdding(false);
    };

    const getIcon = (name) => {
        const lower = name.toLowerCase();
        if (lower.includes('fridge')) return <Refrigerator size={24} />;
        if (lower.includes('tv')) return <Tv size={24} />;
        return <Zap size={24} />;
    };

    return (
        <div>
            <div className="header">My Home's Devices</div>
            <div className="sub-header">Let's build your energy profile together.</div>

            <div style={{ padding: '0 1.5rem 1.5rem' }}>
                {/* Scan Card */}
                {!isAdding ? (
                    <div
                        className="card card-blue"
                        style={{
                            height: '180px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            marginBottom: '2rem',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                        onClick={() => setIsAdding(true)}
                    >
                        {/* Decorative circle */}
                        <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

                        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
                            <Camera size={32} color="#38BDF8" />
                        </div>
                        <span style={{ fontWeight: 600, fontSize: '1.125rem' }}>Scan a new appliance</span>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="card" style={{ marginBottom: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Add New Device</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="Appliance Name (e.g. TV)"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoFocus
                            />
                            <input
                                type="number"
                                className="input-field"
                                placeholder="Wattage (W)"
                                value={watts}
                                onChange={(e) => setWatts(e.target.value)}
                            />
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button type="button" className="btn" style={{ flex: 1, border: '1px solid var(--border)' }} onClick={() => setIsAdding(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Add</button>
                            </div>
                        </div>
                    </form>
                )}

                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Tracked Devices</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {devices.map((device) => (
                        <div key={device.id} className="card" style={{ display: 'flex', alignItems: 'center', padding: '1rem', gap: '1rem' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                backgroundColor: 'var(--bg-orange)',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#FBBF24'
                            }}>
                                {getIcon(device.name)}
                            </div>

                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 600 }}>{device.name}</div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{device.watts}W</div>
                            </div>

                            <button onClick={() => onRemove(device.id)} style={{ color: 'var(--text-secondary)' }}>
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer / Progress */}
            <div style={{
                position: 'sticky',
                bottom: 0,
                backgroundColor: 'var(--bg-card)',
                padding: '1.5rem',
                borderTop: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
                boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.3)',
                zIndex: 10
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
                    <span>Profile Completeness: <span style={{ color: 'var(--text-primary)' }}>Good Start!</span></span>
                    <CheckCircle size={16} color="var(--accent)" />
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--bg-primary)', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                    <div style={{ width: '60%', height: '100%', backgroundColor: 'var(--accent)', borderRadius: '4px' }} />
                </div>
            </div>
        </div>
    );
};

export default Inventory;
