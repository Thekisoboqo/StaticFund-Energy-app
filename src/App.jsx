import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Inventory from './screens/Inventory';
import Audit from './screens/Audit';
import Insights from './screens/Insights';
import SettingsScreen from './screens/Settings';

function App() {
  const [activeScreen, setActiveScreen] = useState(() => {
    const saved = localStorage.getItem('app_activeScreen');
    return saved || 'inventory';
  });

  const [devices, setDevices] = useState(() => {
    const saved = localStorage.getItem('app_devices');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse devices', e);
      }
    }
    return [
      { id: 1, name: 'Living Room Heater', watts: 1500, hours: 0 },
      { id: 2, name: 'Samsung Fridge', watts: 200, hours: 24 },
      { id: 3, name: 'Microwave', watts: 200, hours: 0 },
    ];
  });

  useEffect(() => {
    localStorage.setItem('app_activeScreen', activeScreen);
  }, [activeScreen]);

  useEffect(() => {
    localStorage.setItem('app_devices', JSON.stringify(devices));
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

  const handleClearData = () => {
    localStorage.clear();
    setDevices([]);
    setActiveScreen('inventory');
    window.location.reload();
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
        return <SettingsScreen onClearData={handleClearData} />;
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
