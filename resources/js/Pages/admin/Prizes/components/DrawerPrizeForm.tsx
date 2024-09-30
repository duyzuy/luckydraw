import { Button, Checkbox, Drawer, Form, Select, Upload } from "antd";
import { PrizeFormData } from "../modules/prize.interface";

import { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import FormItem from "@/Components/FormItem";
import TextInput from "@/Components/TextInput";
import { useMessage } from "@/hooks/useMessage";
import { PrizeType } from "@/models/prize";
import { PrizeGroupType } from "@/models/prizeGroup";
import { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import type { GetProp, UploadProps } from "antd";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

type DrawerPrizeFormProps = {
    open?: boolean;
    action?: "create" | "update";
    onClose?: () => void;
    initialValue?: PrizeType;
    prizeGroupList: PrizeGroupType[];
};
const DrawerPrizeForm: React.FC<DrawerPrizeFormProps> = ({
    open,
    action,
    onClose,
    initialValue,
    prizeGroupList,
}) => {
    const initFormdata = new PrizeFormData("", undefined, "");
    const { data, setData, errors, reset, processing, post, patch } =
        useForm(initFormdata);

    const message = useMessage();
    const onChangeFormData = (
        key: keyof PrizeFormData,
        value: PrizeFormData[keyof PrizeFormData]
    ) => {
        setData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = () => {
        if (initialValue && action === "update") {
            patch(route("prize.update", initialValue.id), {
                preserveScroll: true,
                onSuccess: () => {
                    message.success("Cập nhật thành công");
                    onClose?.();
                    reset();
                },
            });
        }

        if (action === "create") {
            post(route("prize.store"), {
                preserveScroll: true,
                onSuccess: () => {
                    message.success("Thêm mới thành công.");
                    onClose?.();
                    reset();
                },
            });
        }
    };

    const getBase64 = (img: FileType, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener("load", () =>
            callback(reader.result as string)
        );
        reader.readAsDataURL(img);
    };

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    const handleChange: UploadProps["onChange"] = (info) => {
        if (info.file.status === "uploading") {
            setLoading(true);
            return;
        }
        if (info.file.status === "done") {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as FileType, (url) => {
                setLoading(false);
                setImageUrl(url);
                setData((old) => ({ ...old, file: info.file.originFileObj }));
            });
        }
    };

    const uploadButton = (
        <button style={{ border: 0, background: "none" }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    const beforeUpload = (file: FileType) => {
        const isJpgOrPng =
            file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
            message.error("You can only upload JPG/PNG file!");
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error("Image must smaller than 2MB!");
        }
        return isJpgOrPng && isLt2M;
    };

    useEffect(() => {
        setData(() =>
            initialValue
                ? {
                      name: initialValue.name,
                      prize_group_id: initialValue.prize_group_id,
                  }
                : initFormdata
        );
        setImageUrl(
            initialValue?.image ? `storage/${initialValue.image}` : undefined
        );
    }, [initialValue]);

    return (
        <Drawer
            open={open}
            onClose={onClose}
            destroyOnClose={true}
            width={450}
            title={action === "create" ? "Thêm mới" : "Cập nhật"}
        >
            <div className="form-wraper">
                <Form onFinish={handleSubmit} layout="vertical">
                    <Form.Item
                        label="Tên phần quà"
                        htmlFor="prizeName"
                        required
                        validateStatus={errors?.name ? "error" : undefined}
                        help={errors?.name}
                    >
                        <TextInput
                            name="prizeName"
                            placeholder="Tên giải"
                            size="large"
                            value={data.name}
                            onChange={(ev) =>
                                onChangeFormData("name", ev.target.value)
                            }
                            className="w-full"
                        />
                    </Form.Item>
                    <Form.Item label="Hình ảnh">
                        <Upload
                            name="prize_image"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            // action={route("media.store.single")}
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                            accept="image/png, image/jpeg"
                            multiple={false}
                        >
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt="prize"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain",
                                    }}
                                />
                            ) : (
                                uploadButton
                            )}
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        required
                        label="Chọn nhóm giải"
                        validateStatus={
                            errors?.prize_group_id ? "error" : undefined
                        }
                        help={errors?.prize_group_id}
                    >
                        <Select
                            value={
                                data.prize_group_id
                                    ? data.prize_group_id
                                    : undefined
                            }
                            placeholder="Chọn nhóm giải"
                            size="large"
                            options={prizeGroupList}
                            fieldNames={{ value: "id", label: "name" }}
                            onChange={(value) =>
                                onChangeFormData?.("prize_group_id", value)
                            }
                        />
                    </Form.Item>
                    <FormItem>
                        <Button
                            type="primary"
                            size="large"
                            htmlType="submit"
                            disabled={processing}
                        >
                            Lưu và đóng
                        </Button>
                    </FormItem>
                </Form>
            </div>
        </Drawer>
    );
};
export default DrawerPrizeForm;
