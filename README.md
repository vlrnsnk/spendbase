# Weather API Project

This NestJS project fetches weather data from OpenWeatherMap API and stores it in PostgreSQL.
It provides two main endpoints to interact with the weather data.

## Prerequisites
- Docker
- Docker Compose
- OpenWeatherMap API key (set in .env file)

## Setup & Running

1. Create `.env` file:
```bash
cp .env.example .env
```
Edit the `.env` file with your OpenWeatherMap API key.

2. Build and start containers for production:
```bash
docker-compose up --build
```

## API Documentation (Swagger UI)

After starting the application, access the interactive API documentation at:
```
http://localhost:3000/api/v1/docs
```

### Features:
- Full documentation of all endpoints
- Try-it-out functionality to test API calls directly
- Schema definitions for all request/response formats
- Multi-select interface for weather parts parameter

## API Endpoints

### 1. Fetch and Store Weather Data
`POST /api/v1/weather`

```bash
curl -X POST http://localhost:3000/api/v1/weather \
  -H "Content-Type: application/json" \
  -d '{
    "lat": 51.50,
    "lon": 31.28,
    "part": "daily,hourly,minutely"
  }'
```

### 2. Retrieve Weather Data from DB
`GET /api/v1/weather?lat={lat}&lon={lon}&part={part}`

```bash
curl -X GET http://localhost:3000/api/v1/weather?lat=51.50&lon=31.28&part=daily,hourly,minutely \
  -H "Content-Type: application/json"
```

**Response Format:**
```json
{
  "sunrise": 1684926645,
  "sunset": 1684977332,
  "temp": 292.55,
  "feels_like": 292.87,
  "pressure": 1014,
  "humidity": 89,
  "uvi": 0.16,
  "wind_speed": 3.13
}
```

## Database Access
To connect to PostgreSQL directly:
```bash
docker-compose exec postgres psql -U postgres -d spendbase
```

## Running Tests
```bash
docker-compose exec app npm run test
```

## Project Structure
- `src/modules/weather` - Contains all weather-related functionality
- `src/config` - Configuration files
- `src/migrations` - Database migrations
- `test` - Unit tests

## Workflow Explanation

### First time setup (or when you make changes to Dockerfiles/dependencies):
```bash
docker-compose up --build
```

### Subsequent starts (when containers already exist):
```bash
docker-compose up
```
### Stopping the containers:
```bash
docker-compose down
```
