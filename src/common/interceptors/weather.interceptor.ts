import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { OpenWeatherResponse } from 'src/modules/weather/interfaces/openweather-response.interface';
import { WeatherResponse } from 'src/modules/weather/interfaces/weather-response.interface';

@Injectable()
export class WeatherInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<OpenWeatherResponse>,
  ): Observable<WeatherResponse> {
    return next.handle().pipe(
      map((data) => ({
        sunrise: data.current.sunrise,
        sunset: data.current.sunset,
        temp: data.current.temp,
        feels_like: data.current.feels_like,
        pressure: data.current.pressure,
        humidity: data.current.humidity,
        uvi: data.current.uvi,
        wind_speed: data.current.wind_speed,
      })),
    );
  }
}
