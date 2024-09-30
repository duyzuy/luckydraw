import { TableProps } from "antd";
import { CompanyType } from "@/models/company";
export const columns: TableProps<CompanyType>["columns"] = [
    {
        title: "STT",
        dataIndex: "stt",
        key: "stt",
        width: 80,
        render(value, record, index) {
            return index + 1;
        },
    },
    {
        title: "Tên công ty",
        dataIndex: "name",
        key: "name",
        width: 250,
    },
    {
        title: "Tên công ty - En",
        dataIndex: "eng_name",
        key: "eng_name",
        width: 250,
        render(value, record, index) {
            return record.eng_name;
        },
    },
];
