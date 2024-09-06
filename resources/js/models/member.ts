export type MemberType = {
    id: string;
    name: string;
    phone: string;
    email: string;
    member_type: "employee" | "guest";
    position: string;
    checked_in: boolean;
    member_code: string;
    member_keyword: string;
    created_at: string;
    updated_at: string;
};
