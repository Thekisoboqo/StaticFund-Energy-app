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

  const [electricityRate, setElectricityRate] = useState(() => {
    try {
      const stored = localStorage.getItem('electricityRate');
      if (stored) {
        const parsed = parseFloat(stored);
        if (!isNaN(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error parsing electricityRate from localStorage', e);
    }
    return 0.15;
  });

  useEffect(() => {
    localStorage.setItem('devices', JSON.stringify(devices));
  }, [devices]);

  useEffect(() => {
    localStorage.setItem('electricityRate', electricityRate.toString());
  }, [electricityRate]);

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
    setDevices(INITIAL_DEVICES);
    setElectricityRate(0.15);
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
        return <Insights devices={devices} rate={electricityRate} />;
      case 'settings':
        return (
          <Settings
             electricityRate={electricityRate}
             setElectricityRate={setElectricityRate}
             onClearData={handleClearData}
          />
        );
      default:
        return <Inventory />;
    }
  };

  return (
    <Layout activeScreen={activeScreen} onScreenChange={setActiveScreen}>
      <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>}>
         {renderScreen()}
      </Suspense>
    </Layout>
  );
}

export default App;
