import { Link, router } from "@inertiajs/react";
import { PageProps } from "@/types";
import { PrizeGroupType } from "@/models/prizeGroup";
import { PrizeType } from "@/models/prize";
import FeLayout from "@/Layouts/FeLayout";
import LuckyDrawSpin, { LuckyDrawSpinProps } from "./components/LuckyDrawSpin";
import Text3D from "@/Components/Text3D";
import { WinnerType } from "@/models/winner";
import { useState } from "react";
import ModalWinnerList from "./components/ModalWinnerList";
import { CampaignType } from "@/models/campaign";
import Title from "@/Components/Title";
import { useMessage } from "@/hooks/useMessage";
import ModalWinnerDetail from "./components/ModalWinnerDetail";
import { MemberType } from "@/models/member";
import LuckyDrawSpinMultiple from "./components/LuckyDrawSpinMultiple";

type PrizeGroupDetailType = PrizeGroupType & {
    prizes: (PrizeType & { winner: WinnerType })[];
};
type DrawContainerProps = PageProps & {
    campaign: CampaignType;
    prizeGroups: PrizeGroupType[];
    prizeGroup: PrizeGroupDetailType;
    prize?: PrizeType;
    winnerList: WinnerType[] | null;
    members: MemberType[];
};
const DrawContainer: React.FC<DrawContainerProps> = ({
    campaign,
    prizeGroup,
    prizeGroups,
    prize,
    winnerList,
    members,
}) => {
    const [openModalWinnerList, setOpenModalWinnerList] = useState(false);

    const [openModalWinner, setOpenModalWinner] = useState(false);
    const [winner, setWinner] = useState<WinnerType | null>(null);
    const [winners, setWinners] = useState<WinnerType[] | null>(null);

    const message = useMessage();

    const handleOpenModalWinnerList = () => {
        setOpenModalWinnerList(true);
    };
    const handleCloseModalWinnerList = () => {
        setOpenModalWinnerList(false);
    };

    const handleOpenModalWiner = () => {
        setOpenModalWinner(true);
    };
    const handleCloseModalWiner = () => {
        setOpenModalWinner(false);
    };

    const handleDraw: LuckyDrawSpinProps["onDraw"] = (setSpinValue) => {
        if (!prize) {
            message.error("Prize không hợp lệ.");
            return;
        }
        if (prizeGroup.draw_type === "per_one") {
            router.post(
                route("home.campaign.prizeGroup.spin.perOne", [
                    campaign.id,
                    prizeGroup.id,
                ]),

                { prizeId: prize?.id, drawType: prizeGroup.draw_type },
                {
                    preserveScroll: true,
                    onSuccess: ({ props }) => {
                        const { flash } = props;
                        if (flash.winner) {
                            setWinner(flash.winner);
                            let memberCode =
                                flash.winner.member_info.member_code;
                            const luckyNumberArr = memberCode
                                .split("")
                                .splice(3);

                            setSpinValue?.(
                                luckyNumberArr.map((item) => Number(item)),
                                () => {
                                    handleOpenModalWiner();
                                }
                            );
                        }

                        if (flash.error) {
                            message.error(flash.error);
                        }
                    },
                    onError(err) {
                        console.log(err);
                        message.error(err.drawType);
                    },
                }
            );
        }
        if (prizeGroup.draw_type === "all_one") {
            router.post(
                route("home.campaign.prizeGroup.spin.multipleOne", [
                    campaign.id,
                    prizeGroup.id,
                ]),
                { drawType: prizeGroup.draw_type },
                {
                    preserveScroll: true,
                    onSuccess: ({ props }) => {
                        const { flash } = props;
                        if (flash.winner) {
                            setWinners(flash.winners);
                        }

                        if (flash.error) {
                            message.error(flash.error);
                        }
                    },
                    onError(err) {
                        console.log(err);
                        message.error(err.drawType);
                    },
                }
            );
        }
    };

    const handleReDraw = (winnerId: string) => {
        router.patch(
            route("draw.reSpin", [prizeGroup.id]),
            { winnerId: winnerId },
            {
                preserveScroll: true,
            }
        );
    };

    return (
        <FeLayout title={prizeGroup.name}>
            <div className="content">
                <div className="spin-machine">
                    <div className="spin-machine__head text-center">
                        <PrizesBoxInfo
                            prizeGroupName={prizeGroup.name}
                            currentPrize={prize}
                            prizes={prizeGroup.prizes}
                            onViewWinner={handleOpenModalWinnerList}
                            className="rounded-xl w-[450px] mx-auto mb-3"
                        />
                    </div>
                    {prizeGroup.draw_type === "per_one" ? (
                        <LuckyDrawSpin
                            className="mb-12"
                            onDraw={handleDraw}
                            disabled={!prize}
                        />
                    ) : (
                        <LuckyDrawSpinMultiple
                            className="mb-12"
                            onDraw={handleDraw}
                            disabled={!prize}
                            members={members}
                        />
                    )}
                </div>
            </div>
            <div className="prize-navs flex items-center gap-x-6 justify-center bottom-0 py-6">
                {prizeGroups?.map((item) => (
                    <div key={item.id}>
                        <Link
                            href={route("home.campaign.prizeGroup.index", [
                                campaign.id,
                                item.id,
                            ])}
                        >
                            <Title
                                size="small"
                                color={
                                    item.id === prizeGroup?.id
                                        ? "yellow"
                                        : "red"
                                }
                            >
                                {item.name}
                            </Title>
                        </Link>
                    </div>
                ))}
                <Link href={route("home.campaign", [campaign.id])}>
                    <Title size="small">Trở về</Title>
                </Link>
            </div>
            <ModalWinnerList
                winnerList={winnerList || []}
                open={openModalWinnerList}
                prizName={prizeGroup.name}
                onClose={handleCloseModalWinnerList}
            />
            <ModalWinnerDetail
                open={openModalWinner}
                winner={winner ?? undefined}
                prize={prize}
                onClose={handleCloseModalWiner}
                onRedraw={handleReDraw}
            />
        </FeLayout>
    );
};

export default DrawContainer;

interface PrizesBoxInfoProps {
    className?: string;
    prizeGroupName?: string;
    prizes: (PrizeType & { winner: WinnerType })[];
    currentPrize?: PrizeType;
    onViewWinner?: () => void;
}
const PrizesBoxInfo: React.FC<PrizesBoxInfoProps> = ({
    prizeGroupName,
    prizes,
    currentPrize,
    onViewWinner,
    className,
}) => {
    return (
        <div className={`prizes__inner bg-white ${className}`}>
            <div className="py-6">
                <Text3D className="text-5xl font-jambono" color="yellow">
                    {prizeGroupName}
                </Text3D>
            </div>
            <div className="prizes__body px-6 py-4">
                <div className="prize-list flex items-center flex-col h-[150px] overflow-y-auto font-bold">
                    {prizes?.map((item, _index) => (
                        <div
                            key={item.id}
                            className={`flex items-center gap-x-2 border-b mb-2 pb-2 ${
                                item.winner ? "text-red-600" : "text-gray-800"
                            } ${
                                item.id === currentPrize?.id
                                    ? "text-green-600"
                                    : ""
                            }`}
                        >
                            <div className="text-lg flex items-center">
                                <span className="w-8 h-8 mr-2">
                                    <img
                                        src={
                                            item.image
                                                ? `/storage/${item.image}`
                                                : "/images/gift.png"
                                        }
                                    />
                                </span>
                                <span className="block text-left flex-1">
                                    <span className="mr-1">{`${
                                        _index + 1
                                    }.`}</span>
                                    {` ${item.name}`}
                                </span>
                            </div>
                            {/* <div>
                                {item.winner ? <CheckCircleOutlined /> : null}
                            </div> */}
                        </div>
                    ))}
                </div>
                <div className="pt-4">
                    <span className="cursor-pointer" onClick={onViewWinner}>
                        Winners
                    </span>
                </div>
            </div>
        </div>
    );
};
