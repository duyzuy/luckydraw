import Box3D from "@/Components/Box3D";
import Button3D from "@/Components/Button3D";
import { useEffect, useRef, useState } from "react";
import { useForm, router } from "@inertiajs/react";
import ModalWinnerDetail from "./ModalWinnerDetail";
import { PrizeGroupType } from "@/models/prizeGroup";
import { PrizeType } from "@/models/prize";
import { useMessage } from "@/hooks/useMessage";
import { WinnerType } from "@/models/winner";
const ROLL_NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const BASE_ROUND = 8;
const BASE_DURATION = 10000;

interface LuckyDrawSpinProps {
    value?: string;
    className?: string;
    winnerCode?: number;
    onDraw?: () => void;
    prizeGroup: PrizeGroupType;
    prize?: PrizeType;
    winner?: WinnerType;
}
const LuckyDrawSpin: React.FC<LuckyDrawSpinProps> = ({
    value,
    className,
    onDraw,
    prizeGroup,
    prize,
    winner,
}) => {
    const spinItemFirstRef = useRef<HTMLDivElement>(null);
    const spinItemSecondRef = useRef<HTMLDivElement>(null);
    const spinItemThirdRef = useRef<HTMLDivElement>(null);
    const spinItemFourthRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const message = useMessage();

    const openModalWinner = () => {
        setOpenModal(true);
    };
    const clsoeModal = () => {
        setOpenModal(false);
    };
    useEffect(() => {
        const firstItem = spinItemFirstRef.current;
        const secondItem = spinItemSecondRef.current;
        const thirdItem = spinItemThirdRef.current;
        const fourthItem = spinItemFourthRef.current;

        if (
            !firstItem ||
            !secondItem ||
            !thirdItem ||
            !fourthItem ||
            !isAnimating ||
            !winner
        ) {
            return;
        }

        const [firstNum, secondNum, thirdNum, fourthNum] =
            winner.member_info.member_code.replace("SKY", "").trim().split("");

        const totalRollLength = BASE_ROUND * ROLL_NUMBERS.length;
        const perRollPercent = 100 / totalRollLength;
        const startOfLastRoll =
            (BASE_ROUND - 1) * ROLL_NUMBERS.length * perRollPercent;

        const fistNumIndex = ROLL_NUMBERS.indexOf(Number(firstNum));
        const secondNumIndex = ROLL_NUMBERS.indexOf(Number(secondNum));
        const thirdNumIndex = ROLL_NUMBERS.indexOf(Number(thirdNum));
        const fourthNumIndex = ROLL_NUMBERS.indexOf(Number(fourthNum));

        const firstTranslateYPercent =
            startOfLastRoll + fistNumIndex * perRollPercent;
        const secondTranslateYPercent =
            startOfLastRoll + secondNumIndex * perRollPercent;
        const thirdTranslateYPercent =
            startOfLastRoll + thirdNumIndex * perRollPercent;
        const fourthTranslateYPercent =
            startOfLastRoll + fourthNumIndex * perRollPercent;

        firstItem.animate(
            [
                { transform: "translateY(0)" },
                {
                    transform: `translateY(-${firstTranslateYPercent}%)`,
                },
            ],
            {
                duration: BASE_DURATION - 6000,
                iterations: 1,
                easing: "cubic-bezier(0.000, 0.000, 0.005, 0.950)",
                fill: "forwards",
            }
        );
        secondItem.animate(
            [
                { transform: "translateY(0)" },
                { transform: `translateY(-${secondTranslateYPercent}%)` },
            ],
            {
                duration: BASE_DURATION - 4000,
                iterations: 1,
                easing: "cubic-bezier(0.000, 0.000, 0.005, 0.950)",
                fill: "forwards",
            }
        );
        thirdItem.animate(
            [
                { transform: "translateY(0)" },
                { transform: `translateY(-${thirdTranslateYPercent}%)` },
            ],
            {
                duration: BASE_DURATION - 2000,
                iterations: 1,
                easing: "cubic-bezier(0.000, 0.000, 0.005, 0.950)",
                fill: "forwards",
            }
        );
        fourthItem.animate(
            [
                { transform: "translateY(0)" },
                { transform: `translateY(-${fourthTranslateYPercent}%)` },
            ],
            {
                duration: BASE_DURATION,
                iterations: 1,
                easing: "cubic-bezier(0.000, 0.000, 0.005, 0.950)",
                fill: "forwards",
            }
        );
        const timeOutId = setTimeout(() => {
            openModalWinner();
            setIsAnimating(false);
            clearTimeout(timeOutId);
        }, BASE_DURATION);

        // spinItemRef.current.style.translate = "-300%";

        return () => clearTimeout(timeOutId);
    }, [isAnimating, winner]);

    const createSetRoll = (numSet: number) => {
        const SETROLL = Array.from({ length: numSet }, (v, k) => {
            return ROLL_NUMBERS;
        });
        return SETROLL.reduce<number[]>((acc, item) => {
            return [...acc, ...item];
        }, []);
    };

    const handleDraw = () => {
        if (!prize) {
            message.error("Prize không hợp lệ.");
            return;
        }
        router.post(
            route("draw.spin", [prizeGroup.id]),
            { prizeId: prize?.id },
            {
                onSuccess: () => {
                    setIsAnimating(true);
                },
            }
        );
    };
    const handleReDraw = (winnerId: string) => {
        router.patch(
            route("draw.reSpin", [prizeGroup.id]),
            { winnerId: winnerId },
            {
                onSuccess: () => {
                    setIsAnimating(true);
                },
            }
        );
    };
    return (
        <>
            <div className="luckydraw-container">
                <div className="luckydraw-spin bg-red-600 p-2 w-fit mx-auto rounded-xl shadow-lg mb-6">
                    <div className="luckydraw-spin bg-red-600 w-fit p-6 border-[10px] border-yellow-400 border-dotted">
                        <div className="luckydraw-spin__inner flex items-center justify-center font-jambono gap-x-2 font-bold text-yellow-900">
                            <Box3D className="spin-item w-36 h-36 text-8xl bg-yellow-400 rounded-md flex items-center justify-center">
                                S
                            </Box3D>

                            <Box3D className="spin-item w-36 h-36 text-8xl bg-yellow-400 rounded-md flex items-center justify-center">
                                K
                            </Box3D>
                            <Box3D className="spin-item w-36 h-36 text-8xl bg-yellow-400 rounded-md flex items-center justify-center">
                                Y
                            </Box3D>
                            <Box3D className="spin-item w-36 h-36 text-8xl bg-yellow-400 rounded-md overflow-hidden">
                                <div
                                    className="spin-item__inner"
                                    ref={spinItemFirstRef}
                                >
                                    {createSetRoll(BASE_ROUND).map(
                                        (num, _index) => (
                                            <div
                                                className="num-item w-36 h-36 border-b-2 border-red-600 flex items-center justify-center"
                                                key={`roll-first-${_index}`}
                                            >
                                                {num}
                                            </div>
                                        )
                                    )}
                                </div>
                            </Box3D>
                            <Box3D className="spin-item w-36 h-36 text-8xl bg-yellow-400 rounded-md overflow-hidden">
                                <div
                                    className="spin-item__inner"
                                    ref={spinItemSecondRef}
                                >
                                    {createSetRoll(BASE_ROUND).map(
                                        (num, _index) => (
                                            <div
                                                className="num-item w-36 h-36 border-b-2 border-red-600 flex items-center justify-center"
                                                key={`roll-second-${_index}`}
                                            >
                                                {num}
                                            </div>
                                        )
                                    )}
                                </div>
                            </Box3D>
                            <Box3D className="spin-item w-36 h-36 text-8xl bg-yellow-400 rounded-md overflow-hidden">
                                <div
                                    className="spin-item__inner"
                                    ref={spinItemThirdRef}
                                >
                                    {createSetRoll(BASE_ROUND).map(
                                        (num, _index) => (
                                            <div
                                                className="num-item w-36 h-36 border-b-2 border-red-600 flex items-center justify-center"
                                                key={`roll-third-${_index}`}
                                            >
                                                {num}
                                            </div>
                                        )
                                    )}
                                </div>
                            </Box3D>
                            <Box3D className="spin-item w-36 h-36 text-8xl bg-yellow-400 rounded-md overflow-hidden">
                                <div
                                    className="spin-item__inner"
                                    ref={spinItemFourthRef}
                                >
                                    {createSetRoll(BASE_ROUND).map(
                                        (num, _index) => (
                                            <div
                                                className="num-item w-36 h-36 border-b-2 border-red-600 flex items-center justify-center"
                                                key={`roll-fourth-${_index}`}
                                            >
                                                {num}
                                            </div>
                                        )
                                    )}
                                </div>
                            </Box3D>
                        </div>
                    </div>
                </div>
                <div className="luckydraw-actions flex items-center justify-center">
                    <Button3D
                        onClick={handleDraw}
                        disabled={!prize || isAnimating}
                    >
                        Quay ngay
                    </Button3D>
                </div>
            </div>
            <ModalWinnerDetail
                open={openModal}
                winner={winner}
                prize={prize}
                onClose={clsoeModal}
                onRedraw={handleReDraw}
            />
        </>
    );
};
export default LuckyDrawSpin;
