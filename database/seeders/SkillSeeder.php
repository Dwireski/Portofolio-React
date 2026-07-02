<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Skill;

class SkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $skills = [
            // Skillset dari CV
            ['name' => 'Videography (DSLR/Mirrorless)', 'category' => 'skillset'],
            ['name' => 'Camera Handling & Framing', 'category' => 'skillset'],
            ['name' => 'Basic Cinematography', 'category' => 'skillset'],
            ['name' => 'Video & Audio Editing', 'category' => 'skillset'],
            ['name' => 'Graphic Design', 'category' => 'skillset'],
            ['name' => 'Digital Content Creation', 'category' => 'skillset'],
            
            // Toolset dari CV
            ['name' => 'Figma', 'category' => 'toolset'],
            ['name' => 'Adobe Premiere', 'category' => 'toolset'],
            ['name' => 'Adobe Illustrator', 'category' => 'toolset'],
            ['name' => 'Adobe After Effects', 'category' => 'toolset'],
            ['name' => 'Canva', 'category' => 'toolset'],
            ['name' => 'Capcut', 'category' => 'toolset'],
            ['name' => 'CorelDraw', 'category' => 'toolset'],
        ];

        foreach ($skills as $skill) {
            Skill::create($skill);
        }
    }
}