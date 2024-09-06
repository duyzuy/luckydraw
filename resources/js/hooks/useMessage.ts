import { message } from "antd";
import { App } from "antd";

export const useMessage = () => {
    const { message, notification, modal } = App.useApp();

    // const [messageApi, contextHolder] = message.useMessage();

    const success = (content: string) => {
        message.success(content);
    };

    const error = (content: string) => {
        message.error(content);
    };

    const warning = (content: string) => {
        message.warning(content);
    };

    return { success, error, warning };
};
