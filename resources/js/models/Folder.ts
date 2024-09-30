export type FolderType = {
    id: string;
    folder_name: string;
    fodler_slug: string;
    parent_id: string | null;
    childrens: FolderType[] | null;
    created_at: string;
    updated_at: string;
};
