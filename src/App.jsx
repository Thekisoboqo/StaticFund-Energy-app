import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Inventory from './screens/Inventory';
import Audit from './screens/Audit';
import Insights from './screens/Insights';
import Settings from './screens/Settings';
import Dashboard from './screens/Dashboard';
import Chat from './screens/Chat';

function App() {
  const [activeScreen, setActiveScreen] = useState('dashboard');

  // Initialize devices from localStorage or default
  const [devices, setDevices] = useState(() => {
    const saved = localStorage.getItem('devices');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Living Room Heater', watts: 1500, hours: 0 },
      { id: 2, name: 'Samsung Fridge', watts: 200, hours: 24 },
      { id: 3, name: 'Microwave', watts: 200, hours: 0 },
    ];
  });

  // Initialize electricity rate from localStorage or default
  const [electricityRate, setElectricityRate] = useState(() => {
    const saved = localStorage.getItem('electricityRate');
    return saved ? parseFloat(saved) : 0.15;
  });

  // Initialize inverter config
  const [inverterConfig, setInverterConfig] = useState(() => {
    const saved = localStorage.getItem('inverterConfig');
    return saved ? JSON.parse(saved) : { brand: '', plantId: '', username: '', password: '' };
  });

  useEffect(() => {
    localStorage.setItem('devices', JSON.stringify(devices));
  }, [devices]);

  useEffect(() => {
    localStorage.setItem('inverterConfig', JSON.stringify(inverterConfig));
  }, [inverterConfig]);

  useEffect(() => {
    localStorage.setItem('electricityRate', electricityRate);
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

  const renderScreen = () => {
    switch (activeScreen) {
      case 'dashboard':
        return <Dashboard inverterConfig={inverterConfig} />;
      case 'chat':
        return <Chat />;
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
        return <Insights devices={devices} electricityRate={electricityRate} />;
      case 'settings':
        return (
          <Settings
            electricityRate={electricityRate}
            setElectricityRate={setElectricityRate}
            inverterConfig={inverterConfig}
            setInverterConfig={setInverterConfig}
          />
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
