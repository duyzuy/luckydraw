export type PrizeGroupType = {
    id: string;
    name: string;
    eng_name: string;
    actived: boolean;
    draw_type: "per_one" | "all_one";
    prizes_count: number;
    order: number;
    created_at: string;
    updated_at: string;
};
