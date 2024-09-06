import TextInput from "@/Components/TextInput";
import { PrizeFormData } from "../modules/prize.interface";

import { Button, Checkbox, Form, Input, Select } from "antd";

import { PrizeGroupType } from "@/models/prizeGroup";

export type PrizeFormProps = {
    value: PrizeFormData;
    prizeGroupList: PrizeGroupType[];
    onChange?: (
        key: keyof PrizeFormData,
        value: PrizeFormData[keyof PrizeFormData]
    ) => void;
    onSubmit?: React.FormEventHandler<HTMLFormElement>;
    errors?: Partial<Record<keyof PrizeFormData, string>>;
    loading?: boolean;
};
const PrizeForm: React.FC<PrizeFormProps> = ({
    value,
    onSubmit,
    errors,
    onChange,
    loading,
    prizeGroupList,
}) => {
    return (
        <form onSubmit={onSubmit}>
            <Form component="div" layout="vertical">
                <Form.Item
                    label="Tên giải"
                    htmlFor="prizeName"
                    required
                    validateStatus={errors?.name ? "error" : undefined}
                    help={errors?.name}
                >
                    <TextInput
                        name="prizeName"
                        placeholder="Tên giải"
                        value={value.name}
                        onChange={(ev) => onChange?.("name", ev.target.value)}
                        className="w-full"
                    />
                </Form.Item>
                <Form.Item
                    label="Hình ảnh"
                    required
                    validateStatus={errors?.image ? "error" : undefined}
                    help={errors?.image}
                >
                    <TextInput
                        placeholder="Hình ảnh"
                        value={value.image}
                        onChange={(ev) => onChange?.("image", ev.target.value)}
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
                            value.prize_group_id
                                ? value.prize_group_id
                                : undefined
                        }
                        placeholder="Chọn nhóm giải"
                        size="large"
                        options={prizeGroupList}
                        fieldNames={{ value: "id", label: "name" }}
                        onChange={(value) =>
                            onChange?.("prize_group_id", value)
                        }
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        size="large"
                        htmlType="submit"
                        disabled={loading}
                    >
                        Thêm mới
                    </Button>
                </Form.Item>
            </Form>
        </form>
    );
};
export default PrizeForm;
