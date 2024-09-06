import React, { PropsWithChildren } from "react";
import styled from "styled-components";

type Text3DProps = PropsWithChildren & {
    className?: string;
    color?: "red" | "yellow";
};
const Text3D: React.FC<Text3DProps> = ({
    children,
    className = "",
    color = "red",
}) => {
    return color === "red" ? (
        <Text3DRedStyled className={className}>{children}</Text3DRedStyled>
    ) : (
        <Text3DYellowStyled className={className}>
            {children}
        </Text3DYellowStyled>
    );
};
export default Text3D;

const Text3DRedStyled = styled.h3`
    & {
        text-transform: uppercase;
        font-weight: 700;
        color: #ff0000;
        text-shadow: 1px 1px 1px #bd0000, 1px 2px 1px #bd0000,
            1px 3px 1px #bd0000, 1px 4px 1px #bd0000, 1px 5px 1px #bd0000,
            1px 6px 1px #bd0000, 1px 7px 1px #bd0000, 1px 8px 1px #bd0000,
            1px 9px 1px #bd0000, 1px 10px 1px #bd0000,
            1px 18px 6px rgba(16, 16, 16, 0.2),
            1px 16px 10px rgba(16, 16, 16, 0.2),
            1px 15px 30px rgba(16, 16, 16, 0.2),
            1px 20px 40px rgba(16, 16, 16, 0);
    }
`;

const Text3DYellowStyled = styled.h3`
    & {
        text-transform: uppercase;
        font-weight: 700;
        color: #ffde00;
        text-shadow: 1px 1px 1px #e77900, 1px 2px 1px #e77900,
            1px 3px 1px #e77900, 1px 4px 1px #e77900, 1px 5px 1px #e77900,
            1px 6px 1px #e77900, 1px 7px 1px #e77900, 1px 8px 1px #e77900,
            1px 9px 1px #e77900, 1px 10px 1px #e77900,
            1px 18px 6px rgba(16, 16, 16, 0.2),
            1px 16px 10px rgba(16, 16, 16, 0.2),
            1px 15px 30px rgba(16, 16, 16, 0.2),
            1px 20px 40px rgba(16, 16, 16, 0);
    }
`;
