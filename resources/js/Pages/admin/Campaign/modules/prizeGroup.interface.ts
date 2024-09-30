import { PrizeGroupType } from "@/models/prizeGroup";

type PrizeGroupPayLoad = {
    name?: string;
    actived?: boolean;
    draw_type?: "per_one" | "all_one";
    order?: number;
};

export class PrizeGroupFromData implements PrizeGroupPayLoad {
    name?: string;
    image?: File;
    campaign_id?: string;
    actived?: boolean;
    draw_type?: "per_one" | "all_one";
    order?: number;
    constructor(
        name: string | undefined,
        image: File | undefined,
        campaign_id: string | undefined,
        actived: boolean | undefined,
        order: number | undefined,
        draw_type: "per_one" | "all_one" | undefined
    ) {
        this.name = name;
        this.image = image;
        this.actived = actived;
        this.order = order;
        this.campaign_id = campaign_id;
        this.draw_type = draw_type;
    }
}
