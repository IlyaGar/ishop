export class FindOrderReq{
    constructor(
        public token: string,
        public num: string,
        public store: string,
    ){}
}