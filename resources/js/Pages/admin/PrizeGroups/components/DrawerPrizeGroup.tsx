import { Button, Checkbox, Drawer } from "antd";
import { PrizeGroupFromData } from "../modules/prizeGroup.interface";
import { PrizeGroupType } from "@/models/prizeGroup";
import { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import FormItem from "@/Components/FormItem";
import TextInput from "@/Components/TextInput";
import { useMessage } from "@/hooks/useMessage";
type DrawerPrizeGroupProps = {
    open?: boolean;
    onClose?: () => void;
    initialValue?: PrizeGroupType;
};
const DrawerPrizeGroup: React.FC<DrawerPrizeGroupProps> = ({
    open,
    onClose,
    initialValue,
}) => {
    const { data, setData, errors, reset, processing, put, patch } =
        useForm(initialValue);
    const message = useMessage();
    const onChangeFormData = (
        key: keyof PrizeGroupFromData,
        value: PrizeGroupFromData[keyof PrizeGroupFromData]
    ) => {
        setData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (evt) => {
        evt.preventDefault();
        if (initialValue) {
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
        initialValue && setData(initialValue);
    }, [initialValue]);

    return (
        <Drawer
            open={open}
            onClose={onClose}
            width={450}
            title={`Sửa - ${initialValue?.name}`}
        >
            <div className="form-wraper">
                <form onSubmit={handleSubmit}>
                    <FormItem
                        label="Tên giải"
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
                    </FormItem>
                    <FormItem
                        label="Tên giải - en"
                        validateStatus={errors?.eng_name ? "error" : undefined}
                        help={errors?.eng_name}
                    >
                        <TextInput
                            placeholder="Tên giải - en"
                            value={data.eng_name}
                            onChange={(ev) =>
                                onChangeFormData("eng_name", ev.target.value)
                            }
                            className="w-full"
                        />
                    </FormItem>
                    <FormItem
                        label="Order"
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
                    </FormItem>
                    <FormItem
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
                            />
                            Kich hoạt
                        </div>
                    </FormItem>
                    <FormItem
                        label="Loại Draw"
                        validateStatus={errors?.draw_type ? "error" : undefined}
                        help={errors?.draw_type}
                    >
                        <div className="flex items-center gap-x-3">
                            <div className="flex items-center">
                                <Checkbox
                                    className="mr-2"
                                    checked={data.draw_type === "per_one"}
                                    onChange={() =>
                                        onChangeFormData("draw_type", "per_one")
                                    }
                                />
                                Quay 1 lần
                            </div>
                            <div className="flex items-center">
                                <Checkbox
                                    className="mr-2"
                                    checked={data.draw_type === "all_one"}
                                    onChange={() =>
                                        onChangeFormData("draw_type", "all_one")
                                    }
                                />
                                Quay nhiều lần
                            </div>
                        </div>
                    </FormItem>
                    <FormItem>
                        <Button
                            type="primary"
                            size="large"
                            htmlType="submit"
                            disabled={processing}
                        >
                            Cập nhật
                        </Button>
                    </FormItem>
                </form>
            </div>
        </Drawer>
    );
};
export default DrawerPrizeGroup;
