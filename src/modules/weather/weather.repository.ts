import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Weather } from './entities/weather.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { WeatherPart } from 'src/types/weather.types';
import { OpenWeatherResponse } from './interfaces/openweather-response.interface';

@Injectable()
export class WeatherRepository {
  constructor(
    @InjectRepository(Weather)
    private weatherRepository: Repository<Weather>,
  ) {}

  async createWeatherRecord(
    lat: number,
    lon: number,
    part: WeatherPart[],
    data: OpenWeatherResponse,
  ) {
    const weather = this.weatherRepository.create({
      latitude: lat,
      longitude: lon,
      excludedParts: part.join(','),
      rawApiResponse: data as unknown as string,
    });

    return this.weatherRepository.save(weather);
  }

  async findWeatherRecord(lat: number, lon: number, part: WeatherPart[]) {
    return this.weatherRepository.findOne({
      where: { latitude: lat, longitude: lon, excludedParts: part.toString() },
      order: { createdAt: 'DESC' },
    });
  }
}
