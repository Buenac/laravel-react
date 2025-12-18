<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\WeatherFavorite;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WeatherFavoriteController extends Controller
{
    public function index()
    {
        $favorites = auth()->user()->weatherFavorites()->latest()->get();

        return Inertia::render('Weather/Favorites', [
            'favorites' => $favorites,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required|string',
            'note' => 'nullable|string|max:1000',
        ]);

        $favorite = auth()->user()->weatherFavorites()->create($validated);

        return back()->with('success', 'Favorite added successfully!');
    }

    public function update(Request $request, WeatherFavorite $weatherFavorite)
    {
        // Check if the favorite belongs to the authenticated user
        if ($weatherFavorite->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'note' => 'nullable|string|max:1000',
        ]);

        $weatherFavorite->update($validated);

        return back()->with('success', 'Note updated successfully!');
    }

    public function destroy(WeatherFavorite $weatherFavorite)
    {
        // Check if the favorite belongs to the authenticated user
        if ($weatherFavorite->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $weatherFavorite->delete();

        return back()->with('success', 'Favorite removed successfully!');
    }
}
