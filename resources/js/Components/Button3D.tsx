import React, { ButtonHTMLAttributes, PropsWithChildren } from "react";
import styled from "styled-components";
type Button3DProps = PropsWithChildren &
    ButtonHTMLAttributes<HTMLButtonElement> & {
        className?: string;
    };
const Button3D: React.FC<Button3DProps> = ({
    children,
    className,
    ...rest
}) => {
    return (
        <>
            <ButtonStyled className={className} {...rest}>
                <div className="button-content">
                    <span className="button-content__text font-jambono text-4xl">
                        {children}
                    </span>
                </div>
            </ButtonStyled>
        </>
    );
};
export default Button3D;

const ButtonStyled = styled.button`
    & {
        // background: linear-gradient(to bottom, #ffdc04, #f7a914);
        // border: 1px solid #c08d32;
        cursor: pointer;
        // border-radius: 16px;
        outline: none;
        // padding: 0;
        // box-shadow: 0 8px 0px rgba(0, 0, 0, 0.25),
        //     5px 14px 20px rgba(0, 0, 0, 0.15);
        // transition: all 0.1s ease-in-out;
        // position: relative;
        perspective: 800px;

        .button-content {
            position: relative;
            background: linear-gradient(to bottom, #ffdc04, #f7a914);
            transform: rotateX(35deg);
            z-index: 1;
            padding: 24px 60px;
            border-radius: 12px;
            box-shadow: inset 0 -14px 4px 0px #f27805, 0 -6px #ffdc04,
                0 8px 0px 4px #e50000, 0 20px 0px 3px #a00000,
                0 20px 10px 1px #000000ab;
            transition: all 0.1s ease-in-out;

            &::after,
            &::before {
                content: "";
                position: absolute;
                background: white;
                transition: all 0.1s ease-in-out;
                opacity: 0.8;
                filter: blur(2px);
                height: 4px;
                left: 50%;
                transform: translateX(-50%);
            }
            &::after {
                width: 40%;
                border-radius: 100%;
            }
            &::before {
                top: -4px;
                width: 60%;
            }

            .button-content__text {
                color: #6c4700;
                display: block;
                transform: translate3d(0, -8px, 0);
                transition: all 0.1s ease-in-out;
            }
        }
        &:active {
            box-shadow: none;
            .button-content {
                box-shadow: inset 0 0px #c08d33, 0 0px #ffdc04,
                    0 8px 0px 4px #e50000, 0 20px 0px 3px #a00000,
                    0 20px 10px 1px #000000ab;

                &::after {
                    width: 60%;
                    transform: translateX(-50%) translateY(16px);
                }
                &::before {
                    width: 80%;
                    transform: translateX(-50%) translateY(4px);
                }
            }
            .button-content__text {
                transform: translate3d(0, 0, 0);
            }
        }
        &:disabled {
            pointer-events: none;
            cursor: none;
            .button-content {
                .button-content__text {
                    color: #565656;
                    opacity: 0.6;
                }
            }
        }
    }
`;
