import React, { useState, useEffect, Suspense } from 'react';
import Layout from './components/Layout';

const Inventory = React.lazy(() => import('./screens/Inventory'));
const Audit = React.lazy(() => import('./screens/Audit'));
const Insights = React.lazy(() => import('./screens/Insights'));

const INITIAL_DEVICES = [
  { id: 1, name: 'Living Room Heater', watts: 1500, hours: 0 },
  { id: 2, name: 'Samsung Fridge', watts: 200, hours: 24 },
  { id: 3, name: 'Microwave', watts: 200, hours: 0 },
];

function App() {
  const [activeScreen, setActiveScreen] = useState('inventory');

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

  const renderScreen = () => {
    switch (activeScreen) {
      case 'inventory':
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <Inventory
              devices={devices}
              onAdd={addDevice}
              onUpdate={updateDevice}
              onRemove={removeDevice}
            />
          </Suspense>
        );
      case 'audit':
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <Audit devices={devices} onUpdate={updateDevice} onScreenChange={setActiveScreen} />
          </Suspense>
        );
      case 'insights':
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <Insights devices={devices} />
          </Suspense>
        );
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
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <Inventory />
          </Suspense>
        );
    }
  };

  return (
    <Layout activeScreen={activeScreen} onScreenChange={setActiveScreen}>
      {renderScreen()}
    </Layout>
  );
}

export default App;
