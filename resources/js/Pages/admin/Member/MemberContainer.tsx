import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { useMessage } from "@/hooks/useMessage";
import { MemberType } from "@/models/member";
import { Button, Form, Input, Space, TableProps } from "antd";
import MemberImportForm from "./components/MemberImportForm";
import { useEffect, useState } from "react";
import DrawerMember from "./components/DrawerMember";
import { PlusOutlined } from "@ant-design/icons";
import { BaseListResponse } from "@/models/common";
import TableData from "@/Components/TableData";
import { columns } from "./columns";
import { router } from "@inertiajs/react";
import GenerateQrcode from "./components/GenerateQrcode";
import { CampaignType } from "@/models/campaign";

type MemberContainerProps = PageProps & {
    data: BaseListResponse<MemberType>;
    flash: {
        error: string | null;
        success: string | null;
    };
};
const MemberContainer: React.FC<MemberContainerProps> = ({
    auth,
    data,
    share: { campaigns },
    flash,
}) => {
    const params = new URLSearchParams(window.location.search);

    const [action, setAction] = useState<"create" | "edit">();
    const [searchText, setSearchText] = useState("");
    const [editRecord, setEditRecord] = useState<MemberType>();
    const [openDrawer, setOpenDrawer] = useState(false);
    const message = useMessage();

    const setCreate = () => {
        setAction("create");
        setOpenDrawer(true);
    };
    const setEdit = (record: MemberType) => {
        setAction("edit");
        setEditRecord(record);
        setOpenDrawer(true);
    };
    const cancelDrawer = () => {
        setAction(undefined);
        setEditRecord(undefined);
        setOpenDrawer(false);
    };
    const handleDelete = (record: MemberType) => {
        router.delete(route("member.destroy", record.id), {
            preserveScroll: true,
            onSuccess: () => {
                message.success("Xoá thành công");
            },
        });
    };

    const handleSearch = (value: string) => {
        router.get(route("member.index", { search: value }), undefined, {
            preserveScroll: true,
        });
    };
    const onChangeSearch = (value: string) => {
        setSearchText(value);
    };

    const pagination: TableProps["pagination"] = {
        pageSize: data.per_page,
        position: ["topRight", "bottomRight"],
        total: data.total,
        current: data.current_page,
        onChange(page, pageSize) {
            let queryParams: {
                [key: string]: string | number;
            } = { page: page };

            if (searchText) {
                queryParams = {
                    ...queryParams,
                    search: searchText,
                };
            }
            router.get(route("member.index", queryParams));
        },
    };

    useEffect(() => {
        setSearchText(() => params.get("search") || "");
    }, [params.get("search")]);
    useEffect(() => {
        if (flash.success) {
            message.success(flash.success);
        }
        if (flash.error) {
            message.error(flash.error);
        }
    }, [flash]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Người chơi
                </h2>
            }
        >
            <Head title="Nhóm giải thưởng" />
            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex items-center justify-end gap-x-4 mb-6">
                        <div className="search-form w-full max-w-[360px]">
                            <Input.Search
                                placeholder="Tìm kiếm theo họ tên hoặc email hoặc mã hoặc SDT"
                                size="large"
                                value={searchText}
                                onChange={(evt) =>
                                    onChangeSearch(evt.target.value)
                                }
                                loading={false}
                                onSearch={handleSearch}
                                enterButton="Tìm kiếm"
                            />
                        </div>
                        <MemberImportForm campaigns={campaigns} />
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex items-center gap-x-3 mb-6">
                            <h3 className="text-lg font-bold">
                                Danh sách người chơi
                            </h3>
                            <Button
                                type="primary"
                                ghost
                                size="small"
                                icon={<PlusOutlined />}
                                onClick={setCreate}
                            >
                                Thêm
                            </Button>
                        </div>

                        <TableData<MemberType>
                            dataSource={data.data}
                            columns={columns}
                            size="small"
                            scroll={{ x: 800 }}
                            pagination={pagination}
                            onEdit={setEdit}
                            onDelete={handleDelete}
                        />
                    </div>
                </div>
            </div>
            <DrawerMember
                open={openDrawer}
                action={action}
                initialValues={editRecord}
                onClose={cancelDrawer}
            />
        </AuthenticatedLayout>
    );
};
export default MemberContainer;
