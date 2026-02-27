import React, { useMemo } from 'react';
import { Clock, Thermometer, Lightbulb, Battery, ChevronRight } from 'lucide-react';

const Insights = ({ devices, electricityRate = 0.15 }) => {
    // Calculate total daily kWh and estimated monthly bill
    const { estBill, deviceCosts } = useMemo(() => {
        const costs = devices.map(device => {
            const dailykWh = (device.watts * (device.hours || 0)) / 1000;
            return {
                ...device,
                dailykWh,
                monthlyCost: dailykWh * 30 * electricityRate
            };
        });

        const calculatedTotalDailykWh = costs.reduce((acc, device) => acc + device.dailykWh, 0);
        const bill = calculatedTotalDailykWh * 30 * electricityRate;

        // Sort by cost descending
        costs.sort((a, b) => b.monthlyCost - a.monthlyCost);

        return { estBill: bill, deviceCosts: costs };
    }, [devices, electricityRate]);

    // Prepare data for the donut chart (Top 2 + Others)
    const chartData = useMemo(() => {
        if (deviceCosts.length === 0) return [];

        const topDevices = deviceCosts.slice(0, 2);
        const otherDevices = deviceCosts.slice(2);

        const data = topDevices.map(d => ({
            label: d.name,
            value: d.monthlyCost,
            color: '' // Assigned below
        }));

        if (otherDevices.length > 0) {
            const otherCost = otherDevices.reduce((acc, d) => acc + d.monthlyCost, 0);
            data.push({
                label: 'Other',
                value: otherCost,
                color: '' // Assigned below
            });
        }

        // Assign colors
        const colors = ['#FCD34D', '#6EE7B7', '#93C5FD'];
        data.forEach((d, i) => d.color = colors[i % colors.length]);

        return data;
    }, [deviceCosts]);

    // Generate conic-gradient string
    const gradientString = useMemo(() => {
        if (estBill === 0) return 'conic-gradient(#E5E7EB 0% 100%)';

        let currentPercent = 0;
        const segments = chartData.map(d => {
            const percent = (d.value / estBill) * 100;
            const start = currentPercent;
            currentPercent += percent;
            return `${d.color} ${start}% ${currentPercent}%`;
        });

        return `conic-gradient(${segments.join(', ')})`;
    }, [chartData, estBill]);


    return (
        <div>
            <div className="header">Your Personal Energy Plan</div>
            <div className="sub-header">Actionable steps to save money.</div>

            <div className="content">
                {/* Donut Chart Section */}
                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0', position: 'relative' }}>
                    <div style={{
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        background: gradientString,
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
                            <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>${estBill.toFixed(2)}</div>
                        </div>
                    </div>

                    {/* Labels (Dynamically positioned based on fixed slots for simplicity, or just listed on side/corners) */}
                    {/* For this implementation, I will map the top 3 items to the fixed positions if available, otherwise hide */}
                    {chartData[0] && (
                         <div style={{ position: 'absolute', top: '10%', right: '-10px', textAlign: 'left' }}>
                            <div style={{ fontWeight: 600 }}>{chartData[0].label}</div>
                            <div style={{ fontWeight: 700 }}>${chartData[0].value.toFixed(2)}</div>
                        </div>
                    )}
                    {chartData[1] && (
                        <div style={{ position: 'absolute', bottom: '20%', right: '-10px', textAlign: 'left' }}>
                            <div style={{ fontWeight: 600 }}>{chartData[1].label}</div>
                            <div style={{ fontWeight: 700 }}>${chartData[1].value.toFixed(2)}</div>
                        </div>
                    )}
                    {chartData[2] && (
                        <div style={{ position: 'absolute', top: '40%', left: '-10px', textAlign: 'right' }}>
                            <div style={{ fontWeight: 600 }}>{chartData[2].label}</div>
                            <div style={{ fontWeight: 700 }}>${chartData[2].value.toFixed(2)}</div>
                        </div>
                    )}
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
                            <div style={{ background: '#DBEAFE', padding: '0.5rem', borderRadius: '50%' }}>
                                <Clock size={20} color="#2563EB" />
                            </div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280' }}>1</span>
                        </div>
                        <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Shift to Off-Peak</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Run dishwasher/laundry after 9 PM.</div>
                        <div style={{ marginTop: 'auto', background: '#D1FAE5', color: '#065F46', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, textAlign: 'center' }}>
                            Save ~$20/mo
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="card" style={{ minWidth: '160px', flex: '0 0 auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ background: '#FEE2E2', padding: '0.5rem', borderRadius: '50%' }}>
                                <Thermometer size={20} color="#DC2626" />
                            </div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280' }}>2</span>
                        </div>
                        <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Lower Geyser Temp</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Set to 55°C.</div>
                        <div style={{ marginTop: 'auto', background: '#D1FAE5', color: '#065F46', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, textAlign: 'center' }}>
                            Save ~$12/mo
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="card" style={{ minWidth: '160px', flex: '0 0 auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ background: '#FEF3C7', padding: '0.5rem', borderRadius: '50%' }}>
                                <Lightbulb size={20} color="#D97706" />
                            </div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280' }}>3</span>
                        </div>
                        <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Switch to LEDs</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Replace old bulbs.</div>
                        <div style={{ marginTop: 'auto', background: '#D1FAE5', color: '#065F46', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, textAlign: 'center' }}>
                            Save ~$5/mo
                        </div>
                    </div>
                </div>

                {/* Goal Card */}
                <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
                    <div style={{ position: 'relative' }}>
                        <GoalIcon size={32} color="#F59E0B" />
                        <div style={{ position: 'absolute', bottom: -5, right: -5, background: '#10B981', borderRadius: '50%', padding: '2px' }}>
                            <Battery size={12} color="white" />
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

// Simple Sun icon component if not imported (but it is)
const GoalIcon = ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
);

export default Insights;
