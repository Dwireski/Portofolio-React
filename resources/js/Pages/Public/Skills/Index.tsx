import { Head, Link, router } from "@inertiajs/react";
import { useState, useEffect, useRef, ReactNode } from "react";

interface SkillItem {
    id: number;
    name: string;
    category: string;
    icon_path: string | null;
    level: number;
}

interface Achievement {
    title: string;
    description: string;
    year: string;
    icon: string;
}

interface Education {
    institution: string;
    degree: string;
    period: string;
    gpa: string;
    description: string;
    location: string;
}

interface Props {
    skills: {
        skillset: SkillItem[];
        toolset: SkillItem[];
    };
    achievements: Achievement[];
    education: Education[];
    auth?: {
        user: any;
    };
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

// Komponen Wrapper untuk animasi scroll
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

        if (domRef.current) observer.observe(domRef.current);
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

export default function Index({
    skills,
    achievements,
    education,
    auth,
}: Props) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const getImageUrl = (path: string | null) => {
        if (!path) return null;
        return path.startsWith("http") ? path : `/storage/${path}`;
    };

    const handleSmoothScroll = (e: React.MouseEvent<any>, targetId: string) => {
        if (targetId === "home") {
            e.preventDefault();
            router.get("/");
        } else if (targetId === "contact") {
            e.preventDefault();
            router.get("/#contact");
        }
    };

    return (
        <>
            <Head title="Skills & Achievements - Portfolio Showcase" />
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
                                    onClick={(e) =>
                                        handleSmoothScroll(e, "home")
                                    }
                                    className="text-gray-300 hover:text-yellow-400 transition-colors"
                                >
                                    Home
                                </Link>
                                <Link
                                    href={route("public.projects.index")}
                                    className="text-gray-300 hover:text-yellow-400 transition-colors"
                                >
                                    Projects
                                </Link>
                                <Link
                                    href={route("public.skills.index")}
                                    className="text-yellow-400 font-bold"
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

                    {/* Responsive Mobile Drawer Menu Dropdown */}
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
                                className="block px-4 py-3 rounded-xl hover:bg-gray-900 text-base font-semibold text-gray-300 hover:text-yellow-400"
                            >
                                Projects
                            </Link>
                            <Link
                                href={route("public.skills.index")}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-4 py-3 rounded-xl bg-gray-900 text-base font-semibold text-yellow-400"
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
                            <div className="mb-2">
                                <p className="text-yellow-400 text-xs sm:text-sm font-bold uppercase tracking-widest mb-2">
                                    Expertise & Growth
                                </p>
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
                                    Skills & Achievements
                                </h1>
                                <p className="text-gray-400 text-sm sm:text-lg max-w-3xl mt-3 font-medium leading-relaxed">
                                    A comprehensive showcase profiling my core
                                    media production competencies, creative
                                    engineering software capabilities,
                                    milestones, and academic background history.
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* Skills Core Matrix Section */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                            {/* Skillset Column */}
                            <div className="space-y-6">
                                <FadeIn>
                                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center">
                                        <span className="text-yellow-400 font-mono text-xl mr-3">
                                            1.
                                        </span>{" "}
                                        Skillset Core Ability
                                    </h2>
                                    <div className="h-1 w-10 bg-yellow-400 rounded-full mt-2 mb-3" />
                                    <p className="text-gray-400 text-sm sm:text-base font-medium mb-8">
                                        Core creative execution workflow
                                        frameworks and industry expert
                                        competencies I've developed.
                                    </p>
                                </FadeIn>

                                <div className="space-y-6">
                                    {skills.skillset?.map((skill, index) => (
                                        <FadeIn
                                            key={skill.id}
                                            delay={
                                                index > 0
                                                    ? `delay-[${index * 50}ms]`
                                                    : ""
                                            }
                                        >
                                            <div className="group bg-gray-900/40 p-4 rounded-xl border border-gray-900 hover:border-gray-855 transition-all duration-300">
                                                <div className="flex justify-between items-center mb-2.5">
                                                    <div className="flex items-center space-x-3.5">
                                                        <div className="w-9 h-9 rounded-lg bg-gray-950 border border-gray-900 flex items-center justify-center p-1.5 shadow-inner">
                                                            {getImageUrl(
                                                                skill.icon_path,
                                                            ) ? (
                                                                <img
                                                                    src={
                                                                        getImageUrl(
                                                                            skill.icon_path,
                                                                        )!
                                                                    }
                                                                    alt={
                                                                        skill.name
                                                                    }
                                                                    className="w-full h-full object-contain"
                                                                />
                                                            ) : (
                                                                <span className="text-xs font-black text-yellow-400 uppercase">
                                                                    {skill.name.charAt(
                                                                        0,
                                                                    )}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <span className="text-gray-200 font-bold text-sm sm:text-base group-hover:text-yellow-400 transition-colors">
                                                            {skill.name}
                                                        </span>
                                                    </div>
                                                    <span className="text-yellow-400 font-black text-xs sm:text-sm tracking-wide bg-yellow-400/5 px-2 py-0.5 rounded border border-yellow-400/10">
                                                        {skill.level}%
                                                    </span>
                                                </div>
                                                <div className="w-full h-2 bg-gray-950 rounded-full overflow-hidden border border-gray-900/60 p-[1px]">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 rounded-full transition-all duration-1000 ease-out shadow-glow"
                                                        style={{
                                                            width: `${skill.level}%`,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </FadeIn>
                                    ))}
                                </div>
                            </div>

                            {/* Toolset Column */}
                            <div className="space-y-6">
                                <FadeIn>
                                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center">
                                        <span className="text-yellow-400 font-mono text-xl mr-3">
                                            2.
                                        </span>{" "}
                                        Production Toolsets
                                    </h2>
                                    <div className="h-1 w-10 bg-yellow-400 rounded-full mt-2 mb-3" />
                                    <p className="text-gray-400 text-sm sm:text-base font-medium mb-8">
                                        Engine software applications, non-linear
                                        suites, and hardware utilities deployed
                                        daily.
                                    </p>
                                </FadeIn>

                                <div className="space-y-6">
                                    {skills.toolset?.map((skill, index) => (
                                        <FadeIn
                                            key={skill.id}
                                            delay={
                                                index > 0
                                                    ? `delay-[${index * 50}ms]`
                                                    : ""
                                            }
                                        >
                                            <div className="group bg-gray-900/40 p-4 rounded-xl border border-gray-900 hover:border-gray-855 transition-all duration-300">
                                                <div className="flex justify-between items-center mb-2.5">
                                                    <div className="flex items-center space-x-3.5">
                                                        <div className="w-9 h-9 rounded-lg bg-gray-950 border border-gray-900 flex items-center justify-center p-1.5 shadow-inner">
                                                            {getImageUrl(
                                                                skill.icon_path,
                                                            ) ? (
                                                                <img
                                                                    src={
                                                                        getImageUrl(
                                                                            skill.icon_path,
                                                                        )!
                                                                    }
                                                                    alt={
                                                                        skill.name
                                                                    }
                                                                    className="w-full h-full object-contain"
                                                                />
                                                            ) : (
                                                                <span className="text-xs font-black text-yellow-400 uppercase">
                                                                    {skill.name.charAt(
                                                                        0,
                                                                    )}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <span className="text-gray-200 font-bold text-sm sm:text-base group-hover:text-yellow-400 transition-colors">
                                                            {skill.name}
                                                        </span>
                                                    </div>
                                                    <span className="text-yellow-400 font-black text-xs sm:text-sm tracking-wide bg-yellow-400/5 px-2 py-0.5 rounded border border-yellow-400/10">
                                                        {skill.level}%
                                                    </span>
                                                </div>
                                                <div className="w-full h-2 bg-gray-950 rounded-full overflow-hidden border border-gray-900/60 p-[1px]">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 rounded-full transition-all duration-1000 ease-out"
                                                        style={{
                                                            width: `${skill.level}%`,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </FadeIn>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Achievements Section */}
                <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900/40 border-y border-gray-900/60">
                    <div className="max-w-7xl mx-auto">
                        <FadeIn>
                            <div className="mb-16 space-y-2">
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center">
                                    <span className="text-yellow-400 font-mono text-xl mr-3">
                                        3.
                                    </span>{" "}
                                    Awards & Recognitions
                                </h2>
                                <div className="h-1 w-10 bg-yellow-400 rounded-full mt-2" />
                                <p className="text-gray-400 text-sm sm:text-base font-medium pt-1">
                                    Official honors, competitive milestones, and
                                    verification badges accumulated along my
                                    industry timeline.
                                </p>
                            </div>
                        </FadeIn>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {achievements.map((achievement, index) => (
                                <FadeIn
                                    key={index}
                                    delay={
                                        index % 3 === 1
                                            ? "delay-[100ms]"
                                            : index % 3 === 2
                                              ? "delay-[200ms]"
                                              : ""
                                    }
                                >
                                    <div className="bg-gray-950/60 h-full rounded-2xl border border-gray-855 p-6 sm:p-7 hover:border-yellow-400/40 transition-all duration-300 group shadow-lg hover:shadow-black/50 flex flex-col justify-between space-y-5">
                                        <div className="flex items-start justify-between">
                                            <div className="w-12 h-12 bg-gray-900 rounded-xl border border-gray-850 flex items-center justify-center text-3xl p-1 shadow-inner group-hover:scale-105 transition-transform">
                                                {achievement.icon}
                                            </div>
                                            <span className="text-yellow-400 text-xs font-black bg-gray-900 border border-gray-850 px-3 py-1 rounded-md shadow-sm">
                                                {achievement.year}
                                            </span>
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors duration-200 line-clamp-1">
                                                {achievement.title}
                                            </h3>
                                            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-medium line-clamp-3">
                                                {achievement.description}
                                            </p>
                                        </div>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Education Section Timeline Track */}
                <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
                    <div className="max-w-4xl mx-auto">
                        <FadeIn>
                            <div className="mb-16 space-y-2">
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center">
                                    <span className="text-yellow-400 font-mono text-xl mr-3">
                                        4.
                                    </span>{" "}
                                    Academic Foundation
                                </h2>
                                <div className="h-1 w-10 bg-yellow-400 rounded-full mt-2" />
                                <p className="text-gray-400 text-sm sm:text-base font-medium pt-1">
                                    My formal education history, specialized
                                    degrees, and active institutional studies.
                                </p>
                            </div>
                        </FadeIn>

                        <div className="relative">
                            {/* Vertical Line Anchor */}
                            <div className="absolute left-4 md:left-8 top-2 bottom-2 w-[2px] bg-gray-900" />

                            <div className="space-y-10">
                                {education.map((edu, index) => (
                                    <div
                                        key={index}
                                        className="relative pl-12 md:pl-24 group"
                                    >
                                        {/* Node Bullet Ring */}
                                        <div className="absolute left-[9px] md:left-[25px] top-7 w-[16px] h-[16px] bg-gray-950 border-4 border-gray-800 rounded-full group-hover:border-yellow-400 transition-colors duration-300 z-10" />

                                        <FadeIn
                                            delay={
                                                index > 0 ? "delay-[150ms]" : ""
                                            }
                                        >
                                            <div className="bg-gray-900/40 rounded-2xl border border-gray-855 p-6 sm:p-8 hover:border-yellow-400/30 transition-all duration-300 shadow-xl hover:shadow-black/20">
                                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-gray-900 pb-4 mb-4">
                                                    <div>
                                                        <h3 className="text-xl font-extrabold text-white group-hover:text-yellow-400 transition-colors duration-200">
                                                            {edu.institution}
                                                        </h3>
                                                        <p className="text-gray-400 text-xs sm:text-sm font-semibold mt-0.5">
                                                            {edu.degree}
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-wrap items-center gap-2.5">
                                                        <span className="text-gray-500 text-xs font-bold bg-gray-950 border border-gray-900 px-2.5 py-1 rounded-md">
                                                            {edu.period}
                                                        </span>
                                                        <span className="px-2.5 py-1 bg-gradient-to-r from-yellow-400/10 to-amber-400/10 border border-yellow-400/20 text-yellow-400 rounded-md text-xs font-black tracking-wide shadow-sm">
                                                            GPA: {edu.gpa}
                                                        </span>
                                                    </div>
                                                </div>
                                                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-medium whitespace-pre-line">
                                                    {edu.description}
                                                </p>
                                                <div className="text-gray-500 text-[11px] font-bold uppercase tracking-wider mt-4 flex items-center gap-1">
                                                    <span>📍</span>{" "}
                                                    {edu.location}
                                                </div>
                                            </div>
                                        </FadeIn>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call-to-Action Segment */}
                <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900/40 border-t border-gray-900/60">
                    <div className="max-w-3xl mx-auto text-center space-y-6">
                        <FadeIn>
                            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                                Want to Launch a Production?
                            </h2>
                            <p className="text-gray-400 text-sm sm:text-lg font-medium max-w-xl mx-auto pt-1 leading-relaxed">
                                I'm always open to modern engineering pipelines,
                                contract gigs, and creative visual alignment
                                opportunities.
                            </p>
                            <div className="pt-4">
                                <Link
                                    href={route("public.contact.index")}
                                    className="inline-flex items-center px-8 py-4 bg-yellow-400 text-gray-950 rounded-xl font-black hover:bg-yellow-500 transition-all active:scale-[0.98] text-lg"
                                >
                                    Initiate Contract Brief
                                    <svg
                                        className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
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
