import { CampaignType } from "./campaign";

export type PrizeGroupType = {
    id: string;
    name: string;
    image: string;
    actived: boolean;
    draw_type: "per_one" | "all_one";
    campaign_id: string;
    campaign: CampaignType;
    prizes_count: number;
    order: number;
    created_at: string;
    updated_at: string;
};
