import { Button, Input, Space, Table, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { removeVietnameseTones } from "@/utils/common";
import { WinnerType } from "@/models/winner";
import { columnsWinner } from "./winnerColumns";
import { router } from "@inertiajs/react";

export interface WinnerListContainerProps {
    data: WinnerType[];
    campaignName?: string;
    campaignId?: string;
}
const WinnerListContainer: React.FC<WinnerListContainerProps> = ({
    data,
    campaignName,
    campaignId,
}) => {
    const params = new URLSearchParams(window.location.search);

    const [searchText, setSearchText] = useState("");

    const [pagination, setPagination] = useState({
        pageSize: 10,
        position: ["topRight", "bottomRight"],
        total: data.length,
        current: 1,
    });

    const onChangeSearch = (value: string) => {
        setSearchText(value);
    };

    const handleSearch = (value: string) => {
        let textNoVietnamese = removeVietnameseTones(value).toLowerCase();
        textNoVietnamese = textNoVietnamese.split(" ").join("");
    };

    const handleResetWinnerList = () => {
        router.post(route("campaign.reset.winner", campaignId));
    };
    useEffect(() => {
        setSearchText(() => params.get("search") || "");
    }, [params.get("search")]);

    useEffect(() => {
        setPagination((old) => ({
            pageSize: old.pageSize,
            position: old.position,
            total: data.length,
            current: old.current,
        }));
    }, [data]);

    return (
        <>
            <div className="page-head py-3 mb-6">
                <div className="flex justify-between">
                    <h4 className="text-xl">Danh sách người chiến thắng</h4>
                    <Space>
                        <Input.Search
                            placeholder="Tìm kiếm theo họ tên hoặc email hoặc mã hoặc SDT"
                            size="large"
                            value={searchText}
                            onChange={(evt) => onChangeSearch(evt.target.value)}
                            loading={false}
                            onSearch={handleSearch}
                            enterButton="Tìm kiếm"
                        />
                        <Popconfirm
                            title={
                                <span className="font-bold">Xoá danh sách</span>
                            }
                            description={
                                <>
                                    <p>
                                        Bạn chắc chắn muốn xoá toàn bộ winner
                                        campaign
                                    </p>
                                    <p>
                                        <strong>{campaignName}</strong>
                                    </p>
                                </>
                            }
                            onConfirm={handleResetWinnerList}
                        >
                            <Button size="large" type="primary" danger>
                                Reset
                            </Button>
                        </Popconfirm>
                    </Space>
                </div>
            </div>
            <Table<WinnerType>
                columns={columnsWinner}
                rowKey={"id"}
                dataSource={data}
                pagination={{
                    showTotal(total, range) {
                        return <span className="text-xs">{total} winners</span>;
                    },
                    pageSize: pagination.pageSize,
                    position: ["topRight", "bottomRight"],
                    total: pagination.total,
                    current: pagination.current,
                    onChange(page, pageSize) {
                        setPagination((old) => ({
                            ...old,
                            current: page,
                            pageSize: pageSize,
                        }));
                    },
                }}
            />
        </>
    );
};
export default WinnerListContainer;
