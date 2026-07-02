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
    messages: {
        data: Message[];
        current_page: number;
        last_page: number;
        from: number;
        to: number;
        total: number;
    };
}

export default function Index({ messages }: Props) {
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
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <AdminLayout>
            <Head title="Messages" />

            <div className="space-y-6 px-4 sm:px-0">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-800 pb-5">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-yellow-400 tracking-tight">
                            Messages
                        </h1>
                        <p className="text-gray-400 mt-1 text-xs sm:text-sm font-medium">
                            Inbox from your portfolio contact form
                        </p>
                    </div>
                </div>

                {/* Desktop Table - Hidden on mobile */}
                <div className="hidden md:block bg-gray-855 rounded-xl border border-gray-800 overflow-hidden shadow-2xl shadow-black/40">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700/60">
                                <tr>
                                    <th className="w-16 px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                                        Sender
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                                        Subject
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                                        Date
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-400">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800 bg-gray-900/40">
                                {messages.data.map((msg) => (
                                    <tr
                                        key={msg.id}
                                        className={`hover:bg-gray-800/50 transition-colors duration-150 group ${
                                            !msg.is_read
                                                ? "bg-yellow-500/[0.02]"
                                                : ""
                                        }`}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center justify-center w-full">
                                                {!msg.is_read ? (
                                                    <span className="relative flex h-2.5 w-2.5">
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-500"></span>
                                                    </span>
                                                ) : (
                                                    <span className="h-2.5 w-2.5 rounded-full bg-gray-700 block"></span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <p
                                                    className={`text-sm ${!msg.is_read ? "text-white font-bold" : "text-gray-300 font-medium"}`}
                                                >
                                                    {msg.name}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-0.5">
                                                    {msg.email}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p
                                                className={`text-sm truncate max-w-xs xl:max-w-md ${!msg.is_read ? "text-yellow-400/95 font-semibold" : "text-gray-400"}`}
                                            >
                                                {msg.subject}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-400">
                                            {formatDate(msg.created_at)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                            <Link
                                                href={route(
                                                    "admin.messages.show",
                                                    msg.id,
                                                )}
                                                className="inline-flex items-center px-3 py-1.5 bg-gray-800 border border-gray-700 hover:border-blue-500 hover:text-blue-400 text-gray-300 rounded-md transition-all text-xs font-semibold"
                                            >
                                                View
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(msg.id)
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
                    {messages.last_page > 1 && (
                        <div className="px-6 py-4 bg-gray-800/40 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <p className="text-xs sm:text-sm text-gray-400 font-medium">
                                Showing{" "}
                                <span className="text-gray-200">
                                    {messages.from}
                                </span>{" "}
                                to{" "}
                                <span className="text-gray-200">
                                    {messages.to}
                                </span>{" "}
                                of{" "}
                                <span className="text-gray-200">
                                    {messages.total}
                                </span>{" "}
                                results
                            </p>
                            <div className="flex items-center space-x-1">
                                {Array.from(
                                    { length: messages.last_page },
                                    (_, i) => i + 1,
                                ).map((page) => (
                                    <Link
                                        key={page}
                                        href={route("admin.messages.index", {
                                            page,
                                        })}
                                        className={`px-3.5 py-1.5 rounded-lg transition-all text-xs font-bold ${
                                            page === messages.current_page
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
                <div className="md:hidden space-y-4">
                    {messages.data.map((msg) => (
                        <div
                            key={msg.id}
                            className={`rounded-xl border transition-all overflow-hidden shadow-xl shadow-black/20 flex flex-col ${
                                !msg.is_read
                                    ? "bg-gray-850 border-yellow-500/30"
                                    : "bg-gray-800/90 border-gray-700/60"
                            }`}
                        >
                            <div className="p-4 space-y-3">
                                {/* Header: Name & Date */}
                                <div className="flex justify-between items-start gap-2">
                                    <div className="flex items-start space-x-2 truncate">
                                        {!msg.is_read && (
                                            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500 flex-shrink-0 mt-1.5"></span>
                                        )}
                                        <div className="truncate">
                                            <h3
                                                className={`font-bold text-base tracking-tight truncate ${!msg.is_read ? "text-white" : "text-gray-300"}`}
                                            >
                                                {msg.name}
                                            </h3>
                                            <p className="text-xs text-gray-500 truncate mt-0.5">
                                                {msg.email}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-[11px] text-gray-500 font-medium whitespace-nowrap mt-0.5">
                                        {formatDate(msg.created_at)}
                                    </span>
                                </div>

                                {/* Subject */}
                                <div className="bg-gray-900/40 p-3 rounded-lg border border-gray-800/60">
                                    <p
                                        className={`text-xs uppercase font-extrabold tracking-wider text-gray-500 mb-1`}
                                    >
                                        Subject
                                    </p>
                                    <p
                                        className={`text-sm tracking-wide ${!msg.is_read ? "text-yellow-400/90 font-semibold" : "text-gray-400"}`}
                                    >
                                        {msg.subject}
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2 pt-2">
                                    <Link
                                        href={route(
                                            "admin.messages.show",
                                            msg.id,
                                        )}
                                        className="flex-1 px-4 py-2.5 bg-gray-700/60 hover:bg-gray-700 text-gray-200 border border-gray-650 rounded-lg transition-colors text-center text-xs font-bold"
                                    >
                                        Open Message
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(msg.id)}
                                        className="flex-1 px-4 py-2.5 bg-red-950/30 hover:bg-red-900/50 text-red-400 border border-red-900/40 rounded-lg transition-colors text-center text-xs font-bold"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Mobile Pagination */}
                    {messages.last_page > 1 && (
                        <div className="flex flex-col items-center space-y-3 pt-2">
                            <p className="text-xs text-gray-400 font-medium">
                                Page{" "}
                                <span className="text-gray-200 font-bold">
                                    {messages.current_page}
                                </span>{" "}
                                of {messages.last_page}
                            </p>
                            <div className="flex space-x-2 w-full max-w-[280px]">
                                {messages.current_page > 1 ? (
                                    <Link
                                        href={route("admin.messages.index", {
                                            page: messages.current_page - 1,
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
                                {messages.current_page < messages.last_page ? (
                                    <Link
                                        href={route("admin.messages.index", {
                                            page: messages.current_page + 1,
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
                {messages.data.length === 0 && (
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
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                        </svg>
                        <p className="text-gray-400 mt-4 text-sm font-medium">
                            No messages found in your inbox.
                        </p>
                        <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                            When clients reach out through the frontend contact
                            section, their correspondence logs will aggregate
                            here.
                        </p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
