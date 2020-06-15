export class OrderListReq{
    constructor(
        public token: string,
        public store: string,
        public status: string,
        public current: string,
    ){}
}
