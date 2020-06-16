export class BelPostReq{
    constructor(
        public token: string,
        public sub_num: string,
        public barcode_count: number,
    ){}
}