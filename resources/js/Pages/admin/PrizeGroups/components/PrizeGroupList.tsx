import { PrizeGroupType } from "@/models/prizeGroup";
import { Table, TableProps, Tag, Popconfirm } from "antd";
import DrawerPrizeGroup from "./DrawerPrizeGroup";
import { useState } from "react";

import { router } from "@inertiajs/react";
import { useMessage } from "@/hooks/useMessage";

type PrizeGroupListProps = {
    items: PrizeGroupType[];
};
const PrizeGroupList: React.FC<PrizeGroupListProps> = ({ items }) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [editRecord, setEditRecord] = useState<PrizeGroupType>();

    const message = useMessage();

    const handleEdit = (record: PrizeGroupType) => {
        setEditRecord(record);
        setOpenDrawer(true);
    };

    const handleCancelEdit = () => {
        setEditRecord(undefined);
        setOpenDrawer(false);
    };

    const confirmDelete = (recordId?: string) => {
        router.delete(route("prizeGroup.destroy", recordId), {
            onSuccess: () => {
                message.success("Xoá thành công");
            },
        });
    };

    const columns: TableProps<PrizeGroupType>["columns"] = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            render(value, record, index) {
                return index + 1;
            },
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Eng name",
            dataIndex: "eng_name",
            key: "eng_name",
        },
        {
            title: "Priority",
            dataIndex: "order",
            key: "order",
        },
        {
            title: "Trạng thái",
            dataIndex: "actived",
            key: "actived",
            render: (_, { actived }) => {
                return (
                    <Tag color={actived ? "green" : "red"}>
                        {actived ? "Đang kích hoạt" : "Không kích hoạt"}
                    </Tag>
                );
            },
        },
        {
            title: "Actions",
            render: (_, record) => {
                return (
                    <div className="text-xs flex items-center">
                        <span
                            onClick={() => handleEdit(record)}
                            className="cursor-pointer text-blue-600"
                        >
                            Sửa
                        </span>
                        <span className="mx-2 text-xs text-gray-400">|</span>
                        <Popconfirm
                            title="Xoá"
                            description={`Bạn chắc chắn muốn xoá - ${record.name}?`}
                            onConfirm={() => confirmDelete(record.id)}
                            okText="Xác nhận"
                            cancelText="Huỷ bỏ"
                        >
                            <span className="text-red-600 cursor-pointer">
                                Xoá
                            </span>
                        </Popconfirm>
                    </div>
                );
            },
        },
    ];

    return (
        <>
            <Table dataSource={items} columns={columns} rowKey="id" />
            <DrawerPrizeGroup
                open={openDrawer}
                onClose={handleCancelEdit}
                initialValue={editRecord}
            />
        </>
    );
};
export default PrizeGroupList;
