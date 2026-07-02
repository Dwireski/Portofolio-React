import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";

interface Message {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    is_read: boolean;
    created_at: string;
    updated_at: string;
}

interface Props {
    message: Message;
}

export default function Show({ message }: Props) {
    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this message?")) {
            router.delete(route("admin.messages.destroy", id), {
                preserveScroll: true,
            });
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <AdminLayout>
            <Head title={`Message: ${message.subject}`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-yellow-400">
                            Message Details
                        </h1>
                        <p className="text-gray-400 mt-2 text-sm sm:text-base">
                            View message from contact form
                        </p>
                    </div>
                    <Link
                        href={route("admin.messages.index")}
                        className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors text-sm sm:text-base w-full sm:w-auto text-center"
                    >
                        ← Back to Messages
                    </Link>
                </div>

                {/* Message Card */}
                <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                    {/* Message Header */}
                    <div className="px-6 py-4 border-b border-gray-700 bg-gray-900/50">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="flex items-center space-x-3">
                                {!message.is_read && (
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                                    </span>
                                )}
                                <div>
                                    <h2 className="text-xl font-semibold text-white">
                                        {message.subject}
                                    </h2>
                                    <p className="text-sm text-gray-400 mt-1">
                                        {formatDate(message.created_at)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleDelete(message.id)}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-semibold"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Message Body */}
                    <div className="px-6 py-6">
                        {/* Sender Info */}
                        <div className="mb-6 pb-6 border-b border-gray-700">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                                        From
                                    </p>
                                    <p className="text-white font-medium">
                                        {message.name}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {message.email}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                                        Status
                                    </p>
                                    <span
                                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                                            message.is_read
                                                ? "bg-gray-700 text-gray-300"
                                                : "bg-yellow-400/10 text-yellow-400"
                                        }`}
                                    >
                                        {message.is_read ? "Read" : "Unread"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Message Content */}
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">
                                Message
                            </p>
                            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                                <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                                    {message.message}
                                </p>
                            </div>
                        </div>

                        {/* Reply Button */}
                        <div className="mt-6 pt-6 border-t border-gray-700">
                            <a
                                href={`mailto:${message.email}?subject=Re: ${message.subject}`}
                                className="inline-flex items-center px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                            >
                                <svg
                                    className="w-5 h-5 mr-2"
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
                                Reply via Email
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
