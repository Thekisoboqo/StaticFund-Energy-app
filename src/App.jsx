import React, { useState } from 'react';
import Layout from './components/Layout';
import Inventory from './screens/Inventory';
import Audit from './screens/Audit';
import Insights from './screens/Insights';

import { useEffect } from 'react';

function App() {
  const [activeScreen, setActiveScreen] = useState('inventory');
  const [rate, setRate] = useState(() => {
    try {
      const saved = localStorage.getItem('electricityRate');
      return saved ? parseFloat(saved) : 0.15;
    } catch {
      return 0.15;
    }
  });

  const [devices, setDevices] = useState(() => {
    try {
      const saved = localStorage.getItem('userDevices');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Fallback
    }
    return [
      { id: 1, name: 'Living Room Heater', watts: 1500, hours: 0 },
      { id: 2, name: 'Samsung Fridge', watts: 200, hours: 24 },
      { id: 3, name: 'Microwave', watts: 200, hours: 0 },
    ];
  });

  useEffect(() => {
    localStorage.setItem('userDevices', JSON.stringify(devices));
  }, [devices]);

  useEffect(() => {
    localStorage.setItem('electricityRate', rate.toString());
  }, [rate]);

  const addDevice = (device) => {
    setDevices([...devices, { ...device, id: Date.now(), hours: 0 }]);
  };

  const updateDevice = (id, updatedDevice) => {
    setDevices(devices.map(d => d.id === id ? { ...d, ...updatedDevice } : d));
  };

  const removeDevice = (id) => {
    setDevices(devices.filter(d => d.id !== id));
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'inventory':
        return (
          <Inventory
            devices={devices}
            onAdd={addDevice}
            onRemove={removeDevice}
          />
        );
      case 'audit':
        return <Audit devices={devices} onUpdate={updateDevice} onScreenChange={setActiveScreen} />;
      case 'insights':
        return <Insights devices={devices} rate={rate} />;
      case 'settings':
        return (
          <div>
            <div className="header">Settings</div>
            <div className="content">
              <div className="card">
                <h3 style={{ marginBottom: '1rem', color: 'var(--text-brand)' }}>Energy Costs</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    Electricity Rate ($/kWh)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="input-field"
                    value={rate}
                    onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
                  />
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    Update this to match your local utility rate for more accurate savings estimates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <Inventory />;
    }
  };

  return (
    <Layout activeScreen={activeScreen} onScreenChange={setActiveScreen}>
      {renderScreen()}
    </Layout>
  );
}

export default App;
