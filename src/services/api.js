/**
 * Mock API service to simulate the backend endpoints described in Phase D.
 */

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const apiService = {
  /**
   * Simulates POST /api/b2b/apply
   * Triggers the agentic lead generation and matching flow.
   */
  async applyForB2B(homeId) {
    console.log(`[API MOCK] POST /api/b2b/apply - Home ID: ${homeId}`);
    await delay(1500); // Simulate network and AI processing time

    return {
      lead_id: `lead_${Date.now()}`,
      matched_installer: "SolarTech Mangaung",
      report: {
        system_size_kw: 5.0,
        panel_count: 8,
        battery_kwh: 10.0,
        est_annual_savings: 12000,
        roi_years: 4.5,
        prospect_score: 85,
        sales_hook: "Replace 2kW geyser usage with solar to save R12k annually."
      }
    };
  },

  /**
   * Simulates GET /api/solar-roi/:homeId
   * Retrieves monthly savings, payback progress, performance score.
   */
  async getSolarROI(homeId) {
    console.log(`[API MOCK] GET /api/solar-roi/${homeId}`);
    await delay(500);

    return {
      hasSolar: true,
      monthlySavings: 450,
      monthlySavingsBreakdown: {
        solarSelfUse: 300,
        gridExportRevenue: 150,
      },
      payback: {
        systemCost: 150000,
        lifetimeSavings: 45000,
        recovered: 30,
        yearsRemaining: 3.2,
        totalYears: 4.5,
      },
      performance: {
        score: 85,
        avgDailyPvKwh: 22.5,
        selfSufficiency: 82,
        gridDependency: 18,
      }
    };
  },

  /**
   * Simulates GET /api/gamification/:homeId
   * Retrieves streaks, achievements, community leaderboard.
   */
  async getGamification(homeId) {
    console.log(`[API MOCK] GET /api/gamification/${homeId}`);
    await delay(400);

    return {
      streak: 12,
      targetKwh: 20,
      monthlySaved: 600,
      achievements: [
        { id: 'first_day', name: 'First Day', icon: '⚡', desc: 'First day under target', unlocked: true },
        { id: 'week_warrior', name: 'Week Warrior', icon: '🔥', desc: '7-day saving streak', unlocked: true },
        { id: 'month_master', name: 'Month Master', icon: '🏆', desc: '30-day saving streak', unlocked: false, progress: '12/30' },
      ],
      userRank: 15, // Top 15%
      totalHouseholds: 100,
    };
  },

  /**
   * Simulates GET /api/community/:homeId
   * Retrieves city comparison, tips, usage percentile.
   */
  async getCommunityInsights(homeId) {
    console.log(`[API MOCK] GET /api/community/${homeId}`);
    await delay(600);

    return {
      comparison: {
        yourDailyKwh: 18.2,
        cityAvgDailyKwh: 22.4,
        city: "Mangaung",
        householdsCompared: 1500,
        percentile: 85,
        verdict: "You use 4.2 kWh/day LESS than Mangaung average 🎉"
      },
      tips: [
        { author: 'StaticFund Team', tip: 'Set your geyser timer to heat water at 4am (off-peak). Still hot by shower time, saves up to R200/month.', likes: 47, category: 'geyser' }
      ]
    };
  },

  /**
   * Simulates GET /api/solar-watcher/:homeId
   * Intelligent solar monitoring (with weather + community DB)
   */
  async getSolarWatcherData(homeId) {
    console.log(`[API MOCK] GET /api/solar-watcher/${homeId}`);
    await delay(800);

    return {
      systemHealth: "optimal",
      healthScore: 95,
      currentStatus: "System operating at peak efficiency. No immediate actions required.",
      anomalies: [],
      immediateActions: [],
      forecast: {
        nextHours: "Clear skies expected. PV generation will remain strong.",
        recommendation: "Consider running heavy loads like the washing machine now to utilize excess solar.",
        expectedPvKwh: 12.5
      },
      communityComparison: "Your system's self-sufficiency is higher than 85% of similar homes in Mangaung.",
      optimizationTips: ["Schedule pool pump to run exclusively during peak solar hours (10 AM - 2 PM)."],
      watcherNotes: "Battery SOC is healthy at 85%. Weather forecast is favorable."
    };
  }
};
