import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Inventory from './screens/Inventory';
import Audit from './screens/Audit';
import Insights from './screens/Insights';

function App() {
  const [activeScreen, setActiveScreen] = useState(() => {
    const saved = localStorage.getItem('activeScreen');
    return saved || 'inventory';
  });

  const [devices, setDevices] = useState(() => {
    try {
      const saved = localStorage.getItem('devices');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse devices from localStorage', e);
    }
    return [
      { id: 1, name: 'Living Room Heater', watts: 1500, hours: 0 },
      { id: 2, name: 'Samsung Fridge', watts: 200, hours: 24 },
      { id: 3, name: 'Microwave', watts: 200, hours: 0 },
    ];
  });

  useEffect(() => {
    localStorage.setItem('activeScreen', activeScreen);
  }, [activeScreen]);

  useEffect(() => {
    localStorage.setItem('devices', JSON.stringify(devices));
  }, [devices]);

  const addDevice = (device) => {
    setDevices([...devices, { ...device, id: Date.now(), hours: 0 }]);
  };

  const updateDevice = (id, updatedDevice) => {
    setDevices(devices.map(d => d.id === id ? { ...d, ...updatedDevice } : d));
  };

  const removeDevice = (id) => {
    setDevices(devices.filter(d => d.id !== id));
  };

  const clearData = () => {
    localStorage.removeItem('devices');
    localStorage.removeItem('activeScreen');
    setDevices([
      { id: 1, name: 'Living Room Heater', watts: 1500, hours: 0 },
      { id: 2, name: 'Samsung Fridge', watts: 200, hours: 24 },
      { id: 3, name: 'Microwave', watts: 200, hours: 0 },
    ]);
    setActiveScreen('inventory');
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'inventory':
        return (
          <Inventory
            devices={devices}
            onAdd={addDevice}
            onUpdate={updateDevice}
            onRemove={removeDevice}
          />
        );
      case 'audit':
        return <Audit devices={devices} onUpdate={updateDevice} onScreenChange={setActiveScreen} />;
      case 'insights':
        return <Insights devices={devices} />;
      case 'settings':
        return (
          <div>
            <div className="header">Settings</div>
            <div className="sub-header">Manage your application.</div>
            <div className="content">
              <div className="card">
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Data Management</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  Clear all your saved devices and reset the app to its initial state.
                </p>
                <button
                  className="btn"
                  style={{ backgroundColor: '#EF4444', color: 'white', width: '100%' }}
                  onClick={clearData}
                >
                  Clear All Data
                </button>
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
