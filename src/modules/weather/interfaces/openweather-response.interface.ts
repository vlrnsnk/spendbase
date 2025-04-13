export interface OpenWeatherCurrent {
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  uvi: number;
  wind_speed: number;
}

export interface OpenWeatherResponse {
  current: OpenWeatherCurrent;
}
