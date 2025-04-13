import { Transform } from 'class-transformer';
import { IsArray, IsIn, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { WEATHER_PARTS, WeatherPart } from '@/types/weather.types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetWeatherDto {
  @ApiProperty({
    example: 50.45,
    description: 'Latitude between -90 and 90',
    minimum: -90,
    maximum: 90,
  })
  @IsNumber()
  @Min(-90)
  @Max(90)
  @Transform(({ value }: { value: string }) => parseFloat(value))
  lat: number;

  @ApiProperty({
    example: 30.52,
    description: 'Longitude between -180 and 180',
    minimum: -180,
    maximum: 180,
  })
  @IsNumber()
  @Min(-180)
  @Max(180)
  @Transform(({ value }: { value: string }) => parseFloat(value))
  lon: number;

  @ApiPropertyOptional({
    name: 'part',
    example: 'daily,hourly,minutely',
    description: 'Comma-separated weather parts to exclude',
    enum: WEATHER_PARTS,
  })
  @IsOptional()
  @Transform(({ value }: { value: string | string[] }) => {
    if (!value) return undefined;
    return typeof value === 'string'
      ? value.split(',').map((v) => v.trim() as WeatherPart)
      : value;
  })
  @IsArray()
  @IsIn(WEATHER_PARTS, { each: true })
  part?: WeatherPart[];
}
