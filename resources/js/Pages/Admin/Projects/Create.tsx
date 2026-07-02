import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEvent, useState } from "react";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        description: "",
        category: "video_production",
        video_url: "",
        thumbnail: null as File | null,
        year: "",
        is_featured: false,
    });

    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
        null,
    );

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

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route("admin.projects.store"), {
            preserveScroll: true,
            onSuccess: () => {
                // Reset form after success
                setData({
                    title: "",
                    description: "",
                    category: "video_production",
                    video_url: "",
                    thumbnail: null,
                    year: "",
                    is_featured: false,
                });
                setThumbnailPreview(null);
            },
        });
    };

    return (
        <AdminLayout>
            <Head title="Create Project" />

            <div className="space-y-6 px-4 sm:px-0 max-w-4xl mx-auto py-4">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-800 pb-5">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-yellow-400 tracking-tight">
                            Create New Project
                        </h1>
                        <p className="text-gray-400 mt-1 text-xs sm:text-sm font-medium">
                            Publish and introduce a brand new creative project
                            to your live portfolio grid display.
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
                <div className="bg-gray-850 rounded-2xl border border-gray-800 shadow-2xl shadow-black/50 p-5 sm:p-8">
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
                                placeholder="e.g., Cinematic Short Film Concept"
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
                                placeholder="Detail the background, context, client, and comprehensive overview of this creation asset..."
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
                                Thumbnail Frame Image{" "}
                                <span className="text-red-400">*</span>
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                                {/* Preview Window */}
                                {thumbnailPreview ? (
                                    <div className="relative w-full aspect-video bg-gray-950 border border-gray-800 rounded-xl overflow-hidden group shadow-md shadow-black/40">
                                        <img
                                            src={thumbnailPreview}
                                            alt="Thumbnail preview"
                                            className="w-full h-full object-cover animate-fadeIn"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setData("thumbnail", null);
                                                    setThumbnailPreview(null);
                                                }}
                                                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors shadow-lg"
                                            >
                                                Discard Image
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full aspect-video bg-gray-900/30 border border-gray-800 rounded-xl flex items-center justify-center text-center p-4">
                                        <p className="text-xs text-gray-500 font-medium italic">
                                            No framework image chosen yet. Frame
                                            slot is currently blank.
                                        </p>
                                    </div>
                                )}

                                {/* Interactive Slot Box */}
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
                                            to drop file cover
                                        </p>
                                        <p className="text-[10px] sm:text-xs text-gray-500 mt-1 max-w-[200px]">
                                            Supports standard image extensions.
                                            Limit size under 2MB.
                                        </p>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleThumbnailChange}
                                        className="hidden"
                                        required={!thumbnailPreview}
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
                                    ? "Creating Portfolio..."
                                    : "Publish Project Build"}
                            </button>
                            <Link
                                href={route("admin.projects.index")}
                                className="flex-1 order-2 sm:order-1 px-6 py-3.5 bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700 hover:border-gray-600 font-bold rounded-xl transition-all text-center text-sm sm:text-base"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
