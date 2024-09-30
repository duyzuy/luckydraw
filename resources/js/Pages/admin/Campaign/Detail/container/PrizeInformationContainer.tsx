import TableData from "@/Components/TableData";
import { PrizeGroupType } from "@/models/prizeGroup";
import { Badge, Button, Space, TableColumnsType } from "antd";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import { PrizeType } from "@/models/prize";
import dayjs from "dayjs";
import DrawerPrizeGroup from "../components/DrawerPrizeGroup";
import { useState } from "react";
import { useMessage } from "@/hooks/useMessage";
import { router } from "@inertiajs/react";

import DrawerPrizeForm from "../components/DrawerPrizeForm";

type PrizeGroupItemType = PrizeGroupType & {
    prizes: PrizeType[];
};
interface PrizeInformationContainerProps {
    items: PrizeGroupItemType[];
    campaignId: string;
}

const expandColumns: TableColumnsType<PrizeType> = [
    {
        title: "Hình ảnh",
        dataIndex: "image",
        key: "image",
        width: 100,
        render(value, { image }, index) {
            return (
                <div className="w-16 h-16 flex items-center justify-center rounded-md bg-slate-50">
                    {image ? (
                        <img
                            src={`/storage/${image}`}
                            className="w-full h-full object-contain"
                        />
                    ) : (
                        <span className="text-xs italic">no image</span>
                    )}
                </div>
            );
        },
    },
    { title: "Tên phần quà", dataIndex: "name", key: "name" },
    { title: "Số lượng", dataIndex: "quantity", key: "quantity" },
    {
        title: "Ngày tạo",
        key: "created_at",
        dataIndex: "created_at",
        render: (value, record, index) => {
            return dayjs(record.created_at).format("DD/MM/YYYY - HH:mm");
        },
    },
];

const columns: TableColumnsType<PrizeGroupItemType> = [
    {
        title: "Hình ảnh",
        dataIndex: "image",
        key: "image",
        width: 100,
        render(value, { image }, index) {
            return (
                <div className="w-16 h-16 flex items-center justify-center rounded-md bg-slate-50">
                    {image ? (
                        <img
                            src={`/storage/${image}`}
                            className="w-full h-full object-contain"
                        />
                    ) : (
                        <span className="text-xs italic">no image</span>
                    )}
                </div>
            );
        },
    },
    { title: "Tên giải", dataIndex: "name", key: "name", width: 150 },
    {
        title: "Trạng thái",
        dataIndex: "actived",
        key: "actived",
        render: (value, { actived }) => (
            <Badge
                status={actived ? "success" : "warning"}
                text={actived ? "Kích hoạt" : "Không kích hoạt"}
            />
        ),
    },
    { title: "Hình thức quay", dataIndex: "draw_type", key: "draw_type" },
    { title: "Thứ tự", dataIndex: "order", key: "order" },
    {
        title: "SL phần quà",
        dataIndex: "prizes_count",
        key: "prizes_count",
    },
    {
        title: "Ngày tạo",
        key: "created_at",
        dataIndex: "created_at",
        render: (value, record, index) => {
            return dayjs(record.created_at).format("DD/MM/YYYY - HH:mm");
        },
    },
];

const PrizeInformationContainer: React.FC<PrizeInformationContainerProps> = ({
    items,
    campaignId,
}) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [action, setAction] = useState<"create" | "edit">();
    const [editPrizeGroupRecord, setEditPrizeGroupRecord] =
        useState<PrizeGroupType>();
    const [editPrizeRecord, setEditPrizeRecord] = useState<PrizeType>();
    const [drawerType, setDrawerType] = useState<"prize" | "prizeGroup">();

    const message = useMessage();

    const setCreateDrawer = (drawerType: "prize" | "prizeGroup") => {
        setAction("create");
        setDrawerType(drawerType);
        setOpenDrawer(true);
    };
    const setEditPrizeGroupDrawer = (record: PrizeGroupType) => {
        setEditPrizeGroupRecord(record);
        setDrawerType("prizeGroup");
        setAction("edit");
        setOpenDrawer(true);
    };

    const setEditPrizeDrawer = (record: PrizeType) => {
        setEditPrizeRecord(record);
        setDrawerType("prize");
        setAction("edit");
        setOpenDrawer(true);
    };

    const cancelEdit = () => {
        setEditPrizeRecord(undefined);
        setEditPrizeGroupRecord(undefined);
        setDrawerType(undefined);
        setAction(undefined);
        setOpenDrawer(false);
    };

    const confirmDeletePrizeGroup = (record: PrizeGroupType) => {
        router.delete(
            route("campaign.destroy.prizeGroup", [campaignId, record.id])
        );
    };
    const confirmDeletePrize = (record: PrizeType) => {
        router.delete(route("campaign.destroy.prize", [campaignId, record.id]));
    };

    return (
        <>
            <div className="page-head py-3 mb-6">
                <h4 className="text-xl">Thông tin giải thưởng</h4>
            </div>
            <Space>
                <Button
                    onClick={() => setCreateDrawer("prizeGroup")}
                    icon={<PlusOutlined />}
                    type="primary"
                    ghost
                >
                    Thêm giải thưởng
                </Button>
                <Button
                    icon={<PlusOutlined />}
                    type="primary"
                    ghost
                    onClick={() => setCreateDrawer("prize")}
                >
                    Thêm Phần quà
                </Button>
            </Space>
            <div className="h-6"></div>
            <TableData<PrizeGroupItemType>
                columns={columns}
                expandable={{
                    expandedRowRender: (data) => {
                        return (
                            <TableData<PrizeType>
                                size="small"
                                columns={expandColumns}
                                dataSource={data.prizes}
                                onEdit={setEditPrizeDrawer}
                                onDelete={confirmDeletePrize}
                            />
                        );
                    },
                    // defaultExpandedRowKeys: ["0"],
                }}
                pagination={false}
                onEdit={setEditPrizeGroupDrawer}
                onDelete={confirmDeletePrizeGroup}
                dataSource={items}
            />
            <DrawerPrizeGroup
                campaignId={campaignId}
                action={action}
                open={openDrawer && drawerType === "prizeGroup"}
                onClose={cancelEdit}
                initialValue={editPrizeGroupRecord}
            />
            <DrawerPrizeForm
                campaignId={campaignId}
                open={openDrawer && drawerType === "prize"}
                action={action}
                prizeGroupList={items}
                onClose={cancelEdit}
                initialValue={editPrizeRecord}
            />
        </>
    );
};
export default PrizeInformationContainer;
