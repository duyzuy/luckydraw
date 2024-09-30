import {
    Button,
    Checkbox,
    Drawer,
    Form,
    Input,
    InputNumber,
    Select,
    Upload,
} from "antd";

import { PrizeFormData } from "../../modules/prize.interface";
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
import ThumbnailUpload, {
    ThumbnailUploadProps,
} from "@/Components/ThumbnailUpload";

type DrawerPrizeFormProps = {
    open?: boolean;
    action?: "create" | "edit";
    onClose?: () => void;
    initialValue?: PrizeType;
    prizeGroupList: PrizeGroupType[];
    campaignId: string;
};
const DrawerPrizeForm: React.FC<DrawerPrizeFormProps> = ({
    open,
    action,
    onClose,
    initialValue,
    prizeGroupList,
    campaignId,
}) => {
    const initFormdata = new PrizeFormData("", undefined, "", 1);
    const { data, setData, errors, reset, processing, post, patch } =
        useForm(initFormdata);
    const [imageUrl, setImageUrl] = useState<string>();

    const onChangeFormData = (
        key: keyof PrizeFormData,
        value: PrizeFormData[keyof PrizeFormData]
    ) => {
        setData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };
    const handleChangeQuantity = (value: number | null) => {
        setData((prev) => ({
            ...prev,
            quantity: value && value > 0 ? value : 1,
        }));
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = () => {
        if (initialValue && action === "edit") {
            patch(
                route("campaign.update.prize", [campaignId, initialValue.id]),
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        onClose?.();
                        reset();
                    },
                }
            );
        }

        if (action === "create") {
            post(route("campaign.store.prize", [campaignId]), {
                preserveScroll: true,
                onSuccess: () => {
                    onClose?.();
                    reset();
                },
            });
        }
    };

    const handleChangeFileUpload: ThumbnailUploadProps["onChange"] = (file) => {
        setData((old) => ({ ...old, file: file }));
    };

    useEffect(() => {
        setData(() =>
            initialValue
                ? {
                      name: initialValue.name,
                      prize_group_id: initialValue.prize_group_id,
                      quantity: initialValue.quantity,
                  }
                : initFormdata
        );
        setImageUrl(
            initialValue?.image ? `/storage/${initialValue.image}` : undefined
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
                        <ThumbnailUpload
                            action={route("campaign.store")}
                            initThumbnailUrl={imageUrl}
                            onChange={handleChangeFileUpload}
                        />
                    </Form.Item>
                    {action === "create" ? (
                        <Form.Item
                            label="Số lượng"
                            htmlFor="prizeQuantity"
                            required
                            validateStatus={
                                errors?.quantity ? "error" : undefined
                            }
                            help={errors?.quantity}
                        >
                            <InputNumber
                                name="prizeQuantity"
                                placeholder="Số lượng"
                                size="large"
                                value={data.quantity}
                                onChange={handleChangeQuantity}
                                className="w-full"
                            />
                        </Form.Item>
                    ) : null}
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
