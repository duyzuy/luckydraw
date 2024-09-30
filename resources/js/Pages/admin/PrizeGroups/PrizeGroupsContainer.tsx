import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head } from "@inertiajs/react";
import { useState } from "react";
import { PageProps } from "@/types";
import { PrizeGroupType } from "@/models/prizeGroup";
import PrizeGroupForm from "./components/PrizeGroupForm";

import { useMessage } from "@/hooks/useMessage";
import TableData from "@/Components/TableData";
import { columns } from "./column";
import DrawerPrizeGroup from "./components/DrawerPrizeGroup";
import { router } from "@inertiajs/react";
import { CampaignType } from "@/models/campaign";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

type PrizeGroupsListProps = PageProps & {
    items: PrizeGroupType[];
    campaigns: CampaignType[];
};
const PrizeGroupsContainer: React.FC<PrizeGroupsListProps> = ({
    auth,
    items,
    campaigns,
}) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [action, setAction] = useState<"create" | "edit">();
    const [editRecord, setEditRecord] = useState<PrizeGroupType>();

    const message = useMessage();

    const setCreateCampaign = () => {
        setAction("create");
        setOpenDrawer(true);
    };
    const setEdit = (record: PrizeGroupType) => {
        setEditRecord(record);
        setAction("edit");
        setOpenDrawer(true);
    };

    const cancelEdit = () => {
        setEditRecord(undefined);
        setAction(undefined);
        setOpenDrawer(false);
    };

    const confirmDelete = (record: PrizeGroupType) => {
        router.delete(route("prizeGroup.destroy", record.id), {
            onSuccess: () => {
                message.success("Xoá thành công");
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Nhóm giải thưởng
                </h2>
            }
        >
            <Head title="Prize groups" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg col-span-3 p-6">
                        <div className="flex items-center gap-x-3 mb-6">
                            <h3 className="text-lg font-bold">
                                Danh sách nhóm giải
                            </h3>
                            <Button
                                type="primary"
                                size="small"
                                ghost
                                icon={<PlusOutlined />}
                                onClick={setCreateCampaign}
                            >
                                Thêm mới
                            </Button>
                        </div>
                        <TableData
                            dataSource={items}
                            columns={columns}
                            onEdit={setEdit}
                            onDelete={confirmDelete}
                        />
                    </div>
                </div>
                <DrawerPrizeGroup
                    campaigns={campaigns}
                    action={action}
                    open={openDrawer}
                    onClose={cancelEdit}
                    initialValue={editRecord}
                />
            </div>
        </AuthenticatedLayout>
    );
};
export default PrizeGroupsContainer;
