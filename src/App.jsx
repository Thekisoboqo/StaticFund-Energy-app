import React, { useState } from 'react';
import Layout from './components/Layout';
import Inventory from './screens/Inventory';
import Audit from './screens/Audit';
import Insights from './screens/Insights';

function App() {
  const [activeScreen, setActiveScreen] = useState(() => {
    return localStorage.getItem('activeScreen') || 'inventory';
  });

  const [devices, setDevices] = useState(() => {
    const saved = localStorage.getItem('devices');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      { id: 1, name: 'Living Room Heater', watts: 1500, hours: 0 },
      { id: 2, name: 'Samsung Fridge', watts: 200, hours: 24 },
      { id: 3, name: 'Microwave', watts: 200, hours: 0 },
    ];
  });

  const handleScreenChange = (screen) => {
    setActiveScreen(screen);
    localStorage.setItem('activeScreen', screen);
  };

  const updateDevicesStorage = (newDevices) => {
    setDevices(newDevices);
    localStorage.setItem('devices', JSON.stringify(newDevices));
  };

  const addDevice = (device) => {
    updateDevicesStorage([...devices, { ...device, id: Date.now(), hours: 0 }]);
  };

  const updateDevice = (id, updatedDevice) => {
    updateDevicesStorage(devices.map(d => d.id === id ? { ...d, ...updatedDevice } : d));
  };

  const removeDevice = (id) => {
    updateDevicesStorage(devices.filter(d => d.id !== id));
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
        return <Audit devices={devices} onUpdate={updateDevice} onScreenChange={handleScreenChange} />;
      case 'insights':
        return <Insights devices={devices} />;
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
    <Layout activeScreen={activeScreen} onScreenChange={handleScreenChange}>
      {renderScreen()}
    </Layout>
  );
}

export default App;
