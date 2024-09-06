import FormItem from "@/Components/FormItem";
import TextInput from "@/Components/TextInput";
import { PrizeGroupFromData } from "../modules/prizeGroup.interface";

import PrimaryButton from "@/Components/PrimaryButton";
import { Button, Checkbox } from "antd";

export type PrizeGroupFormProps = {
    value: PrizeGroupFromData;
    onChange?: (
        key: keyof PrizeGroupFromData,
        value: PrizeGroupFromData[keyof PrizeGroupFromData]
    ) => void;
    onSubmit?: React.FormEventHandler<HTMLFormElement>;
    errors?: Partial<Record<keyof PrizeGroupFromData, string>>;
    loading?: boolean;
};
const PrizeGroupForm: React.FC<PrizeGroupFormProps> = ({
    value,
    onSubmit,
    errors,
    onChange,
    loading,
}) => {
    return (
        <form onSubmit={onSubmit}>
            <FormItem
                label="Tên giải"
                htmlFor="prizeName"
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
            </FormItem>
            <FormItem
                label="Tên giải - en"
                validateStatus={errors?.eng_name ? "error" : undefined}
                help={errors?.eng_name}
            >
                <TextInput
                    placeholder="Tên giải - en"
                    value={value.eng_name}
                    onChange={(ev) => onChange?.("eng_name", ev.target.value)}
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
                    value={value.order}
                    onChange={(ev) => onChange?.("order", ev.target.value)}
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
                        checked={value.actived}
                        onChange={(ev) =>
                            onChange?.("actived", ev.target.checked)
                        }
                    >
                        Kich hoạt
                    </Checkbox>
                </div>
            </FormItem>
            <FormItem
                label="Loại Draw"
                validateStatus={errors?.draw_type ? "error" : undefined}
                help={errors?.draw_type}
            >
                <div className="flex items-center gap-x-3">
                    <Checkbox
                        className="mr-2"
                        checked={value.draw_type === "per_one"}
                        onChange={() => onChange?.("draw_type", "per_one")}
                    >
                        Quay 1 lần
                    </Checkbox>
                    <Checkbox
                        className="mr-2"
                        checked={value.draw_type === "all_one"}
                        onChange={() => onChange?.("draw_type", "all_one")}
                    >
                        Quay nhiều lần
                    </Checkbox>
                </div>
            </FormItem>
            <FormItem>
                <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    disabled={loading}
                >
                    Thêm mới
                </Button>
            </FormItem>
        </form>
    );
};
export default PrizeGroupForm;
