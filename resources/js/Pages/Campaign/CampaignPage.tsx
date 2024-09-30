import { useMemo, useState } from "react";
import { Link, router } from "@inertiajs/react";
import Confetti from "react-confetti";
import { PageProps } from "@/types";
import { PrizeGroupType } from "@/models/prizeGroup";
import { PrizeType } from "@/models/prize";
import FeLayout from "@/Layouts/FeLayout";
import { MemberType } from "@/models/member";
import Text3D from "@/Components/Text3D";
import { WinnerType } from "@/models/winner";
import { CampaignType } from "@/models/campaign";
import MemberList from "./components/MemberList";
import Button3D from "@/Components/Button3D";
import AmyLotery from "@/images/amy-lottery.png";
import PrizeGroupList from "./components/PrizeGroupList";
import WinnerList from "./components/WinnerList";
import Card3D from "@/Components/Card3D";

import ApplicationLogo from "@/Components/ApplicationLogo";

type CampaignPageProps = PageProps & {
    campaign: CampaignType;
    members: MemberType[];
    prizeGroups?: (PrizeGroupType & { prizes: PrizeType[] })[];
    winners: WinnerType[];
};
type TAB_TYPES = "campaignInfo" | "memberList" | "prizeList" | "winnerList";
const CampaignPage: React.FC<CampaignPageProps> = ({
    prizeGroups,
    members,
    campaign,
    winners,
}) => {
    const [tabName, setTabName] = useState<TAB_TYPES>("memberList");
    const groupItem = useMemo(() => {
        return prizeGroups ? prizeGroups[prizeGroups.length - 1] : undefined;
    }, []);

    const onChangeTab = (tabName: TAB_TYPES) => {
        setTabName(tabName);
    };

    const onStart = () => {
        router.get(
            route("home.campaign.prizeGroup.index", [
                campaign.id,
                groupItem?.id,
            ])
        );
    };
    return (
        <FeLayout title={campaign.name}>
            <div className="campaign-page">
                <div className="spin-merchine">
                    <div className="campaign-page__body">
                        <div className="flex">
                            <div className="w-1/2 pr-12 flex flex-col gap-3">
                                <Text3D
                                    className="text-6xl text-center"
                                    color="yellow"
                                >
                                    {campaign.name}
                                </Text3D>
                                <div className="campaign-thumbnail mb-6">
                                    <div className="campaign-thumbnail h-[30vh]">
                                        <img
                                            src={
                                                campaign?.image
                                                    ? `/storage/${campaign.image}`
                                                    : AmyLotery
                                            }
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <div className="text-center">
                                        <Button3D
                                            className="w-fit"
                                            onClick={onStart}
                                        >
                                            Bắt đầu
                                        </Button3D>
                                    </div>
                                </div>
                                <div className="tab-list grid grid-cols-2 gap-6">
                                    <CampaignTab
                                        onClick={() =>
                                            onChangeTab("memberList")
                                        }
                                        active={tabName === "memberList"}
                                        title="Danh sách tham dự"
                                    />
                                    <CampaignTab
                                        onClick={() => onChangeTab("prizeList")}
                                        active={tabName === "prizeList"}
                                        title="Giải thưởng"
                                    />
                                    <CampaignTab
                                        onClick={() =>
                                            onChangeTab("campaignInfo")
                                        }
                                        active={tabName === "campaignInfo"}
                                        title="Thông tin chung"
                                    />
                                    <CampaignTab
                                        onClick={() =>
                                            onChangeTab("winnerList")
                                        }
                                        active={tabName === "winnerList"}
                                        title="Winner"
                                    />
                                </div>
                            </div>
                            <div className="w-1/2">
                                {tabName === "memberList" && (
                                    <Card3D
                                        title="Danh sách tham dự"
                                        render={<MemberList items={members} />}
                                    />
                                )}
                                {tabName === "prizeList" && (
                                    <Card3D
                                        title=" Giải thưởng"
                                        render={
                                            <PrizeGroupList
                                                items={prizeGroups || []}
                                            />
                                        }
                                    />
                                )}
                                {tabName === "winnerList" && (
                                    <Card3D
                                        title="Winner"
                                        render={
                                            <>
                                                <Confetti
                                                    className="w-full h-full pointer-events-none"
                                                    gravity={0.01}
                                                    friction={1}
                                                    wind={0.01}
                                                    onConfettiComplete={(
                                                        confetti
                                                    ) => {
                                                        // setParty(false)
                                                        // confetti?.reset();
                                                    }}
                                                    recycle={true}
                                                    run={true}
                                                    numberOfPieces={300}
                                                />
                                                <WinnerList items={winners} />
                                            </>
                                        }
                                    />
                                )}
                                {tabName === "campaignInfo" && (
                                    <Card3D
                                        title="Thông tin chung"
                                        render={
                                            <>
                                                <div className="text-lg">
                                                    What is Lorem Ipsum? Lorem
                                                    Ipsum is simply dummy text
                                                    of the printing and
                                                    typesetting industry. Lorem
                                                    Ipsum has been the
                                                    industry's standard dummy
                                                    text ever since the 1500s,
                                                    when an unknown printer took
                                                    a galley of type and
                                                    scrambled it to make a type
                                                    specimen book. It has
                                                    survived not only five
                                                    centuries, but also the leap
                                                    into electronic typesetting,
                                                    remaining essentially
                                                    unchanged. It was
                                                    popularised in the 1960s
                                                    with the release of Letraset
                                                    sheets containing Lorem
                                                    Ipsum passages, and more
                                                    recently with desktop
                                                    publishing software like
                                                    Aldus PageMaker including
                                                    versions of Lorem Ipsum.
                                                </div>
                                            </>
                                        }
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FeLayout>
    );
};

export default CampaignPage;

interface CampaignTabProps {
    onClick?: () => void;
    active?: boolean;
    title?: string;
}
const CampaignTab: React.FC<CampaignTabProps> = ({
    onClick,
    active = false,
    title,
}) => {
    return (
        <div
            onClick={onClick}
            className={`box cursor-pointer px-6 py-4 rounded-xl backdrop-blur-sm flex items-center overflow-hidden ${
                active ? " bg-gray-900/30 " : "bg-gray-900/10 "
            } `}
        >
            <div className="bg-gradient-to-b from-[#FFDC04] to-[#F7A914] absolute inset-0 rounded-md"></div>
            <div className="bg-gradient-to-b from-[#F7A914] to-[#FFDC04] absolute inset-3 rounded-md"></div>
            <span className="bg-[#FFDC04]/60 w-8 h-4 rounded-full block absolute z-[1] top-6 "></span>
            <span className="bg-[#FFDC04]/60 w-16 h-4 rounded-full block absolute z-[1] top-6 left-24 "></span>
            <div className="content flex w-full items-center justify-center relative z-10">
                <span className="font-jambono text-[#6c4700] text-3xl py-4">
                    {title}
                </span>
            </div>
        </div>
    );
};
