import React, { useState } from 'react';
import Layout from './components/Layout';
import Inventory from './screens/Inventory';
import Audit from './screens/Audit';
import Insights from './screens/Insights';
import Settings from './screens/Settings';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [activeScreen, setActiveScreen] = useState('inventory');
  const [devices, setDevices] = useLocalStorage('devices', [
    { id: 1, name: 'Living Room Heater', watts: 1500, hours: 0 },
    { id: 2, name: 'Samsung Fridge', watts: 200, hours: 24 },
    { id: 3, name: 'Microwave', watts: 200, hours: 0 },
  ]);

  const [electricityRate, setElectricityRate] = useLocalStorage('electricityRate', 0.15);
  const [inverterConfigurations, setInverterConfigurations] = useLocalStorage('inverterConfigurations', { systemSize: 5, batteryCapacity: 10 });
  const [agentMemory, setAgentMemory] = useLocalStorage('agentMemory', { isEnabled: true, optimizationLevel: 'medium' });
  const [notificationSettings, setNotificationSettings] = useLocalStorage('notificationSettings', { pushEnabled: true, emailEnabled: false });

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
        return <Insights />;
      case 'settings':
        return (
          <Settings
            electricityRate={electricityRate}
            setElectricityRate={setElectricityRate}
            inverterConfigurations={inverterConfigurations}
            setInverterConfigurations={setInverterConfigurations}
            agentMemory={agentMemory}
            setAgentMemory={setAgentMemory}
            notificationSettings={notificationSettings}
            setNotificationSettings={setNotificationSettings}
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
