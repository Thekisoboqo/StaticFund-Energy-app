import React from 'react';
import { Settings as SettingsIcon, Zap, Battery, BrainCircuit, Bell } from 'lucide-react';

const Settings = ({
  electricityRate,
  setElectricityRate,
  inverterConfigurations,
  setInverterConfigurations,
  agentMemory,
  setAgentMemory,
  notificationSettings,
  setNotificationSettings
}) => {
  return (
    <div>
      <div className="header">Settings</div>
      <div className="sub-header">Customize your application preferences.</div>

      <div className="content">
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Zap size={20} color="var(--accent)" />
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Electricity Settings</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Rate ($/kWh)</label>
            <input
              type="number"
              className="input-field"
              value={electricityRate}
              onChange={(e) => setElectricityRate(parseFloat(e.target.value))}
              step="0.01"
              min="0"
            />
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Battery size={20} color="var(--accent)" />
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Inverter Configuration</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>System Size (kW)</label>
              <input
                type="number"
                className="input-field"
                value={inverterConfigurations.systemSize}
                onChange={(e) => setInverterConfigurations({ ...inverterConfigurations, systemSize: parseFloat(e.target.value) })}
                step="0.1"
                min="0"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Battery Capacity (kWh)</label>
              <input
                type="number"
                className="input-field"
                value={inverterConfigurations.batteryCapacity}
                onChange={(e) => setInverterConfigurations({ ...inverterConfigurations, batteryCapacity: parseFloat(e.target.value) })}
                step="0.1"
                min="0"
              />
            </div>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <BrainCircuit size={20} color="var(--accent)" />
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Agent Memory</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Enable Agent</span>
              <input
                type="checkbox"
                checked={agentMemory.isEnabled}
                onChange={(e) => setAgentMemory({ ...agentMemory, isEnabled: e.target.checked })}
                style={{ width: '20px', height: '20px' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Optimization Level</label>
              <select
                className="input-field"
                value={agentMemory.optimizationLevel}
                onChange={(e) => setAgentMemory({ ...agentMemory, optimizationLevel: e.target.value })}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Bell size={20} color="var(--accent)" />
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Notifications</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Push Notifications</span>
              <input
                type="checkbox"
                checked={notificationSettings.pushEnabled}
                onChange={(e) => setNotificationSettings({ ...notificationSettings, pushEnabled: e.target.checked })}
                style={{ width: '20px', height: '20px' }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Email Notifications</span>
              <input
                type="checkbox"
                checked={notificationSettings.emailEnabled}
                onChange={(e) => setNotificationSettings({ ...notificationSettings, emailEnabled: e.target.checked })}
                style={{ width: '20px', height: '20px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
