# Laravel React Weather Forecast Application

![Static Badge](https://img.shields.io/badge/8.2+-161414?style=flat-square&logo=PHP&logoColor=777BB4&label=PHP&labelColor=161414)
![Static Badge](https://img.shields.io/badge/11.0-161414?style=flat-square&logo=Laravel&label=Laravel&labelColor=161414)
![Static Badge](https://img.shields.io/badge/18.2.0-161414?style=flat-square&logo=React&label=React&labelColor=161414)
![Static Badge](https://img.shields.io/badge/Inertia.js-161414?style=flat-square&logo=Inertia&logoColor=9553E9&label=Inertia.js&labelColor=161414)

A full-stack web application built with Laravel 11, Inertia.js, and React, featuring weather forecast integration with user authentication and personalized favorites system.

## 📋 Project Overview

This application provides a narrative-driven 10-day weather forecast for Butuan City using the OpenWeatherMap API. Users can register, view detailed weather information, and save favorite days with personal notes.

## 🎯 Features

- **User Authentication**: Complete registration and login system powered by Laravel Breeze
- **Weather Forecast**: 10-day detailed weather forecast with server-side caching
- **Personal Favorites**: Save and annotate favorite weather days with CRUD operations
- **Inertia.js Navigation**: Seamless page transitions without full page reloads
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **User Management**: Create, edit, delete, and view user profiles

## 🛠️ Technical Stack

### Backend
- **PHP**: 8.2+
- **Laravel**: 11.0
- **Database**: MySQL
- **Authentication**: Laravel Breeze with Sanctum
- **Inertia.js**: Server-side adapter (v2.0.16)
- **Caching**: Laravel Cache for API responses

### Frontend
- **React**: 18.2.0
- **Inertia.js**: React adapter
- **Vite**: 5.4.21 (Build tool)
- **Tailwind CSS**: For styling
- **Framer Motion**: For animations
- **Ziggy**: Laravel route helper for React

## 📦 Dependencies

### PHP/Composer Dependencies
- **laravel/framework**: ^11.0
- **laravel/sanctum**: ^4.2
- **laravel/breeze**: ^2.3 (dev)
- **inertiajs/inertia-laravel**: ^2.0
- **tightenco/ziggy**: ^2.6
- **fakerphp/faker**: ^1.23 (dev)
- **phpunit/phpunit**: ^11.0.1 (dev)

### Node.js/NPM Dependencies
- **@inertiajs/react**: ^1.2.0
- **react**: ^18.2.0
- **react-dom**: ^18.2.0
- **@vitejs/plugin-react**: ^4.2.0
- **axios**: ^1.6.4
- **framer-motion**: ^11.15.0
- **tailwindcss**: ^3.4.1
- **laravel-vite-plugin**: ^1.0
- **vite**: ^5.0

## Requirements

## Requirements

### Prerequisites
- **PHP**: >= 8.2 with required extensions:
  - `ext-pdo`, `ext-pdo_mysql`
  - `ext-mbstring`, `ext-xml`, `ext-curl`
  - `ext-zip`, `ext-fileinfo`
* **Composer:** PHP dependency manager (latest version)
* **Node.js:** >= 18.x and npm
* **MySQL:** >= 8.0 or MariaDB
* **Git:** (optional)

## 🚀 Installation

## 🚀 Installation

### Step 1: Clone/Download Project
```bash
git clone https://github.com/Buenac/laravel-react.git
cd laravel-react
```

### Step 2: Install PHP Dependencies
```bash
composer install
```

### Step 3: Environment Configuration
```bash
# Windows
copy .env.example .env

# Linux/Mac
cp .env.example .env

# Generate application key
php artisan key:generate
```

### Step 4: Configure Database
Edit `.env` file and set your database credentials:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_weather
DB_USERNAME=root
DB_PASSWORD=your_password
```

Create the database in MySQL:
```sql
CREATE DATABASE laravel_weather;
```

### Step 5: Run Migrations
```bash
php artisan migrate
```

### Step 6: Configure Weather API
Add your OpenWeatherMap API key to `.env`:
```env
OPENWEATHER_API_KEY=your_api_key_here
```
*Note: A default key is included for testing purposes*

### Step 7: Install Frontend Dependencies
```bash
npm install --legacy-peer-deps
```

### Step 8: Start Development Servers

**Terminal 1 - Laravel Backend:**
```bash
php artisan serve --port=8000
```

**Terminal 2 - Vite Frontend:**
```bash
npm run dev
```

### Step 9: Access Application
- Open browser: http://127.0.0.1:8000
- Register a new account
- Navigate to Weather section

## 📁 Project Structure

```
laravel-react/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── WeatherController.php
│   │   │   ├── WeatherFavoriteController.php
│   │   │   ├── UserController.php
│   │   │   └── ProfileController.php
│   │   └── Middleware/
│   │       └── HandleInertiaRequests.php
│   └── Models/
│       ├── User.php
│       ├── Comment.php
│       └── WeatherFavorite.php
├── database/
│   └── migrations/
│       ├── create_users_table.php
│       ├── create_comments_table.php
│       └── create_weather_favorites_table.php
├── resources/
│   └── js/
│       ├── Components/
│       ├── Layouts/
│       │   └── AuthenticatedLayout.jsx
│       ├── Pages/
│       │   ├── Auth/ (Login, Register)
│       │   ├── Profile/
│       │   └── Weather/
│       │       ├── Index.jsx
│       │       └── Favorites.jsx
│       └── app.jsx
├── routes/
│   ├── web.php
│   ├── api.php
│   └── auth.php
├── composer.json
├── package.json
└── vite.config.js
```

## Usage

## Usage

### Weather Forecast
1. Access the weather page from navigation
2. View 10-day detailed forecast for Butuan City
3. Click "Add to Favorites" on any day
4. Add personal notes about the weather
5. View your saved favorites

### User Registration & Authentication
1. Access the registration page (`/register`)
2. Fill in name, email, and password
3. Login at `/login`
4. Access authenticated features

### Managing Favorites
1. Save favorite weather days from the forecast
2. Edit notes on saved favorites
3. Delete favorites you no longer need
4. All favorites are private to your account

## 🔑 Key Features Implementation

### 1. API Integration with Caching
Weather data is fetched server-side using Laravel's HTTP client with 1-hour cache:
```php
Cache::remember('weather_forecast', 3600, function () {
    return Http::get('https://api.openweathermap.org/...')->json();
});
```

### 2. Inertia.js Routes
All routes use Inertia for SPA-like navigation:
```php
Route::middleware('auth')->group(function () {
    Route::get('/weather', [WeatherController::class, 'index']);
    Route::resource('weather-favorites', WeatherFavoriteController::class);
});
```

### 3. Weather Favorites CRUD
- **Create**: Save favorite days from forecast
- **Read**: View all saved favorites
- **Update**: Edit notes on saved days
- **Delete**: Remove favorites

## 🎨 Narrative Theme

The weather forecast is presented with a story-driven approach:
- **Introduction**: Contextualizes the weather data
- **Chronological Display**: Days ordered sequentially
- **Detailed Metrics**: Rainfall, cloud cover, temperature ranges
- **Personal Connection**: Users save and annotate meaningful days

## 🔒 Security Features

- CSRF protection on all forms
- Authentication required for CRUD operations
- Authorization policies for user-specific resources
- Password hashing with bcrypt
- Sanctum API token management

## 🐛 Common Issues & Solutions

### Issue: Composer install fails
**Solution**: Ensure PHP 8.2+ is installed and all required extensions are enabled

### Issue: npm install fails with peer dependency conflicts
**Solution**: Use `npm install --legacy-peer-deps`

### Issue: Vite manifest not found
**Solution**: Run `npm run build` or ensure `npm run dev` is running

### Issue: Weather API returns error
**Solution**: Check OPENWEATHER_API_KEY in .env and clear cache: `php artisan cache:clear`

### Issue: Database connection error
**Solution**: Verify database credentials in .env and ensure MySQL service is running

## 🚀 Production Deployment

1. Set environment to production:
```env
APP_ENV=production
APP_DEBUG=false
```

2. Build frontend assets:
```bash
npm run build
```

3. Optimize Laravel:
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

4. Set proper permissions (Linux/Mac):
```bash
chmod -R 775 storage bootstrap/cache
```

## 📄 License

This project is licensed under the MIT License.

## 👥 Credits

- **Laravel Framework**: [laravel.com](https://laravel.com)
- **Inertia.js**: [inertiajs.com](https://inertiajs.com)
- **OpenWeatherMap API**: [openweathermap.org](https://openweathermap.org)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)
- **React**: [react.dev](https://react.dev)

---

**Last Updated**: December 18, 2025  
**Version**: 2.0.0 (Inertia.js + Weather Integration)
