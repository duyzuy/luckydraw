import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link, Head } from "@inertiajs/react";
import { PropsWithChildren } from "react";
import bgSky from "@/images/bg-clear-sky.png";
import bgSkyMap from "@/images/admin/backgorund-map.svg";
type FeLayoutProps = PropsWithChildren & {
    title?: string;
    className?: string;
};
const FeLayout: React.FC<FeLayoutProps> = ({
    children,
    title,
    className = "",
}) => {
    return (
        <>
            <Head title={title} />
            <div
                className={`min-h-screen ${className}`}
                style={{
                    backgroundImage: `url(${bgSkyMap})`,
                    backgroundColor: "red",
                    backgroundSize: "cover",
                    backgroundPosition: "center bottom",
                }}
            >
                <div className="main-header py-6">
                    <Link
                        href={route("home.index")}
                        className="block text-center"
                    >
                        <ApplicationLogo
                            color="white"
                            width={300}
                            className="mx-auto mb-4"
                        />
                    </Link>
                </div>
                <div className="main-body container mx-auto">{children}</div>
            </div>
        </>
    );
};
export default FeLayout;
