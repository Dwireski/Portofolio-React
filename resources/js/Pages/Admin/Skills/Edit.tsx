import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEvent, useState } from "react";

interface Skill {
    id: number;
    name: string;
    category: string;
    icon_path: string | null;
}

interface Props {
    skill: Skill;
}

export default function Edit({ skill }: Props) {
    // Tambahkan properti delete_icon ke dalam initial state useForm
    // 1. Ubah inisialisasi di dalam useForm agar mendukung string "true" / "false"
    const { data, setData, post, processing, errors } = useForm({
        name: skill.name,
        category: skill.category,
        icon: null as File | null,
        delete_icon: "false" as string | boolean, // Diubah ke string/boolean agar fleksibel
        _method: "PUT",
    });

    const [iconPreview, setIconPreview] = useState<string | null>(null);
    const [isOldIconRemoved, setIsOldIconRemoved] = useState(false);

    const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData((oldData) => ({
                ...oldData,
                icon: file,
                delete_icon: "false", // Ubah ke string "false"
            }));
            setIsOldIconRemoved(false);

            const reader = new FileReader();
            reader.onloadend = () => {
                setIconPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeNewIcon = () => {
        setData("icon", null);
        setIconPreview(null);
    };

    // 2. Gunakan pemanggilan objek langsung tanpa callback fungsional
    const removeCurrentActiveIcon = () => {
        setData({
            ...data,
            icon: null,
            delete_icon: "true", // Sekarang string "true" ini dijamin aman tanpa error
        });
        setIconPreview(null);
        setIsOldIconRemoved(true);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route("admin.skills.update", skill.id), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout>
            <Head title={`Edit Skill: ${skill.name}`} />

            <div className="space-y-6 px-4 sm:px-0 max-w-2xl mx-auto py-4">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-800 pb-5">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-yellow-400 tracking-tight">
                            Edit Skill
                        </h1>
                        <p className="text-gray-400 mt-1 text-xs sm:text-sm font-medium">
                            Modify fields below to update the specific metric
                            parameters of your portfolio expertise.
                        </p>
                    </div>
                    <Link
                        href={route("admin.skills.index")}
                        className="inline-flex items-center justify-center px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700 hover:border-gray-600 rounded-lg font-semibold transition-all text-xs sm:text-sm w-full sm:w-auto text-center"
                    >
                        ← Back to Skills
                    </Link>
                </div>

                {/* Form Card */}
                <div className="bg-gray-855 rounded-2xl border border-gray-800 shadow-2xl shadow-black/50 p-5 sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wide mb-2"
                            >
                                Skill / Tool Name{" "}
                                <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="w-full px-4 py-3 bg-gray-900/90 border border-gray-700/70 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all text-sm sm:text-base shadow-inner"
                                placeholder="e.g., Adobe Premiere, Videography"
                                required
                            />
                            {errors.name && (
                                <p className="mt-2 text-xs sm:text-sm text-red-400 font-medium">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Category */}
                        <div>
                            <label
                                htmlFor="category"
                                className="block text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wide mb-2"
                            >
                                Category <span className="text-red-400">*</span>
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
                                    <option value="skillset">
                                        Skillset (Expertise / Core Ability)
                                    </option>
                                    <option value="toolset">
                                        Toolset (Software / Hardware
                                        Applications)
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

                        {/* Icon Upload Custom Canvas Block */}
                        <div>
                            <label className="block text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wide mb-2">
                                Icon Vector or Logo{" "}
                                <span className="text-gray-500 lowercase font-normal text-xs ml-1">
                                    (optional)
                                </span>
                            </label>

                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                {/* Tampilkan Pratinjau Ikon Baru Jika Ada */}
                                {iconPreview && (
                                    <div className="relative w-24 h-24 bg-gray-950 border border-gray-800 rounded-xl flex items-center justify-center p-2 flex-shrink-0 group shadow-md animate-fadeIn">
                                        <img
                                            src={iconPreview}
                                            alt="New Icon Preview"
                                            className="w-full h-full object-contain"
                                        />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl pointer-events-none">
                                            <span className="text-[9px] font-bold uppercase tracking-wider text-gray-300">
                                                New Vector
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={removeNewIcon}
                                            className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center text-sm shadow-lg shadow-black/50 transition-colors font-bold z-10"
                                        >
                                            ×
                                        </button>
                                    </div>
                                )}

                                {/* Jika Tidak Ada Ungguhan Baru, Dan Ikon Lama Belum Dihapus, Tampilkan Ikon Database */}
                                {!iconPreview &&
                                    skill.icon_path &&
                                    !isOldIconRemoved && (
                                        <div className="relative w-24 h-24 bg-gray-950 border border-gray-800 rounded-xl flex items-center justify-center p-2 flex-shrink-0 group shadow-md">
                                            <img
                                                src={
                                                    skill.icon_path.startsWith(
                                                        "http",
                                                    )
                                                        ? skill.icon_path
                                                        : `/storage/${skill.icon_path}`
                                                }
                                                alt="Active Core Icon"
                                                className="w-full h-full object-contain"
                                            />
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl pointer-events-none">
                                                <span className="text-[9px] font-bold uppercase tracking-wider text-gray-300">
                                                    Active Core
                                                </span>
                                            </div>
                                            {/* Tombol Hapus Ikon Database */}
                                            <button
                                                type="button"
                                                onClick={
                                                    removeCurrentActiveIcon
                                                }
                                                className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center text-sm shadow-lg shadow-black/50 transition-colors font-bold z-10"
                                                title="Delete Active Icon From Storage"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    )}

                                {/* Interactive Upload Box Slot */}
                                <label className="flex flex-col items-center justify-center flex-1 w-full h-32 border-2 border-dashed border-gray-700 hover:border-yellow-400/70 rounded-xl cursor-pointer bg-gray-900/40 hover:bg-gray-900/80 transition-all group px-4">
                                    <div className="flex flex-col items-center justify-center text-center">
                                        <div className="w-9 h-10 rounded-xl bg-gray-800 flex items-center justify-center mb-2 group-hover:scale-110 group-hover:bg-gray-700 transition-transform">
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
                                        <p className="text-xs text-gray-400">
                                            <span className="font-bold text-yellow-400 group-hover:underline">
                                                Click here
                                            </span>{" "}
                                            to upload a replacement
                                        </p>
                                        <p className="text-[10px] sm:text-xs text-gray-500 mt-1 max-w-[200px]">
                                            Supports standard image formats or
                                            SVGs. Click "×" on the thumbnail to
                                            delete the active image.
                                        </p>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*,.svg"
                                        onChange={handleIconChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            {errors.icon && (
                                <p className="mt-2 text-xs sm:text-sm text-red-400 font-medium">
                                    {errors.icon}
                                </p>
                            )}
                        </div>

                        {/* Form Action Controls Trigger Row */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-5 border-t border-gray-800">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex-1 order-1 sm:order-2 px-6 py-3.5 bg-yellow-400 text-gray-950 font-extrabold rounded-xl hover:bg-yellow-500 active:scale-[0.99] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-yellow-400/5 text-sm sm:text-base"
                            >
                                {processing
                                    ? "Updating Record Data..."
                                    : "Update Skill Configuration"}
                            </button>
                            <Link
                                href={route("admin.skills.index")}
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
