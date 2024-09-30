import { CampaignType } from "@/models/campaign";
import dayjs from "dayjs";

interface CampaignInformationProps {
    data: CampaignType;
}
const CampaignInformation: React.FC<CampaignInformationProps> = ({ data }) => {
    return (
        <div>
            {/* <div>
        <div className="thumb w-[380px]">
            {data.image ? (
                <img src={`/storage/${data.image}`} />
            ) : null}
        </div>
    </div> */}
            <div className="mb-3">
                <p>Tên Sự kiện</p>
                <p className="font-bold">{data.name}</p>
            </div>
            <div className="mb-3">
                <p>Thời gian diễn ra sự kiện</p>
                <div className="flex items-center gap-x-2 font-bold">
                    <span>{dayjs(data.start_date).format("DD/MM/YYYY")}</span>-
                    <span>{dayjs(data.end_date).format("DD/MM/YYYY")}</span>
                </div>
            </div>
            <div className="mb-3">
                <p>Thời gian đăng ký</p>
                <div className="flex items-center gap-x-2 font-bold">
                    <span>{dayjs(data.valid_from).format("DD/MM/YYYY")}</span>-
                    <span>{dayjs(data.valid_to).format("DD/MM/YYYY")}</span>
                </div>
            </div>
            <div className="mb-3">
                <p>Nội dung</p>
                <p>{data.content}</p>
            </div>
            <div className="mb-3">
                <p>Loại campaign</p>
                <p>{data.campaign_type}</p>
            </div>
        </div>
    );
};
export default CampaignInformation;
