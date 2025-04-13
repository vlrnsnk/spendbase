export const WEATHER_PARTS = [
  // TODO: need to figure out how to handle 'current'
  // 'current',
  'daily',
  'hourly',
  'minutely',
  'alerts',
] as const;

export type WeatherPart = (typeof WEATHER_PARTS)[number];
