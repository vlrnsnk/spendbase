import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { WEATHER_PARTS, WeatherPart } from 'src/types/weather.types';

export class GetWeatherDto {
  @IsNumber()
  @Min(-90)
  @Max(90)
  @Transform(({ value }) => parseFloat(value))
  lat: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  @Transform(({ value }) => parseFloat(value))
  lon: number;

  @IsOptional()
  @Transform(({ value }) =>
    value
      .split(',')
      .filter((p: string) => WEATHER_PARTS.includes(p as WeatherPart)),
  )
  part?: WeatherPart[];
}
