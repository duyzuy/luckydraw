import { PropsWithChildren } from "react";

export type TitleProps = PropsWithChildren & {
    title?: string;
    size?: "small" | "medium" | "large";
    className?: string;
    color?: "red" | "yellow";
};
const Title: React.FC<TitleProps> = ({
    children,
    title,
    size = "medium",
    color = "yellow",
    className,
}) => {
    let classes = `text-4xl leading-[4rem] ${className}`;

    if (size === "large") {
        classes = `text-5xl leading-[5rem] ${className}`;
    }
    if (size === "small") {
        classes = `text-3xl leading-[2.5rem] ${className}`;
    }
    return (
        <h4
            className={`uppercase font-jambono text-white font-bold drop-shadow-md ${classes}`}
            style={{
                WebkitTextStrokeWidth: "2px",
                WebkitTextFillColor: color === "yellow" ? "#ffde02" : "red",
                WebkitTextStrokeColor:
                    color === "yellow" ? "#875017" : "rgb(0,0,0, 0.3)",
            }}
        >
            {title ? title : children}
        </h4>
    );
};
export default Title;
