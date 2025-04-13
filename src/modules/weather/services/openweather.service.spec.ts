import { ConfigService } from '@nestjs/config';
import { OpenWeatherService } from './openweather.service';
import axios from 'axios';
import { Test, TestingModule } from '@nestjs/testing';
import { OpenWeatherResponse } from '../interfaces/openweather-response.interface';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('OpenWeatherService', () => {
  let service: OpenWeatherService;
  let configService: jest.Mocked<ConfigService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OpenWeatherService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<OpenWeatherService>(OpenWeatherService);
    configService = module.get(ConfigService);

    jest.spyOn(configService, 'get').mockReturnValue('test-api-key');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getWeatherData', () => {
    const mockResponse: OpenWeatherResponse = {
      current: {
        sunrise: 1744513397,
        sunset: 1744562825,
        temp: 2.26,
        feels_like: -0.2,
        pressure: 1018,
        humidity: 94,
        uvi: 0,
        wind_speed: 2.35,
      },
    };

    it('should make API call with correct parameters', async () => {
      mockedAxios.get.mockResolvedValue({ data: mockResponse } as {
        data: OpenWeatherResponse;
      });

      await service.getWeatherData(51.5, 31.28, ['hourly']);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://api.openweathermap.org/data/3.0/onecall',
        {
          params: {
            lat: 51.5,
            lon: 31.28,
            appid: 'test-api-key',
            exclude: 'hourly',
            units: 'metric',
          },
        },
      );
    });

    it('should handle empty parts array', async () => {
      mockedAxios.get.mockResolvedValue({ data: mockResponse });

      await service.getWeatherData(51.5, 31.28);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          params: expect.not.objectContaining({ exclude: expect.anything() }),
        }),
      );
    });

    it('should return formatted weather data', async () => {
      mockedAxios.get.mockResolvedValue({ data: mockResponse });

      const result = await service.getWeatherData(51.5, 31.28, ['hourly']);

      expect(result).toEqual(mockResponse);
    });

    it('should throw error if API key is missing', async () => {
      configService.get.mockReturnValue(undefined);

      await expect(
        service.getWeatherData(51.5, 31.28, ['hourly']),
      ).rejects.toThrow('OPENWEATHER_API_KEY is not defined');
    });

    it('should handle API errors', async () => {
      mockedAxios.get.mockRejectedValue(new Error('API error'));

      await expect(
        service.getWeatherData(51.5, 31.28, ['hourly']),
      ).rejects.toThrow('API error');
    });

    it('should reject invalid coordinates', async () => {
      await expect(service.getWeatherData(100, 200)).rejects.toThrow();
    });
  });
});
