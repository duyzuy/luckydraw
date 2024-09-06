import { Image } from "antd";
import { SVGAttributes } from "react";
import logo from "@/images/logo-red.svg";

export default function ApplicationLogo({ className }: { className?: string }) {
    return <Image src={logo} width={160} />;
}
