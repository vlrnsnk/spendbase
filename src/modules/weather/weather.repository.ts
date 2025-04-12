import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Weather } from './entities/weather.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { WeatherPart } from 'src/types/weather.types';

@Injectable()
export class WeatherRepository {
  constructor(
    @InjectRepository(Weather)
    private weatherRepository: Repository<Weather>,
  ) {}

  async createWeatherRecord(lat: number, lon: number, part: WeatherPart[], data: any) {
    const weather = this.weatherRepository.create({
      latitude: lat,
      longitude: lon,
      exclude: part.join(','),
      apiResponse: data,
    });

    return this.weatherRepository.save(weather);
  }
}
