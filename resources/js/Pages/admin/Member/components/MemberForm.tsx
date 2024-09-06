import TextInput from "@/Components/TextInput";
import { MemberFormData } from "../modules/member.interface";
import { Button, Col, Form, Row, Select, Switch } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

export type MemberFormProps = {
    value: MemberFormData;
    onChange?: (
        key: keyof MemberFormData,
        value: MemberFormData[keyof MemberFormData]
    ) => void;
    onSubmit?: React.FormEventHandler<HTMLFormElement>;
    errors?: Partial<Record<keyof MemberFormData, string>>;
    loading?: boolean;
};
const MemberForm: React.FC<MemberFormProps> = ({
    value,
    onSubmit,
    errors,
    onChange,
    loading,
}) => {
    return (
        <form onSubmit={onSubmit}>
            <Form component="div" layout="vertical">
                <Row gutter={24}>
                    <Col span={12}>
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
                                value={value.member_code}
                                onChange={(ev) =>
                                    onChange?.("member_code", ev.target.value)
                                }
                                className="w-full"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Họ và tên"
                            required
                            validateStatus={errors?.name ? "error" : undefined}
                            help={errors?.name}
                        >
                            <TextInput
                                placeholder="Họ và tên"
                                value={value.name}
                                onChange={(ev) =>
                                    onChange?.("name", ev.target.value)
                                }
                                className="w-full"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Email"
                            required
                            validateStatus={errors?.email ? "error" : undefined}
                            help={errors?.email}
                        >
                            <TextInput
                                placeholder="Email"
                                value={value.email}
                                onChange={(ev) =>
                                    onChange?.("email", ev.target.value)
                                }
                                className="w-full"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Số điện thoại"
                            required
                            validateStatus={errors?.phone ? "error" : undefined}
                            help={errors?.phone}
                        >
                            <TextInput
                                placeholder="Số điện thoại"
                                value={value.phone}
                                onChange={(ev) =>
                                    onChange?.("phone", ev.target.value)
                                }
                                className="w-full"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Địa chỉ">
                            <TextInput
                                placeholder="Địa chỉ"
                                value={value.address}
                                onChange={(ev) =>
                                    onChange?.("address", ev.target.value)
                                }
                                className="w-full"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
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
                                    value.member_type
                                        ? value.member_type
                                        : undefined
                                }
                                placeholder="Loại thành viên"
                                size="large"
                                options={[
                                    { label: "Employee", value: "employee" },
                                    { label: "Guest", value: "guest" },
                                ]}
                                onChange={(value) =>
                                    onChange?.("member_type", value)
                                }
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Bộ phận"
                            validateStatus={
                                errors?.department ? "error" : undefined
                            }
                            help={errors?.department}
                        >
                            <TextInput
                                placeholder="Bộ phận"
                                value={value.department}
                                onChange={(ev) =>
                                    onChange?.("department", ev.target.value)
                                }
                                className="w-full"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Vị trí"
                            validateStatus={
                                errors?.position ? "error" : undefined
                            }
                            help={errors?.position}
                        >
                            <TextInput
                                placeholder="Vị trí"
                                value={value.position}
                                onChange={(ev) =>
                                    onChange?.("position", ev.target.value)
                                }
                                className="w-full"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item
                    required
                    label="Kích hoạt"
                    validateStatus={errors?.member_type ? "error" : undefined}
                    help={errors?.member_type}
                >
                    <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        value={value.checked_in}
                        onChange={(checked: boolean) =>
                            onChange?.("checked_in", checked)
                        }
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        size="large"
                        htmlType="submit"
                        disabled={loading}
                    >
                        Thêm mới
                    </Button>
                </Form.Item>
            </Form>
        </form>
    );
};
export default MemberForm;
