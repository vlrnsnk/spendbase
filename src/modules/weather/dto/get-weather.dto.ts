import { Transform } from 'class-transformer';
import { IsArray, IsIn, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { WEATHER_PARTS, WeatherPart } from 'src/types/weather.types';

export class GetWeatherDto {
  @IsNumber()
  @Min(-90)
  @Max(90)
  @Transform(({ value }: { value: string }) => parseFloat(value))
  lat: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  @Transform(({ value }: { value: string }) => parseFloat(value))
  lon: number;

  @IsOptional()
  @Transform(({ value }: { value: string | string[] }) => {
    if (typeof value === 'string') {
      return value.split(',').map((v) => v.trim());
    }

    return value;
  })
  @IsArray()
  @IsIn(WEATHER_PARTS, { each: true })
  part?: WeatherPart[];
}
