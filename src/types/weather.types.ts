export const WEATHER_PARTS = [
  'current',
  'minutely',
  'hourly',
  'daily',
  'alerts',
] as const;

export type WeatherPart = typeof WEATHER_PARTS[number];
