import { Body, Controller, Get, Post, Query, UseInterceptors } from '@nestjs/common';
import { WeatherService } from './services/weather.service';
import { FetchWeatherDto } from './dto/fetch-weather.dto';
import { GetWeatherDto } from './dto/get-weather.dto';
import { WeatherInterceptor } from 'src/common/interceptors/weather.interceptor';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post()
  async fetchWeather(
    @Body() fetchWeatherDto: FetchWeatherDto,
  ) {
    return this.weatherService.fetchAndSaveWeather(
      fetchWeatherDto.lat,
      fetchWeatherDto.lon,
      fetchWeatherDto.part,
    );
  }

  @Get()
  @UseInterceptors(WeatherInterceptor)
  async getWeather(@Query() getWeatherDto: GetWeatherDto): Promise<string> {
    return this.weatherService.getWeatherFromDb(
      getWeatherDto.lat,
      getWeatherDto.lon,
      getWeatherDto.part || [],
    );
  }
}
