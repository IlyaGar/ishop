export class SubOrder{
    constructor(
        public order_id: string,
        public article: string,
        public barcode: string,
        public name: string,
        public count: string,
        public prog: string,
        public img: string,
    ){}
}