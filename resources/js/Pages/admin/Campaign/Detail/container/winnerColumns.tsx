import { WinnerType } from "@/models/winner";
import { TableProps } from "antd";

export const columnsWinner: TableProps<WinnerType>["columns"] = [
    {
        title: "STT",
        dataIndex: "stt",
        key: "stt",
        width: 60,
        render(value, record, index) {
            return index + 1;
        },
    },
    {
        title: "Mã",
        dataIndex: "member_code",
        key: "member_code",
        width: 100,
        render(value, record, index) {
            return record.member_info.member_code;
        },
    },
    {
        title: "Họ và tên",
        dataIndex: "member_info",
        key: "member_info",
        width: 200,
        render(value, record, index) {
            return (
                <>
                    <p>{record.member_info.full_name}</p>
                    <p>{record.member_info.company?.name}</p>
                    <p>{record.member_info.department?.name}</p>
                </>
            );
        },
    },
    {
        title: "Giải thưởng",
        dataIndex: "member_type",
        key: "member_type",
        width: 120,
        render(value, record, index) {
            return record.prize.prize_group.name;
        },
    },
    {
        title: "Tên phần quà",
        dataIndex: "member_type",
        key: "member_type",
        width: 120,
        render(value, record, index) {
            return record.prize.name;
        },
    },
];
