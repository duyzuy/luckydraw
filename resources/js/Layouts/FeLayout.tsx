import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link, Head } from "@inertiajs/react";
import { PropsWithChildren } from "react";
import bgSky from "@/images/bg-sky.jpg";
type FeLayoutProps = PropsWithChildren & {
    title?: string;
};
const FeLayout: React.FC<FeLayoutProps> = ({ children, title }) => {
    return (
        <>
            <Head title={title} />
            <div
                className="min-h-screen flex items-center"
                style={{
                    background: `url(${bgSky})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center 30%",
                }}
            >
                <div className="container mx-auto">{children}</div>
            </div>
        </>
    );
};
export default FeLayout;
