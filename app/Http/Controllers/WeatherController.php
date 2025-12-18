<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class WeatherController extends Controller
{
    public function index()
    {
        $forecast = $this->getForecast();
        
        return Inertia::render('Weather/Index', [
            'forecast' => $forecast,
            'cityName' => 'Butuan City',
        ]);
    }

    public function getForecast()
    {
        return Cache::remember('weather_forecast', 3600, function () {
            $apiKey = env('OPENWEATHER_API_KEY', 'd0a4e8d2c5840292a2c37738e6408609');
            $cityName = 'Butuan City';
            
            try {
                $response = Http::timeout(10)->get(
                    'https://api.openweathermap.org/data/2.5/forecast/daily',
                    [
                        'q' => $cityName,
                        'cnt' => 10,
                        'appid' => $apiKey,
                        'units' => 'metric',
                    ]
                );

                if ($response->successful() && isset($response['list'])) {
                    return collect($response['list'])->map(function ($day) {
                        return [
                            'date' => date('M d, Y', $day['dt']),
                            'rainfallIntensity' => round($day['rain'] ?? 0),
                            'cloudCover' => $day['clouds'] ?? 0,
                            'thermalSensation' => round($day['temp']['day'] + 2),
                            'precipitation' => round(($day['pop'] ?? 0) * 100),
                            'weather' => $day['weather'][0]['description'] ?? 'N/A',
                            'tempMin' => round($day['temp']['min']),
                            'tempMax' => round($day['temp']['max']),
                        ];
                    })->toArray();
                }
            } catch (\Exception $e) {
                \Log::error('Weather API Error: ' . $e->getMessage());
            }

            return [];
        });
    }

    public function api()
    {
        return response()->json([
            'forecast' => $this->getForecast(),
            'cityName' => 'Butuan City',
        ]);
    }
}
