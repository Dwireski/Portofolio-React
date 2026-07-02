<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SkillController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $skills = Skill::latest()->paginate(15);

        return Inertia::render('Admin/Skills/Index', [
            'skills' => $skills,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Skills/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|in:skillset,toolset',
            'icon' => 'nullable|image|mimes:jpeg,png,jpg,webp,svg|max:1024',
        ]);

        // Handle icon upload if provided
        $iconPath = null;
        if ($request->hasFile('icon')) {
            $iconPath = $request->file('icon')->store('skills', 'public');
        }

        Skill::create([
            'name' => $validated['name'],
            'category' => $validated['category'],
            'icon_path' => $iconPath,
        ]);

        return redirect()->route('admin.skills.index')
            ->with('success', 'Skill created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $skill = Skill::findOrFail($id);

        return Inertia::render('Admin/Skills/Show', [
            'skill' => $skill,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $skill = Skill::findOrFail($id);

        return Inertia::render('Admin/Skills/Edit', [
            'skill' => $skill,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $skill = Skill::findOrFail($id);

        // Tambahkan validasi untuk delete_icon (bisa berupa boolean asli atau string 'true'/'false' dari form data)
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|in:skillset,toolset',
            'icon' => 'nullable|image|mimes:jpeg,png,jpg,webp,svg|max:1024',
            'delete_icon' => 'nullable',
        ]);

        $iconPath = $skill->icon_path;

        // Logika Baru: Periksa apakah ada instruksi untuk menghapus ikon aktif
        if ($request->input('delete_icon') === true || $request->input('delete_icon') === 'true') {
            if ($skill->icon_path) {
                Storage::disk('public')->delete($skill->icon_path);
            }
            $iconPath = null;
        }

        // Handle icon upload jika ada file baru yang disediakan
        if ($request->hasFile('icon')) {
            // Hapus ikon lama terlebih dahulu jika ada sebelum digantikan yang baru
            if ($skill->icon_path) {
                Storage::disk('public')->delete($skill->icon_path);
            }
            $iconPath = $request->file('icon')->store('skills', 'public');
        }

        $skill->update([
            'name' => $validated['name'],
            'category' => $validated['category'],
            'icon_path' => $iconPath,
        ]);

        return redirect()->route('admin.skills.index')
            ->with('success', 'Skill updated successfully.');
    }

/**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $skill = Skill::findOrFail($id);

        // Delete icon from storage if exists
        if ($skill->icon_path) {
            Storage::disk('public')->delete($skill->icon_path);
        }

        $skill->delete();

        return redirect()->route('admin.skills.index')
            ->with('success', 'Skill deleted successfully.');
    }
}