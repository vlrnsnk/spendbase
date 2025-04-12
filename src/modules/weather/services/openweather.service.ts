import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { WeatherPart } from 'src/types/weather.types';

@Injectable()
export class OpenWeatherService {
  private readonly apiKey: string;
  private readonly baseUrl: string = 'https://api.openweathermap.org/data/3.0/onecall';

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('OPENWEATHER_API_KEY') || '';
  }

  async getWeatherData(lat: number, lon: number, part?: WeatherPart[]) {
    const params = {
      lat,
      lon,
      appid: this.apiKey,
      exclude: part?.join(','),
      units: 'metric',
    };

    const response = await axios.get(this.baseUrl, { params });

    return response.data;
  }
}
