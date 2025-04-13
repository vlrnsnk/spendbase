import { WeatherInterceptor } from '@/common/interceptors/weather.interceptor';
import { CallHandler, ExecutionContext } from '@nestjs/common';
import { OpenWeatherResponse } from '@/modules/weather/interfaces/openweather-response.interface';
import { of, throwError } from 'rxjs';
import { WeatherResponse } from '@/modules/weather/interfaces/weather-response.interface';

describe('WeatherInterceptor', () => {
  let interceptor: WeatherInterceptor;
  let mockContext: ExecutionContext;
  let mockHandler: CallHandler<OpenWeatherResponse>;

  beforeEach(() => {
    interceptor = new WeatherInterceptor();
    mockContext = {} as ExecutionContext;
    mockHandler = {
      handle: () => of({} as OpenWeatherResponse),
    };
  });

  it('should transform OpenWeather response to WeatherResponse format', (done) => {
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    const mockWeatherData: OpenWeatherResponse | any = {
      current: {
        sunrise: 1744513397,
        sunset: 1744562825,
        temp: 2.26,
        feels_like: -0.2,
        pressure: 1018,
        humidity: 94,
        uvi: 0,
        wind_speed: 2.35,
        extra_field: 'should be removed', // this should not be in the final response
      },
      minutely: [], // should be ignored
    };

    const expectedResponse: WeatherResponse = {
      sunrise: 1744513397,
      sunset: 1744562825,
      temp: 2.26,
      feels_like: -0.2,
      pressure: 1018,
      humidity: 94,
      uvi: 0,
      wind_speed: 2.35,
    };

    jest
      .spyOn(mockHandler, 'handle')
      .mockReturnValue(of(mockWeatherData as OpenWeatherResponse));

    interceptor.intercept(mockContext, mockHandler).subscribe({
      next: (result) => {
        expect(result).toEqual(expectedResponse);
        expect(result).not.toHaveProperty('extra_field'); // ensure extra field is removed
        done();
      },
      // eslint-disable-next-line @typescript-eslint/unbound-method
      error: done.fail,
    });
  });

  it('should handle missing data gracefully', (done) => {
    const invalidData = {
      invalidData: 'invalidData',
    } as unknown as OpenWeatherResponse;
    jest.spyOn(mockHandler, 'handle').mockReturnValue(of(invalidData));

    interceptor.intercept(mockContext, mockHandler).subscribe({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      next: () => done.fail('Should have thrown an error'),
      error: (err) => {
        expect(err).toBeInstanceOf(Error);
        done();
      },
    });
  });

  it('should pass through errors unchanged', (done) => {
    const testError = new Error('Test error');
    jest
      .spyOn(mockHandler, 'handle')
      .mockReturnValue(throwError(() => testError));

    interceptor.intercept(mockContext, mockHandler).subscribe({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      next: () => done.fail('Should have thrown an error'),
      error: (err) => {
        expect(err).toBe(testError);
        done();
      },
    });
  });
});
