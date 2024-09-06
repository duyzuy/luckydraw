import { Button, Checkbox, Drawer, Form, Select } from "antd";
import { PrizeFormData } from "../modules/prize.interface";

import { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import FormItem from "@/Components/FormItem";
import TextInput from "@/Components/TextInput";
import { useMessage } from "@/hooks/useMessage";
import { PrizeType } from "@/models/prize";
import { PrizeGroupType } from "@/models/prizeGroup";
type DrawerPrizeProps = {
    open?: boolean;
    onClose?: () => void;
    initialValue?: PrizeType;
    prizeGroupList: PrizeGroupType[];
};
const DrawerPrize: React.FC<DrawerPrizeProps> = ({
    open,
    onClose,
    initialValue,
    prizeGroupList,
}) => {
    const initFormData = new PrizeFormData("", "", "");

    const { data, setData, errors, reset, processing, put, patch } = useForm(
        initialValue ?? initFormData
    );
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

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (evt) => {
        evt.preventDefault();

        if (initialValue) {
            patch(route("prize.update", initialValue.id), {
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
                    <Form component="div" layout="vertical">
                        <Form.Item
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
                        </Form.Item>
                        <Form.Item
                            label="Hình ảnh"
                            validateStatus={errors?.image ? "error" : undefined}
                            help={errors?.image}
                            required
                        >
                            <TextInput
                                placeholder="Tên giải - en"
                                value={data.image}
                                onChange={(ev) =>
                                    onChangeFormData("image", ev.target.value)
                                }
                                className="w-full"
                            />
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
                                Cập nhật
                            </Button>
                        </FormItem>
                    </Form>
                </form>
            </div>
        </Drawer>
    );
};
export default DrawerPrize;
