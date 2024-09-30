import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { PageProps } from "@/types";
import { CampaignType } from "@/models/campaign";

import { useMessage } from "@/hooks/useMessage";
import TableData from "@/Components/TableData";

import { router } from "@inertiajs/react";
import { Button } from "antd";

import DrawerCampaign from "./components/DrawerCampaign";
import { columns } from "./column";
import { PlusOutlined } from "@ant-design/icons";
import { BaseListResponse } from "@/models/common";

type CampaignContainerProps = PageProps & {
    items: CampaignType[];
    data: BaseListResponse<CampaignType>;
    flash: {
        error?: string;
        success?: string;
    };
};
const CampaignContainer: React.FC<CampaignContainerProps> = ({
    auth,
    items,
    flash,
    data,
}) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [action, setAction] = useState<"create" | "edit">();
    const [editRecord, setEditRecord] = useState<CampaignType>();

    const message = useMessage();

    const setCreateCampaign = () => {
        setOpenDrawer(true);
        setAction("create");
    };
    const setEdit = (record: CampaignType) => {
        setEditRecord(record);
        setOpenDrawer(true);
        setAction("edit");
    };

    const cancelEdit = () => {
        setEditRecord(undefined);
        setOpenDrawer(false);
        setAction(undefined);
    };

    const confirmDelete = (record: CampaignType) => {
        router.delete(route("campaign.destroy", record.id));
    };
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
            <Head title="Prize groups" />

            <div className="campaign-page max-w-7xl mx-auto sm:px-6 lg:px-8 py-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <div className="campaign-page__head flex items-center gap-x-4 mb-6">
                        <h3 className="text-xl font-bold">
                            Danh sách các chiến dịch
                        </h3>
                        <div>
                            <Button
                                type="primary"
                                ghost
                                icon={<PlusOutlined />}
                                onClick={setCreateCampaign}
                                size="small"
                            >
                                Thêm mới
                            </Button>
                        </div>
                    </div>
                    <TableData
                        dataSource={data.data}
                        columns={columns}
                        onEdit={setEdit}
                        onDelete={confirmDelete}
                        onView={(record) =>
                            router.get(route("campaign.show", record.id))
                        }
                    />
                </div>
            </div>
            <DrawerCampaign
                open={openDrawer}
                action={action}
                onClose={cancelEdit}
                initialValue={editRecord}
            />
        </AuthenticatedLayout>
    );
};
export default CampaignContainer;
