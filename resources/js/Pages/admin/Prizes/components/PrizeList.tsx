import { PrizeGroupType } from "@/models/prizeGroup";
import { Table, TableProps, Tag, Popconfirm } from "antd";
import DrawerPrize from "./DrawerPrize";
import { useState } from "react";

import { router } from "@inertiajs/react";
import { useMessage } from "@/hooks/useMessage";
import { PrizeType } from "@/models/prize";

type PrizeListProps = {
    items: PrizeType[];
    prizeGroupList: PrizeGroupType[];
};
const PrizeList: React.FC<PrizeListProps> = ({ items, prizeGroupList }) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [editRecord, setEditRecord] = useState<PrizeType>();

    const message = useMessage();

    const handleEdit = (record: PrizeType) => {
        setEditRecord(record);
        setOpenDrawer(true);
    };

    const handleCancelEdit = () => {
        setEditRecord(undefined);
        setOpenDrawer(false);
    };

    const confirmDelete = (recordId?: string) => {
        router.delete(route("prize.destroy", recordId), {
            onSuccess: () => {
                message.success("Xoá thành công");
            },
        });
    };

    const columns: TableProps<PrizeType>["columns"] = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            width: 80,
            render(value, record, index) {
                return index + 1;
            },
        },
        {
            title: "Tên giải",
            dataIndex: "name",
            key: "name",
            width: 320,
        },
        {
            title: "Nhóm",
            dataIndex: "prizeGroup",
            key: "prizeGroup",
            filters: prizeGroupList.map((item) => ({
                text: item.name,
                value: item.id,
            })),
            onFilter: (value, record) => {
                return record.prize_group_id === value;
            },
            width: 100,
            render(value, { prize_group }, index) {
                return prize_group.name;
            },
        },
        {
            title: "Actions",
            width: 100,
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
            <DrawerPrize
                open={openDrawer}
                onClose={handleCancelEdit}
                initialValue={editRecord}
                prizeGroupList={prizeGroupList}
            />
        </>
    );
};
export default PrizeList;
