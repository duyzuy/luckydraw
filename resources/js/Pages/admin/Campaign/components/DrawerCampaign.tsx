import React, { useEffect, useState } from "react";
import { useForm, router } from "@inertiajs/react";
import {
    Button,
    DatePicker,
    Drawer,
    DrawerProps,
    Form,
    Input,
    Space,
} from "antd";
import { CampaignFormData } from "../modules/campaign.interface";
import { CampaignType } from "@/models/campaign";

import { useMessage } from "@/hooks/useMessage";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import ThumbnailUpload, {
    ThumbnailUploadProps,
} from "@/Components/ThumbnailUpload";

type DrawerCampaignProps = DrawerProps & {
    className?: string;
    onClose?: () => void;
    initialValue?: CampaignType;
    action?: "create" | "edit";
};
const DrawerCampaign: React.FC<DrawerCampaignProps> = ({
    onClose,
    open,
    action,
    initialValue,
}) => {
    const initFormdata = new CampaignFormData(
        "",
        "",
        undefined,
        "",
        undefined,
        undefined,
        undefined,
        undefined,
        "pending"
    );
    const { data, setData, errors, reset, processing, post, patch } =
        useForm(initFormdata);

    const message = useMessage();

    const [imageUrl, setImageUrl] = useState<string>();

    const onChange = (
        key: keyof CampaignFormData,
        value: CampaignFormData[keyof CampaignFormData]
    ) => {
        setData((oldData) => ({
            ...oldData,
            [key]: value,
        }));
    };

    const handleChangeThumbnail: ThumbnailUploadProps["onChange"] = (file) => {
        setData((oldData) => ({ ...oldData, image: file }));
    };

    const onChangeEventDate: RangePickerProps["onChange"] = (
        date,
        dateString
    ) => {
        if (date?.[0] && date?.[1]) {
            if (date[1].isBefore(date[0])) {
                message.error("Ngày kết thúc không hợp lệ");
                return;
            }
        }

        setData((oldData) => {
            return {
                ...oldData,
                end_date: date?.[1] ? date[1].format("DDMMMYYYY") : undefined,
                start_date: date?.[0] ? date[0].format("DDMMMYYYY") : undefined,
            };
        });
    };
    const onChangeEventRegistrationDate: RangePickerProps["onChange"] = (
        date,
        dateString
    ) => {
        if (date?.[0] && date?.[1]) {
            if (date[1].isBefore(date[0])) {
                message.error("Ngày kết thúc không hợp lệ");
                return;
            }
        }
        setData((oldData) => {
            return {
                ...oldData,
                valid_from: date?.[0] ? date[0].format("DDMMMYYYY") : undefined,
                valid_to: date?.[1] ? date[1].format("DDMMMYYYY") : undefined,
            };
        });
    };

    const handleSubmitFormdata = (
        submitType: "create" | "createAndPublish"
    ) => {
        router.post(
            route("campaign.store"),
            submitType === "create" ? data : { ...data, status: "publish" },
            {
                onSuccess: () => {
                    onClose?.();
                    reset();
                },
            }
        );
    };
    const handleUpdateData = () => {
        router.patch(
            route("campaign.update", initialValue?.id, true),
            { ...data, __method: "patch" },
            {
                onSuccess: () => {
                    onClose?.();
                    reset();
                },
            }
        );
    };
    const handleApproval = () => {
        initialValue &&
            router.put(
                route("campaign.update.status", initialValue.id),
                { status: "publish" },
                {
                    onSuccess: () => {
                        onClose?.();
                        reset();
                    },
                }
            );
    };

    useEffect(() => {
        setData(() => {
            return initialValue
                ? new CampaignFormData(
                      initialValue.name,
                      initialValue.content,
                      undefined,
                      initialValue.campaign_type,
                      dayjs(initialValue.start_date).format("DDMMMYYYY"),
                      dayjs(initialValue.end_date).format("DDMMMYYYY"),
                      dayjs(initialValue.valid_from).format("DDMMMYYYY"),
                      dayjs(initialValue.valid_to).format("DDMMMYYYY"),
                      initialValue.status
                  )
                : initFormdata;
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
            width={550}
            title={action === "create" ? "Thêm mới" : "Chỉnh sửa"}
            extra={
                initialValue?.status === "pending" ? (
                    <div>
                        <Button type="primary" onClick={handleApproval}>
                            Duyệt
                        </Button>
                    </div>
                ) : null
            }
        >
            <Form layout="vertical">
                <Form.Item
                    label="Tên chiến dịch"
                    required
                    validateStatus={errors.name ? "error" : undefined}
                    help={errors.name}
                >
                    <Input
                        placeholder="Tên chiến dịch"
                        value={data.name}
                        onChange={(evt) => onChange("name", evt.target.value)}
                    />
                </Form.Item>

                <Form.Item label="Hình ảnh">
                    <ThumbnailUpload
                        initThumbnailUrl={imageUrl}
                        onChange={handleChangeThumbnail}
                    />
                </Form.Item>
                <Form.Item label="Loại chiến dịch">
                    <Input
                        value={data.campaign_type}
                        onChange={(evt) =>
                            onChange("campaign_type", evt.target.value)
                        }
                    />
                </Form.Item>
                <Form.Item label="Nội dung chiến dịch">
                    <Input.TextArea
                        value={data.content}
                        rows={6}
                        onChange={(evt) =>
                            onChange("content", evt.target.value)
                        }
                    />
                </Form.Item>
                <Form.Item
                    label="Thời gian sự kiện"
                    required
                    validateStatus={
                        errors?.start_date || errors?.end_date
                            ? "error"
                            : undefined
                    }
                    help={errors?.start_date || errors?.end_date}
                >
                    <DatePicker.RangePicker
                        format={{
                            format: "DD MMM,YYYY",
                        }}
                        className="w-full"
                        placeholder={["Từ ngày", "Đến ngày"]}
                        value={[
                            data.start_date
                                ? dayjs(data.start_date)
                                : undefined,
                            data.end_date ? dayjs(data.end_date) : undefined,
                        ]}
                        disabledDate={(date) => {
                            return date.isBefore(dayjs());
                        }}
                        onChange={onChangeEventDate}
                    />
                </Form.Item>
                <Form.Item
                    label="Thời gian đăng ký"
                    required
                    validateStatus={
                        errors?.valid_from || errors?.valid_to
                            ? "error"
                            : undefined
                    }
                    help={errors?.valid_from || errors?.valid_to}
                >
                    <DatePicker.RangePicker
                        format={{
                            format: "DD MMM,YYYY",
                        }}
                        className="w-full"
                        placeholder={["Từ ngày", "Đến ngày"]}
                        value={[
                            data.valid_from
                                ? dayjs(data.valid_from)
                                : undefined,
                            data.valid_to ? dayjs(data.valid_to) : undefined,
                        ]}
                        onChange={onChangeEventRegistrationDate}
                        disabledDate={(date) => {
                            return (
                                dayjs(data.start_date, "DDMMMYYYY").isAfter(
                                    date
                                ) ||
                                dayjs(data.end_date, "DDMMMYYYY").isBefore(
                                    date
                                ) ||
                                date.isBefore(dayjs())
                            );
                        }}
                    />
                </Form.Item>
                {initialValue?.status !== "pending" ? (
                    <Form.Item>
                        <Space>
                            <Button
                                type="primary"
                                size="large"
                                htmlType="submit"
                                onClick={() =>
                                    action === "create"
                                        ? handleSubmitFormdata("create")
                                        : handleUpdateData()
                                }
                                className="w-36"
                            >
                                Lưu
                            </Button>
                            {action === "create" ? (
                                <Button
                                    type="primary"
                                    size="large"
                                    htmlType="submit"
                                    onClick={() =>
                                        handleSubmitFormdata("createAndPublish")
                                    }
                                    className="w-36"
                                >
                                    Lưu và duyệt
                                </Button>
                            ) : null}
                        </Space>
                    </Form.Item>
                ) : null}
            </Form>
        </Drawer>
    );
};
export default DrawerCampaign;
