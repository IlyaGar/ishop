export class OrderHeader{
    constructor(
        public num: string,
        public sub_num: string,
        public name: string,
        public datetime: string,
        public delivery_type: string,
        public isCassa: boolean,
        public isCassaPause: boolean,
        public isReturn: boolean,
        public virtual_products: string,
    ){}
}