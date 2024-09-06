import { Drawer, DrawerProps } from "antd";
import MemberForm, { MemberFormProps } from "./MemberForm";
import { MemberFormData } from "../modules/member.interface";
import { useForm } from "@inertiajs/react";
import { useMessage } from "@/hooks/useMessage";

type DrawerCreateProps = DrawerProps & {
    className?: string;
    onClose?: () => void;
};
const DrawerCreate: React.FC<DrawerCreateProps> = ({ open, onClose }) => {
    const initMemberForm = new MemberFormData(
        "",
        "",
        "",
        "employee",
        false,
        "",
        "",
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
                onClose?.();
            },
        });
    };

    return (
        <Drawer
            title="Thêm mới"
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
export default DrawerCreate;
