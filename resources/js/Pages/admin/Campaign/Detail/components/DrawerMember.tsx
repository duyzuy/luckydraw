import { Drawer, DrawerProps } from "antd";
import MemberForm, { MemberFormProps } from "./MemberForm";
import { MemberFormData } from "../../modules/member.interface";
import { useForm } from "@inertiajs/react";
import { useMessage } from "@/hooks/useMessage";
import { MemberType } from "@/models/member";
import { useEffect } from "react";
import { CampaignType } from "@/models/campaign";

type DrawerMemberProps = DrawerProps & {
    campaign: CampaignType;
    action?: "create" | "edit";
    initialValues?: MemberType;
    onClose?: () => void;
};
const DrawerMember: React.FC<DrawerMemberProps> = ({
    campaign,
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
        undefined,
        undefined,
        campaign.id
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
            patch(
                route("campaign.update.member", [
                    campaign.id,
                    initialValues?.id,
                ]),
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        onClose?.();
                        reset();
                    },
                }
            );
        }
        if (action === "create") {
            post(route("campaign.store.member", campaign.id), {
                preserveScroll: true,
                onSuccess: () => {
                    onClose?.();
                    reset();
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
                      initialValues.country,
                      initialValues.city,
                      initialValues.state,
                      initialValues.province,
                      initialValues?.department_id ?? undefined,
                      initialValues?.company_id ?? undefined,
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
