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
        <ButtonStyled className={className} {...rest}>
            <div className="button-content">
                <span className="button-content__text font-jambono text-4xl">
                    {children}
                </span>
            </div>
        </ButtonStyled>
    );
};
export default Button3D;

const ButtonStyled = styled.button`
    & {
        background: #ffcb2c;
        border: 2px solid #c08d32;
        cursor: pointer;
        border-radius: 10px;
        outline: none;
        padding: 0;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15),
            5px 14px 20px rgba(0, 0, 0, 0.15);
        transition: all 0.1s ease-in-out;

        .button-content {
            padding: 16px 60px;
            border-radius: 8px;
            box-shadow: inset 0 -6px #c08d33, 0 -2px #ffcb2c;
            transition: all 0.1s ease-in-out;

            .button-content__text {
                color: #875017;
                display: block;
                transform: translate3d(0, -4px, 0);
                transition: all 0.1s ease-in-out;
            }
        }
        &:active {
            box-shadow: none;
            .button-content {
                box-shadow: none;
            }
            .button-content__text {
                transform: translate3d(0, 0, 0);
            }
        }
        &:disabled {
            background-color: #e6e6e6;
            border-color: #969696;
            pointer-events: none;
            .button-content {
                box-shadow: inset 0 -6px #969696, 0 -2px #e6e6e6;
                .button-content__text {
                    color: #565656;
                    opacity: 0.6;
                }
            }
        }
    }
`;
