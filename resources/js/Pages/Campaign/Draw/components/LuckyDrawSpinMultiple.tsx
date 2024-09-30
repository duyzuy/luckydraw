import Button3D from "@/Components/Button3D";
import React, { useMemo, useRef, useState } from "react";
import { SpinNumberHandler } from "./SpinNumberItem";
import styled, { keyframes } from "styled-components";

import { MemberType } from "@/models/member";

const BASE_DURATION = 12000;

export interface LuckyDrawSpinMultipleProps {
    spinItemAmount?: number;

    members?: MemberType[];
    className?: string;
    onDraw?: (
        onSetSpinValues?: (value: number[], onFinish?: () => void) => void
    ) => void;
    disabled?: boolean;
}
const LuckyDrawSpinMultiple: React.FC<LuckyDrawSpinMultipleProps> = ({
    spinItemAmount = 4,
    className,
    onDraw,
    members,
    disabled = false,
}) => {
    const [isAnimating, setIsAnimating] = useState(false);

    const spinRefs = useRef<SpinNumberHandler[]>([]);

    const stackMemberList = useMemo(() => {
        let count = 0;
        let index = 0;

        return members?.reduce<{ [key: string]: MemberType[] }>(
            (acc, member) => {
                if (count < 36) {
                    acc = {
                        ...acc,
                        [index]: [...(acc[index] ? acc[index] : []), member],
                    };
                } else {
                    index++;
                    count = 0;
                    acc = {
                        ...acc,
                        [index]: [member],
                    };
                }
                count++;
                return acc;
            },
            {}
        );
    }, [members]);

    const handleSpin = () => {
        onDraw?.((value, onFinish) => {
            setIsAnimating(true);
            spinRefs.current.forEach((item, index) => {
                item.setValue(value[index]);
            });
            const timeoutId = setTimeout(() => {
                onFinish?.();
                setIsAnimating(false);
                clearTimeout(timeoutId);
            }, BASE_DURATION);
        });
    };

    return (
        <>
            <div className={`luckydraw-spin ${className}`}>
                <StyledLuckyDrawSpinMultiple className="luckydraw-spin bg-red-600 p-2 w-fit mx-auto rounded-xl mb-6">
                    <div className="elipse flex items-center gap-x-8">
                        {stackMemberList &&
                            Object.entries(stackMemberList).map(
                                ([key, memberList], _indexRoll) => (
                                    <React.Fragment key={key}>
                                        {_indexRoll < 12 ? (
                                            <div
                                                key={key}
                                                className="elipse-items"
                                            >
                                                {memberList.map(
                                                    (member, _index) => (
                                                        <div
                                                            key={member.id}
                                                            className="elipse-item flex items-center justify-center"
                                                            style={{
                                                                transform: `rotateX(${
                                                                    _index * 10
                                                                }deg) translateZ(230px)`,
                                                            }}
                                                        >
                                                            <span className="flex items-center justify-center font-jambono relative z-10">
                                                                {
                                                                    member.member_code
                                                                }
                                                            </span>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        ) : null}
                                    </React.Fragment>
                                )
                            )}
                    </div>
                </StyledLuckyDrawSpinMultiple>
                <div className="luckydraw-actions flex items-center justify-center">
                    <Button3D
                        onClick={handleSpin}
                        disabled={disabled || isAnimating}
                    >
                        Quay ngay
                    </Button3D>
                </div>
            </div>
        </>
    );
};
export default LuckyDrawSpinMultiple;

const animatedRotation = keyframes`
 0% { transform: perspective(800px) rotateY(0) rotateX(0); }
 100% { transform: perspective(800px) rotateY(0) rotateX(-360deg); }
`;

const StyledLuckyDrawSpinMultiple = styled("div")`
    & {
        position: relative;
        height: 450px;
        display: flex;
        align-items: center;
        .elipse {
            transform-style: preserve-3d;
            transform-origin: center;

            .elipse-items {
                position: ralative;
                width: 80px;
                height: 40px;
                transform-style: preserve-3d;
                transform: perspective(800px);
                animation: ${animatedRotation} linear 180s infinite;
                .elipse-item {
                    position: absolute;
                    inset: 0;
                    background: white;
                    border: 1px solid #f1f1f1;
                }
            }
            .elipse-items:nth-child(1) {
                animation-duration: 280s;
            }
            .elipse-items:nth-child(2) {
                animation-duration: 240s;
            }
            .elipse-items:nth-child(3) {
                animation-duration: 200s;
            }
            .elipse-items:nth-child(4) {
                animation-duration: 180s;
            }
            .elipse-items:nth-child(5) {
                animation-duration: 160s;
            }
            .elipse-items:nth-child(6) {
                animation-duration: 120s;
            }
            .elipse-items:nth-child(7) {
                animation-duration: 140s;
            }
            .elipse-items:nth-child(8) {
                animation-duration: 100s;
            }
            .elipse-items:nth-child(9) {
                animation-duration: 80s;
            }
            .elipse-items:nth-child(10) {
                animation-duration: 200s;
            }
            .elipse-items:nth-child(11) {
                animation-duration: 200s;
            }
            .elipse-items:nth-child(12) {
                animation-duration: 260s;
            }
        }
    }
`;
// border-[8px] border-yellow-400 border-dotted
