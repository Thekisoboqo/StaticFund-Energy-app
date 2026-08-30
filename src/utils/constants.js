/** Default: mid-band municipal prepaid (e.g. City Power Joburg). Eskom Homelight direct is lower (~R2.71). */
export const DEFAULT_RATE_R_PER_KWH = 3.2;
export const RATE_STORAGE_KEY = 'settings_rate_r_per_kwh';

export function loadRateRPerKwh() {
  try {
    const stored = localStorage.getItem(RATE_STORAGE_KEY);
    if (stored !== null) {
      const parsed = JSON.parse(stored);
      if (typeof parsed === 'number' && Number.isFinite(parsed) && parsed > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error parsing rate from localStorage', e);
  }
  return DEFAULT_RATE_R_PER_KWH;
}
