<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Comment; // assuming you have a Comment model

class CommentsController extends Controller
{
    // Get all comments
    public function index()
    {
        return Comment::all();
    }

    // Store a new comment
    public function store(Request $request)
    {
        $request->validate([
            'text' => 'required|string',
        ]);

        $comment = Comment::create([
            'text' => $request->input('text'),
        ]);

        return response()->json($comment, 201);
    }

    // Show a specific comment
    public function show($id)
    {
        $comment = Comment::findOrFail($id);
        return response()->json($comment);
    }

    // Update a comment
    public function update(Request $request, $id)
    {
        $comment = Comment::findOrFail($id);

        $request->validate([
            'text' => 'required|string',
        ]);

        $comment->update([
            'text' => $request->input('text'),
        ]);

        return response()->json($comment);
    }

    // Delete a comment
    public function destroy($id)
    {
        $comment = Comment::findOrFail($id);
        $comment->delete();

        return response()->json(null, 204);
    }

    // In your CommentsController
public function search(Request $request)
{
    $query = $request->input('query', '');
    $comments = Comment::where('text', 'LIKE', "%{$query}%")->get();
    return response()->json($comments);
}
}