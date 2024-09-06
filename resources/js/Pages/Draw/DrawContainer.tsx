import { Link, Head, InertiaLinkProps } from "@inertiajs/react";
import { PageProps } from "@/types";
import { PrizeGroupType } from "@/models/prizeGroup";
import { PrizeType } from "@/models/prize";
import FeLayout from "@/Layouts/FeLayout";
import LuckyDrawSpin from "./components/LuckyDrawSpin";
import { MemberType } from "@/models/member";
import Text3D from "@/Components/Text3D";
import { WinnerType } from "@/models/winner";
import { CheckCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import ModalWinnerList from "./components/ModalWinnerList";

type DrawContainerProps = PageProps & {
    // prizeGroups: PrizeGroupType[];
    prizeGroup: PrizeGroupType;
    prizes: (PrizeType & {
        winner:
            | (WinnerType & {
                  member_info: MemberType;
              })
            | null;
    })[];
    flash: { error: string | null; success: string | null };
    prize?: PrizeType;
    winner?: WinnerType;
    winnerList: { [key: string]: WinnerType[] };
    share: {
        prizeGroups: PrizeGroupType[];
    };
};
const DrawContainer: React.FC<DrawContainerProps> = ({
    prizeGroup,
    // prizeGroups,
    prizes,
    flash,
    prize,
    winner,
    winnerList,
    share: { prizeGroups },
}) => {
    const [openModalWinnerList, setOpenModalWinnerList] = useState(false);

    const winnerListByGroupPrize = useMemo(() => {
        return winnerList[prizeGroup.id];
    }, [winnerList]);

    const handleOpenModalWinnerList = () => {
        setOpenModalWinnerList(true);
    };
    return (
        <FeLayout title={prizeGroup.name}>
            <div className="content">
                <div className="spin-merchine">
                    <div className="spin-merchine__head text-center">
                        <div className="spin-merchine__title">
                            <Text3D
                                className="text-7xl font-jambono mb-6"
                                color="yellow"
                            >
                                Lucky draw
                            </Text3D>
                        </div>
                        <div className="prizes font-jambono flex items-center justify-center">
                            <div className="prizes__inner bg-white rounded-xl w-[450px]">
                                <div className="prizes__head bg-red-600 w-fit py-2 px-8 mx-auto rounded-b-3xl">
                                    <span className="text-white text-3xl">
                                        {prizeGroup.name}
                                    </span>
                                </div>
                                <div className="prizes__body px-6 py-4">
                                    <div className="prize-list flex items-center flex-col h-[150px] overflow-y-auto">
                                        {prizes.map((item, _index) => (
                                            <div
                                                key={item.id}
                                                className={`flex items-center gap-x-2 border-b mb-2 pb-2 ${
                                                    item.winner
                                                        ? "text-red-600"
                                                        : "text-gray-800"
                                                }`}
                                            >
                                                <div className="text-lg flex">
                                                    <span className="mr-3">{`${
                                                        _index + 1
                                                    }.`}</span>
                                                    <span className="block text-left">{` ${item.name}`}</span>
                                                </div>
                                                <div>
                                                    {item.winner ? (
                                                        <CheckCircleOutlined />
                                                    ) : null}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        <div>
                                            {!prize ? (
                                                <span
                                                    className="cursor-pointer"
                                                    onClick={
                                                        handleOpenModalWinnerList
                                                    }
                                                >
                                                    Winners
                                                </span>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="spin-merchine__container mb-12">
                        <LuckyDrawSpin
                            prizeGroup={prizeGroup}
                            prize={prize}
                            winner={winner}
                        />
                    </div>
                </div>
                <div className="prize-navs flex items-center gap-x-6 justify-center absolute bottom-0 py-2">
                    {prizeGroups?.map((item) => (
                        <div key={item.id}>
                            <Link href={route("draw.index", item.id)}>
                                <span className="text-lg font-jambono">
                                    <Text3D
                                        className="text-3xl hover:scale-110 transition-all"
                                        color={
                                            item.id === prizeGroup.id
                                                ? "yellow"
                                                : "red"
                                        }
                                    >
                                        {item.name}
                                    </Text3D>
                                </span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <ModalWinnerList
                winnerList={winnerListByGroupPrize}
                open={openModalWinnerList}
                prizName={prizeGroup.name}
                onClose={() => setOpenModalWinnerList(false)}
            />
        </FeLayout>
    );
};

export default DrawContainer;
