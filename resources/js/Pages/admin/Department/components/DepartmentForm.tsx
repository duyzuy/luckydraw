import { Button, Checkbox, Drawer, Form, Select, Space, Upload } from "antd";
import { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import FormItem from "@/Components/FormItem";
import TextInput from "@/Components/TextInput";
import { useMessage } from "@/hooks/useMessage";
import type { GetProp, UploadProps } from "antd";
import { DepartmentFormData } from "../modules/department.interface";
import { DepartmentType } from "@/models/department";

type DepartmentFormProps = {
    action?: "create" | "edit";
    initialValue?: DepartmentType;
    onCancel?: () => void;
};
const DepartmentForm: React.FC<DepartmentFormProps> = ({
    action,
    initialValue,
    onCancel,
}) => {
    const initFormdata = new DepartmentFormData("", "");
    const { data, setData, errors, reset, processing, post, patch } =
        useForm(initFormdata);

    const message = useMessage();
    const onChangeFormData = (
        key: keyof DepartmentFormData,
        value: DepartmentFormData[keyof DepartmentFormData]
    ) => {
        setData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = () => {
        if (initialValue && action === "edit") {
            patch(route("department.update", initialValue.id), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                },
            });
        }

        if (action === "create") {
            post(route("department.store"), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
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
                    label="Tên phòng ban"
                    required
                    validateStatus={errors?.name ? "error" : undefined}
                    help={errors?.name}
                >
                    <TextInput
                        name="prizeName"
                        placeholder="Tên phòng ban"
                        size="large"
                        value={data.name}
                        onChange={(ev) =>
                            onChangeFormData("name", ev.target.value)
                        }
                        className="w-full"
                    />
                </Form.Item>
                <Form.Item
                    label="Tên phòng ban - en"
                    required
                    validateStatus={errors?.eng_name ? "error" : undefined}
                    help={errors?.eng_name}
                >
                    <TextInput
                        placeholder="Tên phòng ban - en"
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
export default DepartmentForm;
