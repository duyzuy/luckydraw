import { Button, Form, Input } from "antd";
import { useForm, router } from "@inertiajs/react";
import { CampaignType } from "@/models/campaign";
import { useRef, useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";

interface MemberImportFormProps {
    className?: string;
    campaign: CampaignType;
}
const MemberImportForm: React.FC<MemberImportFormProps> = ({
    className,
    campaign,
}) => {
    const { data, setData, post, reset, errors } = useForm<{
        file?: File;
        campaign_id: string;
    }>({ file: undefined, campaign_id: campaign.id });

    const elRef = useRef<HTMLDivElement>(null);
    const [showImportPanel, setShowImportPanel] = useState(false);

    const onChangeFile: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
        const file = evt.target.files?.[0];
        setData((oldData) => ({ ...oldData, file: file }));
    };

    useClickOutside(elRef, () => {
        setShowImportPanel(false);
    });

    const handleImportFile: React.FormEventHandler<HTMLFormElement> = () => {
        post(route("campaign.import.member", [campaign.id]), {
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
                size="large"
                onClick={() => setShowImportPanel((prev) => !prev)}
            >
                Import
            </Button>
            {showImportPanel ? (
                <div
                    id="form-import__wraper"
                    className="form-import__wraper absolute bg-white p-6 shadow-lg z-10 w-[360px] left-0 rounded-lg"
                >
                    <Form
                        onFinish={handleImportFile}
                        component="form"
                        layout="vertical"
                    >
                        <Form.Item
                            required
                            validateStatus={errors?.file ? "error" : undefined}
                            help={errors?.file}
                        >
                            <Input type="file" onChange={onChangeFile} />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" size="large">
                            Import
                        </Button>
                    </Form>
                </div>
            ) : null}
        </div>
    );
};
export default MemberImportForm;
