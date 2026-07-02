export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    category: string;
    video_url: string | null;
    thumbnail_path: string;
    is_featured: boolean;
    year: number | null;
    created_at: string;
    updated_at: string;
}

export interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    category: string;
    video_url: string | null;
    thumbnail_path: string;
    is_featured: boolean;
    year: number | null;
    created_at: string;
    updated_at: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    // Menggunakan 'any' untuk menghindari error "Cannot find module ziggy-js"
    ziggy: any;
};
