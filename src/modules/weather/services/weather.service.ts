import { Injectable, NotFoundException } from '@nestjs/common';
import { WeatherPart } from 'src/types/weather.types';
import { OpenWeatherService } from './openweather.service';
import { WeatherRepository } from '../weather.repository';
import { Weather } from '../entities/weather.entity';

@Injectable()
export class WeatherService {
  constructor(
    private weatherRepository: WeatherRepository,
    private openWeatherService: OpenWeatherService,
  ) {}

  async fetchAndSaveWeather(lat: number, lon: number, part?: WeatherPart[]) {
    const weatherData = await this.openWeatherService.getWeatherData(
      lat,
      lon,
      part,
    );

    return this.weatherRepository.createWeatherRecord(
      lat,
      lon,
      part || [],
      weatherData,
    );
  }

  async getWeatherFromDb(
    lat: number,
    lon: number,
    part?: WeatherPart[],
  ): Promise<string> {
    const weatherRecord: Weather | null =
      await this.weatherRepository.findWeatherRecord(lat, lon, part || []);

    if (!weatherRecord) {
      throw new NotFoundException('Weather data not found!');
    }

    return weatherRecord.rawApiResponse;
  }
}
