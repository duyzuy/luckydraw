import { WinnerType } from "@/models/winner";
import { Table, TableProps } from "antd";
import styled from "styled-components";

export interface WinnerListProps {
    items: WinnerType[];
}
const WinnerList: React.FC<WinnerListProps> = ({ items }) => {
    const columns: TableProps<WinnerType>["columns"] = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            width: 40,
            render(value, record, index) {
                return index + 1;
            },
        },
        {
            title: "Mã",
            dataIndex: "member_code",
            key: "member_code",
            width: 80,
            render(value, { member_info: { member_code } }, index) {
                return <span>{member_code}</span>;
            },
        },
        {
            title: "Họ tên",
            dataIndex: "full_name",
            key: "full_name",
            width: 160,
            render(value, { member_info: { full_name } }, index) {
                return <span>{full_name}</span>;
            },
        },

        {
            title: "Giải",
            dataIndex: "department",
            key: "department",
            width: 100,
            render(value, { prize }, index) {
                return <div>{prize?.prize_group?.name}</div>;
            },
        },
        {
            title: "Phần quà",
            dataIndex: "prizes",
            key: "prizes",
            width: 150,
            render(value, { prize }, index) {
                return <div>{prize?.name}</div>;
            },
        },
    ];

    return (
        <StyledTable
            columns={columns}
            dataSource={items}
            rowKey={"id"}
            size="small"
            sticky={true}
        />
    );
};
export default WinnerList;

const StyledTable = styled(Table<WinnerType>)`
    && {
        .ant-table-container {
            .ant-table-thead > tr > th,
            .ant-table-tbody > tr > td {
                font-size: 18px;
            }
        }
    }
`;
