export class OrderBody{
    constructor(
        public foto: string,
        public article: string,
        public name: string,
        public barcode: string,
        public count_e: number,
        public count_g: number,
        public count_gСhange: number,
        public changed: boolean,
        public cost: number = 1,
    ){}
}