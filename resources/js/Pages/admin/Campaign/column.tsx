import { Badge, TableProps, Tag } from "antd";

import { CampaignType } from "@/models/campaign";
import dayjs from "dayjs";
export const columns: TableProps<CampaignType>["columns"] = [
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
        title: "Hình ảnh",
        dataIndex: "image",
        key: "image",
        width: 100,
        render(value, { image }, index) {
            return (
                <div className="w-16 h-16 flex items-center justify-center rounded-md bg-slate-50">
                    {image ? (
                        <img
                            src={`/storage/${image}`}
                            className="w-full h-full object-contain"
                        />
                    ) : (
                        <span className="text-xs italic">no image</span>
                    )}
                </div>
            );
        },
    },
    {
        title: "Tên chiến dịch",
        dataIndex: "name",
        key: "name",
        width: 300,
        render(value, { name }, index) {
            return (
                <div>
                    <span className="block">{name}</span>
                </div>
            );
        },
    },

    {
        title: "Ngày diễn ra",
        dataIndex: "startDate-enđate",
        key: "startDate-enđate",
        width: 180,
        render(value, { start_date, end_date }, index) {
            return (
                <div>
                    <span className="flex items-center gap-x-1">
                        <span className="block w-[36px]">Từ:</span>
                        {dayjs(start_date).format("DD/MM/YYYY")}
                    </span>
                    <span className="flex items-center gap-x-1">
                        <span className="block w-[36px]">Đến:</span>
                        {dayjs(end_date).format("DD/MM/YYYY")}
                    </span>
                </div>
            );
        },
    },
    {
        title: "Ngày đăng ký",
        dataIndex: "validFrom-validTo",
        key: "validFrom-validTo",
        width: 180,
        render(value, { valid_from, valid_to }, index) {
            return (
                <div>
                    <span className="flex items-center gap-x-1">
                        <span className="block w-[36px]">Từ:</span>
                        {dayjs(valid_from).format("DD/MM/YYYY")}
                    </span>
                    <span className="flex items-center gap-x-1">
                        <span className="block w-[36px]">Đến:</span>
                        {dayjs(valid_to).format("DD/MM/YYYY")}
                    </span>
                </div>
            );
        },
    },
    {
        title: "Trạng thái",
        dataIndex: "actived",
        key: "actived",
        render: (_, { status }) => {
            return (
                <Badge
                    status={status === "publish" ? "success" : "warning"}
                    text={status === "publish" ? "Đã duyệt" : "Chờ duyệt"}
                />
            );
        },
    },
];
