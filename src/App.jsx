import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Inventory from './screens/Inventory';
import Audit from './screens/Audit';
import Insights from './screens/Insights';
import Settings from './screens/Settings';

const defaultDevices = [
  { id: 1, name: 'Living Room Heater', watts: 1500, hours: 0 },
  { id: 2, name: 'Samsung Fridge', watts: 200, hours: 24 },
  { id: 3, name: 'Microwave', watts: 200, hours: 0 },
];

function App() {
  const [activeScreen, setActiveScreen] = useState(() => {
    return localStorage.getItem('activeScreen') || 'inventory';
  });

  const [devices, setDevices] = useState(() => {
    const saved = localStorage.getItem('devices');
    return saved ? JSON.parse(saved) : defaultDevices;
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

  const wipeData = () => {
    if (window.confirm("Are you sure you want to wipe all data? This cannot be undone.")) {
      localStorage.clear();
      setDevices(defaultDevices);
      setActiveScreen('inventory');
    }
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
        return <Settings onWipeData={wipeData} />;
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
