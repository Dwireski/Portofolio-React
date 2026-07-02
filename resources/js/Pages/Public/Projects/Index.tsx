import { Head, Link, router } from "@inertiajs/react";
import { FormEvent, useState, useEffect, useRef, ReactNode } from "react";

interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    category: string;
    video_url: string | null;
    thumbnail_path: string;
    is_featured: boolean;
    year: number | null;
}

interface Category {
    value: string;
    label: string;
}

interface Props {
    projects: {
        data: Project[];
        current_page: number;
        last_page: number;
        from: number;
        to: number;
        total: number;
    };
    filters: {
        search: string;
        category: string;
    };
    categories: Category[];
    auth?: {
        user: any;
    };
}

// Komponen Wrapper untuk animasi muncul saat di-scroll (Scroll Animation)
function FadeIn({
    children,
    delay = "",
}: {
    children: ReactNode;
    delay?: string;
}) {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            });
        });

        if (domRef.current) {
            observer.observe(domRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={domRef}
            className={`transition-all duration-1000 ease-out transform ${
                isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
            } ${delay}`}
        >
            {children}
        </div>
    );
}

export default function Index({ projects, filters, categories, auth }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search);
    const [activeCategory, setActiveCategory] = useState(filters.category);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        router.get(
            route("public.projects.index"),
            {
                search: searchTerm,
                category: activeCategory,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleCategoryFilter = (category: string) => {
        setActiveCategory(category);
        router.get(
            route("public.projects.index"),
            {
                search: searchTerm,
                category: category,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const getImageUrl = (path: string) => {
        return path.startsWith("http") ? path : `/storage/${path}`;
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

    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            video_production:
                "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
            video_editing: "bg-blue-400/10 text-blue-400 border-blue-400/20",
            graphic_design:
                "bg-purple-400/10 text-purple-400 border-purple-400/20",
            photography: "bg-green-400/10 text-green-400 border-green-400/20",
        };
        return (
            colors[category] ||
            "bg-gray-400/10 text-gray-400 border-gray-400/20"
        );
    };

    // Fungsi navigasi pintar lintas halaman/route berbeda
    const handleSmoothScroll = (e: React.MouseEvent<any>, targetId: string) => {
        if (targetId === "home") {
            e.preventDefault();
            router.get("/");
            return;
        }
    };

    return (
        <>
            <Head title="All Projects - Portfolio Showcase" />
            <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-yellow-400 selection:text-gray-900 overflow-x-hidden">
                {/* Navigation Menu */}
                <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-900/60 transition-all duration-300">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-20">
                            <div className="flex-shrink-0">
                                <Link
                                    href="/"
                                    className="text-2xl font-black text-yellow-400 tracking-tighter uppercase group cursor-pointer"
                                >
                                    Reski
                                    <span className="text-white group-hover:text-yellow-400 transition-colors">
                                        .
                                    </span>
                                </Link>
                            </div>

                            {/* Desktop Nav Links - PERBAIKAN: Menggunakan absolut route Link untuk Skills */}
                            <div className="hidden md:flex items-center space-x-10 font-semibold text-sm tracking-wide">
                                <Link
                                    href="/"
                                    onClick={(e) =>
                                        handleSmoothScroll(e, "home")
                                    }
                                    className="text-gray-300 hover:text-yellow-400 transition-colors"
                                >
                                    Home
                                </Link>
                                <Link
                                    href={route("public.projects.index")}
                                    className="text-yellow-400 font-bold"
                                >
                                    Projects
                                </Link>
                                <Link
                                    href={route("public.skills.index")}
                                    className="text-gray-300 hover:text-yellow-400 transition-colors"
                                >
                                    Skills
                                </Link>
                                <Link
                                    href={route("public.contact.index")}
                                    className="text-gray-300 hover:text-yellow-400 transition-colors"
                                >
                                    Contact
                                </Link>
                            </div>

                            {/* Sisi Kanan Penyeimbang Struktur Flexbox Layout */}
                            <div className="hidden md:block">
                                {auth?.user ? (
                                    <Link
                                        href={route("dashboard")}
                                        className="px-5 py-2.5 bg-yellow-400 text-gray-950 rounded-xl font-bold hover:bg-yellow-500 transition-all shadow-lg shadow-yellow-400/10 hover:shadow-yellow-400/20 active:scale-95"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        href={route("login")}
                                        className="px-5 py-2.5 bg-gray-900 border border-gray-800 text-gray-200 rounded-xl font-bold hover:bg-gray-800 transition-all hover:border-gray-700"
                                    >
                                        Login
                                    </Link>
                                )}
                            </div>

                            <div className="md:hidden flex items-center">
                                <button
                                    onClick={() =>
                                        setIsMobileMenuOpen(!isMobileMenuOpen)
                                    }
                                    className="p-2 text-gray-400 hover:text-yellow-400 focus:outline-none transition-colors"
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
                    </div>

                    {/* Responsive Mobile Drawer Menu Dropdown - PERBAIKAN: Menggunakan absolut route Link untuk Skills */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden bg-gray-950 border-b border-gray-900 px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
                            <Link
                                href="/"
                                onClick={(e) => {
                                    handleSmoothScroll(e, "home");
                                    setIsMobileMenuOpen(false);
                                }}
                                className="block px-4 py-3 rounded-xl hover:bg-gray-900 text-base font-semibold text-gray-300 hover:text-yellow-400"
                            >
                                Home
                            </Link>
                            <Link
                                href={route("public.projects.index")}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-4 py-3 rounded-xl bg-gray-900 text-base font-semibold text-yellow-400"
                            >
                                Projects
                            </Link>
                            <Link
                                href={route("public.skills.index")}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-4 py-3 rounded-xl hover:bg-gray-900 text-base font-semibold text-gray-300 hover:text-yellow-400"
                            >
                                Skills
                            </Link>
                            <Link
                                href={route("public.contact.index")}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-4 py-3 rounded-xl hover:bg-gray-900 text-base font-semibold text-gray-300 hover:text-yellow-400"
                            >
                                Contact
                            </Link>
                        </div>
                    )}
                </nav>

                {/* Header Section */}
                <section className="pt-40 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-yellow-400/[0.03] blur-[100px] rounded-full pointer-events-none" />

                    <div className="max-w-7xl mx-auto border-b border-gray-900/60 pb-10">
                        <FadeIn>
                            <div className="mb-10">
                                <p className="text-yellow-400 text-xs sm:text-sm font-bold uppercase tracking-widest mb-2">
                                    Showcase Gallery
                                </p>
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
                                    All Projects
                                </h1>
                                <p className="text-gray-400 text-sm sm:text-lg max-w-2xl mt-3 font-medium leading-relaxed">
                                    A curated collection of videos, films,
                                    visual design blueprints, and creative
                                    digital assets spanning years of production.
                                </p>
                            </div>
                        </FadeIn>

                        {/* Search and Filter Row controls with smooth wrapper */}
                        <FadeIn delay="delay-[150ms]">
                            <div className="flex flex-col lg:flex-row gap-5 items-stretch lg:items-center justify-between">
                                {/* Search Bar */}
                                <form
                                    onSubmit={handleSearch}
                                    className="w-full lg:w-auto flex-1 max-w-xl"
                                >
                                    <div className="relative group">
                                        <svg
                                            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-yellow-400 transition-colors"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2.5}
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            />
                                        </svg>
                                        <input
                                            type="text"
                                            value={searchTerm}
                                            onChange={(e) =>
                                                setSearchTerm(e.target.value)
                                            }
                                            placeholder="Search creative works..."
                                            className="w-full pl-12 pr-4 py-3.5 bg-gray-900/90 border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 focus:border-yellow-400 text-sm sm:text-base transition-all shadow-inner"
                                        />
                                    </div>
                                </form>

                                {/* Category Filters Slider */}
                                <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
                                    <button
                                        onClick={() =>
                                            handleCategoryFilter("all")
                                        }
                                        className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all ${
                                            activeCategory === "all" ||
                                            !activeCategory
                                                ? "bg-yellow-400 text-gray-950 shadow-md shadow-yellow-400/10"
                                                : "bg-gray-900 text-gray-400 border border-gray-855 hover:bg-gray-800 hover:text-gray-200"
                                        }`}
                                    >
                                        All Categories
                                    </button>
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.value}
                                            onClick={() =>
                                                handleCategoryFilter(cat.value)
                                            }
                                            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all ${
                                                activeCategory === cat.value
                                                    ? "bg-yellow-400 text-gray-950 shadow-md shadow-yellow-400/10"
                                                    : "bg-gray-900 text-gray-400 border border-gray-855 hover:bg-gray-800 hover:text-gray-200"
                                            }`}
                                        >
                                            {cat.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* Projects Core Grid Block */}
                <section className="pb-28 px-4 sm:px-6 lg:px-8 relative">
                    <div className="max-w-7xl mx-auto">
                        {projects.data.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {projects.data.map((project, index) => (
                                        <FadeIn
                                            key={project.id}
                                            delay={
                                                index % 3 === 1
                                                    ? "delay-[100ms]"
                                                    : index % 3 === 2
                                                      ? "delay-[200ms]"
                                                      : ""
                                            }
                                        >
                                            <Link
                                                href={route(
                                                    "public.projects.show",
                                                    project.slug,
                                                )}
                                                className="group block bg-gray-900/60 rounded-2xl overflow-hidden border border-gray-855 hover:border-yellow-400/40 transition-all duration-300 shadow-xl hover:shadow-black/50 h-full flex flex-col justify-between"
                                            >
                                                {/* Thumbnail Image Container */}
                                                <div className="relative aspect-video overflow-hidden bg-gray-950">
                                                    <img
                                                        src={getImageUrl(
                                                            project.thumbnail_path,
                                                        )}
                                                        alt={project.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                        onError={(e) => {
                                                            (
                                                                e.target as HTMLImageElement
                                                            ).src =
                                                                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="450"%3E%3Crect fill="%23111827" width="800" height="450"/%3E%3Ctext fill="%234B5563" font-family="Arial" font-size="24" text-anchor="middle" x="400" y="225"%3ENo Thumbnail Frame%3C/text%3E%3C/svg%3E';
                                                        }}
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-85 group-hover:opacity-60 transition-opacity" />
                                                </div>

                                                {/* Card Informative Frame Section */}
                                                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                                                    <div className="space-y-2.5">
                                                        <div className="flex items-center justify-between gap-2">
                                                            <span
                                                                className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider border ${getCategoryColor(
                                                                    project.category,
                                                                )}`}
                                                            >
                                                                {getCategoryLabel(
                                                                    project.category,
                                                                )}
                                                            </span>
                                                            {project.year && (
                                                                <span className="text-xs font-bold text-gray-500">
                                                                    {
                                                                        project.year
                                                                    }
                                                                </span>
                                                            )}
                                                        </div>
                                                        <h3 className="text-xl font-extrabold text-white group-hover:text-yellow-400 transition-colors duration-200 line-clamp-1">
                                                            {project.title}
                                                        </h3>
                                                        <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 leading-relaxed font-medium">
                                                            {project.description ||
                                                                "No description overview provided for this build record."}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </FadeIn>
                                    ))}
                                </div>

                                {/* Custom Smooth Pagination Controls Row */}
                                {projects.last_page > 1 && (
                                    <FadeIn>
                                        <div className="mt-16 flex justify-center border-t border-gray-900/60 pt-8">
                                            <div className="flex items-center space-x-1 bg-gray-900/50 p-1 rounded-xl border border-gray-855">
                                                {Array.from(
                                                    {
                                                        length: projects.last_page,
                                                    },
                                                    (_, i) => i + 1,
                                                ).map((page) => (
                                                    <Link
                                                        key={page}
                                                        href={route(
                                                            "public.projects.index",
                                                            {
                                                                page,
                                                                search: searchTerm,
                                                                category:
                                                                    activeCategory,
                                                            },
                                                        )}
                                                        className={`px-4 py-2 rounded-lg transition-all text-xs font-extrabold ${
                                                            page ===
                                                            projects.current_page
                                                                ? "bg-yellow-400 text-gray-950 shadow-md shadow-yellow-400/5"
                                                                : "bg-transparent text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                                                        }`}
                                                    >
                                                        {page}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </FadeIn>
                                )}
                            </>
                        ) : (
                            /* Empty Response States Block */
                            <FadeIn>
                                <div className="text-center py-24 bg-gray-900/20 rounded-2xl border border-gray-900/60 shadow-inner max-w-xl mx-auto">
                                    <svg
                                        className="w-14 h-14 mx-auto text-gray-600 mb-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <h3 className="text-lg font-bold text-gray-200 mb-1">
                                        No projects found
                                    </h3>
                                    <p className="text-gray-500 text-xs sm:text-sm max-w-xs mx-auto px-4">
                                        Try adjusting your text search metric or
                                        category selection matrix filter
                                        parameters.
                                    </p>
                                </div>
                            </FadeIn>
                        )}
                    </div>
                </section>

                {/* Footer Component Block Layout */}
                <footer className="py-10 px-4 sm:px-6 lg:px-8 border-t border-gray-900/60 bg-gray-950/40">
                    <div className="max-w-7xl mx-auto text-center">
                        <p className="text-gray-500 text-xs sm:text-sm font-medium">
                            © 2026 Reski. All rights reserved. Built with
                            Laravel & Inertia React.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
