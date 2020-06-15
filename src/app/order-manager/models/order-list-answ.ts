import { OrderHeader } from './order-header';
import { ClientInfo } from './client-info';

export class OrderListAnsw{
    constructor(
        public id: string,
        public order: OrderHeader,
        public aboutClient: ClientInfo,
        public aboutWoker: string,
        public place: string,
        public info: string,
        public status: string,
    ){}
}
