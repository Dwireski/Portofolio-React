import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";

interface Skill {
    id: number;
    name: string;
    category: string;
    icon_path: string | null;
    created_at: string;
    updated_at: string;
}

interface Props {
    skills: {
        data: Skill[];
        current_page: number;
        last_page: number;
        from: number;
        to: number;
        total: number;
    };
}

export default function Index({ skills }: Props) {
    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this skill?")) {
            router.delete(route("admin.skills.destroy", id), {
                preserveScroll: true,
            });
        }
    };

    const getCategoryBadge = (category: string) => {
        if (category === "skillset") {
            return "bg-blue-500/10 text-blue-400 border-blue-500/20";
        }
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
    };

    const getCategoryLabel = (category: string) => {
        return category === "skillset" ? "Skillset" : "Toolset";
    };

    return (
        <AdminLayout>
            <Head title="Skills & Tools" />

            <div className="space-y-6 px-4 sm:px-0">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-800 pb-5">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-yellow-400 tracking-tight">
                            Skills & Tools
                        </h1>
                        <p className="text-gray-400 mt-1 text-xs sm:text-sm font-medium">
                            Manage your core technical expertise, frameworks,
                            and creative software proficiency
                        </p>
                    </div>
                    <Link
                        href={route("admin.skills.create")}
                        className="px-5 py-2.5 sm:py-3 bg-yellow-400 text-gray-950 rounded-lg font-bold hover:bg-yellow-500 transition-all duration-200 text-sm sm:text-base w-full sm:w-auto text-center shadow-md shadow-yellow-400/10 active:scale-[0.98]"
                    >
                        + Add New Skill
                    </Link>
                </div>

                {/* Desktop Table - Hidden on mobile */}
                <div className="hidden md:block bg-gray-855 rounded-xl border border-gray-800 overflow-hidden shadow-2xl shadow-black/40">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700/60">
                                <tr>
                                    <th className="w-16 px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                                        #
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                                        Skill / Tool Name
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                                        Category
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-400">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800 bg-gray-900/40">
                                {skills.data.map((skill, index) => (
                                    <tr
                                        key={skill.id}
                                        className="hover:bg-gray-800/40 transition-colors duration-150 group"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
                                            {skills.from + index}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 rounded-xl bg-gray-950 border border-gray-800 flex items-center justify-center overflow-hidden p-1.5 shadow-inner">
                                                    {skill.icon_path ? (
                                                        <img
                                                            src={
                                                                skill.icon_path.startsWith(
                                                                    "http",
                                                                )
                                                                    ? skill.icon_path
                                                                    : `/storage/${skill.icon_path}`
                                                            }
                                                            alt={skill.name}
                                                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-yellow-400 text-sm font-black uppercase">
                                                            {skill.name.charAt(
                                                                0,
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                                <span className="font-bold text-gray-100 group-hover:text-yellow-400 transition-colors text-base">
                                                    {skill.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide border ${getCategoryBadge(skill.category)}`}
                                            >
                                                {getCategoryLabel(
                                                    skill.category,
                                                )}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                            <Link
                                                href={route(
                                                    "admin.skills.edit",
                                                    skill.id,
                                                )}
                                                className="inline-flex items-center px-3 py-1.5 bg-gray-800 border border-gray-700 hover:border-blue-500 hover:text-blue-400 text-gray-300 rounded-md transition-all text-xs font-semibold"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(skill.id)
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
                    {skills.last_page > 1 && (
                        <div className="px-6 py-4 bg-gray-800/40 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <p className="text-xs sm:text-sm text-gray-400 font-medium">
                                Showing{" "}
                                <span className="text-gray-200">
                                    {skills.from}
                                </span>{" "}
                                to{" "}
                                <span className="text-gray-200">
                                    {skills.to}
                                </span>{" "}
                                of{" "}
                                <span className="text-gray-200">
                                    {skills.total}
                                </span>{" "}
                                results
                            </p>
                            <div className="flex items-center space-x-1">
                                {Array.from(
                                    { length: skills.last_page },
                                    (_, i) => i + 1,
                                ).map((page) => (
                                    <Link
                                        key={page}
                                        href={route("admin.skills.index", {
                                            page,
                                        })}
                                        className={`px-3.5 py-1.5 rounded-lg transition-all text-xs font-bold ${
                                            page === skills.current_page
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
                <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {skills.data.map((skill) => (
                        <div
                            key={skill.id}
                            className="bg-gray-800/90 rounded-xl border border-gray-700/60 p-4 flex flex-col justify-between shadow-xl shadow-black/20"
                        >
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center space-x-3 truncate">
                                    <div className="w-11 h-11 rounded-xl bg-gray-950 border border-gray-800 flex items-center justify-center p-2 flex-shrink-0 shadow-inner">
                                        {skill.icon_path ? (
                                            <img
                                                src={
                                                    skill.icon_path.startsWith(
                                                        "http",
                                                    )
                                                        ? skill.icon_path
                                                        : `/storage/${skill.icon_path}`
                                                }
                                                alt={skill.name}
                                                className="w-full h-full object-contain"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-yellow-400 text-xs font-black uppercase">
                                                {skill.name.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="truncate">
                                        <h3 className="font-bold text-gray-100 text-base tracking-tight truncate">
                                            {skill.name}
                                        </h3>
                                        <div className="mt-1">
                                            <span
                                                className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getCategoryBadge(skill.category)}`}
                                            >
                                                {getCategoryLabel(
                                                    skill.category,
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Integrated Small Action Buttons */}
                            <div className="flex gap-2 mt-4 pt-3 border-t border-gray-750">
                                <Link
                                    href={route("admin.skills.edit", skill.id)}
                                    className="flex-1 px-3 py-2 bg-gray-700/60 hover:bg-gray-700 text-gray-200 border border-gray-650 rounded-lg transition-colors text-center text-xs font-bold"
                                >
                                    Edit Details
                                </Link>
                                <button
                                    onClick={() => handleDelete(skill.id)}
                                    className="flex-1 px-3 py-2 bg-red-950/30 hover:bg-red-900/50 text-red-400 border border-red-900/40 rounded-lg transition-colors text-xs font-bold"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Mobile Pagination */}
                    {skills.last_page > 1 && (
                        <div className="flex flex-col items-center space-y-3 pt-3 col-span-full">
                            <p className="text-xs text-gray-400 font-medium">
                                Page{" "}
                                <span className="text-gray-200 font-bold">
                                    {skills.current_page}
                                </span>{" "}
                                of {skills.last_page}
                            </p>
                            <div className="flex space-x-2 w-full max-w-[280px]">
                                {skills.current_page > 1 ? (
                                    <Link
                                        href={route("admin.skills.index", {
                                            page: skills.current_page - 1,
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
                                {skills.current_page < skills.last_page ? (
                                    <Link
                                        href={route("admin.skills.index", {
                                            page: skills.current_page + 1,
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
                {skills.data.length === 0 && (
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
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                        </svg>
                        <p className="text-gray-400 mt-4 text-sm font-medium">
                            No computational skills or tools cataloged yet.
                        </p>
                        <Link
                            href={route("admin.skills.create")}
                            className="text-yellow-450 hover:text-yellow-400 text-xs font-bold mt-2 inline-block transition-colors underline underline-offset-4"
                        >
                            Add your first skill →
                        </Link>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
