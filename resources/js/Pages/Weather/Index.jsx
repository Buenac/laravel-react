import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

export default function Index({ forecast, cityName }) {
    const { isDark } = useTheme();
    const [note, setNote] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const handleAddFavorite = (date) => {
        router.post('/weather-favorites', {
            date: date,
            note: note,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setNote('');
                setSelectedDate('');
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className={`text-xl font-semibold leading-tight transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-gray-800'
                }`}>
                    {cityName} Weather Forecast
                </h2>
            }
        >
            <Head title="Weather Forecast" />

            <div className="py-12 min-h-screen relative overflow-hidden">
                {/* Animated Weather Background */}
                <div className={`absolute inset-0 transition-colors duration-500 ${
                    isDark 
                        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
                        : 'bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600'
                }`}>
                    {/* Animated sky gradient */}
                    <motion.div
                        animate={{
                            opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/20"
                    />

                    {/* Moving clouds */}
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={`cloud-${i}`}
                            animate={{
                                x: [-100, window.innerWidth + 100],
                            }}
                            transition={{
                                duration: 25 + i * 5,
                                repeat: Infinity,
                                ease: "linear",
                                delay: i * 3,
                            }}
                            className="absolute text-6xl text-white/30"
                            style={{
                                top: `${10 + i * 15}%`,
                            }}
                        >
                            ☁️
                        </motion.div>
                    ))}

                    {/* Animated gradient orbs */}
                    <motion.div
                        animate={{
                            x: [0, 120, 0],
                            y: [0, -60, 0],
                            scale: [1, 1.3, 1],
                        }}
                        transition={{
                            duration: 22,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute top-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{
                            x: [0, -100, 0],
                            y: [0, 80, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 28,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-white/10 rounded-full blur-3xl"
                    />

                    {/* Floating weather elements */}
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={`element-${i}`}
                            animate={{
                                y: [0, -40, 0],
                                rotate: [0, 10, 0],
                                opacity: [0.3, 0.5, 0.3],
                            }}
                            transition={{
                                duration: 5 + i * 1.5,
                                repeat: Infinity,
                                delay: i * 0.8,
                                ease: "easeInOut",
                            }}
                            className="absolute text-3xl text-white/40"
                            style={{
                                left: `${15 + i * 18}%`,
                                top: `${60 + (i % 2) * 20}%`,
                            }}
                        >
                            {['🌦️', '⛈️', '🌧️', '🌨️', '🌩️'][i]}
                        </motion.div>
                    ))}

                    {/* Subtle sparkles */}
                    {[...Array(12)].map((_, i) => (
                        <motion.div
                            key={`sparkle-${i}`}
                            animate={{
                                scale: [0, 1, 0],
                                opacity: [0, 0.6, 0],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 0.5,
                                ease: "easeInOut",
                            }}
                            className="absolute w-2 h-2 bg-white/80 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                        />
                    ))}
                </div>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 relative z-10">
                    {/* Narrative Introduction */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 overflow-hidden bg-white shadow-sm sm:rounded-lg"
                    >
                        <div className="p-6 text-gray-900">
                            <motion.h3
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="text-2xl font-bold mb-4"
                            >
                                Your 10-Day Weather Story
                            </motion.h3>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="text-gray-700 leading-relaxed"
                            >
                                Welcome to your personalized weather journey for <span className="font-semibold">{cityName}</span>.
                                The next 10 days hold a unique climate narrative waiting to unfold. Whether you're planning outdoor
                                activities, preparing for rain, or simply curious about the thermal sensations ahead, this forecast
                                provides you with detailed insights. Save your favorite days and add personal notes to track weather
                                patterns that matter to you!
                            </motion.p>
                        </div>
                    </motion.div>

                    {/* Forecast Table */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="overflow-hidden bg-white shadow-sm sm:rounded-lg"
                    >
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-4">10-Day Detailed Forecast</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Weather
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Temperature
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Rainfall (mm)
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Cloud Cover
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Precipitation
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {forecast.length === 0 ? (
                                            <tr>
                                                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                                                    Loading forecast data...
                                                </td>
                                            </tr>
                                        ) : (
                                            forecast.map((day, index) => (
                                                <motion.tr
                                                    key={index}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                                                    whileHover={{ backgroundColor: '#f9fafb', scale: 1.01 }}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {day.date}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                                                        {day.weather}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {day.tempMin}°C - {day.tempMax}°C
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {day.rainfallIntensity} mm
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {day.cloudCover}%
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {day.precipitation}%
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        <motion.button
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => setSelectedDate(day.date)}
                                                            className="text-indigo-600 hover:text-indigo-900 font-medium"
                                                        >
                                                            Add to Favorites
                                                        </motion.button>
                                                    </td>
                                                </motion.tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Add Favorite Form */}
                            {selectedDate && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-6 p-4 bg-gray-50 rounded-lg"
                                >
                                    <h4 className="font-semibold mb-2">Add Note for {selectedDate}</h4>
                                    <textarea
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                        placeholder="Add a personal note about this day..."
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        rows="3"
                                    />
                                    <div className="mt-2 flex gap-2">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleAddFavorite(selectedDate)}
                                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                        >
                                            Save Favorite
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => {
                                                setSelectedDate('');
                                                setNote('');
                                            }}
                                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                        >
                                            Cancel
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>

                    {/* Link to Favorites */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="mt-6"
                    >
                        <motion.a
                            whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                            whileTap={{ scale: 0.95 }}
                            href="/weather-favorites"
                            className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700"
                        >
                            View My Favorites
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
