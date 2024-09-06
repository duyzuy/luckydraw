import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { PageProps } from "@/types";
import { useMessage } from "@/hooks/useMessage";

import { WinnerType } from "@/models/winner";
import WinnerList from "./components/WinnerList";
import { Button, Popconfirm } from "antd";

type WinnerContainerProps = PageProps & {
    winnerList: WinnerType[];
};
const WinnerContainer: React.FC<WinnerContainerProps> = ({
    auth,
    winnerList,
}) => {
    const message = useMessage();

    const handleResetWinnerList = () => {
        router.post(route("winner.reset"), undefined, {
            preserveScroll: true,
            onSuccess: () => {
                message.success("Làm mới danh sách.");
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Người trúng giải
                </h2>
            }
        >
            <Head title="Nhóm giải thưởng" />
            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-3 gap-4">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg col-span-3 p-6">
                        <div className="header flex justify-between">
                            <h3 className="text-lg font-bold mb-6">
                                Danh sách người trúng giải
                            </h3>
                            <Popconfirm
                                title="Ban chac chan muon lam moi danh sach"
                                onConfirm={handleResetWinnerList}
                            >
                                <Button type="primary">Làm mới</Button>
                            </Popconfirm>
                        </div>
                        <WinnerList items={winnerList} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};
export default WinnerContainer;
