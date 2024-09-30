import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    QuestionCircleOutlined,
    QuestionCircleTwoTone,
    QuestionOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm, Table, TableProps } from "antd";
import { ColumnsType, ColumnType } from "antd/es/table";

export type TableDataProps<Type> = TableProps<Type> & {
    onDelete?: (record: Type) => void;
    onView?: (record: Type) => void;
    onEdit?: (record: Type) => void;
};
export default function TableData<T extends object>({
    columns = [],
    onDelete,
    onView,
    onEdit,
    ...props
}: TableDataProps<T>) {
    const mergeColumns: TableProps<T>["columns"] = [
        ...columns,
        {
            title: "Hành động",
            width: 120,
            render: (value, record, index) => {
                return (
                    <div className="text-xs flex items-center gap-x-4">
                        {onEdit && (
                            <span
                                onClick={() => onEdit?.(record)}
                                className="cursor-pointer w-6 h-6 rounded-full bg-lime-50 hover:bg-lime-100 text-lime-600 flex items-center justify-center"
                            >
                                <EditOutlined />
                            </span>
                        )}

                        {onView && (
                            <span
                                onClick={() => onView?.(record)}
                                className="cursor-pointer w-6 h-6 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center"
                            >
                                <EyeOutlined />
                            </span>
                        )}

                        {onDelete && (
                            <Popconfirm
                                title="Xoá"
                                icon={
                                    <QuestionCircleOutlined
                                        style={{ color: "red" }}
                                    />
                                }
                                description={`Bạn chắc chắn muốn xoá`}
                                onConfirm={() => onDelete?.(record)}
                                okText="Xác nhận"
                                cancelText="Huỷ bỏ"
                            >
                                <span className="cursor-pointer w-6 h-6 rounded-full bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center">
                                    <DeleteOutlined />
                                </span>
                            </Popconfirm>
                        )}
                    </div>
                );
            },
        },
    ];

    return <Table rowKey="id" columns={mergeColumns} {...props} />;
}
