import { TableProps, Tag } from "antd";
import { PrizeGroupType } from "@/models/prizeGroup";
export const columns: TableProps<PrizeGroupType>["columns"] = [
    {
        title: "STT",
        dataIndex: "stt",
        key: "stt",
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
        title: "Tên giải",
        dataIndex: "name",
        key: "name",
        render(value, { name }, index) {
            return (
                <div>
                    <span className="block">{name}</span>
                </div>
            );
        },
    },
    {
        title: "Chương trình",
        dataIndex: "campaign",
        key: "campaign",
        render(value, { campaign }, index) {
            return (
                <div>
                    <span className="block">{campaign.name}</span>
                </div>
            );
        },
    },
    {
        title: "Priority",
        dataIndex: "order",
        key: "order",
    },
    {
        title: "Số phần quà",
        dataIndex: "prizes_count",
        key: "prizes_count",
    },
    {
        title: "Trạng thái",
        dataIndex: "actived",
        key: "actived",
        render: (_, { actived }) => {
            return (
                <Tag color={actived ? "green" : "red"}>
                    {actived ? "Đang kích hoạt" : "Không kích hoạt"}
                </Tag>
            );
        },
    },
];
