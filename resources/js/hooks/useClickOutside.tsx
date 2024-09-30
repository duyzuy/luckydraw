import { HtmlHTMLAttributes, useEffect } from "react";

export default function useClickOutside(
    elRef: React.RefObject<HTMLElement | undefined>,
    callback?: () => void
) {
    const handleClickOutSide = (evt: any) => {
        if (elRef.current && !elRef.current.contains(evt.target)) {
            callback?.();
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutSide);
        return () => {
            document.removeEventListener("click", handleClickOutSide);
        };
    }, []);
}
