import { useMemo, useState, useEffect } from 'preact/hooks';
import { Clock, Thermometer, Lightbulb, Battery, Sun } from 'lucide-preact';
import { loadRateRPerKwh, DEFAULT_RATE_R_PER_KWH } from '../utils/constants';

const formatRand = (amount) => {
  const n = Math.max(0, Math.round(amount));
  return `R${n.toLocaleString('en-ZA')}`;
};

const formatRate = (rate) => `R${Number(rate).toFixed(2)}`;

const Insights = ({ devices }) => {
  const [rateRPerKwh, setRateRPerKwh] = useState(loadRateRPerKwh);

  useEffect(() => {
    const sync = () => setRateRPerKwh(loadRateRPerKwh());
    window.addEventListener('storage', sync);
    window.addEventListener('focus', sync);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener('focus', sync);
    };
  }, []);

  // Re-read when navigating back (same-tab localStorage writes don't fire `storage`)
  useEffect(() => {
    setRateRPerKwh(loadRateRPerKwh());
  }, [devices]);

  const { monthlyKwh, estBill, categories, tips } = useMemo(() => {
    const byCategory = { Heating: 0, Cooking: 0, Other: 0 };

    const categorize = (name = '') => {
      const n = name.toLowerCase();
      if (/heater|geyser|iron|kettle|dryer|air.?con|ac\b/.test(n)) return 'Heating';
      if (/stove|oven|microwave|fridge|freezer|dishwasher/.test(n)) return 'Cooking';
      return 'Other';
    };

    let dailyWh = 0;
    for (const device of devices) {
      const hours = Number(device.hours) || 0;
      const watts = Number(device.watts) || 0;
      const wh = watts * hours;
      dailyWh += wh;
      byCategory[categorize(device.name)] += wh;
    }

    const daily = dailyWh / 1000;
    const monthly = daily * 30;
    const bill = monthly * rateRPerKwh;

    const categoryRand = Object.fromEntries(
      Object.entries(byCategory).map(([k, wh]) => [k, (wh / 1000) * 30 * rateRPerKwh])
    );

    const tipDefs = [
      {
        id: 1,
        icon: Clock,
        bg: 'var(--status-blue-bg)',
        color: 'var(--status-blue-icon)',
        title: 'Shift to Off-Peak',
        body: 'Run dishwasher/laundry after 9 PM where TOU applies.',
        fraction: 0.12,
      },
      {
        id: 2,
        icon: Thermometer,
        bg: 'var(--status-red-bg)',
        color: 'var(--status-red-text)',
        title: 'Lower Geyser Temp',
        body: 'Set to 55°C.',
        fraction: 0.08,
      },
      {
        id: 3,
        icon: Lightbulb,
        bg: 'var(--status-amber-bg)',
        color: 'var(--status-amber-icon)',
        title: 'Switch to LEDs',
        body: 'Replace old bulbs.',
        fraction: 0.03,
      },
    ];

    return {
      monthlyKwh: monthly,
      estBill: bill,
      categories: categoryRand,
      tips: tipDefs.map((t) => ({ ...t, save: bill * t.fraction })),
    };
  }, [devices, rateRPerKwh]);

  const totalCat = Object.values(categories).reduce((a, b) => a + b, 0) || 1;
  const pct = (v) => Math.round((v / totalCat) * 100);

  const heatingPct = pct(categories.Heating);
  const cookingPct = pct(categories.Cooking);

  const donut = `conic-gradient(var(--status-amber-text) 0% ${heatingPct}%, var(--status-emerald-text) ${heatingPct}% ${heatingPct + cookingPct}%, var(--status-blue-text) ${heatingPct + cookingPct}% 100%)`;

  return (
    <div>
      <div className="header">Your Personal Energy Plan</div>
      <div className="sub-header">
        At {formatRate(rateRPerKwh)}/kWh · ~{monthlyKwh.toFixed(0)} kWh/mo from your devices
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0', position: 'relative' }}>
          <div
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: donut,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: '140px',
                height: '140px',
                backgroundColor: 'var(--bg-primary)',
                borderRadius: '50%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                zIndex: 10,
              }}
            >
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                Estimated
                <br />
                Monthly Bill:
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{formatRand(estBill)}</div>
            </div>
          </div>

          <div style={{ position: 'absolute', top: '10%', right: '-10px', textAlign: 'left' }}>
            <div style={{ fontWeight: 600 }}>Heating</div>
            <div style={{ fontWeight: 700 }}>{formatRand(categories.Heating)}</div>
          </div>
          <div style={{ position: 'absolute', bottom: '20%', right: '-10px', textAlign: 'left' }}>
            <div style={{ fontWeight: 600 }}>Cooking</div>
            <div style={{ fontWeight: 700 }}>{formatRand(categories.Cooking)}</div>
          </div>
          <div style={{ position: 'absolute', top: '40%', left: '-10px', textAlign: 'right' }}>
            <div style={{ fontWeight: 600 }}>Other</div>
            <div style={{ fontWeight: 700 }}>{formatRand(categories.Other)}</div>
          </div>
        </div>

        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '1rem', textAlign: 'center' }}>
          Change your rate in Settings (default {formatRate(DEFAULT_RATE_R_PER_KWH)} municipal mid-band).
        </div>

        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Top Savings Opportunities</h3>

        <div
          style={{
            display: 'flex',
            gap: '1rem',
            overflowX: 'auto',
            paddingBottom: '1rem',
            marginRight: '-1.5rem',
            paddingRight: '1.5rem',
          }}
        >
          {tips.map((tip) => {
            const Icon = tip.icon;
            return (
              <div
                key={tip.id}
                className="card"
                style={{ minWidth: '160px', flex: '0 0 auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ background: tip.bg, padding: '0.5rem', borderRadius: '50%' }}>
                    <Icon size={20} color={tip.color} />
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--status-gray)' }}>{tip.id}</span>
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{tip.title}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{tip.body}</div>
                <div
                  style={{
                    marginTop: 'auto',
                    background: 'var(--status-emerald-bg)',
                    color: 'var(--status-emerald-text)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textAlign: 'center',
                  }}
                >
                  Save ~{formatRand(tip.save)}/mo
                </div>
              </div>
            );
          })}
        </div>

        <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <Sun size={32} color="var(--status-amber-icon)" />
            <div
              style={{
                position: 'absolute',
                bottom: -5,
                right: -5,
                background: 'var(--status-emerald-icon)',
                borderRadius: '50%',
                padding: '2px',
              }}
            >
              <Battery size={12} color="var(--bg-primary)" />
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Long-Term Goal: Energy Independence</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              After you buy less this month, size solar for your real load — not a guess.
            </div>
            <button style={{ marginTop: '0.5rem', fontSize: '0.75rem', fontWeight: 700, textDecoration: 'underline' }}>
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
