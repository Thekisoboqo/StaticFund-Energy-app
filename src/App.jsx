import {  useState, useEffect, Suspense, lazy } from 'preact/compat';
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
        return <Settings />;
      default:
        return <Inventory devices={devices} onAdd={addDevice} onUpdate={updateDevice} onRemove={removeDevice} />;
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
