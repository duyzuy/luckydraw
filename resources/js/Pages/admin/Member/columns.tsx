import { MemberType } from "@/models/member";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { TableProps } from "antd";
import { Tag } from "antd";
import { QRCodeSVG } from "qrcode.react";
import { QRCode } from "antd";

export const columns: TableProps<MemberType>["columns"] = [
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
        title: "QRcode check-in",
        dataIndex: "stt",
        key: "stt",
        width: 180,
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
        title: "Chiến dịch",
        dataIndex: "full_name",
        key: "full_name",
        width: 250,
        render(value, { campaign }, index) {
            return (
                <div>
                    <div className="text-xs">{campaign.name}</div>
                </div>
            );
        },
    },
    {
        title: "Phòng ban",
        dataIndex: "department",
        key: "department",
        width: 150,
        render(value, { member_type, position, department }, index) {
            return (
                <div>
                    <div className="text-xs">{member_type ?? "--"}</div>
                    <div>{department ? department.name : "--"}</div>
                    <div>{position}</div>
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
