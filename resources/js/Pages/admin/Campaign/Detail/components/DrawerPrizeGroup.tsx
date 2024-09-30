import { Button, Checkbox, Drawer, Form, GetProp, UploadProps } from "antd";
import { PrizeGroupFromData } from "../../modules/prizeGroup.interface";
import { PrizeGroupType } from "@/models/prizeGroup";
import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";

import ThumbnailUpload, {
    ThumbnailUploadProps,
} from "@/Components/ThumbnailUpload";

type DrawerPrizeGroupProps = {
    open?: boolean;
    onClose?: () => void;
    initialValue?: PrizeGroupType;
    campaignId: string;
    action?: "create" | "edit";
};
const DrawerPrizeGroup: React.FC<DrawerPrizeGroupProps> = ({
    open,
    onClose,
    initialValue,
    action,
    campaignId,
}) => {
    const initFormData = new PrizeGroupFromData(
        "",
        undefined,
        campaignId,
        true,
        0,
        "per_one"
    );

    const { data, setData, post, processing, errors, reset, progress, patch } =
        useForm(initFormData);

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

    const handleChangeFileUpload: ThumbnailUploadProps["onChange"] = (file) => {
        setData((old) => ({ ...old, image: file }));
    };

    const handleSubmit = () => {
        if (action === "create") {
            post(route("campaign.store.prizeGroup", campaignId), {
                preserveScroll: true,
                onSuccess: () => {
                    setImageUrl(undefined);
                    onClose?.();
                    reset();
                },
            });
        }

        if (initialValue && action === "edit") {
            patch(
                route("campaign.update.prizeGroup", [
                    campaignId,
                    initialValue.id,
                ]),
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        onClose?.();
                        reset();
                    },
                }
            );
        }
    };
    useEffect(() => {
        setData(() => {
            return initialValue
                ? new PrizeGroupFromData(
                      initialValue.name,
                      undefined,
                      campaignId,
                      initialValue.actived,
                      initialValue.order,
                      initialValue.draw_type
                  )
                : initFormData;
        });
        setImageUrl(
            initialValue?.image ? `/storage/${initialValue.image}` : undefined
        );
    }, [initialValue]);

    return (
        <Drawer
            open={open}
            onClose={onClose}
            destroyOnClose
            width={450}
            title={
                action === "create" ? "Thêm mới" : `Sửa - ${initialValue?.name}`
            }
        >
            <div className="form-wraper">
                <Form layout="vertical" onFinish={handleSubmit}>
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
                            action={route("campaign.store")}
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
                                checked={data.draw_type === "all_one"}
                                onChange={() =>
                                    onChangeFormData("draw_type", "all_one")
                                }
                            >
                                Quay 1 lần
                            </Checkbox>
                            <Checkbox
                                className="mr-2"
                                checked={data.draw_type === "per_one"}
                                onChange={() =>
                                    onChangeFormData("draw_type", "per_one")
                                }
                            >
                                Quay nhiều lần
                            </Checkbox>
                        </div>
                        <div className=" pt-6">
                            <p>Lưu ý:</p>
                            <ul>
                                <li>
                                    Quay 1 lần: là quay 1 lần ra hết toàn bộ
                                    winner của giải.
                                </li>
                                <li>
                                    Quay nhiều lần: là quay 1 lần ra 1 winner
                                    của giải.
                                </li>
                            </ul>
                        </div>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            size="large"
                            htmlType="submit"
                            loading={processing}
                        >
                            Lưu
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Drawer>
    );
};
export default DrawerPrizeGroup;
