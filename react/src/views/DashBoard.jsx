import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const API_KEY = 'd0a4e8d2c5840292a2c37738e6408609';
  const CITY_NAME = 'Butuan City';

  const [forecast, setForecast] = useState([]);
  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem('comments');
    return saved ? JSON.parse(saved) : {};
  });
  const [editingKey, setEditingKey] = useState(null);
  const [editText, setEditText] = useState('');
  const [newComment, setNewComment] = useState('');

  // Fetch forecast data on component mount
  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const API_URL = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${CITY_NAME}&cnt=10&appid=${API_KEY}&units=metric`;
        const res = await fetch(API_URL);
        const data = await res.json();

        if (data.list) {
          const forecastData = data.list.map((day) => ({
            date: new Date(day.dt * 1000).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            }),
            rainfallIntensity: Math.round(day.rain || 0),
            cloudCover: day.clouds || 0,
            thermalSensation: Math.round(day.temp.day + 2),
            precipitation: Math.round(day.pop * 100) || 0,
          }));
          setForecast(forecastData);
        } else {
          console.error('No forecast data available', data);
        }
      } catch (error) {
        console.error('Error fetching forecast:', error);
      }
    };
    fetchForecast();
  }, []);

  // Persist comments to local storage
  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  const handleAddComment = () => {
    const text = newComment.trim();
    if (text === '') return;
    const key = Date.now().toString();
    setComments((prev) => ({ ...prev, [key]: text }));
    setNewComment('');
  };

  const handleDeleteComment = (key) => {
    setComments((prev) => {
      const newComments = { ...prev };
      delete newComments[key];
      return newComments;
    });
  };

  const handleStartEdit = (key, currentComment) => {
    setEditingKey(key);
    setEditText(currentComment);
  };

  const handleSaveEdit = (key) => {
    if (editText.trim() === '') return;
    setComments((prev) => ({ ...prev, [key]: editText }));
    setEditingKey(null);
  };

  const handleCancelEdit = () => {
    setEditingKey(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Butuan City 10-Day Forecast
        </h1>
        <p className="text-gray-500 text-sm">Source: OpenWeatherMap API</p>
      </header>

      {/* Forecast Table */}
      <section className="overflow-x-auto max-w-7xl mx-auto mb-10">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="uppercase text-sm text-gray-600">
                <th className="py-3 px-6 text-left font-medium">Day</th>
                <th className="py-3 px-6 text-left font-medium">Rainfall (mm)</th>
                <th className="py-3 px-6 text-left font-medium">Cloud Cover (%)</th>
                <th className="py-3 px-6 text-left font-medium">Thermal Sensation (°C)</th>
                <th className="py-3 px-6 text-left font-medium">Precipitation (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {forecast.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-400">
                    Loading forecast data...
                  </td>
                </tr>
              ) : (
                forecast.map((day, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    <td className="py-3 px-6 text-gray-700">{day.date}</td>
                    <td className="py-3 px-6">{day.rainfallIntensity} mm</td>
                    <td className="py-3 px-6">{day.cloudCover}%</td>
                    <td className="py-3 px-6">{day.thermalSensation}°C</td>
                    <td className="py-3 px-6">{day.precipitation}%</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Comments Table */}
      <section className="overflow-x-auto max-w-7xl mx-auto mb-10">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="uppercase text-sm text-gray-600">
                <th className="py-3 px-6 text-left font-medium">Comment</th>
                <th className="py-3 px-6 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white text-gray-700">
              {Object.entries(comments).length === 0 ? (
                <tr>
                  <td colSpan="2" className="py-4 text-center text-gray-400">
                    Be the first to leave a comment!
                  </td>
                </tr>
              ) : (
                Object.entries(comments).map(([key, comment]) => (
                  <tr key={key} className="hover:bg-gray-50 transition">
                    {editingKey === key ? (
                      <td colSpan="2" className="p-3">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                          />
                          <button
                            onClick={() => handleSaveEdit(key)}
                            className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 shadow-sm transition"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="bg-gray-400 text-gray-800 px-3 py-1 rounded-md hover:bg-gray-500 shadow-sm transition"
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    ) : (
                      <>
                        <td className="py-3 px-6">{comment}</td>
                        <td className="py-3 px-6 flex space-x-2 justify-center">
                          <button
                            onClick={() => handleStartEdit(key, comment)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 shadow-sm transition text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteComment(key)}
                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 shadow-sm transition text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Add Comment */}
      <section className="max-w-7xl mx-auto mb-10">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 md:flex md:items-center md:space-x-4">
          <input
            type="text"
            placeholder="Share your thoughts on the forecast..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm"
          />
          <button
            onClick={handleAddComment}
            className="mt-3 md:mt-0 bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold shadow-lg hover:bg-indigo-700 transition duration-200"
          >
            Post Comment
          </button>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;