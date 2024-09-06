type PrizePayLoad = {
    name?: string;
    image?: string;
    prize_group_id?: string;
};

export class PrizeFormData implements PrizePayLoad {
    name?: string;
    image?: string;
    prize_group_id?: string;

    constructor(
        name: string | undefined,
        image: string | undefined,
        prize_group_id: string | undefined
    ) {
        this.name = name;
        this.image = image;
        this.prize_group_id = prize_group_id;
    }
}
