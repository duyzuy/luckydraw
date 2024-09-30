import { MemberType } from "@/models/member";
import { Table, TableProps } from "antd";
import styled from "styled-components";

export interface MemberListProps {
    items: MemberType[];
}
const MemberList: React.FC<MemberListProps> = ({ items }) => {
    const columns: TableProps<MemberType>["columns"] = [
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
            width: 120,
        },
        {
            title: "Họ tên",
            dataIndex: "full_name",
            key: "full_name",
            width: 200,
        },
        {
            title: "Công ty",
            dataIndex: "company",
            key: "company",
            width: 150,
            render(value, { company }, index) {
                return <span>{company?.name ?? "--"}</span>;
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
                        <div>{department?.name ?? "--"}</div>
                    </div>
                );
            },
        },
    ];

    return (
        <StyledTable
            columns={columns}
            dataSource={items}
            rowKey={"id"}
            size="small"
            pagination={{
                pageSize: 10,
            }}
        />
    );
};
export default MemberList;

const StyledTable = styled(Table<MemberType>)`
    && {
        .ant-table-container {
            .ant-table-thead > tr > th,
            .ant-table-tbody > tr > td {
                font-size: 18px;
            }
        }
    }
`;
