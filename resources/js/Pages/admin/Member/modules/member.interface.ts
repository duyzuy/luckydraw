type MemberPayload = {
    full_name?: string;
    phone?: string;
    email?: string;
    member_type?: "employee" | "guest";
    checked_in?: boolean;
    member_code?: string;
    member_keyword?: string;
    position?: string;
    department?: string;
    address?: string;
};

export class MemberFormData {
    full_name?: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    email?: string;
    member_type?: "employee" | "guest";
    checked_in?: boolean;
    member_code?: string;
    position?: string;
    member_keyword?: string;
    address?: string;
    department_id?: string;
    country: string;
    city: string;
    state: string;
    province: string;
    company: string;
    campaign_id: string;

    constructor(
        full_name: string | undefined,
        first_name: string | undefined,
        last_name: string | undefined,
        phone: string | undefined,
        email: string | undefined,
        member_type: "employee" | "guest" | undefined,
        checked_in: boolean | undefined,
        member_code: string | undefined,
        member_keyword: string | undefined,
        position: string | undefined,
        address: string | undefined,
        department_id: string | undefined,
        country: string,
        city: string,
        state: string,
        province: string,
        company: string,
        campaign_id: string
    ) {
        this.full_name = full_name;
        this.first_name = first_name;
        this.last_name = last_name;
        this.department_id = department_id;
        this.phone = phone;
        this.email = email;
        this.member_type = member_type;
        this.checked_in = checked_in;
        this.member_code = member_code;
        this.member_keyword = member_keyword;
        this.position = position;
        this.address = address;
        this.country = country;
        this.city = city;
        this.state = state;
        this.province = province;
        this.company = company;
        this.campaign_id = campaign_id;
    }
}
