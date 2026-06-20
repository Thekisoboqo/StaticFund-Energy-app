import React, { useState, useEffect, Suspense, lazy } from 'react';
import Layout from './components/Layout';

const Inventory = lazy(() => import('./screens/Inventory'));
const Audit = lazy(() => import('./screens/Audit'));
const Insights = lazy(() => import('./screens/Insights'));
const Settings = lazy(() => import('./screens/Settings'));

const INITIAL_DEVICES = [
  { id: 1, name: 'Living Room Heater', watts: 1500, hours: 0 },
  { id: 2, name: 'Samsung Fridge', watts: 200, hours: 24 },
  { id: 3, name: 'Microwave', watts: 200, hours: 0 },
];

const INITIAL_SETTINGS = {
  electricityRate: 0.15,
  inverterCapacity: 5,
  batteryCapacity: 10,
  agentMemory: true,
  notificationsEnabled: false,
};

function App() {
  const [activeScreen, setActiveScreen] = useState('inventory');

  const [settings, setSettings] = useState(() => {
    try {
      const stored = localStorage.getItem('settings');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object') {
          return { ...INITIAL_SETTINGS, ...parsed };
        }
      }
    } catch (e) {
      console.error('Error parsing settings from localStorage', e);
    }
    return INITIAL_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  const [devices, setDevices] = useState(() => {
    try {
      const stored = localStorage.getItem('devices');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error parsing devices from localStorage', e);
    }
    return INITIAL_DEVICES;
  });

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
    setDevices(INITIAL_DEVICES);
    setSettings(INITIAL_SETTINGS);
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
        return <Settings settings={settings} setSettings={setSettings} onClearData={clearData} />;
      default:
        return <Inventory devices={devices} onAdd={addDevice} onUpdate={updateDevice} onRemove={removeDevice} />;
    }
  };

  return (
    <Layout activeScreen={activeScreen} onScreenChange={setActiveScreen}>
      <Suspense fallback={<div style={{ padding: '1.5rem', color: 'var(--text-secondary)' }}>Loading...</div>}>
        {renderScreen()}
      </Suspense>
    </Layout>
  );
}

export default App;
