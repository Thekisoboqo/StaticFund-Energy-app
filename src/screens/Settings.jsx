import { useState, useEffect } from 'preact/compat';
import { loadRateRPerKwh, DEFAULT_RATE_R_PER_KWH, RATE_STORAGE_KEY } from '../utils/constants';

const Settings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    try {
      const stored = localStorage.getItem('settings_notifications');
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (typeof parsed === 'boolean') {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error parsing notifications setting from localStorage', e);
    }
    return true;
  });

  const [rateInput, setRateInput] = useState(() => String(loadRateRPerKwh()));

  useEffect(() => {
    localStorage.setItem('settings_notifications', JSON.stringify(notificationsEnabled));
  }, [notificationsEnabled]);

  const commitRate = (raw) => {
    const cleaned = String(raw).replace(',', '.').trim();
    const value = Number.parseFloat(cleaned);
    if (!Number.isFinite(value) || value <= 0) {
      setRateInput(String(loadRateRPerKwh()));
      return;
    }
    const rounded = Math.round(value * 100) / 100;
    const oldVal = localStorage.getItem(RATE_STORAGE_KEY);
    const newVal = JSON.stringify(rounded);
    localStorage.setItem(RATE_STORAGE_KEY, newVal);
    setRateInput(String(rounded));

    // Dispatch a proper StorageEvent to sync same-tab components
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: RATE_STORAGE_KEY,
        oldValue: oldVal,
        newValue: newVal,
        url: window.location.href,
        storageArea: localStorage,
      })
    );
  };

  return (
    <div>
      <div className="header">Settings</div>
      <div className="sub-header">Manage your preferences.</div>

      <div className="content">
        <div className="card" style={{ marginBottom: '1rem' }}>
          <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Electricity rate</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
            R per kWh (VAT-incl.). Default R{DEFAULT_RATE_R_PER_KWH.toFixed(2)} is a typical municipal prepaid mid-band — check your last token slip.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontWeight: 700 }}>R</span>
            <input
              type="number"
              inputMode="decimal"
              min="0.01"
              step="0.01"
              value={rateInput}
              onChange={(e) => setRateInput(e.target.value)}
              onBlur={() => commitRate(rateInput)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.currentTarget.blur();
                }
              }}
              style={{
                flex: 1,
                padding: '0.75rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border)',
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                fontSize: '1rem',
                fontWeight: 600,
              }}
              aria-label="Electricity rate in rand per kilowatt hour"
            />
            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>/kWh</span>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600 }}>Push Notifications</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Get alerts to save energy</div>
            </div>

            <label
              style={{
                position: 'relative',
                display: 'inline-block',
                width: '50px',
                height: '28px',
              }}
            >
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span
                style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: notificationsEnabled ? 'var(--accent)' : 'var(--status-gray-light)',
                  transition: '.4s',
                  borderRadius: '34px',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    content: '""',
                    height: '20px',
                    width: '20px',
                    left: notificationsEnabled ? '26px' : '4px',
                    bottom: '4px',
                    backgroundColor: notificationsEnabled ? 'var(--bg-primary)' : 'var(--text-primary)',
                    transition: '.4s',
                    borderRadius: '50%',
                  }}
                />
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
