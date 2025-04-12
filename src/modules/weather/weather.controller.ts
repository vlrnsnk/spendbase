import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { WeatherService } from './services/weather.service';
import { FetchWeatherDto } from './dto/fetch-weather.dto';
import { GetWeatherDto } from './dto/get-weather.dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post()
  async fetchWeather(
    @Body() fetchWeatherDto: FetchWeatherDto,
  ): Promise<string> {
    return this.weatherService.fetchAndSaveWeather(
      fetchWeatherDto.lat,
      fetchWeatherDto.lon,
      fetchWeatherDto.part,
    );
  }

  @Get()
  async getWeather(@Query() getWeatherDto: GetWeatherDto): Promise<string> {
    return this.weatherService.getFromDb(
      getWeatherDto.lat,
      getWeatherDto.lon,
      getWeatherDto.part,
    );
  }
}
