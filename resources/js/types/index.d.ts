import { CampaignType } from "@/models/campaign";
import { CompanyType } from "@/models/company";
import { DepartmentType } from "@/models/department";
import { WinnerType } from "@/models/winner";
import type { Page, Errors, ErrorBag } from "@inertiajs/core";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface Flash {
    error: string | null;
    success: string | null;
    winner: WinnerType | null;
    winners: WinnerType[] | null;
    drawType: "per_one" | "all_one" | null;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    share: {
        campaigns: CampaignType[];
        departments: DepartmentType[];
        companies: CompanyType[];
    };
    flash: Flash;
};

declare module "@inertiajs/core" {
    interface PageProps extends Page<PageProps> {
        auth: {
            user: User;
        };
        share: {
            campaigns: CampaignType[];
            departments: DepartmentType[];
            companies: CompanyType[];
        };
        flash: Flash;
    }
}
