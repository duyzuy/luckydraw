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
import { useEffect } from "react";

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
    const initMemberForm = new MemberFormData(
        "",
        "",
        "",
        "employee",
        false,
        "",
        "",
        ""
    );

    const { data, setData, post, processing, errors, reset, progress } =
        useForm(initMemberForm);
    const message = useMessage();

    const onChangeFormData: MemberFormProps["onChange"] = (key, value) => {
        setData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (evt) => {
        evt.preventDefault();
        post(route("member.store"), {
            preserveScroll: true,
            onSuccess: () => {
                message.success("Thêm mới thành công.");
                reset();
            },
        });
    };

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
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-3 gap-4">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg col-span-1 p-6">
                        <h3 className="text-lg font-bold mb-6">Thêm mới</h3>
                        <MemberForm
                            value={data}
                            errors={errors}
                            loading={processing}
                            onSubmit={handleSubmit}
                            onChange={onChangeFormData}
                        />
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg col-span-2 p-6">
                        <div>
                            <h3 className="text-lg font-bold mb-6">
                                Danh sách người chơi
                            </h3>
                            <MemberImportForm />
                        </div>
                        <MemberList items={memberList} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};
export default MemberContainer;
