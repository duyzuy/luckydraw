import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ConfigProvider, App as AntDesignApp, ThemeConfig } from "antd";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

const config: ThemeConfig = {
    token: {
        colorPrimary: "#f6ba4b",
    },
    components: {
        Button: {
            contentFontSizeSM: 13,
            controlHeightSM: 28,
            borderRadiusSM: 3,
            borderRadius: 4,
            borderRadiusLG: 6,
        },
        Input: {
            // paddingLG: 14,
            // fontSize: 16,
            fontSizeSM: 12,
            paddingInlineSM: 11,
            paddingBlockSM: 4,
            fontSizeLG: 16,
            paddingInlineLG: 16,
            borderRadiusSM: 4,
            borderRadius: 4,
            borderRadiusLG: 6,
        },
        DatePicker: {
            fontSizeSM: 12,
            paddingInlineSM: 8,
            paddingBlockSM: 2,
            fontSizeLG: 16,
            paddingInlineLG: 16,
            borderRadiusSM: 3,
            borderRadius: 4,
            borderRadiusLG: 6,
        },
        Menu: {
            radiusItem: 0,
            itemBorderRadius: 0,
            radiusSubMenuItem: 0,
            subMenuItemBorderRadius: 0,
            paddingXL: 32,
            controlHeightLG: 48,
            marginXS: 8,
            paddingXS: 8,
            itemMarginInline: 0,
            controlHeightSM: 24,
            // colorPrimary: "#124ba5",
            // colorPrimaryBorder: "#7aedff",
            // colorSplit: "rgba(5, 5, 5, 0.06)",
            // controlItemBgActive: "rgb(18 75 165 / 7%)",
            itemSelectedBg: "#f1f1f1",
            subMenuItemBg: "#f9f9f9",
            marginXXS: 0,
            padding: 16,
            fontSize: 14,
            // itemColor: "#777E90",
            // groupTitleColor: "rgba(0, 0, 0, 0.45)",
            itemBg: "#fff",
        },
        Select: {
            // selectorBg: "red",
            // colorBgTextActive: "blue",
            paddingSM: 8,
            optionSelectedBg: "#e7f3ff",
        },
        Form: {
            colorTextHeading: "#23262F",
        },
        Checkbox: {
            paddingXS: 12,
        },
    },
};

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ConfigProvider theme={config}>
                <AntDesignApp>
                    <App {...props} />
                </AntDesignApp>
            </ConfigProvider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
