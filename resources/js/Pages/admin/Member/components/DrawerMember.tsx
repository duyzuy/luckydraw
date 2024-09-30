import { Drawer, DrawerProps } from "antd";
import MemberForm, { MemberFormProps } from "./MemberForm";
import { MemberFormData } from "../modules/member.interface";
import { useForm } from "@inertiajs/react";
import { useMessage } from "@/hooks/useMessage";
import { MemberType } from "@/models/member";
import { useEffect } from "react";

type DrawerMemberProps = DrawerProps & {
    action?: "create" | "edit";
    initialValues?: MemberType;
    onClose?: () => void;
};
const DrawerMember: React.FC<DrawerMemberProps> = ({
    open,
    onClose,
    action,
    initialValues,
}) => {
    const initMemberForm = new MemberFormData(
        "",
        "",
        "",
        "",
        "",
        undefined,
        false,
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    );

    const { data, setData, post, processing, errors, reset, patch } =
        useForm(initMemberForm);
    const message = useMessage();

    const onChangeFormData: MemberFormProps["onChange"] = (key, value) => {
        setData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit = () => {
        if (action === "edit") {
            patch(route("member.update", initialValues?.id), {
                preserveScroll: true,
                onSuccess: () => {
                    message.success("Cập nhật thành công.");
                    reset();
                    onClose?.();
                },
            });
        }
        if (action === "create") {
            post(route("member.store"), {
                preserveScroll: true,
                onSuccess: () => {
                    message.success("Thêm mới thành công.");
                    reset();
                    onClose?.();
                },
            });
        }
    };

    useEffect(() => {
        setData(() =>
            initialValues
                ? new MemberFormData(
                      initialValues.full_name,
                      initialValues.first_name,
                      initialValues.last_name,
                      initialValues.phone,
                      initialValues.email,
                      initialValues?.member_type || undefined,
                      initialValues.checked_in,
                      initialValues.member_code,
                      initialValues.member_keyword,
                      initialValues.position,
                      initialValues.address,
                      initialValues.department_id,
                      initialValues.country,
                      initialValues.city,
                      initialValues.state,
                      initialValues.province,
                      initialValues.company,
                      initialValues.campaign_id
                  )
                : initMemberForm
        );
    }, [initialValues]);
    return (
        <Drawer
            title={action === "create" ? "Thêm mới" : "Sửa"}
            width={550}
            open={open}
            onClose={onClose}
            destroyOnClose={true}
        >
            <MemberForm
                value={data}
                errors={errors}
                loading={processing}
                onSubmit={handleSubmit}
                onChange={onChangeFormData}
            />
        </Drawer>
    );
};
export default DrawerMember;
