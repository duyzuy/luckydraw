import { CampaignType } from "./campaign";
import { CompanyType } from "./company";
import { DepartmentType } from "./department";

export type MemberType = {
    id: string;
    full_name: string;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    member_type: "employee" | "guest" | null;
    address: string;
    campaign_id: string;
    campaign: CampaignType;

    checked_in: boolean;
    qrcode_url: string | null;
    member_code: string;
    member_keyword: string;
    department_id: string | null;
    department: DepartmentType | null;
    position: string;
    country: string;
    city: string;
    state: string;
    province: string;
    company_id: string | null;
    company: CompanyType | null;
    created_at: string;
    updated_at: string;
};
