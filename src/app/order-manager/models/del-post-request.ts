export class DelPostRequest{
    constructor(
        public token: string,
        public sub_num: string,
        public postcode: string,
    ){}
}