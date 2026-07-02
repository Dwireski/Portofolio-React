<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\ProjectController as AdminProjectController;
use App\Http\Controllers\Admin\MessageController;
use App\Http\Controllers\Admin\SkillController as AdminSkillController;
use App\Http\Controllers\Public\ProjectController as PublicProjectController;
use App\Http\Controllers\Public\SkillController as PublicSkillController;
use App\Http\Controllers\Public\ContactPageController;
use App\Http\Controllers\ContactController;
use App\Models\Project;
use App\Models\Message;
use App\Models\Skill;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $projects = Project::where('is_featured', true)
        ->orWhere('category', 'video_production')
        ->latest()
        ->take(6)
        ->get();
    
    $skills = Skill::all();

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'projects' => $projects,
        'skills' => $skills,
    ]);
});

Route::get('/dashboard', function () {
    $stats = [
        'total_projects' => Project::count(),
        'unread_messages' => Message::where('is_read', false)->count(),
        'total_skills' => Skill::count(),
        'featured_projects' => Project::where('is_featured', true)->count(),
    ];

    return Inertia::render('Dashboard', [
        'stats' => $stats,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin Routes
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::resource('projects', AdminProjectController::class);
    Route::resource('messages', MessageController::class)->only(['index', 'show', 'destroy']);
    Route::resource('skills', AdminSkillController::class);
});

// Public Routes
Route::get('/projects', [PublicProjectController::class, 'index'])->name('public.projects.index');
Route::get('/projects/{slug}', [PublicProjectController::class, 'show'])->name('public.projects.show');
Route::get('/skills', [PublicSkillController::class, 'index'])->name('public.skills.index');
Route::get('/contact', [ContactPageController::class, 'index'])->name('public.contact.index');

// Public Contact Form Route
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

require __DIR__.'/auth.php';