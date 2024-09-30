import dayjs from "dayjs";

export type CampaignType = {
    id: string;
    name: string;
    content: string;
    image: string | null;
    campaign_type: string;
    start_date: Date;
    end_date: Date;
    valid_from: Date;
    valid_to: Date;
    status: "publish" | "unpublish" | "pending";
    created_at: Date;
    updated_at: Date;
};
