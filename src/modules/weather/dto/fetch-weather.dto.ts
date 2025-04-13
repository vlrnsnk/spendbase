import {
  ArrayMaxSize,
  ArrayUnique,
  IsArray,
  IsIn,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { WEATHER_PARTS, WeatherPart } from '@/types/weather.types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FetchWeatherDto {
  @ApiProperty({
    example: 50.45,
    description: 'Latitude between -90 and 90',
    minimum: -90,
    maximum: 90,
  })
  @IsNumber()
  @Min(-90)
  @Max(90)
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
  lon: number;

  @ApiPropertyOptional({
    name: 'part',
    example: ['daily', 'hourly', 'minutely'],
    description: 'Array of weather parts to exclude',
    enum: WEATHER_PARTS,
    isArray: true,
    maxItems: 4,
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @ArrayMaxSize(3)
  @IsIn(WEATHER_PARTS, { each: true })
  part?: WeatherPart[];
}
