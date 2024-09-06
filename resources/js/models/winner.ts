import { MemberType } from "./member";
import { PrizeType } from "./prize";
import { PrizeGroupType } from "./prizeGroup";

export type WinnerType = {
    created_at: string;
    id: string;
    member_id: string;
    member_info: MemberType;
    note: string;
    prize: PrizeType & {
        prize_group: PrizeGroupType;
    };
    prize_id: string;
    updated_at: string;
};
