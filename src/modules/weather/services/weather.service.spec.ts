import { Test, TestingModule } from '@nestjs/testing';
import { WeatherRepository } from '../weather.repository';
import { OpenWeatherService } from './openweather.service';
import { WeatherService } from './weather.service';
import { Weather } from '../entities/weather.entity';
import { NotFoundException } from '@nestjs/common';

describe('WeatherService', () => {
  let service: WeatherService;
  let weatherRepository: jest.Mocked<WeatherRepository>;
  let openWeatherService: jest.Mocked<OpenWeatherService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeatherService,
        {
          provide: WeatherRepository,
          useValue: {
            createWeatherRecord: jest.fn(),
            findWeatherRecord: jest.fn(),
          },
        },
        {
          provide: OpenWeatherService,
          useValue: {
            getWeatherData: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<WeatherService>(WeatherService);
    weatherRepository = module.get(WeatherRepository);
    openWeatherService = module.get(OpenWeatherService);
  });

  describe('fetchAndSaveWeather', () => {
    const mockWeatherData = { current: { 
      sunrise: 1744513397,
      sunset: 1744562825,
      temp: 2.26,
      feels_like: -0.2,
      pressure: 1018,
      humidity: 94,
      uvi: 0,
      wind_speed: 2.35
  } };

    it('should fetch and save weather data', async () => {
      openWeatherService.getWeatherData.mockResolvedValue(mockWeatherData);
      weatherRepository.createWeatherRecord.mockResolvedValue({} as Weather);

      await service.fetchAndSaveWeather(51.50, 31.28, ['hourly']);

      expect(openWeatherService.getWeatherData).toHaveBeenCalledWith(51.50, 31.28, ['hourly']);
      expect(weatherRepository.createWeatherRecord).toHaveBeenCalledWith(51.50, 31.28, ['hourly'], mockWeatherData);
    });

    it('should handle empty parts array', async () => {
      await service.fetchAndSaveWeather(51.50, 31.28);
      expect(openWeatherService.getWeatherData).toHaveBeenCalledWith(51.50, 31.28, []);
    });
  });

  describe('getWeatherFromDb', () => {
    const mockRecord = { rawApiResponse: '{"current": { "sunrise": 1744513397, "sunset": 1744562825, "temp": 2.26, "feels_like": -0.2, "pressure": 1018, "humidity": 94, "uvi": 0, "wind_speed": 2.35 }}' } as Weather;

    it('should return weather data when found', async () => {
      weatherRepository.findWeatherRecord.mockResolvedValue(mockRecord);
      const result = await service.getWeatherFromDb(51.50, 31.28, ['hourly']);
      expect(result).toEqual(mockRecord.rawApiResponse);
    });

    it('should throw NotFoundException when data is missing', async () => {
      weatherRepository.findWeatherRecord.mockResolvedValue(null);
      await expect(service.getWeatherFromDb(51.50, 31.28, ['hourly'])).rejects.toThrow(NotFoundException);
    });

    it('should pass empty array for parts when not provided', async () => {
      weatherRepository.findWeatherRecord.mockResolvedValue(mockRecord);
      await service.getWeatherFromDb(51.50, 31.28);
      expect(weatherRepository.findWeatherRecord).toHaveBeenCalledWith(51.50, 31.28, []);
    });
  });
});
