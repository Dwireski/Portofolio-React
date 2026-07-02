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
