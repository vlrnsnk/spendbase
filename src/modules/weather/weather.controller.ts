import { Controller, Get, Post } from '@nestjs/common';
import { WeatherService } from './services/weather.service';

@Controller('weather')
export class WeatherController {

  constructor(private readonly weatherService: WeatherService) {}

  @Post()
  async fetchWeather(): Promise<string> {
    return this.weatherService.fetchAndSave();
  }

  @Get()
  async getWeather(): Promise<string> {
    return this.weatherService.getFromDb();
  }

};
