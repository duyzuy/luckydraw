import { PrizeGroupType } from "@/models/prizeGroup";

type PrizeGroupPayLoad = {
    name?: string;
    eng_name?: string;
    actived?: boolean;
    draw_type?: "per_one" | "all_one";
    order?: number;
};

export class PrizeGroupFromData implements PrizeGroupPayLoad {
    name?: string;
    eng_name?: string;
    actived?: boolean;
    draw_type?: "per_one" | "all_one";
    order?: number;
    constructor(
        name: string | undefined,
        eng_name: string | undefined,
        actived: boolean | undefined,
        order: number | undefined,
        draw_type: "per_one" | "all_one" | undefined
    ) {
        this.name = name;
        this.eng_name = eng_name;
        this.actived = actived;
        this.order = order;
        this.draw_type = draw_type;
    }
}
