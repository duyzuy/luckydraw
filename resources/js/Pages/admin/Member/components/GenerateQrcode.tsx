import { Button, Form } from "antd";
import { router } from "@inertiajs/react";
import { useState } from "react";
const GenerateQrcode = () => {
    const [loading, setLoading] = useState(false);
    const handleGenerateQRcode = () => {
        router.post(route("member.generate.qrcode"), undefined, {
            onStart: () => {
                setLoading(true);
            },
            onFinish: () => {
                setLoading(false);
            },
        });
    };

    return (
        <Form onFinish={handleGenerateQRcode}>
            <Form.Item>
                <Button
                    type="primary"
                    danger
                    size="large"
                    htmlType="submit"
                    loading={loading}
                >
                    Generate Qrcode
                </Button>
            </Form.Item>
        </Form>
    );
};
export default GenerateQrcode;
