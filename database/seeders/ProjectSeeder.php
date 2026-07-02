<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;
use Illuminate\Support\Str;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $projects = [
            [
                'title' => 'Profile Video HMPS Informatics Engineering',
                'slug' => Str::slug('Profile Video HMPS Informatics Engineering'),
                'description' => 'Produced and edited the organizational profile video for Himpunan Mahasiswa Teknik Informatika UIN Malang, completed within 1 month and gained 500+ views on YouTube.',
                'category' => 'video_production',
                'video_url' => 'https://www.youtube.com/embed/BhS0BHvMNrg',
                'thumbnail_path' => 'https://via.placeholder.com/800x450.png?text=HMPS+Profile',
                'is_featured' => true,
                'year' => 2025,
            ],
            [
                'title' => 'Sholawat Cover Video — 3rd Place',
                'slug' => Str::slug('Sholawat Cover Video 3rd Place'),
                'description' => '3rd Place winner at the Sevent Series Festival IPNU IPPNU, UIN Walisongo Semarang.',
                'category' => 'video_production',
                'video_url' => 'https://www.instagram.com/p/DDE1R8SSCYQ/embed',
                'thumbnail_path' => 'https://via.placeholder.com/800x450.png?text=Sholawat+Cover',
                'is_featured' => true,
                'year' => 2024,
            ],
            [
                'title' => 'Short Movie: Bahasa Arab Gerbang Kesuksesan',
                'slug' => Str::slug('Short Movie Bahasa Arab Gerbang Kesuksesan'),
                'description' => 'A short movie highlighting the importance of Arabic language as the gate of success.',
                'category' => 'video_production',
                'video_url' => 'https://www.instagram.com/p/DDE2f9-yJPa/embed',
                'thumbnail_path' => 'https://via.placeholder.com/800x450.png?text=Bahasa+Arab',
                'is_featured' => false,
                'year' => 2024,
            ],
            [
                'title' => 'Profile Video Pesantren Wisata Al-Qur\'an',
                'slug' => Str::slug('Profile Video Pesantren Wisata Al-Quran'),
                'description' => 'Produced the official profile video for Pesantren Wisata Al-Qur\'an (PWQ) in 2022.',
                'category' => 'video_production',
                'video_url' => 'https://www.youtube.com/embed/YD885KzcJ9M',
                'thumbnail_path' => 'https://via.placeholder.com/800x450.png?text=PWQ+Profile',
                'is_featured' => false,
                'year' => 2022,
            ],
            [
                'title' => 'Short Movie: JPT (Jujur Peduli Toleran)',
                'slug' => Str::slug('Short Movie JPT Jujur Peduli Toleran'),
                'description' => 'A short movie about honesty, care, and tolerance values.',
                'category' => 'video_production',
                'video_url' => 'https://www.youtube.com/embed/rFq5n1JACdQ',
                'thumbnail_path' => 'https://via.placeholder.com/800x450.png?text=JPT+Short+Movie',
                'is_featured' => false,
                'year' => 2022,
            ],
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }
    }
}