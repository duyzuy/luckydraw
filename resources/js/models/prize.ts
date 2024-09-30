import { PrizeGroupType } from "./prizeGroup";

export type PrizeType = {
    id: string;
    name: string;
    quantity: number;
    image: string | null;
    prize_group: PrizeGroupType;
    prize_group_id: string;
    created_at: string;
    updated_at: string;
};
