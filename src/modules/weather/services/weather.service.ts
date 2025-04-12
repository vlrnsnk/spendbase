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

  async fetchAndSave() {
    // const { data } = await axios.get('https://api.openweathermap.org/data/3.0/onecall', {
    //   params: {},
    // });

    return 'fetched and saved weather';
  }

  async getFromDb() {
    return 'get from db';
  }

};
