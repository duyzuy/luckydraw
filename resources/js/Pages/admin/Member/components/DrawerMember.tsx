import { Button, Drawer, Form, Select, Switch } from "antd";
import { MemberFormData } from "../modules/member.interface";
import { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import { useMessage } from "@/hooks/useMessage";
import { MemberType } from "@/models/member";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

type DrawerMemberProps = {
    open?: boolean;
    onClose?: () => void;
    initialValue?: MemberType;
};
const DrawerMember: React.FC<DrawerMemberProps> = ({
    open,
    onClose,
    initialValue,
}) => {
    const initFormData = new MemberFormData(
        "",
        "",
        "",
        "employee",
        false,
        "",
        "",
        ""
    );

    const { data, setData, errors, reset, processing, put, patch } = useForm(
        initialValue ?? initFormData
    );
    const message = useMessage();
    const onChangeFormData = (
        key: keyof MemberFormData,
        value: MemberFormData[keyof MemberFormData]
    ) => {
        setData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (evt) => {
        evt.preventDefault();

        if (initialValue) {
            patch(route("member.update", initialValue.id), {
                preserveScroll: true,
                onSuccess: () => {
                    message.success("Cập nhật thành công");
                    onClose?.();
                    reset();
                },
            });
        }
    };
    useEffect(() => {
        initialValue &&
            setData({ ...initialValue, position: initialValue.position ?? "" });
    }, [initialValue]);

    return (
        <Drawer
            open={open}
            onClose={onClose}
            width={450}
            title={`Sửa - ${initialValue?.name}`}
        >
            <div className="form-wraper">
                <form onSubmit={handleSubmit}>
                    <Form component="div" layout="vertical">
                        <Form.Item
                            label="Mã thành viên"
                            required
                            validateStatus={
                                errors?.member_code ? "error" : undefined
                            }
                            help={errors?.member_code}
                        >
                            <TextInput
                                placeholder="Mã thành viên"
                                value={data.member_code}
                                onChange={(ev) =>
                                    onChangeFormData(
                                        "member_code",
                                        ev.target.value
                                    )
                                }
                                className="w-full"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Họ và tên"
                            required
                            validateStatus={errors?.name ? "error" : undefined}
                            help={errors?.name}
                        >
                            <TextInput
                                placeholder="Họ và tên"
                                value={data.name}
                                onChange={(ev) =>
                                    onChangeFormData("name", ev.target.value)
                                }
                                className="w-full"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            required
                            validateStatus={errors?.email ? "error" : undefined}
                            help={errors?.email}
                        >
                            <TextInput
                                placeholder="Email"
                                value={data.email}
                                onChange={(ev) =>
                                    onChangeFormData("email", ev.target.value)
                                }
                                className="w-full"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Số điện thoại"
                            required
                            validateStatus={errors?.phone ? "error" : undefined}
                            help={errors?.phone}
                        >
                            <TextInput
                                placeholder="Số điện thoại"
                                value={data.phone}
                                onChange={(ev) =>
                                    onChangeFormData("phone", ev.target.value)
                                }
                                className="w-full"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Vị trí"
                            required
                            validateStatus={errors?.phone ? "error" : undefined}
                            help={errors?.phone}
                        >
                            <TextInput
                                placeholder="Vị trí"
                                value={data.position}
                                onChange={(ev) =>
                                    onChangeFormData(
                                        "position",
                                        ev.target.value
                                    )
                                }
                                className="w-full"
                            />
                        </Form.Item>
                        <Form.Item
                            required
                            label="Loại thành viên"
                            validateStatus={
                                errors?.member_type ? "error" : undefined
                            }
                            help={errors?.member_type}
                        >
                            <Select
                                value={
                                    data.member_type
                                        ? data.member_type
                                        : undefined
                                }
                                placeholder="Loại thành viên"
                                size="large"
                                options={[
                                    { label: "Employee", value: "employee" },
                                    { label: "Guest", value: "guest" },
                                ]}
                                onChange={(value) =>
                                    onChangeFormData("member_type", value)
                                }
                            />
                        </Form.Item>
                        <Form.Item
                            required
                            label="Kích hoạt"
                            validateStatus={
                                errors?.member_type ? "error" : undefined
                            }
                            help={errors?.member_type}
                        >
                            <Switch
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                                value={data.checked_in}
                                onChange={(checked: boolean) =>
                                    onChangeFormData("checked_in", checked)
                                }
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                size="large"
                                htmlType="submit"
                                disabled={processing}
                            >
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                </form>
            </div>
        </Drawer>
    );
};
export default DrawerMember;
