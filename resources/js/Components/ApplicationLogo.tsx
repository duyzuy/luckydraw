import { SVGAttributes } from "react";
import logo from "@/images/logo-red.svg";
import logoWhite from "@/images/logo-white.svg";
import { Link } from "@inertiajs/react";

type ApplicationLogoProps = {
    width?: number;
    height?: number;
    className?: string;
    color?: "white" | "red";
};
export default function ApplicationLogo({
    className,
    width = 160,
    height = 100,
    color = "red",
}: ApplicationLogoProps) {
    return (
        <img
            src={color === "red" ? logo : logoWhite}
            width={width}
            height={height}
            className={className}
        />
    );
}
