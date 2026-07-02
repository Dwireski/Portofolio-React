import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Project } from "@/types";
import { FormEvent, useState } from "react";

interface Props {
    project: Project;
}

export default function Edit({ project }: Props) {
    // Properti _method: "PUT" sudah benar di sini
    const { data, setData, post, processing, errors } = useForm({
        title: project.title,
        description: project.description,
        category: project.category,
        video_url: project.video_url || "",
        thumbnail: null as File | null,
        year: project.year?.toString() || "",
        is_featured: project.is_featured,
        _method: "PUT",
    });

    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
        null,
    );

    const getImageUrl = (path: string) => {
        return path.startsWith("http") ? path : `/storage/${path}`;
    };

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData("thumbnail", file);

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setThumbnailPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeThumbnail = () => {
        setData("thumbnail", null);
        setThumbnailPreview(null);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // PERBAIKAN UTAMA: Mengubah fungsionalitas dari put() menjadi post()
        // Ini adalah standard Inertia.js Method Spoofing agar upload file biner pada form edit tidak merusak data text request
        post(route("admin.projects.update", project.id), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                // Keep form data as is on success
            },
        });
    };

    return (
        <AdminLayout>
            <Head title={`Edit Project: ${project.title}`} />

            <div className="space-y-6 px-4 sm:px-0 max-w-4xl mx-auto py-4">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-800 pb-5">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-yellow-400 tracking-tight">
                            Edit Project
                        </h1>
                        <p className="text-gray-400 mt-1 text-xs sm:text-sm font-medium">
                            Modify fields below to update the visual data inside
                            your showcase portfolio.
                        </p>
                    </div>
                    <Link
                        href={route("admin.projects.index")}
                        className="inline-flex items-center justify-center px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700 hover:border-gray-600 rounded-lg font-semibold transition-all text-xs sm:text-sm w-full sm:w-auto text-center"
                    >
                        ← Back to Index
                    </Link>
                </div>

                {/* Form Card */}
                <div className="bg-gray-855 rounded-2xl border border-gray-800 shadow-2xl shadow-black/50 p-5 sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title */}
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wide mb-2"
                            >
                                Project Title{" "}
                                <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                className="w-full px-4 py-3 bg-gray-900/90 border border-gray-700/70 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all text-sm sm:text-base shadow-inner"
                                placeholder="e.g., Creative Commercial Video Branding"
                                required
                            />
                            {errors.title && (
                                <p className="mt-2 text-xs sm:text-sm text-red-400 font-medium">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label
                                htmlFor="description"
                                className="block text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wide mb-2"
                            >
                                Description{" "}
                                <span className="text-red-400">*</span>
                            </label>
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                rows={5}
                                className="w-full px-4 py-3 bg-gray-900/90 border border-gray-700/70 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all resize-none text-sm sm:text-base leading-relaxed"
                                placeholder="Provide an explicit detailed breakdown of production steps, tools used, and creative approaches..."
                                required
                            />
                            {errors.description && (
                                <p className="mt-2 text-xs sm:text-sm text-red-400 font-medium">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        {/* Category & Year Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {/* Category */}
                            <div>
                                <label
                                    htmlFor="category"
                                    className="block text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wide mb-2"
                                >
                                    Category{" "}
                                    <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        id="category"
                                        value={data.category}
                                        onChange={(e) =>
                                            setData("category", e.target.value)
                                        }
                                        className="w-full px-4 py-3 bg-gray-900/90 border border-gray-700/70 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all text-sm sm:text-base appearance-none cursor-pointer"
                                        required
                                    >
                                        <option value="video_production">
                                            Video Production
                                        </option>
                                        <option value="video_editing">
                                            Video Editing
                                        </option>
                                        <option value="graphic_design">
                                            Graphic Design
                                        </option>
                                        <option value="photography">
                                            Photography
                                        </option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                {errors.category && (
                                    <p className="mt-2 text-xs sm:text-sm text-red-400 font-medium">
                                        {errors.category}
                                    </p>
                                )}
                            </div>

                            {/* Year */}
                            <div>
                                <label
                                    htmlFor="year"
                                    className="block text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wide mb-2"
                                >
                                    Year of Release
                                </label>
                                <input
                                    type="number"
                                    id="year"
                                    value={data.year}
                                    onChange={(e) =>
                                        setData("year", e.target.value)
                                    }
                                    min="2000"
                                    max={2027}
                                    className="w-full px-4 py-3 bg-gray-900/90 border border-gray-700/70 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all text-sm sm:text-base"
                                    placeholder="e.g., 2026"
                                />
                                {errors.year && (
                                    <p className="mt-2 text-xs sm:text-sm text-red-400 font-medium">
                                        {errors.year}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Video URL */}
                        <div>
                            <label
                                htmlFor="video_url"
                                className="block text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wide mb-2"
                            >
                                Production Embed URL
                                <span className="text-gray-500 lowercase font-normal text-xs ml-2">
                                    (YouTube embed, Vimeo, or Instagram URL)
                                </span>
                            </label>
                            <input
                                type="url"
                                id="video_url"
                                value={data.video_url}
                                onChange={(e) =>
                                    setData("video_url", e.target.value)
                                }
                                className="w-full px-4 py-3 bg-gray-900/90 border border-gray-700/70 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all text-sm sm:text-base shadow-inner"
                                placeholder="https://www.youtube.com/embed/XXXXXX"
                            />
                            {errors.video_url && (
                                <p className="mt-2 text-xs sm:text-sm text-red-400 font-medium">
                                    {errors.video_url}
                                </p>
                            )}
                        </div>

                        {/* Thumbnail Upload Canvas Block */}
                        <div>
                            <label className="block text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wide mb-2">
                                Thumbnail Canvas Image
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                                {/* Current or Preview Image Container */}
                                {(thumbnailPreview ||
                                    project.thumbnail_path) && (
                                    <div className="relative w-full aspect-video bg-gray-950 border border-gray-800 rounded-xl overflow-hidden group shadow-md shadow-black/40">
                                        <img
                                            src={
                                                thumbnailPreview ||
                                                getImageUrl(
                                                    project.thumbnail_path,
                                                )
                                            }
                                            alt="Preview Frame"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                (
                                                    e.target as HTMLImageElement
                                                ).src =
                                                    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="450"%3E%3Crect fill="%23374151" width="800" height="450"/%3E%3Ctext fill="%239CA3AF" font-family="Arial" font-size="24" text-anchor="middle" x="400" y="225"%3ENo Image%3C/text%3E%3C/svg%3E';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                                            <span className="text-xs font-bold text-white tracking-wide bg-gray-900/80 px-3 py-1.5 rounded-md border border-gray-700/60">
                                                {thumbnailPreview
                                                    ? "New Frame Applied"
                                                    : "Active Standard Thumbnail"}
                                            </span>
                                        </div>
                                        {thumbnailPreview && (
                                            <button
                                                type="button"
                                                onClick={removeThumbnail}
                                                className="absolute top-3 right-3 px-2.5 py-1.5 bg-red-600/90 hover:bg-red-700 text-white text-[11px] font-bold rounded-lg transition-colors shadow-lg shadow-black/30"
                                            >
                                                Discard New
                                            </button>
                                        )}
                                    </div>
                                )}

                                {/* Dynamic Interactive Upload Slot Box */}
                                <label className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed border-gray-700 hover:border-yellow-400/70 rounded-xl cursor-pointer bg-gray-900/40 hover:bg-gray-900/80 transition-all group">
                                    <div className="flex flex-col items-center justify-center p-4 text-center">
                                        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mb-2 group-hover:scale-110 group-hover:bg-gray-700 transition-transform">
                                            <svg
                                                className="w-5 h-5 text-gray-400 group-hover:text-yellow-400 transition-colors"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v1m-4-8l-4-4m0 0L8 8m4-4v12"
                                                />
                                            </svg>
                                        </div>
                                        <p className="text-xs sm:text-sm text-gray-400">
                                            <span className="font-bold text-yellow-400 group-hover:underline">
                                                Click here
                                            </span>{" "}
                                            to upload new frame
                                        </p>
                                        <p className="text-[10px] sm:text-xs text-gray-500 mt-1 max-w-[200px]">
                                            Supports JPG, PNG or WebP. Empty
                                            keeps standard frame.
                                        </p>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleThumbnailChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            {errors.thumbnail && (
                                <p className="mt-2 text-xs sm:text-sm text-red-400 font-medium">
                                    {errors.thumbnail}
                                </p>
                            )}
                        </div>

                        {/* Is Featured Checkbox Row */}
                        <div className="p-4 bg-gray-900/60 rounded-xl border border-gray-800/80 flex items-start select-none cursor-pointer group">
                            <div className="flex items-center h-5">
                                <input
                                    type="checkbox"
                                    id="is_featured"
                                    checked={data.is_featured}
                                    onChange={(e) =>
                                        setData("is_featured", e.target.checked)
                                    }
                                    className="w-4 h-4 bg-gray-950 border-gray-700 rounded text-yellow-400 focus:ring-offset-gray-900 focus:ring-2 focus:ring-yellow-400/50 cursor-pointer"
                                />
                            </div>
                            <label
                                htmlFor="is_featured"
                                className="ml-3 text-xs sm:text-sm cursor-pointer block text-gray-300"
                            >
                                <span className="font-bold group-hover:text-yellow-400/90 transition-colors">
                                    Highlight to Featured Row
                                </span>
                                <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 font-medium leading-relaxed">
                                    Checking this ensures the active project
                                    asset is rendered explicitly inside the
                                    curated grids on the primary home screen
                                    routes.
                                </p>
                            </label>
                        </div>

                        {/* Form Action Controls Trigger Row */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-5 border-t border-gray-800">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex-1 order-1 sm:order-2 px-6 py-3.5 bg-yellow-400 text-gray-950 font-extrabold rounded-xl hover:bg-yellow-500 active:scale-[0.99] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-yellow-400/5 text-sm sm:text-base"
                            >
                                {processing
                                    ? "Processing Records..."
                                    : "Save Project Configuration"}
                            </button>
                            <Link
                                href={route("admin.projects.index")}
                                className="flex-1 order-2 sm:order-1 px-6 py-3.5 bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700 hover:border-gray-600 font-bold rounded-xl transition-all text-center text-sm sm:text-base"
                            >
                                Abort Changes
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
