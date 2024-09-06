type MemberPayload = {
    name?: string;
    phone?: string;
    email?: string;
    member_type?: "employee" | "guest";
    checked_in?: boolean;
    member_code?: string;
    member_keyword?: string;
};

export class MemberFormData implements MemberPayload {
    name?: string;
    phone?: string;
    email?: string;
    member_type?: "employee" | "guest";
    checked_in?: boolean;
    member_code?: string;
    member_keyword?: string;

    constructor(
        name: string | undefined,
        phone: string | undefined,
        email: string | undefined,
        member_type: "employee" | "guest" | undefined,
        checked_in: boolean | undefined,
        member_code: string | undefined,
        member_keyword: string | undefined
    ) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.member_type = member_type;
        this.checked_in = checked_in;
        this.member_code = member_code;
        this.member_keyword = member_keyword;
    }
}
