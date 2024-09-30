import { useEffect, useState } from "react";
import { Upload } from "antd";
import type { DatePickerProps, GetProp, UploadProps } from "antd";
import { useMessage } from "@/hooks/useMessage";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

export type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
export type ThumbnailUploadProps = {
    className?: string;
    initThumbnailUrl?: string;
    onChange?: (file: FileType) => void;
    action?: string;
};
const ThumbnailUpload: React.FC<ThumbnailUploadProps> = ({
    className,
    initThumbnailUrl,
    onChange,
    action,
}) => {
    const [imageUrl, setImageUrl] = useState<string>();
    const [loading, setLoading] = useState(false);

    const message = useMessage();

    const handleChangeFileUpload: UploadProps["onChange"] = (info) => {
        if (info.file.status === "uploading") {
            setLoading(true);
            return;
        }
        if (info.file.status === "done") {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as FileType, (url) => {
                setLoading(false);
                setImageUrl(url);

                onChange?.(info.file.originFileObj as FileType);
            });
        }
    };

    const uploadButton = (
        <button style={{ border: 0, background: "none" }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    const beforeUpload = (file: FileType) => {
        const isJpgOrPng =
            file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
            message.error("You can only upload JPG/PNG file!");
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error("Image must smaller than 2MB!");
        }
        return isJpgOrPng && isLt2M;
    };

    useEffect(() => {
        initThumbnailUrl && setImageUrl(initThumbnailUrl);
    }, [initThumbnailUrl]);
    return (
        <Upload
            name="image"
            listType="picture-card"
            className="avatar-uploader"
            action={action}
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChangeFileUpload}
            accept="image/png, image/jpeg"
            multiple={false}
        >
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt="prize"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                    }}
                />
            ) : (
                uploadButton
            )}
        </Upload>
    );
};
export default ThumbnailUpload;

const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
};
