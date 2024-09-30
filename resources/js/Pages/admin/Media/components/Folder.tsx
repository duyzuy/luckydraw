import { FolderType } from "@/models/Folder";
import { Tabs, TabsProps } from "antd";
import FolderCreateForm from "./FolderCreateForm";
import { FolderOutlined } from "@ant-design/icons";

type FolderContainerProps = {
    data?: FolderType[];
    folderParentList?: FolderType[];
};
const FolderContainer: React.FC<FolderContainerProps> = ({
    data,
    folderParentList,
}) => {
    const items: TabsProps["items"] = [
        {
            key: "folderList",
            label: "Thư mục",
            children: (
                <>
                    <div className="py-2">Thư mục gốc</div>
                    {data?.map((item) => (
                        <div key={item.id}>
                            <div className="flex items-center gap-x-2 py-1 hover:bg-slate-100 px-2 rounded-sm cursor-pointer">
                                <FolderOutlined />
                                {item.folder_name}
                            </div>
                        </div>
                    ))}
                </>
            ),
        },
        {
            key: "folderAction",
            label: "Tạo thư mục",
            children: <FolderCreateForm folderParentList={folderParentList} />,
        },
    ];
    return (
        <div className="folder-container__body">
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    );
};
export default FolderContainer;
