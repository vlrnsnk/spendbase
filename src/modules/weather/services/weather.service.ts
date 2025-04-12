import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Weather } from '../entities/weather.entity';
import { Repository } from 'typeorm';
import { WeatherPart } from 'src/types/weather.types';
import { OpenWeatherService } from './openweather.service';

@Injectable()
export class WeatherService {
  constructor(
    @InjectRepository(Weather)
    private WeatherRepository: Repository<Weather>,
    private openWeatherService: OpenWeatherService,
  ) {}

  async fetchAndSaveWeather(lat: number, lon: number, part?: WeatherPart[]) {
    return this.openWeatherService.getWeatherData(lat, lon, part);
  }

  async getFromDb(lat: number, lon: number, part?: WeatherPart[]) {
    return `get from db for lat: ${lat}, lon: ${lon}, part: ${part}`;
  }
}
