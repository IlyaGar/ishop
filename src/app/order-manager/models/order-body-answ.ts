import { OrderBody } from './order-body';
import { ClientInfo } from './client-info';

export class OrderBodyAnsw{
    constructor(
        public num: string,
        public sub_num: string,
        public name: string,
        public belPost: boolean,
        public postCode: string,
        public aboutClient: ClientInfo,
        public body: Array<OrderBody>,
    ){}
}