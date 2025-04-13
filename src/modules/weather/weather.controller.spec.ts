import { WeatherController } from './weather.controller';
import { WeatherService } from './services/weather.service';
import { Test, TestingModule } from '@nestjs/testing';
import { FetchWeatherDto } from './dto/fetch-weather.dto';
import { GetWeatherDto } from './dto/get-weather.dto';

describe('WeatherController', () => {
  let controller: WeatherController;
  let weatherService: jest.Mocked<WeatherService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherController],
      providers: [
        {
          provide: WeatherService,
          useValue: {
            fetchAndSaveWeather: jest.fn(),
            getWeatherFromDb: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<WeatherController>(WeatherController);
    weatherService = module.get(WeatherService);
  });

  describe('POST /weather', () => {
    it('should call service with correct parameters', async () => {
      const dto: FetchWeatherDto = {
        lat: 51.5,
        lon: 31.28,
        part: ['hourly'],
      };

      weatherService.fetchAndSaveWeather.mockResolvedValue({} as any);

      await controller.fetchWeather(dto);

      expect(weatherService.fetchAndSaveWeather).toHaveBeenCalledWith(
        51.5,
        31.28,
        ['hourly'],
      );
    });

    it('should handle empty part array', async () => {
      const dto: FetchWeatherDto = {
        lat: 51.5,
        lon: 31.28,
      };

      await controller.fetchWeather(dto);

      expect(weatherService.fetchAndSaveWeather).toHaveBeenCalledWith(
        51.5,
        31.28,
        [],
      );
    });
  });

  describe('GET /weather', () => {
    it('should return data through interceptor', async () => {
      const mockData = {
        sunrise: 1744513397,
        sunset: 1744562825,
        temp: 2.26,
        feels_like: -0.2,
        pressure: 1018,
        humidity: 94,
        uvi: 0,
        wind_speed: 2.35,
      };

      weatherService.getWeatherFromDb.mockResolvedValue(
        JSON.stringify(mockData),
      );

      const result = await controller.getWeather({
        lat: 51.5,
        lon: 31.28,
      } as GetWeatherDto);

      expect(result).toEqual(
        JSON.stringify({
          sunrise: 1744513397,
          sunset: 1744562825,
          temp: 2.26,
          feels_like: -0.2,
          pressure: 1018,
          humidity: 94,
          uvi: 0,
          wind_speed: 2.35,
        }),
      );
    });

    it('should pass empty array when no part specified', async () => {
      weatherService.getWeatherFromDb.mockResolvedValue('{}');

      await controller.getWeather({
        lat: 51.5,
        lon: 31.28,
      } as GetWeatherDto);

      expect(weatherService.getWeatherFromDb).toHaveBeenCalledWith(
        51.5,
        31.28,
        [],
      );
    });

    it('should pass part array when specified', async () => {
      weatherService.getWeatherFromDb.mockResolvedValue('{}');

      await controller.getWeather({
        lat: 51.5,
        lon: 31.28,
        part: ['hourly'],
      });

      expect(weatherService.getWeatherFromDb).toHaveBeenCalledWith(
        51.5,
        31.28,
        ['hourly'],
      );
    });
  });
});
