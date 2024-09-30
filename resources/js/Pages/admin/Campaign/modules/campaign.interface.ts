import dayjs from "dayjs";

type CampaignPayload = {
    name?: string;
    content?: string;
    image?: string;
    campaign_type?: string;
    start_date?: string;
    end_date?: string;
    valid_from?: string;
    valid_to?: string;
    status: "publish" | "unpublish" | "pending";
};

export class CampaignFormData {
    name?: string;
    content?: string;
    image?: File;
    campaign_type?: string;
    start_date?: string;
    end_date?: string;
    valid_from?: string;
    valid_to?: string;
    status: "publish" | "unpublish" | "pending";

    constructor(
        name: string,
        content: string,
        image: File | undefined,
        campaign_type: string,
        start_date: string | undefined,
        end_date: string | undefined,
        valid_from: string | undefined,
        valid_to: string | undefined,
        status: "publish" | "unpublish" | "pending"
    ) {
        this.name = name;
        this.content = content;
        this.image = image;
        this.campaign_type = campaign_type;
        this.start_date = start_date;
        this.end_date = end_date;
        this.valid_from = valid_from;
        this.valid_to = valid_to;
        this.status = status;
    }
}
