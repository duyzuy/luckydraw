import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-red-700 bg-[url('/images/admin/backgorund-map.svg')]">
            <div className="text-center">
                <Link href="/">
                    <ApplicationLogo className="w-64" color="white" />
                </Link>
                <span className="font-jambono text-white text-xl uppercase">
                    Digital Event cms
                </span>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
