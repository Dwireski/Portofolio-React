import { Link, usePage } from "@inertiajs/react";
import { ReactNode, useState } from "react";

interface Props {
    children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
    const { auth } = usePage().props as any;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
            {/* ========================================================== */}
            {/* MOBILE TOP NAVIGATION (Hanya muncul di layar HP / < 768px)  */}
            {/* ========================================================== */}
            <nav className="md:hidden bg-gray-800 border-b border-gray-700 sticky top-0 z-50 px-4 py-3">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-bold text-yellow-400 tracking-tight">
                            Admin Panel
                        </h1>
                    </div>

                    <div className="flex items-center space-x-3">
                        {/* Tombol Menu Hamburger */}
                        <button
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                            className="p-2 bg-gray-700/50 rounded-lg hover:bg-gray-700 text-yellow-400 focus:outline-none transition-colors"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {isMobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Dropdown Menu Mobile */}
                {isMobileMenuOpen && (
                    <div className="mt-3 py-2 space-y-1 border-t border-gray-700/60 animate-fadeIn">
                        <Link
                            href={route("dashboard")}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center px-4 py-2.5 rounded-lg hover:bg-gray-700/60 transition-colors text-sm font-medium"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href={route("admin.projects.index")}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center px-4 py-2.5 rounded-lg hover:bg-gray-700/60 transition-colors text-sm font-medium"
                        >
                            Projects
                        </Link>
                        <Link
                            href={route("admin.messages.index")}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center px-4 py-2.5 rounded-lg hover:bg-gray-700/60 transition-colors text-sm font-medium"
                        >
                            Messages
                        </Link>
                        <Link
                            href={route("admin.skills.index")}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center px-4 py-2.5 rounded-lg hover:bg-gray-700/60 transition-colors text-sm font-medium"
                        >
                            Skills
                        </Link>
                        <div className="pt-2 border-t border-gray-700/40 mt-2 flex justify-between items-center px-4">
                            <span className="text-xs text-gray-400 truncate max-w-[180px]">
                                Hi, {auth.user.name}
                            </span>
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="px-3 py-1 bg-red-600/90 hover:bg-red-700 text-xs font-semibold rounded-md transition-colors"
                            >
                                Logout
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* ========================================================== */}
            {/* DESKTOP SIDEBAR (Hanya muncul di layar PC / >= 768px)      */}
            {/* ========================================================== */}
            <aside className="hidden md:block fixed left-0 top-0 h-full w-64 bg-gray-800 border-r border-gray-700">
                <div className="p-6 border-b border-gray-700">
                    <h1 className="text-2xl font-bold text-yellow-400">
                        Admin Panel
                    </h1>
                    <p className="text-sm text-gray-400 mt-1">
                        Portfolio Management
                    </p>
                </div>

                <nav className="p-4 space-y-2">
                    <Link
                        href={route("dashboard")}
                        className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        <span>Dashboard</span>
                    </Link>

                    <Link
                        href={route("admin.projects.index")}
                        className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        <span>Projects</span>
                    </Link>

                    <Link
                        href={route("admin.messages.index")}
                        className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        <span>Messages</span>
                    </Link>

                    <Link
                        href={route("admin.skills.index")}
                        className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        <span>Skills</span>
                    </Link>
                </nav>
            </aside>

            {/* ========================================================== */}
            {/* MAIN CONTENT CONTAINER (Lebar penuh di mobile, berjarak di PC) */}
            {/* ========================================================== */}
            <div className="ml-0 md:ml-64 transition-all duration-300">
                {/* Header Utama Desktop */}
                <header className="hidden md:block bg-gray-800 border-b border-gray-700 px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-semibold">
                                Welcome back, {auth.user.name}
                            </h2>
                        </div>

                        <div className="flex items-center space-x-4">
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                            >
                                Logout
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Info Ringkas Khusus Mobile di Dalam Halaman Konten */}
                <div className="md:hidden bg-gray-800/40 border-b border-gray-800 px-4 py-3 flex justify-between items-center text-xs text-gray-400">
                    <span>
                        Logged in as:{" "}
                        <strong className="text-gray-200">
                            {auth.user.name}
                        </strong>
                    </span>
                </div>

                {/* Page Content */}
                <main className="p-4 sm:p-6 max-w-7xl mx-auto w-full">
                    {children}
                </main>
            </div>
        </div>
    );
}
