import { Table, TableProps, Tag, Popconfirm } from "antd";
import DrawerMember from "./DrawerMember";
import { useState } from "react";
import { router } from "@inertiajs/react";
import { useMessage } from "@/hooks/useMessage";
import { MemberType } from "@/models/member";

type MemberListProps = {
    items: MemberType[];
};
const MemberList: React.FC<MemberListProps> = ({ items }) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [editRecord, setEditRecord] = useState<MemberType>();

    const message = useMessage();

    const handleEdit = (record: MemberType) => {
        setEditRecord(record);
        setOpenDrawer(true);
    };

    const handleCancelEdit = () => {
        setEditRecord(undefined);
        setOpenDrawer(false);
    };

    const confirmDelete = (recordId?: string) => {
        router.delete(route("member.destroy", recordId), {
            // onBefore: () =>
            //     confirm("Are you sure you want to delete this user?"),
            onSuccess: () => {
                message.success("Xoá thành công");
            },
            // onError: () => {
            //     console.log("errr");
            // },
            // onFinish: (data) => {
            //     console.log(data);
            //     console.log("finish");
            // },
        });
    };

    const columns: TableProps<MemberType>["columns"] = [
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
        },
        {
            title: "Họ tên",
            dataIndex: "name",
            key: "name",
            width: 200,
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
            width: 150,
        },
        {
            title: "Trạng thái",
            dataIndex: "check_in",
            key: "check_in",
            width: 150,
            render(_, { checked_in }, index) {
                return (
                    <Tag color={checked_in ? "green" : "red"}>
                        {checked_in ? "Đang kích hoạt" : "Chưa kích hoạt"}
                    </Tag>
                );
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
            <Table
                dataSource={items}
                columns={columns}
                rowKey="id"
                size="small"
                scroll={{ x: 800 }}
            />
            <DrawerMember
                open={openDrawer}
                onClose={handleCancelEdit}
                initialValue={editRecord}
            />
        </>
    );
};
export default MemberList;
