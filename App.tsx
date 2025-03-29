import React, { useState, useCallback } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { RefreshCw, Cloud } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { SearchHistory } from './components/SearchHistory';
import type { WeatherData, SearchHistoryItem } from './types';

const API_KEY = '698479c55d3cc2bafbd383c1757a3b1f';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [currentCity, setCurrentCity] = useState<string>('');

  const fetchWeather = useCallback(async (city: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      setWeatherData(data);
      setCurrentCity(city);
      
      // Update search history
      setSearchHistory((prev) => {
        const newHistory = [
          { city, timestamp: Date.now() },
          ...prev.filter((item) => item.city !== city),
        ].slice(0, 5);
        return newHistory;
      });

      toast.success(`Weather updated for ${city}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to fetch weather data');
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleRefresh = () => {
    if (currentCity) {
      fetchWeather(currentCity);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 p-4 transition-all">
      <div className="max-w-4xl mx-auto flex flex-col items-center pt-8 space-y-6">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
            <Cloud className="text-blue-500" />
            Weather Dashboard
          </h1>
          <p className="text-gray-600">Get real-time weather updates for any city</p>
        </div>
        
        <div className="w-full flex justify-center px-4">
          <SearchBar onSearch={fetchWeather} isLoading={isLoading} />
        </div>

        <SearchHistory history={searchHistory} onSelect={fetchWeather} />

        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <RefreshCw className="animate-spin text-blue-500" size={32} />
          </div>
        ) : weatherData ? (
          <div className="relative w-full px-4">
            <WeatherCard data={weatherData} />
            <button
              onClick={handleRefresh}
              className="absolute top-4 right-8 p-2 rounded-full hover:bg-blue-600/10 text-blue-600 transition-colors"
              title="Refresh"
            >
              <RefreshCw size={20} />
            </button>
          </div>
        ) : (
          <div className="text-center text-gray-500 p-8">
            <Cloud size={48} className="mx-auto mb-4 text-gray-400" />
            <p>Enter a city name to get started</p>
          </div>
        )}
      </div>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#363636',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
        }}
      />
    </div>
  );
}

export default App;