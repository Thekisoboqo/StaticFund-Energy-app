import React from 'react';
import { Clock, Thermometer, Lightbulb, Battery, ChevronRight, Sun } from 'lucide-react';

const Insights = ({ devices }) => {
    // Mock calculation for demo purposes to match wireframe
    const totalLoad = devices.reduce((acc, device) => acc + (device.watts * (device.hours || 0)), 0) / 1000;
    // Base cost plus rate per kWh (mock logic for demo)
    const estBill = Math.round(50 + (totalLoad * 0.15) * 30);

    return (
        <div>
            <div className="header">Your Personal Energy Plan</div>
            <div className="sub-header">Actionable steps to save money.</div>

            <div>
                {/* Donut Chart Section */}
                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0', position: 'relative' }}>
                    <div style={{
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        background: 'conic-gradient(var(--status-amber-text) 0% 35%, var(--status-emerald-text) 35% 65%, var(--status-blue-text) 65% 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative'
                    }}>
                        <div style={{
                            width: '140px',
                            height: '140px',
                            backgroundColor: 'var(--bg-primary)',
                            borderRadius: '50%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            zIndex: 10
                        }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Estimated<br />Monthly Bill:</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>${estBill}</div>
                        </div>
                    </div>

                    {/* Labels (Absolute positioned for demo layout) */}
                    <div style={{ position: 'absolute', top: '10%', right: '-10px', textAlign: 'left' }}>
                        <div style={{ fontWeight: 600 }}>Heating</div>
                        <div style={{ fontWeight: 700 }}>$50</div>
                    </div>
                    <div style={{ position: 'absolute', bottom: '20%', right: '-10px', textAlign: 'left' }}>
                        <div style={{ fontWeight: 600 }}>Cooking</div>
                        <div style={{ fontWeight: 700 }}>$40</div>
                    </div>
                    <div style={{ position: 'absolute', top: '40%', left: '-10px', textAlign: 'right' }}>
                        <div style={{ fontWeight: 600 }}>Other</div>
                        <div style={{ fontWeight: 700 }}>$60</div>
                    </div>
                </div>

                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Top Savings Opportunities</h3>

                {/* Horizontal Scroll Container */}
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    overflowX: 'auto',
                    paddingBottom: '1rem',
                    marginRight: '-1.5rem', /* Bleed out */
                    paddingRight: '1.5rem'
                }}>
                    {/* Card 1 */}
                    <div className="card" style={{ minWidth: '160px', flex: '0 0 auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ background: 'var(--status-blue-bg)', padding: '0.5rem', borderRadius: '50%' }}>
                                <Clock size={20} color="var(--status-blue-icon)" />
                            </div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--status-gray)' }}>1</span>
                        </div>
                        <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Shift to Off-Peak</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Run dishwasher/laundry after 9 PM.</div>
                        <div style={{ marginTop: 'auto', background: 'var(--status-emerald-bg)', color: 'var(--status-emerald-text)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, textAlign: 'center' }}>
                            Save ~$20/mo
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="card" style={{ minWidth: '160px', flex: '0 0 auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ background: 'var(--status-red-bg)', padding: '0.5rem', borderRadius: '50%' }}>
                                <Thermometer size={20} color="var(--status-red-text)" />
                            </div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--status-gray)' }}>2</span>
                        </div>
                        <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Lower Geyser Temp</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Set to 55°C.</div>
                        <div style={{ marginTop: 'auto', background: 'var(--status-emerald-bg)', color: 'var(--status-emerald-text)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, textAlign: 'center' }}>
                            Save ~$12/mo
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="card" style={{ minWidth: '160px', flex: '0 0 auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ background: 'var(--status-amber-bg)', padding: '0.5rem', borderRadius: '50%' }}>
                                <Lightbulb size={20} color="var(--status-amber-icon)" />
                            </div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--status-gray)' }}>3</span>
                        </div>
                        <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Switch to LEDs</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Replace old bulbs.</div>
                        <div style={{ marginTop: 'auto', background: 'var(--status-emerald-bg)', color: 'var(--status-emerald-text)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, textAlign: 'center' }}>
                            Save ~$5/mo
                        </div>
                    </div>
                </div>

                {/* Goal Card */}
                <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
                    <div style={{ position: 'relative' }}>
                        <Sun size={32} color="var(--status-amber-icon)" />
                        <div style={{ position: 'absolute', bottom: -5, right: -5, background: 'var(--status-emerald-icon)', borderRadius: '50%', padding: '2px' }}>
                            <Battery size={12} color="var(--bg-primary)" />
                        </div>
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Long-Term Goal: Energy Independence</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                            Your Ideal Solar Setup: 5kW System + 10kWh Battery. Invest for lifetime savings.
                        </div>
                        <button style={{ marginTop: '0.5rem', fontSize: '0.75rem', fontWeight: 700, textDecoration: 'underline' }}>Learn More</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Insights;
