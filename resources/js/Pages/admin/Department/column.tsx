import { TableProps } from "antd";
import { DepartmentType } from "@/models/department";
export const columns: TableProps<DepartmentType>["columns"] = [
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
        title: "Tên bộ phận",
        dataIndex: "name",
        key: "name",
        width: 250,
    },
    {
        title: "Tên bộ phận - En",
        dataIndex: "eng_name",
        key: "eng_name",
        width: 250,
        render(value, record, index) {
            return record.eng_name;
        },
    },
];
