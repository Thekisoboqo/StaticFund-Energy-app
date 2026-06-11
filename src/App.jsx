import React, { useState } from 'react';
import Layout from './components/Layout';
import Inventory from './screens/Inventory';
import Audit from './screens/Audit';
import Insights from './screens/Insights';

function App() {
  const [activeScreen, setActiveScreen] = useState('inventory');
  const [devices, setDevices] = useState(() => {
    try {
      const saved = localStorage.getItem('devices');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse devices from localStorage:', e);
    }
    return [
      { id: 1, name: 'Living Room Heater', watts: 1500, hours: 0 },
      { id: 2, name: 'Samsung Fridge', watts: 200, hours: 24 },
      { id: 3, name: 'Microwave', watts: 200, hours: 0 },
    ];
  });

  const updateDevicesState = (newDevices) => {
    setDevices(newDevices);
    try {
      localStorage.setItem('devices', JSON.stringify(newDevices));
    } catch (e) {
      console.error('Failed to save devices to localStorage:', e);
    }
  };

  const addDevice = (device) => {
    updateDevicesState([...devices, { ...device, id: Date.now(), hours: 0 }]);
  };

  const updateDevice = (id, updatedDevice) => {
    updateDevicesState(devices.map(d => d.id === id ? { ...d, ...updatedDevice } : d));
  };

  const removeDevice = (id) => {
    updateDevicesState(devices.filter(d => d.id !== id));
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
        return <Insights />;
      case 'settings':
        return (
          <div>
            <div className="header">Settings</div>
            <div style={{ padding: '1rem' }}>
              <h2>Settings</h2>
              <p>App settings will go here.</p>
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
