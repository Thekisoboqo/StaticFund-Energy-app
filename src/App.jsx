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

const defaultSettings = {
  electricityRate: 0.15,
  inverterConfig: '5kW',
  agentMemory: true,
  notifications: true
};

function App() {
  const [activeScreen, setActiveScreen] = useState('inventory');

  const [devices, setDevices] = useState(() => {
    const saved = localStorage.getItem('shining-bohr-devices');
    return saved ? JSON.parse(saved) : defaultDevices;
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('shining-bohr-settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('shining-bohr-devices', JSON.stringify(devices));
  }, [devices]);

  useEffect(() => {
    localStorage.setItem('shining-bohr-settings', JSON.stringify(settings));
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

  const updateSettings = (updatedSettings) => {
    setSettings({ ...settings, ...updatedSettings });
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
        return <Insights devices={devices} electricityRate={settings.electricityRate} />;
      case 'settings':
        return <Settings settings={settings} onUpdateSettings={updateSettings} />;
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