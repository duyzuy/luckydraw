import {
    Button,
    Checkbox,
    Drawer,
    Form,
    GetProp,
    Select,
    SelectProps,
    Upload,
    UploadProps,
} from "antd";
import { PrizeGroupFromData } from "../modules/prizeGroup.interface";
import { PrizeGroupType } from "@/models/prizeGroup";
import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import { useMessage } from "@/hooks/useMessage";
import { CampaignType } from "@/models/campaign";
import PrizeGroupForm from "./PrizeGroupForm";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import ThumbnailUpload, {
    ThumbnailUploadProps,
} from "@/Components/ThumbnailUpload";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

type DrawerPrizeGroupProps = {
    open?: boolean;
    onClose?: () => void;
    initialValue?: PrizeGroupType;
    campaigns: CampaignType[];
    action?: "create" | "edit";
};
const DrawerPrizeGroup: React.FC<DrawerPrizeGroupProps> = ({
    open,
    onClose,
    initialValue,
    action,
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

    const { data, setData, post, processing, errors, reset, progress, patch } =
        useForm(initFormData);
    const message = useMessage();

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
    const handleChangeFileUpload: ThumbnailUploadProps["onChange"] = (file) => {
        setData((old) => ({ ...old, image: file }));
    };

    const handleSubmit = () => {
        if (action === "create") {
            post(route("prizeGroup.store"), {
                preserveScroll: true,
                onSuccess: () => {
                    message.success("Thêm mới thành công.");
                    setImageUrl(undefined);
                    onClose?.();
                    reset();
                },
            });
        }

        if (initialValue && action === "edit") {
            patch(`/prize-group/${initialValue.id}`, {
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
        setData(() => {
            return initialValue
                ? new PrizeGroupFromData(
                      initialValue.name,
                      undefined,
                      initialValue.campaign_id,
                      initialValue.actived,
                      initialValue.order,
                      initialValue.draw_type
                  )
                : initFormData;
        });
        initialValue && setImageUrl(`/storage/${initialValue.image}`);
    }, [initialValue]);

    return (
        <Drawer
            open={open}
            onClose={onClose}
            destroyOnClose
            width={450}
            title={`Sửa - ${initialValue?.name}`}
        >
            <div className="form-wraper">
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
                            onChange={(ev) =>
                                onChangeFormData("name", ev.target.value)
                            }
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
                        <ThumbnailUpload
                            initThumbnailUrl={imageUrl}
                            onChange={handleChangeFileUpload}
                        />
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
                                    onChangeFormData(
                                        "actived",
                                        ev.target.checked
                                    )
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
            </div>
        </Drawer>
    );
};
export default DrawerPrizeGroup;

const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
};
