import { Body, Controller, Get, Post } from '@nestjs/common';
import { WeatherService } from './services/weather.service';
import { FetchWeatherDto } from './dto/fetch-weather.dto';

@Controller('weather')
export class WeatherController {

  constructor(private readonly weatherService: WeatherService) {}

  @Post()
  async fetchWeather(@Body() fetchWeatherDto: FetchWeatherDto): Promise<string> {
    return this.weatherService.fetchAndSaveWeather(
      fetchWeatherDto.lat,
      fetchWeatherDto.lon,
      fetchWeatherDto.part,
    );
  }

  @Get()
  async getWeather(): Promise<string> {
    return this.weatherService.getFromDb();
  }

};
