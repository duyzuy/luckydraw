import { FolderType } from "@/models/Folder";
import { Button, Form, Input, Select, SelectProps } from "antd";

import { useForm } from "@inertiajs/react";
import { useMessage } from "@/hooks/useMessage";

type FolderCreateFormProps = {
    folderParentList?: FolderType[];
};

const FolderCreateForm: React.FC<FolderCreateFormProps> = ({
    folderParentList,
}) => {
    const message = useMessage();
    const {
        data: formData,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm<{ folderName?: string; folderParent?: FolderType }>({
        folderName: "",
        folderParent: undefined,
    });

    const handleSubmit = () => {
        post(route("folder.store"), {
            preserveScroll: true,
            onSuccess: () => {
                message.success("Tạo thư mục thành công.");
                reset();
            },
        });
    };
    const onChangeName = (value: string) => {
        setData((old) => ({ ...old, folderName: value }));
    };
    const onChangeParent: SelectProps<string, FolderType>["onChange"] = (
        value,
        option
    ) => {
        setData((old) => ({
            ...old,
            folderParent: Array.isArray(option) ? option[0] : option,
        }));
    };

    return (
        <Form layout="vertical" onFinish={handleSubmit}>
            <h3 className="mb-3 font-bold">Tạo thư mục</h3>
            <Form.Item
                required
                validateStatus={errors.folderName ? "error" : undefined}
                help={errors?.folderName}
            >
                <Input
                    placeholder="Tên thư mục *"
                    onChange={(evt) => onChangeName(evt.target.value)}
                    value={formData.folderName}
                />
            </Form.Item>
            <Form.Item>
                <Select
                    value={formData?.folderParent?.id}
                    placeholder="Thư mục cha"
                    fieldNames={{ value: "id", label: "folder_name" }}
                    options={folderParentList}
                    onChange={onChangeParent}
                />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={processing}>
                Lưu
            </Button>
        </Form>
    );
};
export default FolderCreateForm;
