
# Weather Dashboard

A modern, responsive weather dashboard built with React and TypeScript. Get real-time weather information for any city using the OpenWeatherMap API.

## Features

- 🔍 Search for any city's weather information
- 🌡️ Display current temperature, weather condition, humidity, and wind speed
- 🎨 Clean and modern UI with responsive design
- 📱 Mobile-friendly interface
- 🕒 Recent search history (last 5 searches)
- 🔄 Refresh button to update current city's weather
- ⚡ Fast and efficient with minimal dependencies

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Hot Toast (for notifications)
- Lucide React (for icons)

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create an account at [OpenWeatherMap](https://openweathermap.org/api) and get your API key
4. Replace `YOUR_API_KEY` in `src/App.tsx` with your actual API key
5. Start the development server:
   ```bash
   npm run dev
   ```

## API Integration Details

This project uses the OpenWeatherMap Current Weather API:
- Base URL: `https://api.openweathermap.org/data/2.5/weather`
- Rate Limit: 60 calls/minute (free tier)
- API Key: Required (get yours at [OpenWeatherMap](https://openweathermap.org/api))
- Units: Metric (Celsius, km/h)

## Deployment

The app can be deployed to any static hosting platform. Build the project using:

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.
