import { Button, Form, Space } from "antd";
import { useEffect } from "react";
import { useForm } from "@inertiajs/react";

import TextInput from "@/Components/TextInput";
import { useMessage } from "@/hooks/useMessage";

import { CompanyFormData } from "../modules/company.interface";

import { CompanyType } from "@/models/company";

type CompanyFormProps = {
    action?: "create" | "edit";
    initialValue?: CompanyType;
    onCancel?: () => void;
};
const CompanyForm: React.FC<CompanyFormProps> = ({
    action,
    initialValue,
    onCancel,
}) => {
    const initFormdata = new CompanyFormData("", "");
    const { data, setData, errors, reset, processing, post, patch } =
        useForm(initFormdata);

    const message = useMessage();
    const onChangeFormData = (
        key: keyof CompanyFormData,
        value: CompanyFormData[keyof CompanyFormData]
    ) => {
        setData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = () => {
        if (initialValue && action === "edit") {
            patch(route("company.update", initialValue.id), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    onCancel?.();
                },
            });
        }

        if (action === "create") {
            post(route("company.store"), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    onCancel?.();
                },
            });
        }
    };

    useEffect(() => {
        setData(() =>
            initialValue
                ? {
                      name: initialValue.name,
                      eng_name: initialValue.eng_name,
                  }
                : initFormdata
        );
    }, [initialValue]);

    return (
        <div className="form-wraper">
            <Form onFinish={handleSubmit} layout="vertical">
                <Form.Item
                    label="Tên công ty"
                    required
                    validateStatus={errors?.name ? "error" : undefined}
                    help={errors?.name}
                >
                    <TextInput
                        placeholder="Tên công ty"
                        size="large"
                        value={data.name}
                        onChange={(ev) =>
                            onChangeFormData("name", ev.target.value)
                        }
                        className="w-full"
                    />
                </Form.Item>
                <Form.Item
                    label="Tên công ty - en"
                    required
                    validateStatus={errors?.eng_name ? "error" : undefined}
                    help={errors?.eng_name}
                >
                    <TextInput
                        placeholder="Tên công ty - en"
                        size="large"
                        value={data.eng_name}
                        onChange={(ev) =>
                            onChangeFormData("eng_name", ev.target.value)
                        }
                        className="w-full"
                    />
                </Form.Item>

                <Space>
                    <Button
                        type="primary"
                        size="large"
                        htmlType="submit"
                        disabled={processing}
                        className="w-[120px]"
                    >
                        Lưu
                    </Button>
                    {action === "edit" && (
                        <Button
                            type="primary"
                            size="large"
                            onClick={onCancel}
                            danger
                            className="w-[120px]"
                        >
                            Huỷ bỏ
                        </Button>
                    )}
                </Space>
            </Form>
        </div>
    );
};
export default CompanyForm;
