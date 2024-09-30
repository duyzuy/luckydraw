import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { PrizeGroupType } from "@/models/prizeGroup";
import { PrizeType } from "@/models/prize";
import DrawerPrizeForm from "./components/DrawerPrizeForm";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { BaseListResponse } from "@/models/common";
import TableData, { TableDataProps } from "@/Components/TableData";
import { columns } from "./column";
import { router } from "@inertiajs/react";
import { useMessage } from "@/hooks/useMessage";

type PrizeGroupsListProps = PageProps & {
    data: BaseListResponse<PrizeType>;
    prizeGroupList: PrizeGroupType[];
};
const PrizeContainer: React.FC<PrizeGroupsListProps> = ({
    auth,
    data,
    prizeGroupList,
}) => {
    const [action, setAction] = useState<"create" | "update">();
    const [record, setEditRecord] = useState<PrizeType>();

    const [open, setOpen] = useState(false);

    const message = useMessage();
    const onCreatePrize = () => {
        setOpen(true);
        setAction("create");
    };
    const onClose = () => {
        setOpen(false);
        setAction(undefined);
        setEditRecord(undefined);
    };
    const onEditRecord: TableDataProps<PrizeType>["onEdit"] = (record) => {
        setEditRecord(record);
        setOpen(true);
        setAction("update");
    };

    const handleDelete = (id: string) => {
        router.delete(route("prize.destroy", id), {
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
                    Danh sách phần quà
                </h2>
            }
        >
            <Head title="Nhóm giải thưởng" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg col-span-2 p-6">
                    <div className="flex gap-x-6">
                        <h3 className="text-lg font-bold mb-6">
                            Danh sách phần quà
                        </h3>
                        <Button
                            type="primary"
                            size="small"
                            ghost
                            icon={<PlusOutlined />}
                            onClick={onCreatePrize}
                        >
                            Thêm mới
                        </Button>
                    </div>
                    <div className="filter-table"></div>
                    <TableData<PrizeType>
                        dataSource={data.data}
                        columns={columns}
                        onEdit={onEditRecord}
                        onDelete={(record) => handleDelete(record.id)}
                        pagination={{
                            size: "small",
                            total: data.total,
                            pageSize: data.per_page,
                            current: data.current_page,
                            showTotal: (total, range) => {
                                return (
                                    <span>
                                        <span>{total} items</span>
                                    </span>
                                );
                            },

                            onChange: (page, pageSize) => {
                                router.get(`${data.path}?page=${page}`);
                            },
                        }}
                    />
                </div>
            </div>
            <DrawerPrizeForm
                open={open}
                action={action}
                prizeGroupList={prizeGroupList}
                onClose={onClose}
                initialValue={record}
            />
        </AuthenticatedLayout>
    );
};
export default PrizeContainer;
