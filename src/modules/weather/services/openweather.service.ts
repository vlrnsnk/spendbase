import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { WeatherPart } from 'src/types/weather.types';
import { OpenWeatherResponse } from '../interfaces/openweather-response.interface';

@Injectable()
export class OpenWeatherService {
  private readonly apiKey: string;
  private readonly baseUrl: string =
    'https://api.openweathermap.org/data/3.0/onecall';

  constructor(private configService: ConfigService) {}

  async getWeatherData(
    lat: number,
    lon: number,
    part?: WeatherPart[],
  ): Promise<OpenWeatherResponse> {
    const apiKey = this.configService.get<string>('OPENWEATHER_API_KEY');

    if (!apiKey) {
      throw new Error('OPENWEATHER_API_KEY is not defined');
    }
    const params = {
      lat,
      lon,
      appid: apiKey,
      exclude: part?.join(','),
      units: 'metric',
    };

    const response = await axios.get<OpenWeatherResponse>(this.baseUrl, {
      params,
    });

    return response.data;
  }
}
