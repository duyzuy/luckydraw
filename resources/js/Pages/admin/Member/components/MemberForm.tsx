import TextInput from "@/Components/TextInput";
import { MemberFormData } from "../modules/member.interface";
import { Button, Col, Form, Row, Select, Switch } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { usePage } from "@inertiajs/react";

export type MemberFormProps = {
    value: MemberFormData;
    onChange?: (
        key: keyof MemberFormData,
        value: MemberFormData[keyof MemberFormData]
    ) => void;
    onSubmit?: React.FormEventHandler<HTMLFormElement>;
    buttonSubmitText?: string;
    errors?: Partial<Record<keyof MemberFormData, string>>;
    loading?: boolean;
};
const MemberForm: React.FC<MemberFormProps> = ({
    value,
    onSubmit,
    buttonSubmitText = "Lưu",
    errors,
    onChange,
    loading,
}) => {
    const {
        props: {
            share: { campaigns },
        },
    } = usePage();

    return (
        <Form layout="vertical" onFinish={onSubmit}>
            <Row gutter={24}>
                <Col span={24}>
                    <Form.Item
                        label="Chiến dịch"
                        validateStatus={
                            errors?.campaign_id ? "error" : undefined
                        }
                        help={errors?.campaign_id}
                    >
                        <Select
                            value={value.campaign_id ?? undefined}
                            fieldNames={{ value: "id", label: "name" }}
                            options={campaigns}
                            placeholder="Bộ phận"
                            className="w-full"
                        />
                    </Form.Item>
                </Col>
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
                        validateStatus={errors?.full_name ? "error" : undefined}
                        help={errors?.full_name}
                    >
                        <TextInput
                            placeholder="Họ và tên"
                            value={value.full_name}
                            onChange={(ev) =>
                                onChange?.("full_name", ev.target.value)
                            }
                            className="w-full"
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Họ"
                        validateStatus={errors?.last_name ? "error" : undefined}
                        help={errors?.last_name}
                    >
                        <TextInput
                            placeholder="Họ"
                            value={value.last_name}
                            onChange={(ev) =>
                                onChange?.("last_name", ev.target.value)
                            }
                            className="w-full"
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Tên đệm và tên"
                        validateStatus={
                            errors?.first_name ? "error" : undefined
                        }
                        help={errors?.first_name}
                    >
                        <TextInput
                            placeholder="Tên đệm và tên"
                            value={value.first_name}
                            onChange={(ev) =>
                                onChange?.("first_name", ev.target.value)
                            }
                            className="w-full"
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Email"
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
                <Col span={12}>
                    <Form.Item label="Quốc gia">
                        <TextInput
                            placeholder="Quốc gia"
                            value={value.country}
                            onChange={(ev) =>
                                onChange?.("country", ev.target.value)
                            }
                            className="w-full"
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Thành phố">
                        <TextInput
                            placeholder="Tỉnh thành"
                            value={value.city}
                            onChange={(ev) =>
                                onChange?.("city", ev.target.value)
                            }
                            className="w-full"
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Quận huyện">
                        <TextInput
                            placeholder="Quận huyện"
                            value={value.province}
                            onChange={(ev) =>
                                onChange?.("province", ev.target.value)
                            }
                            className="w-full"
                        />
                    </Form.Item>
                </Col>

                <Col span={12}>
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
                <Col span={12}>
                    <Form.Item label="Công ty">
                        <TextInput
                            placeholder="Công ty"
                            value={value.company}
                            onChange={(ev) =>
                                onChange?.("company", ev.target.value)
                            }
                            className="w-full"
                        />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item label="Địa chỉ">
                        <TextInput
                            placeholder="Địa chỉ"
                            value={value.department_id}
                            onChange={(ev) =>
                                onChange?.("department_id", ev.target.value)
                            }
                            className="w-full"
                        />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
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
                            errors?.department_id ? "error" : undefined
                        }
                        help={errors?.department_id}
                    >
                        <Select
                            placeholder="Bộ phận"
                            value={value.department_id ?? undefined}
                            fieldNames={{ value: "id", label: "name" }}
                            options={campaigns}
                            className="w-full"
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Vị trí"
                        validateStatus={errors?.position ? "error" : undefined}
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
            <Form.Item label="Check in">
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
                    {buttonSubmitText}
                </Button>
            </Form.Item>
        </Form>
    );
};
export default MemberForm;
