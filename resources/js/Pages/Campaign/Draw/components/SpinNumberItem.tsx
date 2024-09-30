import { forwardRef, memo, Ref, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useImperativeHandle } from "react";

const ROLL_NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const BASE_ROUND = 8;
const BASE_DURATION = 10000;
const STEP_EACH_ITEM = 36;

interface SpinNumberItemProps {
    value?: number;
    duration?: number;
    onFinish?: () => void;
    isSpinning?: boolean;
}
export interface SpinNumberHandler {
    setValue: (value: number) => void;
}
const SpinNumberItem = forwardRef<SpinNumberHandler, SpinNumberItemProps>(
    (
        { value = 0, duration = BASE_DURATION, isSpinning = false, onFinish },
        ref
    ) => {
        const spinItemRef = useRef<HTMLDivElement>(null);

        useImperativeHandle(
            ref,
            () => {
                return {
                    setValue: (spinvalue: number) => {
                        const item = spinItemRef.current;
                        if (!item) return;
                        const indexValue = ROLL_NUMBERS.indexOf(
                            Number(spinvalue)
                        );
                        const rotation =
                            BASE_ROUND * 360 +
                            (indexValue + 1) * STEP_EACH_ITEM;
                        item.animate(
                            [
                                {
                                    transform:
                                        "perspective(1000px) rotateY(0deg) rotateX(0)",
                                },
                                {
                                    transform: `perspective(1000px) rotateY(0deg) rotateX(-${rotation}deg)`,
                                },
                            ],
                            {
                                duration: duration,
                                iterations: 1,
                                easing: "cubic-bezier(0.000, 0.000, 0.005, 0.950)",
                                fill: "forwards",
                            }
                        );
                        const timeOutId = setTimeout(() => {
                            onFinish?.();
                            clearTimeout(timeOutId);
                        }, duration);
                    },
                };
            },
            []
        );
        return (
            <StyledSpinItem>
                <div className="spin-item text-7xl text-yellow-900">
                    <div className="spin-item__inner" ref={spinItemRef}>
                        {ROLL_NUMBERS.map((num, _index) => (
                            <div
                                className={`spin-item__number item-${_index} font-jambono font-bold`}
                                key={`roll-first-${_index}`}
                            >
                                {num}
                            </div>
                        ))}
                    </div>
                </div>
            </StyledSpinItem>
        );
    }
);
export default SpinNumberItem;

const StyledSpinItem = styled.div`
    & {
        position: relative;
        overflow: hidden;
        width: 140px;
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: white;
        border: 3px solid #f1f1f1;
        border-radius: 6px;
        background-color: #990000;
        padding: 2px;

        &::after,
        &::before {
            content: "";
            position: absolute;
            width: 100%;
            height: 10px;
            background-color: #000000;
            filter: blur(2px);
            opacity: 0.6;
            z-index: 2;
        }
        &::after {
            top: -4px;
            box-shadow: inset 0px 2px 6px 0px #000000, 0px 6px 8px 0px #00000085,
                0px 12px 10px 0px #00000038, 0px 18px 16px 0px #00000038;
        }
        &::before {
            bottom: -4px;
            box-shadow: inset 0px -2px 6px 0px #000000,
                0px -6px 8px 0px #00000085, 0px -12px 10px 0px #00000038,
                0px -18px 16px 0px #00000038;
        }
        .spin-item__inner {
            width: 110px;
            height: 110px;
            transform-style: preserve-3d;
            transform: perspective(1000px) rotateY(0deg) rotateX(0);
            .spin-item__number {
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                background: white;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid #f1f1f1;
                border-left-width: 0;
                border-right-width: 0;

                &.item-0 {
                    transform: rotateX(36deg) translateZ(169px);
                }
                &.item-1 {
                    transform: rotateX(72deg) translateZ(169px);
                }
                &.item-2 {
                    transform: rotateX(108deg) translateZ(169px);
                }
                &.item-3 {
                    transform: rotateX(144deg) translateZ(169px);
                }
                &.item-4 {
                    transform: rotateX(180deg) translateZ(169px);
                }
                &.item-5 {
                    transform: rotateX(216deg) translateZ(169px);
                }
                &.item-6 {
                    transform: rotateX(252deg) translateZ(169px);
                }
                &.item-7 {
                    transform: rotateX(288deg) translateZ(169px);
                }
                &.item-8 {
                    transform: rotateX(324deg) translateZ(169px);
                }
                &.item-9 {
                    transform: rotateX(360deg) translateZ(169px);
                }
            }
        }
    }
`;
