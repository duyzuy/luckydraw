import { TableProps } from "antd";
import { PrizeType } from "@/models/prize";
export const columns: TableProps<PrizeType>["columns"] = [
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
        dataIndex: "Image",
        key: "Image",
        render(value, { image }, index) {
            return (
                <div className="w-16 h-16 overflow-hidden flex items-center bg-gray-100 rounded-md p-1">
                    {image ? (
                        <img
                            src={`storage/${image}`}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-xs text-center italic">
                            No image
                        </span>
                    )}
                </div>
            );
        },
    },
    {
        title: "Tên giải",
        dataIndex: "name",
        key: "name",
        width: 400,
    },
    {
        title: "Nhóm",
        dataIndex: "prizeGroup",
        key: "prizeGroup",
        width: 200,
        render(value, { prize_group }, index) {
            return prize_group.name;
        },
    },
];
