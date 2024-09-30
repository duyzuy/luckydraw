type PrizePayLoad = {
    name?: string;
    file?: File;
    prize_group_id?: string;
};

export class PrizeFormData implements PrizePayLoad {
    name?: string;
    file?: File;
    prize_group_id?: string;
    quantity?: number;

    constructor(
        name: string | undefined,
        file: File | undefined,
        prize_group_id: string | undefined,
        quantity: number | undefined
    ) {
        this.name = name;
        this.file = file;
        this.prize_group_id = prize_group_id;
        this.quantity = quantity;
    }
}
