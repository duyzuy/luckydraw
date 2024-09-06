import React, { PropsWithChildren } from "react";
import styled from "styled-components";
type Box3DProps = PropsWithChildren & {
    className?: string;
};
const Box3D: React.FC<Box3DProps> = ({ children, className = "" }) => {
    return <StyledBox className={className}>{children}</StyledBox>;
};
export default Box3D;
const StyledBox = styled.div`
    & {
        touch-action: manipulation;
        cursor: pointer;
        position: relative;
        transition: all 150ms ease-in-out;
        border: 1px solid #cc1312;
        background-image: linear-gradient(-180deg, #fff141 0%, #fe9313 100%);
        box-shadow: 0 0.2rem 0.1rem 0 rgba(0, 0, 0, 0.2),
            0 -0.125rem 0.75rem rgb(227 0 0) inset,
            0 0.375rem 0.125rem rgba(255, 255, 255, 0.4) inset,
            0 0.125rem 0.25rem 0 rgb(212 148 21) inset;

        &::before {
            content: "";
            display: block;
            height: 0.125rem;
            position: absolute;
            top: 0.25rem;
            left: 50%;
            transform: translateX(-50%);
            width: calc(100% - 3.75rem);
            background: #fff;
            border-radius: 100%;

            opacity: 0.7;
            background-image: linear-gradient(
                -270deg,
                rgba(255, 255, 255, 0) 0%,
                #ffffff 20%,
                #ffffff 80%,
                rgba(255, 255, 255, 0) 100%
            );
        }
        &::after {
            content: "";
            display: block;
            height: 0.125rem;
            position: absolute;
            bottom: 0.375rem;
            left: 50%;
            transform: translateX(-50%);
            width: calc(100% - 3.75rem);
            background: #fff;
            border-radius: 100%;

            filter: blur(1px);
            opacity: 0.05;
            background-image: linear-gradient(
                -270deg,
                rgba(255, 255, 255, 0) 0%,
                #ffffff 20%,
                #ffffff 80%,
                rgba(255, 255, 255, 0) 100%
            );
        }
        // span {
        //     color: #000;
        //     background-image: linear-gradient(
        //         0deg,
        //         #ee82da -10%,
        //         #fefafd 100%
        //     );
        //     -webkit-background-clip: text;
        //     background-clip: text;
        //     filter: drop-shadow(0 2px 2px hsla(290, 100%, 20%, 1));
        // }
    }
`;
