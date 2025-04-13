import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Weather } from './entities/weather.entity';
import { WeatherController } from './weather.controller';
import { WeatherService } from './services/weather.service';
import { OpenWeatherService } from './services/openweather.service';
import { ConfigService } from '@nestjs/config';
import { WeatherRepository } from './weather.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Weather])],
  controllers: [WeatherController],
  providers: [
    ConfigService,
    WeatherService,
    OpenWeatherService,
    WeatherRepository,
  ],
})
export class WeatherModule {}
