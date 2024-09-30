import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { PageProps } from "@/types";
import { CampaignType } from "@/models/campaign";
import { useMessage } from "@/hooks/useMessage";
import { PrizeGroupType } from "@/models/prizeGroup";
import { MemberType } from "@/models/member";
import { WinnerType } from "@/models/winner";
import { Tabs, TabsProps } from "antd";

import CampaignInformation from "./components/CampaignInformation";
import PrizeInformationContainer from "./container/PrizeInformationContainer";
import { PrizeType } from "@/models/prize";
import MemberContainer from "./container/MemberContainer";
import WinnerListContainer from "./container/WinnerListContainer";

type PrizeGroupItemType = PrizeGroupType & {
    prizes: PrizeType[];
};
type CampaignDetailPageProps = PageProps & {
    data: CampaignType;
    prizeGroups: PrizeGroupItemType[];
    members: MemberType[];
    winners: WinnerType[];
    flash: {
        error?: string;
        success?: string;
    };
};

type TAB_LIST_KEYS = "eventInfo" | "prizesList" | "memberList" | "winnerList";
const CampaignDetailPage: React.FC<CampaignDetailPageProps> = ({
    auth,
    winners,
    prizeGroups,
    members,
    flash,
    data,
}) => {
    const message = useMessage();
    const [activeTab, setActiveTab] = useState<TAB_LIST_KEYS>("eventInfo");
    const tabItems: TabsProps["items"] = [
        {
            label: "Thông tin sự kiện",
            key: "eventInfo",
            children: <CampaignInformation data={data} />,
        },
        {
            label: "Thông tin giải thưởng",
            key: "prizesList",
            children: (
                <PrizeInformationContainer
                    items={prizeGroups}
                    campaignId={data.id}
                />
            ),
        },
        {
            label: "Danh sách tham gia",
            key: "memberList",
            children: <MemberContainer data={members} campaign={data} />,
        },
        {
            label: "Người chiến thắng",
            key: "winnerList",
            children: (
                <WinnerListContainer
                    campaignName={data.name}
                    campaignId={data.id}
                    data={winners || []}
                />
            ),
        },
    ];
    useEffect(() => {
        flash.error && message.error(flash.error);
        flash.success && message.success(flash.success);
    }, [flash]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Chiến dịch
                </h2>
            }
        >
            <Head title={data.name} />

            <div className="campaign-page max-w-7xl mx-auto sm:px-6 lg:px-8 py-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <div className="campaign-page__head flex items-center gap-x-4 mb-6">
                        <h3 className="text-xl font-[500]">{data.name}</h3>
                    </div>
                    <div className="campaign-page__body">
                        <Tabs
                            activeKey={activeTab}
                            onChange={(key) =>
                                setActiveTab(key as TAB_LIST_KEYS)
                            }
                            items={tabItems}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};
export default CampaignDetailPage;
