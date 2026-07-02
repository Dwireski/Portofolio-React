<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class ContactPageController extends Controller
{
    /**
     * Display the contact page.
     */
    public function index()
    {
        $contactInfo = [
            'email' => 'ahmadreski2712@gmail.com',
            'phone' => '+62 813 5502 5343',
            'location' => 'Malang, Indonesia',
            'social_links' => [
                'linkedin' => 'https://linkedin.com/in/dwiareski',
                'instagram' => 'https://instagram.com/dwiareski',
                'github' => 'https://github.com/dwiareski',
            ],
        ];

        return Inertia::render('Public/Contact/Index', [
            'contactInfo' => $contactInfo,
        ]);
    }
}