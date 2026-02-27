/**
 * Mock API service to simulate real-time inverter telemetry.
 * Brands supported (mock): Sunsynk, Deye, Growatt, Victron, Huawei
 */

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const inverterService = {
  /**
   * Simulates polling an inverter API for real-time stats.
   */
  async getTelemetry(config) {
    console.log(`[API MOCK] GET Inverter Telemetry via ${config.brand} API for Plant: ${config.plantId}`);
    await delay(500); // Simulate network latency

    // Generate some slightly randomized realistic values for simulation
    const batterySoc = Math.floor(Math.random() * 15) + 70; // 70-85%
    const pvWatts = Math.floor(Math.random() * 2000) + 1500; // 1.5kW - 3.5kW
    const loadWatts = Math.floor(Math.random() * 1000) + 800; // 0.8kW - 1.8kW
    const gridDrawWatts = Math.max(0, loadWatts - pvWatts - 500); // Only draw if load > pv + small battery buffer

    return {
      battery_soc: batterySoc,
      pv_watts: pvWatts,
      load_watts: loadWatts,
      grid_draw_watts: gridDrawWatts,
      timestamp: new Date().toISOString()
    };
  }
};
