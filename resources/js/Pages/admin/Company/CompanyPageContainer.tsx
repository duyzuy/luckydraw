import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { PrizeGroupType } from "@/models/prizeGroup";
import { PrizeType } from "@/models/prize";
import DepartmentForm from "./components/CompanyForm";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { BaseListResponse } from "@/models/common";
import TableData, { TableDataProps } from "@/Components/TableData";
import { columns } from "./column";
import { router } from "@inertiajs/react";
import { useMessage } from "@/hooks/useMessage";
import { DepartmentType } from "@/models/department";
import { CompanyType } from "@/models/company";

type CompanyPageContainerProps = PageProps & {
    data: BaseListResponse<CompanyType>;
};
const CompanyPageContainer: React.FC<CompanyPageContainerProps> = ({
    auth,
    data,
    flash,
}) => {
    const [action, setAction] = useState<"create" | "edit">("create");
    const [editRecord, setEditRecord] = useState<CompanyType>();

    const message = useMessage();
    const onCancel = () => {
        setAction("create");
        setEditRecord(undefined);
    };
    const onEditRecord: TableDataProps<CompanyType>["onEdit"] = (record) => {
        setEditRecord(record);
        setAction("edit");
    };

    const handleDelete = (id: string) => {
        router.delete(route("company.destroy", id), {
            onSuccess: () => {},
        });
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
                    Công ty
                </h2>
            }
        >
            <Head title="Nhóm giải thưởng" />
            <div className="department-page max-w-7xl mx-auto sm:px-6 lg:px-8 py-8">
                <div className="bg-white shadow-sm sm:rounded-lg p-6 flex gap-x-6">
                    <div className="department-page__form w-[320px]">
                        <h3 className="text-lg font-bold mb-6">
                            Danh sách công ty
                        </h3>
                        <div>
                            <DepartmentForm
                                action={action}
                                initialValue={editRecord}
                                onCancel={onCancel}
                            />
                        </div>
                    </div>
                    <div className="department-page__table flex-1">
                        <TableData<CompanyType>
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
            </div>
        </AuthenticatedLayout>
    );
};
export default CompanyPageContainer;
