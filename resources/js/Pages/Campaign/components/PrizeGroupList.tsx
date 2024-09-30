import { useState } from "react";

import { Table, TableProps } from "antd";
import styled from "styled-components";

import { PrizeType } from "@/models/prize";
import { PrizeGroupType } from "@/models/prizeGroup";
import { FileImageOutlined } from "@ant-design/icons";

type PrizeGroupItemType = PrizeGroupType & { prizes: PrizeType[] };
export interface PrizeGroupListProps {
    items?: PrizeGroupItemType[];
}
const PrizeGroupList: React.FC<PrizeGroupListProps> = ({ items }) => {
    const [prizeGroupItem, setprizeGroupItem] = useState<
        PrizeGroupItemType | undefined
    >(items ? items[items.length - 1] : undefined);

    const columns: TableProps<PrizeType>["columns"] = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            width: 60,
            render(value, record, index) {
                return <span className="text-lg">{index + 1}</span>;
            },
        },
        {
            title: "Hình ảnh",
            dataIndex: "image",
            key: "image",
            width: 100,
            render(value, { image }, index) {
                return (
                    <div className="w-14 h-14 bg-slate-50 rounded-md flex items-center justify-center">
                        {image ? (
                            <img src={`/storage/${image}`} />
                        ) : (
                            <span className="text-2xl text-gray-400">
                                <FileImageOutlined />
                            </span>
                        )}
                    </div>
                );
            },
        },
        {
            title: "Tên phần quà",
            dataIndex: "name",
            key: "name",
            width: 250,
        },
    ];

    return (
        <>
            <div className="prize-navs flex items-center gap-x-2 justify-center mb-6">
                {items?.map((item) => (
                    <div key={item.id}>
                        <span
                            className={`font-jambono block text-xl hover:opacity-100 cursor-pointer px-4 py-2 rounded-full ${
                                prizeGroupItem?.id === item.id
                                    ? "text-white bg-red-600"
                                    : "opacity-60 bg-white"
                            }`}
                            onClick={() => setprizeGroupItem(item)}
                        >
                            {item.name}
                        </span>
                    </div>
                ))}
            </div>

            <StyledTable
                columns={columns}
                dataSource={prizeGroupItem?.prizes}
                rowKey={"id"}
                size="small"
                pagination={{
                    pageSize: 5,
                    hideOnSinglePage: true,
                    showTotal(total, range) {
                        return (
                            <span className="bg-slate-50 p-2 rounded-md">
                                {total} Phần quà
                            </span>
                        );
                    },
                }}
            />
        </>
    );
};
export default PrizeGroupList;

const StyledTable = styled(Table<PrizeType>)`
    && {
        .ant-table-container {
            .ant-table-thead > tr > th,
            .ant-table-tbody > tr > td {
                font-size: 18px;
            }
        }
    }
`;
