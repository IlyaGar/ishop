export class OrderBody{
    constructor(
        public foto: string,
        public article: string,
        public name: string,
        public barcode: string,
        public count_e: string,
        public count_g: string,
        public count_gСhange: string,
        public changed: boolean,
        public price: string,
        public vatz: string,
        public remote_stock: string,
    ){}
}