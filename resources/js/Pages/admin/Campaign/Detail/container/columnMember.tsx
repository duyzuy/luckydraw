import { MemberType } from "@/models/member";

import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { TableProps } from "antd";
import { QRCode } from "antd";

export const columnsMember: TableProps<MemberType>["columns"] = [
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
        title: "QRcode",
        dataIndex: "qrcode",
        key: "qrcode",
        width: 120,
        render(value, { qrcode_url, id, member_code }, index) {
            return (
                <div>
                    <QRCode
                        value={`ID:${id};CODE:${member_code}`}
                        size={80}
                        errorLevel="M"
                    />
                </div>
            );
        },
    },
    {
        title: "Mã",
        dataIndex: "member_code",
        key: "member_code",
        width: 120,
    },
    {
        title: "Họ tên",
        dataIndex: "full_name",
        key: "full_name",
        width: 250,
    },
    {
        title: "Member type",
        dataIndex: "member_type",
        key: "member_type",
        width: 120,
    },
    {
        title: "Công ty",
        dataIndex: "company",
        key: "company",
        width: 160,
        render(value, { company }, index) {
            return (
                <div className="text-xs">
                    <span>{company?.name ?? "--"}</span>
                </div>
            );
        },
    },
    {
        title: "Phòng ban",
        dataIndex: "department",
        key: "department",
        width: 160,
        render(value, { position, department, company }, index) {
            return (
                <div className="text-xs">
                    <div>{department?.name ?? "--"}</div>
                </div>
            );
        },
    },
    {
        title: "Checked in",
        dataIndex: "check_in",
        key: "check_in",
        width: 140,
        render(_, { checked_in }, index) {
            return (
                <>
                    {checked_in ? (
                        <CheckCircleOutlined className="text-green-600" />
                    ) : (
                        <CloseCircleOutlined className="text-red-600" />
                    )}
                </>
            );
        },
    },
];
