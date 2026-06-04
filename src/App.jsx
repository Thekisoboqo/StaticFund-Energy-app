import React, { useState } from 'react';
import { useEffect } from 'react';
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

const defaultSettings = {
  electricityRate: 0.15,
  inverterCapacity: 5,
  notificationsEnabled: true,
};

function App() {
  const [activeScreen, setActiveScreen] = useState('inventory');

  const [devices, setDevices] = useState(() => {
    try {
      const saved = localStorage.getItem('devices');
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : defaultDevices;
      }
    } catch (e) {
      console.error("Failed to parse devices from localStorage", e);
    }
    return defaultDevices;
  });

  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed && typeof parsed === 'object' ? parsed : defaultSettings;
      }
    } catch (e) {
      console.error("Failed to parse settings from localStorage", e);
    }
    return defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('devices', JSON.stringify(devices));
  }, [devices]);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

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
            onUpdate={updateDevice}
            onRemove={removeDevice}
          />
        );
      case 'audit':
        return <Audit devices={devices} onUpdate={updateDevice} onScreenChange={setActiveScreen} />;
      case 'insights':
        return <Insights devices={devices} settings={settings} />;
      case 'settings':
        return <Settings settings={settings} onUpdateSettings={setSettings} />;
      default:
        return <Inventory devices={devices} onAdd={addDevice} onRemove={removeDevice} />;
    }
  };

  return (
    <Layout activeScreen={activeScreen} onScreenChange={setActiveScreen}>
      {renderScreen()}
    </Layout>
  );
}

export default App;
