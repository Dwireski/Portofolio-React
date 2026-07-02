import { Head, Link } from "@inertiajs/react";
import { useState, useEffect, useRef, ReactNode } from "react";

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

interface Props {
    project: Project;
    relatedProjects: Project[];
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

export default function Show({ project, relatedProjects, auth }: Props) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

    const getVideoEmbedUrl = (url: string | null) => {
        if (!url) return null;

        const youtubeWatchRegex =
            /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/;
        const match = url.match(youtubeWatchRegex);

        if (match) {
            return `https://www.youtube.com/embed/${match[1]}`;
        }

        return url;
    };

    const embedUrl = getVideoEmbedUrl(project.video_url);

    return (
        <>
            <Head title={`${project.title} - Project Case Study`} />
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

                            <div className="hidden md:flex items-center space-x-10 font-semibold text-sm tracking-wide">
                                <Link
                                    href="/"
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

                    {isMobileMenuOpen && (
                        <div className="md:hidden bg-gray-950 border-b border-gray-900 px-4 pt-2 pb-6 space-y-2">
                            <Link
                                href="/"
                                className="block px-4 py-3 rounded-xl hover:bg-gray-900 text-base font-semibold text-gray-300 hover:text-yellow-400"
                            >
                                Home
                            </Link>
                            <Link
                                href={route("public.projects.index")}
                                className="block px-4 py-3 rounded-xl bg-gray-900 text-base font-semibold text-yellow-400"
                            >
                                Projects
                            </Link>
                            <Link
                                href={route("public.skills.index")}
                                className="block px-4 py-3 rounded-xl hover:bg-gray-900 text-base font-semibold text-gray-300 hover:text-yellow-400"
                            >
                                Skills
                            </Link>
                            <Link
                                href={route("public.contact.index")}
                                className="block px-4 py-3 rounded-xl hover:bg-gray-900 text-base font-semibold text-gray-300 hover:text-yellow-400"
                            >
                                Contact
                            </Link>
                        </div>
                    )}
                </nav>

                {/* Project Header Wrapper Section */}
                <section className="pt-40 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                    <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-yellow-400/[0.03] blur-[120px] rounded-full pointer-events-none" />

                    <div className="max-w-7xl mx-auto">
                        <FadeIn>
                            <Link
                                href={route("public.projects.index")}
                                className="inline-flex items-center text-gray-400 hover:text-yellow-400 transition-colors mb-8 text-xs sm:text-sm font-bold uppercase tracking-wider group"
                            >
                                <svg
                                    className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.5}
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                                Back to Gallery Archive
                            </Link>

                            <div className="space-y-4 max-w-4xl">
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`px-3 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider border ${getCategoryColor(project.category)}`}
                                    >
                                        {getCategoryLabel(project.category)}
                                    </span>
                                    {project.year && (
                                        <span className="text-xs sm:text-sm text-gray-500 font-bold">
                                            Production Year: {project.year}
                                        </span>
                                    )}
                                </div>
                                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
                                    {project.title}
                                </h1>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* Video Stream Screen Frame Slot */}
                <section className="pb-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <FadeIn delay="delay-[150ms]">
                            {embedUrl ? (
                                <div className="relative aspect-video bg-gray-950 rounded-2xl overflow-hidden shadow-2xl shadow-black/80 border border-gray-900">
                                    <iframe
                                        src={embedUrl}
                                        title={project.title}
                                        className="absolute inset-0 w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            ) : (
                                <div className="relative aspect-video bg-gray-950 rounded-2xl overflow-hidden shadow-2xl shadow-black/80 border border-gray-900 group">
                                    <img
                                        src={getImageUrl(
                                            project.thumbnail_path,
                                        )}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src =
                                                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="450"%3E%3Crect fill="%23111827" width="800" height="450"/%3E%3Ctext fill="%234B5563" font-family="Arial" font-size="24" text-anchor="middle" x="400" y="225"%3ENo Production Media Frame%3C/text%3E%3C/svg%3E';
                                        }}
                                    />
                                </div>
                            )}
                        </FadeIn>
                    </div>
                </section>

                {/* Case Study Meta Layout Blocks */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/30 border-y border-gray-900/60">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                            {/* Detailed Description Panel */}
                            <div className="lg:col-span-2 space-y-4">
                                <FadeIn>
                                    <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                                        Project Strategy Overview
                                    </h2>
                                    <div className="h-1 w-10 bg-yellow-400 rounded-full mt-2 mb-6" />
                                    <div className="prose prose-invert max-w-none">
                                        <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-medium whitespace-pre-line">
                                            {project.description ||
                                                "No overview narrative log registered for this record asset study."}
                                        </p>
                                    </div>
                                </FadeIn>
                            </div>

                            {/* Sticky Technical Specification Ledger Block */}
                            <div className="space-y-6 lg:sticky lg:top-28">
                                <FadeIn delay="delay-[100ms]">
                                    <div className="bg-gray-900/90 rounded-2xl border border-gray-855 p-6 sm:p-8 space-y-6 shadow-xl shadow-black/30 backdrop-blur-md">
                                        <h3 className="text-lg font-extrabold text-white tracking-tight border-b border-gray-800 pb-3">
                                            Metrik Meta Details
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                                                    Classification
                                                </span>
                                                <span className="text-sm font-bold text-gray-200 mt-0.5">
                                                    {getCategoryLabel(
                                                        project.category,
                                                    )}
                                                </span>
                                            </div>
                                            {project.year && (
                                                <div className="flex flex-col pt-1">
                                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                                                        Release Matrix
                                                    </span>
                                                    <span className="text-sm font-bold text-gray-200 mt-0.5">
                                                        {project.year}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="flex flex-col pt-1">
                                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                                                    Record Status
                                                </span>
                                                <span className="text-sm font-bold text-gray-200 mt-0.5">
                                                    {project.is_featured ? (
                                                        <span className="text-yellow-400 font-extrabold flex items-center gap-1.5">
                                                            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping"></span>{" "}
                                                            Featured Highlight
                                                        </span>
                                                    ) : (
                                                        "Completed / Published"
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </FadeIn>

                                <FadeIn delay="delay-[200ms]">
                                    <Link
                                        href={route("public.projects.index")}
                                        className="block w-full px-6 py-4 bg-gray-900 hover:bg-gray-850 border border-gray-850 hover:border-gray-700 text-gray-200 rounded-xl font-bold transition-all text-center text-sm shadow-md"
                                    >
                                        Browse Complete Archive
                                    </Link>
                                </FadeIn>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Group Records Segment */}
                {relatedProjects.length > 0 && (
                    <section className="py-24 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-7xl mx-auto">
                            <FadeIn>
                                <div className="mb-12">
                                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                                        Related{" "}
                                        <span className="text-yellow-400">
                                            Productions
                                        </span>
                                    </h2>
                                    <p className="text-gray-400 text-xs sm:text-sm font-medium mt-1">
                                        Explore additional active media files
                                        produced within this creative category
                                        index.
                                    </p>
                                </div>
                            </FadeIn>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {relatedProjects.map(
                                    (relatedProject, index) => (
                                        <FadeIn
                                            key={relatedProject.id}
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
                                                    relatedProject.slug,
                                                )}
                                                className="group block bg-gray-900/60 rounded-2xl overflow-hidden border border-gray-855 hover:border-yellow-400/40 transition-all duration-300 shadow-xl hover:shadow-black/50 h-full flex flex-col justify-between"
                                            >
                                                <div className="relative aspect-video overflow-hidden bg-gray-950">
                                                    <img
                                                        src={getImageUrl(
                                                            relatedProject.thumbnail_path,
                                                        )}
                                                        alt={
                                                            relatedProject.title
                                                        }
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                        onError={(e) => {
                                                            (
                                                                e.target as HTMLImageElement
                                                            ).src =
                                                                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="450"%3E%3Crect fill="%23111827" width="800" height="450"/%3E%3Ctext fill="%234B5563" font-family="Arial" font-size="24" text-anchor="middle" x="400" y="225"%3ENo Media View%3C/text%3E%3C/svg%3E';
                                                        }}
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-85 group-hover:opacity-60 transition-opacity" />
                                                </div>

                                                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                                                    <div className="space-y-2">
                                                        <div className="flex items-center justify-between gap-2">
                                                            <span
                                                                className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider border ${getCategoryColor(relatedProject.category)}`}
                                                            >
                                                                {getCategoryLabel(
                                                                    relatedProject.category,
                                                                )}
                                                            </span>
                                                            {relatedProject.year && (
                                                                <span className="text-xs font-bold text-gray-500">
                                                                    {
                                                                        relatedProject.year
                                                                    }
                                                                </span>
                                                            )}
                                                        </div>
                                                        <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors duration-200 line-clamp-1">
                                                            {
                                                                relatedProject.title
                                                            }
                                                        </h3>
                                                        <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 leading-relaxed font-medium">
                                                            {relatedProject.description ||
                                                                "No overview meta descriptions available."}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </FadeIn>
                                    ),
                                )}
                            </div>
                        </div>
                    </section>
                )}

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
