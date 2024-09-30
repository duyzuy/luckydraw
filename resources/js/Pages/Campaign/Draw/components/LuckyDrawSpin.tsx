import Button3D from "@/Components/Button3D";
import { useMemo, useRef, useState } from "react";
import SpinItem, { SpinNumberHandler } from "./SpinNumberItem";
import styled from "styled-components";
import Text3D from "@/Components/Text3D";

const BASE_DURATION = 12000;

export interface LuckyDrawSpinProps {
    spinItemAmount?: number;
    className?: string;
    onDraw?: (
        onSetSpinValues?: (value: number[], onFinish?: () => void) => void
    ) => void;

    disabled?: boolean;
}
const LuckyDrawSpin: React.FC<LuckyDrawSpinProps> = ({
    spinItemAmount = 4,
    className,
    onDraw,

    disabled = false,
}) => {
    const [isAnimating, setIsAnimating] = useState(false);

    const spinRefs = useRef<SpinNumberHandler[]>([]);

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
                <StyledLuckyDrawSpin className="luckydraw-spin bg-red-600 p-2 w-fit mx-auto rounded-xl mb-6">
                    <div className="luckydraw-spin__inner w-fit p-6">
                        <div className="flex gap-x-2">
                            <div className="flex gap-x-3 text-8xl rounded-md">
                                <div className="bg-white rounded-md px-12 flex items-center justify-center">
                                    <Text3D color="yellow">S</Text3D>
                                </div>
                                <div className="bg-white rounded-md px-12 flex items-center justify-center">
                                    <Text3D color="yellow">K</Text3D>
                                </div>
                                <div className="bg-white rounded-md px-12 flex items-center justify-center">
                                    <Text3D color="yellow">Y</Text3D>
                                </div>
                            </div>
                            {Array.from<number>({ length: spinItemAmount }).map(
                                (item, _index) => (
                                    <SpinItem
                                        key={_index}
                                        duration={BASE_DURATION - 1000 * _index}
                                        ref={(el) => {
                                            if (el) {
                                                spinRefs.current[_index] = el;
                                            }
                                        }}
                                    />
                                )
                            )}
                        </div>
                    </div>
                </StyledLuckyDrawSpin>
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
export default LuckyDrawSpin;

const StyledLuckyDrawSpin = styled("div")`
    & {
        position: relative;
        &::before,
        &::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 16px;
            // z-index: -1;
        }
        &::before {
            inset: -3px;
            background-image: conic-gradient(
                from var(--angle),
                yellow,
                orange,
                white,
                transparent,
                white,
                orange,
                yellow
            );
            animation: draw-spinning linear 8s;
            animation-iteration-count: infinite;
        }
        &::after {
            background: red;
        }

        .luckydraw-spin__inner {
            position: relative;
            border-radius: 16px;
            z-index: 10;
            border-width: 8px;
            border-style: dotted;
            border-color: #ffde02;
        }
    }
`;
// border-[8px] border-yellow-400 border-dotted
