import { Table, TableProps, Tag, Popconfirm } from "antd";
import DrawerWinerDetail from "./DrawerWinerDetail";
import { useState } from "react";
import { router } from "@inertiajs/react";
import { useMessage } from "@/hooks/useMessage";
import { MemberType } from "@/models/member";
import { WinnerType } from "@/models/winner";

type WinnerListProps = {
    items: WinnerType[];
};
const WinnerList: React.FC<WinnerListProps> = ({ items }) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [viewRecord, setViewRecord] = useState<WinnerType>();

    const message = useMessage();

    const handleView = (record: WinnerType) => {
        setViewRecord(record);
        setOpenDrawer(true);
    };

    const closeDrawer = () => {
        setViewRecord(undefined);
        setOpenDrawer(false);
    };

    const columns: TableProps<WinnerType>["columns"] = [
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
            title: "Mã",
            dataIndex: "member_code",
            key: "member_code",
            width: 100,
            render(value, { member_info }, index) {
                return member_info.member_code;
            },
        },
        {
            title: "Họ và tên",
            dataIndex: "member_name",
            key: "member_name",
            width: 100,
            render(value, { member_info }, index) {
                return member_info.name;
            },
        },

        {
            title: "Giải",
            dataIndex: "name",
            key: "name",
            width: 80,
            render(value, { prize }, index) {
                return prize.prize_group.name;
            },
        },

        {
            title: "Giải thưởng",
            dataIndex: "name",
            key: "name",
            width: 200,
            render(value, { prize }, index) {
                return prize.name;
            },
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
            width: 150,
            render(value, { member_info }, index) {
                return member_info.phone;
            },
        },
        {
            title: "Actions",
            width: 100,
            fixed: "right",
            render: (_, record) => {
                return (
                    <div className="text-xs flex items-center">
                        <span
                            onClick={() => handleView(record)}
                            className="cursor-pointer text-blue-600"
                        >
                            Xem
                        </span>
                    </div>
                );
            },
        },
    ];

    return (
        <>
            <Table
                dataSource={items}
                columns={columns}
                rowKey="id"
                size="small"
                scroll={{ x: 800 }}
            />
            <DrawerWinerDetail
                open={openDrawer}
                onClose={closeDrawer}
                initialValue={viewRecord}
            />
        </>
    );
};
export default WinnerList;
