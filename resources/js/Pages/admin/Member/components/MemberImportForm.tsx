import { Button, Form } from "antd";
import { useForm } from "@inertiajs/react";

const MemberImportForm = () => {
    const { setData, post, reset } = useForm(undefined);

    const onChangeFile: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
        const file = evt.target.files?.[0];
        setData({ file: file });
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
        <form onSubmit={handleImportFile}>
            <Form.Item>
                <input type="file" onChange={onChangeFile} />
                <Button type="primary" htmlType="submit">
                    Import
                </Button>
            </Form.Item>
        </form>
    );
};
export default MemberImportForm;
