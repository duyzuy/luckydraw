export class CompanyFormData {
    name?: string;
    eng_name?: string;
    constructor(name: string | undefined, eng_name: string | undefined) {
        this.name = name;
        this.eng_name = eng_name;
    }
}
