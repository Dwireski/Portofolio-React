import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Head title="Log in" />
            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-950">
                <div className="w-full sm:max-w-md mt-6 px-8 py-10 bg-gray-900/50 backdrop-blur-md shadow-2xl border border-gray-800 overflow-hidden sm:rounded-3xl">
                    <div className="text-center mb-8">
                        <Link
                            href="/"
                            className="text-3xl font-black text-yellow-400 uppercase tracking-tighter"
                        >
                            Reski<span className="text-white">.</span>
                        </Link>
                        <p className="text-gray-400 text-sm mt-2 font-medium">
                            Welcome back, please login to your dashboard.
                        </p>
                    </div>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-400">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <div>
                            <InputLabel
                                htmlFor="email"
                                value="Email Address"
                                className="text-gray-400"
                            />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-2 block w-full bg-gray-950 border-gray-800 text-white focus:border-yellow-400 focus:ring-yellow-400 rounded-xl py-3"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-6">
                            <InputLabel
                                htmlFor="password"
                                value="Password"
                                className="text-gray-400"
                            />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-2 block w-full bg-gray-950 border-gray-800 text-white focus:border-yellow-400 focus:ring-yellow-400 rounded-xl py-3"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                    className="rounded border-gray-700 bg-gray-950 text-yellow-400 focus:ring-yellow-400"
                                />
                                <span className="ms-2 text-sm text-gray-400">
                                    Remember me
                                </span>
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="text-sm text-gray-500 hover:text-yellow-400 transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            )}
                        </div>

                        <div className="mt-8">
                            <PrimaryButton
                                className="w-full flex justify-center py-4 bg-yellow-400 hover:bg-yellow-500 text-gray-950 rounded-xl font-black text-sm tracking-wide uppercase transition-all"
                                disabled={processing}
                            >
                                {processing ? "Authenticating..." : "Log in"}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
