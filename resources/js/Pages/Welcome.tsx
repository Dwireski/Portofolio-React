import { Head, Link, useForm } from "@inertiajs/react";
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

interface Skill {
    id: number;
    name: string;
    category: string;
    icon_path: string | null;
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface Props {
    auth: {
        user: User | null;
    };
    laravelVersion: string;
    phpVersion: string;
    projects: Project[];
    skills: Skill[];
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

// Komponen untuk animasi Skill Bar
function AnimatedSkillBar({ level }: { level: number }) {
    const [width, setWidth] = useState(0);
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setWidth(level);
            }
        });

        if (barRef.current) observer.observe(barRef.current);
        return () => observer.disconnect();
    }, [level]);

    return (
        <div
            ref={barRef}
            className="w-full h-2 bg-gray-950 rounded-full overflow-hidden border border-gray-900/60 p-[1px]"
        >
            <div
                className="h-full bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 rounded-full transition-all duration-[2000ms] ease-out shadow-glow"
                style={{ width: `${width}%` }}
            />
        </div>
    );
}

export default function Welcome({ auth, projects, skills }: Props) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

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

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route("contact.store"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                alert(
                    "Message sent successfully! I will get back to you soon.",
                );
            },
        });
    };

    const handleSmoothScroll = (
        e: React.MouseEvent<HTMLAnchorElement>,
        targetId: string,
    ) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            window.history.pushState(null, "", `#${targetId}`);
        }
    };

    // Statistics data
    const statistics = [
        {
            label: "Projects",
            value: projects.length,
            suffix: "+",
            icon: "🎬",
            description: "Completed productions",
        },
        {
            label: "Skills",
            value: skills.length,
            suffix: "+",
            icon: "⚡",
            description: "Core competencies",
        },
        {
            label: "Achievements",
            value: 3,
            suffix: "",
            icon: "🏆",
            description: "Awards & recognitions",
        },
        {
            label: "Years Active",
            value: 6,
            suffix: "+",
            icon: "📅",
            description: "Industry experience",
        },
    ];

    // Top skills for About Me section (with hardcoded levels for now)
    const topSkills = [
        { name: "Video & Audio Editing", level: 90 },
        { name: "Graphic Design", level: 85 },
        { name: "Adobe Premiere", level: 90 },
        { name: "Adobe After Effects", level: 85 },
        { name: "Digital Content Creation", level: 92 },
    ];

    return (
        <>
            <Head title="Reski - Portfolio Showcase" />
            <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-yellow-400 selection:text-gray-900 scroll-smooth overflow-x-hidden">
                {/* Navigation Menu */}
                <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-900/60 transition-all duration-300">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-20">
                            <div className="flex-shrink-0">
                                <h1 className="text-2xl font-black text-yellow-400 tracking-tighter uppercase group cursor-pointer">
                                    Reski
                                    <span className="text-white group-hover:text-yellow-400 transition-colors">
                                        .
                                    </span>
                                </h1>
                            </div>

                            {/* Desktop Navbar Links */}
                            <div className="hidden md:flex items-center space-x-10 font-semibold text-sm tracking-wide">
                                <a
                                    href="#home"
                                    onClick={(e) =>
                                        handleSmoothScroll(e, "home")
                                    }
                                    className="text-gray-300 hover:text-yellow-400 transition-colors relative after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[2px] after:bg-yellow-400 hover:after:w-full after:transition-all"
                                >
                                    Home
                                </a>
                                <Link
                                    href={route("public.projects.index")}
                                    className="text-gray-300 hover:text-yellow-400 transition-colors relative after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[2px] after:bg-yellow-400 hover:after:w-full after:transition-all"
                                >
                                    Projects
                                </Link>
                                <Link
                                    href={route("public.skills.index")}
                                    className="text-gray-300 hover:text-yellow-400 transition-colors relative after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[2px] after:bg-yellow-400 hover:after:w-full after:transition-all"
                                >
                                    Skills
                                </Link>
                                <Link
                                    href={route("public.contact.index")}
                                    className="text-gray-300 hover:text-yellow-400 transition-colors relative after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[2px] after:bg-yellow-400 hover:after:w-full after:transition-all"
                                >
                                    Contact
                                </Link>
                            </div>

                            <div className="hidden md:block">
                                {auth.user ? (
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
                        <div className="md:hidden bg-gray-950 border-b border-gray-900 px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
                            <a
                                href="#home"
                                onClick={(e) => {
                                    handleSmoothScroll(e, "home");
                                    setIsMobileMenuOpen(false);
                                }}
                                className="block px-4 py-3 rounded-xl hover:bg-gray-900 text-base font-semibold text-gray-300 hover:text-yellow-400"
                            >
                                Home
                            </a>
                            <Link
                                href={route("public.projects.index")}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-4 py-3 rounded-xl hover:bg-gray-900 text-base font-semibold text-gray-300 hover:text-yellow-400"
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
                            <div className="pt-4 border-t border-gray-900 mt-2">
                                {auth.user ? (
                                    <Link
                                        href={route("dashboard")}
                                        className="block w-full text-center px-4 py-3.5 bg-yellow-400 text-gray-950 rounded-xl font-bold"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        href={route("login")}
                                        className="block w-full text-center px-4 py-3.5 bg-gray-900 border border-gray-800 text-gray-200 rounded-xl font-bold"
                                    >
                                        Login
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}
                </nav>

                {/* Hero Section */}
                <section
                    id="home"
                    className="relative pt-44 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gray-950"
                >
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-400/5 blur-[120px] rounded-full pointer-events-none" />

                    <FadeIn>
                        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 rounded-full text-xs font-bold uppercase tracking-widest mb-2">
                                <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>{" "}
                                Available For Freelance
                            </div>
                            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-none">
                                Hi, I'm{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-300">
                                    Reski
                                </span>
                            </h1>
                            <p className="text-base sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-medium">
                                Visual Creator & Content Producer specializing
                                in premium videography, precise video editing,
                                and modern dynamic graphic design elements.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                                <Link
                                    href={route("public.projects.index")}
                                    className="px-8 py-4 bg-yellow-400 text-gray-950 rounded-xl font-bold hover:bg-yellow-500 transition-all shadow-xl shadow-yellow-400/10 active:scale-[0.99] text-base text-center"
                                >
                                    View Portfolio Work
                                </Link>
                                <Link
                                    href={route("public.contact.index")}
                                    className="px-8 py-4 bg-gray-900 text-gray-200 rounded-xl font-semibold hover:bg-gray-800 border border-gray-855 hover:border-gray-700 transition-all text-base text-center"
                                >
                                    Let's Cooperate
                                </Link>
                            </div>
                        </div>
                    </FadeIn>
                </section>

                {/* Statistics Section - NEW */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 to-gray-900/40 border-y border-gray-900/60">
                    <div className="max-w-7xl mx-auto">
                        <FadeIn>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                                {statistics.map((stat, index) => (
                                    <div
                                        key={stat.label}
                                        className="bg-gray-900/60 rounded-2xl border border-gray-855 p-6 sm:p-8 text-center hover:border-yellow-400/40 transition-all duration-300 group shadow-xl hover:shadow-black/50"
                                    >
                                        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
                                            {stat.icon}
                                        </div>
                                        <div className="text-3xl sm:text-4xl font-black text-yellow-400 mb-2 tracking-tight">
                                            {stat.value}
                                            {stat.suffix}
                                        </div>
                                        <div className="text-white font-bold text-sm sm:text-base mb-1">
                                            {stat.label}
                                        </div>
                                        <div className="text-gray-500 text-xs font-medium">
                                            {stat.description}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* Projects Section Grid */}
                <section
                    id="projects"
                    className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900/40 border-y border-gray-900/60"
                >
                    <div className="max-w-7xl mx-auto">
                        <FadeIn>
                            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                                    Curated Showcase{" "}
                                    <span className="text-yellow-400">
                                        Projects
                                    </span>
                                </h2>
                                <div className="h-1 w-12 bg-yellow-400 mx-auto rounded-full" />
                                <p className="text-gray-400 text-sm sm:text-base font-medium pt-1">
                                    An explicit detailed archive showcasing
                                    active records of my film capture and brand
                                    identity productions.
                                </p>
                                <Link
                                    href={route("public.projects.index")}
                                    className="inline-flex items-center mt-4 text-yellow-400 hover:text-yellow-300 font-bold text-sm transition-all group"
                                >
                                    View All Projects
                                    <svg
                                        className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2.5}
                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                    </svg>
                                </Link>
                            </div>
                        </FadeIn>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map((project, index) => (
                                <FadeIn
                                    key={project.id}
                                    delay={
                                        index % 3 === 1
                                            ? "delay-[150ms]"
                                            : index % 3 === 2
                                              ? "delay-[300ms]"
                                              : ""
                                    }
                                >
                                    <Link
                                        href={route(
                                            "public.projects.show",
                                            project.slug,
                                        )}
                                        className="bg-gray-900/60 rounded-2xl border border-gray-855 overflow-hidden hover:border-yellow-400/40 transition-all duration-300 group shadow-xl hover:shadow-black/50 flex flex-col justify-between h-full block"
                                    >
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
                                            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1 bg-gray-950/80 backdrop-blur-md text-yellow-400 rounded-md text-[10px] font-bold uppercase tracking-wider border border-yellow-400/20 shadow-md">
                                                    {getCategoryLabel(
                                                        project.category,
                                                    )}
                                                </span>
                                            </div>
                                            {project.year && (
                                                <div className="absolute bottom-4 right-4 px-2 py-0.5 bg-gray-900/80 backdrop-blur-sm rounded text-xs font-bold text-gray-400">
                                                    {project.year}
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                                            <div className="space-y-2">
                                                <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-200 line-clamp-1">
                                                    {project.title}
                                                </h3>
                                                <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                                                    {project.description ||
                                                        "No description overview provided for this build record."}
                                                </p>
                                            </div>

                                            {project.video_url && (
                                                <div className="pt-2">
                                                    <span className="inline-flex items-center text-yellow-400 text-xs sm:text-sm font-bold tracking-wide transition-all">
                                                        Launch Asset Stream
                                                        <svg
                                                            className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={
                                                                    2.5
                                                                }
                                                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                            />
                                                        </svg>
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Skills Preview Grid Section */}
                <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <FadeIn>
                            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                                    Expertise &{" "}
                                    <span className="text-yellow-400">
                                        Toolsets
                                    </span>
                                </h2>
                                <div className="h-1 w-12 bg-yellow-400 mx-auto rounded-full" />
                                <p className="text-gray-400 text-sm sm:text-base font-medium pt-1">
                                    Highlighting proficiency in core media
                                    frameworks and software architecture
                                    deployment.
                                </p>
                                <Link
                                    href={route("public.skills.index")}
                                    className="inline-flex items-center mt-4 text-yellow-400 hover:text-yellow-300 font-bold text-sm transition-all group"
                                >
                                    View All Skills & Achievements
                                    <svg
                                        className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2.5}
                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                    </svg>
                                </Link>
                            </div>
                        </FadeIn>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
                            {skills.slice(0, 12).map((skill, index) => {
                                const delays = [
                                    "",
                                    "delay-[75ms]",
                                    "delay-[150ms]",
                                    "delay-[225ms]",
                                    "delay-[300ms]",
                                    "delay-[375ms]",
                                ];
                                const delayClass = delays[index % 6];

                                return (
                                    <FadeIn key={skill.id} delay={delayClass}>
                                        <div className="bg-gradient-to-b from-gray-900/60 to-gray-900/20 rounded-2xl border border-gray-855 p-5 text-center hover:border-yellow-400/40 transition-all duration-300 group flex flex-col items-center justify-center shadow-lg hover:shadow-black/20 h-full">
                                            <div className="w-14 h-14 rounded-xl bg-gray-950 border border-gray-900 flex items-center justify-center overflow-hidden p-2 mb-3 shadow-inner relative group-hover:scale-105 transition-transform duration-200">
                                                {skill.icon_path ? (
                                                    <img
                                                        src={getImageUrl(
                                                            skill.icon_path,
                                                        )}
                                                        alt={skill.name}
                                                        className="w-full h-full object-contain"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-xl font-black text-yellow-400 uppercase">
                                                        {skill.name.charAt(0)}
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-sm font-bold text-gray-200 group-hover:text-yellow-400 transition-colors duration-200 truncate w-full px-1">
                                                {skill.name}
                                            </p>
                                            <span
                                                className={`inline-block text-[10px] font-extrabold uppercase tracking-wider mt-1 px-2 py-0.5 rounded ${
                                                    skill.category ===
                                                    "skillset"
                                                        ? "bg-blue-500/10 text-blue-400/90"
                                                        : "bg-purple-500/10 text-purple-400/90"
                                                }`}
                                            >
                                                {skill.category === "skillset"
                                                    ? "Skill"
                                                    : "Tool"}
                                            </span>
                                        </div>
                                    </FadeIn>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* About Me Section - NEW */}
                <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900/40 border-y border-gray-900/60">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                            {/* Left: About Text */}
                            <FadeIn>
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-yellow-400 text-xs sm:text-sm font-bold uppercase tracking-widest mb-2">
                                            About Me
                                        </p>
                                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                                            Crafting Visual Stories with{" "}
                                            <span className="text-yellow-400">
                                                Precision
                                            </span>
                                        </h2>
                                        <div className="h-1 w-12 bg-yellow-400 rounded-full mt-3" />
                                    </div>

                                    <div className="space-y-4 text-gray-400 text-sm sm:text-base leading-relaxed font-medium">
                                        <p>
                                            I'm a passionate Visual Creator and
                                            Content Producer with over 6 years
                                            of experience in transforming ideas
                                            into compelling visual narratives.
                                            My expertise spans across
                                            videography, video editing, and
                                            graphic design.
                                        </p>
                                        <p>
                                            I specialize in creating premium
                                            content that captures attention and
                                            delivers messages effectively. From
                                            brand identity productions to
                                            cinematic storytelling, I bring
                                            technical precision and creative
                                            vision to every project.
                                        </p>
                                        <p>
                                            Currently pursuing Informatics
                                            Engineering at UIN Maulana Malik
                                            Ibrahim Malang, I continuously
                                            expand my skill set to stay at the
                                            forefront of digital media
                                            innovation.
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-3 pt-2">
                                        <span className="px-4 py-2 bg-yellow-400/10 text-yellow-400 rounded-lg text-xs font-bold border border-yellow-400/20">
                                            🎬 Videography
                                        </span>
                                        <span className="px-4 py-2 bg-yellow-400/10 text-yellow-400 rounded-lg text-xs font-bold border border-yellow-400/20">
                                            ✂️ Video Editing
                                        </span>
                                        <span className="px-4 py-2 bg-yellow-400/10 text-yellow-400 rounded-lg text-xs font-bold border border-yellow-400/20">
                                            🎨 Graphic Design
                                        </span>
                                        <span className="px-4 py-2 bg-yellow-400/10 text-yellow-400 rounded-lg text-xs font-bold border border-yellow-400/20">
                                            📸 Photography
                                        </span>
                                    </div>
                                </div>
                            </FadeIn>

                            {/* Right: Skills Progress Bars */}
                            <FadeIn delay="delay-[200ms]">
                                <div className="bg-gray-900/60 rounded-2xl border border-gray-855 p-6 sm:p-8 shadow-xl">
                                    <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                                        <span className="text-yellow-400 mr-2">
                                            ⚡
                                        </span>
                                        Core Proficiency
                                    </h3>
                                    <div className="space-y-5">
                                        {topSkills.map((skill, index) => (
                                            <div key={skill.name}>
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-gray-200 font-bold text-sm">
                                                        {skill.name}
                                                    </span>
                                                    <span className="text-yellow-400 font-black text-sm">
                                                        {skill.level}%
                                                    </span>
                                                </div>
                                                <AnimatedSkillBar
                                                    level={skill.level}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-6 pt-6 border-t border-gray-800">
                                        <Link
                                            href={route("public.skills.index")}
                                            className="inline-flex items-center text-yellow-400 hover:text-yellow-300 font-bold text-sm transition-all group"
                                        >
                                            View All Skills & Achievements
                                            <svg
                                                className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2.5}
                                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                {/* Call to Action Section */}
                <section className="py-24 px-4 bg-gray-900/40 border-t border-gray-900/60 text-center">
                    <FadeIn>
                        <div className="max-w-3xl mx-auto space-y-6">
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                                Let's create something
                                <br />
                                <span className="text-yellow-400">
                                    together
                                </span>
                            </h2>
                            <p className="text-gray-400 text-lg font-medium">
                                Open to collaboration, freelance projects, and
                                creative partnerships.
                            </p>
                            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href={route("public.contact.index")}
                                    className="inline-flex items-center px-8 py-4 bg-yellow-400 text-gray-950 rounded-xl font-black hover:bg-yellow-500 transition-all active:scale-[0.98] text-lg"
                                >
                                    Say Hello
                                    <svg
                                        className="w-5 h-5 ml-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2.5}
                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                    </svg>
                                </Link>
                                {/* Tambahan Tombol WhatsApp */}
                                <a
                                    href="https://wa.me/6281355025343"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-8 py-4 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-all active:scale-[0.98] text-lg border border-gray-700"
                                >
                                    WhatsApp
                                    <svg
                                        className="w-5 h-5 ml-2"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.148-.67-1.613-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a5.47 5.47 0 01-2.784-.761l-.2-.118-2.071.543.553-2.016-.13-.211a5.474 5.474 0 01-.836-2.916c0-3.016 2.454-5.47 5.47-5.47s5.47 2.454 5.47 5.47-2.454 5.47-5.47 5.47m10.744-12.493C20.672 3.655 16.945 0 12.35 0 7.753 0 4.025 3.655 4.025 8.252c0 1.455.378 2.878 1.092 4.128L3 18.25l5.968-1.564a8.212 8.212 0 003.921 1.002h.003c4.595 0 8.323-3.655 8.323-8.252" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </FadeIn>
                </section>

                {/* Footer */}
                <footer className="py-10 px-4 sm:px-6 lg:px-8 border-t border-gray-900/60 bg-gray-950/40">
                    <div className="max-w-7xl mx-auto text-center space-y-2">
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
