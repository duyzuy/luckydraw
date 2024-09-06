import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useForm, router } from "@inertiajs/react";
import { PageProps } from "@/types";
import { useMessage } from "@/hooks/useMessage";
import MemberForm, { MemberFormProps } from "./components/MemberForm";
import { MemberFormData } from "./modules/member.interface";
import { MemberType } from "@/models/member";
import MemberList from "./components/MemberList";
import { Button, Form, Input } from "antd";
import MemberImportForm from "./components/MemberImportForm";
import { useEffect, useState } from "react";
import DrawerCreate from "./components/DrawerCreate";
import { PlusOutlined } from "@ant-design/icons";

type MemberContainerProps = PageProps & {
    memberList: MemberType[];
    flash: {
        error: string | null;
        success: string | null;
    };
};
const MemberContainer: React.FC<MemberContainerProps> = ({
    auth,
    memberList,
    flash,
}) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const message = useMessage();

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
                    <div className="flex items-center justify-end">
                        <MemberImportForm />
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
                                onClick={() => setOpenDrawer(true)}
                            >
                                Thêm mới
                            </Button>
                        </div>

                        <MemberList items={memberList} />
                    </div>
                </div>
            </div>
            <DrawerCreate
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
            />
        </AuthenticatedLayout>
    );
};
export default MemberContainer;
