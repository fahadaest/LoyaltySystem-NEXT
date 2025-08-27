import "@/app/globals.css";
import { Poppins } from "next/font/google";
import Image from "next/image";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata = {
    title: "Reward Hive – Sign In",
    description: "Sign in to Reward Hive",
};

export default function AuthLayout({ children }) {
    return (
        <div
            className={`bg-black grid h-screen w-screen grid-cols-1 md:grid-cols-12 overflow-hidden ${poppins.className}`}
        >
            {/* Background Image */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 right-0 z-0 h-screen w-[65vw]"
            >
                <Image
                    src="/img/authentication_layout.svg"
                    alt=""
                    fill
                    priority
                    className="object-cover object-right"
                    sizes="(min-width: 768px) 65vw, 100vw"
                />
            </div>

            {/* LEFT: black panel */}
            <section className="relative hidden md:block md:col-span-6">
                <div className="absolute bottom-12 left-10">
                    <p className="mb-2 text-5xl text-white/90">Welcome to</p>
                    <h1 className="text-6xl font-bold tracking-tight text-white">
                        REWARD HIVE
                    </h1>
                </div>
            </section>

            {/* RIGHT: white panel */}
            <section className="relative md:col-span-6 flex items-start md:items-center justify-center">
                <div className="relative z-10 flex h-full w-full items-start md:items-center justify-center">
                    <div className="w-full max-w-[560px] px-6 pt-10 md:pt-0">
                        {children}
                    </div>
                </div>
            </section>
        </div>
    );
}
