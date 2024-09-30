import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FolderType } from "@/models/Folder";
import { MediaType } from "@/models/Media";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { Button, Empty, Tabs, TabsProps } from "antd";
import FolderContainer from "./components/Folder";

type MediaContainerProps = PageProps & {
    folderData: FolderType[];
    mediaData: MediaType[];
};
const MediaContainer: React.FC<MediaContainerProps> = ({
    auth,
    folderData,
    mediaData,
}) => {
    console.log(folderData);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Thư viện ảnh
                </h2>
            }
        >
            <Head title="Prize groups" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-8">
                <div className="bg-white p-6 rounded-md shadow-sm flex gap-4">
                    <div className="folder-container w-[280px] border-r pr-6">
                        <div className="folder-container__head flex items-center justify-between">
                            <h3 className="text-lg font-bold">Thư mục</h3>
                        </div>
                        <FolderContainer data={folderData} />
                    </div>
                    <div className="media-column flex-1">
                        <h3 className="text-lg font-bold mb-6">Hình ảnh</h3>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};
export default MediaContainer;
