import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";

interface Props {
    stats: {
        total_projects: number;
        unread_messages: number;
        total_skills: number;
        featured_projects: number;
    };
}

export default function Dashboard({ stats }: Props) {
    return (
        <AdminLayout>
            <Head title="Dashboard" />

            {/*
              Penyesuaian untuk Tampilan Mobile (Rapi & Profesional):
              - Menghapus padding horizontal berlebihan (`px-4`) di mobile agar konten mengambil lebar penuh.
              - Mengubah ukuran teks agar lebih proporsional di mobile.
            */}
            <div className="space-y-8 px-0 sm:px-6 py-6 sm:py-0">
                <div className="px-4 sm:px-0">
                    <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400 tracking-tight">
                        Dashboard
                    </h1>
                    <p className="text-gray-400 text-base sm:text-lg mt-2 sm:mt-3 max-w-2xl">
                        Overview of your portfolio management and quick actions.
                    </p>
                </div>

                {/* Stats Grid - Dioptimalkan untuk Mobile (bertumpuk/lebih luas) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 px-4 sm:px-0">
                    {/* Total Projects */}
                    <div className="bg-gray-800/90 rounded-xl p-6 sm:p-7 border border-gray-700/60 hover:border-yellow-400 transition-all duration-300 shadow-xl shadow-black/20 flex flex-col justify-between group">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-400 text-sm font-semibold tracking-wide uppercase">
                                    Total Projects
                                </p>
                                <p className="text-4xl sm:text-5xl font-extrabold text-white mt-2 sm:mt-3">
                                    {stats.total_projects}
                                </p>
                            </div>
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-yellow-400/10 rounded-xl flex items-center justify-center flex-shrink-0 ml-3">
                                <svg
                                    className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <Link
                            href={route("admin.projects.index")}
                            className="text-yellow-400 text-sm sm:text-base mt-5 inline-flex items-center hover:underline font-semibold group-hover:text-yellow-300"
                        >
                            View all projects{" "}
                            <span className="transform group-hover:translate-x-1.5 transition-transform ml-1.5">
                                →
                            </span>
                        </Link>
                    </div>

                    {/* Unread Messages */}
                    <div className="bg-gray-800/90 rounded-xl p-6 sm:p-7 border border-gray-700/60 hover:border-yellow-400 transition-all duration-300 shadow-xl shadow-black/20 flex flex-col justify-between group">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-400 text-sm font-semibold tracking-wide uppercase">
                                    Unread Messages
                                </p>
                                <p className="text-4xl sm:text-5xl font-extrabold text-white mt-2 sm:mt-3">
                                    {stats.unread_messages}
                                </p>
                            </div>
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-yellow-400/10 rounded-xl flex items-center justify-center flex-shrink-0 ml-3">
                                <svg
                                    className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <Link
                            href={route("admin.messages.index")}
                            className="text-yellow-400 text-sm sm:text-base mt-5 inline-flex items-center hover:underline font-semibold group-hover:text-yellow-300"
                        >
                            View inbox{" "}
                            <span className="transform group-hover:translate-x-1.5 transition-transform ml-1.5">
                                →
                            </span>
                        </Link>
                    </div>

                    {/* Total Skills */}
                    <div className="bg-gray-800/90 rounded-xl p-6 sm:p-7 border border-gray-700/60 hover:border-yellow-400 transition-all duration-300 shadow-xl shadow-black/20 flex flex-col justify-between group">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-400 text-sm font-semibold tracking-wide uppercase">
                                    Total Skills
                                </p>
                                <p className="text-4xl sm:text-5xl font-extrabold text-white mt-2 sm:mt-3">
                                    {stats.total_skills}
                                </p>
                            </div>
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-yellow-400/10 rounded-xl flex items-center justify-center flex-shrink-0 ml-3">
                                <svg
                                    className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <Link
                            href={route("admin.skills.index")}
                            className="text-yellow-400 text-sm sm:text-base mt-5 inline-flex items-center hover:underline font-semibold group-hover:text-yellow-300"
                        >
                            Manage skills{" "}
                            <span className="transform group-hover:translate-x-1.5 transition-transform ml-1.5">
                                →
                            </span>
                        </Link>
                    </div>

                    {/* Featured Projects */}
                    <div className="bg-gray-800/90 rounded-xl p-6 sm:p-7 border border-gray-700/60 hover:border-yellow-400 transition-all duration-300 shadow-xl shadow-black/20 flex flex-col justify-between group">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-400 text-sm font-semibold tracking-wide uppercase">
                                    Featured Projects
                                </p>
                                <p className="text-4xl sm:text-5xl font-extrabold text-white mt-2 sm:mt-3">
                                    {stats.featured_projects}
                                </p>
                            </div>
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-yellow-400/10 rounded-xl flex items-center justify-center flex-shrink-0 ml-3">
                                <svg
                                    className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <Link
                            href={route("admin.projects.index")}
                            className="text-yellow-400 text-sm sm:text-base mt-5 inline-flex items-center hover:underline font-semibold group-hover:text-yellow-300"
                        >
                            View featured{" "}
                            <span className="transform group-hover:translate-x-1.5 transition-transform ml-1.5">
                                →
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Quick Actions - Dioptimalkan untuk Mobile (full width) */}
                <div className="bg-gray-800/90 rounded-none sm:rounded-xl p-6 sm:p-7 border sm:border-gray-700/60 shadow-xl shadow-black/20">
                    <h2 className="text-xl sm:text-2xl font-semibold text-white mb-5">
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Link
                            href={route("admin.projects.create")}
                            className="w-full text-center px-6 py-4 sm:py-5 bg-yellow-400 text-gray-900 rounded-lg font-bold hover:bg-yellow-500 transition-colors text-base shadow-lg shadow-yellow-400/10 active:scale-[0.98]"
                        >
                            + Add New Project
                        </Link>
                        <Link
                            href={route("admin.skills.create")}
                            className="w-full text-center px-6 py-4 sm:py-5 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors text-base border border-gray-600/50"
                        >
                            + Add New Skill
                        </Link>
                        <Link
                            href={route("admin.messages.index")}
                            className="w-full text-center px-6 py-4 sm:py-5 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors text-base border border-gray-600/50"
                        >
                            View Messages
                        </Link>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
