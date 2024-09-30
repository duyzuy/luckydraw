import {
    Button,
    Form,
    Input,
    Popconfirm,
    Select,
    SelectProps,
    Space,
} from "antd";
import { useForm, router } from "@inertiajs/react";
import { CampaignType } from "@/models/campaign";
import { useRef, useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";
interface MemberImportFormProps {
    campaigns: CampaignType[];
    className?: string;
}
const MemberImportForm: React.FC<MemberImportFormProps> = ({
    campaigns,
    className,
}) => {
    const { data, setData, post, reset, errors } = useForm<{
        file?: File;
        campaign_id: string;
    }>(undefined);

    const elRef = useRef<HTMLDivElement>(null);
    const [showImportPanel, setShowImportPanel] = useState(false);

    const onChangeFile: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
        const file = evt.target.files?.[0];
        setData((oldData) => ({ ...oldData, file: file }));
    };

    useClickOutside(elRef, () => {
        setShowImportPanel(false);
    });
    const handleSelectCampaign: SelectProps<
        string,
        CampaignType
    >["onChange"] = (value, option) => {
        setData((oldData) => ({ ...oldData, campaign_id: value }));
    };
    const handleImportFile: React.FormEventHandler<HTMLFormElement> = (evt) => {
        evt.preventDefault();
        post(route("member.import"), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <div className="relative" ref={elRef}>
            <Button
                type="primary"
                danger
                style={{ height: 38 }}
                onClick={() => setShowImportPanel((prev) => !prev)}
            >
                Import
            </Button>
            {showImportPanel ? (
                <div
                    id="form-import__wraper"
                    className="form-import__wraper absolute bg-white p-6 shadow-lg z-10 w-[360px] right-0 rounded-lg"
                >
                    <Form
                        onSubmitCapture={handleImportFile}
                        component="form"
                        layout="vertical"
                    >
                        <Form.Item
                            label="Chọn chiến dịch"
                            required
                            validateStatus={
                                errors.campaign_id ? "error" : undefined
                            }
                            help={errors.campaign_id}
                        >
                            <Select
                                fieldNames={{ value: "id", label: "name" }}
                                placeholder="Chọn chiến dịch"
                                options={campaigns}
                                onChange={handleSelectCampaign}
                                getPopupContainer={() =>
                                    document.getElementById(
                                        "form-import__wraper"
                                    ) as HTMLElement
                                }
                                className="campaign-selector"
                            />
                        </Form.Item>
                        <Form.Item
                            required
                            validateStatus={errors?.file ? "error" : undefined}
                            help={errors?.file}
                        >
                            <Input type="file" onChange={onChangeFile} />
                        </Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ height: 38 }}
                        >
                            Import
                        </Button>
                    </Form>
                </div>
            ) : null}
        </div>
    );
};
export default MemberImportForm;
