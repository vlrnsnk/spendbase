import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { WeatherService } from './services/weather.service';
import { FetchWeatherDto } from './dto/fetch-weather.dto';
import { GetWeatherDto } from './dto/get-weather.dto';
import { WeatherInterceptor } from '@/common/interceptors/weather.interceptor';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { WEATHER_PARTS } from '@/types/weather.types';

@ApiTags('weather')
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post()
  @ApiOperation({ summary: 'Fetch and store weather data' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        lat: { type: 'number', example: 51.5 },
        lon: { type: 'number', example: 31.28 },
        part: {
          type: 'array',
          items: { type: 'string' },
          example: ['daily', 'hourly', 'minutely'],
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Weather data fetched and stored successfully',
  })
  async fetchWeather(@Body() fetchWeatherDto: FetchWeatherDto) {
    return this.weatherService.fetchAndSaveWeather(
      fetchWeatherDto.lat,
      fetchWeatherDto.lon,
      fetchWeatherDto.part ?? [],
    );
  }

  @Get()
  @UseInterceptors(WeatherInterceptor)
  @ApiOperation({ summary: 'Get weather data from the database' })
  @ApiQuery({ name: 'lat', type: Number, required: true, example: 51.5 })
  @ApiQuery({ name: 'lon', type: Number, required: true, example: 31.28 })
  @ApiQuery({
    name: 'part',
    required: false,
    example: 'daily,hourly,minutely',
    description: 'Comma-separated values from: ' + WEATHER_PARTS.join(', '),
  })
  @ApiResponse({
    status: 200,
    description: 'Weather data retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        sunrise: { type: 'number', example: 1684926645 },
        sunset: { type: 'number', example: 1684977332 },
        temp: { type: 'number', example: 292.55 },
        feels_like: { type: 'number', example: 292.87 },
        pressure: { type: 'number', example: 1014 },
        humidity: { type: 'number', example: 89 },
        uvi: { type: 'number', example: 0.16 },
        wind_speed: { type: 'number', example: 3.13 },
      },
    },
  })
  async getWeather(@Query() getWeatherDto: GetWeatherDto): Promise<string> {
    return this.weatherService.getWeatherFromDb(
      getWeatherDto.lat,
      getWeatherDto.lon,
      getWeatherDto.part || [],
    );
  }
}
