import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { MemberType } from "@/models/member";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { Button, Form, Input, Segmented, Tabs, TabsProps } from "antd";
import ScanningBox, { ScanningBoxProps } from "@/Components/ScanningBox";
import { useMessage } from "@/hooks/useMessage";
import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";

type CheckinContainerProps = PageProps & {
    memberList?: MemberType[];
    member?: MemberType;
    flash: {
        error: string | null;
        success: string | null;
    };
    checkinStatus?: string;
};

const CheckinContainer: React.FC<CheckinContainerProps> = ({
    auth,
    member,
    memberList,
    flash,
    checkinStatus,
}) => {
    const [data, setData] = useState("");
    const message = useMessage();
    const handleSubmit: ScanningBoxProps["onSubmit"] = (data) => {
        console.log(data);
        router.post(route("checkin.checkin_user"), { data: data });
        setData(data);
    };

    const handleSearch = () => {};
    const tabItems: TabsProps["items"] = [
        {
            key: "deviceScan",
            label: "Thiết bị",
            children: (
                <div className="device-container py-6">
                    <ScanningBox onSubmit={handleSubmit} className="mx-auto" />
                    <div className="py-2 text-xs px-8">
                        Vui lòng nhấn vào box sau đó sử dụng thiết bị.
                    </div>
                </div>
            ),
        },
        {
            key: "manualScan",
            label: "Thủ công",
            children: (
                <div className="manual-container bg-slate-50 p-4 rounded-md">
                    <Form layout="vertical" onFinish={handleSearch}>
                        <Form.Item label="Nhập thông tin cần tìm">
                            <Input
                                placeholder="Nhập họ tên or SDT or code.."
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" size="large">
                                Tìm kiếm
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            ),
        },
    ];
    useEffect(() => {}, []);
    useEffect(() => {
        flash.error && message.error(flash.error);
    }, [flash]);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Checkin
                </h2>
            }
        >
            <Head title="Nhóm giải thưởng" />
            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex gap-x-3 mb-6">
                            <div className="lg:w-1/4">
                                <div className="checkin-scanning">
                                    <div className="check-in-box text-center">
                                        <span className="font-bold text-xl mb-3 inline-block">
                                            Checkin
                                        </span>
                                        <Tabs
                                            defaultActiveKey="deviceScan"
                                            items={tabItems}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="checkin-info lg:w-3/4 pl-8">
                                <div className="checkin-info__head mb-6">
                                    <h3 className="text-xl font-bold">
                                        Thông tin Checkin
                                    </h3>
                                    {data ? <code>{data}</code> : null}
                                </div>
                                <div className="checkin-info__body">
                                    {member ? (
                                        <div className="member-info grid grid-cols-2 gap-4">
                                            <CheckinInfoItem
                                                label=" Họ và tên"
                                                value={member.name}
                                            />
                                            <CheckinInfoItem
                                                label="Mã tham dự"
                                                value={member.member_code}
                                            />
                                            <CheckinInfoItem
                                                label="Phone"
                                                value={member.phone}
                                            />
                                            <CheckinInfoItem
                                                label="Email"
                                                value={member.email}
                                            />
                                            <CheckinInfoItem
                                                label="Phòng ban"
                                                value={member.department}
                                            />
                                            <CheckinInfoItem
                                                label="Vị trí"
                                                value={member.position}
                                            />
                                            <CheckinInfoItem
                                                label="Checked-in"
                                                value={
                                                    member.checked_in
                                                        ? "Đã checkin"
                                                        : "Chưa checkin"
                                                }
                                            />
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};
export default CheckinContainer;

const CheckinInfoItem = ({
    label,
    value,
    className = "",
}: {
    label?: string;
    value?: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={className}>
            <div className="">{label}</div>
            <div className="text-lg font-bold">{value ?? "---"}</div>
        </div>
    );
};
