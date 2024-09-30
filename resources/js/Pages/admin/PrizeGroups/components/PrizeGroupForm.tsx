import TextInput from "@/Components/TextInput";
import { PrizeGroupFromData } from "../modules/prizeGroup.interface";
import {
    Button,
    Checkbox,
    Form,
    Input,
    Upload,
    GetProp,
    UploadProps,
    Select,
    SelectProps,
} from "antd";
import { useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import { PrizeGroupType } from "@/models/prizeGroup";

import { useMessage } from "@/hooks/useMessage";
import { CampaignType } from "@/models/campaign";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export type PrizeGroupFormProps = {
    className?: string;
    campaigns: CampaignType[];
};
const PrizeGroupForm: React.FC<PrizeGroupFormProps> = ({
    className,
    campaigns,
}) => {
    const initFormData = new PrizeGroupFromData(
        "",
        undefined,
        undefined,
        true,
        0,
        "per_one"
    );

    const { data, setData, post, processing, errors, reset, progress } =
        useForm(initFormData);
    const message = useMessage();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    const onChangeFormData = (
        key: keyof PrizeGroupFromData,
        value: PrizeGroupFromData[keyof PrizeGroupFromData]
    ) => {
        setData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleChangeCampaign: SelectProps<
        string,
        CampaignType
    >["onChange"] = (value) => {
        setData((oldData) => ({
            ...oldData,
            campaign_id: value,
        }));
    };
    const handleChangeFileUpload: UploadProps["onChange"] = (info) => {
        if (info.file.status === "uploading") {
            setLoading(true);
            return;
        }
        if (info.file.status === "done") {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as FileType, (url) => {
                setLoading(false);
                setImageUrl(url);
                setData((old) => ({ ...old, image: info.file.originFileObj }));
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
    const handleSubmit = () => {
        post("/prize-group", {
            preserveScroll: true,
            onSuccess: () => {
                message.success("Thêm mới thành công.");
                setImageUrl(undefined);
                reset();
            },
        });
    };

    return (
        <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
                label="Chiến dịch"
                required
                validateStatus={errors?.name ? "error" : undefined}
                help={errors?.name}
            >
                <Select
                    value={data.campaign_id}
                    placeholder="Chọn chiến dịch"
                    fieldNames={{ value: "id", label: "name" }}
                    options={campaigns}
                    onChange={handleChangeCampaign}
                />
            </Form.Item>
            <Form.Item
                label="Tên giải"
                required
                htmlFor="prizeName"
                validateStatus={errors?.name ? "error" : undefined}
                help={errors?.name}
            >
                <TextInput
                    name="prizeName"
                    placeholder="Tên giải"
                    value={data.name}
                    onChange={(ev) => onChangeFormData("name", ev.target.value)}
                    className="w-full"
                />
            </Form.Item>

            <Form.Item
                label="Priority"
                validateStatus={errors?.order ? "error" : undefined}
                help={errors?.order}
            >
                <TextInput
                    placeholder="Order"
                    value={data.order}
                    onChange={(ev) =>
                        onChangeFormData("order", ev.target.value)
                    }
                    className="w-full"
                />
            </Form.Item>
            <Form.Item label="Hình ảnh">
                <Upload
                    name="image"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    onChange={handleChangeFileUpload}
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
                label="Trạng thái"
                validateStatus={errors?.actived ? "error" : undefined}
                help={errors?.actived}
            >
                <div className="flex items-center">
                    <Checkbox
                        className="mr-2"
                        checked={data.actived}
                        onChange={(ev) =>
                            onChangeFormData("actived", ev.target.checked)
                        }
                    >
                        Kich hoạt
                    </Checkbox>
                </div>
            </Form.Item>
            <Form.Item
                label="Loại Draw"
                validateStatus={errors?.draw_type ? "error" : undefined}
                help={errors?.draw_type}
            >
                <div className="flex items-center gap-x-3">
                    <Checkbox
                        className="mr-2"
                        checked={data.draw_type === "per_one"}
                        onChange={() =>
                            onChangeFormData("draw_type", "per_one")
                        }
                    >
                        Quay 1 lần
                    </Checkbox>
                    <Checkbox
                        className="mr-2"
                        checked={data.draw_type === "all_one"}
                        onChange={() =>
                            onChangeFormData("draw_type", "all_one")
                        }
                    >
                        Quay nhiều lần
                    </Checkbox>
                </div>
            </Form.Item>
            <Form.Item>
                <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    loading={processing}
                >
                    Thêm mới
                </Button>
            </Form.Item>
        </Form>
    );
};
export default PrizeGroupForm;

const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
};
