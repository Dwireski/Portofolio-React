import { Head, Link, useForm } from "@inertiajs/react";
import { FormEvent, useState, useEffect, useRef, ReactNode } from "react";

interface ContactInfo {
    email: string;
    phone: string;
    location: string;
    social_links: {
        linkedin: string;
        instagram: string;
        github: string;
    };
}

interface Props {
    contactInfo: ContactInfo;
    auth: any; // Ditambahkan agar auth.user terbaca
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

export default function Index({ contactInfo, auth }: Props) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        message: "",
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route("contact.store"), {
            onSuccess: () => {
                reset();
                alert(
                    "Message sent successfully! I will get back to you soon.",
                );
            },
        });
    };

    return (
        <>
            <Head title="Contact - Portfolio" />
            <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-yellow-400 selection:text-gray-900 overflow-x-hidden">
                {/* Navigation Menu (Dikembalikan 100% seperti aslinya) */}
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

                            {/* Desktop Navbar Links */}
                            <div className="hidden md:flex items-center space-x-10 font-semibold text-sm tracking-wide">
                                <Link
                                    href="/"
                                    className="text-gray-300 hover:text-yellow-400 transition-colors relative after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[2px] after:bg-yellow-400 hover:after:w-full after:transition-all"
                                >
                                    Home
                                </Link>
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
                                    className="text-yellow-400 transition-colors relative after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-[2px] after:bg-yellow-400 after:transition-all"
                                >
                                    Contact
                                </Link>
                            </div>

                            {/* Auth Button (Tombol Dashboard yang sempat hilang) */}
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
                        <div className="md:hidden bg-gray-950 border-b border-gray-900 px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
                            <Link
                                href="/"
                                onClick={() => setIsMobileMenuOpen(false)}
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
                                className="block px-4 py-3 rounded-xl hover:bg-gray-900 text-base font-semibold text-gray-300 hover:text-yellow-400"
                            >
                                Skills
                            </Link>
                            <Link
                                href={route("public.contact.index")}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-4 py-3 rounded-xl hover:bg-gray-900 text-base font-semibold text-yellow-400"
                            >
                                Contact
                            </Link>
                            <div className="pt-4 border-t border-gray-900 mt-2">
                                {auth?.user ? (
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

                {/* Header Section */}
                <section className="pt-40 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                    <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-yellow-400/[0.03] blur-[120px] rounded-full pointer-events-none" />
                    <div className="max-w-7xl mx-auto">
                        <FadeIn>
                            <div className="max-w-3xl border-b border-gray-900/60 pb-10">
                                <p className="text-yellow-400 text-xs sm:text-sm font-bold uppercase tracking-widest mb-2">
                                    Contact
                                </p>
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">
                                    Let's Work Together
                                </h1>
                                <p className="text-gray-400 text-sm sm:text-lg max-w-2xl font-medium leading-relaxed">
                                    Have a project in mind? I'm open to
                                    freelance work, collaborations, and creative
                                    partnerships.
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="pb-28 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                            {/* Contact Info - Left Column */}
                            <FadeIn delay="delay-[150ms]">
                                <div className="space-y-8">
                                    {/* Contact Details */}
                                    <div className="bg-gray-900/40 p-8 rounded-2xl border border-gray-855 space-y-6 shadow-inner">
                                        <h3 className="text-xl font-extrabold text-white mb-6">
                                            Direct Connect
                                        </h3>

                                        {/* Email */}
                                        <div className="flex items-center group">
                                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center mr-4 group-hover:scale-105 group-hover:bg-yellow-400/20 transition-all">
                                                <svg
                                                    className="w-5 h-5 text-yellow-400"
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
                                            <div>
                                                <p className="text-[10px] text-gray-500 font-extrabold uppercase tracking-widest mb-0.5">
                                                    Email
                                                </p>
                                                <a
                                                    href={`mailto:${contactInfo.email}`}
                                                    className="text-white font-bold hover:text-yellow-400 transition-colors text-sm sm:text-base"
                                                >
                                                    {contactInfo.email}
                                                </a>
                                            </div>
                                        </div>

                                        {/* Phone */}
                                        <div className="flex items-center group">
                                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center mr-4 group-hover:scale-105 group-hover:bg-yellow-400/20 transition-all">
                                                <svg
                                                    className="w-5 h-5 text-yellow-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                    />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-gray-500 font-extrabold uppercase tracking-widest mb-0.5">
                                                    Phone
                                                </p>
                                                <a
                                                    href={`tel:${contactInfo.phone}`}
                                                    className="text-white font-bold hover:text-yellow-400 transition-colors text-sm sm:text-base"
                                                >
                                                    {contactInfo.phone}
                                                </a>
                                            </div>
                                        </div>

                                        {/* Location */}
                                        <div className="flex items-center group">
                                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center mr-4 group-hover:scale-105 group-hover:bg-yellow-400/20 transition-all">
                                                <svg
                                                    className="w-5 h-5 text-yellow-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-gray-500 font-extrabold uppercase tracking-widest mb-0.5">
                                                    Location
                                                </p>
                                                <p className="text-white font-bold text-sm sm:text-base">
                                                    {contactInfo.location}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Social Links */}
                                    <div className="pt-4 border-t border-gray-900/60">
                                        <p className="text-[10px] text-gray-500 font-extrabold uppercase tracking-widest mb-4">
                                            Find Me On
                                        </p>
                                        <div className="flex flex-wrap gap-4">
                                            {contactInfo.social_links
                                                .linkedin && (
                                                <a
                                                    href="https://www.linkedin.com/in/dwiahmadrskhi/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-lg text-gray-300 hover:text-yellow-400 hover:border-yellow-400/40 transition-all font-bold text-sm"
                                                >
                                                    <svg
                                                        className="w-4 h-4 mr-2"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                                    </svg>
                                                    LinkedIn
                                                </a>
                                            )}
                                            {contactInfo.social_links
                                                .instagram && (
                                                <a
                                                    href="https://www.instagram.com/itsdwirskhi?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-lg text-gray-300 hover:text-yellow-400 hover:border-yellow-400/40 transition-all font-bold text-sm"
                                                >
                                                    <svg
                                                        className="w-4 h-4 mr-2"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                                    </svg>
                                                    Instagram
                                                </a>
                                            )}
                                            {contactInfo.social_links
                                                .github && (
                                                <a
                                                    href="https://github.com/Dwireski"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-lg text-gray-300 hover:text-yellow-400 hover:border-yellow-400/40 transition-all font-bold text-sm"
                                                >
                                                    <svg
                                                        className="w-4 h-4 mr-2"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                    </svg>
                                                    GitHub
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>

                            {/* Contact Form - Right Column */}
                            <FadeIn delay="delay-[300ms]">
                                <div className="bg-gray-900/90 rounded-3xl border border-gray-855 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
                                    <form
                                        onSubmit={handleSubmit}
                                        className="space-y-6"
                                    >
                                        {/* Name */}
                                        <div>
                                            <label
                                                htmlFor="name"
                                                className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2"
                                            >
                                                Your Name{" "}
                                                <span className="text-red-400">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full px-5 py-4 bg-gray-950 border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 focus:border-yellow-400 transition-all font-medium"
                                                placeholder="John Doe"
                                                required
                                            />
                                            {errors.name && (
                                                <p className="mt-2 text-xs text-red-400 font-bold">
                                                    {errors.name}
                                                </p>
                                            )}
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2"
                                            >
                                                Email Address{" "}
                                                <span className="text-red-400">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full px-5 py-4 bg-gray-950 border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 focus:border-yellow-400 transition-all font-medium"
                                                placeholder="you@example.com"
                                                required
                                            />
                                            {errors.email && (
                                                <p className="mt-2 text-xs text-red-400 font-bold">
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>

                                        {/* Message */}
                                        <div>
                                            <label
                                                htmlFor="message"
                                                className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2"
                                            >
                                                Message{" "}
                                                <span className="text-red-400">
                                                    *
                                                </span>
                                            </label>
                                            <textarea
                                                id="message"
                                                value={data.message}
                                                onChange={(e) =>
                                                    setData(
                                                        "message",
                                                        e.target.value,
                                                    )
                                                }
                                                rows={5}
                                                className="w-full px-5 py-4 bg-gray-950 border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 focus:border-yellow-400 transition-all resize-none font-medium leading-relaxed"
                                                placeholder="Tell me about your project..."
                                                required
                                            />
                                            {errors.message && (
                                                <p className="mt-2 text-xs text-red-400 font-bold">
                                                    {errors.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full px-6 py-4 bg-yellow-400 text-gray-950 rounded-xl font-black hover:bg-yellow-500 transition-all shadow-xl shadow-yellow-400/10 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center tracking-wide"
                                        >
                                            {processing ? (
                                                "Sending..."
                                            ) : (
                                                <>
                                                    Send Message
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
                                                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                                        />
                                                    </svg>
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-10 px-4 sm:px-6 lg:px-8 border-t border-gray-900/60 bg-gray-950/40">
                    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-xs sm:text-sm font-medium">
                            © 2026 Reski. All rights reserved.
                        </p>
                        <div className="flex items-center space-x-1.5 text-gray-500 text-xs font-medium">
                            <span>Built with</span>
                            <span className="text-red-500 animate-pulse">
                                ❤
                            </span>
                            <span>using Laravel & Inertia</span>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
