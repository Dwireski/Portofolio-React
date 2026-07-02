import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Project } from "@/types";

interface Props {
    projects: {
        data: Project[];
        current_page: number;
        last_page: number;
        from: number;
        to: number;
        total: number;
    };
}

export default function Index({ projects }: Props) {
    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this project?")) {
            router.delete(route("admin.projects.destroy", id), {
                preserveScroll: true,
            });
        }
    };

    const getCategoryLabel = (category: string) => {
        const labels: Record<string, string> = {
            video_production: "Video Production",
            video_editing: "Video Editing",
            graphic_design: "Graphic Design",
            photography: "Photography",
        };
        return labels[category] || category;
    };

    const getImageUrl = (path: string) => {
        return path.startsWith("http") ? path : `/storage/${path}`;
    };

    return (
        <AdminLayout>
            <Head title="Projects" />

            <div className="space-y-6 px-4 sm:px-0">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-800 pb-5">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-yellow-400 tracking-tight">
                            Projects
                        </h1>
                        <p className="text-gray-400 mt-1 text-xs sm:text-sm font-medium">
                            Manage, organize and feature your best portfolio
                            creations
                        </p>
                    </div>
                    <Link
                        href={route("admin.projects.create")}
                        className="px-5 py-2.5 sm:py-3 bg-yellow-400 text-gray-950 rounded-lg font-bold hover:bg-yellow-500 transition-all duration-200 text-sm sm:text-base w-full sm:w-auto text-center shadow-md shadow-yellow-400/10 active:scale-[0.98]"
                    >
                        + Add New Project
                    </Link>
                </div>

                {/* Desktop Table - Hidden on mobile */}
                <div className="hidden md:block bg-gray-850 rounded-xl border border-gray-800 overflow-hidden shadow-2xl shadow-black/40">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700/60">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                                        Thumbnail
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                                        Title
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                                        Category
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                                        Year
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                                        Featured
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-400">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800 bg-gray-900/40">
                                {projects.data.map((project) => (
                                    <tr
                                        key={project.id}
                                        className="hover:bg-gray-800/40 transition-colors duration-150 group"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="relative overflow-hidden rounded-lg border border-gray-700/50 w-24 h-14 shadow-inner">
                                                <img
                                                    src={getImageUrl(
                                                        project.thumbnail_path,
                                                    )}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    onError={(e) => {
                                                        (
                                                            e.target as HTMLImageElement
                                                        ).src =
                                                            "https://via.placeholder.com/800x450.png?text=No+Image";
                                                    }}
                                                />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="max-w-xs sm:max-w-sm lg:max-w-md">
                                                <p className="font-bold text-gray-100 group-hover:text-yellow-400 transition-colors text-base truncate">
                                                    {project.title}
                                                </p>
                                                <p className="text-xs text-gray-400 truncate mt-0.5 font-normal">
                                                    {project.description ||
                                                        "No description provided."}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2.5 py-1 bg-yellow-400/10 text-yellow-400 rounded-md text-xs font-semibold tracking-wide uppercase">
                                                {getCategoryLabel(
                                                    project.category,
                                                )}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                                            {project.year || "—"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {project.is_featured ? (
                                                <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-md text-xs font-bold uppercase tracking-wide">
                                                    Yes
                                                </span>
                                            ) : (
                                                <span className="px-2.5 py-1 bg-gray-800 text-gray-500 rounded-md text-xs font-medium uppercase tracking-wide">
                                                    No
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                            <Link
                                                href={route(
                                                    "admin.projects.edit",
                                                    project.id,
                                                )}
                                                className="inline-flex items-center px-3 py-1.5 bg-gray-800 border border-gray-700 hover:border-blue-500 hover:text-blue-400 text-gray-300 rounded-md transition-all text-xs font-semibold"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(project.id)
                                                }
                                                className="inline-flex items-center px-3 py-1.5 bg-gray-800 border border-gray-700 hover:border-red-500 hover:text-red-400 text-gray-300 rounded-md transition-all text-xs font-semibold"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Desktop Pagination */}
                    {projects.last_page > 1 && (
                        <div className="px-6 py-4 bg-gray-800/40 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <p className="text-xs sm:text-sm text-gray-400 font-medium">
                                Showing{" "}
                                <span className="text-gray-200">
                                    {projects.from}
                                </span>{" "}
                                to{" "}
                                <span className="text-gray-200">
                                    {projects.to}
                                </span>{" "}
                                of{" "}
                                <span className="text-gray-200">
                                    {projects.total}
                                </span>{" "}
                                results
                            </p>
                            <div className="flex items-center space-x-1">
                                {Array.from(
                                    { length: projects.last_page },
                                    (_, i) => i + 1,
                                ).map((page) => (
                                    <Link
                                        key={page}
                                        href={route("admin.projects.index", {
                                            page,
                                        })}
                                        className={`px-3.5 py-1.5 rounded-lg transition-all text-xs font-bold ${
                                            page === projects.current_page
                                                ? "bg-yellow-400 text-gray-950 shadow-md shadow-yellow-400/10"
                                                : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200"
                                        }`}
                                    >
                                        {page}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Mobile Card View - Only visible on mobile */}
                <div className="md:hidden space-y-5">
                    {projects.data.map((project) => (
                        <div
                            key={project.id}
                            className="bg-gray-800/90 rounded-xl border border-gray-700/60 overflow-hidden shadow-xl shadow-black/30 flex flex-col"
                        >
                            {/* Thumbnail Container */}
                            <div className="relative w-full h-44 bg-gray-950 overflow-hidden">
                                <img
                                    src={getImageUrl(project.thumbnail_path)}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src =
                                            "https://via.placeholder.com/800x450.png?text=No+Image";
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />

                                {/* Absolute Floating Badges */}
                                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                                    <span className="px-2.5 py-1 bg-gray-950/80 backdrop-blur-md text-yellow-400 rounded-md text-[10px] font-bold uppercase tracking-wider border border-yellow-400/20">
                                        {getCategoryLabel(project.category)}
                                    </span>
                                    {project.is_featured && (
                                        <span className="px-2.5 py-1 bg-emerald-950/90 backdrop-blur-md text-emerald-400 rounded-md text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
                                            Featured
                                        </span>
                                    )}
                                </div>
                                {project.year && (
                                    <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-gray-900/80 backdrop-blur-sm rounded text-xs font-semibold text-gray-300">
                                        {project.year}
                                    </div>
                                )}
                            </div>

                            {/* Content Block */}
                            <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                                <div className="space-y-1.5">
                                    <h3 className="font-bold text-gray-100 text-base leading-snug tracking-tight">
                                        {project.title}
                                    </h3>
                                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                                        {project.description ||
                                            "No description available for this project."}
                                    </p>
                                </div>

                                {/* Integrated Subtle Action Buttons */}
                                <div className="flex gap-2 pt-3 border-t border-gray-750">
                                    <Link
                                        href={route(
                                            "admin.projects.edit",
                                            project.id,
                                        )}
                                        className="flex-1 px-4 py-2 bg-gray-700/60 hover:bg-gray-700 text-gray-200 border border-gray-650 rounded-lg transition-colors text-center text-xs font-bold"
                                    >
                                        Edit Details
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(project.id)}
                                        className="flex-1 px-4 py-2 bg-red-950/30 hover:bg-red-900/50 text-red-400 border border-red-900/40 rounded-lg transition-colors text-xs font-bold"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Mobile Pagination */}
                    {projects.last_page > 1 && (
                        <div className="flex flex-col items-center space-y-3 pt-2">
                            <p className="text-xs text-gray-400 font-medium">
                                Page{" "}
                                <span className="text-gray-200 font-bold">
                                    {projects.current_page}
                                </span>{" "}
                                of {projects.last_page}
                            </p>
                            <div className="flex space-x-2 w-full max-w-[280px]">
                                {projects.current_page > 1 ? (
                                    <Link
                                        href={route("admin.projects.index", {
                                            page: projects.current_page - 1,
                                        })}
                                        className="flex-1 text-center px-4 py-2 bg-gray-800 text-gray-300 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors text-xs font-bold"
                                    >
                                        Previous
                                    </Link>
                                ) : (
                                    <div className="flex-1 text-center px-4 py-2 bg-gray-800/40 text-gray-600 border border-gray-800 rounded-lg text-xs font-bold cursor-not-allowed select-none">
                                        Previous
                                    </div>
                                )}
                                {projects.current_page < projects.last_page ? (
                                    <Link
                                        href={route("admin.projects.index", {
                                            page: projects.current_page + 1,
                                        })}
                                        className="flex-1 text-center px-4 py-2 bg-yellow-400 text-gray-950 rounded-lg hover:bg-yellow-500 transition-colors text-xs font-bold shadow-md shadow-yellow-400/5"
                                    >
                                        Next
                                    </Link>
                                ) : (
                                    <div className="flex-1 text-center px-4 py-2 bg-gray-800/40 text-gray-600 border border-gray-800 rounded-lg text-xs font-bold cursor-not-allowed select-none">
                                        Next
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Empty State */}
                {projects.data.length === 0 && (
                    <div className="text-center py-16 bg-gray-850 rounded-xl border border-gray-800 shadow-inner">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                        </svg>
                        <p className="text-gray-400 mt-4 text-sm font-medium">
                            No dashboard projects found active.
                        </p>
                        <Link
                            href={route("admin.projects.create")}
                            className="text-yellow-450 hover:text-yellow-400 text-xs font-bold mt-2 inline-block transition-colors underline underline-offset-4"
                        >
                            Create your first project →
                        </Link>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
