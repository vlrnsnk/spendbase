import { Controller, Get, Post } from '@nestjs/common';

@Controller('weather')
export class WeatherController {

  constructor() {}

  @Get()
  async getWeather(): Promise<string> {
    return 'getting weather';
  }

  @Post()
  async fetchWeather(): Promise<string> {
    return 'fetching weather';
  }

};
