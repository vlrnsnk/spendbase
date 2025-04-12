import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Weather } from '../entities/weather.entity';
import { Repository } from 'typeorm';
import axios from 'axios';

@Injectable()
export class WeatherService {

  constructor(
    @InjectRepository(Weather)
    private WeatherRepository: Repository<Weather>,
  ) {}

  async fetchAndSaveWeather(lat: number, lon: number, part?: string) {
    return `fetched and saved weather for lat: ${lat}, lon: ${lon}, part: ${part}`;
  }

  async getFromDb() {
    return 'get from db';
  }

};
