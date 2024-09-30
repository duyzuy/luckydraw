import TableData from "@/Components/TableData";
import { MemberType } from "@/models/member";

import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Input, Space, TableProps } from "antd";

import DrawerMember from "../components/DrawerMember";
import { columnsMember } from "./columnMember";
import { PageProps } from "@/types";
import { useMessage } from "@/hooks/useMessage";

// import MemberImportForm from "./components/MemberImportForm";
import { useEffect, useState } from "react";

import { router } from "@inertiajs/react";
import MemberImportForm from "../components/MemberImportForm";
import { CampaignType } from "@/models/campaign";
import { removeVietnameseTones } from "@/utils/common";

export interface MemberContainerProps {
    data: MemberType[];
    campaign: CampaignType;
}
const MemberContainer: React.FC<MemberContainerProps> = ({
    data,
    campaign,
}) => {
    const params = new URLSearchParams(window.location.search);

    const [action, setAction] = useState<"create" | "edit">();
    const [searchText, setSearchText] = useState("");
    const [filter, setFilter] = useState<{
        searchText: string;
        status: ("checked_in" | "no_checked")[];
    }>({
        searchText: "",
        status: [],
    });
    const [editRecord, setEditRecord] = useState<MemberType>();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [members, setMembers] = useState<MemberType[]>([]);
    const [pagination, setPagination] = useState({
        pageSize: 10,
        position: ["topRight", "bottomRight"],
        total: data.length,
        current: 1,
    });

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
        });
    };

    const onChangeSearch = (value: string) => {
        setSearchText(value);
    };

    const handleSearch = (value: string) => {
        let textNoVietnamese = removeVietnameseTones(value).toLowerCase();
        textNoVietnamese = textNoVietnamese.split(" ").join("");

        const newMembers = data.filter((member) =>
            member.member_keyword.includes(textNoVietnamese)
        );
        setPagination((old) => ({
            ...old,
            total: newMembers.length,
        }));

        setMembers(() => newMembers);
    };

    const onChangeStatus = (
        checked: boolean,
        checkType: "checked_in" | "no_checked"
    ) => {
        const { status } = filter;
        let newStatus = [...status];
        let newMembers = [...data];

        if (checked) {
            newStatus = [...newStatus, checkType];
        } else {
            newStatus.splice(status.indexOf(checkType), 1);
        }

        if (newStatus.length === 1 && newStatus[0] === "checked_in") {
            newMembers = newMembers.filter((item) => item.checked_in);
        }
        if (newStatus.length === 1 && newStatus[0] === "no_checked") {
            newMembers = newMembers.filter((item) => !item.checked_in);
        }
        setMembers(() => newMembers);
        setPagination((old) => ({
            ...old,
            total: newMembers.length,
        }));
        setFilter((old) => ({ ...old, status: newStatus }));
        setSearchText("");
    };

    useEffect(() => {
        setSearchText(() => params.get("search") || "");
    }, [params.get("search")]);

    useEffect(() => {
        setMembers(data);
        setPagination((old) => ({
            pageSize: old.pageSize,
            position: old.position,
            total: data.length,
            current: old.current,
        }));
    }, [data]);

    return (
        <>
            <div className="page-head py-3 mb-6">
                <div className="flex justify-between">
                    <h4 className="text-xl">Danh sách người tham gia</h4>
                    <Space>
                        <Button
                            icon={<PlusOutlined />}
                            type="primary"
                            onClick={setCreate}
                            size="large"
                        >
                            Thêm mới
                        </Button>
                        <MemberImportForm campaign={campaign} />
                    </Space>
                </div>
            </div>
            <div className="flex items-center justify-between gap-x-4 mb-6">
                <div>
                    <Space>
                        <span>Trạng thái:</span>
                        <Checkbox
                            checked={filter.status.includes("checked_in")}
                            onChange={(evt) =>
                                onChangeStatus(evt.target.checked, "checked_in")
                            }
                        >
                            Đã checkin
                        </Checkbox>
                        <Checkbox
                            checked={filter.status.includes("no_checked")}
                            onChange={(evt) =>
                                onChangeStatus(evt.target.checked, "no_checked")
                            }
                        >
                            Chưa checkin
                        </Checkbox>
                    </Space>
                </div>
                <div className="search-form w-full max-w-[360px]">
                    <Input.Search
                        placeholder="Tìm kiếm theo họ tên hoặc email hoặc mã hoặc SDT"
                        size="large"
                        value={searchText}
                        onChange={(evt) => onChangeSearch(evt.target.value)}
                        loading={false}
                        onSearch={handleSearch}
                        enterButton="Tìm kiếm"
                    />
                </div>
            </div>

            <TableData<MemberType>
                size="small"
                columns={columnsMember}
                dataSource={members}
                onEdit={setEdit}
                onDelete={handleDelete}
                pagination={{
                    showTotal(total, range) {
                        return <span className="text-xs">{total} members</span>;
                    },
                    pageSize: pagination.pageSize,
                    position: ["topRight", "bottomRight"],
                    total: pagination.total,
                    current: pagination.current,
                    onChange(page, pageSize) {
                        setPagination((old) => ({
                            ...old,
                            current: page,
                            pageSize: pageSize,
                        }));
                    },
                }}
            />
            <DrawerMember
                campaign={campaign}
                open={openDrawer}
                action={action}
                initialValues={editRecord}
                onClose={cancelDrawer}
            />
        </>
    );
};
export default MemberContainer;
