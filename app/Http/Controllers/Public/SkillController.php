<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Inertia\Inertia;

class SkillController extends Controller
{
    /**
     * Display the skills page with achievements and education.
     */
    public function index()
    {
        // Get all skills grouped by category
        $skills = Skill::all()->groupBy('category')->map(function($skills, $category) {
            return $skills->map(function($skill) {
                // You can add a 'level' field to your skills table later
                // For now, we'll use random levels or you can set them manually
                return [
                    'id' => $skill->id,
                    'name' => $skill->name,
                    'category' => $skill->category,
                    'icon_path' => $skill->icon_path,
                    'level' => $this->getSkillLevel($skill->name),
                ];
            });
        });

        // Achievements data (you can create a model/table for this later)
        $achievements = [
            [
                'title' => 'Gold Medal - Short Film Production',
                'description' => 'Gold medal in short film production at the regional level competition in South Sulawesi, recognizing excellence in storytelling, cinematography, and video production.',
                'year' => '2024',
                'icon' => '🏆',
            ],
            [
                'title' => 'Best Group Representative',
                'description' => 'Recognized as the Best Group and Representative of South Sulawesi in the prestigious Santri Digitalpreneur national event, competing against digital content creators from across Indonesia.',
                'year' => '2024',
                'icon' => '⭐',
            ],
            [
                'title' => 'Bronze Medal - Sholawat Cover Video',
                'description' => 'Bronze medal for creative Sholawat cover video production at a national-level festival, showcasing musical and visual storytelling capabilities.',
                'year' => '2024',
                'icon' => '🥉',
            ],
        ];

        // Education data (you can create a model/table for this later)
        $education = [
            [
                'institution' => 'UIN Maulana Malik Ibrahim Malang',
                'degree' => 'Informatics Engineering',
                'period' => '2024 - Present',
                'gpa' => '3.77',
                'description' => 'Conducting research on full virtualization vs paravirtualization',
                'location' => 'Malang, East Java',
            ],
            [
                'institution' => 'MA Pesantren Wisata Al-Qur\'an',
                'degree' => 'Informatics Engineering',
                'period' => '2020 - 2024',
                'gpa' => '91.20',
                'description' => 'Pangkep, South Sulawesi',
                'location' => 'Pangkep, South Sulawesi',
            ],
        ];

        return Inertia::render('Public/Skills/Index', [
            'skills' => $skills,
            'achievements' => $achievements,
            'education' => $education,
        ]);
    }

    /**
     * Get skill level based on skill name (you can customize this).
     */
    private function getSkillLevel($skillName)
    {
        $levels = [
            // Videography Skills
            'Video & Audio Editing' => 90,
            'DSLR/Mirrorless Operation' => 90,
            'Camera Handling & Framing' => 85,
            'Basic Cinematography' => 80,
            'Videography' => 85,
            
            // Design Skills
            'Graphic Design' => 85,
            'Digital Content Creation' => 92,
            'Adobe Premiere' => 90,
            'Adobe After Effects' => 85,
            'Adobe Illustrator' => 80,
            'Adobe Photoshop' => 85,
            'Figma' => 88,
            'Canva' => 95,
            'CorelDraw' => 82,
            
            // Other Skills
            'Capcut' => 90,
        ];

        return $levels[$skillName] ?? 75; // Default 75% if not found
    }
}