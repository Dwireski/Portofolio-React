<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of all projects with search and filter.
     */
    public function index(Request $request)
    {
        $query = Project::query();

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Category filter
        if ($request->filled('category') && $request->input('category') !== 'all') {
            $query->where('category', $request->input('category'));
        }

        // Get projects with pagination
        $projects = $query->latest()->paginate(9)->withQueryString();

        // Get categories for filter buttons
        $categories = Project::select('category')
            ->distinct()
            ->pluck('category')
            ->map(function($category) {
                $labels = [
                    'video_production' => 'Video Production',
                    'video_editing' => 'Video Editing',
                    'graphic_design' => 'Graphic Design',
                    'photography' => 'Photography',
                ];
                return [
                    'value' => $category,
                    'label' => $labels[$category] ?? $category,
                ];
            });

        return Inertia::render('Public/Projects/Index', [
            'projects' => $projects,
            'filters' => [
                'search' => $request->input('search', ''),
                'category' => $request->input('category', 'all'),
            ],
            'categories' => $categories,
        ]);
    }

    /**
     * Display the specified project.
     */
    public function show(string $slug)
    {
        $project = Project::where('slug', $slug)->firstOrFail();

        // Get related projects (same category, exclude current)
        $relatedProjects = Project::where('category', $project->category)
            ->where('id', '!=', $project->id)
            ->latest()
            ->take(3)
            ->get();

        return Inertia::render('Public/Projects/Show', [
            'project' => $project,
            'relatedProjects' => $relatedProjects,
        ]);
    }
}